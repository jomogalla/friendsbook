(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupSettings', GroupSettings);

	GroupSettings.$inject = ['$routeParams', '$location', 'Backend'];
	function GroupSettings($routeParams, $location, Backend){
		var self = this;

		self.save = save;

		self.groupId = $routeParams.key;

		Backend.$getGroup($routeParams.key).then(function(group){
			self.group = group;
		});

		function save(){
			Backend.$saveGroup(self.group).then(function(){
				$location.path('/group/'+ self.groupId);
			});
		}
	}
})();