

var user = {
  table: 'tbl_users',
  column: {
    id: 'uid',
    username: 'username',
    password: 'password',
    fname: 'firstName',
    lname: 'lastName'
  }
};

var article = {
  table: 'tbl_articles',
  column: {
    id: 'articleId',
    title: 'title',
    content: 'content',
    authorId: 'authorId',
    time: 'createTime'
  }
};

var love = {
  table: 'tbl_loves',
  column: {
    uid : 'uid',
    aid : 'articleId'
  }
};

var comment = {
  table: 'tbl_comments',
  column: {
    commentId: 'commentId',
    aid: 'articleId',
    commentorId: ' commentorId',
    comment: 'comment',
    time: 'createTime'
  }
};

var tag = {
  table: 'tbl_follows',
  column: {
    tagName: 'tagName',
    aid: 'articleId'
  }
};

module.exports = {
  User: user,
  Article: article,
  Love: love,
  Comment: comment,
  Tag: tag
};
