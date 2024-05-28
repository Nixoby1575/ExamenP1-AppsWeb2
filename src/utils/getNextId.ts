import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getNextId(entidad: string): Promise<number> {
    const secuencia = await prisma.secuencia.findUnique({
        where: { nombre: entidad },
    });
    if (!secuencia) {
        throw new Error(`No se encontró la secuencia para la entidad ${entidad}`);
    }
    const nextId = secuencia.secuencia + 1;
    await prisma.secuencia.update({
        where: { nombre: entidad },
        data: { secuencia: nextId },
    });
    return nextId;
}
