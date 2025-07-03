import { Tag } from "@prisma/client";
import prisma from "../lib/prisma";

export class TagService {
    async getAllTags(): Promise<Tag[]> {
        try {
            const allTags = await prisma.tag.findMany();

            return allTags as Tag[];
        } catch (e) {
            console.error("Não foi possível obter todas as tags: " + e)
            throw new Error("Não foi possível obter as tags devido a um problema interno")
        }
    }
}