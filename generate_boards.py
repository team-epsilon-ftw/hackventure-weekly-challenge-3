import random
import csv

# Constants
BOARD_SIZE = 8
SHIPS = {
    'Aircraft Carrier': 5,
    'Frigate': 4,
    'Destroyer': 3
}
NUM_MISSES = 10  # Number of random misses to generate on each board


def generate_board():
    board = [['' for _ in range(BOARD_SIZE)] for _ in range(BOARD_SIZE)]
    for ship, size in SHIPS.items():
        placed = False
        while not placed:
            orientation = random.choice(['horizontal', 'vertical'])
            if orientation == 'horizontal':
                row = random.randint(0, BOARD_SIZE - 1)
                col = random.randint(0, BOARD_SIZE - size)
                if all(board[row][col + i] == '' for i in range(size)):
                    for i in range(size):
                        board[row][col + i] = 'S'
                    placed = True
            else:  # vertical
                row = random.randint(0, BOARD_SIZE - size)
                col = random.randint(0, BOARD_SIZE - 1)
                if all(board[row + i][col] == '' for i in range(size)):
                    for i in range(size):
                        board[row + i][col] = 'S'
                    placed = True

    # Generate random misses
    misses = 3
    while misses < NUM_MISSES:
        row = random.randint(0, BOARD_SIZE - 1)
        col = random.randint(0, BOARD_SIZE - 1)
        if board[row][col] == '':
            board[row][col] = 'M'
            misses += 1

    for row in range(BOARD_SIZE):
        for col in range(BOARD_SIZE):
            if board[row][col] == 'S':
                if random.random() < 0.4:  # 40% probability
                    board[row][col] = ''  # Replace 'S' with an empty string
    return board


def save_boards_to_csv(filename, num_boards):
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        header = ['Row' + str(i) for i in range(BOARD_SIZE)]
        writer.writerow(header)
        for _ in range(num_boards):
            board = generate_board()
            for row in board:
                writer.writerow(row)


# Generate 100 random boards and save to CSV
save_boards_to_csv('high_quality_boards.csv', 200)
