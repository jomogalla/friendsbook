(function(){
	'use strict';

	angular
		.module('app')
		.controller('CreateBoardCtrl', CreateBoardCtrl);

	CreateBoardCtrl.$inject = ['Backend'];
	function CreateBoardCtrl(Backend){
		var self = this;

		self.board = [];

		self.boardName = null;

		self.boardCreated = false;

		self.createBoard = createBoard;

		initializeBoard();


		function createBoard(){
			for (var i = 0; i < self.board.length; i++) {
				// self.board[i] = angular.toJson(self.board[i]);
				delete self.board[i].$$hashkey;
			}

			// self.board = angular.toJson(self.board);

			// console.log(self.board);
			Backend.$makeGameBoard(self.boardName, self.board);
			// Backend.$makeGameBoard(self.boardName, self.board).onComplete(function(){
			// 	initializeBoard();

			// 	self.boardCreated = true;

			// });
		}

		function initializeBoard(){
			for (var i = 0; i < 25; i++) {
				self.board.push({title: '', description: '', completed: false});
			}
			self.board[12].title = 'Free Space';
			self.board[12].completed = true;
		}
	}
})();