(function(){
	'use strict';

	angular
		.module('app')
		.controller('SquareCtrl', SquareCtrl);

	SquareCtrl.$inject = ['$stateParams', '$location', '$rootScope', 'Backend'];
	function SquareCtrl($stateParams, $location, $rootScope, Backend){
		var self = this;

		self.me = Backend.$getCurrentPerson();
		self.group = Backend.$getGroup($stateParams.key);
	}
})();