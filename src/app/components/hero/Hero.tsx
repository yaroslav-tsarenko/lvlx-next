"use client";

import {useRef, useState, useEffect} from "react";
import styles from "./Hero.module.scss";

import Form from "@/app/components/form/Form";
import Image from "next/image";
import cpa from "@/assets/images/cpa-desktop.svg";
import cpaEN from "@/assets/images/cpa_eng.svg";
import rga from "@/assets/images/rev-share-desktop.svg";
import rgaEN from "@/assets/images/revShare_eng.svg";
import cpaMob from "@/assets/images/cpa-mob.svg";
import rgaMob from "@/assets/images/revShareMob.svg";
import {useTranslation} from "react-i18next";
import i18n from "@/utils/i18next";
import {useAnimation} from "@/hooks/useAnimation";

const Hero = () => {
    const rightSideRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState("/girl.mp4");
    const {t} = useTranslation();
    const [showHeader, setShowHeader] = useState(false);
console.log(showHeader)
    const ref = useAnimation<HTMLHeadingElement>({
        animation: "fadeBlurLeftToRight2",
        showWhenElementInView: true,
        delay: 2,
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setVideoSrc("girl_mobile.mp4");
            } else {
                setVideoSrc("/girl.mp4");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={styles.hero} id="home-section">
            <video
                className={`${styles.bgVideo} ${styles.videoAnimate}`}
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            />
            <div className={`${styles.heroContent} ${styles.heroAnimate}`}>
                <div className={styles.leftSide}>
                    <div className={styles.mainTitle} ref={ref} id="titles">
                        <h1 >{t('monetize')}</h1>
                        <h2 >{t('monetize')}</h2>
                        <p >{t('direct')}</p>
                    </div>
                    <div className={styles.images}>
                        <Image
                            src={i18n.language === "EN" ? cpaEN : cpa}
                            alt="image"
                            width={320}
                            height={160}
                        />
                        <Image
                            src={i18n.language === "EN" ? rgaEN : rga}
                            alt="image"
                            width={320}
                            height={160}
                        />
                    </div>
                    <div className={styles.mobileImages}>
                        <Image src={cpaMob} alt="image" width={158} height={64}/>
                        <Image src={rgaMob} alt="image" width={158} height={64}/>
                    </div>
                </div>
                <div className={styles.rightSide} ref={rightSideRef}>
                    <Form/>
                </div>
            </div>
        </div>
    );
};

export default Hero;