import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: Pick<User, 'email' | 'password'>): Promise<void>;
    register(body: Omit<User, 'id'>): Promise<"agregado a la db" | "blabla">;
}
