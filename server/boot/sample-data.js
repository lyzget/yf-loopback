'use strict';
var Mock = require('mockjs');
// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0
module.exports = function(app) {
  // mockShopDatas();
  // createOther();
  function mockRentDatas() {
    var Rent = app.models.rent;
    var types = ['1', '2', '3'];
    var data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|100': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'name': /[1-2][A-B][0-1][0-9]{2}/,
        contact: '@cname',
        'phone|1': /^1[0-9]{10}$/,
        'rent_type_temp|1-3': {'1': '1', '2': '2', '3': '3'},
        'region': /[1-2],[1-3],[A-C]/,
      }],
    });
    for (var i = 0; i < data.list.length; i++) {
      var a = data.list[i].rent_type_temp;
      data.list[i]['rent_type'] = [];
      if (a['1']) data.list[i]['rent_type'].push('1');
      if (a['2']) data.list[i]['rent_type'].push('2');
      if (a['3']) data.list[i]['rent_type'].push('3');

      console.log(data.list[i]);
      Rent.create(data.list[i]);
    }
  }
  // for (i = 0; i < 50; i++) {
  //   var test = {region: '1,1,A', name: '1A' + i, contact: 'man' + i, phone: '13570' + i};
  //   Rent.create(test);
  // }
  // for (; i < 100; i++) {
  //   var test1 = {region: '2,1,A', name: '1A' + i, contact: 'man' + i, phone: '13570' + i};
  //   Rent.create(test1);
  // }
  // for (; i < 150; i++) {
  //   var test3 = {region: '1,2,B', name: '1A' + i, contact: 'man' + i, phone: '13570' + i};
  //   Rent.create(test3);
  // }

  function mockShopDatas() {
    console.log('start mockShopDatas-------------');
    var Shop = app.models.shop;
    var data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|100': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'name': /[1-2][A-B][0-1][0-9]{2}/,
        'sort|1-100': 1,
        'area|5-50.2': 1,
        'rent_area|5-50.2': 1,
        'region': /[1-2],[1-3],[A-C]/,
        'status|0-3': 1,
      }],
    });
    for (var i = 0; i < data.list.length; i++) {
      // var a = data.list[i].rent_type_temp;
      console.log(data.list[i]);
      Shop.create(data.list[i]);
    }
    console.log('end mockShopDatas------------------');
  }

  function createOther() {
    var User = app.models.user;
    var Product = app.models.product;
    var Brand = app.models.brand;
    var testUser = {
      username: 'admin',
      email: 'admin@demo.com',
      password: 'admin',
    };
    User.create([
      testUser,
    ], function(err, users) {
      User.login(testUser, function(err, accessToken) {
        console.log('Copy this access token for test: ', accessToken.id);
      });
    });

    // Brand.create([
    //   {name: 'Apple'},
    // ], function(err, brand) {
    //   Product.create([
    //     {'name': 'iPhone 8 Plus', 'price': '9000', 'brandId': brand[0].id},
    //     {'name': 'iPhone 8', 'price': '7000', 'brandId': brand[0].id},
    //   ]);
    // });
  }
};

