(function(){
	'use strict';

	angular
		.module('app')
		.controller('ProfileCtrl', ProfileCtrl);

	ProfileCtrl.$inject = ['$routeParams', '$location', '$rootScope', 'Auth', 'Facebook', 'Backend'];
	function ProfileCtrl($routeParams, $location, $rootScope, Auth, Facebook, Backend){
		var self = this;

		self.logout = logout;

		self.profileId = null;
		self.currentUser = false;
		self.me = Backend.$getCurrentPerson();

		if(!$routeParams.key){
			self.profileId = $rootScope.authData.uid;
			self.currentUser = true;
		} else {
			self.profileId = $routeParams.key;
			self.currentUser = false;
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