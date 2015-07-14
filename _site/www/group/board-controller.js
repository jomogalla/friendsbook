(function(){
	'use strict';

	angular
		.module('app')
		.controller('BoardCtrl', BoardCtrl);

	BoardCtrl.$inject = ['$stateParams', 'Backend'];
	function BoardCtrl($stateParams, Backend){
		var self = this;

		self.board = null
		self.boardId = $stateParams.user;
		self.groupId = $stateParams.key;

		Backend.$getGameBoard($stateParams.key, $stateParams.user).$loaded(function(board){
			self.board = board;
		})
	}
})();