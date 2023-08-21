import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';
import { Tweet } from '../entities/tweet.entity';
import { CreateTweetDto } from '../dtos/tweet.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private users: User[] = []; // persistencia em memoria
  private tweets: Tweet[] = []; // persistencia em memoria

  getUsers() {
    return this.users;
  }

  createUser(body: CreateUserDto) {
    return this.users.push(new User(body.username, body.avatar));
  }

  createTweet(body: CreateTweetDto) {
    const localUsers = this.getUsers();

    const user = localUsers.find((user) => user.isUsernameMatch(body.username));

    if (user == undefined) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return this.tweets.push(new Tweet(user, body.tweet));
  }

  getTweets(query): any[] {
    let page = Number(query.page);
    if (query.page !== undefined && (isNaN(page) || page <= 0)) {
      throw new HttpException(
        'Informe uma página válida!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isNaN(page)) {
      page = 1;
    }

    console.log(query.page);
    const tweetsPerPage = 15;
    const startIndex = (page - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;

    const slicedTweets = this.tweets.slice(startIndex, endIndex);

    return slicedTweets.map((tweet) => tweet.toObject());
  }

  getUserTweets(username: string): any[] {
    const user = this.findUserByUsername(username);

    if (!user) {
      return []; // Retorna um array vazio se o usuário não for encontrado
    }

    const userTweets = this.tweets.filter(
      (tweet) => tweet.getUsername() === username);

    return userTweets.map((tweet) => tweet.toObject());
  }

  private findUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.getUsername() === username);
  }
}
