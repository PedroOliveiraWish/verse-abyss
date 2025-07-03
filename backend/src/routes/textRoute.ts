import { Router } from "express";
import { TextController } from "../controller/textController";

const textController = new TextController();

const router = Router();

router.get('/get-all', async (req, res) => {
    try {
        await textController.getAllTexts(req, res)
    } catch (err) {
        console.error("Erro em GET /get-all", err)
    }
})

router.get('/get-by-tag/:tagId', async (req, res) => {
    try {
        await textController.getAllTextsByTagId(req, res)
    } catch (err) {
        console.error("Erro em GET /get-by-tag", err)
    }
})

router.get('/get-by-user/:userId', async (req, res) => {
    try {
        await textController.getAllTextsByUserId(req, res)
    } catch (err) {
        console.error("Erro em GET /get-by-user", err)
    }
})

router.post('/create-text', async (req, res) => {
    try {
        await textController.createText(req, res)
    } catch (err) {
        console.error("Erro em POST /create-text", err)
    }
})

export default router;