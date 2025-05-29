'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './Header.module.scss';
import logo from '@/assets/logo/lvlx-logo.svg';
import logoWhite from '@/assets/logo/lvlx-logo-white.svg';
import arrowTopRight from '@/assets/icons/arrow-top-right.svg';
import {IoIosArrowDown} from "react-icons/io";
import i18n from '@/utils/i18next';
import {useTranslation} from "react-i18next";

export default function Header() {
    const [currentLogo, setCurrentLogo] = useState(logo);
    const [selectedLanguage, setSelectedLanguage] = useState("RU");

    const {t} = useTranslation();

    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const storedLang = localStorage.getItem('selectedLanguageLVLX');
        if (storedLang) setSelectedLanguage(storedLang);

        gsap.from(`.${styles.header}`, {
            y: '-100%',
            opacity: 0,
            duration: 0.5,
            delay: 1,
            ease: 'power2.out',
        });

        const wrapper = document.querySelector(`.${styles.customButtonWrapper}`);
        const text = wrapper?.querySelector('p');
        const arrow = wrapper?.querySelector(`.${styles.arrowIcon}`);
        const targets = [text, arrow].filter(Boolean);
        if (wrapper && targets.length) {
            wrapper.addEventListener('mouseenter', () => {
                gsap.to(targets, {
                    y: -20,
                    opacity: 0,
                    filter: 'blur(6px)',
                    duration: 0.4,
                    ease: 'power2.out',
                    stagger: 0.1,
                    onComplete: () => {
                        gsap.set(targets, {
                            y: 20,
                            opacity: 0,
                            filter: 'blur(6px)',
                        });
                        gsap.to(targets, {
                            y: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                            duration: 0.6,
                            ease: 'power3.out',
                            stagger: 0.1,
                        });
                    },
                });
            });
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const anyVisible = entries.some((entry) => entry.isIntersecting);

                gsap.to(logoRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        setCurrentLogo(anyVisible ? logoWhite : logo);
                        gsap.to(logoRef.current, {
                            opacity: 1,
                            duration: 0.3,
                        });
                    },
                });
            },
            {threshold: 0.3}
        );

        const sectionsToWatch = [
            document.querySelector('#benefits-section'),
            document.querySelector('#streamers-section'),
        ];

        sectionsToWatch.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedLanguage(value);
        i18n.changeLanguage(value);
        localStorage.setItem('selectedLanguageLVLX', value);
    };
    const redirectToTelegram = () => {
        window.location.href = 'https://t.me/your_telegram_channel';
    };

    return (
        <header className={`${styles.header} ${styles.headerAnimate}`}>
            <Image
                src={currentLogo}
                alt="Logo"
                width={150}
                height={30}
                className={styles.logo}
                ref={logoRef}
            />
            <div className={styles.nav}>
                <div className={styles.selector}>
                    <IoIosArrowDown className={styles.arrowDown}/>
                    <select
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        style={{
                            borderColor: "#d3d3d3",
                            height: "50px",
                            borderRadius: "16px",
                            padding: "16px 20px 16px 16px",
                            fontSize: "16px",
                            outline: "none",
                            width: "90px",
                            background: "white",
                            cursor: "pointer",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                        }}
                    >
                        <option value="RU">RU</option>
                        <option value="EN">EN</option>
                    </select>
                </div>
                <button className={styles.button} onClick={redirectToTelegram}>PR</button>
                <div className={styles.customButtonWrapper} onClick={redirectToTelegram}>
                    <p>{t("contactUs")}</p>
                    <div className={styles.arrow}>
                        <Image
                            src={arrowTopRight}
                            alt="arrow"
                            width={13}
                            height={13}
                            className={styles.arrowIcon}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
