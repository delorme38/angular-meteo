export interface WeatherProvider {
  //Retourne la météo d'une position (location)
  readWeather(location: string): Promise<JSON>;
  readWeathers(location: string[]): Promise<JSON[]>;
}

//Interface User pour le serveur et la BD
export interface User{
    //Identifiant unique de l'utilisateur
    _id?: any,
    //Mot de passe chiffré de l'utilisateur
    hash?: string
    //Jeton d'authentification de l'utilisateur
    token?: string
    //Username de l'utilisateur
    username: string,
}


//Permet d'ajouter des champs à la requête de express
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      //TODO au besoin, ajouter des champs au type Request de Express
      // Ces champs sont accessible depuis les middlewares
      locations: Array<string>,
      userId: string
    }
  }
}

