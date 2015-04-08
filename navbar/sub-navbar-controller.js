(function(){
	'use strict';

	angular
		.module('app')
		.controller('SubNavCtrl', SubNavCtrl);

	SubNavCtrl.$inject = ['$location'];
	function SubNavCtrl($location){
		var self = this;

		self.isActive = isActive;

		function isActive(path){
			return $location.path().indexOf(path) > 0;
		}
	}
})();