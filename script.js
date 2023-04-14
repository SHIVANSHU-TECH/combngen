// Get references to the HTML elements we'll be working with
const form = document.getElementById('team-form');
const fileInput = document.getElementById('file-input');
const teamSizeInput = document.getElementById('team-size');
const numTeamsInput = document.getElementById('num-teams');
const resultsContainer = document.getElementById('results-container');

// Listen for the form to be submitted
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the uploaded file
  const file = fileInput.files[0];

  // Read the file into a string
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    const fileContents = reader.result;

    // Parse the CSV file into an array of player names
    const players = fileContents.split('\n').map((line) => line.trim());

    // Get the user-specified team size and number of teams
    const teamSize = parseInt(teamSizeInput.value);
    const numTeams = parseInt(numTeamsInput.value);

    // Generate all possible combinations of players based on the team size
    const combinations = getCombinations(players, teamSize);

    // Randomly select the desired number of team combinations
    const teams = getRandomSubarray(combinations, numTeams);

    // Display the selected team combinations
    resultsContainer.innerHTML = '';
    teams.forEach((team) => {
      const teamElement = document.createElement('div');
      teamElement.innerText = team.join(', ');
      resultsContainer.appendChild(teamElement);
    });
  };
});

// Returns an array of all combinations of size k from the given array
function getCombinations(array, k) {
  const results = [];
  function backtrack(start, current) {
    if (current.length === k) {
      results.push(current.slice());
    } else {
      for (let i = start; i < array.length; i++) {
        current.push(array[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    }
  }
  backtrack(0, []);
  return results;
}

// Returns a random subarray of the given array with the given length
function getRandomSubarray(array, length) {
  const shuffled = array.slice();
  let i = array.length;
  while (i--) {
    const index = Math.floor((i + 1) * Math.random());
    [shuffled[index], shuffled[i]] = [shuffled[i], shuffled[index]];
  }
  return shuffled.slice(0, length);
}
