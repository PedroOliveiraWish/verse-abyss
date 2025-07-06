import { Router } from "express";
import { FavoriteController } from "../controller/favoriteController";
import verifyToken from "../middleware/auth";

const favoriteController = new FavoriteController();

const router = Router();

// Rota protegida - exige autenticação
router.get('/get-by-user/:userId', verifyToken , async (req, res) => {
    try {
        await favoriteController.getAllFavoriteByUserId(req, res)
    } catch (e) {
        console.error("Erro em GET /get-by-user", e)
    }
})

// Rota protegida - exige autenticação
router.post('/create-favorite', verifyToken , async (req, res) => {
    try {
        await favoriteController.createFavorite(req, res)
    } catch (e) {
        console.error("Erro em POST /create-favorite", e)
    } 
})

export default router;