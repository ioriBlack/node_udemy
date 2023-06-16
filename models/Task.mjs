import mongoose from "mongoose";

const TakSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "タスク名を入れて下さい"],
    trim: true, //空白削除
    maxlength: [20, "タスク名は20文字以内に設定して下さい"]
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model("Task", TakSchema);

export {
  Task
}
