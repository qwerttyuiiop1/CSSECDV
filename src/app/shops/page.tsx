"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ShopCard, { Category } from "@/components/ShopCard/ShopCard";
import Dropdown, { DropdownItem } from "@/components/Dropdown/Dropdown";
import { Shop } from "@/lib/types/Shop";
import { CategoryMap } from "@/lib/types/Shop";

const dropdownOptions: DropdownItem[] = [
  { id: 0, label: "Recommended" },
  { id: 1, label: "Most Popular" },
  { id: 2, label: "Cheapest" },
  { id: 3, label: "Newest" },
];

export default function Shops() {
  const [shops, setShops] = useState<Shop[]>([]);
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

  const getCategories = (shop: Shop) => {
    const categories: string[] = [];
    shop.products.forEach((product) => {
      if (product.category) {
        categories.push(product.category.toString());
      }
    });
    return categories;
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
    const fetchShops = async () => {
      try {
        const response = await fetch("/api/shop?names=false");
        const data = await response.json();
        setShops(data.shops);
        setFilteredShops(data.shops);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };
    fetchShops();
  }, []);

  useEffect(() => {
    console.log(categoryCheckedItems);
    const newFilteredShops = shops.filter((shop) => {
      const categoryPasses =
        Object.keys(categoryCheckedItems).length === 0 ||
        categoryCheckedItems[
          Category[getCategories(shop)[0] as keyof typeof Category]
        ];
      const shopPasses =
        Object.keys(shopCheckedItems).length === 0 ||
        shopCheckedItems[shop.name];
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
                  onChange={() => handleShopCheckboxChange(shop.name)}
                  checked={shopCheckedItems[shop.name] || false}
                />
                <h4 className={styles.filter_item_name}>{shop.name}</h4>
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
                src={shop.img_src}
                shopName={shop.name}
                availableVouchers={getPrices(shop)}
                category={getCategories(shop)[0]}
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
