import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url).
    then(() => {
      console.log("データベースと接続中・・・");
    }).
    catch((err) => {
      console.log(err);
    });
}


export {
  connectDB
}
