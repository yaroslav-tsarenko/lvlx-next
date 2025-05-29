"use client";

import React, { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18next";
import { FormRegistrationProvider } from "@/context/FormRegistrationContext";
import Preloader from "@/app/components/preloader/Preloader";

const Hero = dynamic(() => import("@/app/components/hero/Hero"));
const Benefits = dynamic(() => import("@/app/components/benefits/Benefits"));
const Product = dynamic(() => import("@/app/components/product/Product"));
const Streamers = dynamic(() => import("@/app/components/streamers/Streamers"));
const FAQ = dynamic(() => import("@/app/components/faq/FAQ"));
const Footer = dynamic(() => import("@/app/components/footer/Footer"));
const BottomNav = dynamic(() => import("@/app/components/bottom-nav/BottomNav"));

const Page = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const waitForPageLoad = async () => {
            if (document.readyState !== "complete") {
                await new Promise<void>((resolve) => {
                    window.addEventListener("load", () => resolve(), { once: true });
                });
            }
            await new Promise((res) => setTimeout(res, 2000));
            setReady(true);
        };

        waitForPageLoad();
    }, []);

    if (!ready) {
        return <Preloader />;
    }

    return (
        <Suspense fallback={<Preloader />}>
            <I18nextProvider i18n={i18n}>
                <FormRegistrationProvider>
                    <BottomNav />
                    <Hero />
                    <Benefits />
                    <Product />
                    <Streamers />
                    <FAQ />
                    <Footer />
                </FormRegistrationProvider>
            </I18nextProvider>
        </Suspense>
    );
};

export default Page;
