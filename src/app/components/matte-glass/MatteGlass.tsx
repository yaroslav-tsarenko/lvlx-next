"use client";

import React, { FC, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./MatteGlass.module.scss";
import { Player } from "@lottiefiles/react-lottie-player";

interface MatteGlassProps {
    title: string;
    description: string;
    src: {
        image: StaticImageData | string;
        gif?: StaticImageData | string;
        json?: object;
    };
}

const MatteGlass: FC<MatteGlassProps> = ({ title, description, src }) => {
    const [showAnimation, setShowAnimation] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth <= 768;
            setIsMobile(isMobileView);
            setShowAnimation(isMobileView);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleMouseEnter = () => {
        if (!isMobile && src.json) setShowAnimation(true);
    };

    const handleMouseLeave = () => {
        if (!isMobile) setShowAnimation(false);
    };

    return (
        <div
            className={styles.wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showAnimation && src.json ? (
                <Player
                    autoplay
                    loop
                    src={src.json}
                    className={styles.animation}
                />
            ) : (
                <Image
                    loading="lazy"
                    src={src.image}
                    alt={title}
                    width={430}
                    className={styles.animationCustom}
                    height={580}
                />
            )}
            <div className={styles.titles}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default MatteGlass;