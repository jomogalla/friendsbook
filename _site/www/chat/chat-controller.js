(function(){
	'use strict';

	angular
		.module('app')
		.controller('ChatCtrl', ChatCtrl);

	ChatCtrl.$inject = ['$stateParams', 'Backend'];
	function ChatCtrl($stateParams, Backend){
		var self = this;

		self.submitMessage = submitMessage;

		self.inputText = "";
		self.currentUser = Backend.$getCurrentPerson();
		self.messages = Backend.$getMessages();
		self.group = Backend.$getGroup($stateParams.key);

		function submitMessage(){
			Backend.$addMessage(self.inputText);
			self.inputText = "";
		}
	}
})();
