import { Request, Response } from "express";
import { FavoriteService } from "../service/favoriteService";

const favoriteService = new FavoriteService();

export class FavoriteController {
    async createFavorite(req: Request, res: Response): Promise<Response> {
        const { textId } = req.body;

        const user = req.user;

        if (!user || typeof user === "string") {
            return res.status(400).json({ message: "Usuário não identificado no token" })
        }

        const userId = user.userId;

        try {
            const newFavorite = await favoriteService.createFavorite(textId, userId)

            if (!newFavorite) {
                return res.status(400).send({ message: "Não foi possível favoritar" })
            }

            return res.status(200).send({ message: "Texto favoritado com sucesso! ", newFavorite: newFavorite })
        } catch (e) {
            return res.status(500).send({ message: "Não foi possível favoritar o text devido a um problema interno!" })
        }
    }

    async getAllFavoriteByUserId(req: Request, res: Response): Promise<Response> {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const user = req.user;

        if (!user || typeof user === "string") {
            return res.status(400).json({ message: "Usuário não identificado no token" })
        }

        const userId = user.userId;

        try {
            const allTextsFavorited = await favoriteService.getAllFavoriteByUserId(Number(userId), page, limit);

            return res.status(200).send({ message: "Textos favoritados obtidos com sucesso!", allTextsFavorited: allTextsFavorited })
        } catch (e) {
            return res.status(500).send({ message: "Não foi possível obter os textos favoritados pelo usuário devido a um problema interno!" })
        }
    }
}