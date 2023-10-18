import React from "react";
import styles from "./ShopCard.module.css";
import Link from "next/link";

export enum Category {
  BF = "Beauty & Fashion",
  DS = "Department Stores",
  EL = "Electronics",
  FD = "Food & Drinks",
  GM = "Gaming",
  HB = "Hobbies",
  LS = "Lifestyle",
  TR = "Travel",
  OS = "Online Shopping",
}

export interface Shop {
  id: number;
  src: string;
  shopName: string;
  availableVouchers?: number[];
  category: Category;
}

const ShopCard: React.FC<Shop> = ({ id, src, shopName, availableVouchers }) => {
  const cardStyle = {
    height: "15rem",
    width: "15rem",
    border: "4px solid #FFFFFF",
    borderRadius: "0.6rem",
    overflow: "hidden",
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Link
      href={`shops/${id}`}
      className={styles.card_container}
      style={cardStyle}
    >
      <div className={styles.shop_info}>
        <h4 className={styles.shop_name}>{shopName}</h4>
        <div className={styles.vouchers_container}>
          {availableVouchers?.map((amount, index) => (
            <div key={index} style={{ display: "inline-block" }}>
              {index > 0 && <span className={styles.divider}>|</span>}
              <p style={{ display: "inline" }}>{`₱${amount}`}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
