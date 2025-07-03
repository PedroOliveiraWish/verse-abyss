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

    async getAllTexts(): Promise<Text[]> {
        try {
            const allTexts = await prisma.text.findMany({
                include: {
                    tag: true,
                    user: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    }
                }
            });

            return allTexts as Text[];
        } catch (e) {
            console.error("Não foi possível obter todos os textos: " + e)
            throw new Error("Não foi possível obter os textos devido a um problema interno!")
        }
    }

    async getTextsByTagId(tagId: number): Promise<Text[]> {
        try {
            const allTexts = await prisma.text.findMany({
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
                }
            })

            return allTexts as Text[];
        } catch (e) {
            console.error("Não foi possível obter todos os textos: " + e)
            throw new Error("Não foi possível obter os textos devido a um problema interno!")
        }
    }
}