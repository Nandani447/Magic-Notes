console.log("Welcome to notes app. This is app.js");
showNotes();

//If user adds a note, added to the localStorage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {

	let addtxt = document.getElementById("addtxt");
	let addtitle = document.getElementById("addtitle");
	let notes = localStorage.getItem("notes");
	if (notes == null) {
		notesObj = [];
	}
	else {
		notesObj = JSON.parse(notes);
	}
	let myObj = {
		title: addtitle.value,
		text: addtxt.value
	}
	notesObj.push(myObj);
	localStorage.setItem("notes", JSON.stringify(notesObj));
	addtxt.value = "";
	addtitle.value = "";
	// console.log(notesObj);
	showNotes();
})

//function to show eleemnts from localStorage
function showNotes() {
	let notes = localStorage.getItem("notes");
	if (notes == null) {
		notesObj = [];
	}
	else {
		notesObj = JSON.parse(notes);
	}
	let html = "";
	notesObj.forEach(function (element, index) {
		html += `
		<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
			<div class="card-body">
				<h5 class="card-title">Note ${element.title}</h5>
				<p class="card-text"> ${element.text}</p>
				<button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
			</div>
		</div>`;
	});
	let notesElm = document.getElementById('notes');
	if (notesObj.length != 0) {
		notesElm.innerHTML = html;
	}
	else {
		notesElm.innerHTML = `Nothing to show! use "Add a Note" section above to add notes.`
	}
}

//function to delete a note
function deleteNote(index) {
	console.log("I am deleting", index);

	let notes = localStorage.getItem("notes");
	if (notes == null) {
		notesObj = [];
	}
	else {
		notesObj = JSON.parse(notes);
	}
	notesObj.splice(index, 1);
	//update localStorage
	localStorage.setItem("notes", JSON.stringify(notesObj));
	showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

	let inputVal = search.value.toLowerCase();
	// console.log('Input event fired!', inputVal);
	let noteCards = document.getElementsByClassName('noteCard');
	Array.from(noteCards).forEach(function (element) {
		let cardTxt = element.getElementsByTagName("p")[0].innerText;
		if (cardTxt.includes(inputVal)) {
			element.style.display = "block";
		}
		else {
			element.style.display = "none";
		}

		// console.log(cardTxt);
	})
});

/*
Further features:
1. Add title
2. Mark a note as important
3.Seperate note by user
4. Sync and host to web server
*/
