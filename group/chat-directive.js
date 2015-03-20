(function(){
	angular
		.module('app')
		.directive('chat', Chat);

	Chat.$inject = [];
	function Chat(){
		var directive = {
			require:'^GroupCtrl',
			// controller: 'GroupCtrl',
			link: link,
			templateURL: './chat.html'
		};

		return directive;

		function link(scope, element, attrs){
			console.log(scope);
			element.on('submit', autoScroll);

			scope.$watch('scope.vm.messages', function(){
				console.log('watch');
			})

			// console.log(element.parent().find('well'));
			function autoScroll(){
				element[0].scrollTop = element[0].scrollHeight;
				// console.log('yolo');
			}
		}
	}
})();