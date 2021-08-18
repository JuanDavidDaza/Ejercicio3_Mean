const Post = require("../models/post");
const savePost = async (req, res) => {
  if (!req.body.text || !req.body.hashtag)
    return res.status(400).send("Process failed: Incomplete data");

  const post = new Post({
    userId: req.user._id,
    text: req.body.text,
    hashtag: req.body.hashtag,
  });

  const result = await post.save();
  if (!result)
    return res.status(400).send("Process failed: Failed to register task");
  return res.status(200).send({ result });
};

const listPost = async (req, res) => {
  let post = await Post.find({ text: new RegExp(req.params["text"], "i") })
    .populate("userId")
    .exec();
  if (!post || post.length === 0)
    return res.status(400).send("Failed: No Posts");
  return res.status(200).send({ post });
};
module.exports = { savePost, listPost };
