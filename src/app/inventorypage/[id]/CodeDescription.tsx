import React from 'react';
import styles from "./page.module.css";
import { TransactionItem } from '@type/Transaction';
type Item = TransactionItem & { id: number };
interface DescriptionContainerProps {
  selectedItem: Item | null;
}

export const DescriptionContainer = ({ selectedItem }: DescriptionContainerProps) => {
  if (!selectedItem)
    return <div className={styles.descriptionContainer}>
		<p>Select an item to see its description.</p>
	</div>

  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.itemImage}>
        <img src={selectedItem.img} alt={selectedItem.product.name} />
        <div className={styles.itemId}>#{selectedItem.id}</div>
    
      <div>
        <h3 className={styles.product_name}>{selectedItem.product.name}</h3>
        <p className={styles.product_code}>{selectedItem.code}</p>
        </div>
        <div className={styles.horizontalLine}></div>
        </div>
        <h3 className={styles.bold_text}>Product Description:</h3>
        <p className={styles.product_desc}>
          {selectedItem.product.details}
        </p>
        <h3 className={styles.bold_text}>Terms & Conditions:</h3>
        {/*<ul className={styles.tc}>
            <li className={styles.product_tc}> </li>
  		</ul>*/}
		<p className={styles.product_tc}>{selectedItem.product.tos}</p>
    </div>
  );
};