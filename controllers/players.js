const { NotFound } = require('http-errors');
const { Player } = require('../dbconfig/db');
const { sendSuccessRes } = require('../helpers/sendSuccessRes');
const { Op } = require('sequelize');


const createPlayer = async (req, res) => { 
    const { name, points } = req.body
    const newPlayer = await Player.create({ name, points })
    sendSuccessRes(res, { newPlayer }, 201)
};

const getAllPlayer = async (req, res) => { 
    const allPlayers = await Player.findAll()
    sendSuccessRes(res, { allPlayers })
}

const getRecordPlayer = async (req, res) => { 
    const recordPlayers = await Player.findAll({
        where: {
            id: {
                [Op.notIn]: [0]
            }
        }, order: [
            ['points', 'DESC']
        ]
    })
    const result = recordPlayers.slice(0,5)
    sendSuccessRes(res, { result })
}

const updatePoints = async (req, res) => { 
    const { points } = req.body
    const { id } = req.params
    const result = await Player.update({ points },
        {
            where: { id },
            returning: true,
            plain: true
        });
    sendSuccessRes(res, result[1].dataValues)
}

const getPlayerById = async (req, res) => { 
    const { id } = req.params
    const result = await Player.findOne({ where: { id } });
    if (result) {
        sendSuccessRes(res, { result })
    }

    throw new NotFound("Not Found contact") 
}

const deletePlayer = async (req, res) => { 
    const { id } = req.params
    const deletePlayer = await Player.destroy({
        where: { id },
    });
    if (deletePlayer) {
        sendSuccessRes(res, { message: "Contact removed" })
    }

    throw new NotFound("Not Found contact") 
}


module.exports = {
    createPlayer,
    getAllPlayer,
    updatePoints,
    deletePlayer,
    getRecordPlayer,
    getPlayerById,
}
