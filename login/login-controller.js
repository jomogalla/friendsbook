(function(){
	'use strict';

	angular
		.module('app')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['$location', '$rootScope', 'Auth', 'People', 'FriendsList'];
	function LoginCtrl($location, $rootScope, Auth, People, FriendsList){
		var self = this;

		self.login = login;
		self.facebookLogin = facebookLogin;

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

		function facebookLogin(){
			Auth.$authWithOAuthPopup("facebook", {scope: 'user_friends'})
				.then(function(authData) {
					$rootScope.authData = authData;
					if(People.$get($rootScope.authData.uid).uid){
						console.log('we got no user cletus');
					} else {
						console.log('welp we got a user');
					}
					
					console.log(People.$get($rootScope.authData.uid).uid);
					$location.path('/');
				}).catch(function(error) {
  					console.error("Authentication failed:", error);
				});
		}
	}
})();