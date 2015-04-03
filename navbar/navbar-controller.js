(function(){
	'use strict';

	angular
		.module('app')
		.controller('NavbarCtrl', NavbarCtrl);

	NavbarCtrl.$inject = ['$location', '$rootScope', 'Backend'];
	function NavbarCtrl($location, $rootScope, Backend){
		var self = this;

		self.isActive = isActive;

		self.currentUser = null;
		self.invites = 0;
		
		if($rootScope.authData){
			Backend.$getCurrentPerson().$loaded(function(user){

				self.currentUser = user;
				_checkForInvites();
				self.currentUser.$watch(_checkForInvites);
			});
		}
		
		function isActive(path){
			return path === $location.path().replace("/", "");
		}

		function _checkForInvites(){
			self.invites = 0;
			for (var property in self.currentUser.groups) {
    			if (self.currentUser.groups.hasOwnProperty(property)) {
        			if(!self.currentUser.groups[property]){
        				self.invites++;
        			}
   				}
			}
		}
	}
})();