(function(){
	'use strict';

	angular
		.module('app')
		.factory('People', People);

	People.$inject = ['$firebaseObject', '$rootScope', 'Auth'];
	function People($firebaseObject, $rootScope, Auth){
		var ref = new Firebase("https://blistering-torch-1950.firebaseio.com/people");

		var People = {
			// DONE
			$everyone: function(){
				return $firebaseObject(ref);
			},
			$create: function(uid, newUser){
				// return $firebaseObject(ref.child(uid).set(newUser));
				return ref.child(uid).set(newUser);
			},
			// DONE
			$get: function(uid){
				return $firebaseObject(ref.child(uid));
			},
			// $exists: function(uid){
			// 	ref.child(uid).once("value", function(dataSnapshot){
			// 		return dataSnapshot.exists();
			// 	});
			// },
			// Needs credentials as well.
			$delete: function (uid){
				return $firebaseObject(ref.child(uid)).$remove();
			},
			$addToGroup: function (groupId, uid){
				return ref.child('facebook:' + uid).child('groups').child(groupId).set(false);
			},
			$removeFromGroup: function (groupId, uid){
				return ref.child('facebook:' + uid).child('groups').child(groupId).remove();	
			},
			$acceptGroupInvite: function (groupId, uid){
				return ref.child('facebook:' + uid).child('groups').child(groupId).set(true);
			}
		}
		return People;
	}

})();