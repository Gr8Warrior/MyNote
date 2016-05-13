"use strict"; 
// Function to add Note


//global objet to call methods on load as required
var toDos ={};

//IIFE
(function(){

    toDos.addNote = function(){
    "use strict"
    var title = $('#Title').val();
    var content = $('#Content').val();
    if(title == ""){
        alert("Please Fill all fields");
        return;
    }
    $('#Title').val('');
    $('#Content').val('');
    var todoList= toDos.getActiveTasksList();
    var dt = new Date();
var time = dt.getYear()+""+dt.getHours()+"" + dt.getMinutes() + "" + dt.getSeconds();
    
    var task_Object = {'id':time,'title':title,'content':content,'timestamp':new Date()};
    todoList.push(task_Object);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    toDos.display();
}

//get Notes array from localstorage
 toDos.getActiveTasksList =  function (){
    var todos = new Array;
    var todoList = localStorage.getItem('todoList');
    if (todoList !== null) {
        todos = JSON.parse(todoList);
    }
    return todos;
}

//display the notes in the UI
toDos.display =  function (){
    var todos= toDos.getActiveTasksList();
    $( ".row " ).empty();
    for(var i=0; i< todos.length; i++){
     $('.row').prepend($('<div style="border-style: groove;" id='+todos[i].id+'  class="col-md-4" >  <h2>'+todos[i].title+'</h2><textarea disabled id='+todos[i].id+' rows="4" cols="45" placeholder="" style="background-color: white;font-style: italic;border-style: none;">'+todos[i].content+'</textarea><br><text>'+todos[i].timestamp+'</text> <input type="button" value="Edit" id='+todos[i].id+' class="edit" onclick="toDos.editReminder(this.id)" /> <input type="button" class="delete" value="Delete" id='+todos[i].id+' onclick="toDos.deleteNote(this.id)" />  </div>'));
    }  
}

//Delete Note
toDos.deleteNote = function (id){
    var todoList= toDos.getActiveTasksList();
    var trashList = toDos.getTrashTasksList();
    
    for(var i=0; i< todoList.length; i++){
        if(todoList[i].id == id) {
            var trashItem = todoList[i];
         trashList.push(trashItem);
         todoList.splice(i,1);
         localStorage.setItem('trashList', JSON.stringify(trashList));
         localStorage.setItem('todoList', JSON.stringify(todoList));
         $("#" + id).remove();
         toDos.display();
         return;
        }
    }
    
}

//Delete Permanently Note from trash 
toDos.deleteForever = function (id){
    var trashList = toDos.getTrashTasksList();
   
    for(var i=0; i< trashList.length; i++){
        if(trashList[i].id == id) {
            var trashItem = trashList[i];
         trashList.splice(i,1);
         localStorage.setItem('trashList', JSON.stringify(trashList));
         $("#" + id).remove();
         toDos.displayTrash();
         return;
        }
    }
    
}

//Get the trash array from local
toDos.getTrashTasksList = function (){
    var trash = new Array;
    var trashList = localStorage.getItem('trashList');
    $("#trash").attr("value","Hide Trash");
    $("#trash").attr("onclick","hideTrash()");
    
    if (trashList !== null) {
        trash = JSON.parse(trashList);
    }
    return trash;
}


//Display trash to UI
toDos.displayTrash = function (){
    var todos= toDos.getTrashTasksList();
    $( ".trash " ).empty();
     for(var i=0; i< todos.length; i++){
     $('.trash').prepend($('<div style="border-style: groove;" id='+todos[i].id+'  class="col-md-4" >  <h2>'+todos[i].title+'</h2><textarea id='+todos[i].id+' disabled rows="4" cols="45" placeholder="" style="background-color: white;font-style: italic;border-style: none;">'+todos[i].content+'</textarea><br><text>'+todos[i].timestamp+'</text> <input type="button" value="Restore" id='+todos[i].id+' class="restore" onclick="toDos.restore(this.id)" /> <input type="button" class="delete" value="ThrowIt!!" id='+todos[i].id+' onclick="toDos.deleteForever(this.id)" />  </div>'))     ;
    }    
}

//Restore the trash data from the local to active note list
toDos.restore = function (id){
    var trash = new Array;
    var todos = new Array;
    var todoList = toDos.getActiveTasksList();
    var trashList = toDos.getTrashTasksList();
    for(var i=0; i<trashList.length;i++){
        if(trashList[i].id==id){
            var trashItem = trashList[i];
            todoList.push(trashItem);
            trashList.splice(i,1);
            localStorage.setItem('trashList', JSON.stringify(trashList));;
         localStorage.setItem('todoList', JSON.stringify(todoList));
            toDos.display();
            toDos.displayTrash();
         return;
        }
    }
    
}


//edit the notes
 toDos.editReminder = function (id) {
     var updatedVal = $("#"+id).find("textarea#" + id).val();
     $('#'+id).find('textarea').prop('disabled',false);
    $("#"+id).find(".edit").prop('value',"Save");
    console.log($("#"+id).find(".edit"));
    $("#"+id).find(".edit").attr("onclick","toDos.update(this.id)");
    
}

//save the updated note
toDos.update = function (id){
    
    $("#"+id).find(".edit").prop('value',"Edit");
    $("#"+id).find(".edit").attr("onclick","toDos.editReminder(this.id)");
    
   // <!-- Search -->
var updatedVal = $("#"+id).find("textarea#" + id).val();

$("#"+id).find("textarea#" + id).prop('disabled', true);

        var todoList= toDos.getActiveTasksList()   ;  
    for(var i=0; i< todoList.length; i++){
     if(todoList[i].id == id){
         todoList[i].content = updatedVal;
 localStorage.setItem("todoList",JSON.stringify(todoList));
         break;
     }   
    }

}
    
}());

