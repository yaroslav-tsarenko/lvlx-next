"use client";

import React from "react";
import styles from "./Preloader.module.scss";

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <div className={styles.logoWrapper}>
                <div className={styles.shiningLogo}></div>
            </div>
        </div>
    );
};

export default Preloader;
