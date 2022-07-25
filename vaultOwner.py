# from cmath import e
import json
import re

freddie = "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-freddie-v1-1"
liquidationEngine = "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-auction-engine-v4-1"

csvFile = open('vaults.csv', 'a')

def addToCSV(path):
  with open(path) as json_file:
    data = json.load(json_file)

    vaultOwner = ""
    vaultCollateralType = ""
    vaultCollateral = 0
    vaultDebt = 0
    vaultLiquidated = False
 
    events = data['events']
    for event in events:

      log = event.get("contract_log")
      if log:
        id = log.get("contract_id")
        if id:
          if id == freddie:
            value = log.get("value")
            repr = value.get("repr")

            owner = re.findall("'(SP[a-zA-Z0-9]+)", repr)
            if len(owner) > 0:
              vaultOwner = owner[0]

            collateralType = re.findall("collateral-type \\\"([A-Z]+-[A-Z]+)\\\"", repr)
            if len(collateralType) > 0:
              vaultCollateralType = collateralType[0]

            collateral = re.findall("\(collateral u([0-9]+)\)", repr)
            if len(collateral) > 0:
              vaultCollateral = collateral[0]

            debt = re.findall("\(debt u([0-9]+)\)", repr)
            if len(debt) > 0:
              vaultDebt = debt[0]
            
          if id == liquidationEngine:
            value = log.get("value")
            repr = value.get("repr")

            liquidated = re.findall("finalize-liquidation", repr)
            if len(liquidated) > 0:
              vaultLiquidated = True
      else:
        continue
    
    # print("Onwer:{} Debt:{}".format(vaultOwner, vaultDebt))
    csvFile.write("\n{},{},{},{},{}".format(vaultOwner, vaultCollateralType, vaultCollateral, vaultDebt, vaultLiquidated))


import os
path =r'/Users/yannisdecl/arkadroids/calls'
list_of_files = []

for root, dirs, files in os.walk(path):
	for file in files:
		list_of_files.append(os.path.join(root,file))
for name in list_of_files:
    addToCSV(name)

