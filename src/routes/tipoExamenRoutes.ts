import express from 'express';
import tipoExamenController from '../controllers/tipoExamenController';

const router = express.Router();

router.get('/', tipoExamenController.getAll);
router.post('/', tipoExamenController.create);
router.put('/:id', tipoExamenController.update);
router.delete('/:id', tipoExamenController.delete);
router.put('/recover/:id', tipoExamenController.recover);

export default router;
