import express from 'express';
import pacientesController from '../controllers/pacientesController';

const router = express.Router();

router.get('/', pacientesController.getAll);
router.post('/', pacientesController.create);
router.put('/:id', pacientesController.update);
router.delete('/:id', pacientesController.delete);
router.put('/recover/:id', pacientesController.recover);

export default router;
