(function(){
	'use strict';

	angular
		.module('app')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['People', '$rootScope'];
	function HomeCtrl(People, $rootScope){
		self = this;

		self.user = People.$get($rootScope.authData.uid);
	}
})();