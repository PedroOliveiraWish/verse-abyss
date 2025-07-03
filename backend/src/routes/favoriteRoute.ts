import { Router } from "express";
import { FavoriteController } from "../controller/favoriteController";

const favoriteController = new FavoriteController();

const router = Router();

router.get('/get-by-user/:userId', async (req, res) => {
    try {
        await favoriteController.getAllFavoriteByUserId(req, res)
    } catch (e) {
        console.error("Erro em GET /get-by-user", e)
    }
})

router.post('/create-favorite', async (req, res) => {
    try {
        await favoriteController.createFavorite(req, res)
    } catch (e) {
        console.error("Erro em POST /create-favorite", e)
    } 
})

export default router;