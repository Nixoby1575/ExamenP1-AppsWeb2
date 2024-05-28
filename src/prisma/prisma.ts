import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
export declare namespace Prisma {
    export type Secuencia = {
      id: number
      nombre: string
      secuencia: number
    }
  }
  