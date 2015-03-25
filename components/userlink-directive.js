(function(){
	'use strict';

	angular
		.module('app')
		.directive('userlink', UserLink);

	UserLink.$inject = [];
	function UserLink(){
		var directive = {
			restrict: 'A',
			template: '<a href="#/profile/{{message.user.userid}}">{{message.user.username}}</a>',
			scope: {
				// uid: '=uid'
				// SAME AS ABOVE
				uid: '='
			},
		}
		return directive;

		
	}
})();