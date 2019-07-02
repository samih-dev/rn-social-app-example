export class FriendModel {
  constructor({ username, askedDate, isApproved }) {
    this.username = username;
    this.askedDate = askedDate;
    this.isApproved = isApproved || false;
  }

  static createFromBeModel({ isApproved, user, requestDate }) {
    return new FriendModel({ isApproved, askedDate: requestDate, username: user.username });
  }
}
