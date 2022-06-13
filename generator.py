import time
import datetime
import json

droid_id = 0
ipfsroot = "Qmda1yFsmzJfVwiwL8RFhMKAmJBphRCCKUGHZfnSiq8swa"

def write(skin, eyes, specialEdition):
    global droid_id
    droid_id = droid_id + 1

    unix_timestamp = int(datetime.datetime.timestamp(datetime.datetime.now())*1000)
    # Data to be written
    dictionary = {
        "name": "Arkadroid #" + str(droid_id),
        "description": "Arkadroids",
        "image": "ipfs://" + str(ipfsroot) + "/" + str(droid_id) + ".png",
        "edition": 1,
        "date": unix_timestamp,
        "attributes": [{
                "trait_type": "Special edition",
                "value": specialEdition
            },
            {
                "trait_type": "Skin",
                "value": skin
            },
            {
                "trait_type": "Eyes",
                "value": eyes
            }
        ]
    }

    # Serializing json
    json_object = json.dumps(dictionary, indent = 4)

    # Writing to sample.json
    with open("ASSETS/JSON/" + str(droid_id)+".json", "w") as outfile:
	    outfile.write(json_object)

def makeCollection(token):
    write("Gold", token, "Yes")
    for i in range(0,19):
        write("Silver", token, "No")

# Total 100
makeCollection("BTC")
makeCollection("Arkadiko")
makeCollection("DIKO") 
makeCollection("USDA") 
makeCollection("STX")
makeCollection("Lydian")