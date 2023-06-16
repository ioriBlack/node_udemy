// import axios from "axios";

const tasksDOM = document.querySelector(".tasks");

// /api/v1/からタスクを読み込む
const showTasks = async () => {
  try {
    //自作apiを叩く
    const {data: tasks} = await axios.get("/api/v1/tasks");
    console.log(tasks);

    //タスクがない時
    if (tasks.length == 0) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクが存在しません</h5>`;
      return;
    }

    //タスクを読む
    //mapで一個ずつ取り出す forEachでもできる
    const allTasks = tasks.map((task) => {
      const { completed, _id, name } = task;

      return `
      <div class="single-task ${ completed && "task-completed"}">
        <h5><span><i class="afr fa-check-circle"></i></span>${name}</h5>
        <div class="task-links">
          <!-- 編集リンク -->
          <a href="edit.html?id=${ _id }" class="edit-link">
            <i class="fas fa-edit"></i>
          </a>
          <!-- ゴミ箱リンク -->
          <button type="button" class="delete-btn" data-id="${ _id }">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`
    }).join("");
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    console.log(error);
  }
}

showTasks();



const formAlertDOM = document.querySelector(".form-alert");

//ボタンを押したら新規作成

const formDOM = document.querySelector(".task-form");
//input name="name" を取得しそこに入力した値を取得
const taskInputDOM = document.querySelector(".task-input");

//submit = 投稿する
formDOM.addEventListener('submit', async (event) => {
  //ボタン押下によるリロードを阻止
  event.preventDefault();
  const name = taskInputDOM.value; //このブロックで定義しないとerror500になった
  try {
    //前者がschemaでセットしたデータ後者がinputに入力した値
    await axios.post("/api/v1/tasks", { name: name });
    showTasks(); //投稿したものを見れるようにする
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "タスクを追加しました";
    formAlertDOM.classList.add(".text-success");
  } catch (error) {
    console.log(error);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = "20文字以内に設定して下さい"
  }

  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove(".text-success");
  }, 3000);
});


//タスクを削除する
tasksDOM.addEventListener("click", async (event) => {
  const element = event.target; //clickした対象を取得
  //親要素に "delete-btn" というクラスが含まれる場合
  if (element.parentElement.classList.contains("delete-btn")) {
    const id = element.parentElement.dataset.id;
    console.log(id);
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks(); //リロードして見せてくれるって感じ

    } catch (error) {
      console.log(error);
    }
  }
});
