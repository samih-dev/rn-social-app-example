export class UserModel {
  constructor({ _id, username, friendsIds, posts, usersIdsWithRequest }) {
    this.id = _id;
    this.username = username || '';
    this.friendsIds = friendsIds || [];
    this.usersIdsWithRequest = usersIdsWithRequest;
    this.posts = posts || [];
  }
}
