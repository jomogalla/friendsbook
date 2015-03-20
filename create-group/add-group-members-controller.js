(function(){
	'use strict';

	angular
		.module('app')
		.controller('AddGroupMembersCtrl', AddGroupMembersCtrl);

	AddGroupMembersCtrl.$inject = ['People', 'Groups'];
	function AddGroupMembersCtrl(){
		self = this;

		function createGroup(){
			Groups.$add(self.group).then(function(ref){
				// console.log(data);
				var id = ref.key()
				// console.log(id);
				$location.path('/group/' + id);
			});
		}


	}
})();