import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const secuenciaController = {
    showAll: async (req: Request, res: Response) => {
        try {
            const secuencias = await prisma.secuencia.findMany();
            console.log('Datos de la entidad Secuencia:', secuencias);
            res.json(secuencias);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener secuencias' });
        }
    },
};

export default secuenciaController;
