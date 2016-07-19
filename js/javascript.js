/*
To fix:
-sanitize text
-limit drop box
-make example text
-clear all button
-deal with whitespace
-limit typing in drop down


Features:
-Allow for group copy and paste
-share button (slack)
*/
var example = ["Jim", "Bob", "Mary", "Sue"];
var members = example; //list of members
var groupSize = 2; //size of groups

//html elements
var drop; //for drop down menu
var el; //for text area
var button;

function execute() {
  removeOld(); //remove old list
  // print(); //for testing
  randomize();
  printRand();
}

//called on keyup in textarea
function input(e) {
  var lastkey, textEntered;

	textEntered = document.getElementById('message').value;
  separate(textEntered);
}

//removes child nodes from old list
function removeOld(){ //rename to clearList
  var old, children;

  old = document.getElementById("groupList");

  while(old.hasChildNodes()){
    old.removeChild(old.lastChild);
  }
}

//separates members
function separate(msg){
  var newMsg

  //if user enters a comma at end, remove it
  if(msg.charAt(msg.length-1) == ','){
    msg = msg.substring(0, msg.length - 1);
  }

  newMsg = msg.split(",");
  members = newMsg;
}


//called when drop down menu changes
function update(e){
  var msg;
  groupSize = document.getElementById("drop").value;
  // msg = document.getElementById("list");
  // msg.textContent = "Members: " + members.length;
}

//randomizes group members
function randomize(){
  var randomMembers = [];
  var tempMember, getRand, tempIndex; //getrand change to randomIndex
  var memberSize = members.length; //change memberSize to something else

  while(memberSize > 0){
    getRand = Math.floor(Math.random() * members.length);
    tempMember = members[getRand];
    randomMembers.push(tempMember);
    tempIndex = members.indexOf(tempMember);
    if(tempIndex >= 0){
      members.splice(tempIndex, 1);
    }
    memberSize--;
  }

  members = randomMembers;
}

//print randomized groups
function printRand(){ //change to printRandomizedList
  var group = 1;
  var msg;
  var size = members.length;
  var groupList;
  var newItemLast, newTextLast;

  groupList = document.getElementById("groupList");

  newItemLast = document.createElement("li");
  newTextLast = document.createTextNode("Group 1");
  // newItemLast.setAttribute("class", "cool");
  newItemLast.appendChild(newTextLast);

  groupList.appendChild(newItemLast);

  for(var i = 0; i < size; i++){
    newItemLast = document.createElement("li");
    newTextLast = document.createTextNode(members[i]);
    newItemLast.appendChild(newTextLast);

    groupList.appendChild(newItemLast);

    if(((i+1) % groupSize) == 0){
      if((i+1 != size && (i+2) != size)){
      group++;

      newItemLast = document.createElement("li");
      newTextLast = document.createTextNode("Group " + group);
      newItemLast.appendChild(newTextLast);

      groupList.appendChild(newItemLast);
      }
    }
  }
}

function clearTextArea(e){
  if(members == example){
  document.getElementById('message').value = "";
  }
}


el = document.getElementById("message");                   // Get msg element
el.addEventListener("keyup", input, false); // on keyup - call input()
el.addEventListener("click", clearTextArea, false);

drop = document.getElementById("drop");
drop.addEventListener("change", update, false);

button = document.getElementById("button");
button.addEventListener("click", execute, false);
