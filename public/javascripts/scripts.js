console.log('LINKED');

var $title = $('#title');

var $categ1 = $('#categ1');
var $categ2 = $('#categ2');
var $categ3 = $('#categ3');

var $nameField = $('#name-input');
var $ageField = $('#age-input');
var $phoneField = $('#phone-input');
var $addressField = $('#address-input');
var $categoryName = $('#alex');
var $addContactButton = $('#add-contact-button');

var $contactsField = $('#contact-field');
var $contactsList = $('#contact-list');



$addContactButton.on("click", function(){
	apiCall();
});

function addContact(data) {

	var getImage = data.results[0].user.picture.thumbnail;
	var postHash = {name: $nameField.val(), age: $ageField.val(), phone_number: $phoneField.val(), address: $addressField.val(), picture: getImage, category_id: $categoryName.attr('dbId')};
	
	if ($nameField.val() == "" || $ageField.val() == "" || $phoneField.val() == "" || $addressField.val() == "") {
		alert('please do not leave any fields blank.');
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

	console.log('populateCategDOM invoked');

	$('#categ1 span').text(data[0].name);
	$('#categ2 span').text(data[1].name);
	$('#categ3 span').text(data[2].name);

	$('#categ1').attr('dbId', data[0].id);
	$('#categ2').attr('dbId', data[1].id);
	$('#categ3').attr('dbId', data[2].id);

	$categ1.on("click", function() {
		var $idGrab = $('#categ1').attr('dbId');
		getCategByIdDB($idGrab);
		$categoryName.text(data[0].name);
		$categoryName.attr('dbId', data[0].id);
	});
	$categ2.on("click", function() {
		var $idGrab = $('#categ2').attr('dbId');
		getCategByIdDB($idGrab);
		$categoryName.text(data[1].name);
		$categoryName.attr('dbId', data[1].id);
	});
	$categ3.on("click", function() {
		var $idGrab = $('#categ3').attr('dbId');
		getCategByIdDB($idGrab);
		$categoryName.text(data[2].name);
		$categoryName.attr('dbId', data[2].id);
	});	

};

function populateContactsDOM(data) {

	console.log('populateContactsDOM invoked');

	$contactsList.empty();

	var $contactsArray = data['contacts'];

	$contactsArray.forEach(function(entry){
		var $li = $('<li>Name: ' + entry.name + 'Age: ' + entry.age + 'Address: ' + entry.address + 'Phone: ' + entry.phone_number + 'Recent-Victim: <img src=' + entry.picture + '></li>')
		var $editButton = $('<button>edit</button>');
		var $editField = $('<div id = "edit-Field" style = "display:none">Name: <input type = "text" id = "edit-name"> Age: <input type = "text" id = "edit-age"> Address: <input type = "text" id = "edit-address"> Phone: <input type = "text" id = "edit-phone">');
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

			var $idFind = $li.attr('dbId');
			var $updateHash = {name: $editNameInput, age: $editAgeInput, address: $editAddressInput, phone_number: $editPhoneInput};

			updateContactDB($idFind, $updateHash);

			//REFRESHES/UPDATES LIST
			var $idGrab = $categoryName.attr('dbId');
			getCategByIdDB($idGrab);

		});

		//this works.
		$removeButton.on("click", function(){
			$idFind = $(this).parent().attr('dbId');
			deleteContactDB($idFind);
			$li.remove();
		});

		$li.append($editButton);
		$li.append($removeButton);
		$contactsList.append($li);

	});
	
};


//DB FUNCTIONS**********MODELS*************
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
		
});
};

//THIS F(X) RETURNS ALL CONTACTS IN THAT CATEG!!!
function getCategByIdDB(id) {

	$.ajax({
		url: '/categories/' + id,
		method: 'GET',
		datatype: 'json'
	}).done(function(data){
		console.log(data);
		populateContactsDOM(data);
	});
};


function getAllContactsDB() {

	$.ajax({
		url: '/contacts',
		method: 'GET',
		datatype: 'json',
	}).done(function(data){
		console.log(data);
	});
};

function getContactByIdDB(id) {

	$.ajax({
		url: '/contacts/' + id,
		method: 'GET',
		datatype: 'json'
	}).done(function(data){
		console.log(data);
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
	});
};

function updateContactDB(id, info) {

	$.ajax({
		url: '/contacts/' + id,
		method: 'PUT',
		datatype: 'json',
		data: info
	}).done(function(data){
		console.log(data);
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

// function postCategDB(info) {

// 	$.ajax({
// 		url: '/categories',
// 		method: 'POST',
// 		datatype: 'json',
// 		data: info
// 	}).done(function(data){
// 		console.log(data);
// 	});
// }; 
