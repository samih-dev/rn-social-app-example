import moment from 'moment-timezone';

export class PostModel {
  constructor({ _id, username, body, createdAt }) {
    this.id = _id;
    this.username = username;
    this.body = body;
    this.dateCreated = moment(createdAt).toDate();
  }

  static createFromBeModel({ _id, body, createdAt, author: { username } }) {
    return new PostModel({ _id, username, body, createdAt });
  }
}
