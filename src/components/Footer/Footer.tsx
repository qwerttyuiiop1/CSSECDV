"use client";
import styles from "./Footer.module.css";
import { SocialIcon } from 'react-social-icons'

function SocialIconStyled({ url }) {
    return <SocialIcon url={url} bgColor="white" fgColor="black" className={styles.footer_icon} />;
}

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <SocialIconStyled url="https://www.facebook.com" />
            <SocialIconStyled url="https://www.instagram.com" />
            <SocialIconStyled url="https://web.telegram.org" />
            <SocialIconStyled url="https://www.discord.com" />
        </footer>
    );
}

