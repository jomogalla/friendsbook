(function(){
	'use strict';

	angular
		.module('app')
		.directive('invitebutton', InviteButton);

	InviteButton.$inject = ['Backend'];
	function InviteButton(Backend){
		var directive = {
			restrict: 'C',
			// replace: true,
			templateUrl: 'group-members/invite-button.html',
			scope: {
				uid: '='
			},
			link:link
		};
		return directive;

		function link(scope, element, attrs){
			scope.addToGroup = addToGroup;
			scope.removeFromGroup = removeFromGroup;

			var board = null;


			Backend.$getDefaultBoard().$loaded(function(_board){
				// TODO - remove this and make it work right
				delete _board.$$conf;
				delete _board.$priority;
				delete _board.$id;

				board = _board;
			});

			var members = scope.$parent.vm.members;
			scope.memberStatus;

			members.$loaded().then(function(){
				_updateMemberStatus();
				members.$watch(_updateMemberStatus);
			});

			function addToGroup(friendId){
				Backend.$inviteMember(scope.$parent.vm.groupId, friendId, board);
			}

			function removeFromGroup(friendId){
				Backend.$removeMember(scope.$parent.vm.groupId, friendId);
			}

			function _updateMemberStatus(){
				scope.memberStatus = members[scope.uid];
			}
		}
	}
})();