

var user = {
  table: 'tbl_users',
  column: {
    id: 'uid',
    username: 'username',
    password: 'password'
  }
};

var article = {
  table: 'tbl_articles',
  column: {
    id: 'articleId',
    title: 'title',
    content: 'content',
    image: 'image',
    authorId: 'authorId',
    time: 'createTime'
  }
};

module.exports = {
  User: user,
  Article: article
};
