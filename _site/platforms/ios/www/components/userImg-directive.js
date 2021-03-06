(function(){
	'use strict';

	angular
		.module('app')
		.directive('userImg', UserImg);

	UserImg.$inject = ['Facebook', 'Backend', '$rootScope'];
	function UserImg(Facebook, Backend, $rootScope){
		var directive = {
			restrict: 'C',
			replace: true,
			templateUrl: 'components/userImg.html',
			scope: {
				uid: '='
			},
			link:link
		}
		return directive;

		function link(scope, element, attrs){
			scope.person = null;

			Backend.$getPerson(scope.uid).$loaded().then(function(person){
				if(person.displayName){
					scope.person = person;
				} else {
					// Grab data from facebook if we dont have it
					Facebook.getFriendName(scope.uid).then(function(person){
						scope.person = person;
						scope.person.displayName = person.name;
						scope.person.id = person.id;
						Facebook.getProfilePictureURL(scope.uid)
							.then(function(url){
								scope.person.profilePhotoURL = url;
							});
					});
				}
			});
		}
	}
})();
