(function(){
	'use strict';

	angular
		.module('app')
		.directive('userlink', UserLink);

	UserLink.$inject = ['Facebook', 'Backend', '$rootScope'];
	function UserLink(Facebook, Backend, $rootScope){
		var directive = {
			restrict: 'A',
			templateUrl: './components/userlink.html',
			scope: {
				uid: '='
			},
			link:link
		}
		return directive;

		function link(scope, element, attrs){
			scope.friend = null;
			scope.pictureURL = "";


			// handling a facebook:id style id
			if(scope.uid.indexOf('facebook') >= 0){
				scope.uid = scope.uid.replace('facebook:', '');
			}

			Facebook.getFriendName(scope.uid)
				.then(function(data){
					scope.friend = data;
				});
			Facebook.getProfilePictureURL(scope.uid)
				.then(function(url){
					scope.pictureURL = url;
				});

			// Attempt at getting our own user data instead of the slow Facebook data

			// Backend.$getPerson(scope.uid).$loaded().then(function(person){
			// 	console.log(person);
			// 	if(person.displayName){
			// 		scope.person = person;
			// 	} else {
			// 		// Facebook backup
			// 		scope.uid = scope.uid.replace('facebook:', '');
			// 		Facebook.getFriendName(scope.uid).then(function(person){
			// 			scope.person = person;
			// 			scope.person.displayName = person.name;
			// 			scope.person.id = person.id;
			// 		});
					
			// 	}
			// });

		}
		
	}
})();