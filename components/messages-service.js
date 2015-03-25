(function(){
	'use strict';

	angular
		.module('app')
		.factory('Messages', Messages);

	Messages.$inject = ['$firebaseObject'];
	function Messages($firebaseObject){
		var ref = new Firebase("https://blistering-torch-1950.firebaseio.com/messages");

		var Members = {
			// DONE
			$getAll: function(groupKey){
				return $firebaseObject(ref.child(groupKey));
			},
			$add: function(groupKey, uid, message){
				return ref.child(groupKey).push({
					uid: uid,
					message: message
				});
			},
		}
		return Members;
	}
})();