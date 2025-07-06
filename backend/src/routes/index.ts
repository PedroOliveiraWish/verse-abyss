import { Router } from "express";

import textRoutes from './textRoute';
import favoriteRoutes from './favoriteRoute'
import tagRoutes from './tagRoute'

const router = Router();


router.use('/texto', textRoutes);
router.use('/favorito', favoriteRoutes);
router.use('/tag', tagRoutes);

export default router;