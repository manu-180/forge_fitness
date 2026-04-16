"use client";

import { useCallback, useState } from "react";
import { BackToTop } from "@/components/BackToTop";
import { Coaches } from "@/components/Coaches";
import { CTA } from "@/components/CTA";
import { Differentiators } from "@/components/Differentiators";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { Pricing } from "@/components/Pricing";
import { Programs } from "@/components/Programs";
import { Schedule } from "@/components/Schedule";
import { Testimonials } from "@/components/Testimonials";
import { Ticker } from "@/components/Ticker";
import {
  tickerBadges,
  tickerCategories,
  tickerMotivation,
  tickerReviews,
} from "@/lib/data";

export function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const onLoaded = useCallback(() => setLoaded(true), []);
  return (
    <>
      <Preloader onDone={onLoaded} />
      <Navbar />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity .8s ease .2s",
        }}
      >
        <Hero />
        <Ticker items={tickerMotivation} speed={35} sep="star" />
        <Differentiators />
        <Ticker items={tickerCategories} speed={25} reverse lime />
        <Programs />
        <Coaches />
        <Schedule />
        <Pricing />
        <Testimonials />
        <Ticker items={tickerReviews} speed={32} />
        <Ticker items={tickerBadges} speed={26} reverse lime />
        <Experience />
        <Gallery />
        <CTA />
        <Footer />
      </div>
      <BackToTop />
      <div className="G" aria-hidden />
    </>
  );
}
