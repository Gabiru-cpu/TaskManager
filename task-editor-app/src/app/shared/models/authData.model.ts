import { UserModel } from "./user.model";

export class AuthDataModel {
    accessToken?:string;
    expiration?:string;
    currentUser?:UserModel;
}