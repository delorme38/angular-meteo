import { injectable } from 'inversify';
import { Collection, MongoClient } from 'mongodb';
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
        if (this._client != null) {
            this._client.connect();
            //Collection à utiliser
            this._collection = this._client.db('tp2').collection<User>('users');
            // this._meteo = this._client.db('tp2').collection<WttrObject>('meteo');
        }
    }

    //TODO Trouver l'utilisateur en fonction de son nom d'utilisateur
    //TODO Retourner l'utilisateur avec son _id
    //Retourne les informations d'un utilisateur à partir de son username
    async getUserByUsername(username: string): Promise<User | null> {
        const user: User | null = await this._collection.findOne({ username });
        return user;
    }


    //TODO Créer un utilisateur en fonction des information d'authentification
    //TODO Retourner le user créé avec son _id
    //Utilisez l'interface User
    //Fait la création d'un utilisateur dans la base de données
    async createUser(username: string, hash: string): Promise<User | null> {
        // const userLowCase = username.toLowerCase();

        const user = await this._collection.findOne({ username });
        if (!user) {
            await this._collection.insertOne({ username, hash });
            return this._collection.findOne({ username });
        }
        return null;



    }

    // async inserMeteo(location: string) {
    //     // await this._meteo.insertOne({location});

    // }

}

