(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupCtrl', GroupCtrl);

	GroupCtrl.$inject = ['$routeParams', '$rootScope','Groups', 'People'];
	function GroupCtrl($routeParams, $rootScope, Groups, People){
		self = this;

		self.sayIt = sayIt;

		self.inputText = "";

		People.$loaded().then(function(){
			self.currentUser = People[$rootScope.authData.uid];
		});

		Groups.$loaded().then(function(){
			self.group = Groups.$getRecord($routeParams.key);
		});

		function sayIt(){
			var currentTime = new Date();

			var newChat = {
				user: self.currentUser,
				time: currentTime,
				text: self.inputText
			};

			self.group.messages.push(newChat);
			self.inputText = "";

			Groups.$save(self.group);
		}
	}
})();