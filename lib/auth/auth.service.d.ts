import { FirebaseService } from './../firebase/firebase.service';
export declare class AuthService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    register(body: any, idToken: any): Promise<any>;
    login(email: string, password: string): Promise<any>;
}
