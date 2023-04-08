import { HttpException } from '@nestjs/common';
import { User } from '../modules/user/entities/user.entity';
import { UserService } from '../modules/user/user.service';
import { FirebaseService } from './../firebase/firebase.service';
import { RegisterUserRequestDto } from '../modules/user/dto/register-user.dto';
import { MailingService } from './../mailing/mailing.service';
export declare class AuthService {
    private readonly firebaseService;
    private readonly userService;
    private readonly mailingService;
    constructor(firebaseService: FirebaseService, userService: UserService, mailingService: MailingService);
    register(registerUser: RegisterUserRequestDto, idToken: any): Promise<Pick<User, 'first_name' | 'last_name' | 'email' | 'photo_url'> | HttpException>;
    login(email: string, password: string): Promise<any>;
}
