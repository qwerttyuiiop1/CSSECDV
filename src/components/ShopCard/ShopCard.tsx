import React from "react";
import styles from "./ShopCard.module.css";

export interface ShopCardProps {
  src: string;
  shopName: string;
  availableVouchers?: number[];
}

const ShopCard: React.FC<ShopCardProps> = ({
  src,
  shopName,
  availableVouchers,
}) => {
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
    <div className={styles.card_container} style={cardStyle}>
      <div className={styles.shop_info}>
        <h4 className={styles.shop_name}>{shopName}</h4>
        <div className={styles.vouchers_container}>
          {availableVouchers?.map((amount, index) => (
            <div key={index}>
              {index > 0 && <span className={styles.divider}>|</span>}
              <a href="" className={styles.amount}>{`₱${amount}`}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
