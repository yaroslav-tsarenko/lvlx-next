"use client";

import React, {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import styles from "./BottomNav.module.scss";
import homeIcon from "@/assets/icons/home-icon.svg";
import line from "@/assets/images/v-line.svg";
import lineH from "@/assets/images/line-image.svg";
import burgerButton from "@/assets/icons/burger-button.svg";
import times from "@/assets/icons/times-icon.svg";
import {Button, Dialog} from "@mui/material";
import Image from "next/image";

import Form from "@/app/components/form/Form";
import { useTranslation } from "react-i18next";


const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({behavior: "smooth"});
    }
};

const buttonStyles = {
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
};

const BottomNav = () => {
    const navRef = useRef<HTMLDivElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation();
    const buttons = [
        { label: t("benefitsMenu"), sectionId: "benefits-section" },
        { label: t("productMenu"), sectionId: "product-section" },
        { label: t("streamersMenu"), sectionId: "streamers-section" },
        { label: t("faqMenu"), sectionId: "faq-section" },
    ];

    const menuButtons = [
        { label: t("benefitsMenu"), sectionId: "benefits-section" },
        { label: t("productMenu"), sectionId: "product-section" },
        { label: t("streamersMenu"), sectionId: "streamers-section" },
        { label: t("faqMenu"), sectionId: "faq-section" },
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };


    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

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
                                 textTransform: "capitalize",
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
             <div className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ""}`}>
                 <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
                     <div className={styles.menuList}>
                         {menuButtons.map((button, index) => (
                             <React.Fragment key={button.sectionId}>
                                 <Button sx={buttonStyles} onClick={() => scrollToSection(button.sectionId)}>
                                     {button.label}
                                 </Button>
                                 {index < menuButtons.length - 1 && (
                                     <Image src={lineH} alt="line" width={52} height={2}/>
                                 )}
                             </React.Fragment>
                         ))}
                     </div>
                 </div>
                 <div className={styles.nav}>
                     <button className={styles.customButton} onClick={toggleMenu}>
                         <Image src={isMenuOpen ? times : burgerButton} alt="Burger Menu" width={24} height={24}
                                className={styles.img}/>
                     </button>
                     <Image src={line} alt="Divider" width={2} height={52}/>
                     <Button sx={buttonStyles} onClick={toggleMenu}>
                         {t("menuMenu")}
                     </Button>
                     <Image src={line} alt="Divider" width={2} height={52}/>
                     <Button
                         sx={{
                             ...buttonStyles,
                             background: "#f84204",
                             "&:hover": {
                                 background: "#f44b11",
                             },
                         }}
                         onClick={openDialog}
                     >
                         {t("registerMenu")}
                     </Button>
                 </div>
             </div>
             <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
                 <Form />
             </Dialog>
         </>
     );
};

export default BottomNav;
