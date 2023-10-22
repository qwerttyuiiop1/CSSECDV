"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Dropdown, { DropdownItem } from "@/components/Dropdown/Dropdown";
import { useRouter, usePathname } from 'next/navigation';

let defaultUser: any = {
    isAdmin: true
};
defaultUser = null;

export default function Navbar({ user=defaultUser }) {
    return (
        <nav className={styles.navbar}>
            <NavLink href="/" className={`${styles.navlink} ${styles.logo}`} enableHighlight={false}>
                <img className={styles.logo_icon} src="/logo.svg" />
                <h1>Website Name</h1>
            </NavLink>
            {/* insert login dropdown */}
            <NavLink href="/wallet/connect" className={`${styles.navlink} ${styles.connect_container}`} enableHighlight={false}>
                <span className={`${styles.connect} ${styles.not_connected}`}>
                    Connected
                    {/* TODO: there is a few pixels gap between the img and the border, fix */}
                    <img className={styles.connect_icon} src="/wallet_notconnected.svg" />
                </span>
            </NavLink>
            <NavLink href="/cart"><img src="/cart.svg" /></NavLink>
            <NavLink href="/shops"><h3>Shop</h3></NavLink>
            <NavLink href="/wallet"><h3>Wallet</h3></NavLink>
            <NavLink href="/"><h3>Home</h3></NavLink>
            {/* insert admin dropdown */}
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