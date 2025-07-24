'use client'

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getAllTextsByTagId } from "@/pages/api/texts/texts";
import { TextCard } from "@/app/component/textCard/TextCard";
import { Text } from "@/pages/interface/text";
import InfiniteScroll from "react-infinite-scroll-component";

import { Hero } from "@/app/component/hero/hero";

import Loader from "@/app/component/loader/Loader";

import './tagId.css'

export default function TextByTagId() {

    const params = useParams();

    const [texts, setTexts] = useState<Text[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [tagTitle, setTagTitle] = useState<string>("");

    const tagId = params?.tagId;

    useEffect(() => {
        fetchTextsTags()
    }, [])

    const fetchTextsTags = async () => {
        try {
            const response = await getAllTextsByTagId(page, Number(tagId))
            const data = await response.json();

            const newTexts = data.texts.texts;

            if (newTexts.length === 0) {
                setHasMore(false);
                return;
            }

            setTexts(prev => [...prev, ...newTexts]);
            setPage(prev => prev + 1);
            setTagTitle(newTexts[0].tag.nome)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="tag-id-page" id="scrollableDiv">

            <Hero
                title={`#${tagTitle}`}
                text={`Palavras reunidas sob o chamado de ${tagTitle} — para quem sente que o silêncio já não basta.`}
                sub={`🌘 Fragmentos sob o selo da jornada "${tagTitle}".`}
            />


                <InfiniteScroll
                    dataLength={texts.length}
                    next={fetchTextsTags}
                    hasMore={hasMore}
                    loader={<Loader />}
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