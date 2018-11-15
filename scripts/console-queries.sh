
web3.eth.getBalance('0xE370c2C187193ccF3B9265917C557602F68aC11f', function(err,res) { console.log(res.toNumber()) })
web3.eth.getBalance('0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8', function(err,res) { console.log(res.toNumber()) })

DEPLOY GCLOUD
=============
    gcloud config set project commitkitties-api
    gcloud app deploy

    gcloud app deploy app.yaml (last param yaml optional)

start service:
    gcloud app deploy app-pro.yaml
    gcloud app deploy app-pre.yaml


stop service:
    gcloud app versions stop --service pro 20181114t014822