(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupMembersCtrl', GroupMembersCtrl);

	GroupMembersCtrl.$inject = ['$routeParams', '$rootScope','$location', 'Groups', 'People', 'Members', 'FriendsList'];
	function GroupMembersCtrl($routeParams, $rootScope, $location, Groups, People, Members, FriendsList){
		self = this;

		// functions
		self.addToGroup = addToGroup;
		self.removeFromGroup = removeFromGroup;
		self.save = save;

		// variables
		self.groupId = $routeParams.key;
		self.group = null;
		self.friends = null;

		activate();

		function activate(){
			Groups.$loaded().then(function(){
				self.group = Groups.$getRecord(self.groupId);
			});

			FriendsList.getFriends($rootScope.authData.facebook.id, $rootScope.authData.facebook.accessToken).then(function(data){
				self.friends = data.data;
			});


			self.members = Members.$everyone(self.groupId);
			self.users = People.$everyone();
		}

		function addToGroup(friend){
			// Members.$add(self.groupId, friend);
			
		}

		function removeFromGroup(uid){
			// Members.$remove(self.groupId, uid);
		}

		function save(){
			$location.path('/group/' + self.groupId);
		}
	}
})();