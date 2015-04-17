(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupSettings', GroupSettings);

	GroupSettings.$inject = ['$routeParams', '$location', 'Backend'];
	function GroupSettings($routeParams, $location, Backend){
		var self = this;

		self.save = save;

		self.group = Backend.$getGroup($routeParams.key)

		function save(){
			console.log(self.group);
			Backend.$saveGroup(self.group);
		}
	}
})();