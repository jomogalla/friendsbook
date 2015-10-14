(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupCtrl', GroupCtrl);

	GroupCtrl.$inject = ['$routeParams', '$stateParams', 'Backend'];
	function GroupCtrl($routeParams, $stateParams, Backend){
		self = this;

		self.group = Backend.$getGroup($stateParams.key);
		self.board = Backend.$getBoard();
		self.members = Backend.$getMembers($stateParams.key);
	}
})();
