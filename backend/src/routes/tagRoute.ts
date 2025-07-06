import { Router } from "express";
import { TagController } from "../controller/tagController";

const tagController = new TagController();

const router = Router();

// Rota pública - não exige autenticação
router.get('/get-all', async (req, res) => {
    try {
        await tagController.getAllTags(req, res)
    }  catch (e) {
        console.error("Erro em GET /get-all", e)
    }
})

export default router;