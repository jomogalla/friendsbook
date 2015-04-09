(function(){
	'use strict';

	angular
		.module('app')
		.service('Backend', Backend);

		Backend.$inject = ['$firebaseObject', '$firebaseArray', '$firebaseAuth', '$rootScope', '$routeParams'];
		function Backend($firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, $routeParams){
			var ref = new Firebase("https://blistering-torch-1950.firebaseio.com");

			// FIX - do this for the rest of everything plz
			// var groups = $firebaseArray(ref.child('groups'));

			var service = {
				// Person Methods
				$createPerson: createPerson,
				$getCurrentPerson: getCurrentPerson,
				$getPerson: getPerson,
				$updatePerson: updatePerson,

				// Group Methods
				$createGroup: createGroup,
				$saveGroup: saveGroup,
				$getGroup: getGroup,
				// $getGroups: getGroups,

				// Member Methods
				$inviteMember: inviteMember,
				$removeMember: removeMember,
				$acceptMember: acceptMember,
				$getMembers: getMembers,

				// Message Methods
				$getMessages: getMessages,
				$addMessage: addMessage
			}
			return service;

			// Person Functions
			function createPerson(userObject){
				return ref.child('people').child($rootScope.authData.uid).set(userObject);
			}

			function getCurrentPerson(){
				return $firebaseObject(ref.child('people').child($rootScope.authData.uid));
			}

			function getPerson(uid){
				return $firebaseObject(ref.child('people').child(uid));
			}

			function updatePerson(uid, updatedPerson){
				return ref.child('people').child(uid).update(updatedPerson);
			}

			// Group Functions
			function createGroup(groupObject){
				// var groups = $firebaseArray(ref.child('groups'));
				// var newGroup =  ref.child('groups').push(groupObject);
				// console.log($firebaseObject(newGroup));
				// return newGroup;
				return $firebaseArray(ref.child('groups')).$add(groupObject).then(function(data){
					return data;
				});
				// return groups.$add(groupObject).then(function(data){
				// 	return data;
				// });			
			}

			function saveGroup(groupObject){
				// console.log(groupObject);
				return groupObject.$save();
				// var group = $firebaseObject(ref.child('groups').child(groupObject.$id));
				// group.$save();
				// return groups.$save(groupObject).then(function(data){
				// 	return data;
				// });
			}

			// QUESTION Debating whether or not this should be passed the group id
			function getGroup(groupId){
				return $firebaseObject(ref.child('groups').child(groupId));
				// return groups.$loaded().then(function(){
				// 	return groups.$getRecord(groupId);
				// });
			}

			// function getGroups(){
			// 	return groups.$loaded().then(function(){
			// 		return groups;
			// 	});
			// }

			// Members Functions
			function inviteMember(groupId, uid){
				ref.child('people').child(uid).child('groups').child(groupId).set(false);
				ref.child('members').child(groupId).child(uid).set(false);
				// FIX need to return a promise...
				return ('whatever');
			}

			function removeMember(groupId, uid){
				ref.child('people').child(uid).child('groups').child(groupId).remove();
				ref.child('members').child(groupId).child(uid).remove();
				// FIX need to return a promise...
				return('whatever');
			}

			function acceptMember(groupId, uid){
				ref.child('people').child(uid).child('groups').child(groupId).set(true);
				ref.child('members').child(groupId).child(uid).set(true);
				// FIX need to return a promise...
				return('whatever');
			}

			function getMembers(groupId){
				return $firebaseObject(ref.child('members').child(groupId));
			}

			// Message Functions
			function getMessages(){
				return $firebaseObject(ref.child('messages').child($routeParams.key));
			}
			function addMessage(message){
				return ref.child('messages').child($routeParams.key).push({
					uid: $rootScope.authData.uid,
					message: message
				});
			}
		}
})();