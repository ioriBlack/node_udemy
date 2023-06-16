import { Task } from "../models/Task.mjs";

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json(error);
  }
}
const createTasks = async (req, res) => {
  try {
    const createTasks = await Task.create(req.body);
    res.status(200).json(createTasks);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getSingleTask = async (req, res) => {
  try {
    const getSingleTask = await Task.findOne({ _id: req.params.id });
    if(!getSingleTask) { //数字が少ないとエラーになり、単に一致しないとnullになるだけなのでerrorを記述
      return res.status(404).json(`_id: ${req.params.id}は存在しません`);
    }
    res.status(200).json(getSingleTask);
  } catch (error) {
    res.status(500).json(error);
  }
}

const updateTasks = async (req, res) => {
    try {
      const updateTask = await Task.findOneAndUpdate(
        { _id: req.params.id }, //対象
        req.body, //update後の値
        {
          new: true //変更後の値を反映する
        }
      );
    if(!updateTask) {
      return res.status(404).json(`_id: ${req.params.id}は存在しません`);
    }
    res.status(200).json(updateTask);
  } catch (error) {
    res.status(500).json(error);
  }
}

const deleteTasks = async (req, res) => {
     try {
      const deleteTask = await Task.findOneAndDelete(
        { _id: req.params.id }, //対象
      );
    if(!deleteTask) {
      return res.status(404).json(`_id: ${req.params.id}は存在しません`);
    }
    res.status(200).json(deleteTask);
  } catch (error) {
    res.status(500).json(error);
  }
}

export {
  getAllTasks,
  createTasks,
  getSingleTask,
  updateTasks,
  deleteTasks
}
