(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupCtrl', GroupCtrl);

	GroupCtrl.$inject = ['$stateParams', '$state', 'Backend'];
	function GroupCtrl($stateParams, $state, Backend){
		self = this;

		self.$state = $state;

		self.group = Backend.$getGroup($stateParams.key);
		self.board = Backend.$getDefaultBoard();

		self.boards = null;

		Backend.$getGameBoards($stateParams.key).$loaded(function(boards){
			self.boards = boards;
		});

		self.members = Backend.$getMembers($stateParams.key);

		// self.currentlySelectedUser = self.members[0];
	}
})();
