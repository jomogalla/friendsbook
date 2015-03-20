(function(){
	'use strict';

	angular
		.module('app')
		.controller('ProfileCtrl', ProfileCtrl);

	ProfileCtrl.$inject = ['$scope','$location', '$rootScope', 'Auth', 'People', 'Relationships', 'Profile', '$firebaseObject', '$q'];
	function ProfileCtrl($scope, $location, $rootScope, Auth, People, Relationships, Profile, $firebaseObject, $q){
		var self = this;

		self.logout = logout;
		self.save = save;
		// self.addFriend = addFriend;
		// self.acceptFriendRequest = acceptFriendRequest;
		// self.rejectFriendRequest = rejectFriendRequest;

		// var user;

		// User.$loaded().then(function(data){
		// 	self.users = User;
		// 	// delete self.users.$id;
		// 	// delete self.users.$priority;
		// })

		// Relationships.$loaded().then(function(data){
		// 	self.relationships = Relationships;
		// 		checkForFriendRequests();

			
		// });
		

		// var ref = new Firebase("https://blistering-torch-1950.firebaseio.com/people/" + $rootScope.authData.uid);
		// var user =  $firebaseObject(ref);
		// console.log(User.$id);
		// var user = User[$rootScope.authData.uid];
		// Profile("simplelogin:1").$loaded().then(function(){
		// 	self.user = Profile("simplelogin:1");
		// 	// console.log(self.user);
		// });
		
		self.user = Profile($rootScope.authData.uid);

		// $q.all([Relationships.$loaded(), User.$loaded(), user.$loaded()]).then(function(){
		$q.all([Relationships.$loaded(), People.$loaded()]).then(function(){
				// user = People[$rootScope.authData.uid];
				// self.user = People[$rootScope.authData.uid];
				// self.user
				

				// Setting up our specific user
				// self.username = user.username;
				// console.log(user.$id);
				// self.uid = user.$id;
				// self.user = People

				// Setting up all users
				// self.users = People;


				// Grabbing all relationships
				// self.relationships = Relationships;
				// self.requests = _checkForFriendRequests();
		});

		// user.$loaded().then(function(data){
		// 		self.username = user.username;
		// 		self.uid = user.uid;
		// 		console.log('user loaded');
		// 	}, function(error){
		// 		console.log('user not loaded');
		// 	});


		if($rootScope.authData.provider === "password"){
			self.email = $rootScope.authData.password.email;
		}

		function save () {
			// user.username = self.username;

			// console.log(user.uid)

	
			self.user.$save().then(function() {
			// user.$save().then(function() {
				console.log('user saved');
			}, function(error) {
				console.log("Error:", error);
			});
		}

		// function addFriend (friendsUID) {
		// 	console.log(friendsUID);
		// 	var newRelationship = {
		// 		'personOne': $rootScope.authData.uid,
		// 		'personTwo': friendsUID,
		// 		'status': 'requested',
		// 	};
		// 	Relationships.$add(newRelationship);
		// }



		function logout () {
			Auth.$unauth();
			Auth.$onAuth(function(authData){
				$rootScope.authData = Auth.$getAuth();
				$location.path('/login');
			});
			
		}

		// function acceptFriendRequest(request){
		// 	console.log(request);
		// 	request.status = 'friends';
		// 	request.$save();

		// }

		// function rejectFriendRequest(request){
		// 	console.log(request);
		// 	request.status = 'rejected';

		// }




		// function _checkForFriendRequests(){
		// 	var friendRequests = [];
			
		// 	console.log(self.relationships);
		// 	for(var i = 0; i < self.relationships.length; i++){
		// 		console.log(self.relationships[i].personOne);
		// 		console.log(self.users[self.relationships[i].personOne].username);


				
		// 		if(self.relationships[i].personTwo === self.uid){
		// 			// console.log(self.relationships[i].personOne.username);
		// 			friendRequests.push(self.relationships[i]);
		// 		}
		// 		// debugger;
		// 	}
		// 	return friendRequests;
		// }


	}

})();