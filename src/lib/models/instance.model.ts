module.exports = (db, DataTypes) => {
    const Instance = db.define("Instance", {
        state: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('state'))
            },
            set: function(val) {
                this.setDataValue('state', JSON.stringify(val))
            }
        },
        launch_time: DataTypes.DATE,
        public_ipv4: DataTypes.STRING,
        instance_id: DataTypes.STRING,
        key_name: DataTypes.STRING,
        public_dns: DataTypes.STRING,
        instance_profile_arn: DataTypes.STRING,
        security_groups: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('security_groups'))
            },
            set: function(val) {
                this.setDataValue('security_groups', JSON.stringify(val))
            }
        }

    })
    return Instance
}