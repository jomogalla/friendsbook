(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupMembersCtrl', GroupMembersCtrl);

	GroupMembersCtrl.$inject = ['$routeParams', '$location', 'Groups', 'People', 'Members'];
	function GroupMembersCtrl($routeParams, $location, Groups, People, Members){
		self = this;
		self.addToGroup = addToGroup;
		self.removeFromGroup = removeFromGroup;
		self.save = save;

		Groups.$loaded().then(function(){
			self.group = Groups.$getRecord($routeParams.key);
		});
		self.members = Members.$everyone($routeParams.key);
		console.log(self.members);

		self.users = People.$everyone();

		function addToGroup(user){
			// var newGroupie = {
			// 	uid: user.uid,
			// 	name: user.username,
			// };
			// console.log(self.group.$id);
			Members.$add($routeParams.key, user.uid);

			//QUESTION Should i just push the user?
			// self.group.members.push(newGroupie);

		}
		function removeFromGroup(uid){
			Members.$remove($routeParams.key, uid);
		}
		function save(){
			console.log('#/group/' + $routeParams.key);
			$location.path('/group/' + $routeParams.key);
		}
		function cancel(){
			
		}
	}
})();