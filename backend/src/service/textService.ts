import { Text } from "@prisma/client";
import prisma from "../lib/prisma";

export class TextService {
    async createText(userId: number, tagId: number, titulo: string, conteudo: string): Promise<Text> {

        if (!userId) {
            throw new Error("Por favor faça login!")
        }

        if (!titulo || !conteudo || !tagId) {
            throw new Error("Todos os campos são requeridos!")
        }

        try {
            const newText = await prisma.text.create({
                data: {
                    userId: userId,
                    tagId: tagId,
                    titulo: titulo,
                    conteudo: conteudo
                }
            })

            return newText;
        } catch (e) {
            console.log("Não foi possível criar um texto: " + e)
            throw new Error("Não foi possível criar um texto devido a um problema interno!")
        }
    }

    async getAllTexts(page: number, limit: number, userId: number): Promise<{ texts: Text[], total: number, limit: number, page: number }> {
        try {

            const skip = (page - 1) * limit;

            const [texts, total] = await Promise.all([
                prisma.text.findMany({
                    skip,
                    take: limit,
                    include: {
                        tag: true,
                        user: {
                            select: {
                                id: true,
                                nome: true,
                                email: true
                            }
                        },
                        favoritos: true,
                        _count: {
                            select: {
                                favoritos: true
                            }
                        }
                    },
                    orderBy: {
                        criadoEm: 'desc'
                    }
                }),
                prisma.text.count()
            ])

            const textWIthFavoriteStatusCount = texts.map((text) => {
                const textObject: (Text & { isFavorited?: boolean, quantFavoritos?: number }) = {
                    ...text,
                    isFavorited: userId ? (text.favoritos?.length > 0) : undefined,
                    quantFavoritos: text._count?.favoritos
                }

                return textObject
            })

            return {
                texts: textWIthFavoriteStatusCount,
                total,
                page,
                limit
            }
        } catch (e) {
            console.error("Não foi possível obter todos os textos: " + e)
            throw new Error("Não foi possível obter os textos devido a um problema interno!")
        }
    }

    async getTextsByTagId(tagId: number, page: number, limit: number): Promise<{ texts: Text[], total: number, limit: number, page: number }> {
        try {

            const skip = (page - 1) * limit;


            const [texts, total] = await Promise.all([
                prisma.text.findMany({
                    skip,
                    take: limit,
                    where: {
                        tagId: tagId
                    },
                    include: {
                        tag: true,
                        user: {
                            select: {
                                id: true,
                                nome: true,
                                email: true
                            }
                        }
                    },
                    orderBy: {
                        criadoEm: 'desc'
                    }
                }),
                prisma.text.count()
            ])

            return {
                texts,
                total,
                page,
                limit
            }
        } catch (e) {
            console.error("Não foi possível obter todos os textos: " + e)
            throw new Error("Não foi possível obter os textos devido a um problema interno!")
        }
    }

    async getAllTextsByUserId(userId: number, page: number, limit: number): Promise<Text[]> {
        try {

            const skip = (page - 1) * limit;

            const allTexts = await prisma.text.findMany({
                skip,
                take: limit,
                where: {
                    userId: userId
                },
                include: {
                    tag: true,
                    user: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    }
                },
                orderBy: {
                    criadoEm: 'desc'
                }
            })

            return allTexts;
        } catch (e) {
            console.error("Não foi possível obter todos os textos: " + e)
            throw new Error("Não foi possível obter os textos devido a um problema interno!")
        }
    }
}