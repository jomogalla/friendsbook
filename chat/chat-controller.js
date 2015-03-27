(function(){
	'use strict';

	angular
		.module('app')
		.controller('ChatCtrl', ChatCtrl);

	ChatCtrl.$inject = ['$routeParams', '$rootScope','Groups', 'People', 'Messages'];
	function ChatCtrl($routeParams, $rootScope, Groups, People, Messages){
		self = this;

		self.submitMessage = submitMessage;

		self.inputText = "";

		self.currentUser = People.$get($rootScope.authData.uid);
		self.currentUser.uid = $rootScope.authData.uid;

		Groups.$loaded().then(function(){
			self.group = Groups.$getRecord($routeParams.key);
		});
		self.messages = Messages.$getAll($routeParams.key);

		function submitMessage(){
			Messages.$add($routeParams.key, $rootScope.authData.uid, $rootScope.authData.facebook.displayName, self.inputText);

			self.inputText = "";
		}
	}
})();