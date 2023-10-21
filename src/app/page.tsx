"use client";

import styles from "./page.module.css";
import { AiOutlineArrowRight, AiOutlineShop } from "react-icons/ai";
import { BsGift } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { TfiWallet } from "react-icons/tfi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { shops } from "./shops/page";
import ShopCard from "@/components/ShopCard/ShopCard";
import ViewMoreCard from "@/components/ShopCard/ViewMoreCard";

export default function Home() {
  const smIconStyle = {
    height: "3rem",
    width: "3rem",
    marginBottom: "0.5rem",
  };

  const lgIconStyle = {
    height: "7rem",
    width: "7rem",
    marginBottom: "0.5rem",
  };

  return (
    <div>
      <div className={styles.section1}>
        <div className={styles.section1_inner}>
          <div className={styles.section1_left}>
            <h1 className={styles.catchphrase}>EXCHANGE POINTS FOR VOUCHERS</h1>
            <h1 className={styles.subtext}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              pretium, magna id faucibus mattis, augue libero dictum metus, ut
              luctus mi lorem ut quam.
            </h1>
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
          </div>
          <div className={styles.section1_right}>
            <div className={styles.section1_img}></div>
          </div>
        </div>
      </div>
      <div className={styles.section2}>
        <div className={styles.stats_container}>
          <BsGift style={smIconStyle} />
          <h1>500+</h1>
          <h1 style={{ fontWeight: "300" }}>VOUCHERS AVAILABLE</h1>
        </div>

        <div className={styles.stats_container}>
          <AiOutlineShop style={smIconStyle} />
          <h1>50</h1>
          <h1 style={{ fontWeight: "300" }}>VARIOUS BRANDS</h1>
        </div>
      </div>
      <div className={styles.section3}>
        <div className={styles.section3_upper}>
          <h1 style={{ fontSize: "4rem" }}>Get started in a few minutes</h1>
          <h2 style={{ fontWeight: "100" }}>
            with a few steps you can redeem various vouchers
          </h2>
        </div>
        <div className={styles.section3_lower}>
          <div className={styles.section3_step}>
            <MdAccountCircle style={lgIconStyle} />
            <h1 className={styles.section3_text}>create an account</h1>
          </div>
          <div className={styles.horizontal_line}></div>
          <div className={styles.section3_step}>
            <TfiWallet style={lgIconStyle} />
            <h1 className={styles.section3_text}>connect your wallet</h1>
          </div>
          <div className={styles.horizontal_line}></div>
          <div className={styles.section3_step}>
            <PiShoppingCartSimpleFill style={lgIconStyle} />
            <h1 className={styles.section3_text}>shop and redeem vouchers</h1>
          </div>
        </div>
      </div>

      <div className={styles.section4}>
        <div className={styles.section4_inner}>
          <div className={styles.section4_upper}>
            <h1 style={{ fontSize: "4rem" }}>Claim vouchers</h1>
            <h2 style={{ fontWeight: "100" }}>
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

      <div className={styles.section5}>
        <div className={styles.section5_about_us}>ABOUT US</div>
        <div className={styles.section5_inner}>
          <img className={styles.section5_img} src="" alt="company image" />
          <div className={styles.company_info}>
            <h1 className={styles.company_name}>COMPANY NAME</h1>
            <h3 className={styles.company_subtext}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
