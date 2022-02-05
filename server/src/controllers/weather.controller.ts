import { Router, Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { WeatherProvider } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { TYPES } from '../types';
import { WttrObject } from '../../../common/weather';

@injectable()
export class WeatherController{
    public constructor(@inject(TYPES.WeatherService) private _weatherService: WeatherProvider,
                       @inject(TYPES.AuthService) private _authService: AuthService,
                        private _defaultLocation = 'Montreal'){}
    
    
    /*
    * Se charge de faire la validation du jeton des requêtes
    * qui demande de l'authentification
    */
    public authHandler = async(req:Request, res:Response, next:NextFunction) => {
        //On va chercher le bearer token envoyé par le client
        const token = req.header('Authorization')?.replace('Bearer ', '');
        try{
            const userId = this._authService.decodeToken(token ?? 'invalidtoken');
            req.userId = userId;
            console.log('Valid token');
            next();
        }
        catch(err){
            console.error('Invalid token');
            res.status(401).send();
        }
    };

    public get router() : Router {
        /*
        * Un Router est un regroupement isolé de middlewares.
        * Ce Router est associé à la route /weather.
        * https://expressjs.com/en/4x/api.html#router
        */
        const router: Router = Router();
        
        //Se charge de parser les locations de toutes les requêtes
        router.use((req:Request, res:Response, next: NextFunction) =>{
            let locationsString = req.query.locations;
            if(typeof locationsString !== 'string'){
                locationsString = this._defaultLocation;
            } 
            console.log('router.use', req.locations);
            //On conserve les locations dans la requête
            req.locations = locationsString.split(',');
            next();
        });
        
        // /api/v1/weather -> retourne la météo des locations
        router.get('/',this.authHandler,async (req:Request, res: Response) => {
            //TODO utilisez req.locations et _weatherService.readWeathers
            //pour retourner la météo
            console.log('router.get', req.locations);
            const data = await this._weatherService.readWeathers(req.locations);
            console.log(data);
            res.json(data);
        });
        
        return router;
    }

}