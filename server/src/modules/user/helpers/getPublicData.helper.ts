import { User } from '../entities/user.entity';

export function getPublicData(user: User) {
  return {
    uid: user.uid,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    photoURL: user.photoURL,
    birth_date: user.birth_date,
    phone_number: user.phone_number,
  };
}

export function setUpdatedDate(user: User) {
  user.updated_date = new Date().toISOString();
  return user;
}
