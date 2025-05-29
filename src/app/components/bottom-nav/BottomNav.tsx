"use client";

import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import styles from "./BottomNav.module.scss";
import homeIcon from "@/assets/icons/home-icon.svg";
import line from "@/assets/images/v-line.svg";
import burgerButton from "@/assets/icons/burger-button.svg";
import {Button} from "@mui/material";
import Image from "next/image";

const buttons = [
    {label: "Преимущества", sectionId: "benefits-section"},
    {label: "Продукт", sectionId: "product-section"},
    {label: "Стримерам", sectionId: "streamers-section"},
    {label: "FAQ", sectionId: "faq-section"},
];

const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({behavior: "smooth"});
    }
};

const BottomNav = () => {
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!navRef.current) return;

        gsap.fromTo(
            navRef.current,
            {
                opacity: 0,
                filter: "blur(16px)",
                y: 30,
            },
            {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                delay: 1.4,
                duration: 1,
                ease: "power2.out",
            }
        );
    }, []);

    return (
        <>
            <div className={styles.wrapper} ref={navRef}>
                <button className={styles.customButton} onClick={() => scrollToSection("home-section")}>
                    <Image src={homeIcon} alt="Home Icon" width={24} height={24} className={styles.img}/>
                </button>
                {buttons.map((button) => (
                    <React.Fragment key={button.sectionId}>
                        <Image src={line} alt="Divider" width={2} height={52}/>
                        <Button
                            sx={{
                                borderRadius: "55px",
                                padding: "15px 20px",
                                fontSize: "16px",
                                height: "52px",
                                fontWeight: 400,
                                fontFamily: "Inter, sans-serif",
                                textTransform: "none",
                                color: "#fff",
                                background: "transparent",
                                transition: "0.2s all",
                                "&:hover": {
                                    background: "#2d2d2d",
                                },
                            }}
                            onClick={() => scrollToSection(button.sectionId)}
                        >
                            {button.label}
                        </Button>
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.mobileNav}>
                <button className={styles.customButton} onClick={() => scrollToSection("home-section")}>
                    <Image src={burgerButton} alt="Home Icon" width={24} height={24} className={styles.img}/>
                </button>
                <Image src={line} alt="Divider" width={2} height={52}/>
                <Button
                    sx={{
                        borderRadius: "55px",
                        padding: "15px 20px",
                        fontSize: "16px",
                        height: "52px",
                        fontWeight: 400,
                        fontFamily: "Inter, sans-serif",
                        textTransform: "none",
                        color: "#fff",
                        background: "transparent",
                        transition: "0.2s all",
                        "&:hover": {
                            background: "#2d2d2d",
                        },
                    }}
                >
                   Меню
                </Button>
                <Image src={line} alt="Divider" width={2} height={52}/>
                <Button
                    sx={{
                        borderRadius: "55px",
                        padding: "15px 20px",
                        fontSize: "16px",
                        height: "52px",
                        fontWeight: 400,
                        fontFamily: "Inter, sans-serif",
                        textTransform: "none",
                        color: "#fff",
                        background: "#f84204",
                        transition: "0.2s all",
                        "&:hover": {
                            background: "#f44b11",
                        },
                    }}
                >
                    Зарегестрироваться
                </Button>
            </div>
        </>
    );
};

export default BottomNav;
