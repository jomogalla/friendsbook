(function(){
	'use strict';

	angular
		.module('app')
		.filter('FriendSearch', FriendSearch);

		function FriendSearch(){
			return function(friendObject, searchTerm){
				var cleanedFriends = [];

				if(!searchTerm){
					searchTerm = "";
				}

				for(var key in friendObject){
					if(key.indexOf('$') < 0 && key !== 'forEach'){
						if(friendObject[key].username.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0){
							friendObject[key].uid = key;
							cleanedFriends.push(friendObject[key]);
						}
					}
				}

				return cleanedFriends;
			};
		}
})();