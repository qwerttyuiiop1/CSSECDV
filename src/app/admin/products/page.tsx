"use client";
import React from "react";
import ProductsCard from "./ProductsCard";
import ProductDetailsCard from "./ProductDetailsCard";
import styles from "./page.module.css";
import { DefaultToastContainer } from "@/components/Providers/Forms";
import { ProductsProvider, useShops } from "@/components/Providers/Products/Products";

const ProductsPage = () => {
  return (
	<ProductsProvider>	
		<div className={styles.main_container}>
			<div className={styles.left}>
				<ProductsCard />
			</div>
			<div className={styles.separator} />
			<div className={styles.right}>
				<ProductDetailsCard />
			</div>
		</div>
		<DefaultToastContainer />
	</ProductsProvider>
  );
};

export default ProductsPage;