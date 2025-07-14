import { Router } from "express";
import { TextController } from "../controller/textController";
import verifyToken from "../middleware/auth";

const textController = new TextController();

const router = Router();

// Rota privada - exige autenticação 
router.get('/get-all/:userId', verifyToken, async (req, res) => {
    try {
        await textController.getAllTexts(req, res)
    } catch (err) {
        console.error("Erro em GET /get-all", err)
    }
})

// Rota pública - não exige autenticação
router.get('/get-by-tag/:tagId', async (req, res) => {
    try {
        await textController.getAllTextsByTagId(req, res)
    } catch (err) {
        console.error("Erro em GET /get-by-tag", err)
    }
})

// Rota protegida - exige autenticação
router.get('/get-by-user/:userId', verifyToken , async (req, res) => {
    try {
        await textController.getAllTextsByUserId(req, res)
    } catch (err) {
        console.error("Erro em GET /get-by-user", err)
    }
})

// Rota protegida - exige autenticação
router.post('/create-text', async (req, res) => {
    try {
        await textController.createText(req, res)
    } catch (err) {
        console.error("Erro em POST /create-text", err)
    }
})

export default router;