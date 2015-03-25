(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupsCtrl', GroupsCtrl);

	GroupsCtrl.$inject = ['Groups'];
	function GroupsCtrl(Groups){
		var self = this;

		Groups.$loaded().then(function(){
			self.groups = Groups;
		});
		// self.groups = Groups.$everyone();
		// console.log(self.groups);
	}
})();