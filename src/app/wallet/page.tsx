"use client"
import styles from "./page.module.css";
import { ReactNode, useState } from 'react'; 
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import { UserDetail } from "@type/User";
import { Transaction as DBTransaction } from "@type/Transaction";

type Transaction = {
	date: string | null;
	type: string | null;
	items: string;
	total: number;
	pointsBalance: number | null;
}

export default function Wallet() {
	const [profile, setProfile] = useState<UserDetail | null>(null);
	const [transactions, setTransactions] = useState<Transaction[] | null>(null);
	const { data: session } = useSession();
	useEffect(() => {
		fetch(`/api/profile/?detail=true`)
		.then(res => res.json())
		.then(data => setProfile(data.user));

		fetch('/api/profile/transaction')
		.then(res => res.json())
		.then(json => setTransactions(
			json.transactions.flatMap((t: DBTransaction) => {
				const ret = t.items.map((i): Transaction => ({
					date: null,
					type: null,
					pointsBalance: null,
					items: i.product.name,
					total: i.product.price,
				}))
				ret[0].date = new Date(t.date).toLocaleString();
				ret[0].pointsBalance = t.pointsBalance;
				return ret;
			}
		)));
	}, []);

	if (!session)
		return <p>Unauthorized</p>;
	if (profile === null || transactions === null)
		return <p>Loading...</p>;
    return (
        <>
            <BalanceSection balance={profile.points} />
            <ProfileSection profile={profile} />
            <TransactionsSection transactions={transactions} />
        </>
    );
}

const HeaderSection: React.FC<{
	className?: string;
	header: string;
	afterHeader?: JSX.Element;
	children: ReactNode;
}> = ({ children, className="", header, afterHeader=null }) => {
    return (
        <section className={styles.section}>
            <div><h1>{header}</h1> {afterHeader}</div>
            <div className={className}>
                {children}
            </div>
        </section>
    );
}

interface IconProps {
	className?: string;
	src: string;
	alt: string;
	text?: string;
}

function IconTextWrapper({ className="", src, alt, text="" }: IconProps) {
    return (
        <div className={`${text && styles.icon_text_wrapper} ${className}`}>
            <img src={src} alt={alt} /> 
            {text && (<span>{text}</span>)}
        </div>
    );
}

function IconTextButton({ className="", src, alt, text, onClick }: IconProps & { onClick: () => void }) {
    return (
        <div onClick={onClick}>
            <IconTextWrapper className={`${className} ${styles.button}`} src={src} alt={alt} text={text} />
        </div>
    );
}

function BalanceSection({ balance }: { balance: number }) {
    const [isVisible, setVisible] = useState(false);
    const censor = "********";

    return (
        <HeaderSection className={styles.balance_subsection} header="My Balance" 
            afterHeader={(<img onClick={() => setVisible(!isVisible)} className={`${styles.button} ${styles.balance_toggle}`} src="/icons/eyes.svg" alt="Eye Toggle" />)}
        >
            <div className={`${styles.points_container} ${styles.content_block} ${styles.block_dark}`}>
                <IconTextWrapper className={styles.rp_title} src="/icons/gift.svg" alt="Reward Points Icon" text="Reward Points" />
                <div className={styles.rp_points}>{isVisible ? balance : censor}</div>
                <IconTextButton onClick={() => console.log("Clicked")} className={styles.points_add} src="/icons/plus.svg" alt="Add Points Icon" text="Add Points" />
            </div>
        </HeaderSection>
    );
}

function ProfileSection({ profile }: { profile: UserDetail }) {
    const [isEditable, setEditable] = useState(false);

    return (
        <HeaderSection className={styles.profile_subsection} header="My Profile">
            <div className={`${styles.profile_container} ${styles.content_block} ${styles.block_dark}`}>
                <div className={styles.profile_table_container}>
                    <table>
                        <tr>
                            <td>Username</td>
                            <td>{profile.name}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{profile.mobileno}</td>
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
                            <td>{profile.address1}</td>
                        </tr>
                    </table>
                </div>
                {/* <HeaderSection>div className={`${styles.profile_cog_container} ${styles.button} ${styles.profile_edit}`}><img src="/icons/gear.svg" alt="Edit Profile"/></div> */}
                <IconTextButton onClick={() => console.log("Clicked")} className={`${styles.profile_edit} ${styles.profile_cog_container}`} src="/icons/gear.svg" alt="Edit Profile" text="" />
            </div>
        </HeaderSection>
    );
}

function TransactionsSection({ transactions }: { transactions: Transaction[] }) {
    const [page, setPage] = useState(0);

    if (!transactions)
        transactions = [];

    const transactionsPerPage = 15;
    const arrayTo2D = (arr: Transaction[], numPerRow: number) => {
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

    const transactionTotalColor = (total: number | string) => { // TODO: fix this
		total = Number(total);
        if (total > 0)
            return styles.transactions_total_plus;
        else if (total < 0)
            return styles.transactions_total_minus;
        return "";
    }


    

    //console.log(transactions);
    //console.log(transactions2D);

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
                        <th className={styles.transactions_total}>Total</th>
                        <th className={styles.transactions_balance}>Points Balance</th>
                    </tr>
                    {transactions2D[page]?.map((transaction, index) => {
                        return (
                            <tr className={index % 2 == 0 ? styles.transactions_row_light : styles.transactions_row_dark} key={index}>
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