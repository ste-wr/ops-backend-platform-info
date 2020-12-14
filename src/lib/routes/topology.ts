import express from 'express'

const router = express.Router()

const Topology = require('../controllers/topology')
const Instance = require('../controllers/instance')

router.route('/:region/:environment/:deployment/get').get((req, res) => {
    Instance.read().then(results => {
        res.status(200).send(results)
    })
})

router.route('/:region/:environment/:deployment/search').get((req, res) => {
    if (req.query.id) {
        Instance.readOne(req.query.id).then(result => {
            res.status(200).send(result)
        })
    } else {
        res.status(400).send({
            "status": "no_response",
            "reason": "bad_query_parameters"
        })
    }
})

router.route('/:region/:environment/:deployment/update').get((req, res) => {
    const topology = new Topology(req.params.region)
    topology.GetInstancesFromEC2({Name: 'tag:Evnt_Deployment', Values: [req.params.deployment]}, {Name: 'tag:Evnt_Environment', Values: [req.params.environment]})
    .then(records => {
        res.status(200).send(records)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

module.exports = router