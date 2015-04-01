(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupMembersCtrl', GroupMembersCtrl);

	GroupMembersCtrl.$inject = ['$routeParams', '$rootScope','$location', 'Groups', 'People', 'Members', 'FriendsList', 'Friendsbook'];
	function GroupMembersCtrl($routeParams, $rootScope, $location, Groups, People, Members, FriendsList, Friendsbook){
		self = this;

		// functions
		self.addToGroup = addToGroup;
		self.removeFromGroup = removeFromGroup;
		self.save = save;
		self.testFriendsBookService = testFriendsBookService; 

		// variables
		self.groupId = $routeParams.key;
		self.searchText = "";
		self.group = null;
		self.friends = null;
		self.currentUser = $rootScope.authData.facebook;
		// self.currentUser = People.$get($rootScope.authData.uid);

		activate();

		function activate(){
			Groups.$loaded().then(function(){
				self.group = Groups.$getRecord(self.groupId);
			});

			FriendsList.getFriends($rootScope.authData.facebook.id, $rootScope.authData.facebook.accessToken)
				.then(function(data){
					self.friends = data.data;
				});


			self.members = Members.$everyone(self.groupId);
			self.users = People.$everyone();
		}

		function addToGroup(friendId){
			// console.log(friendId);
			Members.$add(self.groupId, friendId);
			People.$addToGroup(self.groupId, friendId);

		}

		function removeFromGroup(friendId){
			Members.$remove(self.groupId, friendId);
			People.$removeFromGroup(self.groupId, friendId);
		}

		function save(){
			$location.path('/group/' + self.groupId);
		}

		function testFriendsBookService(){
			Friendsbook.$addPerson(23, 23);
		}
	}
})();