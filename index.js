const firstView = document.querySelector(".first-page");
const secondView = document.querySelector(".second-page");
const thirdView = document.querySelector(".third-page");
const gotoTaskBtn = document.querySelector(".goto-btn");
const nameInput = document.querySelector("#input-name")
const textParagraph = document.querySelector("p.text");
const userName = document.querySelectorAll(".name");
const date = document.querySelector(".date");
const showAddTodoInputBtn = document.querySelector(".show-todo-btn");
const closeBtn = document.querySelector(".close-btn");
const time = document.querySelector(".time");
const navlist = document.querySelector(".nav-list");
const todoInput = document.querySelector(".todoInput");
const todoContainer = document.querySelector(".todo-div");
const todoItems = document.querySelector("todo")
const errorDiv = document.querySelector(".error");
const completedIndex = document.querySelector(".completed-index")
 


//show error message
errorMessage = document.createElement("small")
        errorMessage.innerText ="Enter a new task"
        errorDiv.appendChild(errorMessage);
        errorDiv.style.display = "none"
        errorDiv.style.color="#dc3545"

//update ui and todo index
function updateTodoIndex(){
    let todoTask = todoContainer.children;
    todo = Array.from(todoTask);
    todoCount = document.querySelector(".todo-index");
    // todo length minus the no-task div
    todoCount.innerText =  todo.length - 1;

    completedTask =document.querySelectorAll(".completedTask");
    completedTodo = Array.from(completedTask)
    completedIndex.innerText = completedTodo.length;
    todoIndex = [...todo].map(myTodo =>{
        return todo.indexOf(myTodo)
    })
 
    localStorage.setItem("todoList",JSON.stringify (todoIndex))



    if(todo.length > 1){
        document.querySelector(".no-task").style.display="none"
    }
    else{
        document.querySelector(".no-task").style.display="block"

    }
 
    
}

function addTodo(){
    if(todoInput.value !== ""){
    
    let todoItems = document.createElement("div");
    todoItems.setAttribute("class", "todo-items");

    input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.classList.add("completed")
    todoItems.appendChild(input);

    todoText = document.createElement("small");
    todoItems.appendChild(todoText);

    deleteTodo = document.createElement("i");
    deleteTodo.classList.add("fa-trash")
    deleteTodo.classList.add("fa")
    todoItems.appendChild(deleteTodo);
    todoContainer.prepend(todoItems);
    todoText.innerText = todoInput.value;
     secondView.style.transform ="translatex(0)"
     if(todoText.innerText.length > 0){
         todoInput.value = "";
         updateTodoIndex()
     }

     document.querySelector(".show-todo-btn").style.display="flex"
     errorDiv.style.display ="none"
    }
    else{
        errorDiv.style.display ="block"
    }
}

todoContainer.addEventListener("click", (e)=>{

    item = e.target.parentElement;
    if(e.target.classList.contains("fa-trash")){
        item.remove();
    }
    if(e.target.checked == true){
        item.classList.add("completedTask");
        updateTodoIndex()
    }
    else{
        item.classList.remove("completedTask");
        updateTodoIndex()
    
    }


})

function gotoFrontPage(){
    firstView.style.transform ="translatex(0%)"
   let inputCheck = document.getElementById("toggler");
   inputCheck.checked = false
    
}


gotoTaskBtn.addEventListener("click", ()=>{
    if(nameInput.value == "" && nameInput.value.length < 3){
        textParagraph.innerText = "Enter your name"
        textParagraph.style.color = "orangered"
        textParagraph.style.backgroundColor = "whitesmoke"
    
    } else{
        firstView.style.transform = "translateX(100%)"
        userName.forEach(name =>{
            name.innerText = nameInput.value
            name.style.color ="#686973"
        })
        myDate()
        Time()
         
    };
    
})

//get date
function myDate(){
    let Month = ["January", "february", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
                ];
            
                for(i = 0; i < Month.length; i++){
            
    let d = new Date();
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    
    date.innerText = `${Month[month]} ${day}, ${year}`
    
                }
}

//show thirdview
showAddTodoInputBtn.addEventListener("click", ()=>{
    secondView.style.transform = "translatex(-100%)"
    document.querySelector(".show-todo-btn").style.position ="fixed"
    document.querySelector(".show-todo-btn").style.display ="none"


})


closeBtn.addEventListener("click", ()=>{
    secondView.style.transform="translatex(0%)"
    document.querySelector(".show-todo-btn").style.display ="flex"
    errorDiv.style.display = "none"

} )

//show time
function Time(){
let  dt = new Date();
 let hours = dt.getHours()
 if(hours < 12){
     time.innerText ="Good Morning"
     time.style.color="orangered"
 }
 else if(hours < 19 ){
     time.innerText = "Good Afternoon"
     time.style.color ="yellow"
 }
 else{
     time.innerText ="Good Evening"
     time.style.color="#f88400"
 }
}
updateTodoIndex()

window.addEventListener("touchstart", Touch);
window.addEventListener("touchmove", Touch);
window.addEventListener("mousedown", Touch);
window.addEventListener("mousemove", Touch);
window.addEventListener("mouseup",Touch)
window.addEventListener("mouseover",Touch)

window.onerror = function(){
    return true;
}

function Touch(e){
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;

    let circle = document.createElement("p");
    document.setAttribute("class", "circle");
    circle.style.border ="8px solid #007bff"

    circle.style.top = y + "px";
    circle.style.left = x + "px";
    document.body.appendChild(circle)

    setTimeout(()=>{
        circle.remove()
    }, 1000)
}