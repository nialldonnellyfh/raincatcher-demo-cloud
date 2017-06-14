var SheetServiceProxy = require('./service-proxy');

/**
 *
 *
 *
 * @param datasetId
 * @param serviceGuid
 * @constructor
 */
function SheetStore(datasetId, serviceGuid) {
  this.serviceProxy = new SheetServiceProxy(datasetId, serviceGuid);
}


SheetStore.prototype.list = function(filter) {
  return this.serviceProxy.list(filter);
};

SheetStore.prototype.read = function(id) {
  return this.serviceProxy.read(id);
};

SheetStore.prototype.update = function(workorder) {
  return this.serviceProxy.update(workorder);
};

SheetStore.prototype.remove = function(id) {
  return this.serviceProxy.remove(id);
};

SheetStore.prototype.create = function(workorder) {
  return this.serviceProxy.create(workorder);
};

module.exports = SheetStore;