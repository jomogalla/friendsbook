(function(){
	'use strict';

	angular
		.module('app')
		.filter('FriendSearch', FriendSearch);

		function FriendSearch(){
			return function(friendObject, searchTerm){
				var cleanedFriends = [];

				for(var index in friendObject){
					if(friendObject[index].name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0){
						cleanedFriends.push(friendObject[index]);
					}
				}
				return cleanedFriends;
			};
		}
})();