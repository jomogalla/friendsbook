(function(){
	'use strict';

	angular
		.module('app')
		.factory('FriendsList', FriendsList)

	FriendsList.$inject = ['$http'];
	function FriendsList($http){

		return ({
			setAuthHeader: setAuthHeader,
			getFriends: getFriends
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
	}
})();