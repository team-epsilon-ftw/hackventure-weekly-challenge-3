import csv
import json

# Read data from CSV
csv_file_path = 'modified_battleship_data.csv'
data = []
with open(csv_file_path, mode='r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        board = [int(row[f'cell_{i}']) for i in range(64)]
        attack_x = int(row['attack_x'])
        attack_y = int(row['attack_y'])
        data.append(
            {'board': board, 'attack_x': attack_x, 'attack_y': attack_y})

# Get the first 10 cases
data = data[:100]

# Convert to JSON format
js_data = json.dumps(data, indent=4)

# Write to a JavaScript file
with open('data.js', 'w') as file:
    file.write(f"const data = {js_data};")
