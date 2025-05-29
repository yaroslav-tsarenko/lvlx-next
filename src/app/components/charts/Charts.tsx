import React from 'react';
import styles from "./Charts.module.scss"
import ChartItem from '../chart-item/ChartItem';

const Charts = () => {

    const visitorsChart = "./graph-1.webm";
    const registerChart = "/graph-2.webm";
    const earningsChart = "/graph-3.webm";
    const depositChart  =  "/graph-4.webm";

    return (
        <div className={styles.charts}>
            <ChartItem p="посещений" h4={11236} chart={visitorsChart}/>
            <div className={styles.chartsColumn}>
                <ChartItem p="регистраций" h4={1404} chart={registerChart}/>
                <ChartItem
                    p="доход"
                    h4={32760}
                    chart={earningsChart}
                    highlighted
                />
            </div>
            <div className={styles.chart75}>
                <ChartItem p="депозитов" h4={468} chart={depositChart}/>
            </div>
            <div className={styles.chart100}>
                <ChartItem p="депозитов" h4={468} chart={depositChart}/>
            </div>
        </div>
    );
};

export default Charts;