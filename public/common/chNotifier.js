angular.module('app').value('chToastr', toastr);

angular.module('app').factory('chNotifier', function(chToastr){
    return {
        notify: function(msg) {
            chToastr.success(msg);
            console.log(msg);
        },
        error: function(msg) {
            chToastr.error(msg);
            console.log(msg);
        }
    }
})