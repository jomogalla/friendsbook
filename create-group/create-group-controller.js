(function(){
	'use strict';

	angular
		.module('app')
		.controller('CreateGroupCtrl', CreateGroupCtrl);

	CreateGroupCtrl.$inject = ['$location', 'Backend'];
	function CreateGroupCtrl($location, Backend){
		var self = this;

		// functions
		self.createGroup = createGroup;

		// variables
		self.group = {};
		self.group.title = "";
		self.group.description = "";
		self.group.private = false;

		function createGroup(){
			Backend.$createGroup(self.group).then(function(ref){
				var id = ref.key()
				$location.path('/members/' + id);
			})
		}
	}
})();