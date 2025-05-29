"use client";

import React, { useEffect, useState } from "react";
import styles from "./Benefits.module.scss";
import linesOrange from "@/assets/gifs/lines.gif";
import Image from "next/image";
import MatteGlass from "@/app/components/matte-glass/MatteGlass";
import rocket from "@/assets/images/rocket-static.svg";
import graph from "@/assets/images/charts-static.svg";
import eggs from "@/assets/images/eggs-static.svg";
import arrows from "@/assets/images/three-arrows.svg";
import UnionItem from "@/app/components/union-item/UnionItem";
import BadgeComponent from "@/app/components/badge-component/BadgeComponent";
import { useAnimation } from "@/hooks/useAnimation";
import {useTranslation} from "react-i18next";

const Benefits = () => {

    const [animations, setAnimations] = useState<{ [key: string]: any }>({});
    const { t } = useTranslation();

    useEffect(() => {
        const fetchAnimations = async () => {
            try {
                const [rocketAnimation, graphAnimation, eggsAnimation] = await Promise.all([
                    import("@/assets/animations/rocket.json"),
                    import("@/assets/animations/graph.json"),
                    import("@/assets/animations/egg.json"),
                ]);
                setAnimations({
                    rocket: rocketAnimation.default,
                    graph: graphAnimation.default,
                    eggs: eggsAnimation.default,
                });
            } catch (error) {
                console.error("Error fetching animations:", error);
            }
        };

        fetchAnimations();
    }, []);

    const ref = useAnimation<HTMLHeadingElement>({
        animation: "fadeBlurLeftToRight",
        showWhenElementInView: true,
        delay: 0.3,
    });

    const unionsRef = useAnimation<HTMLHeadingElement>({
        animation: "fadeBlurFromBottomToTop",
        showWhenElementInView: true,
        delay: 0.3,
    });

    return (
        <div className={styles.outer} id="benefits-section">
            <div className={styles.badge}>
                <BadgeComponent AvatarInitial="3" BadgeContent="%" Title={t("referrals")} />
            </div>
            <div className={styles.wrapper}>
                <Image src={arrows} alt="arrows" className={styles.arrows} />
                <Image
                    loading="lazy"
                    src={linesOrange}
                    alt="Lines"
                    className={styles.lines}
                    width={1920}
                    height={500}
                />
                <h1 ref={ref}>{t("benefits")}</h1>
                <div className={styles.unions} ref={unionsRef}>
                    <UnionItem title={t("benefitEveryWeek")} />
                    <UnionItem title={t("benefitPersonalManager")} />
                    <UnionItem title={t("benefitCustomCreatives")} />
                    <UnionItem title={t("benefitReferral")} />
                </div>
                <div className={styles.benefits}>
                    {animations.eggs && (
                        <MatteGlass
                            title={t("benefitCardTitle1")}
                            description={t("benefitCardDescription1")}
                            src={{
                                image: eggs,
                                json: animations.eggs,
                            }}
                        />
                    )}
                    {animations.graph && (
                        <MatteGlass
                            title={t("benefitCardTitle2")}
                            description={t("benefitCardDescription2")}
                            src={{
                                image: graph,
                                json: animations.graph,
                            }}
                        />
                    )}
                    {animations.rocket && (
                        <MatteGlass
                            title={t("benefitCardTitle3")}
                            description={t("benefitCardDescription3")}
                            src={{
                                image: rocket,
                                json: animations.rocket,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Benefits;