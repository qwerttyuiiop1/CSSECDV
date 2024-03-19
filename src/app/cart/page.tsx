"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import coinAnimation from "../../assets/lottie/animation_coin.json";
import Lottie from "lottie-react";
import { CartItem, Cart } from "@type/Cart";

type GroupedItem = {
	shopName: string;
	items: (CartItem & {
	  id: number;
	})[];
}

function Page({cart, setCart, onRefresh}: {
	cart: Cart, 
	onRefresh: () => Promise<void>, 
	setCart: (cart: Cart) => void
}) {
  // Group items by shop
  function groupItems(cart: Cart): GroupedItem[] {
    const group = cart.items.reduce((acc, item, i) => {
	  const shop = item.product.shopName;
	  (acc[shop] = acc[shop] || []).push({...item, id: i});
	  return acc;
	}, {} as { [key: string]: GroupedItem['items'] });
	return Object.entries(group).map(([shopName, items]) => ({
	  shopName,
	  items,
	}));
  }
  function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null;
    return function (...args: Parameters<T>): void {
        clearTimeout(timeoutId as NodeJS.Timeout);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
  }


  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
  const [selectedItemDescription, setSelectedItemDescription] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [groupedItems, setGroupedItems] = useState<GroupedItem[]>([]);
  const [redeemCode, setRedeemCode] = useState<string | null>(null); 

  useEffect(() => {
	setGroupedItems(groupItems(cart));
  }, [cart]);
  useEffect(() => {
	setSelectedItems(new Array(cart?.items.length || 0).fill(false));
  }, [isSelecting, cart])

  const handleToggleSelect = (i: number) => {
    setSelectedItems((prevSelected) => {
	  const a = [...prevSelected];
	  a[i] = !a[i];
	  return a;
    });
  };

  const handleRemoveSelectedItems = async () => {
	const toDelete = cart.items.filter((_, i) => selectedItems[i]);
	if (toDelete.length === 0)
	  return;

	const res = await Promise.all(toDelete.map(item => 
	  fetch('/api/cart/' + item.product.id, {
		method: 'DELETE',
	  })
	));
    await onRefresh();
  };
  
  
  const handleItemClick = (i: number) => {
    if (isSelecting) {
      handleToggleSelect(i);
    } else {
      setSelectedItemDescription(cart.items[i].product.details);
    }
  };

  const handleStartSelection = () => {
    setIsSelecting(true);
  };

  const handleCancelSelection = () => {
    setIsSelecting(false);
  };

  const _handleIncrementQuantity = useCallback(async (itemId: number) => {
	const newQty = cart.items[itemId].quantity + 1;
	const res = await fetch('/api/profile/cart/', {
	  method: 'POST',
	  body: JSON.stringify({ quantity: newQty, productId: cart.items[itemId].product.id }),
	});
	const data = await res.json();
	const newCart = { ...cart };
	newCart.items[itemId] = data.item;
	setCart(newCart);
  }, [cart, setCart])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleIncrementQuantity = useCallback(
	debounce(_handleIncrementQuantity, 1000), [_handleIncrementQuantity]
  );
  
  const _handleDecrementQuantity = useCallback(async (itemId: number) => {
	const newQty = cart.items[itemId].quantity - 1;
	if (newQty <= 0) return;
	const res = await fetch('/api/profile/cart/', {
	  method: 'POST',
	  body: JSON.stringify({ quantity: newQty, productId: cart.items[itemId].product.id }),
	});
	const data = await res.json();
	const newCart = { ...cart };
	newCart.items[itemId] = data.item;
	setCart(newCart);
  }, [cart, setCart]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDecrementQuantity = useCallback(
	debounce(_handleDecrementQuantity, 1000), [_handleDecrementQuantity]
  );

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setIsSelecting(false);
	const res = await fetch('/api/cart/checkout', {
	  method: 'POST',
	  body: JSON.stringify({ redeemCode }),
	});
	await onRefresh();
  };

  
  return (
    <div className={styles.cartPage}>
      <div className={styles.cart_container}>
        <div className={styles.cart_header}>
          <h1>MY CART</h1>
        </div>
        {groupedItems.map((group, i) => (
          <div key={i}>
            <h2 className={styles['shop-name']}>{group.shopName}</h2>
            {group.items.map(({ quantity, product, id }) => (
              <div
                key={id}
                className={`${styles.cart_item} ${selectedItems[id] ? styles.selected : ''}`}
              >
                {isSelecting && (
                  <input
                    type="checkbox"
                    checked={selectedItems[id] || false}
                    onChange={() => handleToggleSelect(id)}
                  />
                )}
                <div className={styles.item_info}>
                  <div className={styles.item_details}>
                    <span className={styles.item_name}>{product.name}</span>
                    <p className={styles.item_price}>
                      Unit Price: {product.price} RP
                    </p>
                  </div>
                  <div className={styles.cointotalprice}>
                    <Lottie
                      animationData={coinAnimation}
                      className={styles.coin_animation}
                      loop={true}
                    />
                    <p className={styles.item_total_price}>
                      Total: {product.price * quantity} RP
                    </p>
                  </div>
                </div>
                {isSelecting ? null : (
                  <div className={styles.quantity_buttons}>
                    <button
                      onClick={() => handleDecrementQuantity(id)}
                      className={styles.quantity_button}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className={styles.quantity_input}
                    />
                    <button
                      onClick={() => handleIncrementQuantity(id)}
                      className={styles.quantity_button}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.checkout_box}>
        <h1 className={styles.checkout_title}>Order Summary</h1>
        <div className={styles.checkout_inside}>
          <div className={styles.cart_summary}>
            <p className={styles.total_title}>TOTAL: </p>
            <p> {totalPrice} RP</p>
          </div>
          <div className={styles.redeem_code}>
			<h3>Promo Code:</h3>
            <input
              type="text"
              placeholder="Type Promo Code..."
              value={redeemCode || ""}
              onChange={(e) => setRedeemCode(e.target.value)}
            />
          </div>
          <div className={styles.selection_buttons}>
            {isSelecting ? (
              <button onClick={handleRemoveSelectedItems} className={styles.remove_button}>
                Remove
              </button>
            ) : (
              <button onClick={handleCheckout} className={styles.checkout_button}>
                Checkout
              </button>
            )}
            {isSelecting ? (
              <button onClick={handleCancelSelection} className={styles.cancel_button}>
                Cancel
              </button>
            ) : (
              <button onClick={handleStartSelection} className={styles.edit_button}>
                Edit Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function PageWrapper() {
  const [cart, setCart] = useState<Cart | null>(null);
  useEffect(() => {
	handleRefresh();
  }, []);
  const handleRefresh = async () => {
	const res = await fetch('/api/profile/cart');
	const data = await res.json();
	setCart(data.cart);
  }

  return cart ? <Page cart={cart} setCart={setCart} onRefresh={handleRefresh}/> : null;
}