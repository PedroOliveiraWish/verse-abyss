import { Request, Response } from "express";
import { TagService } from "../service/tagService";

const tagService = new TagService();

export class TagController {
    // Rota pública - não exige autenticação
    async getAllTags(req: Request, res: Response): Promise<Response> {
        try {
            const allTags = await tagService.getAllTags();

            if (!allTags) {
                return res.status(404).send("Não foi possível obter todas as tags")
            }

            return res.status(200).send(allTags)
        } catch (e) {
            return res.status(500).send({ message: "Não foi possível obter todas as tags devido a um problema interno!" })
        }
    }
}