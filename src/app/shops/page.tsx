"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ShopCard, { Category, Shop } from "@/components/ShopCard/ShopCard";
import Dropdown, { DropdownItem } from "@/components/Dropdown/Dropdown";
import { shops } from "@/assets/data/shops";

const dropdownOptions: DropdownItem[] = [
  { id: 0, label: "Recommended" },
  { id: 1, label: "Most Popular" },
  { id: 2, label: "Cheapest" },
  { id: 3, label: "Newest" },
];

export default function Shops() {
  const [categoryCheckedItems, setCategoryCheckedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [shopCheckedItems, setShopCheckedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<DropdownItem | null>(dropdownOptions[0]);

  const handleCategoryCheckboxChange = (item: string) => {
    setShopCheckedItems({});
    setCategoryCheckedItems({
      ...categoryCheckedItems,
      [item]: !categoryCheckedItems[item],
    });
  };

  const handleShopCheckboxChange = (item: string) => {
    setCategoryCheckedItems({});
    setShopCheckedItems({
      ...shopCheckedItems,
      [item]: !shopCheckedItems[item],
    });
  };

  const handleSelectionChange = (item: DropdownItem | null) => {
    setSelectedSortFilter(item);
  };

  useEffect(() => {
    console.log(selectedSortFilter);
    const newFilteredShops = shops.filter((shop) => {
      const categoryPasses =
        Object.keys(categoryCheckedItems).length === 0 ||
        categoryCheckedItems[shop.category];
      const shopPasses =
        Object.keys(shopCheckedItems).length === 0 ||
        shopCheckedItems[shop.shopName];
      return categoryPasses && shopPasses;
    });

    if (
      Object.values(categoryCheckedItems).every((checked) => !checked) &&
      Object.values(shopCheckedItems).every((checked) => !checked)
    ) {
      setFilteredShops(shops);
    } else {
      setFilteredShops(newFilteredShops);
    }
  }, [categoryCheckedItems, selectedSortFilter, shopCheckedItems]);

  return (
    <div className={styles.main_container}>
      <div className={styles.horizontal_container}>
        <div className={styles.filter_container}>
          <h1>Search Filter</h1>
          <h4 className={styles.header_text}>Categories</h4>
          <div className={styles.categories_container}>
            {Object.values(Category).map((item, index) => (
              <label className={styles.checkbox_label} key={index}>
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
          <div className={styles.shopfilters_container}>
            {shops.map((shop, index) => (
              <label className={styles.checkbox_label} key={index}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={() => handleShopCheckboxChange(shop.shopName)}
                  checked={shopCheckedItems[shop.shopName] || false}
                />
                <h4 className={styles.filter_item_name}>{shop.shopName}</h4>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.shop_container}>
          <div className={styles.shop_header_container}>
            <div className={styles.shop_info_container}>
              <h1 className={styles.shop_header}>SHOP</h1>
              <h4 className={styles.shop_num}>Showing 1-12 of 105</h4>
            </div>
            <div className={styles.sort_container}>
              <div
                style={{
                  height: "fitContent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3 style={{ marginRight: "0.6rem" }}>Sort By</h3>
                <Dropdown
                  options={dropdownOptions}
                  onSelectionChange={handleSelectionChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.shops_container}>
            {filteredShops.map((shop, index) => (
              <ShopCard
				key={index}
                id={shop.id}
                src={shop.src}
                shopName={shop.shopName}
                availableVouchers={shop.availableVouchers}
                category={shop.category}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom_container}>
        <button className={styles.page_button}>
          <h1>&lt;</h1>
        </button>

        <h1 className={styles.page_num}>1</h1>

        <button className={styles.page_button}>
          <h1>&gt;</h1>
        </button>
      </div>
    </div>
  );
}
