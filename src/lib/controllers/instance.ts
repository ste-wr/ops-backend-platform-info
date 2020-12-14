const Models = require('../models/')

module.exports = {
    create: (request) => {
        return new Promise(resolve => {
            const result = Models.default.Instance.create({
                state: request.State,
                launch_time: request.LaunchTime,
                public_ipv4: request.PublicIpAddress,
                instance_id: request.InstanceId,
                key_name: request.KeyName,
                public_dns: request.PublicDnsName,
                instance_profile_arn: request.IamInstanceProfile.Arn,
                security_groups: request.SecurityGroups
            })
            resolve(result)
        })
    },

    read: () => {
        return new Promise(resolve => {
            const result = Models.default.Instance.findAll({
                order: [['launch_time', 'DESC']]
            })
            resolve(result)
        })
    },

    readOne: (id) => {
        return new Promise(resolve => {
            const result = Models.default.Instance.findByPk(id)
            resolve(result)
        })
    }
}