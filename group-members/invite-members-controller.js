(function(){
	'use strict';

	angular
		.module('app')
		.controller('InviteMembersCtrl', InviteMembersCtrl);

	InviteMembersCtrl.$invite = ['$routeParams', 'Backend', 'Facebook'];
	function InviteMembersCtrl($routeParams, Backend, Facebook){
		var self = this;

		self.groupId = $routeParams.key;
		self.searchText = "";
		self.group = Backend.$getGroup($routeParams.key);
		self.friends = null;
		self.members = null;

		// Backend.$getGroup($routeParams.key)
		// 	.then(function(group){
		// 		self.group = group;
				
		// 	});

		Facebook.getFriends()
			.then(function(data){
				self.friends = data.data;
			});

		self.members = Backend.$getMembers($routeParams.key);
	}
})();