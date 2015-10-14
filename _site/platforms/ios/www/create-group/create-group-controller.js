(function(){
	'use strict';

	angular
		.module('app')
		.controller('CreateGroupCtrl', CreateGroupCtrl);

	CreateGroupCtrl.$inject = ['$location', '$rootScope', 'Backend'];
	function CreateGroupCtrl($location, $rootScope, Backend){
		var self = this;

		// functions
		self.createGroup = createGroup;

		// variables
		self.group = {};
		self.group.title = "";
		self.group.description = "";
		self.group.private = false;

		function createGroup(){
			var returnedGroup = Backend.$createGroup(self.group);
				// Add the person to the group
				Backend.$acceptMember(returnedGroup.$id, $rootScope.authData.uid).then(function(){
					$location.path('/invite-members/' + returnedGroup.$id);	
				});
		}
	}
})();