(function(){
	'use strict';

	angular
		.module('app')
		.factory('Friendsbook', Friendsbook);

		Friendsbook.$inject = ['$firebaseObject', '$firebaseArray', '$firebaseAuth', '$rootScope', '$routeParams'];
		function Friendsbook($firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, $routeParams){
			var ref = new Firebase("https://blistering-torch-1950.firebaseio.com");

			var service = {
				// Person Methods
				$createPerson: createPerson,
				$getPerson: getPerson,
				$editPerson: editPerson,

				// Group Methods
				$createGroup: createGroup,
				$editGroup: editGroup,
				$getGroup: getGroup,
				$getGroups: getGroups,

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
			function createPerson(uid, userObject){
				console.log($rootScope.authData);
				console.log($routeParams.key);
			}

			function getPerson(uid){

			}

			function editPerson(){}

			// Group Functions
			function createGroup(groupObject){

			}

			function editGroup(){

			}

			function getGroup(groupId){

			}

			function getGroups(){}

			// Members Functions
			function inviteMember(groupId, uid){

			}

			function removeMember(groupId, uid){

			}

			function acceptMember(groupId, uid){

			}

			function getMembers(groupId){

			}

			// Message Functions
			function getMessages(groupId){

			}
			function addMessage(groupId, uid, message){}
		}
})();