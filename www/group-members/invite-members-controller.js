(function(){
	'use strict';

	angular
		.module('app')
		.controller('InviteMembersCtrl', InviteMembersCtrl);

	InviteMembersCtrl.$invite = ['$stateParams', 'Backend', 'Facebook'];
	function InviteMembersCtrl($stateParams, Backend, Facebook){
		var self = this;

		self.groupId = $stateParams.key;
		self.searchText = "";
		self.group = Backend.$getGroup($stateParams.key);
		self.friends = null;
		self.members = null;

		Facebook.getFriends()
			.then(function(data){
				self.friends = data.data;
			});

		self.members = Backend.$getMembers($stateParams.key);
	}
})();
