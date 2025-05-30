'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './Header.module.scss';
import logo from '@/assets/logo/lvlx-logo.svg';
import logoWhite from '@/assets/logo/lvlx-logo-white.svg';
import arrowTopRight from '@/assets/icons/arrow-top-right.svg';
import i18n from '@/utils/i18next';
import {useTranslation} from "react-i18next";
import { Select, Option, selectClasses } from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function Header() {
    const [currentLogo, setCurrentLogo] = useState(logo);
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguageLVLX') || 'RU');
    const [isLogoWhite, setIsLogoWhite] = useState(false);

    const {t} = useTranslation();

    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const storedLang = localStorage.getItem('selectedLanguageLVLX');
        if (storedLang) {
            setSelectedLanguage(storedLang);
        } else {
            localStorage.setItem('selectedLanguageLVLX', 'RU');
        }
    }, []);

    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value);
        localStorage.setItem('selectedLanguageLVLX', value);
        i18n.changeLanguage(value);
    };

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
                    duration: 0.35,
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
                            duration: 0.35,
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
                        const white = anyVisible;
                        setCurrentLogo(white ? logoWhite : logo);
                        setIsLogoWhite(white);
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
            document.querySelector('.titles'),
        ];

        sectionsToWatch.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

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
                    <Select
                        value={selectedLanguage}
                        placeholder={selectedLanguage}
                        onChange={(e, value) => handleLanguageChange(value as string)}
                        indicator={<KeyboardArrowDown />}
                        sx={{
                            width: 90,
                            height: 50,
                            background: "transparent",
                            color: isLogoWhite ? '#fff' : '#000',
                            border: `1px solid ${isLogoWhite ? '#fff' : '#d3d3d3'}`,
                            borderRadius: '15px',
                            transition: 'color 0.2s ease, border-color 0.2s ease',
                            [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                color: isLogoWhite ? '#fff' : '#000',
                                [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                },
                            },
                            '&:hover': {
                                color: '#000',
                            },
                        }}>
                        <Option value="RU">RU</Option>
                        <Option value="EN">EN</Option>
                    </Select>
                </div>
                <button
                    className={`${styles.button} ${isLogoWhite ? styles.whiteText : styles.blackText}`}
                    onClick={redirectToTelegram}>
                    PR
                </button>
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
