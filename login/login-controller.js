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
					// If we dont have a user - create one
					if(!People.$get($rootScope.authData.uid).displayName){
						var newUser = {
							displayName: $rootScope.authData.facebook.displayName,
							profilePhotoURL: $rootScope.authData.facebook.cachedUserProfile.picture.data.url,
							gender: $rootScope.authData.facebook.cachedUserProfile.gender,
							ageRange: $rootScope.authData.facebook.cachedUserProfile.age_range
						}
						// var uid = $rootScope.authData.uid;
						// var displayName = $rootScope.authData.facebook.displayName;
						// var profilePhotoURL = $rootScope.authData.facebook.cachedUserProfile.picture.url;
						// var gender = $rootScope.authData.facebook.cachedUserProfile.gender;
						// var ageRange = $rootScope.authData.facebook.cachedUserProfile.age_range;

						People.$create($rootScope.authData.uid, newUser);
						$location.path('/');
					} else {
						$location.path('/');

					}
					
					// console.log(People.$get('simplelogin:1').username);
					// console.log(People.$get($rootScope.authData.uid));
					// console.log($rootScope.authData.uid);
					// console.log($rootScope.authData.uid);
					// $location.path('/');
				}).catch(function(error) {
  					console.error("Authentication failed:", error);
				});
		}
	}
})();