'use strict';

module.exports = function(Model, options) {
  // Model is the model class
  // options is an object containing the config properties from model definition
  Model.defineProperty('created', {type: Date});  // put方法,如果没设置该字段值,也会默认刷新该属性,导致创建时间变化
  Model.defineProperty('modified', {type: Date, default: '$now'});

  Model.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) { // 新增 或 put修改时
      if (ctx.instance.id) { // 有id,则修改
        ctx.instance.modified = new Date();
      } else { // 无id,则新增,赋值创建时间, 修改时间用默认值赋值
        ctx.instance.created = new Date();
      }
    } else { // patch 修改时进入
      ctx.data.modified = new Date();
    }
    next();
  });
};
