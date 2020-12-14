import express from 'express'
import Models from "./lib/models/"

const Settings = require('./settings')

const indexRouter = require('./lib/routes/index')
const topologyRouter = require('./lib/routes/topology')

const init = async () => {
    Models.sequelize.sync()
    const app = express()

    app.use('/', indexRouter)
    app.use('/topology', topologyRouter)

    app.listen(Settings.port, () => {
        console.log(`Listening on port ${Settings.port}`)
    })
}

process.on('unhandledRejection', err => {
    console.error(err)
    process.exit(1)
})

init()