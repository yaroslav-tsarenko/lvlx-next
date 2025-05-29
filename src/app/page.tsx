"use client";

import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18next";
import { FormRegistrationProvider } from "@/context/FormRegistrationContext";
import BottomNav from "./components/bottom-nav/BottomNav";
import Benefits from "./components/benefits/Benefits";
import Product from "./components/product/Product";
import FAQ from "./components/faq/FAQ";
import Streamers from "./components/streamers/Streamers";
import Hero from "@/app/components/hero/Hero";
import Footer from "./components/footer/Footer";
import Preloader from "./components/preloader/Preloader";


const Page = () => {

    return (
            <I18nextProvider i18n={i18n}>
                <FormRegistrationProvider>
                    <Preloader/>
                    <BottomNav />
                    <Hero />
                    <Benefits />
                    <Product />
                    <Streamers />
                    <FAQ />
                    <Footer />
                </FormRegistrationProvider>
            </I18nextProvider>
    );
};

export default Page;
