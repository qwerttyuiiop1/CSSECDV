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
            <BalanceSection balance={balance} />
            <ProfileSection profile={profile} />
            <TransactionsSection transactions={transactions} />
        </>
    );
}

function HeaderSection({ children, className="", header, afterHeader=null }) {
    return (
        <section className={styles.section}>
            <div><h1>{header}</h1> {afterHeader}</div>
            <div className={className}>
                {children}
            </div>
        </section>
    );
}

function IconTextWrapper({ className="", src, alt, text="" }) {
    return (
        <div className={`${text && styles.icon_text_wrapper} ${className}`}>
            <img src={src} alt={alt} /> 
            {text && (<span>{text}</span>)}
        </div>
    );
}

function IconTextButton({ className="", src, alt, text, onClick }) {
    return (
        <div onClick={onClick}>
            <IconTextWrapper className={`${className} ${styles.button}`} src={src} alt={alt} text={text} />
        </div>
    );
}

function BalanceSection({ balance }) {
    return (
        <HeaderSection className={styles.balance_subsection} header="My Balance" afterHeader={(<img src="/icons/eyes.svg" alt="Eye Toggle" />)}>
            <div className={`${styles.points_container} ${styles.content_block} ${styles.block_dark}`}>
                <IconTextWrapper src="/icons/gift.svg" alt="Reward Points Icon" text="Reward Points" />
                <div>{balance.points}</div>
                <IconTextButton onClick={() => console.log("Clicked")} className={styles.points_add} src="/icons/plus.svg" alt="Add Points Icon" text="Add Points" />
            </div>
            <div className={`${styles.token_container} ${styles.content_block} ${styles.block_light}`}>
                <IconTextWrapper src="/icons/token.svg" alt="Token Icon" text="Token" />
                <div>{balance.token}</div>
            </div>
        </HeaderSection>
    );
}

function ProfileSection({ profile }) {
    return (
        <HeaderSection className={styles.profile_subsection} header="My Profile">
            <div className={`${styles.profile_container} ${styles.content_block} ${styles.block_dark}`}>
                <div className={styles.profile_table_container}>Profile Table</div>
                {/* <HeaderSection>div className={`${styles.profile_cog_container} ${styles.button} ${styles.profile_edit}`}><img src="/icons/gear.svg" alt="Edit Profile"/></div> */}
                <IconTextButton onClick={() => console.log("Clicked")} className={`${styles.profile_edit} ${styles.profile_cog_container}`} src="/icons/gear.svg" alt="Edit Profile" text="" />
            </div>
            <div className={`${styles.wallet_container} ${styles.content_block} ${styles.block_light}`}>
                <IconTextWrapper src="/icons/WalletConnect-Logo1.svg" alt="Wallet Connect Logo" text="Wallet" />
                <div>No Wallet Connected</div>
                <IconTextButton onClick={() => console.log("Clicked")} className={styles.wallet_connect} src="/icons/link.svg" alt="Link Icon" text="Connect Wallet" />
            </div>
        </HeaderSection>
    );
}

function TransactionsSection({ transactions }) {
    return (
        <HeaderSection className={styles.transactions_subsection} header="My Transactions">
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
        </HeaderSection>
    );
}