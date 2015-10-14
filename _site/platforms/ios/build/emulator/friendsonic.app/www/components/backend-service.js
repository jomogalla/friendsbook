(function(){
	'use strict';

	angular
		.module('app')
		.service('Backend', Backend);

		Backend.$inject = ['$firebaseObject', '$firebaseArray', '$firebaseAuth', '$rootScope', '$stateParams','$q'];
		function Backend($firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, $stateParams, $q){
			var ref = new Firebase("https://blistering-torch-1950.firebaseio.com");

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
				$addMessage: addMessage,

				$getBoard: getBoard
			}
			return service;

			// ***** PERSON FUNCTIONS ***** //
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

			// ***** GROUP FUNCTIONS ***** //
			function createGroup(groupObject){
				return $firebaseObject(ref.child('groups').push(groupObject));
			}

			function saveGroup(groupObject){
				return groupObject.$save();
			}

			// QUESTION Debating whether or not this should be passed the group id
			function getGroup(groupId){
				return $firebaseObject(ref.child('groups').child(groupId));
			}

			// ***** MEMBER FUNCTIONS ***** //
			function inviteMember(groupId, uid){
				return $q.all(
					ref.child('people').child(uid).child('groups').child(groupId).set(false),
					ref.child('members').child(groupId).child(uid).set(false)
				);
			}

			function removeMember(groupId, uid){
				return $q.all(
					ref.child('people').child(uid).child('groups').child(groupId).remove(),
					ref.child('members').child(groupId).child(uid).remove()
				);
			}

			function acceptMember(groupId, uid){
				return $q.all(
					ref.child('people').child(uid).child('groups').child(groupId).set(true),
					ref.child('members').child(groupId).child(uid).set(true)
				);
			}

			function getMembers(groupId){
				return $firebaseObject(ref.child('members').child(groupId));
			}

			// ***** MESSAGE FUNCTIONS ***** //
			function getMessages(){
				return $firebaseObject(ref.child('messages').child($stateParams.key));
			}
			function addMessage(message){
				return ref.child('messages').child($stateParams.key).push({
					uid: $rootScope.authData.uid,
					message: message
				});
			}

			// BOARD
			function getBoard(){
				return $firebaseObject(ref.child('boards').child('newBoard'));
			}
		}
})();
