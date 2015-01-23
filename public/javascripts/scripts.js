console.log('LINKED');

var $title = $('#title');

var $categ1 = $('#categ1');
var $categ2 = $('#categ2');
var $categ3 = $('#categ3');

var $nameField = $('#name-input');
var $ageField = $('#age-input');
var $phoneField = $('#phone-input');
var $addressField = $('#address-input');
var $categoryField = $('#category-input');

var $contactsField = $('#contact-field');
var $contactsList = $('#contact-list');


function populateCategDOM(data) {

	console.log('populateCategDOM invoked');

	$('#categ1 span').text(data[0].name);
	$('#categ2 span').text(data[1].name);
	$('#categ3 span').text(data[2].name);

	$('#categ1').attr('dbId', data[0].id);
	$('#categ2').attr('dbId', data[1].id);
	$('#categ3').attr('dbId', data[2].id);

	$categ1.on("click", function() {

	getCategByIdDB(2);


	});
};

function populateContactsDOM(data) {

	console.log('populateContactsDOM invoked');

	var contactsArray = data['contacts'];

	contactsArray.forEach(function(entry){
		var $li = $('<li>Name: ' + entry.name + 'Age: ' + entry.age + 'Address: ' + entry.address + 'Phone: ' + entry.phone_number + '</li>')
		var $editButton = $('<button>edit</button>');
		var $removeButton = $('<button>remove</button>');
		
		$contactsList.append($li);
	});


};

















//DB FUNCTIONS**********MODELS*************

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
