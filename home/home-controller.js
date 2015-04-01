(function(){
	'use strict';

	angular
		.module('app')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['People', '$rootScope', 'Friendsbook'];
	function HomeCtrl(People, $rootScope, Friendsbook){
		self = this;

		self.testFriendsBookService = testFriendsBookService;

		self.user = People.$get($rootScope.authData.uid);

		function testFriendsBookService(){
			Friendsbook.$addPerson(23, 23);
		}
	}
})();