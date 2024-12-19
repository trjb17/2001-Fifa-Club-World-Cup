from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Function to simulate the result of a match
def simulate_match(team1, team2):
    team1_score = random.randint(0, 5)
    team2_score = random.randint(0, 5)

    penalty_shootout = None
    if team1_score == team2_score:
        team1_score = random.randint(0, 5)
        team2_score = random.randint(0, 5)
        penalty_shootout = True

    winner = team1 if team1_score > team2_score else team2
    return team1_score, team2_score, winner, penalty_shootout

@app.route('/simulate')
def simulate():
    simulation_results = {
        "status": "Simulation complete",
        "SemiFinal": [{"teams": "Real Madrid vs Hearts of Oak", "result": "3-4", "winner": "Hearts of Oak", "penalty": None}],
        "Final": [{"teams": "Hearts of Oak vs Boca Juniors", "result": "5-4", "winner": "Hearts of Oak", "penalty": None}]
    }
    return jsonify(simulation_results)

if __name__ == '__main__':
    app.run(debug=True)
