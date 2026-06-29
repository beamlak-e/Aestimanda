import './style.css';

//creates empty array that we later store string from 
let verbData = [];

// CHOICE JS --- Preverb
document.addEventListener("DOMContentLoaded", () => {
  new Choices("#preverbSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select preverb(s)"
  });

  new Choices("#tenseSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select tense(s)"
  });

  new Choices("#timeSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select times(s)"
  });

  new Choices("#moodSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select mood(s)"
  });

  new Choices("#caseSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select case(s)"
  });

  new Choices("#voiceSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select voice(s)"
  });

  new Choices("#genderSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select voice(s)"
  });

  new Choices("#personSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select person(s)"
  });

  new Choices("#numberSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select number(s)"
  });

  new Choices("#formalSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select formal filter"
  });

  new Choices("#filterSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select filter"
  });


});

/// when we press submit 
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();

  /////who nows 
  function getSelectedValues(id) {
    return Array.from(document.getElementById(id).selectedOptions)
      .map(option => option.value);
  }

  /////changes search input to lowercase so values aren't filtered out 
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  const selectedAttribute = document.getElementById("attribute").value;

  const selectedPvv = getSelectedValues("preverbSelect");
  const selectedTensev = getSelectedValues("tenseSelect");
  const selectedUsage = getSelectedValues("timeSelect");
  const selectedMood = getSelectedValues("moodSelect");
  const selectedVoice = getSelectedValues("voiceSelect");
  const selectedCasee = getSelectedValues("caseSelect");
  const selectedGender = getSelectedValues("genderSelect");
  const selectedPerson = getSelectedValues("personSelect");
  const selectedNumber = getSelectedValues("numberSelect");
  const selectedFilters = getSelectedValues("filterSelect");


  //// changes output to lowercase so values aren't filtered out 
  const matches = verbData.filter((verb) => {
    const matchesSearch =
      ///searchTerm === "" (so when we put it as balnk someitmes for search it doesnt tweak out and states it as valid)
      searchTerm === "" ||
      verb[selectedAttribute]?.trim().toLowerCase() === searchTerm; ////gets selected attribute if root selected root. wordform wordform 

    /// If clicked its true so abtituary value should be 1 
    const matchesFilters = selectedFilters.every((filter) => {
      return verb[filter] === "1";
    });

    /// creates truth/false variable
    const matchesVoice =
      ////selected voice= 0 checks if user selected nothing if so 0, shows no filters are chosen
      selectedVoice.length === 0 || selectedVoice.some((voice) => {
        /////checks if a property exists without checking code 
        return verb.parse?.includes(voice);
      });

    const matchesMood =
      selectedMood.length === 0 || selectedMood.some((mood) => {
        return verb.parse?.includes(mood);
      });

    const matchesCasee =
      selectedCasee.length === 0 || selectedCasee.some((casee) => {
        return verb.parse?.includes(casee);
      });

    const matchesGender =
      selectedGender.length === 0 || selectedGender.some((gender) => {
        return verb.parse?.includes(gender);
      });

    const matchesNumber =
      selectedNumber.length === 0 || selectedNumber.some((number) => {
        return verb.parse?.includes(number);
      });

    const matchesPerson =
      selectedPerson.length === 0 || selectedPerson.some((person) => {
        return verb.parse?.includes(person);
      });

    const matchesTensev =
      selectedTensev.length === 0 || selectedTensev.some((tensev) => {
        return verb.tense?.includes(tensev);
      });

    const matchesUsage =
      selectedUsage.length === 0 || selectedUsage.some((usage) => {
        return verb.time?.includes(usage);
      });

    const matchesPvv =
      selectedPvv.length === 0 || selectedPvv.some((pvv) => {
        return verb.pv?.includes(pvv);
      });

    console.log(verb.parse);
    console.log(verb.tense);
    console.log(verb.time);
    console.log(verb.trans);
    console.log(verb.pvv);

    return matchesFilters && matchesVoice && matchesMood && matchesCasee && matchesGender && matchesNumber && matchesPerson && matchesTensev && matchesUsage && matchesPvv && matchesSearch;
  });

  ///console logs 
  console.log("Matches:", matches);
  console.log("Selected Filters:", selectedFilters)
  console.log("Search term:", searchTerm);
  const groupedResults = groupWordForms(matches);
  displayResults(groupedResults, searchTerm, selectedAttribute); ///now passing selectAttribute 
});


