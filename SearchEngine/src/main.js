import './style.css';

let verbData = [];

// When user submits the search form
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();
   
  const searchTerm = document.getElementById('searchInput').value.trim();
  const attribute = document.getElementById('attribute').value;

  console.log("Search term:", searchTerm);
  console.log("Attribute:", attribute);
 

  const matches = verbData.filter((verb) => {
    ///return verb.root === searchTerm;
    ///converts user input to lowercase so there is no mistmatch that limits results 
    return verb.root.trim().toLowerCase() === searchTerm.trim().toLowerCase(); 
    
  });
  
  console.log("Matches:", matches);

  const groupedResults = groupWordForms(matches);
  
  displayResults(groupedResults);  ///displays search results
});



// Load and process XML file ///Test cases 
async function testXML() {
  const response = await fetch("/RV2.xml");
  const xmlText = await response.text();
 
  ////Converts raw data into readable files for the system 
  const parser = new DOMParser();

  const xmlDoc = parser.parseFromString(
    xmlText,
    "application/xml"
  );

  const verbs = xmlDoc.querySelectorAll("Verb");
  

  verbData = [];

  ////takes that long string and gets the indivual roots, gloss 
  verbs.forEach((verb) => {
    const wordForm = verb.textContent.trim();
    const root = verb.getAttribute("root");
    const gloss = verb.getAttribute("gloss");

    ///pushes it 
    verbData.push({
      wordForm: wordForm,
      root: root,
      gloss: gloss
    });
  });

  console.log("Verb data loaded:", verbData);
}

// Group duplicate word forms and count them
function groupWordForms(matches) {
  const grouped = {};
   

  matches.forEach((verb) => {
    if (!grouped[verb.wordForm]) {
      grouped[verb.wordForm] = {
        wordForm: verb.wordForm,
        root: verb.root,
        gloss: verb.gloss,
        count: 0
      };
    }

    grouped[verb.wordForm].count++;
  });

  return Object.values(grouped);
}

// Display results on page
function displayResults(results) {
  const wordFormList = document.getElementById("wordFormList");

  wordFormList.innerHTML = "";

  //// will return no matches if no mathces found 
  if (results.length === 0) {
    const listItem = document.createElement("li");
    listItem.textContent = "No results found.";
    wordFormList.appendChild(listItem);
    return;
  }
  

  
  results.forEach((verb) => {
    const listItem = document.createElement("li");

    listItem.textContent =
      `${verb.wordForm} (${verb.count}) — root: ${verb.root}, gloss: ${verb.gloss}`;

    wordFormList.appendChild(listItem);
  }); 
}

testXML();