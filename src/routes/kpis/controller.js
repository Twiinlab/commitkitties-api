
const service = require('./service');

export const getBlocks = async (req, res, next) => {
    console.log(`call GET ALL blocks`);
    try {
        let users = [];
        users = await service.getBlocks();
        res.json(users);
    } catch(e) {
        next(e);
    }
};

export const getBlockByTransactionHash = async(req, res, next) => {
    console.log(`call GET blocks`);
    try {
        const response = await service.getBlockByTransactionHash( req.params.transactionhash);
        res.json(response);
    } catch(e) {
        next(e);
    }
}

export const getBlockByUserId = async(req, res, next) => {
  console.log(`call GET blocks`);
  try {
      const response = await service.getBlockByUserId( req.params.userid);
      res.json(response);
  } catch(e) {
      next(e);
  }
}

export const addBlock = async (req, res, next) => {
    try {
        const response = await service.addBlock(req.body);
        res.json(response);
    } catch(e) {
        next(e);
    }
};


export const getLeaderboard = async(req, res, next) => {
    console.log(`call GET Leaderboard`);
    try {
        const response = await service.getLeaderboard();
        res.json(response);
    } catch(e) {
        next(e);
    }
  }