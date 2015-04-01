(function(){
	'use strict';

	angular
		.module('app')
		.controller('NavbarCtrl', NavbarCtrl);

	NavbarCtrl.$inject = ['$location', '$rootScope', 'People'];
	function NavbarCtrl($location, $rootScope, People){
		var self = this;

		self.isActive = isActive;

		self.currentUser = null;
		self.invites = 0;
		
		if($rootScope.authData){
			People.$get($rootScope.authData.uid).$loaded(function(data){
				self.currentUser = data;

				for (var property in self.currentUser.groups) {
	    			if (self.currentUser.groups.hasOwnProperty(property)) {
	        			if(!self.currentUser.groups[property]){
	        				self.invites++;
	        			}
	   				}
				}
			});
		}
		
		function isActive(path){
			return path === $location.path().replace("/", "");
		}
	}
})();