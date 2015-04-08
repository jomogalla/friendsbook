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
							return _addUid(data.data);
						});
		}

		function getFriends(){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			return $http.get('https://graph.facebook.com/' + currentPersonId +'/friends')
						.then(function(data, status, headers, config){
							for(var i = 0; i < data.data.data.length; i++){
								_addUid(data.data.data[i]);
							}
							return data.data;
						});
		}

		function getFriend(friendId){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

			return $http.get('https://graph.facebook.com/' + _cleanId(friendId))
						.then(function(data, status, headers, config){
							return _addUid(data.data);
						});
		}

		function getFriendName(friendId){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

			if(_cleanId(currentPersonId) !== _cleanId(friendId)){
				return $http.get('https://graph.facebook.com/' + _cleanId(currentPersonId) +'/friends/' + _cleanId(friendId))
							.then(function(data, status, headers, config){
								return _addUid(data.data.data[0]);
							});
			} else {
				return $http.get('https://graph.facebook.com/' + _cleanId(currentPersonId))
							.then(function(data, status, headers, config){
								// console.log(data.data);
								return _addUid(data.data);
							});
			}
		}
		function getProfilePictureURL(friendId){
			$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

			return $http.get('https://graph.facebook.com/' + _cleanId(friendId) + '/picture?redirect=false')
						.then(function(data, status, headers, config){
							return data.data.data.url;
						});			
		}

		function _addUid(friend){
			if(friend !== undefined){
				friend.uid = 'facebook:' + friend.id;
			}
			return friend;
		}
		
		function _cleanId(id){
			id = id.replace('facebook:', '');
			return id;
		}
	}
})();