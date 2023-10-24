"use client"
import styles from "./page.module.css";

const defaultBalance = {
    points: 10000,
    token: 25.1234 
}

const defaultProfile = {
    username: "BrOdin",
    password: "hunter2",
    phoneNumber: "(+63) 986 255 9923",
    country: "Philippines",
    city: "Quezon City",
    address: "123 Rizal St."
}

const defaultTransactions = null;

export default function Wallet({ 
    balance=defaultBalance, 
    profile=defaultProfile, 
    transactions=defaultTransactions 
}) {
    return (
        <>
            <section className={styles.section}>
                <div><h1>My Balance</h1> <img src="/icons/eyes.svg" alt="Eye Toggle" /></div>
                <div className={styles.balance_subsection}>
                    <div className={`${styles.points_container} ${styles.content_block} ${styles.block_dark}`}>
                        <IconTextWrapper src="/icons/gift.svg" alt="Reward Points Icon" text="Reward Points" />
                        <div>{balance.points}</div>
                        <IconTextWrapper className={`${styles.button} ${styles.points_add}`} src="/icons/plus.svg" alt="Add Points Icon" text="Add Points" />
                    </div>
                    <div className={`${styles.token_container} ${styles.content_block} ${styles.block_light}`}>
                        <IconTextWrapper src="/icons/token.svg" alt="Token Icon" text="Token" />
                        <div>{balance.token}</div>
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                <div><h1>My Profile</h1></div>
                <div className={styles.profile_subsection}>
                    <div className={`${styles.profile_container} ${styles.content_block} ${styles.block_dark}`}>
                        <div className={styles.profile_table_container}>Profile Table</div>
                        <div className={`${styles.profile_cog_container} ${styles.button} ${styles.profile_edit}`}><img src="/icons/gear.svg" alt="Edit Profile"/></div>
                    </div>
                    <div className={`${styles.wallet_container} ${styles.content_block} ${styles.block_light}`}>
                        <IconTextWrapper src="/icons/WalletConnect-Logo1.svg" alt="Wallet Connect Logo" text="Wallet" />
                        <div>No Wallet Connected</div>
                        <IconTextWrapper className={`${styles.button} ${styles.wallet_connect}`} src="/icons/link.svg" alt="Link Icon" text="Connect Wallet" />
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                <div><h1>My Transactions</h1></div>
                <div className={styles.transactions_subsection}>
                    <div className={styles.transactions_page_container}>
                        <div className={styles.transactions_amount_display}>
                            Showing 1-15 of 213
                        </div>
                        <div className={styles.transactions_page_selector}>
                            Page 1
                        </div>
                    </div>
                    <div className={styles.transactions_table_container}>
                        Table Contents
                    </div>
                </div>
            </section>
        </>
    );
}

// function HeaderSection({ children, className="", header, afterHeader=null }) {
//     return (
//         <section className={styles.section}>
//             <div><h1>{header}</h1>{afterHeader}</div>
//             <div className={className}>
//                 {children}
//             </div>
//         </section>
//     );
// }

function IconTextWrapper({ className="", src, alt, text }) {
    return (
        <div className={`${styles.icon_text_wrapper} ${className}`}>
            <img src={src} alt={alt} /> 
            <span>{text}</span>
        </div>
    );
}

function BalanceSection() {

}

function ProfileSection() {

}

function TransactionsSection() {

}