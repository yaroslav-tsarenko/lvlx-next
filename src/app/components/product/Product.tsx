"use client";

import React, { useState } from "react";
import styles from "./Product.module.scss";
import UnionPlus from "@/app/components/union-plus/UnionPlus";
import tablet1 from "@/assets/images/tablet-1-slider.png";
import tablet2 from "@/assets/images/tablet-2-slider.png";
import tablet3 from "@/assets/images/tablet-3-slider.png";
import bottomImage1 from "@/assets/images/slider-1-benefits-en.svg";
import bottomImage2 from "@/assets/images/slider-2-benefits-en.svg";
import bottomImage3 from "@/assets/images/slider-3-benefits-en.svg";
import bottomImage1Mob from "@/assets/images/slider-2-benefits-mobile.svg"
import Image from "next/image";
import BigText from "@/app/components/big-text/BigText";
import { Button } from "@mui/material";
import {useAnimation} from "@/hooks/useAnimation";

const Product = () => {

    const slides = [
        {
            image: tablet1,
            bigText: { title: "7k", description: "games" },
            bottomImage: bottomImage1,
            bottomImageMob: bottomImage1Mob,
        },
        {
            image: tablet2,
            bigText: { title: "11", description: "inhouse games" },
            bottomImage: bottomImage2,
            bottomImageMob: bottomImage1Mob,
        },
        {
            image: tablet3,
            bigText: { title: "50k", description: "events" },
            bottomImage: bottomImage3,
            bottomImageMob: bottomImage1Mob,
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
                        <h2 ref={fadeFromLeft2}>Продукт</h2>
                        <p ref={fadeFromLeft2}>
                            Партнерская программа LVLX является прямым рекламодателем iGaming
                            продуктов и предоставляет офферы на онлайн-казино и БК
                        </p>
                    </div>
                    <div className={styles.unions}>
                        <UnionPlus title="In-house колл-центр"/>
                        <UnionPlus title="Лицензия Anjouan"/>
                        <UnionPlus title="VIP программа"/>
                        <UnionPlus title="Reg2dep 20-50%"/>
                        <UnionPlus title="KZ, RU, TR, IN"/>
                    </div>
                </div>
                <div className={styles.infoBottom} ref={fadeFromLeft3}>
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