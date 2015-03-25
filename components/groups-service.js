(function(){
	'use strict';

	angular
		.module('app')
		.factory('Groups', Groups);

	Groups.$inject = ['$firebaseArray'];
	function Groups($firebaseArray){
		var ref = new Firebase("https://blistering-torch-1950.firebaseio.com/groups");
		return $firebaseArray(ref);
	}
	// function Groups($firebaseObject){
	// 	var ref = new Firebase("https://blistering-torch-1950.firebaseio.com/groups");

	// 	var Groups = {
	// 		// DONE
	// 		$everyone: function(){
	// 			return $firebaseObject(ref);
	// 		},
	// 		$create: function(groupObject){
	// 			return $firebaseObject(ref.$add(groupObject));
	// 		},
	// 		// DONE
	// 		$get: function(groupId){
	// 			return $firebaseObject(ref.child(groupId));
	// 		},
	// 		// Needs credentials as well.
	// 		$delete: function (groupId){
	// 			return $firebaseObject(ref.child(uid)).$remove();
	// 		}
	// 	}
	// 	return Groups;
	// }
})();