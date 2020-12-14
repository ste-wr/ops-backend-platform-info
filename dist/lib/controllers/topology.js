"use strict";

var _awsSdk = require("aws-sdk");

const instanceController = require('./instance');

class Topology {
  constructor(region) {
    this.GetInstancesFromEC2 = (...kv) => {
      let params = {
        Filters: []
      };
      kv.forEach(pair => {
        params.Filters.push(pair);
      });
      return new Promise((resolve, reject) => {
        this.ec2.describeInstances(params, (err, data) => {
          if (err) reject(err);

          if (data.Reservations.length > 0) {
            let instances = [];
            data.Reservations.forEach(reservation => {
              if (reservation.Instances.length > 0) {
                reservation.Instances.forEach(instance => {
                  instances.push(instance);
                });
              } else {
                reject('No Instances found');
              }
            });
            const inserts = instances.map(instanceController.create);
            const results = Promise.all(inserts);
            results.then(data => {
              resolve(data);
            });
          } else {
            reject('No Reservations found');
          }
        });
      });
    };

    this.region = region;
    this.ec2 = new _awsSdk.EC2({
      'apiVersion': 'latest',
      'region': this.region
    });
  }

}

module.exports = Topology;
//# sourceMappingURL=topology.js.map
