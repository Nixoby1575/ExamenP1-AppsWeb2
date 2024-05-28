import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getNextId } from '../utils/getNextId';

const prisma = new PrismaClient();

const resultadosController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const resultados = await prisma.resultado.findMany({
                where: { estado: 'Activo' },
            });
            res.json(resultados);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener resultados' });
        }
    },
    create: async (req: Request, res: Response) => {
        const { idPaciente, idTipoExamen, resultado, valorPagado, observaciones } = req.body;
        try {
            const id = await getNextId('Resultado');
            const nuevoResultado = await prisma.resultado.create({
                data: {
                    id,
                    idPaciente,
                    idTipoExamen,
                    resultado,
                    valorPagado,
                    observaciones,
                    estado: 'Activo',
                },
            });
            res.json(nuevoResultado);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear resultado' });
        }
    },
    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { resultado, valorPagado, observaciones } = req.body;
        try {
            const resultadoActualizado = await prisma.resultado.update({
                where: { id: Number(id) },
                data: { resultado, valorPagado, observaciones },
            });
            res.json(resultadoActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar resultado' });
        }
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const resultadoEliminado = await prisma.resultado.update({
                where: { id: Number(id) },
                data: { estado: 'Eliminado' },
            });
            res.json(resultadoEliminado);
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar resultado' });
        }
    },
    recover: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const resultadoRecuperado = await prisma.resultado.update({
                where: { id: Number(id) },
                data: { estado: 'Activo' },
            });
            res.json(resultadoRecuperado);
        } catch (error) {
            res.status(500).json({ error: 'Error al recuperar resultado' });
        }
    },
};

export default resultadosController;
