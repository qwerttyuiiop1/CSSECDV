"use client";
import { useState } from "react";
import styles from "./page.module.css";
import coinAnimation from "../../assets/lottie/animation_coin.json";
import Lottie from "lottie-react";


interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  shop: Shop; 
}

// Sample enum for shop names
enum Shop {
  Shopee = "Shopee",
  Lazada = "Lazada",
  Uniqlo = "Uniqlo",
}

export default function Page() {
  // Sample data for items with shop information
  const initialCart: CartItem[] = [
    { id: 1, name: '200 Peso Voucher', price: 200, description: 'Lorem ipsum...', shop: Shop.Shopee },
    { id: 2, name: '100 Peso Voucher', price: 100, description: 'dfgdfgdfgdgdfgdfgdf ipsum...', shop: Shop.Lazada },
    { id: 3, name: '200 Peso Voucher', price: 200, description: 'Lorem dfsfsdfsdfsdfsdf...', shop: Shop.Uniqlo },
    { id: 4, name: '300 Peso Voucher', price: 300, description: 'Lorem sdfsdfdsfsdfsfsdfsdipsum...', shop: Shop.Uniqlo },
  ];

  // Group items by shop
  function groupItems(items: CartItem[]): { [key in Shop]?: CartItem[] } {
    const groupedItems: { [key in Shop]?: CartItem[] } = {};
    items.forEach((item) => {
      if (!groupedItems[item.shop]) {
        groupedItems[item.shop] = [];
      }
      groupedItems[item.shop]!.push(item);
    });
    return groupedItems;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: boolean }>({});
  const [selectedItemDescription, setSelectedItemDescription] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [groupedItems, setGroupedItems] = useState(groupItems(initialCart));
  const [redeemCode, setRedeemCode] = useState<string>(""); 

  const [itemQuantities, setItemQuantities] = useState<{ [key: number]: number }>(
    initialCart.reduce<{ [key: number]: number }>((quantities, item) => {
      quantities[item.id] = 1;
      return quantities;
    }, {})  
  );

  const handleToggleSelect = (itemId: number) => {
    setSelectedItems((prevSelected) => ({
      ...prevSelected,
      [itemId]: !prevSelected[itemId],
    }));
  };

  const handleRemoveSelectedItems = () => {
    const updatedCart = cartItems.filter((item) => !selectedItems[item.id]);
  
    // Remove header category if all items within the category are selected
    const updatedGroupedItems: { [key in Shop]?: CartItem[] } = { ...groupedItems };
    for (const str in updatedGroupedItems) {
	  const shop = str as Shop;
      updatedGroupedItems[shop] = updatedGroupedItems[shop]?.filter(item => !selectedItems[item.id]);
      if (updatedGroupedItems[shop]?.length === 0) {
        delete updatedGroupedItems[shop];
      }
    }
  
    setCartItems(updatedCart); // Update the cart items state
    setSelectedItems({});
    setSelectedItemDescription(null);
    setIsSelecting(false);
    setGroupedItems(updatedGroupedItems);
  };
  
  
  const handleItemClick = (item: CartItem) => {
    if (isSelecting) {
      handleToggleSelect(item.id);
    } else {
      setSelectedItemDescription(item.description);
    }
  };

  const handleStartSelection = () => {
    setIsSelecting(true);
    setSelectedItems({});
  };

  const handleCancelSelection = () => {
    setIsSelecting(false);
    setSelectedItems({});
  };

  const handleIncrementQuantity = (itemId: number) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));
  };

  const handleDecrementQuantity = (itemId: number) => {
    if (itemQuantities[itemId] > 1) {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * itemQuantities[item.id],
    0
  );

  const handleCheckout = () => {
    if (isSelecting) {
      setIsSelecting(false);
      setSelectedItems({});
    }
    
    setRedeemCode("");
    const confirmation = window.confirm('Are you sure you want to proceed with the purchase?');
    if (confirmation) {
      // User clicked "Yes," you can proceed with the purchase logic here.
      alert('Purchase confirmed.');
    } else {
      // User clicked "No," do nothing or show a message.
      alert('Purchase canceled.');
    }
  };

  
  return (
              <div className={styles.cartPage}>
            <div className={styles.cart_container}>
              <div className={styles.cart_header}>
                <h1>MY CART</h1>
              </div>
              {Object.keys(groupedItems).map((shop) => (
                <div key={shop}>
                  <h2 className={styles['shop-name']}>{shop}</h2>
                  {groupedItems[shop as Shop]?.map((item) => (
                    <div
                      key={item.id}
                      className={`${styles.cart_item} ${selectedItems[item.id] ? styles.selected : ''}`}
                    >
                      {isSelecting && (
                        <input
                          type="checkbox"
                          checked={selectedItems[item.id] || false}
                          onChange={() => handleToggleSelect(item.id)}
                        />
                      )}
                      <div className={styles.item_info}>
                        <div className={styles.item_details}>
                          <span className={styles.item_name}>{item.name}</span>
                          <p className={styles.item_price}>
                            Unit Price: {item.price} RP
                          </p>
                        </div>
                        <div className={styles.cointotalprice}>
                          <Lottie
                            animationData={coinAnimation}
                            className={styles.coin_animation}
                            loop={true}
                          />
                          <p className={styles.item_total_price}>
                            Total: {item.price * itemQuantities[item.id]} RP
                          </p>
                        </div>
                      </div>
                      {isSelecting ? null : (
                        <div className={styles.quantity_buttons}>
                          <button
                            onClick={() => handleDecrementQuantity(item.id)}
                            className={styles.quantity_button}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={itemQuantities[item.id]}
                            readOnly
                            className={styles.quantity_input}
                          />
                          <button
                            onClick={() => handleIncrementQuantity(item.id)}
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
                    value={redeemCode}
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
