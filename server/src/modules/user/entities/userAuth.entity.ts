import { IEntity } from 'utils/interfaces/IEntity';

export class UserAuth extends IEntity {
  email: string;
  password: string;
  providerData: string[];
}
