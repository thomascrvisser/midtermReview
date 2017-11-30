angular.module('comment',[])
	.controller('MainCtrl',[
	'$scope','$http',
	function($scope,$http){
		$scope.comments = [];
		$scope.votedCans = [];
	  $scope.create = function(comment) {
   		 return $http.post('/comments', comment).success(function(data){
      			$scope.comments.push(data);
    		});
  	};  
	$scope.addComment = function() {
		  var newObject = {title:$scope.formContent,upvotes:0};
		  $scope.create({
        	     title: $scope.formContent,
        	     upvotes: 0,
      		});
	
		  $scope.formContent = "";
		};
		$scope.incrementUpvotes = function(comment) {
		  $scope.upvote(comment);;  
		};

 $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };

    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };

 		$scope.getAll = function() {
    			return $http.get('/comments').success(function(data){
      			angular.copy(data, $scope.comments);
    			});
  		};
  $scope.getAll();
	



	$scope.vote = function() {
		var numToSend = 0;
		var numSent = 0;
		var toSend = [];
		for(var i = 0; i < $scope.comments.length; i++){
			if($scope.comments[i].doVote){
				numToSend++;
				toSend.push($scope.comments[i]);
			}
			}
		for(i=0; i <toSend.length; i++){
			$http.put("/comments/" + toSend[i]._id + "/upvote").success(function(resp){
					numSent++;
					if(numToSend==numSent){
						$scope.votedCans = toSend;
						$scope.getAll();
						document.getElementById("submitted").style.display = "block";
					}
			});
		}
	}





	}
]);
