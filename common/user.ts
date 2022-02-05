//Data transfert object pour l'utilisateur
export interface UserDTO{
    //Identifiant unique de l'utilisateur
    _id?: any,
    //Jeton d'authentification de l'utilisateur
    token?: string
    //Username de l'utilisateur
    username: string,
}