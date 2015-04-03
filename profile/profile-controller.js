(function(){
	'use strict';

	angular
		.module('app')
		.controller('ProfileCtrl', ProfileCtrl);

	ProfileCtrl.$inject = ['$routeParams', '$location', '$rootScope', 'Auth', 'Facebook'];
	function ProfileCtrl($routeParams, $location, $rootScope, Auth, Facebook){
		var self = this;

		self.logout = logout;

		self.profileId = null;
		self.currentUser = false;

		if(!$routeParams.key){
			self.profileId = $rootScope.authData.facebook.id;
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