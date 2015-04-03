(function(){
	'use strict';

	angular
		.module('app')
		.directive('chatlink', ChatLink);

	ChatLink.$inject = ['Backend', 'Facebook'];
	function ChatLink(Backend, Facebook){
		var directive = {
			restrict: 'A',
			templateUrl: '/chat/chatlink.html',
			scope: {
				uid: '='
			},
			link:link
		};
		return directive;

		function link(scope, element, attrs){
			// Check our DB first, then check FB
			scope.person = null;

			// scope.person = Backend.$getPerson(scope.uid);
			Backend.$getPerson(scope.uid).$loaded().then(function(person){
				if(person.displayName){
					scope.person = person;
				} else {
					// Facebook backup
					scope.uid = scope.uid.replace('facebook:', '');
					Facebook.getFriendName(scope.uid).then(function(person){
						scope.person = person;
						scope.person.displayName = person.name;
						scope.person.id = person.id;
					});
					
				}
			});
		}
	}
})();