import styles from "./page.module.css";
import { AiOutlineArrowRight, AiOutlineShop } from "react-icons/ai";
import { BsGift } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { TfiWallet } from "react-icons/tfi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";


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
                {}
          </div>
        </div>
      </div>
    </div>
  );
}
