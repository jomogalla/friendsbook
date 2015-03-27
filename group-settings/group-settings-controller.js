(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupSettings', GroupSettings);

	GroupSettings.$inject = ['$routeParams', '$location', 'Groups'];
	function GroupSettings($routeParams, $location, Groups){
		self = this;

		// functions
		self.save = save;

		// variables
		self.groupId = $routeParams.key;

		Groups.$loaded().then(function(){
			self.group = Groups.$getRecord(self.groupId);
		});

		function save(){
			Groups.$save(self.group).then(function(ref){
				$location.path('/group/'+ self.groupId);
			});
		}
	}
})();