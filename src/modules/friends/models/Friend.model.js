import moment from 'moment-timezone';

export class FriendModel {
  constructor({ id, username, askedDate, isApproved }) {
    this.id = id;
    this.username = username;
    this.askedDate = askedDate ? moment(askedDate).toDate() : undefined;
    this.isApproved = isApproved || false;
  }

  static createFromBeModel({ isApproved, user, requestDate }) {
    return new FriendModel({
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      isApproved,
      askedDate: requestDate,
      username: user.username,
    });
  }
}
