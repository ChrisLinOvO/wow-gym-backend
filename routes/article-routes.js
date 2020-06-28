const express = require("express");

const {
  getArticleItems,
  getArticleItemById,
  getComments,
  getArticleItemByMemberId,
  getArticleItemByArticleId,
  getCommentsNumber,
  getHotData,
  getArticleItemByIdDel,
  postArticleAddComments,
  postArticleAdd,
  postArticleItemByIdUpdate,
  postArticeLikeUpdate,
} = require("../controllers/article-controllers");


const router = express.Router();

router.get("/", getArticleItems);
router.get("/:articleId", getArticleItemById);
router.get("/getComments/:articleId", getComments);
router.get("/member/:memberId", getArticleItemByMemberId);
router.get("/articleItem/:articleId", getArticleItemByArticleId);
router.get("/getCommentsNumber/:articleId", getCommentsNumber);
router.get("/getHotData/:articleId", getHotData);


router.post("/postComments/:articleId", postArticleAddComments);
router.post("/add", postArticleAdd);
router.post("/articlesUpdate/:articleId", postArticleItemByIdUpdate);
router.post("/postArticeLikeUpdate", postArticeLikeUpdate);

router.delete("/articlesEdit/:articleId", getArticleItemByIdDel);

module.exports = router;