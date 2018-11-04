
const service = require('./service');

export const getUsers = async (req, res, next) => {
    console.log(`call GET ALL Users`);
    try {
        let users = [];
        users = await service.getUsers();
        res.json(users);
    } catch(e) {
        next(e);
    }
};

export const getUserById = async(req, res, next) => {
    console.log(`call GET users`);
    try {
        const response = await service.getUserById( req.params.id);
        res.json(response);
    } catch(e) {
        next(e);
    }
}

export const addUser = async (req, res, next) => {
    try {
        const response = await service.addUser(req.body);
        res.json(response);
    } catch(e) {
        next(e);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const response = await service.updateUser(req.params.id, req.body);
        res.json(response);
    } catch(e) {
        next(e);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const response = await service.deleteUser( req.params.id);
        res.json(response);
    } catch(e) {
        next(e);
    }
}