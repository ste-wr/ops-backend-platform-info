import { EC2 } from 'aws-sdk'

const instanceController = require('./instance')

type TagValue = [
    {
        Name: string,
        Values: [string]
    }
]
class Topology {
    region: string
    ec2: EC2

    constructor(region: string) {
        this.region = region
        this.ec2 = new EC2({'apiVersion': 'latest', 'region': this.region})
    }

    GetInstancesFromEC2 = (...kv: TagValue) => {
        let params = {Filters: []}
        kv.forEach(pair => {
            params.Filters.push(pair)
        })
        return new Promise((resolve, reject) => {
            this.ec2.describeInstances(params, (err, data) => {
                if (err) reject(err)
                if(data.Reservations.length > 0) {
                    let instances = []
                    data.Reservations.forEach(reservation => {
                        if(reservation.Instances.length > 0) {
                            reservation.Instances.forEach(instance => {
                                instances.push(instance)
                            })
                        } else {
                            reject('No Instances found')
                        }
                    })
                    const inserts = instances.map(instanceController.create)
                    const results = Promise.all(inserts)
                    results.then(data => {
                        resolve(data)
                    })
                } else {
                    reject('No Reservations found')
                }
            })
        })
    }
}

module.exports = Topology