toDos.display();
//function addNote(){
//    "use strict"
//    var title = $('#Title').val();
//    var content = $('#Content').val();
//    if(title == ""){
//        alert("Please Fill all fields");
//        return;
//    }
//    $('#Title').val('');
//    $('#Content').val('');
//    var todoList= getActiveTasksList();
//    var dt = new Date();
//var time = dt.getYear()+""+dt.getHours()+"" + dt.getMinutes() + "" + dt.getSeconds();
//    
//    var task_Object = {'id':time,'title':title,'content':content,'timestamp':new Date()};
//    todoList.push(task_Object);
//    localStorage.setItem('todoList', JSON.stringify(todoList));
//    display();
//}
//
////get Notes array from localstorage
//function getActiveTasksList(){
//    var todos = new Array;
//    var todoList = localStorage.getItem('todoList');
//    if (todoList !== null) {
//        todos = JSON.parse(todoList);
//    }
//    return todos;
//}
//
////display the notes in the UI
//function display(){
//    var todos= getActiveTasksList();
//    $( ".row " ).empty();
//    for(var i=0; i< todos.length; i++){
//     $('.row').prepend($('<div style="border-style: groove;" id='+todos[i].id+'  class="col-md-4" >  <h2>'+todos[i].title+'</h2><textarea disabled id='+todos[i].id+' rows="4" cols="45" placeholder="" style="background-color: white;font-style: italic;border-style: none;">'+todos[i].content+'</textarea><br><text>'+todos[i].timestamp+'</text> <input type="button" value="Edit" id='+todos[i].id+' class="edit" onclick="editReminder(this.id)" /> <input type="button" class="delete" value="Delete" id='+todos[i].id+' onclick="deleteNote(this.id)" />  </div>'));
//    }  
//}
//
////Delete Note
//function deleteNote(id){
//    var todoList= getActiveTasksList();
//    var trashList = getTrashTasksList();
//    
//    for(var i=0; i< todoList.length; i++){
//        if(todoList[i].id == id) {
//            var trashItem = todoList[i];
//         trashList.push(trashItem);
//         todoList.splice(i,1);
//         localStorage.setItem('trashList', JSON.stringify(trashList));
//         localStorage.setItem('todoList', JSON.stringify(todoList));
//         $("#" + id).remove();
//         display();
//         return;
//        }
//    }
//    
//}
//
////Delete Permanently Note from trash 
//function deleteForever(id){
//    var trashList = getTrashTasksList();
//   
//    for(var i=0; i< trashList.length; i++){
//        if(trashList[i].id == id) {
//            var trashItem = trashList[i];
//         trashList.splice(i,1);
//         localStorage.setItem('trashList', JSON.stringify(trashList));
//         $("#" + id).remove();
//         displayTrash();
//         return;
//        }
//    }
//    
//}
//
////Get the trash array from local
//function getTrashTasksList(){
//    var trash = new Array;
//    var trashList = localStorage.getItem('trashList');
//    $("#trash").attr("value","Hide Trash");
//    $("#trash").attr("onclick","hideTrash()");
//    
//    if (trashList !== null) {
//        trash = JSON.parse(trashList);
//    }
//    return trash;
//}
//
//
////Display trash to UI
//function displayTrash(){
//    var todos= getTrashTasksList();
//    $( ".trash " ).empty();
//     for(var i=0; i< todos.length; i++){
//     $('.trash').prepend($('<div style="border-style: groove;" id='+todos[i].id+'  class="col-md-4" >  <h2>'+todos[i].title+'</h2><textarea id='+todos[i].id+' disabled rows="4" cols="45" placeholder="" style="background-color: white;font-style: italic;border-style: none;">'+todos[i].content+'</textarea><br><text>'+todos[i].timestamp+'</text> <input type="button" value="Restore" id='+todos[i].id+' class="restore" onclick="restore(this.id)" /> <input type="button" class="delete" value="ThrowIt!!" id='+todos[i].id+' onclick="deleteForever(this.id)" />  </div>'))     ;
//    }    
//}
//
////Restore the trash data from the local to active note list
//function restore(id){
//    var trash = new Array;
//    var todos = new Array;
//    var todoList = getActiveTasksList();
//    var trashList = getTrashTasksList();
//    for(var i=0; i<trashList.length;i++){
//        if(trashList[i].id==id){
//            var trashItem = trashList[i];
//            todoList.push(trashItem);
//            trashList.splice(i,1);
//            localStorage.setItem('trashList', JSON.stringify(trashList));;
//         localStorage.setItem('todoList', JSON.stringify(todoList));
//            display();
//            displayTrash();
//         return;
//        }
//    }
//    
//}
//
//
////edit the notes
// function editReminder(id) {
//     var updatedVal = $("#"+id).find("textarea#" + id).val();
//     $('#'+id).find('textarea').prop('disabled',false);
//    $("#"+id).find(".edit").prop('value',"Save");
//    console.log($("#"+id).find(".edit"));
//    $("#"+id).find(".edit").attr("onclick","update(this.id)");
//    
//}
//
////save the updated note
//function update(id){
//    
//    $("#"+id).find(".edit").prop('value',"Edit");
//    $("#"+id).find(".edit").attr("onclick","editReminder(this.id)");
//    
//   // <!-- Search -->
//var updatedVal = $("#"+id).find("textarea#" + id).val();
//
//$("#"+id).find("textarea#" + id).prop('disabled', true);
//
//        var todoList= getActiveTasksList()   ;  
//    for(var i=0; i< todoList.length; i++){
//     if(todoList[i].id == id){
//         todoList[i].content = updatedVal;
// localStorage.setItem("todoList",JSON.stringify(todoList));
//         break;
//     }   
//    }
//
//}