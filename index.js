    const firstView = document.querySelector(".first-page");
    const secondView = document.querySelector(".second-page");
    const gotoTaskBtn = document.querySelector(".goto-btn");
    const nameInput = document.querySelector("#input-name")
    const textParagraph = document.querySelector("p.text");
    const userName = document.querySelectorAll(".name");
    const date = document.querySelector(".date");
    const showTodoInputBtn = document.querySelector(".show-todo-btn");
    const closeBtn = document.querySelector(".close-btn");
    const time = document.querySelector(".time");
    const todoInput = document.querySelector(".todoInput");
    const todoContainer = document.querySelector(".todo-div");
    const errorDiv = document.querySelector(".error");
    const completedIndex = document.querySelector(".completed-index")
    const logout = document.querySelector("#logout");
    const addTodo = document.querySelector(".add-todo")
    const todoItems = document.querySelector(".todo-items")
    
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
                    changeTime()

                     
                };   
            });

            logout.addEventListener("click", function gotoFrontPage(){
                firstView.style.transform ="translatex(0%)"
               let inputCheck = document.getElementById("toggler");
               inputCheck.checked = false
                
            });

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
            };
            function changeTime(){
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
                
        
           showTodoInputBtn.addEventListener("click", ()=>{
                secondView.style.transform = "translatex(-100%)"
                document.querySelector(".show-todo-btn").style.position ="fixed"
                document.querySelector(".show-todo-btn").style.display ="none";    
            })
            
            closeBtn.addEventListener("click", ()=>{
                secondView.style.transform="translatex(0%)"
                document.querySelector(".show-todo-btn").style.display ="flex"
                errorDiv.style.display = "none"
            
            } )    
            
            window.addEventListener('touchstart', Touch)
            window.addEventListener('touchmove', Touch)
            //window.addEventListener('click', Touch);
            window.addEventListener('mousemove', Touch);
            window.addEventListener('mousedown', Touch);
            
            window.onerror = function(){
                return true;
            }
            
            function Touch(e){
                let x = e.changedTouches[0].clientX;
                let y = e.changedTouches[0].clientY;
                let circle = document.createElement('p');
            circle.setAttribute("class", "circle")
                
                circle.style.border = "12px solid blue";           
                circle.style.left = x+'px';
                circle.style.top = y + 'px';
                document.body.appendChild(circle);
                setTimeout(function(){
                    circle.remove();
                }, 1000)
            }

            let todos = [];
            let id = 0;
            let completed = "checked"
            let uncomplete = "unchecked";
            let todoList;
        
            // **** update the todo index and remove no task text ****//

           function updateTodoIndex(){
                const todoCount = document.querySelector('.todo-index') 
                todoCount.innerText = todoContainer.childElementCount;

                const completedTodo = document.querySelectorAll(".completed")
                const completedList = Array.from(completedTodo);
                const completedIndex = document.querySelector(".completed-index");
                completedIndex.innerText = completedList.length;
                

               if(todoContainer.childElementCount > 0){
                   document.querySelector(".no-task").style.display="none"
               }
               else{
                document.querySelector(".no-task").style.display="block"

               }
            }

            
            // create todo element
            function addElement(todo, id, check, trash){

                if(trash){return};
                CHECK = check ? completed : uncomplete

                let todoItems = document.createElement("div")
                todoItems.setAttribute("class", "todo-items")

               const input = document.createElement("input");
                input.setAttribute("type", "checkbox")
                input.setAttribute(CHECK, true);
                input.setAttribute("id", id)
                input.setAttribute("role", "completed")
                todoItems.appendChild(input);

                todoItems.innerHTML += `<small>${todo}</small><i id="${id}" role= "remove" class="fa fa-trash"></i>`

                todoContainer.prepend(todoItems);
            };
            
            
            addTodo.addEventListener("click", ()=>{
                addTodd()
            })
            document.addEventListener("keyup", (event)=>{
                if(event.keyCode == 13 ){
                    addTodd();
                }
            });

            function addTodd(){
                todo = todoInput.value;
             

                if(todo){
                    addElement(todo,id, false, false);

                    todos.unshift({
                        name : todo,
                        id: id,
                        check : false,
                        trash: false
                    })
                    id++;
                    todoList = localStorage.setItem("todos", JSON.stringify(todos))
                
                }
                if(todoInput.value !== ""){
                    secondView.style.transform ="translate(0%)"
                    document.querySelector(".show-todo-btn").style.display ="flex";

                } 
                todoInput.value ="";
                updateTodoIndex()
            };

            function completeTodo(element){
                element.setAttribute(completed, true);
                element.classList.toggle("completed")
                todos[element.id].check = todos[element.id].check ? false : true;
                
            }

            function removeTodo(element){
                element.parentNode.parentNode.removeChild(element.parentNode)
                todos[element.id].trash = true;
              
            }
            
            //remove element dynamically 

            todoContainer.addEventListener("click", (e)=>{
                let element = e.target;
                itemRole = element.attributes.role.value;
                
                if(itemRole == "completed"){
                    completeTodo(element);
                }
                if(itemRole == "remove"){
                    removeTodo(element)
                }
                localStorage.setItem("todos", JSON.stringify(todos))
                updateTodoIndex()
            })
        
            