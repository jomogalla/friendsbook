(function(){
	'use strict';

	angular
		.module('app')
		.controller('SquareCtrl', SquareCtrl);

	SquareCtrl.$inject = ['$stateParams', '$state', 'Backend'];
	function SquareCtrl($stateParams, $state, Backend){
		var self = this;

		self.square = null;

		self.completeSquare = completeSquare;

		self.boardId = $stateParams.board;
		self.groupId = $stateParams.group;

		Backend.$getSquare($stateParams.group, $stateParams.board, $stateParams.square).$loaded(function(square){
			self.square  = square;
		})

		function completeSquare (){
			self.square.completed = true;
			self.square.$save();

			// window.setTimeout(function(){
			// 	$state.go('group.board({key: self.groupId, user: self.boardId})');
			// }, 1500);
		}

	}
})();