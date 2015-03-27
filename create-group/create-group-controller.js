(function(){
	'use strict';

	angular
		.module('app')
		.controller('CreateGroupCtrl', CreateGroupCtrl);

	CreateGroupCtrl.$inject = ['$location','People', 'Groups'];
	function CreateGroupCtrl($location, People, Groups){
		self = this;

		// functions
		self.createGroup = createGroup;

		// variables
		self.group = {};
		self.group.title = "";
		self.group.description = "";
		self.group.private = false;

		function createGroup(){
			Groups.$add(self.group).then(function(ref){
				var id = ref.key()
				$location.path('/members/' + id);
			});
		}
	}
})();