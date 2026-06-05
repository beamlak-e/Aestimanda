import './style.css';

///creates empty array that we later store are stugg from 
let verbData = [];

/// when we press submit 
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();
 
  /////changes search input to lowercase so values arents filtered out 
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
 
  ///logs on console 
  console.log("Search term:", searchTerm);


  const matches = verbData.filter((verb) => {
    ///check if roots equal what user typed
    return verb.root?.trim().toLowerCase() === searchTerm;
  });

  ///again logs on console 
  console.log("Matches:", matches);

  const groupedResults = groupWordForms(matches);
  
  displayResults(groupedResults);
});

/////bla bla bla bla 

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
  
  ///finds verb element in xml 
  verbData = [];

  ////takes that long string and gets the indivual roots, gloss 
  verbs.forEach((verb) => {
    const wordForm = verb.textContent.trim();
    const root = verb.getAttribute("root");
    const gloss = verb.getAttribute("gloss");
   
    
    const pada = verb.parentElement; 
    //gets pada id (the numbers line refrence)
    const padaId = pada.getAttribute("id"); 
    const padaText = pada.textContent.trim(); 

    ///pushes it 
    verbData.push({
      wordForm: wordForm,
      root: root,
      gloss: gloss,   ///does nothing right now :3 
      padaId : padaId,
      padaText: padaText
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
    const link= document.createElement("a");

    
     link.href = "#"; 
     link.textContent = `${verb.wordForm} (${verb.count})`; 

     link.addEventListener("click", function(event){
      event.preventDefault(); 
      console.log("Clicked word form:" , verb.wordForm); 
      showOccurrencesForWordForm(verb.wordForm);
     });
      listItem.appendChild(link); 
    //listItem.textContent =
     // `${verb.wordForm} (${verb.count}) `;
    wordFormList.appendChild(listItem);
  }); 
}

//// it runs (verb.wordForm) -->> 
function showOccurrencesForWordForm(wordForm) {
  ///searches dataset again 
  const occurrences = verbData.filter((verb) => {
    return verb.wordForm === wordForm;
  });

  displayOccurrences(occurrences);
}

function displayOccurrences(occurrences) {
  const wordFormList = document.getElementById("wordFormList");

  wordFormList.innerHTML = "";

  occurrences.forEach((verb) => {
    const listItem = document.createElement("li");
     ////combines the line refrence with the context lines 
    listItem.textContent = `${verb.padaId}: ${verb.padaText}`;

    wordFormList.appendChild(listItem);
  });
}


testXML();