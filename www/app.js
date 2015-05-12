(function () {
	'use strict';

	angular
		.module('app', ['ionic', 'ngRoute', 'firebase'])
		.run(runBlock)
		.config(routing);

	routing.$inject = ['$stateProvider', '$urlRouterProvider'];
	function routing($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('sidemenu', {
				url : '/sidemenu',
				templateUrl : 'navbar/sidemenu.html',
				abstract : true,
				// controller : 'FstController'
				authRequired: true
			})
			.state('sidemenu.home', {
				url: '/home',
				// templateUrl: 'home/home.html',
				// controller: 'HomeCtrl as vm',
				views: {
					'pageContent' :{
						templateUrl: "home/home.html",
						controller: 'HomeCtrl as vm'
					}
				},
				authRequired: true
			})
			.state('group', {
				url: '/group/:key',
				templateUrl : 'group/group.html',
				controller: 'GroupCtrl as vm',
				// views: {
				// 	'pageContent' :{
				// 		templateUrl : 'group/group.html',
				// 		controller: 'GroupCtrl as vm'
				// 	}
				// },
				authRequired: true
    		})
			.state('sidemenu.profile', {
				url: '/profile',
				// templateUrl : 'profile/profile.html',
				// controller: 'ProfileCtrl as vm',
				views: {
					'pageContent' :{
						templateUrl : 'profile/profile.html',
						controller: 'ProfileCtrl as vm',
					}
				},
				authRequired: true
			})
			.state('create-group', {
				url: '/create-group',
				templateUrl: 'create-group/create-group.html',
				controller: 'CreateGroupCtrl as vm',
				authRequired: true
			})
			.state('invites', {
				url: '/invites',
				templateUrl : 'invite/invite.html',
				controller: 'InviteCtrl as vm',
				authRequired: true
			})
			.state('settings', {
			// .state('group.settings', {
				url: '/settings/:key',
				templateUrl : 'group-settings/group-settings.html',
				controller: 'GroupSettings as vm',
				authRequired: true
			})
			.state('invite', {
			// .state('group.invite', {
				url: '/invite-members/:key',
				templateUrl : 'group-members/invite-members.html',
				controller: 'InviteMembersCtrl as vm',
				authRequired: true
			})
			.state('members', {
			// .state('group.members', {
				url: '/members/:key',
				templateUrl : 'group-members/group-members.html',
				controller: 'GroupMembersCtrl as vm',
				authRequired: true
			})
			.state('login', {
				url: '/login',
				templateUrl : 'login/login.html',
				controller: 'LoginCtrl as vm',
				authRequired: false
			})
    		// .state('/profile/:key', {
			// 	url: '/profile/:key',
			// 	templateUrl : 'profile/profile.html',
			// 	controller: 'ProfileCtrl',
			// 	controllerAs: 'vm',
			// 	authRequired: true
    		// })
    		.state('groups', {
				url: '/groups',
				templateUrl : 'groups/groups.html',
				controller: 'GroupsCtrl as vm',
				authRequired: true
    		})
    		.state('chat', {
    		// .state('group.chat', {
				url: '/chat/:key',
				templateUrl : 'chat/chat.html',
				controller: 'ChatCtrl as vm',
				authRequired: true
    		});
    		$urlRouterProvider.otherwise('/sidemenu/home');
	}

	runBlock.$inject = ['$rootScope', '$location', 'Auth', '$ionicPlatform'];
	function runBlock($rootScope, $location, Auth, $ionicPlatform){
		// FBC.init(679172528872512);

		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleLightContent();
			}
		});


		$rootScope.authData = Auth.$getAuth();

		if ($rootScope.authData) {
			console.log("User " + $rootScope.authData.uid + " is logged in with " + $rootScope.authData.provider);
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
