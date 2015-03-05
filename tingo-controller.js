(function(){
	'use strict';

	angular
		.module("app", [])
		.controller("TingoCtrl", TingoCtrl)
		.controller("CreateCtrl", CreateCtrl);

	var manBoard,
		womanBoard,
		neutralBoard;

	function TingoCtrl(){
		var self = this;

		self.completeSquare = completeSquare;
		self.reset = reset;
		self.ruleChanged = ruleChanged;

		activate();

		self.ruleSet = {
			columns: true,
			rows: true,
			diagonals: true,
			blackout: false
		};

		self.notification = "";

		function completeSquare(square){
			square.completed = true;
			if(checkForBingo()){
				self.notification = "TINGOOOO!!!!";
			}
		}

		function ruleChanged(){
			if(checkForBingo()){
				self.notification = "TINGOOOO!!!!";
			}
			else{
				self.notification = "";
			}
		}

		function reset(){
			for(var i = 0; i < self.bingoBoard.length; i++){
				for(var j = 0; j < self.bingoBoard.length; j++){
					self.bingoBoard[i][j].completed = false;
				}
			}
			self.bingoBoard[2][2].completed = true;
			self.ruleChanged();
		}

		function checkForBingo(){
			// Check for rows
			if(self.ruleSet.rows){
				for(var i = 0; i < self.bingoBoard.length; i++){
					var bingo = true;
					for(var j = 0; j < self.bingoBoard[i].length; j++){
						if(!self.bingoBoard[i][j].completed){bingo = false;}
					}
					if(bingo === true){return true;}
				}
			}

			// Check for columns
			if(self.ruleSet.columns){
				// outer for loop assumes all rows are the same length
				for(var i = 0; i < self.bingoBoard[1].length; i++){
					var bingo = true;
					for(var j = 0; j < self.bingoBoard.length; j++){
						if(!self.bingoBoard[j][i].completed){bingo = false;}
					}
					if(bingo === true){return true;}
				}
			}


			// Check for the two diagonals
			if(self.ruleSet.diagonals){
				// Assuming our bingo board is square

				// Checking for left to right diagonal
				var bingo = true;
				for(var i = 0; i < self.bingoBoard.length; i++){
					if(!self.bingoBoard[i][i].completed){bingo = false;}
				}
				if(bingo === true){return true;}

				// Checking for right to left diagonal
				bingo = true;
				// I want - 0,4 - 1,3 - 2,2 - 3,1 - 4,0
				for(var i = 0; i < self.bingoBoard.length; i++){
					if(!self.bingoBoard[i][self.bingoBoard.length - 1 - i].completed){bingo=false;}
				}
				if(bingo === true){return true;}
			}

			// Check for blackout
			if(self.ruleSet.blackout){
				var bingo = true;
				for(var i = 0; i < self.bingoBoard.length; i++){
					for(var j = 0; j < self.bingoBoard[i].length; j++){
						if(!self.bingoBoard[i][j].completed){bingo = false;}
					}	
				}
				if(bingo === true){return true;}
			}
		}



		function activate(){
			self.bingoBoard = manBoard;
		}
	}

	function CreateCtrl(){
		var self = this;

		self.gameTitle = "";
		self.numberOfPlayers = 0;

		self.addPlayer = addPlayer;
		self.showGenderSpecificBoards = showGenderSpecificBoards;

		self.neutralBoardSelected = false;
		self.manBoardSelected = false;
		self.womanBoardSelected = false;

		self.boardGenders = ["neutral", "men", "women"];
		// self.selectedGender = "female";

		activate();

		self.ruleSet = {
			columns: true,
			rows: true,
			diagonals: true,
			blackout: false
		};

		self.players = [];

		function showGenderSpecificBoards(){
			self.manBoardSelected = false;
			self.womanBoardSelected = false;
			self.neutralBoardSelected = false;
			for(var i = 0; i < self.players.length; i++){
				if(self.players[i].genderInterest === "men"){
					self.manBoardSelected = true;
				}
				if(self.players[i].genderInterest === "women"){
					self.womanBoardSelected = true;
				}
				if(self.players[i].genderInterest === "neutral"){
					self.neutralBoardSelected = true;
				}
			}
		}

		function addPlayer(){
			var newPlayer = {
				"name":"",
				"genderInterest":"neutral"
			};
			self.numberOfPlayers++;
			self.players.push(newPlayer);
			showGenderSpecificBoards();
		}

		function activate(){
			self.manBoard  = manBoard;
			self.womanBoard = womanBoard;
			self.neutralBoard = neutralBoard;
		}
	}

	manBoard = [
				[
					{
						title: "Man Butt Pictures",
						body: "Naked facing away from you, probably in some epic nature shot",
						completed: false
					},{
						title: "Grandma Won't Approve",
						body: "A different ethnicity than your own",
						completed: false
					},{
						title: "The Kim Kardashian",
						body: "Has more than 1 pictures taken with a selfie stick",
						completed: false
					},{
						title: "The Model",
						body: "Professionally taken pictues",
						completed: false
					},{
						title: "The Double Tap",
						body: "Go on two dates in the same night",
						completed: false
					}
				],[
					{
						title: "The Accidental Like",
						body: "You meant to swipe left but accidentally swiped right",
						completed: false
					},{
						title: "The One Night Stand",
						body: "Never seriously date you, but still wants to fuck you",
						completed: false
					},{
						title: "The Never Ending Story",
						body: "You go to at least 3 different locations during your date",
						completed: false
					},{
						title: "Ink Boy",
						body: "More tattoos than you can count",
						completed: false
					},{
						title: "The Longterm",
						body: "You must go on a second date with this person",
						completed: false
					}
				],[
					{
						title: "The Newbie",
						body: "I'm new here, looking for a cutie to show me around!",
						completed: false
					},{
						title: "The Rockstar",
						body: "Must be a musician or in a band (rhetorical statement)",
						completed: false
					},{
						title: "Free Space",
						body: "More room for activities",
						completed: true
					},{
						title: "The Quickie",
						body: "You must go on a date with this person within 24 hours of matching",
						completed: false
					},{
						title: "The Facebook Stalk",
						body: "Has to have a mutual friend with you",
						completed: false
					}
				],[
					{
						title: "The Visitor",
						body: "One night only, this person must be from out of town",
						completed: false
					},{
						title: "Man Bun",
						body: "This person must sport a man bun",
						completed: false
					},{
						title: "Scandalous",
						body: "You must take him to a strip club",
						completed: false
					},{
						title: "Ladies Choice",
						body: "You must go out with someone we pick out",
						completed: false
					},{
						title: "The Portland",
						body: "Must have a beard and glasses",
						completed: false
					}
				],[
					{
						title: "The Gentle Giant",
						body: "Must be over 6'3\"",
						completed: false
					},{
						title: "The Foreigner",
						body: "Someone from a different country",
						completed: false
					},{
						title: "Abs Only",
						body: "Must be topless in a tinder picture",
						completed: false
					},{
						title: "New Tinder Picture",
						body: "Must take photobooth pics on date",
						completed: false
					},{
						title: "Exotic Pet Boy",
						body: "Must have a picture with a lion, tiger or bear",
						completed: false
					}
				]
			];
		womanBoard = [
				[
					{
						title: "Man Butt Pictures",
						body: "Naked facing away from you, probably in some epic nature shot",
						completed: false
					},{
						title: "Grandma Won't Approve",
						body: "A different ethnicity than your own",
						completed: false
					},{
						title: "The Kim Kardashian",
						body: "Has more than 1 pictures taken with a selfie stick",
						completed: false
					},{
						title: "The Model",
						body: "Professionally taken pictues",
						completed: false
					},{
						title: "The Double Tap",
						body: "Go on two dates in the same night",
						completed: false
					}
				],[
					{
						title: "The Accidental Like",
						body: "You meant to swipe left but accidentally swiped right",
						completed: false
					},{
						title: "The One Night Stand",
						body: "Never seriously date you, but still wants to fuck you",
						completed: false
					},{
						title: "The Never Ending Story",
						body: "You go to at least 3 different locations during your date",
						completed: false
					},{
						title: "Ink Boy",
						body: "More tattoos than you can count",
						completed: false
					},{
						title: "The Longterm",
						body: "You must go on a second date with this person",
						completed: false
					}
				],[
					{
						title: "The Newbie",
						body: "I'm new here, looking for a cutie to show me around!",
						completed: false
					},{
						title: "The Rockstar",
						body: "Must be a musician or in a band (rhetorical statement)",
						completed: false
					},{
						title: "Free Space",
						body: "More room for activities",
						completed: true
					},{
						title: "The Quickie",
						body: "You must go on a date with this person within 24 hours of matching",
						completed: false
					},{
						title: "The Facebook Stalk",
						body: "Has to have a mutual friend with you",
						completed: false
					}
				],[
					{
						title: "The Visitor",
						body: "One night only, this person must be from out of town",
						completed: false
					},{
						title: "Man Bun",
						body: "This person must sport a man bun",
						completed: false
					},{
						title: "Scandalous",
						body: "You must take him to a strip club",
						completed: false
					},{
						title: "Ladies Choice",
						body: "You must go out with someone we pick out",
						completed: false
					},{
						title: "The Portland",
						body: "Must have a beard and glasses",
						completed: false
					}
				],[
					{
						title: "The Gentle Giant",
						body: "Must be over 6'3\"",
						completed: false
					},{
						title: "The Foreigner",
						body: "Someone from a different country",
						completed: false
					},{
						title: "Abs Only",
						body: "Must be topless in a tinder picture",
						completed: false
					},{
						title: "New Tinder Picture",
						body: "Must take photobooth pics on date",
						completed: false
					},{
						title: "Exotic Pet Boy",
						body: "Must have a picture with a lion, tiger or bear",
						completed: false
					}
				]
			];
			neutralBoard = [
				[
					{
						title: "Man Butt Pictures",
						body: "Naked facing away from you, probably in some epic nature shot",
						completed: false
					},{
						title: "Grandma Won't Approve",
						body: "A different ethnicity than your own",
						completed: false
					},{
						title: "The Kim Kardashian",
						body: "Has more than 1 pictures taken with a selfie stick",
						completed: false
					},{
						title: "The Model",
						body: "Professionally taken pictues",
						completed: false
					},{
						title: "The Double Tap",
						body: "Go on two dates in the same night",
						completed: false
					}
				],[
					{
						title: "The Accidental Like",
						body: "You meant to swipe left but accidentally swiped right",
						completed: false
					},{
						title: "The One Night Stand",
						body: "Never seriously date you, but still wants to fuck you",
						completed: false
					},{
						title: "The Never Ending Story",
						body: "You go to at least 3 different locations during your date",
						completed: false
					},{
						title: "Ink Boy",
						body: "More tattoos than you can count",
						completed: false
					},{
						title: "The Longterm",
						body: "You must go on a second date with this person",
						completed: false
					}
				],[
					{
						title: "The Newbie",
						body: "I'm new here, looking for a cutie to show me around!",
						completed: false
					},{
						title: "The Rockstar",
						body: "Must be a musician or in a band (rhetorical statement)",
						completed: false
					},{
						title: "Free Space",
						body: "More room for activities",
						completed: true
					},{
						title: "The Quickie",
						body: "You must go on a date with this person within 24 hours of matching",
						completed: false
					},{
						title: "The Facebook Stalk",
						body: "Has to have a mutual friend with you",
						completed: false
					}
				],[
					{
						title: "The Visitor",
						body: "One night only, this person must be from out of town",
						completed: false
					},{
						title: "Man Bun",
						body: "This person must sport a man bun",
						completed: false
					},{
						title: "Scandalous",
						body: "You must take him to a strip club",
						completed: false
					},{
						title: "Ladies Choice",
						body: "You must go out with someone we pick out",
						completed: false
					},{
						title: "The Portland",
						body: "Must have a beard and glasses",
						completed: false
					}
				],[
					{
						title: "The Gentle Giant",
						body: "Must be over 6'3\"",
						completed: false
					},{
						title: "The Foreigner",
						body: "Someone from a different country",
						completed: false
					},{
						title: "Abs Only",
						body: "Must be topless in a tinder picture",
						completed: false
					},{
						title: "New Tinder Picture",
						body: "Must take photobooth pics on date",
						completed: false
					},{
						title: "Exotic Pet Boy",
						body: "Must have a picture with a lion, tiger or bear",
						completed: false
					}
				]
			];
})();
