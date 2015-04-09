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
			// var newGroup = Backend.$createGroup(self.group);
			// Backend.$acceptMember(newGroup.$id, $rootScope.authData.uid);
			// $location.path('/invite-members/' + newGroup.$id);
			Backend.$createGroup(self.group).then(function(ref){
				var id = ref.key();

				// Add the person to the group
				Backend.$acceptMember(id, $rootScope.authData.uid);
				$location.path('/invite-members/' + id);
			});
		}
	}
})();