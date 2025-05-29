import React, {useEffect, useState} from 'react';
import styles from "./Charts.module.scss"
import ChartItem from '../chart-item/ChartItem';
import {useTranslation} from "react-i18next";
const Charts = () => {

    const [animations, setAnimations] = useState<{ [key: string]: any }>({});

    const { t } = useTranslation();

    useEffect(() => {
        const fetchAnimations = async () => {
            try {
                const [graph1, graph2, graph3, graph4] = await Promise.all([
                    import("@/assets/animations/graph1.json"),
                    import("@/assets/animations/graph2.json"),
                    import("@/assets/animations/graph3.json"),
                    import("@/assets/animations/graph4.json")
                ]);
                setAnimations({
                    graph1: graph1.default,
                    graph2: graph2.default,
                    graph3: graph3.default,
                    graph4: graph4.default
                });
            } catch (error) {
                console.error("Error fetching animations:", error);
            }
        };

        fetchAnimations();
    }, []);

    return (
        <div className={styles.charts}>
            <ChartItem p={t("visits")} h4={11236} chart={animations.graph1}/>
            <div className={styles.chartsColumn}>
                <ChartItem p={t("registrations")} h4={1404} chart={animations.graph4}/>
                <ChartItem
                    p={t("income")}
                    h4={32760}
                    chart={animations.graph2}
                    highlighted
                />
            </div>
            <div className={styles.chart75}>
                <ChartItem p={t("deposits")} h4={468} chart={animations.graph3}/>
            </div>
            <div className={styles.chart100}>
                <ChartItem p={t("deposits")} h4={468} chart={animations.graph4}/>
            </div>
        </div>
    );
};

export default Charts;