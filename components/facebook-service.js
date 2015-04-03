(function(){
	'use strict';

	angular
		.module('app')
		.factory('Facebook', Facebook)

	Facebook.$inject = ['$http', '$rootScope'];
	function Facebook($http, $rootScope){
		var accessToken = $rootScope.authData.facebook.accessToken;
		var currentPersonId = $rootScope.authData.facebook.id;

		return ({
			setAuthHeader:setAuthHeader,
			getMe:getMe,
			getFriends:getFriends,
			getFriend:getFriend,
			getFriendName:getFriendName,
			getProfilePictureURL:getProfilePictureURL
		});

		function setAuthHeader(){
			$http.defaults.headers.common.Authorization = 'Bearer' + accessToken;
		}

		function getMe(){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			return $http.get('https://graph.facebook.com/' + currentPersonId)
						.then(function(data, status, headers, config){
							// console.log(data.data);
							return data.data;
						});
		}

		function getFriends(){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			return $http.get('https://graph.facebook.com/' + currentPersonId +'/friends')
						.then(function(data, status, headers, config){
							// console.log(data.data);
							return data.data;
						});
		}
		function getFriend(friendId){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			return $http.get('https://graph.facebook.com/' + friendId)
						.then(function(data, status, headers, config){
							// console.log(data.data);
							return data.data;
						});
		}
		function getFriendName(friendId){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			if(currentPersonId !== friendId){
				return $http.get('https://graph.facebook.com/' + currentPersonId +'/friends/' +friendId)
							.then(function(data, status, headers, config){
								// console.log(data.data);
								return data.data.data[0];
							});
			} else {
				return $http.get('https://graph.facebook.com/' + currentPersonId)
							.then(function(data, status, headers, config){
								// console.log(data.data);
								return data.data;
							});
			}
		}
		function getProfilePictureURL(friendId){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			
			return $http.get('https://graph.facebook.com/' + friendId + '/picture?redirect=false')
						.then(function(data, status, headers, config){
							return data.data.data.url;
						});			
		}
	}
})();