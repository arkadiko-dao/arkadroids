from http.client import HTTPConnection
import requests
import time
import random
import json

def get_owner(events):
  for e in events:
    log = e["contract_log"]
    if log["contract_id"] == "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-freddie-v1-1":
      print(log["value"]["repr"])
      break
      # finalize-liquidation


def call_api(id):
  url = "https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/0x0067818569a08f9fb09dc9d33acb27bb0af45f157356a4ffa099360b4a30897c" + id
  HTTPConnection.debuglevel = 1
  r = requests.get(url=url, timeout=5)
  # get_owner(r.json()["events"])
  with open("calls/{}.json".format(id), "w") as outfile:
    outfile.write(json.dumps(r.json(), indent = 4))  


with open("liquidatedVaultTXs.txt", "r") as txs:
    Lines = txs.readlines()
    for line in Lines:
        id = line.strip().replace("\"", "")
        url = "https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/" + id
        print("Call: {}".format(url))
        call_api(id)
        time.sleep(random.randrange(3, 8))

# https://stacks-node-api.mainnet.stacks.co/extended/v1/block/by_height/65351