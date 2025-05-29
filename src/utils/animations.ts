import gsap from "gsap";

export const fadeIn = (target: string) => {
    gsap.fromTo(
        target,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
};

export const fadeOut = (target: string) => {
    gsap.to(target, { opacity: 0, y: 50, duration: 1, ease: "power3.in" });
};

export const slideIn = (target: string) => {
    gsap.fromTo(
        target,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
};

export const slideOut = (target: string) => {
    gsap.to(target, { x: 100, opacity: 0, duration: 1, ease: "power3.in" });
};

export const scaleUp = (target: string) => {
    gsap.fromTo(
        target,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
    );
};

export const scaleDown = (target: string) => {
    gsap.to(target, { scale: 0.8, opacity: 0, duration: 1, ease: "power3.in" });
};

export const fadeUpBlur = (target: string) => {
    gsap.fromTo(
        target,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
    );
};