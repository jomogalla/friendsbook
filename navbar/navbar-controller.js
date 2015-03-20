(function(){
	'use strict';

	angular
		.module('app')
		.controller('NavbarCtrl', NavbarCtrl);

	NavbarCtrl.$inject = ['$location'];
	function NavbarCtrl($location){
		self = this;

		self.isActive = isActive;

		function isActive(path){
			return path === $location.path().replace("/", "");
		}
	}
})();