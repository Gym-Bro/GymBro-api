import { CollectionReference } from 'firebase-admin/firestore';
import { HttpException, Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { User } from 'modules/user/entities/user.entity';
import { UpdateUserDto } from 'modules/user/dto/update-user.dto';
import { UserRepository } from 'modules/user/repositories/user.repository';

@Injectable()
export class UserFirebaseRepository implements UserRepository {
  private readonly userCollection: CollectionReference;

  constructor(private readonly firebaseService: FirebaseService) {
    this.userCollection = this.firebaseService.firestore.collection('users');
  }

  async read(uid: string): Promise<User> {
    try {
      const userDoc = await this.userCollection.doc(uid).get();
      if (userDoc.exists) {
        const user = Object.assign({}, userDoc.data() as User);
        return user;
      } else throw new HttpException('User not found', 404);
    } catch (error) {
      return error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const userDoc = await this.userCollection
        .where('email', '==', email)
        .get();
      if (!userDoc.empty) {
        const user = Object.assign({}, userDoc.docs[0].data() as User);
        return user;
      } else throw new HttpException('User not found', 404);
    } catch (error) {
      return error;
    }
  }

  async create(user: User): Promise<User> {
    try {
      const userObj = Object.assign({}, user);
      await this.userCollection.doc(user.uid).set(userObj);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(uid: string, user: User): Promise<User> {
    try {
      const result = await this.userCollection
        .doc(user.uid)
        .update({ ...user });
      const userResult = await this.userCollection.doc(uid).get();
      if (userResult.exists) {
        const userUpdated = Object.assign({}, userResult.data() as User);
        return userUpdated;
      } else throw new HttpException('User not found', 404);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async delete(uid: string): Promise<boolean> {
    const result = await this.userCollection.doc(uid).delete();
    if (result.writeTime) return true;
    return false;
  }
}
