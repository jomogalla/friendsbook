(function () {
	'use strict';
  
	angular
		.module('app', ['ngRoute', 'firebase'])
		.run(runBlock)
		.config(routing);

	routing.$inject = ['$routeProvider'];
	function routing($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl : 'home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm',
				authRequired: true
			})
			.when('/register', {
				// templateUrl : 'register/register.html',
				// controller: 'RegisterCtrl',
				// controllerAs: 'vm',
				// authRequired: false
				redirectTo: '/login'
			})
			.when('/create-group', {
				templateUrl : 'create-group/create-group.html',
				controller: 'CreateGroupCtrl',
				controllerAs: 'vm',
				authRequired: true
			})
			.when('/invites', {
				templateUrl : 'invite/invite.html',
				controller: 'InviteCtrl',
				controllerAs: 'vm',
				authRequired: true
			})
			.when('/settings/:key', {
				templateUrl : 'group-settings/group-settings.html',
				controller: 'GroupSettings',
				controllerAs: 'vm',
				authRequired: true
			})
			.when('/members/:key', {
				templateUrl : 'group-members/group-members.html',
				controller: 'GroupMembersCtrl',
				controllerAs: 'vm',
				authRequired: true
			})
			.when('/login', {
				templateUrl : 'login/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'vm',
				authRequired: false
			})
			.when('/profile', {
				templateUrl : 'profile/profile.html',
				controller: 'ProfileCtrl',
				controllerAs: 'vm',
				authRequired: true					
    		})
    		.when('/profile/:key', {
				templateUrl : 'profile/profile.html',
				controller: 'ProfileCtrl',
				controllerAs: 'vm',
				authRequired: true					
    		})
    		.when('/groups', {
				templateUrl : 'groups/groups.html',
				controller: 'GroupsCtrl',
				controllerAs: 'vm',
				authRequired: true					
    		})
    		.when('/group/:key', {
				templateUrl : 'group/group.html',
				controller: 'GroupCtrl',
				controllerAs: 'vm',
				authRequired: true					
    		})
    		.when('/chat/:key', {
				templateUrl : 'chat/chat.html',
				controller: 'ChatCtrl',
				controllerAs: 'vm',
				authRequired: true					
    		})
    		.otherwise({
    			redirectTo: '/login'
    		});
	}

	runBlock.$inject = ['$rootScope', '$location', 'Auth'];
	function runBlock($rootScope, $location, Auth){
		$rootScope.authData = Auth.$getAuth();

		if ($rootScope.authData) {
			console.log("User " + $rootScope.authData.uid + " is logged in with " + $rootScope.authData.provider);
			// console.log($rootScope.authData);
		} else {
			console.log("User is logged out");
		}

		$rootScope.$on('$routeChangeStart', function(event, next){
			if(next.authRequired && !$rootScope.authData){
				$location.path('/login');
			}else if($rootScope.authData && (next.templateUrl === 'login/login.html' || next.templateUrl === 'register/register.html')){
				$location.path('/groups');
			}
		});
	}

})();