import './style.css';

///creates empty array that we later store are stugg from 
let verbData = [];

/// when we press submit 
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();

  /////changes search input to lowercase so values arents filtered out 
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();


  const selectedFilters = Array.from(
    document.querySelectorAll(".filter-scroll input:checked")
  ).map((checkbox) => checkbox.value);


  ///VOICE
  const selectedVoice = Array.from(
    document.querySelectorAll("input[name='voice[]']:checked"))
    ////loops though checkboxe grads spefic data values like m and put them in a list 
    ////puts them into variable const selectedVOices 
    .map((checkbox => checkbox.value));

  ///MOOD 
  ////uh changing a couple of vlaue hopeufllly it works 
  /////finds checkboxes that have name vvoices
  const selectedMood = Array.from(
    document.querySelectorAll("input[name='mood[]']:checked"))
    ////loops though checkboxe grads spefic data values like m and put them in a list 
    ////puts them into variable const selectedVOices 
    .map((checkbox => checkbox.value));

  /////GENDER 
  const selectedGender = Array.from(
    document.querySelectorAll("input[name='gender[]']:checked"))
    .map((checkbox => checkbox.value));

  /// CASE 
  const selectedCasee = Array.from(
    document.querySelectorAll("input[name='casee[]']:checked"))
    .map((checkbox => checkbox.value));

  /// Number  number[] 
  const selectedNumber = Array.from(
    document.querySelectorAll("input[name='number[]']:checked"))
    .map((checkbox => checkbox.value));

  ///person
  const selectedPerson = Array.from(
    document.querySelectorAll("input[name='person[]']:checked"))
    .map((checkbox => checkbox.value));

  ///tense
  const selectedTensev = Array.from(
    document.querySelectorAll("input[name='tensev[]']:checked"))
    .map((checkbox => checkbox.value));

  ///time 
  const selectedUsage = Array.from(
    document.querySelectorAll("input[name='usage[]']:checked"))
    .map((checkbox => checkbox.value));

  //// changes output to lowercase so values arent filtered out 
  const matches = verbData.filter((verb) => {
    const matchesRoot =
      verb.root?.trim().toLowerCase() === searchTerm;


    /// If clicked its true so abtituary value should be 1 
    const matchesFilters = selectedFilters.every((filter) => {
      return verb[filter] === "1";
    });

    /// creates truth/false variable
    const matchesVoice =
      ////selcected vpoice= 0 checks if user selected nothing if so 0, shows no filters are chosen
      selectedVoice.length === 0 || selectedVoice.some((voice) => {
        /////loos inside verb/// bamli ?. checks if a porperty exists without checking code 
        return verb.parse?.includes(voice);
      });

    const matchesMood =
      selectedMood.length === 0 || selectedMood.some((mood) => {
        /////loos inside verb/// bamli ?. checks if a porperty exists without checking code 
        return verb.parse?.includes(mood);
      });

    const matchesCasee =
      selectedCasee.length === 0 || selectedCasee.some((casee) => {
        return verb.parse?.includes(casee);
      });

    ///GENDER 
    const matchesGender =
      selectedGender.length === 0 || selectedGender.some((gender) => {
        return verb.parse?.includes(gender);
      });

    ///NUMBER 
    const matchesNumber =
      selectedNumber.length === 0 || selectedNumber.some((number) => {
        return verb.parse?.includes(number);
      });

    ///Person 
    const matchesPerson =
      selectedPerson.length === 0 || selectedPerson.some((person) => {
        return verb.parse?.includes(person);
      });

    ///tense 
    const matchesTensev =
      selectedTensev.length === 0 || selectedTensev.some((tensev) => {
        return verb.tense?.includes(tensev);
      });

    //usage
    const matchesUsage =
      selectedUsage.length === 0 || selectedUsage.some((usage) => {
        return verb.time?.includes(usage);
      });

    console.log(verb.parse);
    console.log(verb.tense);
    console.log(verb.time);

    return matchesRoot && matchesFilters && matchesVoice && matchesMood && matchesCasee && matchesGender && matchesNumber && matchesPerson && matchesTensev && matchesUsage;
  });

  ///again logs on console 
  console.log("Matches:", matches);
  console.log("Selected Filters:", selectedFilters)
  console.log("Search term:", searchTerm);


  const groupedResults = groupWordForms(matches);

  displayResults(groupedResults);
});


// LOOOK HERE IF YOU WANT TO SEE WHERE JS -> 
// Load and process XML file ///Test cases 
async function testXML() {
  const response = await fetch("/RV2.xml"); ////fetches rv2 file 
  const xmlText = await response.text();

  ////Converts raw data into readable files for the system 
  const parser = new DOMParser();

  const xmlDoc = parser.parseFromString(
    xmlText,
    "application/xml"
  );

  const verbs = xmlDoc.querySelectorAll("Verb, Verbal");

  ///finds verb element in xml 
  verbData = [];

  ////takes that long string and gets the indivual roots, gloss 
  verbs.forEach((verb) => {
    const wordForm = verb.textContent.trim();
    const root = verb.getAttribute("root");
    const gloss = verb.getAttribute("gloss");

    ////storing filter attributes 
    const hab = verb.getAttribute("hab");
    const exp = verb.getAttribute("exp");
    const rptv = verb.getAttribute("rptv");
    const term = verb.getAttribute("term");
    const gnom = verb.getAttribute("gnom");
    const univ = verb.getAttribute("univ");
    //new one 
    const ipfv = verb.getAttribute("ipfv");
    const aug = verb.getAttribute("aug");

    const pada = verb.parentElement;
    //gets pada id (the numbers line refrence)
    const padaId = pada.getAttribute("id");
    const padaText = pada.textContent.trim();

    ///where we are going to add the form of word code 
    const parse = verb.getAttribute("parse");
    ////new code 
    const tense = verb.getAttribute("tense");
    const time = verb.getAttribute("time");

    ///pushes it 
    verbData.push({
      wordForm: wordForm,
      root: root,
      gloss: gloss,   /// :3 
      padaId: padaId,
      padaText: padaText,
      hab,
      exp,
      rptv,
      term,
      gnom,
      univ,
      ipfv,
      aug,
      parse: parse,
      tense: tense,
      time: time

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
    const link = document.createElement("a");


    link.href = "#";
    link.textContent = `${verb.wordForm} (${verb.count})`;

    link.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Clicked word form:", verb.wordForm);
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