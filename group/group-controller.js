
(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupCtrl', GroupCtrl);

	GroupCtrl.$inject = ['$routeParams', 'Backend'];
	function GroupCtrl($routeParams, Backend){
		self = this;

		// self.$state = $state;

		self.group = Backend.$getGroup($routeParams.key);
		self.board = Backend.$getDefaultBoard();

		self.completeSquare = completeSquare;

		self.boards = null;

		Backend.$getGameBoards($routeParams.key).$loaded(function(boards){
			self.boards = boards;
		});

		self.members = Backend.$getMembers($routeParams.key);



		function completeSquare(boardId, squareId) {
			console.log('group id: ' + $routeParams.key);
			console.log('board id: ' + boardId);
			console.log('square id: ' + squareId);

			
		}

	}
})();