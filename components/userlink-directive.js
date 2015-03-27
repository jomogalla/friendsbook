(function(){
	'use strict';

	angular
		.module('app')
		.directive('userlink', UserLink);

	UserLink.$inject = ['Profile'];
	function UserLink(Profile){
		var directive = {
			restrict: 'A',
			template: '<a href="#/profile/{{message.user.userid}}">{{message.user.username}}</a>',
			scope: {
				// uid: '=uid'
				// SAME AS ABOVE
				uid: '='
			},
			link:link
		}
		return directive;

		function link(scope, element, attrs){
			console.log(scope);
		}
		
	}
})();