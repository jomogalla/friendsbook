(function(){
	'use strict';

	angular
		.module('app')
		.controller('ProfileCtrl', ProfileCtrl);

	ProfileCtrl.$inject = ['$routeParams', '$location', '$rootScope', 'Auth', 'People', 'FriendsList'];
	function ProfileCtrl($routeParams, $location, $rootScope, Auth, People, FriendsList){
		var self = this;

		self.logout = logout;
		// self.save = save;

		self.user = null;
		self.currentUser = false;
		self.profile = null;
		// self.facebookData = $rootScope.authData.facebook;
		// self.facebookData = $rootScope.authData.facebook;
		// self.friends = FriendsList.getFriends($rootScope.authData.facebook.id, $rootScope.authData.facebook.accessToken);

		if(!$routeParams.key){
			// self.user = People.$get($rootScope.authData.uid)
			self.profile = $rootScope.authData.facebook;
			self.currentUser = true;
		} else {
			FriendsList.getFriend(('facebook:' + $routeParams.key), $rootScope.authData.facebook.accessToken)
				.then(function(data){
					self.profile = data;
					console.log(data);
				});
			// self.user = People.$get($routeParams.key);
			self.currentUser = false;
		}


		// if(self.user.username = ""){
			// self.facebookData = $rootScope.authData.facebook;
			// self.user.username = self.facebookData.displayName;
		// }

		// function save () {
		// 	self.user.$save().then(function() {
		// 		console.log('user saved');
		// 	}, function(error) {
		// 		console.log("Error:", error);
		// 	});
		// }

		function deleteUser(){
			console.log('FUNCTION NO IMPLEMENTE');
		}

		function logout () {
			Auth.$unauth();
			Auth.$onAuth(function(authData){
				$rootScope.authData = Auth.$getAuth();
				$location.path('/login');
			});		
		}
	}
})();