import { RegisterUserRequestDto } from './../modules/user/dto/register-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: Pick<RegisterUserRequestDto, 'email' | 'password'>): Promise<any>;
    register(registerUser: RegisterUserRequestDto, authHeader: string): Promise<Pick<import("../modules/user/entities/user.entity").User, "first_name" | "last_name" | "email" | "photo_url"> | import("@nestjs/common").HttpException>;
}
