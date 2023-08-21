import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private users: User[]; // persistencia em memoria

  constructor() {
    this.users = [
      new User(
        'naruto',
        'https://play-lh.googleusercontent.com/mVrfIXxFLMO7hb3IrY4YRwKRJyXAaJ3X7ST3Qs2VkCQezDRxx1AMCtTCVAYK5hHHKqQ',
      ),
      new User(
        'ed',
        'https://johto.legiaodosherois.com.br/wp-content/uploads/2022/06/legiao_1qFLnw3kdQlH.jpg',
      ),
      new User(
        'midoriya',
        'https://static.wikia.nocookie.net/universeconquest/images/9/9f/Deku_headshot_2.png/revision/latest?cb=20210325152110',
      ),
    ];
  }

  getUsers() {
    return this.users;
  }

  createUser(body: CreateUserDto) {
    return this.users.push(new User(body.username, body.avatar));
  }
}
