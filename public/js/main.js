/*global io*/
$(function() {

	var socket = io();

	var $boxMessages = $('#box-messages');
	var $messageForm = $('#message-form');
	var $inputMessage = $('#message');
	var message;

	$messageForm.click(function () {
		sendMessage(message);
		return false;
	});

	// Whenever the server emits 'new message', update the chat body
	socket.on('new message', function (data) {
		addChatMessage(data);
	});

  	// Sends a chat message
  	function sendMessage () {
	    var message = $inputMessage.val();
	    // Prevent markup from being injected into the message
	    message = cleanInput(message);
	    // if there is a non-empty message and a socket connection
	    if (message) {
	      $inputMessage.val('');
	      $inputMessage.focus();
	      addChatMessage({username: 'Tu',message: message});
	      // tell server to execute 'new message' and send along one parameter
	      socket.emit('new message', message);
	    }
  	}

    // Adds the visual chat message to the message list
  	function addChatMessage (data) {
		$boxMessages.append('<span class="message">'+data.username+': '+data.message+'</span>');
		$boxMessages.animate({scrollTop: $boxMessages.height()});
	}

	// Prevents input from having injected markup
  	function cleanInput (input) {
   		return $('<div/>').text(input).text();
	}

});