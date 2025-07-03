import { Favorite } from "@prisma/client";
import prisma from "../lib/prisma";

export class FavoriteService {
    async createFavorite(textId: number, userId: number): Promise<Favorite> {
        if (!textId || !userId) {
            throw new Error("Os campos são requeridos")
        }

        try {
            const newFavorite = await prisma.favorite.create({
                data: {
                    textId: textId,
                    userId: userId
                }
            })

            return newFavorite;
        } catch (e) {
            console.error("Não foi possível favoritar este texto: " + e)
            throw new Error("Não foi possível favoritar este texto devidoa um problema interno!")
        }
    }

    async getAllFavoriteByUserId(userId: number): Promise<Favorite[]> {
        try {
            const allTextsFavorited = await prisma.favorite.findMany({
                where: {
                    userId: userId
                },
                include: {
                    text: {
                        select: {
                            tag: true,
                            user: {
                                select: {
                                    id: true,
                                    nome: true,
                                    email: true
                                }
                            },
                            id: true,
                            conteudo: true,
                            titulo: true,
                            criadoEm: true
                        }
                    }
                }
            })

            return allTextsFavorited;
        } catch (e) {
            console.error("Não foi possível obter os favoritos: " + e)
            throw new Error("Não foi possível obter os favoritos devido a um problema interno")
        }
    }
}