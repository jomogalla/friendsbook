
(function(){
	'use strict';

	angular
		.module('app')
		.controller('SquareCtrl', SquareCtrl);

	SquareCtrl.$inject = ['$routeParams', '$state', 'Backend'];
	function SquareCtrl($routeParams, $state, Backend){
		var self = this;

		self.square = null;

		self.completeSquare = completeSquare;

		self.boardId = $routeParams.board;
		self.groupId = $routeParams.group;

		Backend.$getSquare($routeParams.group, $routeParams.board, $routeParams.square).$loaded(function(square){
			self.square  = square;
		});

		function completeSquare (){
			self.square.completed = true;
			self.square.$save();
		}

	}
})();