// Load and process XML file 
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

  ////takes that long string and gets the individual roots, gloss 
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
    const ipfv = verb.getAttribute("ipfv");
    const aug = verb.getAttribute("aug");
    const pada = verb.parentElement;
    const padaId = pada.getAttribute("id");
    const padaText = pada.textContent.trim();
    const parse = verb.getAttribute("parse");
    const tense = verb.getAttribute("tense");
    const time = verb.getAttribute("time");
    const trans = verb.getAttribute("trans");
    const pv = verb.getAttribute("pv");
    const rgloss = verb.getAttribute("rgloss");
    const neg = verb.getAttribute("neg");
    const mod = verb.getAttribute("mod");
    const rsltv = verb.getAttribute("rsltv");
    const dub = verb.getAttribute("dub");
    const altr = verb.getAttribute("altr");

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
      time: time,
      trans: trans,
      pv: pv,
      neg: neg,
      mod: mod,
      rsltv: rsltv,
      rgloss: rgloss,
      dub: dub,
      altr: altr
    });
  });

  console.log("Verb data loaded:", verbData);
}

// function for grouping duplicate word forms and count them 
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

// Displaying results on page 
function displayResults(results, searchTerm, selectAttribute) {  ///pushes selectAttribute now (wordForm, root)
  const wordFormList = document.getElementById("wordFormList");
  wordFormList.innerHTML = "";

  const heading = document.createElement("h4");
  heading.textContent = `Results for roots: ${searchTerm}`; //display search term 

  ///so it clears 
  const glosshere = document.getElementById("glosshere");
  if (glosshere) {
    glosshere.textContent = "";
  }


  const word = document.getElementById("word");
  if (word) {
    if (searchTerm === "") {
      word.textContent = "Results for selected filters:";

    } else if (selectAttribute === "wordForm") {
      word.textContent = `${searchTerm}`;
    } else {
      word.textContent = `${searchTerm}`;

    }
  }

  const thinnerword = document.getElementById("thinnerword");
  if (thinnerword) {
    if (selectAttribute === "wordForm") {
      thinnerword.textContent = `${searchTerm}`;
    } else {
      thinnerword.textContent = `${searchTerm}`;

    }
  }


  const resultCount = document.getElementById("resultCount");
  if (resultCount) {
    if (selectAttribute === "wordForm") {
      resultCount.textContent = `Retrieved word form represented by ${results.length} result(s)`;
    } else {
      resultCount.textContent = `Retrieved lementa represented by ${results.length} result(s)`;
    }
  }


  const numberCount = document.getElementById("numberCount");
  if (numberCount) {
    if (selectAttribute === "wordForm") {
      numberCount.textContent = `Count: ${results.length}`;
    } else {
      numberCount.textContent = `Count: ${results.length}`;
    }
  }

  //// will return no matches if no matches found 
  if (results.length === 0) {
    const listItem = document.createElement("li");
    listItem.textContent = "No results found.";
    wordFormList.appendChild(listItem);
    return;
  }



  ///for each verb when you click on it 
  results.forEach((verb) => {

    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = `${verb.wordForm} (${verb.count})`; //displays wordform and count

    link.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Clicked word form:", verb.wordForm);
      showOccurrencesForWordForm(verb.wordForm);
    });
    listItem.appendChild(link);

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

  const firstVerb = occurrences[0];

  const glosshere = document.getElementById("glosshere");
  if (glosshere) {
    glosshere.textContent = `"${firstVerb.gloss}"`;
  }


  occurrences.forEach((verb) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${verb.padaId}: ${verb.padaText}`;

    const etrans = document.createElement("h4");
    etrans.textContent = `Translation: ${verb.trans}`;

    const preverbInfo = document.createElement("p");
    if (!verb.pv || verb.pv === "0") {
      preverbInfo.textContent = "Preverb: none";
    } else {
      preverbInfo.textContent = `Root gloss: ${verb.rgloss}`;
    }

    ///altr = alternative text
    if (verb.altr) {
      const altTranslation = document.createElement("p");
      altTranslation.textContent =
        `Alternative translation: ${verb.altr}`;

      wordFormList.appendChild(altTranslation);
    }
    wordFormList.appendChild(listItem);
    wordFormList.appendChild(etrans);
    wordFormList.appendChild(preverbInfo);
  });
}

testXML();