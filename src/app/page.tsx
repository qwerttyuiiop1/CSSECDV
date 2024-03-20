"use client";

import styles from "./page.module.css";
import { AiOutlineArrowRight, AiOutlineShop } from "react-icons/ai";
import { BsGift } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { TfiWallet } from "react-icons/tfi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { shops } from "@/assets/data/shops";
import ShopCard from "@/components/ShopCard/ShopCard";
import ViewMoreCard from "@/components/ShopCard/ViewMoreCard";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className={styles.section1}>
        <div className={styles.section1_inner}>
          <div className={styles.section1_left}>
            <h1 className={styles.catchphrase}>EXCHANGE POINTS FOR VOUCHERS</h1>
            <h1 className={styles.subtext}>
              Welcome to Rewards Platform WebApp – Where Crypto Meets Rewards! Start converting your tokens into exciting vouchers today!
            </h1>
            <Link href={"/wallet"} className={styles.link}>
              <button className={styles.get_started_button}>
                GET STARTED
                <AiOutlineArrowRight
                  style={{
                    marginLeft: "0.5rem",
                    padding: "0",
                    strokeWidth: "50",
                  }}
                />
              </button>
            </Link>
          </div>
          <div className={styles.section1_right}>
            <div className={styles.img_wrapper}>
              <div className={styles.section1_img}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section2}>
        <div className={styles.stats_container}>
          <BsGift className={styles.section2_icon} />
          <h1 className={styles.section2_text}>500+</h1>
          <h1 className={styles.section2_text} style={{ fontWeight: "300" }}>
            VOUCHERS AVAILABLE
          </h1>
        </div>

        <div className={styles.stats_container}>
          <AiOutlineShop className={styles.section2_icon} />
          <h1 className={styles.section2_text}>50</h1>
          <h1 className={styles.section2_text} style={{ fontWeight: "300" }}>
            VARIOUS BRANDS
          </h1>
        </div>
      </div>

      <div className={styles.section3}>
        <div className={styles.section3_upper}>
          <h1 className={styles.section3_header}>
            Get started in a few minutes
          </h1>
          <h2 className={styles.section3_subheader}>
            with a few steps you can redeem various vouchers
          </h2>
        </div>
        <div className={styles.section3_lower}>
          <div className={styles.section3_step}>
            <MdAccountCircle className={styles.section3_icon} />
            <h1 className={styles.section3_text}>create an account</h1>
          </div>
          <div className={styles.horizontal_line}></div>
          <div className={styles.section3_step}>
            <TfiWallet className={styles.section3_icon} />
            <h1 className={styles.section3_text}>connect your wallet</h1>
          </div>
          <div className={styles.horizontal_line}></div>
          <div className={styles.section3_step}>
            <PiShoppingCartSimpleFill className={styles.section3_icon} />
            <h1 className={styles.section3_text}>shop and redeem vouchers</h1>
          </div>
        </div>
      </div>

      <div className={styles.section4}>
        <div className={styles.section4_inner}>
          <div className={styles.section4_upper}>
            <h1 className={styles.section4_header}>Claim vouchers</h1>
            <h2 className={styles.section4_subheader}>
              exchange your points for vouchers from these brands
            </h2>
          </div>

          <div className={styles.section4_grid}>
            {shops.slice(0, 7).map((shop, index) => (
              <ShopCard
                key={index}
                id={shop.id}
                src={shop.src}
                shopName={shop.shopName}
                availableVouchers={shop.availableVouchers}
                category={shop.category}
              />
            ))}
            <ViewMoreCard />
          </div>
        </div>
      </div>
    </div>
  );
}
