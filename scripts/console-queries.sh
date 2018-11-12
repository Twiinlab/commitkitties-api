
web3.eth.getBalance('0xE370c2C187193ccF3B9265917C557602F68aC11f', function(err,res) { console.log(res.toNumber()) })

DEPLOY GCLOUD
=============
gcloud config set project commitkitties-api
gcloud app deploy
