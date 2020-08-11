const task_form = document.querySelector(".form-task"),
    task_text = task_form.querySelector("#task_text"),
    pending_task_list = document.querySelector(".pending_task_list"),
    finished_task_list = document.querySelector(".finished_task_list");

// KEY VALUE
const PENDING_TASK_LS = "pending_task_object",
    FINISHED_TASK_LS = "finished_task_object";

let pending_task_obj_list = [],
    finished_task_obj_list = [];

// (공통화 메소드)Common part painting method
// paramenter explanation
// arg[0] arr : pending_task_obj_list = [] , finished_task_obj_list = []
// arg[1] spanTxt : Text in span tag.
// arg[2] fBtnTxt : Text in first button.
// arg[3] fBtnEvtFunc : first Button event function.
// arg[4] sBtnTxt : Text in second button.
// arg[5] sBtnEvtFunc : second Button event function.
// parent list : pending_task_list, finished_task_list
function paintCommonPartOfList(
    arr,
    spanTxt,
    fBtnTxt,
    fBtnEvtFunc,
    sBtnTxt,
    sBtnEvtFunc,
    parentList
) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const id = arr.length + 1;
    li.id = id;
    span.innerText = spanTxt + " ";
    li.appendChild(span);
    const firstBtn = document.createElement("button");
    firstBtn.addEventListener("click", fBtnEvtFunc);
    firstBtn.innerText = fBtnTxt;
    li.appendChild(firstBtn);
    const secondBtn = document.createElement("button");
    secondBtn.addEventListener("click", sBtnEvtFunc);
    secondBtn.innerText = sBtnTxt;
    li.appendChild(secondBtn);
    parentList.appendChild(li);
    const taskObj = { id, spanTxt };
    arr.push(taskObj);
    const LS_CONST =
        arr === pending_task_obj_list ? PENDING_TASK_LS : FINISHED_TASK_LS;
    saveTaskItem(LS_CONST, arr);
}

// Local Storage에 Task object 배열 저장하는 function
function saveTaskItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
// Pending Task List Item을 그리는 method
function paintPendingTaskListItem(text) {
    paintCommonPartOfList(
        pending_task_obj_list,
        text,
        "❌",
        delBtnClickEvent,
        "✔️",
        chkBtnClickEvent,
        pending_task_list
    );
}

// Finish Task List Item을 그리는 method
function paintFinishedTaskListItem(text) {
    paintCommonPartOfList(
        finished_task_obj_list,
        text,
        "❌",
        delBtnClickEvent,
        "🔙",
        pndBtnClickEvent,
        finished_task_list
    );
}

// (삭제 메소드 공통화 처리 - Pending/Finished Task List 내부 리스트 Item 삭제 메소드)
function delBtnClickEvent(event) {
    const li = event.target.parentNode;
    const list = li.parentNode.className;
    list === "pending_task_list" ?
        pending_task_list.removeChild(li) :
        finished_task_list.removeChild(li);
    let clean_task_obj_list = [];
    let arr =
        list === "pending_task_list" ?
        pending_task_obj_list :
        finished_task_obj_list;
    // filter method를 사용해서 지워진 child node list에 반영하기
    clean_task_obj_list = arr.filter(function(list) {
        return list.id !== parseInt(li.id);
    });

    list === "pending_task_list" ?
        (pending_task_obj_list = clean_task_obj_list) :
        (finished_task_obj_list = clean_task_obj_list);

    const LS_CONST =
        list === "pending_task_list" ? PENDING_TASK_LS : FINISHED_TASK_LS;

    saveTaskItem(
        LS_CONST,
        LS_CONST === PENDING_TASK_LS ?
        pending_task_obj_list :
        finished_task_obj_list
    );
}

// Pending Task List Item - check button click event method
function chkBtnClickEvent(event) {
    const spanText = event.target.parentNode.children[0].innerText;
    paintFinishedTaskListItem(spanText);
    // check button 클릭했을때도 삭제했을때와 똑같이 리스트와 LS에서 동시에 삭제처리를 해준다.
    delBtnClickEvent(event);
    saveTaskItem(PENDING_TASK_LS, pending_task_obj_list);
    saveTaskItem(FINISHED_TASK_LS, finished_task_obj_list);
}

// Finish Task List Item - pending button click event method
function pndBtnClickEvent(event) {
    const spanText = event.target.parentNode.children[0].innerText;
    paintPendingTaskListItem(spanText);
    console.log(spanText);
    // 리스트와 LS(Local Storage)에서 동시에 삭제처리를 해준다.
    delBtnClickEvent(event);
    saveTaskItem(PENDING_TASK_LS, pending_task_obj_list);
    saveTaskItem(FINISHED_TASK_LS, finished_task_obj_list);
}

// form tag "submit" event function
function taskFormEvent(event) {
    event.preventDefault();
    const task_input = task_text.value;
    paintPendingTaskListItem(task_input);
    task_text.value = "";
}

// Local Storage에 저장되어 있는 task object를 읽어서 화면에 뿌려주는 function
function loadTaskItem() {
    const loadPendingTaskData = localStorage.getItem(PENDING_TASK_LS);
    const loadFinishTaskData = localStorage.getItem(FINISHED_TASK_LS);

    if (loadPendingTaskData !== null) {
        const parsedPendingTaskData = JSON.parse(loadPendingTaskData);

        parsedPendingTaskData.forEach((data) => {
            paintPendingTaskListItem(data.spanTxt);
        });
    }

    if (loadFinishTaskData !== null) {
        const parsedFinishedData = JSON.parse(loadFinishTaskData);
        parsedFinishedData.forEach((data) => {
            paintFinishedTaskListItem(data.spanTxt);
        });
    }
}

// init() function
function init() {
    loadTaskItem();
    task_form.addEventListener("submit", taskFormEvent);
}

init();