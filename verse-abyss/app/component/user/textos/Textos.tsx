'use client';

import React, { useEffect, useState } from "react";
import { getAllTextsByUserId } from "@/pages/api/user/user";
import InfiniteScroll from "react-infinite-scroll-component";

import { Text } from "@/pages/interface/text";
import { Avatar } from "radix-ui";

import {
    HeartFilledIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import Loader from "../../loader/Loader";

import "./textos.css";

export default function UserTexts() {
    const [texts, setTexts] = useState<Text[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        fetchTexts();
    }, []);

    const fetchTexts = async () => {
        try {
            const response = await getAllTextsByUserId(page);
            const data = await response.json();

            const dataTexts = data.texts as Text[];

            if (dataTexts.length === 0) {
                setHasMore(false)
                return
            }

            setTexts(prev => [...prev, ...dataTexts]);
            setPage(prev => prev + 1);

            if (dataTexts.length < 10) {
                setHasMore(false);
                return
            }
        } catch (error) {
            console.error("Erro ao buscar textos:", error);
        }
    }


    return (
        <div id="scrollableDiv">
            <InfiniteScroll
                dataLength={texts.length}
                next={fetchTexts}
                hasMore={hasMore}
                loader={<Loader />}
                endMessage={<p className="endMessage">🌌 Não há mais textos para exibir.</p>}
                scrollableTarget="scrollableDiv"
            >
                <div className="texts">
                    {texts.map((text, index) => (
                        <article className="text-card-perfil" key={index}>
                            {/* Header */}
                            <div className="header-text-card">
                                <div className="people">
                                    <Avatar.Root>
                                        <Avatar.Fallback className="avatar-fallback">
                                            {text.user.nome[0]}
                                        </Avatar.Fallback>
                                    </Avatar.Root>
                                    <div className="nome-email">
                                        <span className="nome">{text.user.nome}</span>
                                        <span className="data">
                                            {new Date(text.criadoEm).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Corpo */}
                            <div className="separator"></div>

                            <div className="body-text-card">
                                <div className="title-text-card">{text.titulo}</div>
                                <div className="content-text-card">{text.conteudo}</div>
                            </div>

                            <div className="separator"></div>

                            {/* Rodapé */}
                            <div className="footer-text-card">
                                <div className="tag-footer-card">#{text.tag.nome}</div>
                                <div className="favorito-info">
                                    <HeartFilledIcon
                                    />
                                    <span className="quantidade-favoritos">
                                        {text.quantFavoritos} favoritos
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}