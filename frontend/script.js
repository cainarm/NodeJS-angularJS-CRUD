var app = angular.module('myApp', []);
app.controller('employees', function($scope, $http) {
    $http.get("http://localhost:3000")
        .then(function (response) {$scope.names = response.data.records;});
    $scope.showme = false;
    
    $scope.modify = function(id) {
        $scope.showme = !$scope.showme;
        for(x=0; x<$scope.names.length; x++){
            if($scope.names[x].id === id){
                $scope.name = $scope.names[x].nome;
                $scope.id = id;
                $scope.action = "modify"; 
                break;
            }
        }

    }
    
    $scope.insert = function(){
        $scope.name = " ";
        $scope.showme = !$scope.showme;
        $scope.action="insert";
    }
    
    $scope.modifySubmit = function(action){
        if(action === "insert"){
            $http.get("http://localhost:3000/insert?nome="+$scope.name)
            .then(function (response) {
                                            $scope.submitStatus = response.data;
                                            $http.get("http://localhost:3000")
                                            .then(function (response) {$scope.names = response.data.records;});                 
                                      });
               
        }
        if(action === "modify"){
            $http.get("http://localhost:3000/update?nome="+$scope.name+"&id="+$scope.id)
            .then(function (response) {
                                            $scope.submitStatus = response.data;
                                            $http.get("http://localhost:3000")
                                            .then(function (response) {$scope.names = response.data.records;});                 
                                      });
           
        }
  
    }
    
    $scope.delete = function(id){
        $http.get("http://localhost:3000/delete?id="+id)
        .then(function (response) {
                                            $scope.submitStatus = response.data;
                                            $http.get("http://localhost:3000")
                                            .then(function (response) {$scope.names = response.data.records;});                 
                                  });     
    }
    

    
    
});
