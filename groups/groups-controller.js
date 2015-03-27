(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupsCtrl', GroupsCtrl);

	GroupsCtrl.$inject = ['Groups'];
	function GroupsCtrl(Groups){
		var self = this;

		self.groups = null;

		Groups.$loaded().then(function(){
			self.groups = Groups;
		});
	}
})();