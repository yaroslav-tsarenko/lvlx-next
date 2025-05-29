"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import gsap from "gsap";

interface Message {
    nickname: string;
    message: string;
    pinned?: boolean;
}

const allMessages: Message[] = [
    { nickname: "GETX", message: "350% до $1000 на первые депозиты", pinned: true },
    { nickname: "FillTop", message: "Здорова клювoносый" },
    { nickname: "Gibson", message: "go общий стрим с Мелом! 🏛️" },
    { nickname: "BobrKurva", message: "пока домашку не сделаю, за слоты не сяду" },
    { nickname: "Tolik-0921", message: "Сегодня GETX дает 🚀" },
    { nickname: "Zubarev", message: "Больше инфы в TG t.me/zubaking" },
    { nickname: "Donta", message: "Лучше бы Luxury girl дала" },
    { nickname: "Oleg_453", message: "словил бонуску, но слил 10k" },
    { nickname: "Papa_troll", message: "Вечер в хату, сто тузов по сдаче))" },
];

const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

const Chat = () => {
    const chatRef = useRef<HTMLDivElement>(null);
    const chatContentRef = useRef<HTMLDivElement>(null);
    const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
    const [index, setIndex] = useState(0);
    const [started, setStarted] = useState(false);
    const [scrollStarted, setScrollStarted] = useState(false);
    const [nicknameColors, setNicknameColors] = useState<Record<string, string>>({});

    const pinnedMessages = allMessages.filter((msg) => msg.pinned);
    const unpinned = allMessages.filter((msg) => !msg.pinned);

    useEffect(() => {
        const colors: Record<string, string> = {};
        allMessages.forEach((msg) => {
            if (!colors[msg.nickname]) {
                colors[msg.nickname] = getRandomColor();
            }
        });
        setNicknameColors(colors);
    }, []);

    // 👁️ IntersectionObserver to trigger animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (chatRef.current) observer.observe(chatRef.current);
        return () => observer.disconnect();
    }, [started]);

    // ⏱️ Start adding messages only when visible
    useEffect(() => {
        if (!started) return;

        const interval = setInterval(() => {
            if (index < unpinned.length) {
                setVisibleMessages((prev) => [...prev, unpinned[index]]);
                setIndex((prev) => prev + 1);
            } else {
                clearInterval(interval);
                setTimeout(() => setScrollStarted(true), 1000);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [started, index]);

    // 🔄 Auto scroll
    useEffect(() => {
        if (!scrollStarted) return;
        const chatEl = chatContentRef.current;
        if (!chatEl) return;

        const messageElements = chatEl.querySelectorAll(`.${styles.chatItem}:not(.${styles.pinned})`);
        messageElements.forEach((item) => {
            const clone = item.cloneNode(true);
            chatEl.appendChild(clone);
        });

        const scrollLoop = () => {
            gsap.to(chatEl, {
                scrollTop: chatEl.scrollHeight,
                duration: 30,
                ease: "linear",
                onComplete: () => {
                    chatEl.scrollTop = 0;
                    scrollLoop();
                },
            });
        };

        scrollLoop();
    }, [scrollStarted]);

    return (
        <div className={styles.streamerChat} ref={chatRef}>
            <h4>Чат стрима</h4>
            <div className={styles.streamerChatContent} ref={chatContentRef}>
                {pinnedMessages.map((item, index) => (
                    <p key={`pinned-${index}`} className={`${styles.chatItem} ${styles.pinned}`}>
            <span className={styles.nickname} style={{ color: nicknameColors[item.nickname] }}>
              📌{item.nickname}:
            </span>{" "}
                        {item.message}
                    </p>
                ))}
                {visibleMessages.map((item, index) => (
                    <div key={`visible-${index}`} className={styles.chatItem}>
            <span className={styles.nickname} style={{ color: nicknameColors[item.nickname] }}>
              {item.nickname}:
            </span>{" "}
                        {item.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
