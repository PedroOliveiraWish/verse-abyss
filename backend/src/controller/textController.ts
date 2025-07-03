import { TextService } from "../service/textService";

import { Response, Request } from 'express';

const textService = new TextService();

export class TextController {
    async createText(req: Request, res: Response): Promise<Response> {
        const { userId, tagId, titulo, conteudo } = req.body;

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

    async getAllTexts(req: Request, res: Response): Promise<Response> {
        try {
            const allTexts = await textService.getAllTexts();

            if (!allTexts) {
                return res.status(400).send({ message: "Não foi possível obter todos os textos devido a um erro interno!" })
            }

            return res.status(200).send({ message: "Textos obtidos com sucesso", texts: allTexts })
        } catch (error) {
            return res.status(500).send({ message: "Erro interno do servidor" });
        }
    }

    async getAllTextsByTagId(req: Request, res: Response): Promise<Response> {
        const { tagId } = req.params;

        try {
            const allTexts = await textService.getTextsByTagId(Number(tagId));

            if (!allTexts) {
                return res.status(400).send({ message: "Não foi possível obter todos os textos devido a um erro interno!" })
            }

            return res.status(200).send({ message: "Textos obtidos com sucesso", texts: allTexts })
        } catch (error) {
            return res.status(500).send({ message: "Erro interno do servidor" });
        }
    }

    async getAllTextsByUserId(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params;

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