import express from 'express';
import resultadosController from '../controllers/resultadosController';

const router = express.Router();

router.get('/', resultadosController.getAll);
router.post('/', resultadosController.create);
router.put('/:id', resultadosController.update);
router.delete('/:id', resultadosController.delete);
router.put('/recover/:id', resultadosController.recover);

export default router;
