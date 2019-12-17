const context = require('koa/lib/context');
const response = require('koa/lib/response');

context.json = function (code, msg, data) {
  this.type = 'application/json';
  this.body = {
    code,
    msg,
    data
  };
  return;
};

context.setState = function(key, value) {
  if (typeof key === 'object') {
    Object.assign(this.state, key);
  } else {
    this.state[key] = value;
  }
}

context.getState = function(key) {
  if (key) {
    return this.state[key];
  }
  return this.state;
}

context.setGlobal = function (key, value) {
  let { _global } = this.state;
  _global = JSON.parse(_global);
  if (!_global) {
    _global = {};
  }
  if (typeof key === 'object') {
    Object.assign(_global, key);
  } else {
    _global[key] = value;
  }
  this.state._global = JSON.stringify(_global);
}


context.getGlobal = function(key) {
  let { _global } = this.state;
  _global = JSON.parse(_global);
  if (key) {
    return _global[key];
  }
  return _global;
}

