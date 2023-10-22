import styles from "./ShopCard.module.css";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function ViewMoreCard() {
  return (
    <Link href={"shops"}>
      <div className={styles.view_more_container}>
        <h1 style={{ color: "black" }}>VIEW MORE SHOPS</h1>
        <AiOutlineArrowRight
          style={{ color: "black", width: "4rem", height: "4rem" }}
        />
      </div>
    </Link>
  );
}
