'use client'

import React from "react";

import InfiniteScrollTexts from "@/app/component/infiniteScroll/InfiniteScroll";

import { Hero } from "@/app/component/hero/hero";

import './home.css'

export default function Home() {

  return (
    <div className="home" id="scrollableDiv">
      <Hero
        title="Verse Abyss"
        text="Mergulhe nos escritos que habitam as profundezas da alma. Cada texto é um eco do invisível, uma centelha do abismo interior."
        sub="🌑 Todos os textos compartilhados por almas viajantes do verso."
      />
      <InfiniteScrollTexts />
    </div>

  );
}
