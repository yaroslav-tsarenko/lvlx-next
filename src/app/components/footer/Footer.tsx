"use client";

import styles from "./Footer.module.scss";
import Image from "next/image";
import logo from "@/assets/logo/lvlx-logo-white.svg";
import tg from "@/assets/icons/telegram-social.svg";
import inst from "@/assets/icons/instagram-icon.svg";
import yt from "@/assets/icons/youtube-icon.svg";
import { Button } from "@mui/material";
import { useAnimation } from "@/hooks/useAnimation";
import { useTranslation } from "react-i18next";
import {useFormRegistration} from "@/context/FormRegistrationContext";

const Footer = () => {

    const { t } = useTranslation();
    const { openDialog } = useFormRegistration();

    const footerContent = useAnimation<HTMLDivElement>({
        animation: "fadeBlurFromTopToBottom",
        showWhenElementInView: true,
        delay: 0.6,
    });

    const footerContent2 = useAnimation<HTMLDivElement>({
        animation: "fadeBlurFromTopToBottom",
        showWhenElementInView: true,
        delay: 0.8,
    });

    return (
        <footer className={styles.footer} id="footer-section">
            <div className={styles.footerUpper}>
                <div className={styles.footerHeader} ref={footerContent}>
                    <p>{t("footerHeaderText")}</p>
                    <Image src={logo} alt="logo" width={150} height={30}/>
                    <Button
                        onClick={openDialog}
                        sx={{
                            background: 'var(--orange)',
                            fontSize: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '20px 40px',
                            color: 'var(--white)',
                            textTransform: 'none',
                            fontFamily: 'var(--font-inter-sans)',
                            fontWeight: 300,
                            borderRadius: '16px',
                            transition: '0.3s ease-in-out',
                            '&:hover': {
                                background: 'var(--orange-hover)',
                            },
                            '@media screen and (max-width: 768px)': {
                                display: 'none',
                            },
                        }}>
                        {t("register")}
                    </Button>
                </div>
                <div className={styles.footerMiddle} ref={footerContent}>
                    <div className={styles.footerItem}>
                        <p>{t("telegram")}</p>
                        <h1>
                            <a href="https://t.me/afflvlx" target="_blank" rel="noopener noreferrer">
                                @afflvlx
                            </a>
                        </h1>
                    </div>
                    <div className={styles.footerItem}>
                        <p>{t("emailFooter")}</p>
                        <h1>
                            <a href="mailto:partners@lvlx.top">partners@lvlx.top</a>
                        </h1>
                        <div className={styles.footerSocials}>
                            <a href="https://t.me/afflvlx" target="_blank" rel="noopener noreferrer">
                                <Image src={tg} alt="Telegram icon" width={60} height={60}/>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <Image src={inst} alt="Instagram icon" width={60} height={60}/>
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <Image src={yt} alt="YouTube icon" width={60} height={60}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p ref={footerContent2}>{t("footerCopyright")}</p>
            </div>
        </footer>
    );
};

export default Footer;