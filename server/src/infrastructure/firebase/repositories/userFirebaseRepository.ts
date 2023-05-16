import { CollectionReference } from 'firebase-admin/firestore';
import { HttpException, Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { User, UserRepository } from 'modules/user/entities/user.entity';
import { UpdateUserDto } from 'modules/user/dto/update-user.dto';
import { EmailResetDto } from 'modules/auth/dto/email-reset.dto';
import { createHash } from 'crypto';

@Injectable()
export class UserFirebaseRepository implements UserRepository {
  private readonly userCollection: CollectionReference;

  constructor(private readonly firebaseService: FirebaseService) {
    this.userCollection = this.firebaseService.firestore.collection('users');
  }

  async findById(
    uuid: string,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  > {
    try {
      const userDoc = await this.userCollection.doc(uuid).get();
      if (userDoc.exists) {
        const user = Object.assign({}, userDoc.data() as User);
        const { password, ...cleanUser } = user;
        return cleanUser;
      } else throw new HttpException('User not found', 404);
    } catch (error) {
      return error;
    }
  }

  async findByEmail(
    email: string,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  > {
    try {
      const userDoc = await this.userCollection.doc(email).get();
      if (userDoc.exists) {
        const user = Object.assign({}, userDoc.data() as User);
        const { password, ...cleanUser } = user;
        return cleanUser;
      } else throw new HttpException('User not found', 404);
    } catch (error) {
      return error;
    }
  }

  async create(
    user: User,
  ): Promise<Pick<
    User,
    'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'
  > | null> {
    try {
      const userObj = Object.assign({}, user);
      await this.userCollection.doc(user.email).set(userObj);
      const { password, ...cleanUser } = user;
      return cleanUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(
    email: string,
    user: UpdateUserDto,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  > {
    try {
      const result = await this.userCollection.doc(email).update({ ...user });
      console.log('result', result);
      const userResult = await this.userCollection.doc(email).get();
      if (userResult.exists) {
        const userUpdated = Object.assign({}, userResult.data() as User);
        const { password, ...cleanUser } = userUpdated;
        return cleanUser;
      } else throw new HttpException('User not found', 404);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async resetEmail(
    email: string,
    emailResetUser: EmailResetDto,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  > {
    try {
      const oldEmailUser = await Object.assign(
        {},
        (await this.userCollection.doc(email).get()).data() as User,
      );

      let newUserData = new User({
        ...oldEmailUser,
        email: emailResetUser.new_email,
      });

      if (emailResetUser.new_password) {
        newUserData = new User({
          ...newUserData,
          password: emailResetUser.new_password,
        });
      }

      await this.userCollection
        .doc(emailResetUser.new_email)
        .set(Object.assign({}, newUserData));

      await this.userCollection.doc(email).delete();

      const userResult = await this.userCollection
        .doc(emailResetUser.new_email)
        .get();

      if (userResult.exists) {
        const userUpdated = Object.assign({}, userResult.data() as User);
        const { password, ...cleanUser } = userUpdated;
        return cleanUser;
      } else throw new HttpException('User not found', 404);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async delete(uuid: string): Promise<User | null> {
    // await this.userCollection.doc(id).delete();
    console.log('delete in user repo!');
    return null;
  }

  async checkPassword(
    email: string,
    password: string,
  ): Promise<boolean | HttpException> {
    try {
      const user = Object.assign(
        {},
        (await this.userCollection.doc(email).get()).data() as User,
      );

      const hash = createHash('sha256').update(password).digest('hex');

      return user.password === hash;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
