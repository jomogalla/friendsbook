(function(){
	'use strict';

	angular
		.module('app')
		.directive('userlink', UserLink);

	UserLink.$inject = ['FriendsList', '$rootScope'];
	function UserLink(FriendsList, $rootScope){
		var directive = {
			restrict: 'A',
			template: '<img ng-src="{{pictureURL}}" class="img-circle"><a href="#/profile/{{friend.id}}" class="btn">{{friend.name}}</a>',
			scope: {
				uid: '='
			},
			link:link
		}
		return directive;

		function link(scope, element, attrs){
			scope.friend = null;
			scope.pictureURL = "";

			FriendsList.getFriendName($rootScope.authData.facebook.id, scope.uid, $rootScope.authData.facebook.accessToken)
				.then(function(data){
					scope.friend = data;

					// if(sc)
					// console.log(data);
				});
			FriendsList.getProfilePictureURL(scope.uid, $rootScope.authData.facebook.accessToken)
				.then(function(data){
					scope.pictureURL = data.data.url;
				});

		}
		
	}
})();