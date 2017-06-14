'use strict';

var store = require('../storage/storage-init');
var config = require('../config');
var Topic = require('fh-wfm-mediator/lib/topics');

module.exports = function(mediator) {

  var resultDataTopics = new Topic(mediator).prefix('wfm' + config.get('dataTopicPrefix')).entity('result');
  var workorderDataTopiocs = new Topic(mediator).prefix('wfm' + config.get('dataTopicPrefix')).entity('workorders');

  function handleWorkorderStatusUpdate(result) {
    if (result && result.status) {
      workorderDataTopiocs.publish('read', result.workorderId).then(function(workorder) {
        workorder.status = result.status;

        if (workorder.status === "Complete") {
          workorder
        }

        workorderDataTopiocs.publish('update', workorder);
      });
    }

    return null;
  }

  resultDataTopics.onDone('create', handleWorkorderStatusUpdate);

  resultDataTopics.onDone('update', handleWorkorderStatusUpdate);

  return store.init('result', null, mediator);
};
