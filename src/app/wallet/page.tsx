"use client"
import styles from "./page.module.css";
import { useState } from 'react'; 

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

let defaultTransactions = [
    {
      "date": "09-30-2023",
      "type": "Deposit",
      "items": "-",
      "total": "+3000",
      "pointsBalance": 5500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "2x Grab Voucher",
      "total": -2000,
      "pointsBalance": 2500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "1x SM Gift Card",
      "total": -1000,
      "pointsBalance": 1500
    },
    {
      "date": "09-30-2023",
      "type": "Deposit",
      "items": "-",
      "total": "+3000",
      "pointsBalance": 5500
    },
    {
    "date": "09-30-2023",
    "type": "Deposit",
    "items": "-",
    "total": "+3000",
    "pointsBalance": 5500
    },
    {
    "date": "09-30-2023",
    "type": "Purchase",
    "items": "2x Grab Voucher",
    "total": -2000,
    "pointsBalance": 2500
    },
    {
    "date": "09-30-2023",
    "type": "Purchase",
    "items": "1x SM Gift Card",
    "total": -1000,
    "pointsBalance": 1500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "2x Grab Voucher",
      "total": -2000,
      "pointsBalance": 2500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "1x SM Gift Card",
      "total": -1000,
      "pointsBalance": 1500
    },
    {
      "date": "09-30-2023",
      "type": "Deposit",
      "items": "-",
      "total": "+3000",
      "pointsBalance": 5500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "2x Grab Voucher",
      "total": -2000,
      "pointsBalance": 2500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "1x SM Gift Card",
      "total": -1000,
      "pointsBalance": 1500
    },
    {
      "date": "09-30-2023",
      "type": "Deposit",
      "items": "-",
      "total": "+3000",
      "pointsBalance": 5500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "2x Grab Voucher",
      "total": -2000,
      "pointsBalance": 2500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "1x SM Gift Card",
      "total": -1000,
      "pointsBalance": 1500
    }, 
    {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      }
  ];

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
    const [isVisible, setVisible] = useState(false);
    const censor = "********";

    return (
        <HeaderSection className={styles.balance_subsection} header="My Balance" 
            afterHeader={(<img onClick={() => setVisible(!isVisible)} className={`${styles.button} ${styles.balance_toggle}`} src="/icons/eyes.svg" alt="Eye Toggle" />)}
        >
            <div className={`${styles.points_container} ${styles.content_block} ${styles.block_dark}`}>
                <IconTextWrapper src="/icons/gift.svg" alt="Reward Points Icon" text="Reward Points" />
                <div>{isVisible ? balance.points : censor}</div>
                <IconTextButton onClick={() => console.log("Clicked")} className={styles.points_add} src="/icons/plus.svg" alt="Add Points Icon" text="Add Points" />
            </div>
            <div className={`${styles.token_container} ${styles.content_block} ${styles.block_light}`}>
                <IconTextWrapper src="/icons/token.svg" alt="Token Icon" text="Token" />
                <div>{isVisible ? balance.token : censor}</div>
            </div>        
        </HeaderSection>
    );
}

function ProfileSection({ profile }) {
    const [isEditable, setEditable] = useState(false);

    return (
        <HeaderSection className={styles.profile_subsection} header="My Profile">
            <div className={`${styles.profile_container} ${styles.content_block} ${styles.block_dark}`}>
                <div className={styles.profile_table_container}>
                    <table>
                        <tr>
                            <td>Username</td>
                            <td>{profile.username}</td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>********</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{profile.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{profile.country}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{profile.city}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{profile.address}</td>
                        </tr>
                    </table>
                </div>
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
    const [page, setPage] = useState(0);

    if (!transactions)
        transactions = [];

    const transactionsPerPage = 15;
    const arrayTo2D = (arr, numPerRow) => {
        let result = [];
        for (let i=0; i < arr.length; i += numPerRow) 
            result.push(arr.slice(i, i + numPerRow));
        return result;
    }
    const transactions2D = arrayTo2D(transactions, transactionsPerPage);

    const handlePageNext = () => setPage(Math.min(page+1, Math.max(transactions2D.length-1, 0)));
    const handlePagePrev = () => setPage(Math.max(page-1, 0));

    const currentTransactionFirst = () => transactions.length > 0 ? page * transactionsPerPage + 1 : 0
    const currentTransactionLast = () => Math.min((page + 1) * transactionsPerPage, transactions.length);

    const transactionTotalColor = (total) => {
        if (total > 0)
            return styles.transactions_total_plus;
        else if (total < 0)
            return styles.transactions_total_minus;
        return "";
    }

    console.log(transactions);
    console.log(transactions2D);

    return (
        <HeaderSection className={styles.transactions_subsection} header="My Transactions">
            <div className={styles.transactions_page_container}>
                <div className={styles.transactions_amount_display}>
                    Showing {currentTransactionFirst()}-{currentTransactionLast()} of {transactions.length}
                </div>
                <div className={styles.transactions_page_selector}>
                    <span className={styles.transactions_page_prev} onClick={handlePagePrev}>◀</span>
                    <span>Page {page+1}</span>
                    <span className={styles.transactions_page_next} onClick={handlePageNext}>▶</span>
                </div>
            </div>
            <div className={styles.transactions_table_container}>
                <table className={styles.transactions_table}>
                    <tr className={styles.transactions_row_dark}>
                        <th className={styles.transactions_date}>Date</th>
                        <th className={styles.transactions_type}>Type</th>
                        <th className={styles.transactions_items}>Items</th>
                        <th classNames={styles.transactions_total}>Total</th>
                        <th className={styles.transactions_balance}>Points Balance</th>
                    </tr>
                    {transactions2D[page]?.map((transaction, index) => {
                        return (
                            <tr className={index % 2 == 0 ? styles.transactions_row_light : styles.transactions_row_dark}>
                                <td>{transaction.date}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.items}</td>
                                <td className={transactionTotalColor(transaction.total)}>{transaction.total}</td>
                                <td className={styles.transactions_balance}>{transaction.pointsBalance}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </HeaderSection>
    );
}