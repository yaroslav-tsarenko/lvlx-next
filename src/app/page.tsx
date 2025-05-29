"use client";

import React from 'react';
import Hero from "@/app/components/hero/Hero";
import Benefits from "@/app/components/benefits/Benefits";
import FAQ from "@/app/components/faq/FAQ";
import Product from "@/app/components/product/Product";
import Streamers from "@/app/components/streamers/Streamers";
import Footer from "@/app/components/footer/Footer";
import BottomNav from "@/app/components/bottom-nav/BottomNav";
import {I18nextProvider} from 'react-i18next';
import i18n from '@/utils/i18next';

const Page = () => {
    return (
            <I18nextProvider i18n={i18n}>
                <BottomNav/>
                <Hero/>
                <Benefits/>
                <Product/>
                <Streamers/>
                <FAQ/>
                <Footer/>
            </I18nextProvider>
    );
};

export default Page;