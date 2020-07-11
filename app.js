console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let importance = localStorage.getItem("importance")
  
  if (notes == null) {
    notesObj = [];
    impObj = [];
  } else {
    notesObj = JSON.parse(notes);
    impObj = JSON.parse(importance)

  }
  notesObj.push(addTxt.value);
  impObj.push("NO"); //initially not important
  
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("importance", JSON.stringify(impObj));

  addTxt.value = "";
//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
    impObj = JSON.parse(localStorage.getItem('importance'))
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    

    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem; background-color: ${impObj[index]};">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        <button id="${index}"onclick="addCss(this.id)" class="btn btn-info">Imp</button>
                    </div>
                </div>`;
  });

  let notesElm = document.getElementById("notes");
  
//   let importance = localStorage.getItem("importance");
//   if(importance == null){ impObj = []} else { impObj = JSON.parse(importance)}
  
//   impObj.forEach(function(element,index){
//         if(!element) {
//             console.log(element);
//             console.log(notesElm[index])
//             //notes(this.index).setAttribute('backgroundColor','yellow')
//         }

//   }) //loop and change attrin
  
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// function to pul importance
function addCss(index){
    // console.log(Number(index)+1)
    // lets now pull the notesElement and set attribute
    let notesElems = document.getElementById("notes").children;
    notesElems= Array.from(notesElems)
    //console.log(notesElems[index]);

    selected = notesElems[index]
    importance = localStorage.getItem('importance')
    importance = JSON.parse(importance)
    //console.log("before ",importance[index])
    importance[index]= 'yellow'
    //console.log('Changed : ',importance)
    localStorage.setItem('importance',JSON.stringify(importance))
    
    showNotes()

}


// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  let importance = localStorage.getItem("importance");
  if (notes == null) {
    notesObj = [];
    impObj = [];
  } else {
    notesObj = JSON.parse(notes);
    impObj = JSON.parse(importance)
  }

  notesObj.splice(index, 1);
  impObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem('importance',JSON.stringify(impObj))
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

/*
Further Features:
1. Add Title
2. Mark a note as Important  - done with Yellow color
3. Separate notes by user
4. Sync and host to web server 
*/ 
