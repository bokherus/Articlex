CREATE TABLE tbl_users(
  uid int primary key auto_increment,
  username varchar(30) not null,
  password varchar(100) not null,
  check (uid>=1000000000)
);

CREATE TABLE tbl_articles(
  articleId int primary key auto_increment,
  authorId int not null,
  title varchar(255) not null,
  content longtext not null,
  createTime datetime not null,
  FOREIGN KEY (authorId) REFERENCES tbl_users(uid),
  check (articleId>=1000000000)
);

CREATE TABLE tbl_loves(
  articleId int not null,
  uid int not null,
  FOREIGN KEY(uid) REFERENCES tbl_users(uid),
  FOREIGN KEY(articleId) REFERENCES tbl_articles(articleId)
);

CREATE TABLE tbl_articlesImage(
  articleId int primary key,
  image varchar(255) not null,
  FOREIGN KEY(articleId) REFERENCES tbl_articles(articleId)
);

CREATE TABLE tbl_comments(
  commentId int primary key auto_increment,
  articleId int not null,
  commentorId int not null,
  comment longtext not null,
  createTime DATETIME not null,
  FOREIGN KEY(articleId) REFERENCES tbl_articles(articleId),
  FOREIGN KEY(commentorId) REFERENCES tbl_users(uid),
  check (commentId>=1000000000)
);

CREATE TABLE tbl_tags(
  tagName varchar(255) not null,
  articleId int not null,
  FOREIGN KEY(articleId) REFERENCES tbl_articles(articleId)
);

INSERT INTO tbl_users VALUES(1000000000, 'initialize', 'this is initialization of users table');

INSERT INTO tbl_articles VALUES(1000000000, 1000000000, 'initialization', 'this is initialization of article table', NOW());

INSERT INTO tbl_loves VALUES(1000000000, 1000000000);

INSERT INTO tbl_comments VALUES(1000000000, 1000000000, 1000000000, 'this is initialization of comments table', NOW());

INSERT INTO tbl_tags VALUES('initialize', 1000000000);
