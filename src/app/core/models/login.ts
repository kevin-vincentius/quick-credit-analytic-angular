import { ILogin } from '../interfaces/i-login';

export class Login implements ILogin {
  userId: number = 0;
  password: string = '';
}
