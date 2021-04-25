


const logintTemplate = document.getElementById("login").innerHTML;
const userProfileTemp = document.getElementById("userProfile").innerHTML;
const registerTemp = document.getElementById("register").innerHTML;
const containerEl = document.getElementById("container");
const msgBoxEl = document.getElementById("msgBox");
const msgBoxContainer = document.getElementById("msgBoxContainer");
let myStorage = window.localStorage;




function startpage(){
    containerEl.innerHTML = "";
    containerEl.innerHTML = logintTemplate;
}
    
function userPage(username, sub){
    containerEl.innerHTML = userProfileTemp;
    document.getElementById("profileName").innerText = username;
    if(sub == "true"){
        document.getElementById("subBtn").innerText = "Unsubscribe";
    }
    else{
        document.getElementById("subBtn").innerText = "Subscribe";
    }
}

function register(){
    containerEl.innerHTML = "";
    containerEl.innerHTML = registerTemp;
}

function makeMsg(color, message){
    msgBoxContainer.style.display = "block";
    msgBoxContainer.style.borderColor = color;
    msgBoxContainer.classList.add("slideUp");
    msgBoxEl.innerHTML = message;
    msgBoxContainer.addEventListener("click", function()
    {msgBoxContainer.style.display = "none";
     msgBoxContainer.classList.remove("slideUp");
        }, false);
}

function login(){
    let user = document.getElementById("usename").value;
    let pass = document.getElementById("pass").value;
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(function(data){
      for (let index = 0; index < data.length; index++) {
          if(data[index].userName == user && data[index].userPassword == pass){
              console.log("loggind in", data[index]);
              myStorage.setItem("userName",data[index].userName);
              myStorage.setItem("subStatus",data[index].subscribed);
              userPage(data[index].userName,data[index].subscribed);
              return
          }
      }
      makeMsg("#db3434","Pleas enter the right username and password");
    });
}


function subSwitch(s){
    console.log("lol");
    if(s == true || s == "true"){return "true"}
    else{return "false"}
}


function newUser(){
    
    user = {
        userName:document.getElementById("userNsignup").value,
        userPassword:document.getElementById("userPsingup").value,
        subscribed:subSwitch(document.getElementById("subscribed").checked),
        randomKey:null
    }
    fetch("http://localhost:3000/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
    .then(function(msg){makeMsg(msg.color, msg.message)})
}

function updatesub(){
    console.log(myStorage.getItem("userName"));
    username = {name:myStorage.getItem("userName"),
                status:myStorage.getItem("subStatus")};
    fetch("http://localhost:3000/updatesub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(username)
    })
 
    subUiUpdate()

}

function logOut() {
    myStorage.clear();
    startpage();
}
function subUiUpdate() {
    if (myStorage.getItem("subStatus") == "true") {
        myStorage.setItem("subStatus","false");
        document.getElementById("subBtn").innerText = "Subscribe";
        return
    }
    else if(myStorage.getItem("subStatus") == "false"){
        myStorage.setItem("subStatus","true");
        document.getElementById("subBtn").innerText = "Unsubscribe";
        return
    }
}


if (myStorage.getItem("userName")){
    userPage(myStorage.getItem("userName"),myStorage.getItem("subStatus"));
}
else{startpage();}


