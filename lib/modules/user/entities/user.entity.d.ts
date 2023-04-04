import { RegisterUserRequestDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    constructor(registerUser: RegisterUserRequestDto);
}
export interface UserRepository {
    findById(uuid: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: any): Promise<User | null>;
    update(uuid: string, updateProductDto: UpdateUserDto): Promise<User | null>;
    delete(uuid: string): Promise<User | null>;
}
