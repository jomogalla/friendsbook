(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupMembersCtrl', GroupMembersCtrl);

	GroupMembersCtrl.$inject = ['$routeParams', '$rootScope','$location', 'Facebook', 'Backend'];
	function GroupMembersCtrl($routeParams, $rootScope, $location, Facebook, Backend){
		var self = this;

		// functions
		self.save = save; 

		// variables
		self.groupId = $routeParams.key;
		self.currentFacebookId = $rootScope.authData.uid;
		self.searchText = "";
		self.group = Backend.$getGroup($routeParams.key);
		self.friends = null;
		self.members = null;
		self.currentUser = null;

		activate();

		function activate(){

			// Backend.$getGroup($routeParams.key).then(function(group){
			// 	self.group = group;
			// });

			Facebook.getFriends($rootScope.authData.uid, $rootScope.authData.facebook.accessToken)
				.then(function(data){
					self.friends = data.data;
				});

			Facebook.getMe().then(function(data){
				self.currentUser = data;
			});

			self.members = Backend.$getMembers(self.groupId);
		}

		function save(){
			$location.path('/group/' + self.groupId);
		}
	}
})();