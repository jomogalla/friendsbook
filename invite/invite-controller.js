(function(){
	'use strict';

	angular
		.module('app')
		.controller('InviteCtrl', InviteCtrl);

	InviteCtrl.$inject = ['$rootScope', 'People', 'Members'];
	function InviteCtrl($rootScope, People, Members){
		var self = this;

		self.acceptInvitation = acceptInvitation;
		self.rejectInvitation = rejectInvitation;

		self.currentUser = null;
		self.hasInvitation = false;

		People.$get($rootScope.authData.uid).$loaded(function(data){
			self.currentUser = data;

			for(var invite in self.currentUser.groups){
				// console.log(self.currentUser.groups[invite]);
				if(!self.currentUser.groups[invite]){
					self.hasInvitation = true;
				}
			}
		});

		function acceptInvitation(groupId){
			// console.log('invitation accepted - ' + groupId);
			Members.$acceptRequest(groupId, $rootScope.authData.facebook.id);
			People.$acceptGroupInvite(groupId, $rootScope.authData.facebook.id);
		}

		function rejectInvitation(groupId){
			// console.log('invitation rejected - ' + groupId);
			Members.$remove(groupId, $rootScope.authData.facebook.id);
			People.$removeFromGroup(groupId, $rootScope.authData.facebook.id);
		}
	}
})();