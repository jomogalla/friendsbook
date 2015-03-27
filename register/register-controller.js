(function(){
	'use strict';

	angular
		.module('app')
		.controller('RegisterCtrl', RegisterCtrl);

	RegisterCtrl.$inject = ['$location', 'Auth'];
	function RegisterCtrl($location, Auth){
		var self = this;

		self.createPerson = createPerson;

		function createPerson(credentials){
			Auth.$createUser({
				email    : credentials.email,
				password : credentials.password
			}).then(function(userData) {
				console.log("User created with uid: " + userData.uid);
				$location.path('/login');
			}).catch(function(error) {
				console.log(error);
      		});
		}
	}
})();