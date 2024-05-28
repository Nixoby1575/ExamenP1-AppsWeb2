import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Insertar datos iniciales en la entidad Secuencia
    await prisma.secuencia.createMany({
        data: [
            { nombre: 'Paciente', secuencia: 0 },
            { nombre: 'TipoExamen', secuencia: 0 },
            { nombre: 'Resultado', secuencia: 0 },
        ],
        skipDuplicates: true, // Evita errores si ya existen los registros
    });

    console.log('Secuencias inicializadas');

    // Recuperar y mostrar los datos de la entidad Secuencia
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
