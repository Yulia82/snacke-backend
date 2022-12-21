const express = require('express');
const { controllerWrapper } = require('../../middlewares')
const { createPlayer,
    getAllPlayer,
    updatePoints,
    deletePlayer,
    getRecordPlayer,
    getPlayerById
} = require('../../controllers/players')

const router = express.Router();

router.post("/", controllerWrapper(createPlayer))

router.get("/", controllerWrapper(getAllPlayer))

router.get("/record", controllerWrapper(getRecordPlayer))

router.get("/:id", controllerWrapper(getPlayerById))

router.patch("/points/:id", controllerWrapper(updatePoints))

router.delete("/:id", controllerWrapper(deletePlayer))

module.exports = router;