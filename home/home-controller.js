(function(){
	'use strict';

	angular
		.module('app')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['Backend'];
	function HomeCtrl(Backend){
		var self = this;

		self.user = Backend.$getCurrentPerson();
	}
})();