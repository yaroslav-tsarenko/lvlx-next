import React from 'react';
import Hero from "@/app/components/hero/Hero";
import Benefits from "@/app/components/benefits/Benefits";
import FAQ from "@/app/components/faq/FAQ";
import Product from "@/app/components/product/Product";
import Streamers from "@/app/components/streamers/Streamers";

const Page = () => {
    return (
        <>
            <Hero/>
            <Benefits/>
            <Product/>
            <Streamers/>
            <FAQ/>
        </>
    );
};

export default Page;