"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import styles from "./FAQ.module.scss";

import sprite1 from "@/assets/images/grey.png";
import sprite2 from "@/assets/images/red.png";
import sprite3 from "@/assets/images/black.png";
import FaqItem from "@/app/components/faq-item/FaqItem";

const FaqSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const faqBoxRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState<number | null>(null);

    const faqData = [
        {
            question: "Что такое партнерская программа LVLX?",
            answer: "LVLX - это удобный маркетинговый инструмент, который используют владельцы веб-ресурсов, стримеры, арбитражники, другие специалисты перфоманс-маркетинга для привлечения целевого трафика на гемблинг и беттинг офферы, такие как GETX."
        },
        {
            question: "Что такое арбитраж трафика?",
            answer: "Это схема заработка, при которой человек (арбитражник) покупает трафик на одном источнике и перенаправляет его на офферы рекламодателя, зарабатывая на комиссии - разнице между стоимостью привлечения трафика и доходом от конверсий."
        },
        {
            question: "Как стать партнером и зарабатывать с LVLX?",
            answer: "1. Зарегистрируйся на сайте партнерской программы LVLX по ссылке, дождись сообщения от менеджера, который подтвердит твой доступ в личный кабинет и поможет с запуском.\n2. Привлекай аудиторию и получай прибыль по выбранной модели сотрудничества: RevShare, CPA или Hybrid.\n3. Твое вознаграждение зависит от количества и качества трафика.\n"
        },
        {
            question: "Как и когда производятся выплаты?",
            answer: "По модели RevShare заработок партнера выплачиваем каждый вторник.\nПо моделям СРА и Hybrid выплачиваем 2 раза в месяц за периоды 1-15 и 16-30(31) числа месяца.\nВыплаты производятся в USDT, BTC, на карту VISA и MasterCard.\nМинимальная сумма для выплаты - $50\n"
        },
        {
            question: "Какие источники трафика мы принимаем?",
            answer: "Партнерка LVLX принимает все виды трафика, а именно: SEO (кроме SEO по брендовым ключам наших продуктов), PPC, ASO, UAC, Facebook, In-app, соцсети, баннерную рекламу, стримы. Также готовы обсудить любой альтернативный источник трафика.\nЗапрещено: схемы обмана игроков, мислид, фрод, мотив, так называемый куки стаффинг, игра под своей рефкой.\nКаждый запуск согласовывается с личным аффилейт менеджером.\n"
        },
        {
            question: "Что такое СРА и RevShare, какую модель лучше выбрать?",
            answer: "CPA - это оплата за целевое действие, в нашем случае за первый депозит приведенного тобой игрока. Ставка по CPA зависит от источника, качества и объема трафика и обсуждается в индивидуальном порядке.\nRevShare - это процент от дохода, который приносят игроки. Наша партнерка предлагаем 50% от NGR пожизненно.\nВыбор модели зависит от типа трафика, и наши менеджеры порекомендуют лучший вариант для твоего роста.\n"
        },
        {
            question: "Что такое Referal?",
            answer: "Прямой рекламодатель LVLX дает возможность своим партнерам зарабатывать не только на продвижении gambling продуктов и привлечении пользователей, но и на привлечении новых вебмастеров для работы с партнерской программой.\nЗарабатывай 3% от дохода реферала.\n"
        },
        {
            question: "Информация для СМИ",
            answer: "По любым вопросам медиа-сотрудничества, обращайся в наш PR-отдел партнерки: t.me/afflvlx\n"
        }
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
            { threshold: 0.3 }
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
            render: { visible: false }
        });
        const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height, {
            isStatic: true,
            render: { visible: false }
        });
        const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height, {
            isStatic: true,
            render: { visible: false }
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

        const objects = Array.from({ length: 20 }).map(() =>
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
                render: { visible: false }
            }
        });

        Matter.World.add(world, mouseConstraint);
        render.mouse = mouse;

        const resizeObserver = new ResizeObserver(() => {
            const { width, height } = container.getBoundingClientRect();
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
        <div className={styles.wrapper} ref={containerRef} id="faq-section">
            <h1>FAQ</h1>
            <canvas ref={canvasRef} className={styles.physicsCanvas} />
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
    );
};

export default FaqSection;
