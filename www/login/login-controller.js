(function(){
	'use strict';

	angular
		.module('app')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['$state', '$rootScope', 'Auth', 'Backend', 'UserService', 'FACEBOOK_APP_ID', '$q', '$ionicLoading'];
	function LoginCtrl($state, $rootScope, Auth, Backend, UserService, FACEBOOK_APP_ID, $q, $ionicLoading){
		var self = this;

		var fbLogged = $q.defer();

		self.facebookLogin = facebookLogin;

		function facebookLogin(){
			if (!window.cordova) {
				//this is for browser only
				facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
			}

			facebookConnectPlugin.getLoginStatus(function(success){
				// alert(success.status);
				if(success.status === 'connected'){
					// the user is logged in and has authenticated your app, and response.authResponse supplies
					// the user's ID, a valid access token, a signed request, and the time the access token
					// and signed request each expire
					//$state.go('sidemenu.home');
					console.log("success BITCHES");
					facebookConnectPlugin.getAccessToken(function(token){
						Auth.$authWithOAuthToken("facebook", token).then(function(authData) {
							console.log(authData);
							$rootScope.authData = authData;

							var updatedPerson = {
								id: $rootScope.authData.facebook.id,
								displayName: $rootScope.authData.facebook.displayName,
								profilePhotoURL: $rootScope.authData.facebook.cachedUserProfile.picture.data.url,
								gender: $rootScope.authData.facebook.cachedUserProfile.gender,
								ageRange: $rootScope.authData.facebook.cachedUserProfile.age_range
							}

							Backend.$updatePerson($rootScope.authData.uid, updatedPerson);
							$state.go('app.home');
						}, function(error) {
							console.error("ERROR: " + error);
						});
						
					},function(error){
						console.log(error);
					});
					//$state.go('sidemenu.home');

				} else {

					facebookConnectPlugin.login(['user_friends'], fbLoginSuccess, fbLoginError);


					fbLogged.promise.then(function(authData) {
						console.log('yolo');

						var fb_uid = authData.id,
						fb_access_token = authData.access_token;

						Auth.$authWithOAuthToken("facebook", fb_access_token).then(function(authData) {
							console.log(authData);
							$rootScope.authData = authData;

							var updatedPerson = {
								id: $rootScope.authData.facebook.id,
								displayName: $rootScope.authData.facebook.displayName,
								profilePhotoURL: $rootScope.authData.facebook.cachedUserProfile.picture.data.url,
								gender: $rootScope.authData.facebook.cachedUserProfile.gender,
								ageRange: $rootScope.authData.facebook.cachedUserProfile.age_range
							}

							Backend.$updatePerson($rootScope.authData.uid, updatedPerson);
							$state.go('app.home');
						}, function(error) {
							console.error("ERROR: " + error);
						});
					});
				}
			}); 

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
	}
})();
