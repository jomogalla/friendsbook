(function(){
	'use strict';

	angular
		.module('app')
		.controller('CreateGroupCtrl', CreateGroupCtrl);

	CreateGroupCtrl.$inject = ['$location','People', 'Groups'];
	function CreateGroupCtrl($location, People, Groups){
		self = this;

		self.createGroup = createGroup;
		self.addToGroup = addToGroup;
		self.removeFromGroup = removeFromGroup;

		var friendsBook = {username:'friendsBook'};
		var groupCreationTime = new Date();

		self.group = {};
		self.group.title = "";
		self.group.description = "";
		self.group.members = [];
		self.group.messages = [
			{
				user: friendsBook,
				time: groupCreationTime,
				text: 'Welcome to friendsbook chat'
			}];

		People.$loaded().then(function(){
			self.users = People;
		});

		function addToGroup(user){
			var newGroupie = {
				uid: user.uid,
				name: user.username,
			};

			//QUESTION Should i just push the user?
			self.group.members.push(newGroupie);

		}
		function removeFromGroup(user){

		}
		function redirectToAddMembersStep(){
			
		}

		function createGroup(){
			Groups.$add(self.group).then(function(ref){
				var id = ref.key()
				$location.path('/group/' + id);
			});
		}
	}
})();