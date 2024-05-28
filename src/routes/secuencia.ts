import express from 'express';
import secuenciaController from '../controllers/secuenciaController';

const router = express.Router();

router.get('/', secuenciaController.showAll);

export default router;
