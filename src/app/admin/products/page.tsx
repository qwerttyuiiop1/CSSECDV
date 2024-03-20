"use client";
import React from "react";
import ProductsCard from "./ProductsCard";
import ProductDetailsCard from "./ProductDetailsCard";
import styles from "./page.module.css";
import { DefaultToastContainer } from "@/components/Providers/Forms";
import { ProductsProvider, useShops } from "@/components/Providers/Products/Products";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

const ProductsPage = () => {
  const { data: session } = useSession();
  if (session?.user?.role !== UserRole.ADMIN) return null;
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