
const service = require('./service');

export const getTotalBlockNumbers = async (req, res, next) => {
    console.log(`call GET ALL blocks`);
    try {
        let users = [];
        users = await service.getTotalBlockNumbers();
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
  console.log(`call GET blocks By UserId`);
  try {
      const response = await service.getBlockByUserId( req.params.userid);
      res.json(response);
  } catch(e) {
      next(e);
  }
}

export const getTotalBlockNumbersByUserId = async(req, res, next) => {
    console.log(`call GET Total blocks Number by UserId`);
    try {
        const response = await service.getTotalBlockNumbersByUserId( req.params.userid);
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


export const getRanking = async(req, res, next) => {
    console.log(`call GET Leaderboard`);
    try {
        const response = await service.getRanking();
        res.json(response);
    } catch(e) {
        next(e);
    }
  }