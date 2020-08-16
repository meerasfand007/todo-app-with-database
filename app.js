var todoItem = document.getElementById('todoItem');

firebase.database().ref('todos').on('child_added',function(data){
    var li = document.createElement('li');
    li.setAttribute('class', 'listText')
    var litext = document.createTextNode(data.val().value);
    li.appendChild(litext);

    var btnDlt = document.createElement('button');
    var textDlt = document.createTextNode('Delete');
    btnDlt.setAttribute('id',data.val().key)
    btnDlt.setAttribute('onclick', 'deleteTodo(this)');
    btnDlt.setAttribute('class', 'btn btn-danger deleteButton')

    btnDlt.appendChild(textDlt)
    li.appendChild(btnDlt)

    var btnEdit = document.createElement('button');
    var textEdit = document.createTextNode('Edit');
    btnEdit.setAttribute('id',data.val().key)
    btnEdit.setAttribute('onclick', 'editTodo(this)');
    btnEdit.setAttribute('class', 'btn btn-info  editButton')
    btnEdit.appendChild(textEdit)
    li.appendChild(btnEdit)

    todoItem.appendChild(li);
    
    todoItem.style.border = "solid 2px grey"
})

function addItem() {
    var todoAdd = document.getElementById('todoAdd')
    var database= firebase.database().ref('todos');
    var key= database.push().key;
    var todoObj={
        key: key,
        value: todoAdd.value
    };
    database.child(key).set(todoObj)
    
    todoAdd.value = '';
}

function deleteAll() {
    firebase.database().ref('todos').remove()
    todoItem.innerHTML = "";
    todoItem.style.border = "none"
}

function deleteTodo(a) {
    firebase.database().ref('todos').child(a.id).remove();
    a.parentNode.remove();
}

function editTodo(b) {
    

    
    var editValue = prompt("Edit Your Task", b.parentNode.firstChild.nodeValue);
   var editTodoObj={
       key: b.id,
       value: editValue 
   };
  firebase.database().ref('todos').child(b.id).set(editTodoObj);

    b.parentNode.firstChild.nodeValue = editValue;
}