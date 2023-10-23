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
                <div><h1>My Balance</h1><span>Eye toggle</span></div>
                <div className={styles.balance_subsection}>
                    <div className={`${styles.points_container} ${styles.content_block} ${styles.block_dark}`}>
                        <div>Reward Points</div>
                        <div>{balance.points}</div>
                        <div>Add Points</div>
                    </div>
                    <div className={`${styles.token_container} ${styles.content_block} ${styles.block_light}`}>
                        <div>Token</div>
                        <div>{balance.token}</div>
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                <div><h1>My Profile</h1></div>
                <div className={styles.profile_subsection}>
                    <div className={`${styles.profile_container} ${styles.content_block} ${styles.block_dark}`}>
                        <div className={styles.profile_table_container}>Profile Table</div>
                        <div className={styles.profile_cog_container}>Cog Button</div>
                    </div>
                    <div className={`${styles.wallet_container} ${styles.content_block} ${styles.block_light}`}>
                        <div>Wallet</div>
                        <div>No Wallet Connected</div>
                        <div>Connect Wallet</div>
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