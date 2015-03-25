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
		self.users = People.$everyone();

		function addToGroup(user){
			Members.$add($routeParams.key, user.uid);
		}

		function removeFromGroup(uid){
			Members.$remove($routeParams.key, uid);
		}

		function save(){
			$location.path('/group/' + $routeParams.key);
		}

		function cancel(){
			
		}
	}
})();