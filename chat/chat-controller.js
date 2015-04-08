(function(){
	'use strict';

	angular
		.module('app')
		.controller('ChatCtrl', ChatCtrl);

	ChatCtrl.$inject = ['$routeParams', 'Backend'];
	function ChatCtrl($routeParams, Backend){
		var self = this;

		self.submitMessage = submitMessage;

		self.inputText = "";
		self.currentUser = Backend.$getCurrentPerson();
		self.messages = Backend.$getMessages();
		self.group = Backend.$getGroup($routeParams.key);

		// Backend.$getGroup($routeParams.key).then(function(group){
		// 	self.group = group
		// });

		function submitMessage(){
			Backend.$addMessage(self.inputText);
			self.inputText = "";
		}
	}
})();