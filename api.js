//get element 
function getAllTodoItems(key) {
    //   debugger;

    if (localStorage.getItem(key) === null) {
        return [];
    }
    let todolist = JSON.parse(localStorage.getItem(key));
    return todolist;
}
//get max id 
function getmaxid(key) {
    let i = 0;
    let store = getAllTodoItems(key);
    if (store.length != 0 && localStorage.getItem(key) !== null) {
        let sub = store[store.length - 1];
        i = sub.id;
    }
    return i;

}
//Get element by id 
function getByid(key, id) {

    let theobj = {};
    let todos = getAllTodoItems(key);
    todos.forEach(element => {

        if (element.id == id) {
            theobj = element;
        }
    });
    return theobj;
}


// add task
function add(key, desc = Text, isComplet = Boolean) {
    let i = getmaxid() + 1;
    let store = getAllTodoItems(key);
    let obj = { id: i, description: desc, isCompleted: isComplet }
    user.tasks.push(obj)
    store.push(user);
    localStorage.setItem(key, JSON.stringify(user));

}
//update 
function update(key, id, description, isCompleted) {
    let todos = getAllTodoItems(key);
    todos.forEach(element => {
        if (element.id == id) {
            element.isCompleted = isCompleted;
            element.description = description;
            localStorage.removeItem(key);
            localStorage.setItem(key, JSON.stringify(todos));

        }
    });
}
//Delete 
function Delete(key, id) {
    let todos = getAllTodoItems(key);
    if (todos.length == 1) {
        todos = [];
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(todos));
    } else {
        todos.forEach(element => {
            if (element.id == id) {
                console.log(todos.indexOf(element));
                todos.splice(todos.indexOf(element), 1);
                localStorage.removeItem(key);
                localStorage.setItem(key, JSON.stringify(todos));

            }
        });
    }
};
//id for user 
function login_Id() {
    let loged = JSON.parse(localStorage.getItem('logeduser'));
    let id = loged[0].id;

    return id;
}


//signUp api 
function apiSignup(signUpobj) {
    let user = getAllTodoItems("users");
    let store = getAllTodoItems("does");
    let userID = "user" + signUpobj.id;
    let obj = {};
    obj[userID] = [];
    store.push(obj)
    localStorage.setItem("does", JSON.stringify(store))
    user.push(signUpobj);
    localStorage.setItem("users", JSON.stringify(user));
}
//find user 
function findUser() {
    let todos = getAllTodoItems("does");
    for (let i = 0; i < todos.length; i++) {
        val = Object.keys(todos[i]);
        if (val[0] == "user" + login_Id()) {
            return true;
        }
    }
    return false;
}
//Add task for specific user 
function userTask(userId, task) {

    let todos = getAllTodoItems("does");
    for (let i = 0; i < todos.length; i++) {
        val = Object.keys(todos[i]);
        if (val[0] === userId) {
            let j = 0;
            if (todos[i][userId].length != 0) {

                let sub = todos[i][userId][todos[i][userId].length - 1];
                j = sub.id;
            }
            let userObj = {
                id: j + 1,
                description: task,
                isComplet: false,
            }
            todos[i][userId].push(userObj);
            localStorage.removeItem("does")
            localStorage.setItem("does", JSON.stringify(todos))
            return j + 1;
        }
    }

}
// update for specific user 
function updateUser(userId, id, description, check) {
    let todos = getAllTodoItems("does");
    for (let i = 0; i < todos.length; i++) {
        val = Object.keys(todos[i]);
        if (val[0] === userId) {
            todos[i][userId].forEach(element => {
                if (element.id == id) {
                    element.isCompleted = check;
                    element.description = description;
                    localStorage.removeItem("does");
                    localStorage.setItem("does", JSON.stringify(todos));
                }
            })

        }

    }
}
//delete for user
function deleteIntoUser(userId, id) {

    let todos = getAllTodoItems("does");
    for (let i = 0; i < todos.length; i++) {
        val = Object.keys(todos[i]);
        if (val[0] === userId) {
            if (todos[i][userId].length == 1) {
                todos[i][userId] = [];
                localStorage.removeItem("does");
                localStorage.setItem("does", JSON.stringify(todos));
            } else {
                todos[i][userId].forEach(element => {
                    if (element.id == id) {
                        todos[i][userId].splice(todos[i][userId].indexOf(element), 1);
                        localStorage.removeItem("does");
                        localStorage.setItem("does", JSON.stringify(todos));

                    }
                });
            }

        }
    }
}
//get all elements for one user 
function getListForUser(userId) {
    let todos = getAllTodoItems("does");
    for (let i = 0; i < todos.length; i++) {
        val = Object.keys(todos[i]);
        if (val[0] === userId) {
            return todos[i][userId];
        }
    }
}
//get by id into user 
/**
 * 
 */
function getElemetUserByid(userId, id) {
    let theobj = {};
    let todos = getAllTodoItems("does");
    for (let i = 0; i < todos.length; i++) {
        val = Object.keys(todos[i]);
        if (val[0] === userId) {
            todos[i][userId].forEach(element => {

                if (element.id == id) {
                    console.log(element);
                    theobj = element;
                }
            });

        }

    }
    return theobj;

}