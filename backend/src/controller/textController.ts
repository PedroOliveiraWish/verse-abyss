import { TextService } from "../service/textService";

import { Response, Request } from 'express';

const textService = new TextService();

export class TextController {

    // rota protegida - exige JWT
    async createText(req: Request, res: Response): Promise<Response> {
        const { tagId, titulo, conteudo } = req.body;

        const user = req.user;

        if (!user || typeof user === "string") {
            return res.status(400).json({ message: "Usuário não identificado no token" })
        }

        const userId = user.userId;

        try {
            const newTest = await textService.createText(userId, tagId, titulo, conteudo)

            if (!newTest) {
                return res.status(400).send({ message: "Não foi possível criar um text devido a um problema interno!" });
            }

            return res.status(200).send({ message: "Texto criado com sucesso", text: newTest });
        } catch (error) {
            return res.status(500).send({ message: "Erro interno do servidor" });
        }
    }

    // Rota pública - não exige autenticação
    async getAllTexts(req: Request, res: Response): Promise<Response> {
        try {
            const allTexts = await textService.getAllTexts();

            if (allTexts.length == 0) {
                return res.status(400).send({ message: "Não foi possível obter todos os textos devido a um erro interno!" })
            }

            return res.status(200).send({ message: "Textos obtidos com sucesso", texts: allTexts })
        } catch (error) {
            return res.status(500).send({ message: "Erro interno do servidor" });
        }
    }

    // Rota pública - não exige autenticação
    async getAllTextsByTagId(req: Request, res: Response): Promise<Response> {
        const { tagId } = req.params;

        try {
            const allTexts = await textService.getTextsByTagId(Number(tagId));

            if (allTexts.length === 0) {
                return res.status(400).send({ message: "Não foi possível obter todos os textos devido a um erro interno!" })
            }

            return res.status(200).send({ message: "Textos obtidos com sucesso", texts: allTexts })
        } catch (error) {
            return res.status(500).send({ message: "Erro interno do servidor" });
        }
    }

    // Rota protegida - exige autenticação 
    async getAllTextsByUserId(req: Request, res: Response): Promise<Response> {
        const user = req.user;

        if (!user || typeof user === "string") {
            return res.status(400).json({ message: "Usuário não identificado no token" })
        }

        const userId = user.userId;

        try {
            const allTexts = await textService.getAllTextsByUserId(Number(userId))
            if (!allTexts) {
                return res.status(400).send({ message: "Não foi possível obter todos os textos devido a um erro interno!" })
            }

            return res.status(200).send({ message: "Textos obtidos com sucesso", texts: allTexts })
        } catch (error) {
            return res.status(500).send({ message: "Erro interno do servidor" });
        }
    }
}