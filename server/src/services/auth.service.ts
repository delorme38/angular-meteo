// eslint-disable-next-line @typescript-eslint/no-var-requires
import { injectable } from 'inversify';
import { environment } from '../env';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


@injectable()
/*
* Cette classe fait la gestion de l'authentification
*/
export class AuthService {
    constructor(){
        //empty
    }
    
    //Génère un jwt contenant l'id de l'utilisateur
    generateToken(userId: string): string{
        //On fait la génération d'un jeton unique
        return jwt.sign({_id:userId},environment.secret);
    }
    
    //Retourne le id de l'utilisateur
    decodeToken(token:string): string {
        const payload = jwt.verify(token, environment.secret);
        if(typeof payload !== 'string'){
            return payload._id;
        }
        throw new Error('Invalid payload type');
    }
    
    //Fait le chiffrement du mot de passe
    async encryptPassword(password: string): Promise<string>{
        //On chiffre le mot de passe en effectuant 10 rounds
        return bcrypt.hash(password,10);
    }
    
    //Fait la validation du mot de passe
    async isPasswordValid(password: string, hash: string): Promise<boolean>{
        //On compare le mot de passe chiffré et non chiffré
        return await bcrypt.compare(password, hash);
    }
}