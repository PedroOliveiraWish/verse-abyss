'use client'

import React, { useState, useEffect } from "react";
import { getAllTexts } from "@/pages/api/texts/texts";
import InfiniteScroll from 'react-infinite-scroll-component';

import { Text } from "@/pages/interface/text";

import { TextCard } from "../textCard/TextCard";

import './infinite.css'

export default function InfiniteScrollTexts() {
  const [texts, setTexts] = useState<Text[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    fetchTexts()
  }, [])

  const fetchTexts = async () => {
    try {
      const response = await getAllTexts(page, Number(userId));
      const data = await response.json();

      const dataTexts: Text[] = data.texts;

      if (dataTexts.length === 0 || data.message === 'Não foi possível obter todos os textos devido a um erro interno!') {
        setHasMore(false)
        return
      }

      setTexts(prev => [...prev, ...dataTexts])
      setPage(prev => prev + 1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      

    >
      <InfiniteScroll
        dataLength={texts.length}
        next={fetchTexts}
        hasMore={hasMore}
        loader={<h4>Carregando mais textos...</h4>}
        endMessage={<p>🌌 Não há mais textos para exibir.</p>}
        scrollableTarget="scrollableDiv"
      >
        <div
          className="texts"

        >
          {texts.map((text) => (
            <TextCard
              key={text.id}
              {...text}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

