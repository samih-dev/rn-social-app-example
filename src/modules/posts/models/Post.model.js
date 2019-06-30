import moment from 'moment-timezone';

export class PostModel {
  constructor({ username, body }) {
    this.dateCreated = moment()
      .utc()
      .toDate();

    this.username = username;
    this.body = body;
  }
}
