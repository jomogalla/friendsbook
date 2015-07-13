(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupCtrl', GroupCtrl);

	GroupCtrl.$inject = ['$routeParams', '$stateParams', 'Backend'];
	function GroupCtrl($routeParams, $stateParams, Backend){
		self = this;

		self.group = Backend.$getGroup($stateParams.key);
		self.board = Backend.$getDefaultBoard();
		self.boards = Backend.$getGameBoards($stateParams.key);
		self.members = Backend.$getMembers($stateParams.key);

		self.currentlySelectedUser = self.members[0];
	}
})();
