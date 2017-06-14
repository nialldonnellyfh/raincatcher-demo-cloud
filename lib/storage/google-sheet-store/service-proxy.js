var q = require('q');
var $fh = require('fh-mbaas-api');
var path = require('path');
var _ = require('lodash');

/**
 *
 *
 *
 * @param datasetId
 * @param guid
 * @constructor
 */
function SheetServiceProxy(datasetId, guid) {
  this.datasetId = datasetId;
  this.guid = guid;
  this.path = path.join('/api', this.datasetId);
}



/**
 * MBaaS service API call
 * @param _options we want to overwrite
 * use default options otherwise
 *  - guid, name of mbaas service
 *  - path, URL of MBaaS Service API
 *  - method, HTTP method {GET, PUT}
 * @returns {*|promise}
 */
SheetServiceProxy.prototype.xhr = function(_options) {
  var defaultOptions = {
    guid: this.guid,
    path: this.path,
    method: 'GET'
  };

  var options = _.defaults(_options, defaultOptions);

  var deferred = q.defer();
  $fh.service(options, function(err, data) {
    if (err) {
      deferred.reject(new Error(err));
      return;
    }

    deferred.resolve(data);
  });
  return deferred.promise;
};

SheetServiceProxy.prototype.list = function(filter) {
  return this.xhr({
    method: 'POST',
    path: path.join(this.path, 'list'),
    params: filter || {}
  });
};

SheetServiceProxy.prototype.read = function(id) {
  return this.xhr({
    path: path.join(this.path, id)
  });
};

SheetServiceProxy.prototype.update = function(workorder) {
  return this.xhr({
    path: path.join(this.path, workorder.id),
    method: 'PUT',
    params: workorder
  });
};

SheetServiceProxy.prototype.remove = function(id) {
  return this.xhr({
    path: path.join(this.path, id),
    method: 'DELETE'
  });
};

SheetServiceProxy.prototype.create = function(workorder) {
  return this.xhr({
    method: 'POST',
    params: workorder
  });
};

module.exports = SheetServiceProxy;