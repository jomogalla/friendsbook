(function(){
	'use strict';

	angular
		.module('app')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['$location', '$rootScope', 'Auth', 'Backend', 'UserService', 'FACEBOOK_APP_ID', '$q', '$ionicLoading'];
	function LoginCtrl($location, $rootScope, Auth, Backend, UserService, FACEBOOK_APP_ID, $q, $ionicLoading){
		var self = this;

		var fbLogged = $q.defer();

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
			if (!window.cordova) {
				//this is for browser only
				facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
			}

			facebookConnectPlugin.login(['user_friends'], fbLoginSuccess, fbLoginError);


			fbLogged.promise.then(function(authData) {

				var fb_uid = authData.id,
				fb_access_token = authData.access_token;

				Auth.$authWithOAuthToken("facebook", fb_access_token).then(function(authData) {
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
				}, function(error) {
					console.error("ERROR: " + error);
				});


			});
		}

		var fbLoginSuccess = function(response) {
			if (!response.authResponse){
				fbLoginError("Cannot find the authResponse");
				return;
			}
			var expDate = new Date(
				new Date().getTime() + response.authResponse.expiresIn * 1000
			).toISOString();

			var authData = {
				id: String(response.authResponse.userID),
				access_token: response.authResponse.accessToken,
				expiration_date: expDate
			}


			fbLogged.resolve(authData);
			};

			//This is the fail callback from the login method
			var fbLoginError = function(error){

			fbLogged.reject(error);

			console.log(error);

			$ionicLoading.hide();
			};
	}
})();
