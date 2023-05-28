const express = require('express');

const agentController = require('../controllers/agent');

const router = express.Router();

router.get('/get-agents', agentController.getAgents);

router.get('/get-all-id', agentController.getAgentIds);

router.get('/get-all-names-and-ids', agentController.getNamesAndIds);

router.get('/get-agent/:agentId', agentController.getAgent);

router.post('/add-agent', agentController.addAgent);

router.put('/edit-agent/:agentId', agentController.editAgent);

module.exports = router;
