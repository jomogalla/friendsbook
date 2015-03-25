(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupCtrl', GroupCtrl);

	GroupCtrl.$inject = ['$routeParams', '$rootScope','Groups', 'People', 'Messages'];
	function GroupCtrl($routeParams, $rootScope, Groups, People, Messages){
		self = this;

		self.sayIt = sayIt;

		self.inputText = "";

		self.currentUser = People.$get($rootScope.authData.uid);
		self.currentUser.uid = $rootScope.authData.uid;

		Groups.$loaded().then(function(){
			self.group = Groups.$getRecord($routeParams.key);
		});
		self.messages = Messages.$getAll($routeParams.key);

		// console.log(Messages.$getAll($routeParams.key));



		function sayIt(){
			// var currentTime = new Date();

			// var newChat = {
			// 	user: self.currentUser,
			// 	uid: $rootScope.authData.uid,
			// 	time: currentTime,
			// 	text: self.inputText
			// };

			// self.group.messages.push(newChat);

			Messages.$add($routeParams.key, $rootScope.authData.uid, self.inputText);

			self.inputText = "";


			// Groups.$save(self.group);

		}
	}
})();