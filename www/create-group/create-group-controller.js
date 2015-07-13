(function(){
	'use strict';

	angular
		.module('app')
		.controller('CreateGroupCtrl', CreateGroupCtrl);

	CreateGroupCtrl.$inject = ['$location', '$rootScope', 'Backend'];
	function CreateGroupCtrl($location, $rootScope, Backend){
		var self = this;

		// functions
		self.createGroup = createGroup;

		// variables
		self.group = {};
		self.group.title = "";
		self.group.description = "";
		self.group.private = false;

		function createGroup(){
			var returnedGroup = Backend.$createGroup(self.group);
				// Add the person to the group
			Backend.$acceptMember(returnedGroup.$id, $rootScope.authData.uid).then(function(){

				Backend.$getDefaultBoard().$loaded(function(_board){
					// TODO - remove this and make it work right
					delete _board.$$conf;
					delete _board.$priority;
					delete _board.$id;

					Backend.$createPersonsBoard(returnedGroup.$id, $rootScope.authData.uid, _board);
				});

				// Backend.$createPersonsBoard(returnedGroup.$id, $rootScope.authData.uid, _board)

				$location.path('/invite-members/' + returnedGroup.$id);	
			});
		}
	}
})();