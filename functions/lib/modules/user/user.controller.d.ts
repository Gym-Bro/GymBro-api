import { UserService } from './user.service';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(registerUser: RegisterUserRequestDto): Promise<Pick<import("./entities/user.entity").User, "email" | "first_name" | "last_name" | "photo_url">>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
