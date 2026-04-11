import sys
import os
import json
from script.insert_candidate import insert_candidate
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

"""
Manual inclusion of candidates{number}.json into the table
"""

with open("Resume/candidate3.json", "r") as f:
    data = json.load(f)

insert_candidate(data)