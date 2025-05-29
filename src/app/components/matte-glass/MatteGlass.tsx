"use client";

import React, { FC, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./MatteGlass.module.scss";

interface MatteGlassProps {
    title: string;
    description: string;
    src: {
        image: StaticImageData | string;
        gif: StaticImageData | string;
    };
}

const MatteGlass: FC<MatteGlassProps> = ({ title, description, src }) => {
    const [currentSrc, setCurrentSrc] = useState<StaticImageData | string>(src.image);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobileScreen = window.innerWidth <= 768;
            setIsMobile(isMobileScreen);
            setCurrentSrc(isMobileScreen ? src.gif : src.image);
        };

        handleResize(); // Set initial value based on screen width
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [src]);

    const handleMouseEnter = () => {
        if (!isMobile) setCurrentSrc(src.gif);
    };

    const handleMouseLeave = () => {
        if (!isMobile) setCurrentSrc(src.image);
    };

    return (
        <div className={styles.wrapper}>
            <Image
                loading="lazy"
                src={currentSrc}
                alt={title}
                width={430}
                height={580}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <div className={styles.titles}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default MatteGlass;