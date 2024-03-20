"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import coinAnimation from "../../../assets/lottie/animation_coin.json";
import checkAnimation from "../../../assets/lottie/animation_check.json";
import errorAnimation from "../../../assets/lottie/animation_error.json";

import { motion, AnimatePresence } from "framer-motion";

import Lottie from "lottie-react";
import { Product, Shop } from "@/lib/types/Shop";

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [shop, setShop] = useState<Shop | undefined>(undefined);

  useEffect(() => {
    const fetchShop = async () => {
      const response = await fetch(`/api/shop/${params.id}`);
      if (!response.ok) {
        console.error(`Failed to fetch shop: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      console.log(data);
      setShop(data.shop);
      setSelectedVoucherAmount(data.shop.products[0]?.price || null);
      setSelectedProduct(data.shop.products[0] || null);
      setProductDescription(data.shop.products[0]?.details || "");
      setTos(data.shop.products[0].tos);
    };

    fetchShop();
  }, [params.id]);

  const rewardPoints = 250;
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [isAddToCartButtonDisabled, setAddToCartButtonDisabled] =
    useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedVoucherAmount, setSelectedVoucherAmount] = useState<
    number | null
  >(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDescription, setProductDescription] = useState("");
  const [tos, setTos] = useState("");

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedVoucherAmount === null || quantity < 1) {
      console.log("error");

      setShowError(true);
      setAddToCartButtonDisabled(true);

      setTimeout(() => {
        setShowError(false);
        setAddToCartButtonDisabled(false);
      }, 2300);
    } else {
      console.log("Added to Cart:", selectedVoucherAmount, quantity);

      setShowAddToCart(true);
      setAddToCartButtonDisabled(true);

      setTimeout(() => {
        setShowAddToCart(false);
        setAddToCartButtonDisabled(false);
      }, 2300);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value) || 0;
    setQuantity(newValue);
  };

  const getPrices = (shop: Shop) => {
    const prices: number[] = [];
    shop.products.forEach((product) => {
      if (product.price) {
        prices.push(product.price);
      }
    });
    return prices;
  };

  useEffect(() => {
    const product =
      shop?.products.find(
        (product) => product.price === selectedVoucherAmount
      ) || null;
    setSelectedProduct(product);
    setProductDescription(product?.details || "");
    setTos(product?.tos || "");
    if (!product || !product.stock || product.stock <= 0) {
      setAddToCartButtonDisabled(true);
    } else {
      setAddToCartButtonDisabled(false);
    }
  }, [selectedVoucherAmount]);

  const cardStyle = {
    height: "50rem",
    width: "50rem",
    border: "3rem solid #242323",
    padding: "5rem",
    marginRight: "2rem",
    borderRadius: "1.5rem",
    overflow: "hidden",
    backgroundImage: `url(${shop?.img_src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className={styles.main_container}>
      <AnimatePresence>
        {showAddToCart && (
          <motion.div
            key="modal"
            className={styles.add_to_cart_notif}
            initial={{ right: -300, opacity: 0 }}
            animate={{ right: 30, opacity: 1 }}
            exit={{ right: -300, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Lottie
              animationData={checkAnimation}
              className={styles.check_animation}
            />
            <motion.h3>Added to Cart</motion.h3>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showError && (
          <motion.div
            key="modal"
            className={styles.error_msg}
            initial={{ right: -300, opacity: 0 }}
            animate={{ right: 30, opacity: 1 }}
            exit={{ right: -300, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Lottie
              animationData={errorAnimation}
              className={styles.error_animation}
              loop={false}
            />
            <motion.h3>Please enter valid options</motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.shop_voucher_container}>
        <div style={cardStyle}></div>
        <div className={styles.voucher_order_container}>
          <h1 className={styles.shop_name}>{shop?.name} E-VOUCHER</h1>
          <div className={styles.reward_points_container}>
            <Lottie
              animationData={coinAnimation}
              className={styles.coin_animation}
              loop={true}
            />
            <h1 className={styles.reward_points}>
              {rewardPoints} Reward Points
            </h1>
          </div>

          <h1>Voucher amount</h1>
          <ul className={styles.amount_options}>
            {shop &&
              getPrices(shop).map((amount, index) => (
                <li className={styles.option_li} key={index}>
                  <input
                    className={styles.option_label}
                    type="radio"
                    id={amount.toString()}
                    name="amount"
                    checked={amount === selectedVoucherAmount}
                    onChange={() => setSelectedVoucherAmount(amount)}
                  />
                  <label
                    className={styles.option_input}
                    htmlFor={amount.toString()}
                  >
                    ₱{amount}
                  </label>
                </li>
              ))}
          </ul>

          <h1>Quantity</h1>

          <div className={styles.qty_container}>
            <form
              className={styles.qty_form}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="button"
                value="-"
                className={styles.btn_minus}
                onClick={handleDecrement}
              />
              <input
                type="text"
                name="quantity"
                value={quantity}
                className={styles.qty}
                onChange={handleInputChange}
              />
              <input
                type="button"
                value="+"
                className={styles.btn_plus}
                onClick={handleIncrement}
              />
            </form>
            <h4 className={styles.vouchers_left}>
              {selectedProduct ? selectedProduct.stock : 0} vouchers left
            </h4>
          </div>

          <button
            className={`${styles.add_to_cart} ${
              isAddToCartButtonDisabled ? styles.disabled_button : ""
            }`}
            onClick={handleAddToCart}
            disabled={isAddToCartButtonDisabled}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <div className={styles.info_container}>
        <div className={styles.product_desc_container}>
          <h1>Product Description</h1>
          <p className={styles.product_desc}>{productDescription}</p>
          <ul className={styles.tc}>
            {/* <li className={styles.tc_item}>Lorem</li>
            <li className={styles.tc_item}>ipsum</li>
            <li className={styles.tc_item}>dolor</li>
            <li className={styles.tc_item}>sit</li>
            <li>amet</li> */}
          </ul>
        </div>
        <div className={styles.tc_container}>
          <h1>Terms & Conditions</h1>
          <ul className={styles.tc}>
            {tos}
            {/* <li className={styles.tc_item}>
              The voucher is not valid for use on the shipping fee
            </li>
            <li className={styles.tc_item}>
              The voucher may not be refunded, exchanged, converted or voided
              under any circumstance.{" "}
            </li>
            <li className={styles.tc_item}>
              The use of promo code is subject to the Lazada’s Voucher Terms and
              Conditions.
            </li>
            <li className={styles.tc_item}>
              The voucher has a 6 month expiry, is for one time use only and
              cannot be used in conjunction with other promos or discounts
            </li>
            <li>
              If the purchase value is less than the voucher used, the excess
              amount will not be credited to the account nor will it be carried
              over in any succeeding purchases
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
