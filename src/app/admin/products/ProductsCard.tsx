"use client";
import React from "react";
import {
	HeaderButton,
	Card,
	HeaderRow,
	AddButton,
	RefreshButton
} from "./components/Components";
import styles from "./components/products.module.css"

import BrandProducts, { Brand } from "./components/BrandProducts";

const brands: Brand[] = [
	{
		name: "Brand 1",
		products: [
			{
				name: "Product 1",
				price: 100,
				details: "Details 1",
				tos: "TOS 1",
				activeCodes: ["code1", "code2"]
			},
			{
				name: "Product 2",
				price: 200,
				details: "Details 2",
				tos: "TOS 2",
				activeCodes: ["code3", "code4"]
			}
		]
	},
	{
		name: "Brand 2",
		products: [
			{
				name: "Product 3",
				price: 300,
				details: "Details 3",
				tos: "TOS 3",
				activeCodes: ["code5", "code6"]
			},
			{
				name: "Product 4",
				price: 400,
				details: "Details 4",
				tos: "TOS 4",
				activeCodes: ["code7", "code8"]
			}
		]
	},
	{
		name: "Brand 3",
		products: [
			{
				name: "Product 5",
				price: 500,
				details: "Details 5",
				tos: "TOS 5",
				activeCodes: ["code9", "code10"]
			},
			{
				name: "Product 6",
				price: 600,
				details: "Details 6",
				tos: "TOS 6",
				activeCodes: ["code11", "code12"]
			}
		]
	},
	{
		name: "Brand 4",
		products: [
			{
				name: "Product 7",
				price: 700,
				details: "Details 7",
				tos: "TOS 7",
				activeCodes: ["code13", "code14"]
			},
			{
				name: "Product 8",
				price: 800,
				details: "Details 8",
				tos: "TOS 8",
				activeCodes: ["code15", "code16"]
			}
		]
	}
]

const ProductsCard = () => {
  const [ selectedProduct, setSelectedProduct ] = React.useState<[number, number]>([-1, -1])
  const [ isExpanded, setIsExpanded ] = React.useState<boolean[]>(brands.map(() => false))
  const handleExpand = (index: number) => {
	const arr = [...isExpanded]
	arr[index] = !arr[index]
	setIsExpanded(arr)
  };
  const openAll = () => {
	setIsExpanded(brands.map(() => true))
  }
  const collapseAll = () => {
	setIsExpanded(brands.map(() => false))
  }
  return (
  	<div className={styles.container}>
		<span className={styles.title}> Product Management </span>
		<Card header={
			<HeaderRow>
				<HeaderButton onClick={openAll}>Open All</HeaderButton>
				<HeaderButton onClick={collapseAll}>Collapse All</HeaderButton>
				<div className={styles.spacer} />
				<AddButton />
				<RefreshButton />
			</HeaderRow>
		} body= {<>
			<div className={styles.table}>
				<div className={styles.header_row}>
					<span className={styles.brand}>Brand</span>
					<span className={styles.product}>Product</span>
					<span className={styles.price}>Price</span>
					<span className={styles.stock}>Stock</span>
					<span className={styles.actions}>Actions</span>
				</div>
				{
					brands.map((brand, i) => {
						return (
							<BrandProducts 
								key={i}
								brands={brand}
								selectedProduct={selectedProduct[0] === i ? selectedProduct[1] : -1}
								onSelectProduct={(n) => setSelectedProduct([i, n])}
								isExpanded={isExpanded[i]}
								onToggle={() => handleExpand(i)}
							/>
						)
					})
				}
			</div>
		</>} />
	</div>
  );
};

export default ProductsCard;