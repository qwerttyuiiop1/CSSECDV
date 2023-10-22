"use client";
import React from "react";
import ProductsCard from "./ProductsCard";
import ProductDetailsCard from "./ProductDetailsCard";
import { Brand } from "./Brand";
import styles from "./page.module.css";
import BaseModal from "@/components/Modal/BaseModal";
import { Separator, Title } from "@/components/CardPage/CardPage";


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

const ProductsPage = () => {
  const [ selectedProduct, setSelectedProduct ] = React.useState<[number, number]>([-1, -1]);
  return (
	<div className={styles.main_container}>
		<div className={styles.left}>
			<ProductsCard brands={brands} selectedProduct={selectedProduct} onSelectProduct={setSelectedProduct} />
		</div>
		<div className={styles.separator} />
		<div className={styles.right}>
			<ProductDetailsCard product={ brands[selectedProduct[0]]?.products[selectedProduct[1]] } />
		</div>
	</div>
  );
};

export default ProductsPage;