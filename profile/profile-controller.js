(function(){
	'use strict';

	angular
		.module('app')
		.controller('ProfileCtrl', ProfileCtrl);

	ProfileCtrl.$inject = ['$routeParams', '$location', '$rootScope', 'Auth', 'People'];
	function ProfileCtrl($routeParams, $location, $rootScope, Auth, People){
		var self = this;

		self.logout = logout;
		self.save = save;
		self.deleteUser = deleteUser;

		if(!$routeParams.key){
			self.user = People.$get($rootScope.authData.uid)
			self.currentUser = "true";
		} else {
			self.user = People.$get($routeParams.key);
			self.currentUser = "false";
		}


		function save () {
			self.user.$save().then(function() {
				console.log('user saved');
			}, function(error) {
				console.log("Error:", error);
			});
		}
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