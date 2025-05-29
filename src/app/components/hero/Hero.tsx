"use client";

import {useRef, useState, useEffect} from "react";
import styles from "./Hero.module.scss";

import Header from "@/app/components/header/Header";
import Form from "@/app/components/form/Form";
import Image from "next/image";
import cpa from "@/assets/images/cpa-desktop.svg";
import rga from "@/assets/images/rev-share-desktop.svg";
import cpaMob from "@/assets/images/cpaMob.svg";
import rgaMob from "@/assets/images/revShareMob.svg";

const Hero = () => {
    const leftSideRef = useRef(null);
    const rightSideRef = useRef(null);

    const [videoSrc, setVideoSrc] = useState("/girl.mp4");

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
            <Header/>
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
                <div className={styles.leftSide} ref={leftSideRef}>
                    <div className={styles.mainTitle}>
                        <h1>Монетизируй трафик</h1>
                        <h2>Монетизируй трафик</h2>
                        <p>С прямым рекламодателем iGaming продуктов</p>
                    </div>
                    <div className={styles.images}>
                        <Image src={cpa} alt="image" width={320} height={160}/>
                        <Image src={rga} alt="image" width={320} height={160}/>
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