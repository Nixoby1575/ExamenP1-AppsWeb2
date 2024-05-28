import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.secuencia.createMany({
        data: [
            { nombre: 'Paciente', secuencia: 0 },
            { nombre: 'TipoExamen', secuencia: 0 },
            { nombre: 'Resultado', secuencia: 0 },
        ],
        skipDuplicates: true, 
    });

    console.log('Secuencias inicializadas');

    const secuencias = await prisma.secuencia.findMany();
    console.log('Datos de la entidad Secuencia:', secuencias);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
