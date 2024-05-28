import express from 'express';
import bodyParser from 'body-parser';
import pacientesRoutes from './routes/pacientesRoutes';
import tipoExamenRoutes from './routes/tipoExamenRoutes';
import resultadosRoutes from './routes/resultadosRoutes';
import secuenciaRoutes from './routes/secuenciaRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/pacientes', pacientesRoutes);
app.use('/tipoexamen', tipoExamenRoutes);
app.use('/resultados', resultadosRoutes);
app.use('/secuenciaRoutes', secuenciaRoutes);

// Manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
