'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './Header.module.scss';
import logo from '@/assets/logo/lvlx-logo.svg';
import logoWhite from '@/assets/logo/lvlx-logo-white.svg';
import arrowTopRight from '@/assets/icons/arrow-top-right.svg';
import {Select, Option} from '@mui/joy';

export default function Header() {
    const [selectedLanguage, setSelectedLanguage] = useState('RU');
    const [currentLogo, setCurrentLogo] = useState(logo);
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

        const observer = new IntersectionObserver((entries) => {
            let shouldSwitchToWhite = false;

            entries.forEach((entry) => {
                if (entry.isIntersecting) shouldSwitchToWhite = true;
            });

            gsap.to(logoRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    setCurrentLogo(shouldSwitchToWhite ? logoWhite : logo);
                    gsap.to(logoRef.current, {
                        opacity: 1,
                        duration: 0.3,
                    });
                },
            });
        }, {
            threshold: 0.3,
        });

        const benefits = document.querySelector('.benefits');
        const streamers = document.querySelector('#streamers-section');
        if (benefits) observer.observe(benefits);
        if (streamers) observer.observe(streamers);

        return () => observer.disconnect();
    }, []);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedLanguage(value);
        localStorage.setItem('selectedLanguageLVLX', value);
        window.location.reload();
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
                    <Select
                        value={selectedLanguage}
                        onChange={(e, newValue) => handleLanguageChange({target: {value: newValue}} as React.ChangeEvent<HTMLSelectElement>)}
                        sx={{
                            borderColor: '#d3d3d3',
                            height: '50px',
                            padding: '16px 26px 16px 16px',
                            borderRadius: '16px',
                        }}
                        className={styles.selector}
                    >
                        <Option value="RU">RU</Option>
                        <Option value="EN">EN</Option>
                    </Select>
                </div>
                <button className={styles.button} onClick={redirectToTelegram}>PR</button>
                <div className={styles.customButtonWrapper} onClick={redirectToTelegram}>
                    <p>Связаться</p>
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
