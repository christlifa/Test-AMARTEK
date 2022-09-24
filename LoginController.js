var app = angular.module('app', []);
app.controller('LoginController', function($scope, $http,$window){
	console.log("LC here");
    $scope.mData = {};
    var dataUserLogin = [{
        username:"admin",
        password:"admin"
    }]

    $scope.doLogin = function(){
        console.log("do click login");
        
		var validationLogin = dataUserLogin.filter(function(item) { 
            return item.username == $scope.mData.username && item.password == $scope.mData.password;  
        });
        console.log("validationLogin",validationLogin);
        if(validationLogin.length == 0){
            Swal.fire({
                title: 'Error!',
                text: 'User Tidak Terdaftar',
                icon: 'error',
                timer: 1000,
				showConfirmButton: false
              });
        }else{
            sessionStorage.setItem("username", validationLogin[0].username);
            $window.location.href = '/Test-AMARTEK/employeepage.html';
        }
    }
}); 