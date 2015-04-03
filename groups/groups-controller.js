(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupsCtrl', GroupsCtrl);

	GroupsCtrl.$inject = ['Backend'];
	function GroupsCtrl(Backend){
		var self = this;

		self.groups = null;

		Backend.$getGroups().then(function(groups){
			self.groups = groups;
		});
	}
})();