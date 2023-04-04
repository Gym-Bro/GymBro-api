import { UserRepository, User } from '../../modules/user/entities/user.entity';
import { FirebaseService } from '../firebase.service';
import { UpdateUserDto } from './../../modules/user/dto/update-user.dto';
export declare class UserFirebaseRepository implements UserRepository {
    private readonly firebaseService;
    private readonly userCollection;
    constructor(firebaseService: FirebaseService);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: any): Promise<User | null>;
    update(uuid: string, user: UpdateUserDto): Promise<User | null>;
    delete(uuid: string): Promise<User | null>;
}
