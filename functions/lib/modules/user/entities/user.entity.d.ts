import { IEntity } from '../../../utils/interfaces/IEntity';
import { RegisterUserRequestDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class User extends IEntity {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    photo_url: string;
    providerId: string;
    constructor(registerUser: RegisterUserRequestDto);
    private encryptPassword;
}
export interface UserRepository {
    findById(uuid: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<Pick<User, 'first_name' | 'last_name' | 'email' | 'photo_url'> | null>;
    update(uuid: string, updateProductDto: UpdateUserDto): Promise<User | null>;
    delete(uuid: string): Promise<User | null>;
}
