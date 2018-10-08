import React, { Component } from "react";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Nav from './components/Nav'
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on an image to Guess, but don't click the same picture twice!";

class App extends Component {

    // Setting this.state.matches to the matches json array
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        // Make a copy of the state matches array to work with
        const matches = this.state.matches;

        // Filter for the clicked match
        const clickedMatch = matches.filter(match => match.id === id);

        // If the matched image's clicked value is already true, 
        // do the game over actions
        if (clickedMatch[0].clicked) {

            console.log("Correct Guesses: " + correctGuesses);
            console.log("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "Oops!....You already clicked on that one!"

            for (let i = 0; i < matches.length; i++) {
                matches[i].clicked = false;
            }

            this.setState({ clickMessage });
            this.setState({ correctGuesses });
            this.setState({ matches });

            // Otherwise, if clicked = false, and the user hasn't finished
        } else if (correctGuesses < 11) {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // increment the appropriate counter
            correctGuesses++;

            clickMessage = "Good JOB! Now pick a different one!";

            if (correctGuesses > bestScore) {
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function (a, b) { return 0.5 - Math.random() });

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({ correctGuesses });
            this.setState({ clickMessage });
        } else {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // restart the guess counter
            correctGuesses = 0;

            // Play again message
            clickMessage = "Well done! Want to try again?";
            bestScore = 12;
            this.setState({ bestScore });

            for (let i = 0; i < matches.length; i++) {
                matches[i].clicked = false;
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function (a, b) { return 0.5 - Math.random() });

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({ correctGuesses });
            this.setState({ clickMessage });

        }
    };

    render() {
        return (
            <Wrapper>
                <Nav
                    message={this.state.clickMessage}
                    curScore={this.state.correctGuesses}
                    topScore={this.state.bestScore}
                />
                <Title>WHO'S Who?</Title>
                {this.state.matches.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
            </Wrapper>
        );
    }
}

export default App;







// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
