"use client";

import React from 'react';
import styles from "./Benefits.module.scss"
import linesOrange from "@/assets/gifs/lines.gif"
import Image from "next/image";
import MatteGlass from "@/app/components/matte-glass/MatteGlass";
import rocketGif from "@/assets/gifs/rocket.gif"
import eggsGif from "@/assets/gifs/eggs.gif"
import graphGif from "@/assets/gifs/graph.gif"
import rocket from "@/assets/images/rocket-static.svg"
import graph from "@/assets/images/charts-static.svg"
import eggs from "@/assets/images/eggs-static.svg"
import arrows from "@/assets/images/three-arrows.svg"
import UnionItem from "@/app/components/union-item/UnionItem";
import BadgeComponent from "@/app/components/badge-component/BadgeComponent";
import {useAnimation} from "@/hooks/useAnimation";

const Benefits = () => {

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
                <BadgeComponent AvatarInitial="3" BadgeContent="%" Title="реферальных"/>
            </div>
            <div className={styles.wrapper}>
                <Image src={arrows} alt="arrows" className={styles.arrows}/>
                <Image loading="lazy" src={linesOrange} alt="Lines" className={styles.lines} width={1920} height={500}/>
                <h1 ref={ref}>Наши преимущества</h1>
                <div className={styles.unions} ref={unionsRef}>
                    <UnionItem title="Выплаты каждую неделю"/>
                    <UnionItem title="Личный менеджер"/>
                    <UnionItem title="Кастомные креативы"/>
                    <UnionItem title="Приложения в аренду"/>
                </div>
                <div className={styles.benefits}>
                    <MatteGlass title="Новые продукты"
                                description="Воспользуйся преимуществом пустой базы гемблинг и беттинг офферов при топовом конверте reg2dep 20-50% для эффективной монетизации"
                                src={{
                                    image: eggs,
                                    gif: eggsGif
                                }}/>
                    <MatteGlass title="Прозрачная статистика"
                                description="Отслеживай качество трафика в партнерской программе и оптимизируй рекламные кампании, чтобы получить максимальный профит"
                                src={{
                                    image: graph,
                                    gif: graphGif
                                }}/>
                    <MatteGlass title="Собственная разработка"
                                description="Позволяет нам нон-стоп развивать продукты под потребности быстро меняющегося рынка и показывать стабильный рост"
                                src={{
                                    image: rocket,
                                    gif: rocketGif
                                }}/>
                </div>
            </div>
        </div>
    );
};

export default Benefits;