import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';

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


  
  /*
    {

  }

   @Get('tweets') {

  }

  @Get('tweets/:username') {

  }*/
}

/*
const tweets = []   // { username: "bobesponja", tweet: "Oi tudo bom?" }

// Funções (endpoints)
app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body

    if (!username || typeof username !== "string" || !avatar || typeof avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    users.push({ username, avatar })
    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const { tweet } = req.body
    const { user } = req.headers

    if (!user || typeof user !== "string" || !tweet || typeof tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    // find => retornar undefined se não achar OU o objeto do usuário se achar
    const userExists = users.find((u) => u.username === user)

    if (!userExists) return res.status(401).send("UNAUTHORIZED")

    tweets.push({ username: user, tweet })
    res.status(201).send("OK")
})

app.get("/tweets", (req, res) => {
    const page = Number(req.query.page)

    if (req.query.page && (isNaN(page) || page < 1)) {
        return res.status(400).send("Informe uma página válida!")
    }

    const completeTweets = tweets.map((tweet) => {
        const user = users.find((u) => u.username === tweet.username)
        return { ...tweet, avatar: user.avatar }
    })

    if (page) {
        const limit = 10
        const start = (page - 1) * limit
        const end = page * limit

        return res.send(completeTweets.slice(start, end))
    }

    res.send(completeTweets.slice(-10))
})

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
