import { CollectionReference } from 'firebase-admin/firestore';
import { HttpException, Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { User, UserRepository } from 'src/modules/user/entities/user.entity';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UUIDVersion } from 'class-validator';

@Injectable()
export class UserFirebaseRepository implements UserRepository {
  private readonly userCollection: CollectionReference;

  constructor(private readonly firebaseService: FirebaseService) {
    this.userCollection = this.firebaseService.firestore.collection('users');
  }

  async findById(
    uuid: string,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photo_url'>
    | HttpException
  > {
    try {
      const userDoc = await this.userCollection.doc(uuid).get();
      if (userDoc.exists) {
        const user = Object.assign({}, userDoc.data() as User);
        const { password, ...cleanUser } = user;
        console.log(cleanUser);
        return cleanUser;
      } else throw new HttpException('User not found', 404);
    } catch (error) {
      return error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    // const userQuery = await this.userCollection
    //   .where('email', '==', email)
    //   .get();
    // if (userQuery.empty) {
    //   return null;
    // }
    // return userQuery.docs[0].data() as User;
    console.log('findByEmail in user repo!');
    return null;
  }

  async create(
    user: User,
  ): Promise<Pick<
    User,
    'uuid' | 'first_name' | 'last_name' | 'email' | 'photo_url'
  > | null> {
    try {
      const userObj = Object.assign({}, user);
      await this.userCollection.doc(user.uuid).set(userObj);
      const { password, ...cleanUser } = user;
      return cleanUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(uuid: string, user: UpdateUserDto): Promise<User | null> {
    // await this.userCollection.doc(user.id).update(user);
    console.log('update in user repo!');
    return null;
  }

  async delete(uuid: string): Promise<User | null> {
    // await this.userCollection.doc(id).delete();
    console.log('delete in user repo!');
    return null;
  }
}
