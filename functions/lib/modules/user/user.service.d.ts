import { UserFirebaseRepository } from '../../firebase/repositories/userFirebaseRepository';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserFirebaseRepository);
    create(registerUser: RegisterUserRequestDto): Promise<Pick<User, 'first_name' | 'last_name' | 'email' | 'photo_url'> | null>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
