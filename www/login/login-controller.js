(function(){
	'use strict';

	angular
		.module('app')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['$location', '$rootScope', 'Auth', 'Backend'];
	function LoginCtrl($location, $rootScope, Auth, Backend){
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

					var updatedPerson = {
						id: $rootScope.authData.facebook.id,
						displayName: $rootScope.authData.facebook.displayName,
						profilePhotoURL: $rootScope.authData.facebook.cachedUserProfile.picture.data.url,
						gender: $rootScope.authData.facebook.cachedUserProfile.gender,
						ageRange: $rootScope.authData.facebook.cachedUserProfile.age_range
					}

					Backend.$updatePerson($rootScope.authData.uid, updatedPerson);
					$location.path('/');
				}).catch(function(error) {
  					console.error("Authentication failed:", error);
				});
		}
	}
})();