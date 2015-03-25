(function(){
	'use strict';

	angular
		.module('app')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['$location', '$rootScope', 'Auth'];
	function LoginCtrl($location, $rootScope, Auth){
		var self = this;

		self.login = login;

		function login(credentials){
			Auth.$authWithPassword({
  				email    : credentials.email,
  				password : credentials.password
			}).then(function(userData) {
				$rootScope.authData = Auth.$getAuth();
				console.log("User logged in with uid: " + userData.uid);
				$location.path('/');
			}).catch(function(error) {
				console.log(error)
      		});
		}
	}
})();