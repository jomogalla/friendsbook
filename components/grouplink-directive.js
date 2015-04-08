(function(){
	'use strict';

	angular
		.module('app')
		.directive('grouplink', GroupLink);

	GroupLink.$inject = ['Backend', '$routeParams'];
	function GroupLink(Backend, $routeParams){
		var directive = {
			restrict: 'A',
			templateUrl: 'components/grouplink.html',
			scope: {
				groupid: '='
			},
			link:link
		}
		return directive;

		function link(scope, element, attrs){
			scope.group = null;

			// Backend.$getGroup(scope.groupid).then(function(group){
			// 	scope.group = group;
			// });
			scope.group = Backend.$getGroup(scope.groupid)
		}
	}
})();