import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getNextId } from '../utils/getNextId';

const prisma = new PrismaClient();

const pacientesController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const pacientes = await prisma.paciente.findMany({
                where: { estado: 'Activo' },
            });
            res.json(pacientes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener pacientes' });
        }
    },
    create: async (req: Request, res: Response) => {
        const { nombre, identificacion } = req.body;
        try {
            const id = await getNextId('Paciente');
            const nuevoPaciente = await prisma.paciente.create({
                data: {
                    id,
                    nombre,
                    identificacion,
                    estado: 'Activo',
                },
            });
            res.json(nuevoPaciente);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear paciente' });
        }
    },
    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nombre, identificacion } = req.body;
        try {
            const pacienteActualizado = await prisma.paciente.update({
                where: { id: Number(id) },
                data: { nombre, identificacion },
            });
            res.json(pacienteActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar paciente' });
        }
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const pacienteEliminado = await prisma.paciente.update({
                where: { id: Number(id) },
                data: { estado: 'Eliminado' },
            });
            res.json(pacienteEliminado);
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar paciente' });
        }
    },
    recover: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const pacienteRecuperado = await prisma.paciente.update({
                where: { id: Number(id) },
                data: { estado: 'Activo' },
            });
            res.json(pacienteRecuperado);
        } catch (error) {
            res.status(500).json({ error: 'Error al recuperar paciente' });
        }
    },
};

export default pacientesController;
