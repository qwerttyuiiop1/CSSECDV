"use client";

import React, { useState } from 'react';
import styles from "./page.module.css";
import DescriptionContainer from './[id]/page';

export interface InventoryItem {
  id: number;
  name: string;
  redeemed: boolean;
  code: string;
  imageSrc: string; // Add imageSrc property
}

export default function InventoryPage() {
  // Sample data for user inventory
  const initialInventory: InventoryItem[] = [
    { id: 1, name: 'App Store P500 Voucher ', redeemed: false, code: 'ABC-DEF-GHI', imageSrc: "https://images.macrumors.com/t/idlrs_bvpmrXXsR7jhkKiPFbr7A=/400x400/smart/article-new/2022/01/iOS-App-Store-General-Feature-JoeBlue.jpg" },
    { id: 2, name: 'Bench P100 Voucher',code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "https://awards.brandingforum.org/wp-content/uploads/2017/11/BENCH-logo.jpg" },
    { id: 3, name: 'Lazada P300 Voucher', code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "https://lzd-img-global.slatic.net/g/tps/tfs/TB1PApewFT7gK0jSZFpXXaTkpXa-200-200.png" },
    { id: 4, name: 'SM P1000 Voucher',code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "https://www.smsupermalls.com/data/uploads/2021/08/smsupermarket.png" },
    { id: 5, name: 'Grab P500 Voucher',code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "data:image/png;base64,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" },
    { id: 6, name: 'App Store P500 Voucher ', redeemed: false, code: 'ABC-DEF-GHI', imageSrc: "https://images.macrumors.com/t/idlrs_bvpmrXXsR7jhkKiPFbr7A=/400x400/smart/article-new/2022/01/iOS-App-Store-General-Feature-JoeBlue.jpg" },
    { id: 7, name: 'Fully Booked P150 Voucher',code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "https://cdn.lovesavingsgroup.com/logos/fully-booked.jpg" },
    { id: 8, name: 'Lazada P300 Voucher', code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "https://lzd-img-global.slatic.net/g/tps/tfs/TB1PApewFT7gK0jSZFpXXaTkpXa-200-200.png" },
    { id: 9, name: 'Steam P1000 Voucher',code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "https://static.vecteezy.com/system/resources/previews/020/336/732/original/steam-logo-steam-icon-free-free-vector.jpg" },
    { id: 10, name: 'National Bookstore P100 Voucher',code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "data:image/jpeg;base64,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" },
    { id: 11, name: 'Bench P100 Voucher',code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "https://awards.brandingforum.org/wp-content/uploads/2017/11/BENCH-logo.jpg" },
    { id: 12, name: 'Lazada P200 Voucher', code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "https://lzd-img-global.slatic.net/g/tps/tfs/TB1PApewFT7gK0jSZFpXXaTkpXa-200-200.png" },
    { id: 13, name: 'Steam P1000 Voucher',code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "https://static.vecteezy.com/system/resources/previews/020/336/732/original/steam-logo-steam-icon-free-free-vector.jpg" },
    { id: 14, name: 'Grab P500 Voucher',code: 'ABC-DEF-GHI', redeemed: false, imageSrc: "data:image/png;base64,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" },
    // Add image source for other items
    { id: 15, name: 'Fully Booked P150 Voucher', code: 'ABC-DEF-GHI', redeemed: true, imageSrc: "https://cdn.lovesavingsgroup.com/logos/fully-booked.jpg" },
    { id: 16, name: 'Lalamove P100 Voucher',code: 'ABC-DEF-GHI',  redeemed: true, imageSrc: "https://cdn.lovesavingsgroup.com/logos/lalamove.png" },
    { id: 17, name: 'App Store P500 Voucher ', redeemed: true, code: 'ABC-DEF-GHI', imageSrc: "https://images.macrumors.com/t/idlrs_bvpmrXXsR7jhkKiPFbr7A=/400x400/smart/article-new/2022/01/iOS-App-Store-General-Feature-JoeBlue.jpg" },
    { id: 18, name: 'Fully Booked P150 Voucher',code: 'ABC-DEF-GHI', redeemed: true, imageSrc: "https://cdn.lovesavingsgroup.com/logos/fully-booked.jpg" },
    { id: 19, name: 'Lazada P300 Voucher', code: 'ABC-DEF-GHI', redeemed: true, imageSrc: "https://lzd-img-global.slatic.net/g/tps/tfs/TB1PApewFT7gK0jSZFpXXaTkpXa-200-200.png" },
  ];

  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const descendingInventory = [...inventory].reverse();
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: boolean }>({});
  const [showRedeemed, setShowRedeemed] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    inventory.filter(item => (!showRedeemed || item.redeemed)).length / itemsPerPage
  );

  const paginatedItems = descendingInventory
    .filter(item => (!showRedeemed || item.redeemed))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemClick = (item: InventoryItem) => {
    setSelectedItem(item);
  };

  const handleCheckboxAction = (itemId: number) => {
    setInventory(prevInventory => {
      return prevInventory.map(item => {
        if (item.id === itemId) {
          return { ...item, redeemed: !item.redeemed };
        }
        return item;
      });
    });

    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId],
    }));
  };

  return (
    <div className={styles.userInventoryPage}>
      <div className={styles.header}>
        <p>Inventory</p>
      </div>
      <div className={styles.underHeader}>
        <div className={styles.inventoryContent}>
          <div className={styles.topButtons}>
            <div className={styles.buttonsContainer}>
              <button
                className={`${showRedeemed ? styles.redeemedButton + ' ' + styles.inactive : styles.unredeemedButton}`}
                onClick={() => {
                  setShowRedeemed(false);
                  setCurrentPage(1);
                }}
              >
                Unredeemed
              </button>
              <button
                className={`${showRedeemed ? styles.unredeemedButton : styles.redeemedButton + ' ' + styles.inactive}`}
                onClick={() => {
                  setShowRedeemed(true);
                  setCurrentPage(1);
                }}
              >
                Redeemed
              </button>
            </div>
            <div className={styles.pageInfoContainer}>
              <div className={styles.pageInfo}>
                Showing {((currentPage - 1) * itemsPerPage + 1)}-
                {Math.min(currentPage * itemsPerPage, inventory.length)} of {inventory.length}
              </div>
              <div className={styles.pagination}>
                <div
                  className={currentPage > 1 ? styles.pageButton : `${styles.pageButton}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &lt;
                </div>
                <span>Page {currentPage}</span>
                <div
                  className={currentPage < totalPages ? styles.pageButton : `${styles.pageButton} `}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &gt;
                </div>
              </div>
            </div>
          </div>
          <div className={styles.inventoryList}>
            <div className={styles.inventoryLabel}>
              <p className={styles.inventoryLabelText}>
                {showRedeemed ? 'Redeemed' : 'Unredeemed'}
              </p>
              <div className={styles.inventoryLabelLine}></div>
            </div>
            <div className={styles.itemPanels}>
              {paginatedItems.map(item => (
                <div
                  key={item.id}
                  className={`${styles.inventoryItem} ${selectedItems[item.id] ? styles.selected : ''} ${
                    item.redeemed ? styles.redeemed : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className={styles.checkboxButtonContainer}>
                    <button
                      className={styles.checkboxButton}
                      onClick={e => {
                        e.stopPropagation();
                        handleCheckboxAction(item.id);
                      }}
                    >
                      <input type="checkbox" checked={item.redeemed} />
                    </button>
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemId}>#{item.id}</div>
                    <div className={styles.imgContainer}>
                      <img
                        src={item.imageSrc}
                        alt={item.name}
                        className={item.redeemed ? styles.redeemedImage : ''}
                      />
                    </div>
                    <div className={styles.itemName}>{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <DescriptionContainer selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}