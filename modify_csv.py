import csv
import random

input_file_path = 'battleship_data.csv'
output_file_path = 'modified_battleship_data.csv'


def modify_data(input_path, output_path):
    with open(input_path, 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        modified_data = []
        for i, row in enumerate(reader):
            if i == 0:  # Skip the first row (header or index 0 row)
                modified_data.append(row)
                continue
            modified_row = [int(cell) if random.random() >=
                            0.4 or int(cell) == 0 else 0 for cell in row]
            modified_data.append(modified_row)

    with open(output_path, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(modified_data)


modify_data(input_file_path, output_file_path)
