"use client";

import React, { useState } from "react";
import styles from "./Product.module.scss";
import UnionPlus from "@/app/components/union-plus/UnionPlus";
import tablet1 from "@/assets/images/tablet-1-slider.png";
import tablet1En from "@/assets/images/tablet-1-slider-en.png";
import tablet2 from "@/assets/images/tablet-2-slider.png";
import tablet2En from "@/assets/images/tablet-2-slider-en.png";
import tablet3 from "@/assets/images/tablet-3-slider.png";
import tablet3En from "@/assets/images/tablet-3-slider-en.png";
import bottomImage1 from "@/assets/images/slider1-benefits.svg";
import bottomImage1En from "@/assets/images/slider-1-benefits-en.svg";
import bottomImage2 from "@/assets/images/slider2Benefits.svg";
import bottomImage2En from "@/assets/images/slider-2-benefits-en.svg";
import bottomImage3 from "@/assets/images/slider3Benefits.svg";
import bottomImage3En from "@/assets/images/slider-3-benefits-en.svg";
import bottomImage1Mob from "@/assets/images/slider1BenefitsMobile.svg"
import bottomImage1MobEn from "@/assets/images/slider1BenefitsMobile.svg"
import bottomImage2Mob from "@/assets/images/slider-2-benefits-mobile.svg"
import bottomImage2MobEn from "@/assets/images/slider-2-benefits-mobile.svg"
import bottomImage3Mob from "@/assets/images/slider-3-benefits-mobile.svg"
import bottomImage3MobEn from "@/assets/images/slider-3-benefits-mobile.svg"
import Image from "next/image";
import BigText from "@/app/components/big-text/BigText";
import { Button } from "@mui/material";
import {useAnimation} from "@/hooks/useAnimation";
import {useTranslation} from "react-i18next";

const Product = () => {

    const { t, i18n } = useTranslation();

    const slides = [
        {
            image: i18n.language === "RU" ? tablet1 : tablet1En,
            bigText: { title: t("bigTextTitle1"), description: t("bigTextDescription1") },
            bottomImage: i18n.language === "RU" ? bottomImage1 : bottomImage1En,
            bottomImageMob: i18n.language === "RU" ? bottomImage1Mob : bottomImage1MobEn,
        },
        {
            image: i18n.language === "RU" ? tablet2 : tablet2En,
            bigText: { title: t("bigTextTitle2"), description: t("bigTextDescription2") },
            bottomImage: i18n.language === "RU" ? bottomImage2 : bottomImage2En,
            bottomImageMob: i18n.language === "RU" ? bottomImage2Mob : bottomImage2MobEn,
        },
        {
            image: i18n.language === "RU" ? tablet3 : tablet3En,
            bigText: { title: t("bigTextTitle3"), description: t("bigTextDescription3") },
            bottomImage: i18n.language === "RU" ? bottomImage3 : bottomImage3En,
            bottomImageMob: i18n.language === "RU" ? bottomImage3Mob : bottomImage3MobEn,
        },
    ];

    const [activePage, setActivePage] = useState(1);

    const handlePageClick = (page: number) => {
        setActivePage(page);
    };

    const fadeFromLeft = useAnimation<HTMLDivElement>({
        animation: "fadeBlurLeftToRight",
        showWhenElementInView: true,
        delay: 0.3,
    });

    const fadeFromLeft2 = useAnimation<HTMLHeadingElement>({
        animation: "fadeBlurLeftToRight",
        showWhenElementInView: true,
        delay: 0.5,
    });

    const fadeFromLeft3 = useAnimation<HTMLParagraphElement>({
        animation: "fadeBlurLeftToRight",
        showWhenElementInView: true,
        delay: 0.7,
    });

    return (
        <div className={styles.wrapper} id="product-section">
            <div className={styles.info} ref={fadeFromLeft}>
                <div className={styles.pagination}>
                    {[1, 2, 3].map((page) => (
                        <Button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            sx={{
                                width: 60,
                                height: 60,
                                backgroundColor: activePage === page ? "#f84204" : "#ffffff",
                                color: activePage === page ? "#ffffff" : "#000000",
                                border: "none",
                                borderRadius: "58px",
                                fontSize: "18px",
                                fontFamily: "Inter",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: activePage === page ? "#f84204" : "#f0f0f0",
                                    transform: "scale(1.1)",
                                },
                                transition: "background-color 0.3s ease, transform 0.2s ease",
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                </div>
                <div className={styles.infoTop}>
                    <div className={styles.titles}>
                        <h2 ref={fadeFromLeft2}>{t("productTitle")}</h2>
                        <p ref={fadeFromLeft2}>
                            {t("productDescription")}
                        </p>
                    </div>
                    <div className={styles.unions}>
                        <UnionPlus title={t("unionPlusInHouse")}/>
                        <UnionPlus title={t("unionPlusLicense")}/>
                        <UnionPlus title={t("unionPlusVIP")}/>
                        <UnionPlus title={t("unionPlusReg2Dep")}/>
                        <UnionPlus title={t("unionPlusCountries")}/>
                    </div>
                </div>
                <div
                    className={`${styles.infoBottom} ${activePage === 1 ? styles.active : ""}`}
                    ref={fadeFromLeft3}
                >
                    <BigText
                        title={slides[activePage - 1].bigText.title}
                        description={slides[activePage - 1].bigText.description}
                    />
                    <div className={styles.bottomImages}>
                        <Image
                            src={slides[activePage - 1].bottomImage}
                            alt="Bottom Image"
                            height={220}
                            className={styles.imagesBottomDesk}
                        />
                        <Image
                            src={slides[activePage - 1].bottomImageMob}
                            alt="Bottom Image"
                            height={220}
                            className={styles.imagesBottomMob}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.slides}>
                <Image
                    loading="lazy"
                    className={`${styles.slideImage} ${styles.fadeBlur}`}
                    src={slides[activePage - 1].image}
                    alt={`Tablet ${activePage}`}
                    width={500}
                    height={500}
                />
            </div>
            <div className={styles.mobileSection}>
                <div className={styles.titlesMobile} ref={fadeFromLeft2}>
                    <h2 ref={fadeFromLeft2}>Продукт</h2>
                    <p ref={fadeFromLeft2}>
                        Партнерская программа LVLX является прямым рекламодателем iGaming
                        продуктов и предоставляет офферы на онлайн-казино и БК
                    </p>
                </div>
                <div className={styles.unionsMobile}>
                    <UnionPlus title="In-house колл-центр"/>
                    <UnionPlus title="Лицензия Anjouan"/>
                    <UnionPlus title="VIP программа"/>
                    <UnionPlus title="Reg2dep 20-50%"/>
                    <UnionPlus title="KZ, RU, TR, IN"/>
                    <UnionPlus title="Экспертная поддержка"/>
                </div>
            </div>
        </div>
    );
};

export default Product;