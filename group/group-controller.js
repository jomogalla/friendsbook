(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupCtrl', GroupCtrl);

	GroupCtrl.$inject = ['$routeParams', 'Backend'];
	function GroupCtrl($routeParams, Backend){
		self = this;

		self.group = Backend.$getGroup($routeParams.key);

		// activate();

		// function activate(){
		// 	Backend.$getGroup($routeParams.key).then(function(group){
		// 		self.group = group
		// 	});

		// }
	}
})();