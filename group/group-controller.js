(function(){
	'use strict';

	angular
		.module('app')
		.controller('GroupCtrl', GroupCtrl);

	GroupCtrl.$inject = ['$routeParams', '$rootScope','Groups', 'People', 'Messages'];
	function GroupCtrl($routeParams, $rootScope, Groups, People, Messages){
		self = this;

		self.group = null;

		activate();

		function activate(){
			Groups.$loaded().then(function(){
				self.group = Groups.$getRecord($routeParams.key);
			});
		}
	}
})();