"use client";

import {useEffect, useRef, useState} from "react";
import Matter from "matter-js";
import styles from "./FAQ.module.scss";

import sprite1 from "@/assets/images/grey.png";
import sprite2 from "@/assets/images/red.png";
import sprite3 from "@/assets/images/black.png";
import FaqItem from "@/app/components/faq-item/FaqItem";
import {useTranslation} from "react-i18next";

const FaqSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const faqBoxRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState<number | null>(null);
    const {t} = useTranslation();

    const faqData = [
        {
            question: t("faqQuestion1"),
            answer: t("faqAnswer1"),
        },
        {
            question: t("faqQuestion2"),
            answer: t("faqAnswer2"),
        },
        {
            question: t("faqQuestion3"),
            answer: t("faqAnswer3"),
        },
        {
            question: t("faqQuestion4"),
            answer: t("faqAnswer4"),
        },
        {
            question: t("faqQuestion5"),
            answer: t("faqAnswer5"),
        },
        {
            question: t("faqQuestion6"),
            answer: t("faqAnswer6"),
        },
        {
            question: t("faqQuestion7"),
            answer: t("faqAnswer7"),
        },
    ];

    const handleChange = (index: number) => {
        setExpanded(expanded === index ? null : index);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {threshold: 0.3}
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible || !containerRef.current || !canvasRef.current || !faqBoxRef.current) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;
        const faqBox = faqBoxRef.current;

        const containerRect = container.getBoundingClientRect();
        const faqRect = faqBox.getBoundingClientRect();

        const width = containerRect.width;
        const height = containerRect.height;

        const engine = Matter.Engine.create();
        const world = engine.world;

        const render = Matter.Render.create({
            canvas,
            engine,
            options: {
                width,
                height,
                background: "transparent",
                wireframes: false
            }
        });

        Matter.Render.run(render);
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        const ground = Matter.Bodies.rectangle(width / 2, height + 60, width, 120, {
            isStatic: true,
            render: {visible: false}
        });
        const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height, {
            isStatic: true,
            render: {visible: false}
        });
        const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height, {
            isStatic: true,
            render: {visible: false}
        });

        const faqBody = Matter.Bodies.rectangle(
            faqRect.left - containerRect.left + faqRect.width / 2,
            faqRect.top - containerRect.top + faqRect.height / 2,
            faqRect.width,
            faqRect.height,
            {
                isStatic: true,
                restitution: 0.5,
                render: {
                    fillStyle: "transparent"
                }
            }
        );

        Matter.World.add(world, [ground, leftWall, rightWall, faqBody]);

        const spriteList = [sprite1.src, sprite2.src, sprite3.src];
        const isMobile = window.innerWidth <= 768;
        const radius = isMobile ? 40 : 80; // менші яйця на мобілці

        const objects = Array.from({length: 20}).map(() =>
            Matter.Bodies.circle(Math.random() * width, isMobile
                    ? height + Math.random() * 200 // нижній старт для мобільного
                    : Math.random() * -1000, // звичайний верхній старт для десктопу
                radius,
                {
                    restitution: 0.5,
                    friction: 0.1,
                    render: {
                        sprite: {
                            texture: spriteList[Math.floor(Math.random() * spriteList.length)],
                            xScale: isMobile ? 0.35 : 0.6,
                            yScale: isMobile ? 0.35 : 0.6
                        }
                    }
                }
            )
        );


        Matter.World.add(world, objects);

        const mouse = Matter.Mouse.create(canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.5,
                render: {visible: false}
            }
        });

        Matter.World.add(world, mouseConstraint);
        render.mouse = mouse;

        const resizeObserver = new ResizeObserver(() => {
            const {width, height} = container.getBoundingClientRect();
            render.canvas.width = width;
            render.canvas.height = height;
            render.options.width = width;
            render.options.height = height;
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        };
    }, [visible]);

    return (
        <>
            <div className={styles.wrapper} ref={containerRef} id="faq-section">
                <h1>FAQ</h1>
                <canvas ref={canvasRef} className={styles.physicsCanvas}/>
                <div ref={faqBoxRef} className={styles.faqBox}>
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            expanded={expanded === index}
                            onChange={() => handleChange(index)}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.mobileWrapper} id="faq-section">
               <h2>FAQ</h2>
                <div className={styles.mobileFaqBox}>
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            expanded={expanded === index}
                            onChange={() => handleChange(index)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FaqSection;
