import { Request, Response } from "express";
import { FavoriteService } from "../service/favoriteService";

const favoriteService = new FavoriteService();

export class FavoriteController {
    async createFavorite(req: Request, res: Response): Promise<Response> {
        const { textId, userId } = req.body;

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
        const { userId } = req.params;

        try {
            const allTextsFavorited = await favoriteService.getAllFavoriteByUserId(Number(userId));

            if (!allTextsFavorited) {
                return res.status(404).send({ message: "Não foi possível obter os textos favoritados!" })
            }

            return res.status(200).send({ message: "Textos favoritados obtidos com sucesso!", allTextsFavorited: allTextsFavorited })
        } catch (e) {
            return res.status(500).send({ message: "Não foi possível obter os textos favoritados pelo usuário devido a um problema interno!" })
        }
    }
}