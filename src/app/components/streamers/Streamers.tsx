"use client";

import React from 'react';
import styles from "./Streamers.module.scss";
import BadgeComponent from "@/app/components/badge-component/BadgeComponent";
import UnionWhite from "@/app/components/union-white/UnionWhite";
import eggBig from "@/assets/images/egg-for-bg.svg";
import ellipse from "@/assets/images/ellipse.png";
import duck from "@/assets/images/duck-x4.png";
import Image from "next/image";
import Chat from "@/app/components/chat/Chat"
import {Button} from "@mui/material";
import Charts from "@/app/components/charts/Charts";
import {useAnimation} from "@/hooks/useAnimation";
import {useTranslation} from "react-i18next";
import { useFormRegistration } from '@/context/FormRegistrationContext';

const Streamers = () => {

    const { t } = useTranslation();
    const { openDialog } = useFormRegistration();

    const unionsRef = useAnimation<HTMLHeadingElement>({
        animation: "fadeBlurFromBottomToTop",
        showWhenElementInView: true,
        delay: 0.3,
    });

    const buttonRef = useAnimation<HTMLButtonElement>({
        animation: "fadeBlurFromBottomToTop",
        showWhenElementInView: true,
        delay: 0.5,
    });

    const fromLeft = useAnimation<HTMLHeadingElement>({
        animation: "fadeUp",
        showWhenElementInView: true,
        delay: 0.5,
    })

    const titleRef = useAnimation<HTMLHeadingElement>({
        animation: "fadeBlurLeftToRight",
        showWhenElementInView: true,
        delay: 0.3,
    });

    const textRef = useAnimation<HTMLHeadingElement>({
        animation: "fadeBlurLeftToRight",
        showWhenElementInView: true,
        delay: 0.6,
    });

    return (
        <div className={styles.outer} id="streamers-section">
            <div className={styles.badge}>
                <BadgeComponent AvatarInitial="5" BadgeContent="К" Title={t("streamsPerYear")}/>
            </div>
            <div className={styles.charts} ref={fromLeft}>
                <Charts/>
            </div>
            <Image src={duck} alt="img" className={styles.duck} width={862} height={851} loading="lazy"/>
            <div className={styles.button1}>
                <Button
                    onClick={openDialog}
                    ref={buttonRef}
                    sx={{
                        backgroundColor: "#f84204",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "400",
                        fontFamily: "Inter",
                        fontSize: "25px",
                        zIndex: -1,
                        bottom: "5%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        "&:hover": {
                            backgroundColor: "#d73c03",
                        },
                        borderRadius: "16px",
                        padding: "15px 40px",
                    }}>
                    {t("becomeStreamer")}
                </Button>
            </div>
            <Chat/>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.button2}>
                        <Button
                            onClick={openDialog}
                            ref={buttonRef}
                            sx={{
                                backgroundColor: "#f84204",
                                color: "white",
                                textTransform: "none",
                                fontWeight: "400",
                                fontFamily: "Inter",
                                fontSize: "25px",
                                "&:hover": {
                                    backgroundColor: "#d73c03",
                                },
                                borderRadius: "16px",
                                padding: "15px 40px",
                            }}>
                            {t("becomeStreamer")}
                        </Button>
                    </div>
                    <Image src={ellipse} alt="img" className={styles.ellipse2} width={1245} height={987}
                           loading="lazy"/>
                    <Image src={duck} alt="img" className={styles.duck2} width={862} height={851} loading="lazy"/>
                    <div className={styles.titles}>
                        <h2>
                            {t("streamersTitle")}
                        </h2>
                        <p ref={textRef}>{t("streamersDescription")}</p>
                        <h1 ref={titleRef}>{t("streamersTitle")}</h1>
                        <div className={styles.unions} ref={unionsRef}>
                            <UnionWhite title={t("uniqueBonuses")}/>
                            <UnionWhite title={t("convertingPromos")}/>
                            <UnionWhite title={t("fastPayouts")}/>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.charts2}>
                        <Charts/>
                    </div>
                    <Image src={eggBig} alt="Egg Background" className={styles.egg} width={383} height={383}
                           loading="lazy"/>
                    <Image src={ellipse} alt="img" className={styles.ellipse} width={1245} height={987} loading="lazy"/>
                </div>
            </div>
        </div>
    );
};

export default Streamers;