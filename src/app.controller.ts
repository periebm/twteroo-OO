import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { AppService } from './app.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';
import { CreateTweetDto } from '../dtos/tweet.dto';
import { Tweet } from '../entities/tweet.entity';
//import { Tweet } from '../entities/tweet.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "I'm okay!";
  }

  @Get('users')
  getUsers(): User[] {
    return this.appService.getUsers();
  }

  @Post('sign-up')
  @HttpCode(200)
  createUser(@Body() body: CreateUserDto) {
    try {
      return this.appService.createUser(body);
    } catch (err) {
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('tweets')
  @HttpCode(201)
  createTweet(@Body() body: CreateTweetDto) {
    try {
      return this.appService.createTweet(body);
    } catch (err) {
      if (err.response === 'UNAUTHORIZED') {
        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('tweets')
  getTweet(@Query() page): Tweet[] {
    try {
      return this.appService.getTweets(page);
    } catch (err) {
      if (err.response === 'Informe uma página válida!') {
        throw new HttpException(
          'Informe uma página válida!',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('tweets/:username')
  getUserTweets(@Param('username') username: string) {
    return this.appService.getUserTweets(username);
  }

  /*

  @Get('tweets/:username') {

  }*/
}
// /  getTweet(@Query() page): Tweet[] {

/*

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params

    const filteredTweets = tweets
        .filter((tweet) => tweet.username === username)
        .map((tweet) => {
            const user = users.find((u) => u.username === tweet.username)
            return { ...tweet, avatar: user.avatar }
        })

    res.send(filteredTweets)
})

*/
