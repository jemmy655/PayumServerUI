define(['./orders.service', 'payments/payments.service'], function () {

    angular.module('PS.orders', ['ui.router', 'PS.orders.service', 'PS.payments.service'])

        .config(function ($stateProvider) {

            $stateProvider.state('app.orders', {
                url: "/orders",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./orders/list.html'),
                        controller: 'PS.orders.list'
                    }
                }
            });

            $stateProvider.state('app.orders.new', {
                url: "/new",
                views: {
                    'main@app': {
                        templateUrl: require.toUrl('./orders/form.html'),
                        controller: 'PS.orders.form'

                    }
                }
            });

        })
        .controller('PS.orders.list', function ($scope, OrderService) {
            $scope.orders = OrderService.getOrders();
        })
        .controller('PS.orders.form', function ($scope, Order, PaymentConfig, OrderService, $state) {

            $scope.paymentConfig = PaymentConfig.get(function () {
                $scope.payments = _.toArray($scope.paymentConfig.configs);
            });

            $scope.order = new Order({
                "paymentName": "",
                "totalAmount": "",
                "currencyCode": "USD"
            });

            $scope.save = function () {
                $scope.order.$save(function (order, headers) {
                    OrderService.add(order);
                    $state.go('app.orders');
                });
            }
        })

    ;

});

