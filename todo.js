console.log("Welocome to Notes");
shownotes();

let addtxt = document.getElementById('addtxt');
let addbtn = document.getElementById('addbtn');
let searchtxt = document.getElementById('searchtxt');
let addtitle = document.getElementById("addtitle");


// submit :

addbtn.addEventListener('click', () => {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    // creating a object where we store both
    let bothObj = {
        title: addtitle.value,
        text: addtxt.value
    }

    notesObj.push(bothObj);
    //now notesObj is array of objects..

    localStorage.setItem('notes', JSON.stringify(notesObj));
    addtxt.value = "";
    addtitle.value = "";
    console.log(notesObj);
    shownotes();
});


// del : 

let deleteNote = (index) => {
    console.log(`deleting ${index}`);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    shownotes();
}

// innerhtml :

function shownotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";

    notesObj.forEach((element, index) => {
        html += `<div class="card mx-2 my-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        <button id="${index}"onclick="editNote(this.id)" class="btn btn-primary">Edit Note</button>
                    </div>
                </div>`;
    });
    let noteselement = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteselement.innerHTML = html;
    } else {
        noteselement.innerHTML = `please enter something in the "Add Note" Section`;
    }
}


// search :

searchtxt.addEventListener('input', () => {
    let inputval = searchtxt.value;
    console.log("input", inputval);
    let notecard = document.getElementsByClassName('card');
    // for checking : 
    Array.from(notecard).forEach(function(element) {

        try {
            let cardtxt = element.getElementsByTagName('p')[0].innerText;
            let cardtitle = element.getElementsByTagName('h5')[0].innerText;
            // console.log(cardtxt);
            if (cardtxt.includes(inputval) || cardtitle.includes(inputval)) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } catch (error) {

        }

    })
});


// edit :

function editNote(index) {
    console.log(`editing ${index}`);
}