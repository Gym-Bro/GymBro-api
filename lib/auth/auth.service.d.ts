import { FirebaseService } from './../firebase/firebase.service';
import { User } from './../models/user.model';
export declare class AuthService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    register(body: Omit<User, 'id'>): Promise<"agregado a la db" | "blabla">;
    login(email: string, password: string): Promise<void>;
}
