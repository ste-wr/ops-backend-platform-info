import fs from "fs"
import path from "path"

const Sequelize = require("sequelize")
const Settings = require('../../settings')
const dbSettings = Settings[Settings.env].db

const db = new Sequelize(
    dbSettings.database,
    dbSettings.user,
    dbSettings.password,
    dbSettings
)

const models = {
    sequelize: null,
    Sequelize: null
}

fs.readdirSync(__dirname)
.filter(file => file.indexOf(".") !== 0 && file !== "index.js" && !file.endsWith("map"))
.forEach(file => {
    const model = require(path.join(__dirname, file))(db, Sequelize.DataTypes)
    models[model.name] = model
})

models.sequelize = db
models.Sequelize = Sequelize

export default models