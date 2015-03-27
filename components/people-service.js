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
			$create: function(){
				return $firebaseObject();
			},
			// DONE
			$get: function(uid){
				return $firebaseObject(ref.child(uid));
			},
			$exists: function(uid){
				ref.child(uid).once("value", function(dataSnapshot){
					return dataSnapshot.exists();
				});
			},
			// Needs credentials as well.
			$delete: function (uid){
				return $firebaseObject(ref.child(uid)).$remove();
			}
		}
		return People;
	}

})();