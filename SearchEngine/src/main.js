import './style.css';

///creates empty array that we later store string from 
let verbData = [];

/// when we press submit 
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();

   /////changes search input to lowercase so values aren't filtered out 
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase(); 
  const selectedAttribute = document.getElementById("attribute").value; 

  const selectedFilters = Array.from(
    document.querySelectorAll(".filter-scroll input:checked")
  ).map((checkbox) => checkbox.value);

  const selectedVoice = Array.from(
    document.querySelectorAll("input[name='voice[]']:checked"))
    ////loops though checkbox grabs specfic data values like m and put them in a list 
    ////puts them into variable const selectedvoices
    .map((checkbox => checkbox.value));

  const selectedMood = Array.from(
    document.querySelectorAll("input[name='mood[]']:checked"))
    .map((checkbox => checkbox.value));

  const selectedGender = Array.from(
    document.querySelectorAll("input[name='gender[]']:checked"))
    .map((checkbox => checkbox.value));

  const selectedCasee = Array.from(
    document.querySelectorAll("input[name='casee[]']:checked"))
    .map((checkbox => checkbox.value));

  const selectedNumber = Array.from(
    document.querySelectorAll("input[name='number[]']:checked"))
    .map((checkbox => checkbox.value));

  const selectedPerson = Array.from(
    document.querySelectorAll("input[name='person[]']:checked"))
    .map((checkbox => checkbox.value));

  const selectedTensev = Array.from(
    document.querySelectorAll("input[name='tensev[]']:checked"))
    .map((checkbox => checkbox.value));

  const selectedUsage = Array.from(
    document.querySelectorAll("input[name='usage[]']:checked"))
    .map((checkbox => checkbox.value));

  const selectedPvv = Array.from(
    document.querySelectorAll("input[name='pvv[]']:checked"))
    .map((checkbox => checkbox.value));


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
      mod : mod,
      rsltv : rsltv, 
      rgloss: rgloss, 
      dub: dub, 
      altr : altr
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


  const countText = document.createElement("p"); 
  countText.textContent = ` ${results.length} result(s) found`; 
  wordFormList.appendChild(countText); 

  //// will return no matches if no matches found 
  if (results.length === 0) {
    const listItem = document.createElement("li");
    listItem.textContent = "No results found.";
    wordFormList.appendChild(listItem);
    return;
  }
  // empty + filter -> results for selected filter. root-> result for root
  if (searchTerm === "") {
    heading.textContent = "Results for selected filters:";
  }else if(selectAttribute === "wordForm"){
    heading.textContent = `Results for word form: ${searchTerm}`;
  }else {
    heading.textContent = `Results for root: ${searchTerm}`;
  }


  wordFormList.appendChild(heading); 
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

  const glossHeading = document.createElement("h4");
  glossHeading.textContent = `Gloss: ${firstVerb.gloss}`;
  wordFormList.appendChild(glossHeading);

  

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