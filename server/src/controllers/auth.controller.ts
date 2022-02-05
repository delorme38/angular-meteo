import { hash } from 'bcrypt';
import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { token } from 'morgan';
import { Authentification } from '../../../common/authentification';
import { UserDTO } from '../../../common/user';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { MongodbService } from '../services/mongodb.service';
import { TYPES } from '../types';


@injectable()
export class AuthController {
    public constructor(@inject(TYPES.AuthService) private _authService: AuthService,
        @inject(TYPES.MongodbService) private _mongodbService: MongodbService) {
        //empty
    }

    public get router(): Router {

        const router: Router = Router();

        // -> /api/v1/auth/loggin
        router.post('/login', async (req: Request, res: Response) => {
            const auth: Authentification = req.body;
            let tokener: string;
            //TODO Trouver l'utilisateur dans la BD, si l'utilisateur est null retournez le code 403
            const user: User | null = await this._mongodbService.getUserByUsername(auth.username);
            if (!user) {
                console.log('erreur 1');
                res.status(403).send('Mauvais nom d\'utilisateur ou mot de passe');
            } else {
                if (user?.hash) {
                    if (await this._authService.isPasswordValid(auth.password, user?.hash)) {
                        tokener = this._authService.generateToken(user._id);
                        const retour: UserDTO = {
                            _id: user?._id,
                            token: tokener,
                            username: user.username
                        };
                        res.json(retour);
                    }
                } else {
                    console.log('erreur 2');
                    res.status(403).send('Mauvais nom d\'utilisateur ou mot de passe');
                }
            }
            //TODO Comparer le mot de passe de la BD avec le mot de passe de la requête, utiliser le auth.service
            //Retournez le code 403 au besoin

            // if(user)
            //     res.status(405).send('erreur'); 

            //TODO Générer le jeton de l'utilisateur à l'aide du service auth.service et assigner à l'utilisateur

            //TODO Retourner les informations de l'utilisateur sans le hash (voir interface UserDTO) 

        });

        // -> /api/v1/auth/signup
        router.post('/signup', async (req: Request, res: Response) => {
            //TODO Valider que l'utilisateur (username) n'est pas déjà dans la BD
            //Retounez un code 405 si déjà présent
            //TODO Chiffrer le mot de passe avec auth.service
            //TODO Ajouter l'utilisateur à la BD
            //Retounez un code 500 en cas de problème

            //TODO Générer le jeton de l'utilisateur à l'aide du service auth.service
            //TODO Retourner les informations de l'utilisateur sans le hash (voir interface UserDTO)
            const auth: Authentification = req.body;
            console.log('Signup new user');
            if (await this._mongodbService.getUserByUsername(auth.username)) {
                res.status(500).send('Utilisateur existe deja');
            }
            const hasher = await this._authService.encryptPassword(auth.password);
            const nvUser: User | null = await this._mongodbService.createUser(auth.username, hasher);
            if (nvUser !== null) {
                nvUser.hash = await this._authService.encryptPassword(auth.password);
                nvUser.token = this._authService.generateToken(nvUser?._id);
            } else {
                res.status(405).send('probleme lors de la creation de l\'utilisateur');
            }
            res.json(<UserDTO>nvUser);
        });

        return router;
    }

}