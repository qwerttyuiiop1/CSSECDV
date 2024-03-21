"use client";

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { DescriptionContainer } from './[id]/CodeDescription';
import { Transaction, TransactionItem } from '@type/Transaction';
import { DefaultToastContainer } from '@/components/Providers/Forms';

type Item = TransactionItem & { id: number };
function InventoryPage({
  items,
  setItems,
}: {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]|null>>;
}) {
  const itemsPerPage = 12;
  const [showRedeemed, setShowRedeemed] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<Item[]>([]);

  const totalPages = Math.ceil(
    (showRedeemed ? items.filter(item => item.isRedeemed) : items).length / itemsPerPage
  );
  useEffect(() => {
	const paginatedItems = items
		.filter(item => (!showRedeemed || item.isRedeemed))
		.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	paginatedItems.sort((a, b) => a.id - b.id);
	setPaginatedItems(paginatedItems);
	const newSelectedItem = paginatedItems.find(item => item.id === selectedItem?.id);
	setSelectedItem(newSelectedItem || null);
  }, [items, showRedeemed, currentPage, selectedItem?.id]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleItemUpdate = (item: Item) => {
	setItems(prevItems => {
	  if (prevItems === null) return null;
	  return prevItems.map(i => i.id === item.id ? item : i);
	});
  }

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCheckboxAction = (id: number) => {
	const setRedeemed = (isRedeemed: boolean) => {
	  setItems(prevItems => {
		if (prevItems === null) return null;
		const newItems = [...prevItems];
		newItems.find(item => item.id === id)!.isRedeemed = isRedeemed;
		return newItems;
	  });
	}
	const item = items.find(item => item.id === id)!
	const prev = item.isRedeemed;
	setRedeemed(!prev);
	fetch('/api/profile/redeem', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({
		code: item.code,
		productId: item.product.id,
		isRedeemed: !prev
	  })
	}).then(res => res.json())
	.then(json => setRedeemed(!prev))
	.catch(err => setRedeemed(prev));
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
                All
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
                {Math.min(currentPage * itemsPerPage, items.length)} of {items.length}
              </div>
              <div className={styles.pagination}>
                <div
                  className={currentPage > 1 ? styles.pageButton : `${styles.pageButton}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &lt;
                </div>
                <span className={styles.pagetitle}>Page {currentPage}</span>
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
                {showRedeemed ? 'Redeemed' : 'All'}
              </p>
            </div>
            <div className={styles.itemPanels}>
              {paginatedItems.map(item => (
                <div
                  key={item.id}
                  className={`${styles.inventoryItem} ${
                    item.isRedeemed ? styles.redeemed : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className={styles.checkboxButtonContainer}>
                    <div className={styles.checkboxButton}>
                      <input type="checkbox" checked={item.isRedeemed} 
						onChange={e => handleCheckboxAction(item.id)}/>
                    </div>
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemId}>#{item.id + 1}</div>
                    <div className={styles.imgContainer}>
                      <img
                        src={item.img}
                        alt={item.product.name}
                        className={item.isRedeemed ? styles.redeemedImage : ''}
                      />
                    </div>
                    <div className={styles.itemName}>
                      <p className={styles.itemNameText}>{item.product.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <DescriptionContainer selectedItem={selectedItem} onUpdate={handleItemUpdate}/>
        </div>
      </div>
    </div>
  );
}

export default function Wrapper() {
	const [ items, setItems ] = useState<Item[] | null>(null);
	useEffect(() => {
		fetch('/api/profile/transaction')
		.then(res => res.json())
		.then(json => setItems(
			json.transactions.flatMap((t: Transaction) => t.items)
			.map((item: TransactionItem, i: number) => ({...item, id: i}))
		))
	}, [])
	return <div>
		<DefaultToastContainer />
		{items === null ? <p>Loading...</p> : <InventoryPage items={items} setItems={setItems} />}
	</div>
}