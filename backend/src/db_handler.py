import sys
import os
import json
from script.insert_candidate import insert_candidate
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

"""
Manual inclusion of candidates{number}.json into the table
"""
def insert_data(file_path):
    with open(file_path, "r") as f:
        data = json.load(f)

    insert_candidate(data)