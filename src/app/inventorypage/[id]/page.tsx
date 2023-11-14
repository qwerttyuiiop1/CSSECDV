import React from 'react';

// Import the InventoryItem type from the appropriate location
import { InventoryItem } from '../page'; // Adjust the path accordingly
import styles from "./page.module.css";
interface DescriptionContainerProps {
  selectedItem: InventoryItem | null;
}

const DescriptionContainer = () => {
  const selectedItem: InventoryItem = {
	id: -1,
	name: "name",
	redeemed: false,
	code: "code",
	imageSrc: ""
  }; // TODO: export default can't have props
  if (!selectedItem) {
    return <p>Select an item to see its description.</p>;
  }

  // Replace the following placeholders with your actual shop name and shop image URLs
  const shopName = 'Your Shop Name';
  const shopImageSrc = 'your-shop-image-url.jpg';

 
  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.itemImage}>
        <img src={selectedItem.imageSrc} alt={selectedItem.name} />
        <div className={styles.itemId}>#{selectedItem.id}</div>
    
      <div>
        <h3 className={styles.product_name}>{selectedItem.name}</h3>
        <p className={styles.product_code}>{selectedItem.code}</p>
        </div>
        <div className={styles.horizontalLine}></div>
        </div>
        <h3 className={styles.bold_text}>Product Description:</h3>
        <p className={styles.product_desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
        </p>
        <h3 className={styles.bold_text}>Terms & Conditions:</h3>
        <ul className={styles.tc}>
            <li className={styles.product_tc}>
              The voucher is not valid for use on the shipping fee
            </li>
            <li className={styles.product_tc}>
              The voucher may not be refunded, exchanged, converted or voided
              under any circumstance.{" "}
            </li>
            <li className={styles.product_tc}>
              The use of promo code is subject to the Lazada’s Voucher Terms and
              Conditions.
            </li>
            <li className={styles.product_tc}>
              The voucher has a 6 month expiry, is for one time use only and
              cannot be used in conjunction with other promos or discounts
            </li>
            <li className={styles.product_tc}>
              If the purchase value is less than the voucher used, the excess
              amount will not be credited to the account nor will it be carried
              over in any succeeding purchases
            </li>
          </ul>
      
    </div>
  );
};

export default DescriptionContainer;
