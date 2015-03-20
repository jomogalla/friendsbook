(function(){
	'use strict';

	angular
		.module('app')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['Profile', '$rootScope'];
	function HomeCtrl(Profile, $rootScope){
		self = this;

		self.user = Profile($rootScope.authData.uid);
	}
})();