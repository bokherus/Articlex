CREATE TABLE tbl_users(
  uid int primary key auto_increment;
  username varchar(30) not null,
  password varchar(100) not null,
  check (uid>=100000000)
);

CREATE TABLE tbl_articles(
  articleId int primary key auto_increment,
  authorId int not null,
  title varchar(255) not null,
  content longtext not null,
  createTime timestamp not null,
  FOREIGN KEY (authorId) REFERENCES tbl_users(uid),
  check (articleId>=100000000)
);

CREATE TABLE tbl_loves(
  articleId int not null,
  uid int not null,
  FOREIGN KEY(uid) REFERENCES tbl_users(uid),
  FOREIGN KEY(articleId) REFERENCES tbl_articles(articleId)
);
