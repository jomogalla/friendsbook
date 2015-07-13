(function(){

	angular
		.module('app')
		.controller('SidemenuCtrl', SidemenuCtrl);

	SidemenuCtrl.$inject = ['$rootScope', '$state', '$ionicPopup', '$ionicLoading', 'Backend']
	function SidemenuCtrl($rootScope, $state, $ionicPopup, $ionicLoading, Backend){
		var self = this;

		self.currentUser = null;
		self.invites = 0;

		self.logout = logout;

		Backend.$getCurrentPerson().$loaded(function(data){
			self.currentUser = data;

			for(var index in self.currentUser.groups){
				if(!self.currentUser.groups[index]){
					self.invites++;
				}
			}
		});

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
						template: 'Logging out...'
					});

					if (!window.cordova) {
						//this is for browser only
						facebookConnectPlugin.browserInit(679172528872512);
					}

					facebookConnectPlugin.logout(function(){
						//success
						// UserService.deleteUser();
						$ionicLoading.hide();
						$state.go('login');
					},

					function(fail){
						console.log(fail);
						$ionicLoading.hide();
					});
				} else {
				//cancel log out
				}
			});
		}
	}
})();
