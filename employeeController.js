var app = angular.module('app', []);
app.controller('EmployeeController', function($scope, $http,$window,$filter){
	console.log("Employee here");
    
    $scope.formList = true;
    var getLoginUser = sessionStorage.getItem("username");
    $scope.mData = {};
    console.log("getLoginUser",getLoginUser);
    if(getLoginUser == null){

        $window.location.href = '/Test-AMARTEK/login.html';
    }
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.q = '';
    $scope.data = [
      {
        username:"Jhon User",
        firstName :"Jhon",
        lastName : "Cabage",
        email : "Jhon@gmail.com",
        birthDate: "05/03/1998",
        basicSalary:9100000,
        status:"Belum Lulus",
        group:"F",
        description:"05/03/1998"
      },
      {
        username:"Adele User",
        firstName :"Adele",
        lastName : "Lisa",
        email : "Lisa@gmail.com",
        birthDate: "06/07/1994",
        basicSalary:10000000,
        status:"Belum Lulus",
        group:"E",
        description:"06/07/1994"
      },
      {
        username:"Angel User",
        firstName :"Angel",
        lastName : "Rafa",
        email : "Angel@gmail.com",
        birthDate: "04/07/2004",
        basicSalary:1200000,
        status:"Belum Lulus",
        group:"D",
        description:"04/07/2004"
      },
      {
        username:"Rachael User",
        firstName :"Rachael",
        lastName : "Geral",
        email : "Rachael@gmail.com",
        birthDate: "12/12/1992",
        basicSalary:4900000,
        status:"Belum Lulus",
        group:"C",
        description:"12/12/1992"
      },
      {
        username:"Eki User",
        firstName :"Eki",
        lastName : "Zulvian",
        email : "Eki@gmail.com",
        birthDate: "10/02/1992",
        basicSalary:4500000,
        status:"Belum Lulus",
        group:"B",
        description:"10/02/1992"
      },
      {
        username:"Imam User",
        firstName :"Imam",
        lastName : "Maulana",
        email : "Imam@gmail.com",
        birthDate: "01/02/1982",
        basicSalary:5000000,
        status:"Belum Lulus",
        group:"A",
        description:"01/02/1982"
      },
    ]

    
		$scope.DataGroup = [{
      GroupId:1,
      GroupName:"A"
    },{
      GroupId:2,
      GroupName:"B"
    },{
      GroupId:3,
      GroupName:"C"
    },{
      GroupId:4,
      GroupName:"D"
    },{
      GroupId:5,
      GroupName:"E"
    },{
      GroupId:6,
      GroupName:"F"
    },{
      GroupId:7,
      GroupName:"G"
    },{
      GroupId:8,
      GroupName:"H"
    },{
      GroupId:9,
      GroupName:"I"
    },{
      GroupId:10,
      GroupName:"J"
    }]
    
    $scope.getData = function () {
      return $filter('filter')($scope.data, $scope.q)
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    $scope.sort = {
      column: '',
      descending: false
    };

    $scope.changeSorting = function(column) {

      var sort = $scope.sort;

      if (sort.column == column) {
          sort.descending = !sort.descending;
      } else {
          sort.column = column;
          sort.descending = false;
      }
    };

    $scope.clickAction = function(param,data){
      console.log("data",data);
      if(param == 1){
        Swal.fire({
          title: 'Edit Data '+data.username,
          text: '',
          icon: 'warning',
          timer: 1000,
          showConfirmButton: false
        });
      }else if(param == 2){

        Swal.fire({
          title: 'Delete Data '+data.username,
          text: '',
          icon: 'error',
          timer: 1000,
          showConfirmButton: false
        });
      }else{
        
        $scope.formList = false;
        $scope.formDetail = true;
        data.birthDate = changeFormatDate(data.birthDate);
        data.description = changeFormatDate(data.description);
        $scope.dataDetail = data;
      }
    }

    function changeFormatDate(item) {
      var tmpDate = item;
      tmpDate = new Date(tmpDate);
      var finalDate
      var yyyy = tmpDate.getFullYear().toString();
      var mm = (tmpDate.getMonth() + 1).toString(); // getMonth() is zero-based         
      var dd = tmpDate.getDate().toString();
      finalDate = (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy ;
      return finalDate;
    }

    $scope.doOK = function(){
      
      $scope.formList = true;
      $scope.formDetail = false;
    }
    
    $scope.doTambah = function(){
      
      $scope.formList = false;
      $scope.formTambah = true;
      $scope.mData.username = undefined
      $scope.mData.firstName = undefined
      $scope.mData.lastName = undefined
      $scope.mData.email = undefined
      $scope.mData.birthDate = undefined
      $scope.mData.basicSalary = undefined
      $scope.mData.status = undefined
      $scope.mData.Group = undefined
      $scope.mData.description = undefined
      console.log("$scope.DataGroup",$scope.DataGroup);
    }

    $scope.doCancel = function(){
      
      $scope.formList = true;
      $scope.formTambah = false;
    }

    $scope.doSave = function(){
      if($scope.mData.username == undefined || $scope.mData.firstName == undefined || $scope.mData.lastName == undefined || $scope.mData.email == undefined || $scope.mData.birthDate == undefined || $scope.mData.basicSalary == undefined || $scope.mData.status == undefined || $scope.mData.Group == undefined || $scope.mData.description == undefined){

        Swal.fire({
          title: 'Error !',
          text: 'Inputan tidak boleh ada yang kosong',
          icon: 'error',
          timer: 1000,
          showConfirmButton: false
        });
      }else{
        var rs = $scope.mData.email;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (rs.match(mailformat))
        {
            console.log("email falid");
        }else{
          console.log("rs.match(mailformat)",rs.match(mailformat));
          Swal.fire({
            title: 'Error !',
            text: 'Alamat Email Tidak Valid',
            icon: 'error',
            timer: 1000,
            showConfirmButton: false
          });
            return false;
        }

        Swal.fire({
          title: 'Success',
          text: 'Simpan Data Berhasil',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        });

        var DataGroupFinal = $scope.DataGroup.filter(function(item) { 
          return item.GroupId == $scope.mData.Group;  
        });

        $scope.data.push({
        
          username:$scope.mData.username,
          firstName :$scope.mData.firstName,
          lastName : $scope.mData.lastName,
          email : $scope.mData.email,
          birthDate: $scope.mData.birthDate,
          basicSalary:$scope.mData.basicSalary,
          status:$scope.mData.status,
          group:DataGroupFinal[0].GroupName,
          description:$scope.mData.description
        });
        
        $scope.formList = true;
        $scope.formTambah = false;
      }
      console.log("$scope.data",$scope.data);
    }

    $scope.TDate = function(data){
      var UserDate = data;
      var ToDate = new Date();
      if (new Date(UserDate).getTime() > ToDate.getTime()) {
          Swal.fire({
            title: 'Error !',
            text: 'Maksimal tanggal hari ini',
            icon: 'error',
            timer: 1000,
            showConfirmButton: false
          });
            $scope.mData.birthDate = "";
            return false;
      } 
      return true;
    }
}); 

app.filter('startFrom', function() {
  return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
  }
});
