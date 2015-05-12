(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupSettings', GroupSettings);

	GroupSettings.$inject = ['$stateParams', '$location', 'Backend'];
	function GroupSettings($stateParams, $location, Backend){
		var self = this;

		self.save = save;

		self.group = Backend.$getGroup($stateParams.key)

		function save(){
			console.log(self.group);
			Backend.$saveGroup(self.group);
		}
	}
})();
