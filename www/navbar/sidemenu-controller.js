(function(){

	angular
		.module('app')
		.controller('SidemenuCtrl', SidemenuCtrl);

	SidemenuCtrl.$inject = ['$rootScope', '$state', '$ionicPopup']
	function SidemenuCtrl($rootScope, $state, $ionicPopup){
		var self = this;

		self.logout = logout;

		function logout(){
			// $state.go('login');


			var confirmPopup = $ionicPopup.confirm({
				title: 'Log out',
				template: 'Are you sure you want to log out?'
			});

			confirmPopup.then(function(response) {
				if(response) {
					//logout
					$ionicLoading.show({
						template: 'Loging out...'
					});

					if (!window.cordova) {
						//this is for browser only
						facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
					}

					facebookConnectPlugin.logout(function(){
						//success
						UserService.deleteUser();
						$ionicLoading.hide();
						$state.go('login');
					},

					function(fail){
						$ionicLoading.hide();
					});
				} else {
				//cancel log out
				}
			});
		}
	}
})();
