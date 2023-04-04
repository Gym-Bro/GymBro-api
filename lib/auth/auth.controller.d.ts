import { User } from 'src/models/user.model';
import { RegisterUserRequestDto } from './../modules/user/dto/register-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: Pick<User, 'email' | 'password'>): Promise<any>;
    register(registerUser: RegisterUserRequestDto, authHeader: string): Promise<import("../modules/user/entities/user.entity").User>;
}
