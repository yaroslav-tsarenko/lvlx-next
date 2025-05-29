"use client";

import React, {useEffect, useState} from 'react';
import styles from "./Charts.module.scss"
import ChartItem from '../chart-item/ChartItem';
import {useTranslation} from "react-i18next";
const Charts = () => {

    type LottieAnimationData = Record<string, unknown>;

    const [animations, setAnimations] = useState<{
        graph1?: LottieAnimationData;
        graph2?: LottieAnimationData;
        graph3?: LottieAnimationData;
        graph4?: LottieAnimationData;
    }>({});

    const { t } = useTranslation();

    useEffect(() => {
        const fetchAnimations = async () => {
            try {
                const [graph1, graph2, graph3, graph4] = await Promise.all([
                    import("@/assets/animations/graph1.json"),
                    import("@/assets/animations/graph2.json"),
                    import("@/assets/animations/graph3.json"),
                    import("@/assets/animations/graph4.json"),
                ]);
                setAnimations({
                    graph1: graph1.default as LottieAnimationData,
                    graph2: graph2.default as LottieAnimationData,
                    graph3: graph3.default as LottieAnimationData,
                    graph4: graph4.default as LottieAnimationData,
                });
            } catch (error) {
                console.error("Error fetching animations:", error);
            }
        };

        fetchAnimations();
    }, []);

    return (
        <div className={styles.charts}>
            <ChartItem p={t("visits")} h4={11236} chart={animations.graph1 as object}/>
            <div className={styles.chartsColumn}>
                <ChartItem p={t("registrations")} h4={1404} chart={animations.graph4 as object}/>
                <ChartItem
                    p={t("income")}
                    h4={32760}
                    chart={animations.graph2 as object}
                    highlighted
                />
            </div>
            <div className={styles.chart75}>
                <ChartItem p={t("deposits")} h4={468} chart={animations.graph3 as object}/>
            </div>
            <div className={styles.chart100}>
                <ChartItem p={t("deposits")} h4={468} chart={animations.graph4 as object}/>
            </div>
        </div>
    );
};

export default Charts;