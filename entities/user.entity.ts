export class User {
  private username: string;
  private avatar: string;

  constructor(username: string, avatar: string) {
    this.username = username;
    this.avatar = avatar;
  }
  getUsername(): string {
    return this.username;
  }

  getAvatar(): string {
    return this.avatar;
  }

  isUsernameMatch(targetUsername: string): boolean {
    if (this.username === targetUsername) {
      return this.username === targetUsername;
    }
    return false;
  }
}
