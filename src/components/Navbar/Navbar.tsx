"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

let defaultUser: any = {
    username: "BrOdin",
    points: 25.1234,
    isAdmin: true,
    walletConnected: true
};

export default function Navbar({ user=defaultUser }) {
    // let profileComp = null;

    // if (user) {
    //     profileComp = (
    //         <div className={`${styles.navlink} ${styles.profile_container_outer}`}>            
    //             <div className={`${styles.profile_container} ${styles.dropdown}`}>
    //                 <div className={`${styles.dropdown_button} ${styles.profile_button}`}>
    //                     <img className={styles.profile_icon} src="profile.svg"/>
    //                     <div className={styles.profile_info}>
    //                         <div className={styles.profile_info_username}>
    //                             <h4>BrOdin</h4>
    //                         </div>
    //                         <div className={styles.profile_info_points}>
    //                             <p>25.1234 RP</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className={`${styles.profile_dropdown} ${styles.dropdown_content} ${styles.open}`}>
    //                     <Link href="/inventory" className={styles.dropdown_link}><h3>Inventory</h3></Link>
    //                     <Link href="/profile" className={styles.dropdown_link}><h3>Edit Profile</h3></Link>
    //                     <Link href="/logout" className={styles.dropdown_link}><h3>Logout</h3></Link>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // } else {
    //     profileComp = (
    //         <div className={`${styles.navlink} ${styles.profile_container_outer}`}>            
    //             <Link href="/login">
    //                 <div className={styles.profile_container}>
    //                     <h3>Login</h3>
    //                 </div>
    //             </Link>
    //         </div>
    //     );
    // }

    // const adminComp = (
    //     <div className={`${styles.dropdown} ${styles.admin_container}`}>
    //         <div className={`${styles.dropdown_button}`}>
    //             <NavLink href="/admin"><h3>Admin&nbsp;&nbsp;&nbsp;▾</h3></NavLink>
    //         </div>
    //         <div className={`${styles.admin_dropdown} ${styles.dropdown_content} ${styles.open}`}>
    //             <Link href="/accounts" className={styles.dropdown_link}><h3>Accounts</h3></Link>
    //             <Link href="/products" className={styles.dropdown_link}><h3>Products</h3></Link>
    //         </div>
    //     </div>
    // );

    return (
        <nav className={styles.navbar}>
            <NavLink href="/" className={`${styles.navlink} ${styles.logo}`} enableHighlight={false}>
                <img className={styles.logo_icon} src="/logo.svg" />
                <h1>Website Name</h1>
            </NavLink>
            {/* Everything below uses float: right, so reversed order */}
            <ProfileComponent user={user} />
            <WalletConnectBox isConnected={user?.walletConnected} />
            <NavLink href="/cart"><img src="/cart.svg" /></NavLink>
            <NavLink href="/shops"><h3>Shop</h3></NavLink>
            <NavLink href="/wallet"><h3>Wallet</h3></NavLink>
            <NavLink href="/"><h3>Home</h3></NavLink>
            <AdminComponent user={user} />
        </nav>
    );
}

function NavLink({ children, href="/", className=styles.navlink, enableHighlight=true }) {
    if (enableHighlight && href === usePathname()) {
        className = `${className} ${styles.active}`;
    }

    return (
        <Link href={href} className={className}>{children}</Link>
    );
}

function WalletConnectBox({ isConnected }) {
    let connect_style = null;
    let connect_text = null;
    let connect_src = null;

    if (isConnected) {
        connect_style = styles.connected;
        connect_text = "Connected";
        connect_src = "/wallet_connected.svg"
    } else {
        connect_style = styles.not_connected;
        connect_text = "Not Connected";
        connect_src = "/wallet_notconnected.svg"
    }

    return (
        <NavLink href="/wallet/connect" className={`${styles.navlink} ${styles.connect_container}`} enableHighlight={false}>
            <div className={`${styles.connect} ${connect_style}`}>
                {connect_text}
                {/* TODO: there is a few pixels gap between the img and the border, fix */}
                <img className={styles.connect_icon} src={connect_src} />
            </div>
        </NavLink>
    );
}

function NavDropdown({ children, options, classNames }) {
    return (
        <div className={`${styles.dropdown} ${classNames.outer}`}>
            <div className={`${styles.dropdown_button} ${classNames.button}`}>
                {children}
            </div>
            <div className={`${styles.dropdown_content} ${classNames.content} ${styles.open}`}>
                {options.map((option) => {
                    return (
                        <Link href={option.href} className={styles.dropdown_link}><h3>{option.label}</h3></Link>
                    );
                })}
            </div>
        </div>
    );
}

function ProfileComponent({ user }) {
    return (
        <div className={`${styles.navlink} ${styles.profile_container_outer}`}> 
            {user ? (
                <NavDropdown classNames={{
                    outer: styles.profile_container,
                    button: styles.profile_button,
                    content: styles.profile_dropdown,
                }} options={[
                    {href: "/inventory", label: "Inventory"},
                    {href: "/profile", label: "Edit Profile"},
                    {href: "/logout", label: "Logout"}
                ]}>
                    <img className={styles.profile_icon} src="profile.svg"/>
                    <div className={styles.profile_info}>
                        <div className={styles.profile_info_username}>
                            <h4>{user.username}</h4>
                        </div>
                        <div className={styles.profile_info_points}>
                            <p>{user.points} RP</p>
                        </div>
                    </div>
                </NavDropdown>
            ) : (
                <Link href="/login">
                    <div className={`${styles.profile_container} ${styles.login_container}`}>
                        <h3>Login</h3>
                    </div>
                </Link>
            )}
        </div>
    );
}

function AdminComponent({ user }) {
    return user?.isAdmin ? (
        <NavDropdown classNames={{
            outer: styles.admin_container,
            button: "",
            content: styles.admin_dropdown,
        }} options={[
            {href: "/accounts", label: "Accounts"},
            {href: "/products", label: "Products"}
        ]}>
            <NavLink href="/admin"><h3>Admin&nbsp;&nbsp;&nbsp;▾</h3></NavLink>
        </NavDropdown>
    ) : (
        <></> 
    );
}