import { injectable } from 'inversify';
import { Collection, MongoClient } from 'mongodb';
import { WttrObject } from '../../../common/weather';
import { User } from '../interfaces';

const url = 'mongodb://127.0.0.1:27017';

@injectable()
/*
* Cette classe s'occupe des communications avec MongoDB
*/
export class MongodbService {

    private _client: MongoClient = new MongoClient(url);
    private _collection: Collection<User>;
    // private _meteo: Collection<WttrObject>;

    constructor() {
        //Pourrait causer des problèmes en production
        this._client.connect();
        //Collection à utiliser
        this._collection = this._client.db('tp2').collection<User>('users');
        // this._meteo = this._client.db('tp2').collection<WttrObject>('meteo');
    }

    //Retourne les informations d'un utilisateur à partir de son username
    async getUserByUsername(username: string): Promise<User | null> {

        //TODO Trouver l'utilisateur en fonction de son nom d'utilisateur
        //TODO Retourner l'utilisateur avec son _id
        const user: User | null = await this._collection.findOne({ username });
        return user;


    }

    //Fait la création d'un utilisateur dans la base de données
    async createUser(username: string, hash: string): Promise<User | null> {
        console.log('essaie de creation');
        //TODO Créer un utilisateur en fonction des information d'authentification
        //Utilisez l'interface User
        const user = await this._collection.findOne({ username });
        if(!user){
            await this._collection.insertOne({ username, hash });
            console.log('utilisateur creer');
            return this._collection.findOne({ username });
        }
        return null;
        

        //TODO Retourner le user créé avec son _id
    }

    // async inserMeteo(location: string) {
    //     // await this._meteo.insertOne({location});

    // }

}

