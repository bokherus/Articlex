# API calls
---

## GET /api/article/id/:id
 * get article.
 * replace :id with an article id (with full detail).

## GET /api/article/lastest
 * get lastest article posted.

## GET /api/loves/article/:articleId
 * get number of loves and who love the article.
 * replace :articleId with an article id to get details on who love the article.

## POST/DELETE /api/loves/aid/:articleId/uid/:userId
 * post to love, delete to undo the love.
 * replace :articleId with the article id and replace :userId with the id of user who love the article.

## POST /api/article/uid/:authorId
 * post an article.
 * this call needs to put tag "title",and "content" in the body.

## GET /api/comment/aid/:articleId
 * get comments of an article.

## POST /api/comment/aid/:articleId/commentorId/:commentorId
 * post comment to an article.
 * this call needs to put tag "comment" in the body.
