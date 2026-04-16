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
import { getSiteConfig } from "@/lib/site-config";

export function HomePage() {
  const { sections: s } = getSiteConfig();
  const [loaded, setLoaded] = useState(!s.preloader);
  const onLoaded = useCallback(() => setLoaded(true), []);
  return (
    <>
      {s.preloader && <Preloader onDone={onLoaded} />}
      <Navbar />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity .8s ease .2s",
        }}
      >
        <Hero />
        {s.tickerMotivation && (
          <Ticker items={tickerMotivation} speed={35} sep="star" />
        )}
        {s.differentiators && <Differentiators />}
        {s.tickerCategories && (
          <Ticker items={tickerCategories} speed={25} reverse lime />
        )}
        {s.programs && <Programs />}
        {s.coaches && <Coaches />}
        {s.schedule && <Schedule />}
        {s.pricing && <Pricing />}
        {s.testimonials && <Testimonials />}
        {s.tickerReviews && <Ticker items={tickerReviews} speed={32} />}
        {s.tickerBadges && (
          <Ticker items={tickerBadges} speed={26} reverse lime />
        )}
        {s.experience && <Experience />}
        {s.gallery && <Gallery />}
        {s.cta && <CTA />}
        <Footer />
      </div>
      <BackToTop />
      <div className="G" aria-hidden />
    </>
  );
}
