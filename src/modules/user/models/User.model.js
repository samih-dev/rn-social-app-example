export class UserModel {
  constructor({ _id, username, friendsIds, posts }) {
    this.id = _id;
    this.username = username;
    this.friendsIds = friendsIds;
    this.posts = posts;
  }
}
