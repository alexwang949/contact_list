console.log('LINKED');

window.onload = function () {

var $title = $('#title');

var $categ1 = $('#categ1');
var $categ2 = $('#categ2');
var $categ3 = $('#categ3');
var $viewAll = $('#view-all');

var $nameField = $('#name-input');
var $ageField = $('#age-input');
var $phoneField = $('#phone-input');
var $addressField = $('#address-input');
var $categoryName = $('#alex');
var $addContactButton = $('#add-contact-button');

var $contactsField = $('#contact-field');
var $contactsList = $('#contact-list');


// var $audio = $('#scream');
// var $chainsaw = $('#chainsaw');






function viewAllDOM(data) {
console.log('viewAlLDOM hit!');

	$contactsList.empty();
	$('#alex').text('Select your Killer.')

	data.forEach(function(entry){

	var $li = $('<li> <img src=' + entry.picture + '><br><span>Name:</span> ' + entry.name + '<br><span>Age:</span> ' + entry.age + '<br><span>Address:</span> ' + entry.address + '<br><span>Phone:</span> ' + entry.phone_number + '</li>')
	var $editButton = $('<button>edit</button>');
	var $editField = $('<div id = "edit-Field" style = "display:none">Name:<input type = "text" id = "edit-name" value=' + entry.name + '>Age:<input type = "text" id = "edit-age" value=' + entry.age + '>Address:<input type = "text" id = "edit-address" value=' + entry.address + '>Phone: <input type = "text" id = "edit-phone" value = ' + entry.phone_number + '>');
	var $updateButton = $('<button id = "edit-submit">UPDATE</button>');
	var $removeButton = $('<button>remove</button>');

	$li.attr('category_id', entry.category_id);

	if ($li.attr('category_id') == 1) {
	var $appendDropdown = $('<select id = "select-menu"><option selected id = ' + $categ1.attr('dbid') + '>' + $categ1.text() + '</option><option id = ' + $categ2.attr('dbid') + '>' + $categ2.text() + '</option><option id = ' + $categ3.attr('dbid') + '>' + $categ3.text() + '</option></select>');
	$editField.append($appendDropdown);
	} else if ($li.attr('category_id') == 2) {
	var $appendDropdown = $('<select id = "select-menu"><option id = ' + $categ1.attr('dbid') + '>' + $categ1.text() + '</option><option selected id = ' + $categ2.attr('dbid') + '>' + $categ2.text() + '</option><option id = ' + $categ3.attr('dbid') + '>' + $categ3.text() + '</option></select>');
	$editField.append($appendDropdown);
	} else if ($li.attr('category_id') == 3) {
	var $appendDropdown = $('<select id = "select-menu"><option id = ' + $categ1.attr('dbid') + '>' + $categ1.text() + '</option><option id = ' + $categ2.attr('dbid') + '>' + $categ2.text() + '</option><option selected id = ' + $categ3.attr('dbid') + '>' + $categ3.text() + '</option></select>');
	$editField.append($appendDropdown);
	}

	$editButton.on("click", function(){
		$editField.append($updateButton);
		$li.append($editField);
		$editField.slideToggle(300);
	});

	$updateButton.on("click", function(){
		var $editNameInput = $('#edit-name').val();
		var $editAgeInput = $('#edit-age').val();
		var $editAddressInput = $('#edit-address').val();
		var $editPhoneInput = $('#edit-phone').val();

		var $selectedId = $('#select-menu').children(':selected').attr('id');
		

		var $idFind = entry.id;
		var $updateHash = {name: $editNameInput, age: $editAgeInput, address: $editAddressInput, phone_number: $editPhoneInput, category_id: $selectedId};
		
		updateContactDB($idFind, $updateHash);

		//REFRESHES/UPDATES LIST
		// getAllContactsDB();
	});

	$removeButton.on("click", function(){
			$idFind = entry.id
			deleteContactDB($idFind);
			$li.remove();
			$('#scream')[0].play();

		});

		$li.append($editButton);
		$li.append($removeButton);
		$contactsList.append($li);

});
	
};

$addContactButton.on("click", function(){
	apiCall();
});


function addContact(data) {

	var getImage = data.results[0].user.picture.thumbnail;
	var postHash = {name: $nameField.val(), age: $ageField.val(), phone_number: $phoneField.val(), address: $addressField.val(), picture: getImage, category_id: $categoryName.attr('dbId')};
	
	if ($nameField.val() == "" || $ageField.val() == "" || $phoneField.val() == "" || $addressField.val() == "") {
		alert($categoryName.text() + ' does not appreciate empty input fields...');
	} else { 	

	createContactDB(postHash);

	$nameField.val("");
	$ageField.val("");
	$phoneField.val("");
	$addressField.val("");

};
//REFRESHES/UPDATES LIST
	var $idGrab = $categoryName.attr('dbId');
	getCategByIdDB($idGrab);
};


function populateCategDOM(data) {

//sets names of categ buttons
	console.log('populateCategDOM invoked');

	$('#categ1 span').text(data[0].name);
	$('#categ2 span').text(data[2].name);
	$('#categ3 span').text(data[1].name);

	$('#categ1').attr('dbId', data[0].id);
	$('#categ2').attr('dbId', data[2].id);
	$('#categ3').attr('dbId', data[1].id);

	$categ1.on("click", function() {
		$('#chainsaw')[0].play();
		var $idGrab = $('#categ1').attr('dbId');
		getCategByIdDB($idGrab);
		$categoryName.text(data[0].name);
		$categoryName.attr('dbId', data[0].id);
	});
	$categ2.on("click", function() {
		var $idGrab = $('#categ2').attr('dbId');
		getCategByIdDB($idGrab);
		$categoryName.text(data[2].name);
		$categoryName.attr('dbId', data[2].id);
	});
	$categ3.on("click", function() {
		var $idGrab = $('#categ3').attr('dbId');
		getCategByIdDB($idGrab);
		$categoryName.text(data[1].name);
		$categoryName.attr('dbId', data[1].id);
	});	
	/////forEach END
	
	$viewAll.on("click", function() {
		getAllContactsDB();
	})

};

// function getCat(element, cat) {
// 		getCategByIdDB(cat.id);
// 		$categoryName.text(cat.name);
// 		element.attr('dbId', data[1].id);
// }

function populateContactsDOM(data) {

	console.log('populateContactsDOM fired!');


	$contactsList.empty();

	var $contactsArray = data['contacts'];
	$contactsArray.forEach(function(entry){

		var $li = $('<li> <img src=' + entry.picture + '> <br><span>Name: </span>' + entry.name + ' <br><span>Age:</span> ' + entry.age + '<span> <br>Address:</span> ' + entry.address + ' <br><span>Phone:</span>' + entry.phone_number + '</li>')
		var $editButton = $('<button>edit</button>');
		var $editField = $('<div id = "edit-Field" style = "display:none">Name:<input type = "text" id = "edit-name" value=' + entry.name + '> Age: <input type = "text" id = "edit-age" value=' + entry.age + '> Address:<input type = "text" id = "edit-address" value=' + entry.address + '> Phone:<input type = "text" id = "edit-phone" value = ' + entry.phone_number + '>');
		var $updateButton = $('<button id = "edit-submit">UPDATE</button>');
		var $removeButton = $('<button>remove</button>');

		$li.attr('dbId', entry.id);

		$editButton.on("click", function(){
			$editField.append($updateButton);
			$li.append($editField); 
			$editField.slideToggle(300);
		});

		$updateButton.on("click", function(){
			var $editNameInput = $('#edit-name').val();
			var $editAgeInput = $('#edit-age').val();
			var $editAddressInput = $('#edit-address').val();
			var $editPhoneInput = $('#edit-phone').val();
			var $idGrab = $categoryName.attr('dbId');

			var $idFind = $li.attr('dbId');
			var $updateHash = {name: $editNameInput, age: $editAgeInput, address: $editAddressInput, phone_number: $editPhoneInput};
			updateContactDBsingle($idFind, $updateHash);

			//REFRESHES/UPDATES LIST
			getCategByIdDB($idGrab);

		});

		//this works.
	
	$removeButton.on("click", function(){
			$idFind = $(this).parent().attr('dbId');
			deleteContactDB($idFind);
			$li.remove();
			$('audio')[0].play();
		});

		$li.append($editButton);
		$li.append($removeButton);
		$contactsList.append($li);

	});
	// };

};


//DB FUNCTIONS***********************
function apiCall() {

	$.ajax({
		url: 'http://api.randomuser.me/',
		datatype: 'json'
	}).done(function(data){
		addContact(data);
	})
}


function getAllCategDB() {

	$.ajax({
		url: '/categories',
		method: 'GET',
		datatype: 'json'
	}).done(function(data) {
		populateCategDOM(data);
		console.log(data);
});
};

function getCategByIdDB(id) {
	console.log('getCategByIdDBFIRED!')
	$.ajax({
		url: '/categories/' + id,
		method: 'GET',
		datatype: 'json'
	}).done(function(data){
		populateContactsDOM(data);
	});
};


function getAllContactsDB() {
	console.log('getAllcontactsDB hit!')

	$.ajax({
		url: '/contacts',
		method: 'GET',
		datatype: 'json',
	}).done(function(data){
		viewAllDOM(data);
	});
};

function getContactByIdDB(id, someFunc) {

	$.ajax({
		url: '/contacts/' + id,
		method: 'GET',
		datatype: 'json'
	}).done(function(data){
		someFunc(data);
	});
};

function createContactDB(info) {

	$.ajax({
		url: '/contacts',
		method: 'POST',
		datatype: 'json',
		data: info
	}).done(function(data){
		console.log(data);
		getCategByIdDB(info.category_id);
	});
};

function updateContactDBsingle (id, info) {
console.log('updateContactDBsingle!')
	$.ajax({
		url: '/contacts/' + id,
		method: 'PUT',
		datatype: 'json',
		data: info
	});
};
// 	}).done(getCategByIdDB(info.category_id))
// };

// function getCategByIdDB(id) {
// 	console.log('getCategByIdFIRED!')
// 	$.ajax({
// 		url: '/categories/' + id,
// 		method: 'GET',
// 		datatype: 'json'
// 	}).done(function(data){
// 		populateContactsDOM(data);
// 	});
// };

function updateContactDB(id, info) {

	$.ajax({
		url: '/contacts/' + id,
		method: 'PUT',
		datatype: 'json',
		data: info
	}).done(function(){
		console.log('updateContactDB hit!')
		getAllContactsDB();
	});
};

function deleteContactDB(id) {

	$.ajax({
		url: '/contacts/' + id,
		method: 'DELETE',
	}).done(function(data){
		console.log(data);
	});
};
getAllCategDB();



};
