define(['service/api'], function () {

    angular.module('PS.orders.service', ['PS.service.api'])
        .factory('Order', function (Api) {
            return Api.resource('/orders');
        })
        .factory('OrderService', function () {
            return {
                orders: [],

                add: function (order) {
                    this.orders.push(order);
                },

                getByNumber: function (number) {
                    return _.find(this.orders, function (order) {
                        return order.order.number == number;
                    });
                },
                getOrders: function () {
                    return this.orders;
                }
            }
        })
        ;

});

