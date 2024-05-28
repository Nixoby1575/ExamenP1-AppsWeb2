import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getNextId } from '../utils/getNextId';

const prisma = new PrismaClient();

const tipoExamenController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const tipoExamenes = await prisma.tipoExamen.findMany({
                where: { estado: 'Activo' },
            });
            res.json(tipoExamenes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener tipos de examen' });
        }
    },
    create: async (req: Request, res: Response) => {
        const { descripcion, indicaciones } = req.body;
        try {
            const id = await getNextId('TipoExamen');
            const nuevoTipoExamen = await prisma.tipoExamen.create({
                data: {
                    id,
                    descripcion,
                    indicaciones,
                    estado: 'Activo',
                },
            });
            res.json(nuevoTipoExamen);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear tipo de examen' });
        }
    },
    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { descripcion, indicaciones } = req.body;
        try {
            const tipoExamenActualizado = await prisma.tipoExamen.update({
                where: { id: Number(id) },
                data: { descripcion, indicaciones },
            });
            res.json(tipoExamenActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar tipo de examen' });
        }
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const tipoExamenEliminado = await prisma.tipoExamen.update({
                where: { id: Number(id) },
                data: { estado: 'Eliminado' },
            });
            res.json(tipoExamenEliminado);
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar tipo de examen' });
        }
    },
    recover: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const tipoExamenRecuperado = await prisma.tipoExamen.update({
                where: { id: Number(id) },
                data: { estado: 'Activo' },
            });
            res.json(tipoExamenRecuperado);
        } catch (error) {
            res.status(500).json({ error: 'Error al recuperar tipo de examen' });
        }
    },
};

export default tipoExamenController;
