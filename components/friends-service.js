(function(){
	'use strict';

	angular
		.module('app')
		.factory('FriendsList', FriendsList)

	FriendsList.$inject = ['$http'];
	function FriendsList($http){

		return ({
			setAuthHeader:setAuthHeader,
			getFriends:getFriends,
			getFriend:getFriend,
			getFriendName:getFriendName,
			getProfilePictureURL:getProfilePictureURL
		});

		function setAuthHeader(accessToken){
			$http.defaults.headers.common.Authorization = 'Bearer' + accessToken;
		}

		function getFriends(id, accessToken){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			return $http.get('https://graph.facebook.com/' + id +'/friends')
						.then(function(data, status, headers, config){
							// console.log(data.data);
							return data.data;
						});
		}
		function getFriend(friendId, accessToken){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			return $http.get('https://graph.facebook.com/' + friendId)
						.then(function(data, status, headers, config){
							// console.log(data.data);
							return data.data;
						});
		}
		function getFriendName(id, friendId, accessToken){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			if(id !== friendId){
				return $http.get('https://graph.facebook.com/' + id +'/friends/' +friendId)
							.then(function(data, status, headers, config){
								// console.log(data.data);
								return data.data.data[0];
							});
			} else {
				return $http.get('https://graph.facebook.com/' + id)
							.then(function(data, status, headers, config){
								// console.log(data.data);
								return data.data;
							});
			}
		}
		function getProfilePictureURL(id, accessToken){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			
			return $http.get('https://graph.facebook.com/' + id + '/picture?redirect=false')
						.then(function(data, status, headers, config){
							return data.data;
						});			
		}
	}
})();