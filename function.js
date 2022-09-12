// get elements when load page
function getelement() {
    let todos = getListForUser("user" + login_Id());
    let decoration = '';
    todos.forEach(index => {
        decoration = '';
        if (index.isCompleted == true) {
            decoration = 'decoration';
        }
        $("#parent").append("<li id = '" + index.id + "' class = 'flex-container li " + decoration + "'>" + index.description +
            "<button class='listbtn1 push'><i class = 'fa-solid fa-check align-button'></i></button>" +
            "<button class = 'listbtn3'><a href='editpage.html?id=" + index.id + "'><i class = 'fa-solid fa-pen align-button edit'></i></a></button>" +
            "<button class =  'listbtn2'><i class = 'fa-regular fa-trash-can align-button'></i></li>")
    });
}
// add task 
function clickAddBtn() {
    $("#addbtn").click(function() {
        var task = $("#newtask").val();
        if (task == "") {
            alert("The task is empty please try again")
        } else {

            j = userTask("user" + login_Id(), task);
            $("#parent").append("<li id='" + j + "'class = 'flex-container li '>" + task +
                "<button class ='listbtn1 push'><i class = 'fa-solid fa-check align-button '></i></button>" +
                "<button class = 'listbtn3'><a href='editpage.html?id=" + j + "'><i class = 'fa-solid fa-pen edit align-button '></i></a></button>" +
                "<button class =  'listbtn2'><i class = 'fa-regular fa-trash-can align-button '></i></li>")
        }

    });
}
// check task
function checkBtn() {
    $("#parent").on('click', '.listbtn1', function() {
        $(this).parent('li').toggleClass("decoration");
        let checked = $(this).parent('li').hasClass("decoration");
        let id = $(this).parent('li').attr('id');
        let description = $(this).parent('li').text();
        updateUser("user" + login_Id(), id, description, checked);
    });
};
// delet task 
function deleteBtn() {
    $("#parent").on('click', '.listbtn2', function() {
        $(this).parent('li').fadeOut(300);
        let id = $(this).parent('li').attr('id');
        deleteIntoUser("user" + login_Id(), id);
    });
}

// edit page functions 
function findId() {
    const UrlParam = new URLSearchParams(window.location.search);
    let id = UrlParam.get('id');
    return id;
}
// for get id form url  
function ready() {

    let id = findId();
    console.log(login_Id())
    let target = getElemetUserByid("user" + login_Id(), id);
    const editor = document.getElementById('edit');
    editor.value = target.description;
}
//for update in edit page
function saveit() {
    $("#save").click(function() {

        let id = findId();
        let target = getElemetUserByid("user" + login_Id(), id);
        var newTask = $("#edit").val();
        updateUser("user" + login_Id(), id, newTask, target.isCompleted)
        window.location.href = "TodoPage.htm";
    })
};
// cancel button in edit page
function Cancel() {
    $("#cancel").click(function() {
        window.location.href = "TodoPage.htm"
    });
}

// sign up page 
function signUp() {
    $("#signUp").click(function() {
        let signUp = true;
        let user = getAllTodoItems("users");
        if (document.getElementById('fname').value == "" || document.getElementById('lname').value == "" || document.getElementById('mail').value == '' || document.getElementById('pass').value == "") {
            $("#warning-SignUp").text("Please Complete your information")
            $("#warning-SignUp").removeAttr('hidden')
            return;
        }
        if (document.getElementById('pass').value !== document.getElementById('confirm-pass').value) {
            $("#warning-SignUp").text("Please enter ther same password")
            $("#confirm-pass").addClass('border-warning')
            return;
        }

        user.forEach(element => {
            if (element.email === document.getElementById('mail').value) {
                $("#warning-email").removeAttr('hidden')
                $("#warning-SignUp").text("Please enter a correct email")
                $("#warning-SignUp").removeAttr('hidden')
                $("#mail").addClass('border-warning');
                signUp = false;
                return;

            }
        })
        if (signUp == true) {
            $("#warning-email").fadeOut()
            $("#warning-SignUp").fadeOut()
            $("#signUp-success").text("Sign up success")
            $("#signUp-success").removeAttr('hidden')
            $("#signUp-success").fadeOut(300);

            let signUpobj = {
                id: getmaxid('users') + 1,
                name: document.getElementById('fname').value,
                lastname: document.getElementById('lname').value,
                email: document.getElementById('mail').value,
                password: document.getElementById('pass').value
            }
            apiSignup(signUpobj);
            $('input').val('');
            window.location.href = 'login.html';
        }
    })
}
// function sign in 
function signIn() {
    $("#signIn").click(function() {
        let signIn = false;
        let user = getAllTodoItems("users");
        if (document.getElementById('enter-mail').value == "" || document.getElementById('enter-pass').value == "") {
            $("#alert-warning").text('Wrong ! email or password field was empty')
            $("#alert-warning").removeAttr('hidden');

            return;
        }
        user.forEach(element => {
            if (element.email === document.getElementById('enter-mail').value &&
                element.password === document.getElementById('enter-pass').value) {
                let store = [];
                let loged = { id: "" };
                loged.id = element.id;
                store.push(loged)
                localStorage.setItem('logeduser', JSON.stringify(store))
                signIn = true;
            }

        });
        if (signIn == true) {
            $("#alert-warning").fadeOut();
            $("#alert-signIn").removeAttr('hidden');
            $("#alert-signIn").fadeOut(300);
            window.location.href = "TodoPage.htm";

        } else {
            $("#alert-warning").text('The email or password incorrect ! if you dont have an account please Sign up')
            $("#alert-warning").removeAttr('hidden');

        }
    });
}
//function logout remove key 
function logout() {

    $(".remove").click(function() {

        localStorage.removeItem('logeduser');
        window.location.href = "login.html"
    })
}