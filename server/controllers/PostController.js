import PostModel from "../models/Post.js";
import CategoryModel from "../models/Category.js";

export const create = async (req, res) => {
  try {
    const category = await CategoryModel.findOne(
      {
        id: req.body.category,
      },
      {
        _id: 1,
        __v: 0,
      }
    );
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      category: category,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
      videoUrl: req.body.videoUrl,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't create a post",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get posts",
    });
  }
};

export const getOne = (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Can't get post",
          });
          return;
        }
        if (!doc) {
          return res.status(404).json({
            message: "Post isn't found",
          });
        }
        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get post",
    });
  }
};

export const remove = (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (error, doc) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Can't delete the post",
          });
        }
        if (!doc) {
          console.log(error);
          res.status(500).json({
            message: "Can't get post",
          });
        }
        res.json({
          success: true,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get post",
    });
  }
};

export const update = (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't create a post",
    });
  }
};
