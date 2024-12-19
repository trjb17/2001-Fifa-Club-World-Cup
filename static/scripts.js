document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("simulate-btn").addEventListener("click", function() {
        // Function to generate random results for regular match score
        function getRandomResult() {
            return Math.floor(Math.random() * 5); // Random result between 0 and 4
        }

        // Function to simulate a penalty shootout if there's a draw
        function getPenaltyShootoutScore() {
            let team1Penalties = Math.floor(Math.random() * 5);
            let team2Penalties = Math.floor(Math.random() * 5);
            
            while (team1Penalties === team2Penalties) {
                team2Penalties = Math.floor(Math.random() * 5);
            }

            return { team1: team1Penalties, team2: team2Penalties };
        }

        // Function to randomly select a winner based on the scores, including a penalty shootout in case of a draw
        function getWinner(team1, team2, score1, score2) {
            if (score1 > score2) {
                return { winner: team1, penalty: null };
            } else if (score2 > score1) {
                return { winner: team2, penalty: null };
            } else {
                // In case of a draw, perform a penalty shootout
                const penalty = getPenaltyShootoutScore();
                return { 
                    winner: penalty.team1 > penalty.team2 ? team1 : team2,
                    penalty: `Penalties: ${penalty.team1} - ${penalty.team2}`
                };
            }
        }

        // Function to get the correct logo filename based on team name
        function getLogoFilename(teamName) {
            const teamLogos = {
                "Deportivo La Coruña": "RC_Deportivo_La_Coruña_logo.jpeg",
                "Boca Juniors": "Boca_Juniors_logo18.jpeg",
                "Galatasaray": "Galatasaray_4_Sterne_Logo.jpeg",
                "Real Madrid": "Real_Madrid_CF.jpeg",
                "Accra Hearts of Oak": "Accra_hearts_of_oak_sc.jpeg",
                "Al-Hilal": "Al-Hilal_SFC_logo.jpeg",
                "Jubilo Iwata": "Jubilo_Iwata_logo.jpeg",
                "Los Angeles Galaxy": "Los_Angeles_Galaxy_logo.jpeg",
                "Olimpia Honduras": "Olimpia_Honduras.jpeg",
                "Palmeiras": "Palmeiras_logo.jpeg",
                "Wollongong Wolves": "Wollongong_Wolves_FC.jpeg",
                "Zamalek SC": "Zamalek_SC_logo.jpeg"
            };
            return teamLogos[teamName] || `${teamName.replace(/\s+/g, '_')}.jpeg`;
        }

        // Simulate the semi-finals and final results only (no group output)
        const simulationData = {
            "SemiFinal": [
                {
                    teams: "Boca Juniors vs Galatasaray",
                    score1: getRandomResult(),
                    score2: getRandomResult(),
                    result: function() {
                        const result = getWinner("Boca Juniors", "Galatasaray", this.score1, this.score2);
                        return {
                            score: `${this.score1} - ${this.score2}`,
                            winner: result.winner,
                            penalty: result.penalty
                        };
                    }
                },
                {
                    teams: "Real Madrid vs Deportivo La Coruña",
                    score1: getRandomResult(),
                    score2: getRandomResult(),
                    result: function() {
                        const result = getWinner("Real Madrid", "Deportivo La Coruña", this.score1, this.score2);
                        return {
                            score: `${this.score1} - ${this.score2}`,
                            winner: result.winner,
                            penalty: result.penalty
                        };
                    }
                }
            ],
            "Final": [
                {
                    teams: "",
                    score1: getRandomResult(),
                    score2: getRandomResult(),
                    result: function() {
                        const result = getWinner(this.teams.split(" vs ")[0], this.teams.split(" vs ")[1], this.score1, this.score2);
                        return {
                            score: `${this.score1} - ${this.score2}`,
                            winner: result.winner,
                            penalty: result.penalty
                        };
                    }
                }
            ]
        };

        // Determine the winners of the semi-finals and set the final teams
        const semiFinal1 = simulationData.SemiFinal[0].result();
        const semiFinal2 = simulationData.SemiFinal[1].result();

        // Set final match teams based on semi-final results
        simulationData.Final[0].teams = `${semiFinal1.winner} vs ${semiFinal2.winner}`;

        // Display the simulation results (semi-final and final only)
        const resultDiv = document.getElementById("simulation-result");
        let resultHTML = "<h2>Simulation Results:</h2>";

        // Display semi-final results
        resultHTML += "<h3>SemiFinal Results:</h3>";
        simulationData.SemiFinal.forEach(item => {
            const result = item.result();
            resultHTML += `<p><strong>${item.teams}</strong> - Result: ${result.score} ${result.penalty ? `(${result.penalty})` : ""} - Winner: ${result.winner}</p>`;
        });

        // Display final match result
        resultHTML += "<h3>Final Result:</h3>";
        const finalMatch = simulationData.Final[0];
        const finalResult = finalMatch.result();
        resultHTML += `<p><strong>${finalMatch.teams}</strong> - Result: ${finalResult.score} ${finalResult.penalty ? `(${finalResult.penalty})` : ""}</p>`;

        // Champion display
        const champion = finalResult.winner;
        resultHTML += `<h2>🏆 Champion: <span id="champion-name">${champion}</span> 🏆</h2>`;

        // Get the correct logo filename for the champion
        const logoFilename = getLogoFilename(champion);
        const logoPath = `https://trjb17.github.io/2001-Fifa-Club-World-Cup/team_logos/${logoFilename}`;

        // Update the `img` src attribute to show the champion's logo
        document.getElementById("champion-logo").src = logoPath;

        // Update the result div with the simulation results
        resultDiv.innerHTML = resultHTML;
    });
});
