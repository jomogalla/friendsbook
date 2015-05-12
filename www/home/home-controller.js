(function(){
	'use strict';

	angular
		.module('app')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['Backend', '$ionicSideMenuDelegate'];
	function HomeCtrl(Backend, $ionicSideMenuDelegate){
		var self = this;

		self.currentPerson = Backend.$getCurrentPerson();

		self.toggleLeft = toggleLeft;

		function toggleLeft(){
			$ionicSideMenuDelegate.toggleLeft();
		}
	}
})();
