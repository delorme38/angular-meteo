/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { WeatherController } from './controllers/weather.controller';
import { AuthController } from './controllers/auth.controller';

@injectable()
export class Application {

    private readonly _internalError: number = 500;
    public app: express.Application;

    public constructor(@inject(TYPES.WeatherController) private _weatherController: WeatherController, @inject(TYPES.AuthController) private _authController: AuthController) {

        this.app = express();

        this.config();

        this.bindRoutes();
    }

    private config(): void {
        // Configuration des middlewares pour toutes les requêtes
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    public bindRoutes(): void {
        
        // Le weather controller se charge des routes /weather/*
        this.app.use('/api/v1/weather', this._weatherController.router);
        this.app.use('/api/v1/auth', this._authController.router);


        // En dernier lieu, on fait la gestion d'erreur 
        // si aucune route n'est trouvé
        this.errorHandeling();
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error('Not Found');
            next(err);
        });

        // Error handler en pour l'environnement de développement
        // Imprime le stacktrace
        if (this.app.get('env') === 'development') {
            this.app.use((err: any, req: express.Request, res: express.Response) => {
                res.status(err.status || this._internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // Error handler pour l'environnement de production
        this.app.use((err: any, req: express.Request, res: express.Response) => {
            res.status(err.status || this._internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}