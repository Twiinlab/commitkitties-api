[ '0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8',
  '0x6999e1d9ec10d0b0d06c657e289f55a2e17dea64',
  '0x3788e8dc5af58da6866454acac0597aff03ab8e9',
  '0xbd96a20eaa28874b81a0540d371327d16b4004b8',
  '0x54072d778673d1df7e87c42e7771ff710628555a',
  '0x0d2078daf76e38f37e31baa93d4d257040612503',
  '0x24394f0e42e56b0c117bb8df4aedb536386524ec',
  '0x5c813c7ebc380c29575302ad81e530690262d160',
  '0x6d35d6c0c9ef6d3d4507073561806b126cb4b771',
  '0xa9df85ce7e31ef71f842f85e08344df3003c1f72' ]


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