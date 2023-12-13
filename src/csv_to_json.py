import csv
import json
import time

# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
	# create a dictionary
	data = {}
	data['id'] = 'stageA'
	data['type'] = 'line'
	data['source'] = {}
	data['source']['type'] = 'geojson'
	data['source']['data'] = {}
	data['source']['data']['type'] = 'Feature'
	data['source']['data']['properties'] = {}
	data['source']['data']['geometry'] = {}
	data['source']['data']['geometry']['type'] = 'LineString'
	data['source']['data']['geometry']['coordinates'] = []
	data['layout'] = {}
	data['layout']['line-join'] = 'round'
	data['layout']['line-cap'] = 'round'
	data['paint'] = {}
	data['paint']['line-color'] = '#d90065'
	data['paint']['line-width'] = 8
	
	# data['speeds'] = []
	
	# Open a csv reader called DictReader
	with open(csvFilePath, encoding='utf-8') as csvf:
		csvReader = csv.reader(csvf, delimiter=',')


    # {
    #     id: 'two',
    #     type: 'line',
    #     source: {
    #       'type': 'geojson',
    #       'data': {
    #         'type': 'Feature',
    #         'properties': {},
    #         'geometry': {
    #           'type': 'LineString',
    #           'coordinates': [
    #             [-95.67524568097107, 39.04719713117554],
    #             [-95, 38.7], 
    #             [-94.8, 39.4],
    #             [-94.41210259647566, 39.09358078384889],
    #           ],
    #         },
    #       }
    #     },
    #     layout: {
    #       'line-join': 'round',
    #       'line-cap': 'round'
    #     },
    #     paint: {
    #       'line-color': '#d90065',
    #       'line-width': 8
    #     }
    # }
		
		# Convert each row into a dictionary 
		# and add it to data
		for i, rows in enumerate(csvReader):
			data['source']['data']['geometry']['coordinates'].append([float(rows[1]), float(rows[0])])
			# data['speeds'].append(rows[3])
			# Assuming a column named 'No' to
			# be the primary key

			# key = rows['No']
			# data[key] = rows

	# Open a json writer, and use the json.dumps() 
	# function to dump data

	with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
		jsonf.write(json.dumps(data, indent=4))
        # print(time.time() - t)
		
# Driver Code

t = time.time()
# Call the make_json function
make_json("src/route_data/2022_D.csv", "src/route_json/2022_D.json")
print(time.time() - t)
