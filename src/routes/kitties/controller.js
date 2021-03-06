
const service = require('./service');

export const getKitties = async (req, res, next) => {
    console.log(`call GET ALL kitties`);
    try {
        let kitties = [];
        kitties = await service.getKitties();
        res.json(kitties);
    } catch(e) {
        next(e);
    }
};

export const getKittyById = async(req, res, next) => {
    console.log(`call GET kitties`);
    try {
        const response = await service.getKittyById( req.params.id);
        res.json(response);
    } catch(e) {
        next(e);
    }
}

export const addKitty = async (req, res, next) => {
    try {
        const response = await service.addKitty(req.body);
        res.json(response);
    } catch(e) {
        next(e);
    }
};

export const updateKitty = async (req, res, next) => {
    try {
        const response = await service.updateKitty(req.params.id, req.body);
        res.json(response);
    } catch(e) {
        next(e);
    }
};

export const deleteKitty = async (req, res, next) => {
    try {
        const response = await service.deleteKitty( req.params.id);
        res.json(response);
    } catch(e) {
        next(e);
    }
}