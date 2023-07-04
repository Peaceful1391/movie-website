import CategoryModel from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const id = await CategoryModel.countDocuments({});
    const doc = new CategoryModel({
      title: req.body.title,
      id: id + 1,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't create a category",
    });
  }
};
export const getCategories = async (req, res) => {
  try {
    const docs = await CategoryModel.find({}, { _id: 0 });
    res.json(docs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't create a category",
    });
  }
};
