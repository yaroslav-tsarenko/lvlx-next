"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animationsGsap = {
    fadeUp: {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
    },
    fadeLeft: {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
    },
    zoomIn: {
        from: { scale: 0.8, opacity: 0 },
        to: { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
    },
    blurFade: {
        from: { opacity: 0, filter: "blur(10px)" },
        to: { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
    },
    rotateIn: {
        from: { opacity: 0, rotate: -45, y: 50 },
        to: { opacity: 1, rotate: 0, y: 0, duration: 1.2, ease: "back.out(1.7)" },
    },
    fadeBlurLeftToRight: {
        from: { opacity: 0, x: -60, filter: "blur(12px)" },
        to: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
        },
    },
    fadeBlurLeftToRight2: {
        from: {
            opacity: 0,
            x: -200,
            filter: "blur(30px)",
            scale: 0.98,
            transformOrigin: "left center",
        },
        to: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 3.5,
            ease: "power2.inOut",
        },
    },
    fadeBlurFromBottomToTop: {
        from: { opacity: 0, y: 60, filter: "blur(12px)" },
        to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
        },
    },
    fadeBlurFromTopToBottom: {
        from: { opacity: 0, y: -60, filter: "blur(12px)" },
        to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
        },
    },
    typingTextFadeBlurFromLeft: {
        from: { opacity: 0, x: -40, filter: "blur(10px)", width: 0 },
        to: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
            width: "auto",
        },
    },
    staggeredFadeUp: {
        from: { opacity: 0, y: 60, filter: "blur(10px)" },
        to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.3,
        },
    },
};

export function useAnimation<T extends HTMLElement>({
                                                        animation = "fadeUp",
                                                        showWhenElementInView = true,
                                                        delay = 0,
                                                    }: {
    animation?: keyof typeof animationsGsap;
    showWhenElementInView?: boolean;
    delay?: number;
}) {
    const elementRef = useRef<T | null>(null);

    useEffect(() => {
        if (!elementRef.current) return;
        const anim = animationsGsap[animation];

        if (showWhenElementInView) {
            gsap.fromTo(
                elementRef.current,
                anim.from,
                {
                    ...anim.to,
                    delay,
                    scrollTrigger: {
                        trigger: elementRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                }
            );
        } else {
            gsap.fromTo(elementRef.current, anim.from, { ...anim.to, delay });
        }
    }, [animation, showWhenElementInView, delay]);

    return elementRef;
}