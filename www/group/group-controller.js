(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupCtrl', GroupCtrl);

	GroupCtrl.$inject = ['$routeParams', 'Backend'];
	function GroupCtrl($routeParams, Backend){
		self = this;

		self.group = Backend.$getGroup($routeParams.key);
	}
})();