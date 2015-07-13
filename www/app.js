(function () {
	'use strict';

	angular
		.module('app', ['ionic', 'ngRoute', 'firebase'])
		.run(runBlock)
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function config($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('app', {
				url : '/app',
				templateUrl : 'navbar/sidemenu.html',
				controller: 'SidemenuCtrl as menu',
				abstract : true,
				authRequired: true
			})
			.state('app.home', {
				url: '/home',
				views: {
					'pageContent' :{
						templateUrl: "home/home.html",
						controller: 'HomeCtrl as vm'
					}
				},
				authRequired: true
			})
			.state('app.profile', {
				url: '/profile',
				views: {
					'pageContent' :{
						templateUrl : 'profile/profile.html',
						controller: 'ProfileCtrl as vm',
					}
				},
				authRequired: true
			})
			.state('app.invites', {
				url: '/invites',
				views: {
					'pageContent' :{
						templateUrl : 'invite/invite.html',
						controller: 'InviteCtrl as vm',
					}
				},
				// templateUrl : 'invite/invite.html',
				// controller: 'InviteCtrl as vm',
				authRequired: true
			})
			.state('group', {
				url: '/group/:key',
				templateUrl : 'group/group.html',
				controller: 'GroupCtrl as vm',
				authRequired: true
    		})
    		.state('group.board', {
				url: '/board/:user',
				templateUrl : 'group/board.html',
				controller: 'GroupCtrl as vm',
				authRequired: true
    		})
    		.state('group.board.square', {
				url: '/square/:square',
				templateUrl : 'group/square.html',
				controller: 'SquareCtrl as vm',
				authRequired: true
    		})
    		.state('square', {
				url: '/square/:key/:user/:square',
				templateUrl : 'square/square.html',
				controller: 'SquareCtrl as vm',
				authRequired: true
    		})
			.state('create-group', {
				url: '/create-group',
				templateUrl: 'create-group/create-group.html',
				controller: 'CreateGroupCtrl as vm',
				authRequired: true
			})

			.state('settings', {
				url: '/settings/:key',
				templateUrl : 'group-settings/group-settings.html',
				controller: 'GroupSettings as vm',
				authRequired: true
			})
			.state('invite', {
				url: '/invite-members/:key',
				templateUrl : 'group-members/invite-members.html',
				controller: 'InviteMembersCtrl as vm',
				authRequired: true
			})
			.state('members', {
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
    		.state('chat', {
				url: '/chat/:key',
				templateUrl : 'chat/chat.html',
				controller: 'ChatCtrl as vm',
				authRequired: true
    		});
    		$urlRouterProvider.otherwise('/login');
	}

	runBlock.$inject = ['$rootScope', 'Auth', '$ionicPlatform', '$state'];
	function runBlock($rootScope, Auth, $ionicPlatform, $state){

		if(!$rootScope.authData){
			$rootScope.authData = Auth.$getAuth();
		}
		

		// if(!$rootScope.authData){
		// 	facebookConnectPlugin.getAccessToken(gotAccessToken, notAccessToken);

		// 	function gotAccessToken(response){
		// 		Auth.$authWithOAuthToken("facebook", response).then(function(authData) {
		// 			$rootScope.authData = authData;
		// 			$state.go('sidemenu.home');
		// 		});
		// 	}

		// 	function notAccessToken(response){
		// 		console.log(response);
		// 	}
		// }

		$ionicPlatform.on("deviceready", function(){


			facebookConnectPlugin.browserInit(679172528872512);
			// if (!window.cordova) {
				//this is for browser only
				// facebookConnectPlugin.browserInit(679172528872512);
			// }


			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});

		$ionicPlatform.on("resume", function(){
			facebookConnectPlugin.getLoginStatus(function(success){
				if(success.status === 'connected'){
					facebookConnectPlugin.getAccessToken(gotAccessToken, notAccessToken);

				} else {
					$state.go('login');
				}
			});
		});

		// UI Router Authentication Check
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
			if (toState.authRequired) {
				facebookConnectPlugin.getLoginStatus(function(success){
					if(success.status !== 'connected') {
						event.preventDefault();
						$state.go('login');
					}
				},
				function(fail){
				});
			}
		});

		function gotAccessToken(response){
			Auth.$authWithOAuthToken("facebook", response).then(function(authData) {
				$rootScope.authData = authData;
				$state.go('app.home');
			});
		}
		function notAccessToken(response){
			console.log(response);
		}
	}



})();
