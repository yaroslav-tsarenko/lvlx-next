"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ChartItem.module.scss";
import clsx from "clsx";

type Props = {
    chart: string;
    h4: number;
    p: string;
    highlighted?: boolean;
    maxHeight?: string | null;
};

const ChartItem = ({ chart, h4, p, highlighted = false, maxHeight = null }: Props) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const [visible, setVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.2,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) return;

        const startTime = performance.now();
        const duration = 6000;

        const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(h4 * progress);
            setAnimatedValue(value);
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [visible, h4]);

    return (
        <div
            ref={containerRef}
            className={clsx(styles.chartItem, { [styles.highlighted]: highlighted })}
            style={{ maxHeight: maxHeight || "none" }}>
            <div className={styles.chartItemHeader}>
                <h4>
                    {p === "доход" ? "$" : ""}
                    {animatedValue}
                </h4>
                <p>{p}</p>
            </div>
            <video
                src={chart}
                className={styles.chartImage}
                width={160}
                height={140}
                autoPlay
                loop
                muted
                style={{ backgroundColor: "transparent" }}
                playsInline/>
        </div>
    );
};

export default ChartItem;
