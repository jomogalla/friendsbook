(function(){
	'use strict';

	angular
		.module('app')
		.controller('InviteCtrl', InviteCtrl);

	InviteCtrl.$inject = ['$rootScope', 'Backend'];
	function InviteCtrl($rootScope, Backend){
		var self = this;

		self.acceptInvitation = acceptInvitation;
		self.rejectInvitation = rejectInvitation;

		self.currentUser = null;
		self.hasInvitation = true;

		Backend.$getCurrentPerson().$loaded(function(data){
			self.currentUser = data;

			for(var invite in self.currentUser.groups){
				if(!self.currentUser.groups[invite]){
					self.hasInvitation = true;
				}
			}
		});

		function acceptInvitation(groupId){
			Backend.$acceptMember(groupId, self.currentUser.$id);
		}

		function rejectInvitation(groupId){
			Backend.$removeMember(groupId, self.currentUser.$id);
		}
	}
})();