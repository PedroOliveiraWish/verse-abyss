'use client'

import React, { useState, useEffect } from "react"
import { getFavoritedTextsByUser } from "@/pages/api/favorites/favorites"
import { Hero } from "@/app/component/hero/hero"

import { Favorite } from "@/pages/interface/favorite"
import { Avatar } from "radix-ui";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from "@/app/component/loader/Loader"

import './favorite.css'

export default function FavotitePage() {
    const [favorites, setFavorites] = useState<Favorite[]>([])
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        fetchFavorites()
    }, [])

    const fetchFavorites = async () => {
        try {
            const response = await getFavoritedTextsByUser(page, Number(userId))

            const json = await response.json()

            if (json.allTextsFavorited.favorites.length === 0) {
                setHasMore(false)
                return
            }

            setFavorites(prev => [...prev, ...json.allTextsFavorited.favorites])

            setPage(prev => prev + 1)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="content-div-favorito" id="scrollableDiv">
            <Hero title="Bem-vinda ao seu Relicário" text="Aqui estão guardados os textos que tocaram sua alma. Cada favorito é um fragmento do abismo que ressoou em seu coração." sub="Continue mergulhando, sentindo, lembrando… o que ecoa em você merece ser eterno." />

            <div >

                <InfiniteScroll
                    dataLength={favorites.length}
                    next={fetchFavorites}
                    hasMore={hasMore}
                    loader={<Loader />}
                    endMessage={<p>🌌 Não há mais textos para exibir.</p>}
                    scrollableTarget="scrollableDiv"
                >
                    <div
                        className="favorites"

                    >
                        {favorites.map((favorite) => (
                            <article className="favorite-card" key={favorite.text.id}>
                                <div className="favorite-header">
                                    <div className="favorite-user">
                                        <Avatar.Root>
                                            <Avatar.Fallback className="avatar-fallback">
                                                {favorite.text.user.nome[0]}
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                        <div className="user-info">
                                            <span className="user-name">{favorite.text.user.nome}</span>
                                            <span className="text-date">
                                                {new Date(favorite.text.criadoEm).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <HeartFilledIcon className="heart-icon" />
                                </div>

                                <div className="favorite-body">
                                    <h2 className="text-title">{favorite.text.titulo}</h2>
                                    <p className="text-content">{favorite.text.conteudo}</p>
                                </div>

                                <div className="favorite-footer">
                                    <span className="tag-name">#{favorite.text.tag.nome}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </InfiniteScroll>


            </div>
        </div>
    )
}