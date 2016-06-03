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
        
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000*(+5.5)));
nd.toLocaleString();
        var t = nd.toLocaleString();
        if($("#bannerImg").val() == ''){
            alert($("#bannerImg").val());
        }
        
        var bannerImage = document.getElementById('bannerImg').value;
        //check for empty fields
        var img = document.getElementById('demoImg');
        var file = document.getElementById('bannerImg').files[0];
        //var file = document.getElementById('bannerImg').value;             
        var toDoType = "image";
        var fReader = new FileReader();
        fReader.onload = function() {
            //console.log(fReader.result);
            document.getElementById('demoImg').src = fReader.result;
            var task  = getBase64Image(img);
            var task_Object = {'id':time,'title':title,'image':task,'content':content,'timestamp': t };
    todoList.push(task_Object);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    toDos.display();
    }
       fReader.readAsDataURL(file);
       document.getElementById('bannerImg').value ='';
       document.getElementById('title').value ='';
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

 
 //convert thr image data into binary
    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

 
 
//display the notes in the UI
toDos.display =  function (){
    var todos= toDos.getActiveTasksList();
    $( ".row " ).empty();
    for(var i=0; i< todos.length; i++){
        
    var imgSrc = getImage(todos[i].image);
     $('.row').prepend($('<div style="border-style: groove;" id='+todos[i].id+'  class="col-md-4" >  <h2>'+todos[i].title+'</h2><textarea disabled id='+todos[i].id+' rows="4" cols="45" placeholder="" style="background-color: white;font-style: italic;border-style: none;">'+todos[i].content+'</textarea><br><div class="col-md-12" ><img src='+imgSrc+' id="tableBanner" class="noteImage" style="width: 100%; margin-bottom: 20px;"/></div><text>'+todos[i].timestamp+'</text> <input type="button" value="Edit" id='+todos[i].id+' class="edit" onclick="toDos.editReminder(this.id)" /> <input type="button" class="delete" value="Delete" id='+todos[i].id+' onclick="toDos.deleteNote(this.id)" />  </div>'));
    }  
}

    function getImage (dataImage) {
        return "data:image/png;base64," + dataImage;
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
            toDos.displayTrash();
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
    $('.trashContainer > .jumbotron').remove();
    $( ".trash " ).empty();
    $('.trashContainer').prepend('<div class="jumbotron"><h1 align="center"> Trash </h1> </div>');
                          
                          
     for(var i=0; i< todos.length; i++){
         var imgSrc = getImage(todos[i].image);
     $('.trash').prepend($('<div style="border-style: groove;" id='+todos[i].id+'  class="col-md-4" >  <h2>'+todos[i].title+'</h2><textarea id='+todos[i].id+' disabled rows="4" cols="45" placeholder="" style="background-color: white;font-style: italic;border-style: none;">'+todos[i].content+'</textarea><br> <div class="col-md-12" ><img src='+imgSrc+' id="tableBanner"  style="width: 100%; margin-bottom: 20px;" class="noteImage"/></div><text>'+todos[i].timestamp+'</text> <input type="button" value="Restore" id='+todos[i].id+' class="restore" onclick="toDos.restore(this.id)" /> <input type="button" class="delete" value="ThrowIt!!" id='+todos[i].id+' onclick="toDos.deleteForever(this.id)" />  </div>'));
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
