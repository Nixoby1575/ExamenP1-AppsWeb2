import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSecuencias(callback: (updatedCount: number, unchangedCount: number) => void) {
    const entidades = ['Paciente', 'TipoExamen', 'Resultado'];
    let updatedCount = 0;
    let unchangedCount = 0;

    for (const entidad of entidades) {
        let maxId = 0;

        switch (entidad) {
            case 'Paciente':
                maxId = (await prisma.paciente.findMany({
                    orderBy: { id: 'desc' },
                    take: 1,
                }))[0]?.id || 0;
                break;
            case 'TipoExamen':
                maxId = (await prisma.tipoExamen.findMany({
                    orderBy: { id: 'desc' },
                    take: 1,
                }))[0]?.id || 0;
                break;
            case 'Resultado':
                maxId = (await prisma.resultado.findMany({
                    orderBy: { id: 'desc' },
                    take: 1,
                }))[0]?.id || 0;
                break;
        }

        const secuencia = await prisma.secuencia.findUnique({
            where: { nombre: entidad },
        });

        if (secuencia && maxId > secuencia.secuencia) {
            await prisma.secuencia.update({
                where: { nombre: entidad },
                data: { secuencia: maxId },
            });
            updatedCount++;
        } else {
            unchangedCount++;
        }
    }

    callback(updatedCount, unchangedCount);
}

async function main() {
    try {
        await updateSecuencias((updatedCount, unchangedCount) => {
            console.log(`Secuencias actualizadas: ${updatedCount}`);
            console.log(`Secuencias sin cambios: ${unchangedCount}`);
        });
    } catch (error) {
        console.error('Error al actualizar secuencias:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
