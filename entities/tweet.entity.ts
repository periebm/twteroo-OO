import { User } from './user.entity';

export class Tweet {
  private username: User;
  private tweet: string;

  constructor(username: User, tweet: string) {
    this.username = username;
    this.tweet = tweet;
  }

  getUsername(): string {
    return this.username.getUsername();
  }

  getTweet(): string {
    return this.tweet;
  }

  toObject() {
    return {
      username: this.username.getUsername(),
      avatar: this.username.getAvatar(),
      tweet: this.tweet,
    };
  }
}
