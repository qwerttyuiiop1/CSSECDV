"use client";

import { useState } from "react";
import styles from "./page.module.css";

const filter_items = [
  "Beauty & Fashion",
  "Department Stores",
  "Electronics",
  "Food & Drinks",
  "Gaming",
  "Hobbies",
  "Lifestyle",
  "Travel",
  "Online Shopping",
];

const shops = [
  "App Store",
  "Bench",
  "Fully Booked",
  "Grab Car",
  "Grab Food",
  "Lalamove",
  "Lazada",
  "National Bookstore",
  "Samsung",
  "Shopee",
  "SM Supermarket",
  "Steam",
  "Uniqlo",

  "App Store",
  "Bench",
  "Fully Booked",
  "Grab Car",
  "Grab Food",
  "Lalamove",
  "Lazada",
  "National Bookstore",
  "Samsung",
  "Shopee",
  "SM Supermarket",
  "Steam",
  "Uniqlo",
];

interface FilterItemsProps {
  items: string[];
}

export default function Shop() {
  const [categoryCheckedItems, setCategoryCheckedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [shopCheckedItems, setShopCheckedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const handleCategoryCheckboxChange = (item: string) => {
    setCategoryCheckedItems({
      ...categoryCheckedItems,
      [item]: !categoryCheckedItems[item],
    });
  };

  const handleShopCheckboxChange = (item: string) => {
    setShopCheckedItems({
      ...shopCheckedItems,
      [item]: !shopCheckedItems[item],
    });
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.filter_container}>
        <h1>Search Filter</h1>
        <h4 className={styles.header_text}>Categories</h4>
        <div className={styles.categories_container}>
          {filter_items.map((item, index) => (
            <label className={styles.checkbox_label}>
              <input
                type="checkbox"
                className={styles.checkbox}
                onChange={() => handleCategoryCheckboxChange(item)}
                checked={categoryCheckedItems[item] || false}
              />
              <h4 className={styles.filter_item_name}>{item}</h4>
            </label>
          ))}
        </div>

        <h4 className={styles.header_text}>Shop</h4>
        <div className={styles.shops_container}>
            {shops.map((item, index) => (
              <label className={styles.checkbox_label}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={() => handleShopCheckboxChange(item)}
                  checked={shopCheckedItems[item] || false}
                />
                <h4 className={styles.filter_item_name}>{item}</h4>
              </label>
            ))}
        </div>
      </div>


      <div className={styles.shop_container}>hello</div>
    </div>
  );
}
