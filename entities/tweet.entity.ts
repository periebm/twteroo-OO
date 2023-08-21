import { User } from './user.entity';

export class tweet {
  private username: User;
  private email: string;

  constructor(username: User, email: string) {
    this.username = username;
    this.email = email;
  }
}
