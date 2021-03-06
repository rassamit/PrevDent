import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    authenticate(creds : CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    successfulLogin(authorizationValue) {
        let tok = authorizationValue.token;
        let user : LocalUser = {
            token : tok,
            email: authorizationValue.email
        };
        this.storage.setLocalUser(user);
    }
    logout() {
        this.storage.setLocalUser(null);
    }
}