import './greek.css';


////expand-button
const btn = document.querySelector('.expand-button');
const expandedCard = document.querySelector('.expanded-card');
const collapseBtn = document.querySelector('.collapse-button');

btn.addEventListener('click', function () {
    expandedCard.style.display = "block";

    btn.style.display = "none";
    collapseBtn.style.display = "block";

    collapseBtn.addEventListener('click', function () {
        expandedCard.style.display = "none";
        btn.style.display = "block";
        collapseBtn.style.display = "none";
    });

});


//creates empty array that we later store string from 
let verbData = [];
let lineData = [];

// CHOICE JS --- Preverb

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

new Choices("#modalSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select Modal(s)"
});

new Choices("#textualSelect", {
    removeItemButton: true,
    searchEnabled: true,
    shouldSort: false,
    itemSelectText: "",
    placeholderValue: "Select Textual Reading Filter(s)"
});
requestAnimationFrame(() => {
    document.documentElement.classList.remove("choices-loading");
});


document.getElementById('searchForm').addEventListener('reset', function (event) {
    document.getElementById("textincontext").textContent = "Text in Context";
    document.getElementById("preverbdisplay").textContent = "";
    document.getElementById("translation").textContent = "";
    document.getElementById("tense").textContent = "";
    document.getElementById("mood").textContent = "";
    document.getElementById("case").textContent = "";
    ///document.getElementById("gender").textContent = "";
    document.getElementById("number").textContent = "";
    document.getElementById("person").textContent = "";
    document.getElementById("usage").textContent = "";
    document.getElementById("adv").textContent = "";
    document.getElementById("word").textContent = "Result";
    document.getElementById("thinnerword").textContent = "wordform";
    document.getElementById("wordFormList").innerHTML =
        "<li>No searches yet</li>";
    document.getElementById("glosshere").textContent = "";
    document.getElementById("resultCount").textContent = "";
    document.getElementById("numberCount").textContent = "";
    document.getElementById("note").textContent = "";



});
document.getElementById("searchForm").addEventListener("reset", function () {
    console.log("RESET FIRED");
});


/// when we press submit 
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    /////who nows 
    function getSelectedValues(id) {
        return Array.from(document.getElementById(id).selectedOptions)
            .map(option => option.value);
    }
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const selectedAttribute = document.getElementById("attribute").value;

    const selectedPvv = getSelectedValues("preverbSelect");
    const selectedTensev = getSelectedValues("tenseSelect");
    const selectedUsage = getSelectedValues("timeSelect");
    const selectedMood = getSelectedValues("moodSelect");
    const selectedVoice = getSelectedValues("voiceSelect");
    const selectedCasee = getSelectedValues("caseSelect");
   /// const selectedGender = getSelectedValues("genderSelect");
    const selectedPerson = getSelectedValues("personSelect");
    const selectedNumber = getSelectedValues("numberSelect");
    const selectedFilters = getSelectedValues("filterSelect");
    const selectedModal = getSelectedValues("modalSelect");
    const selectedTextual = getSelectedValues("textualSelect");
    const selectedFormal = getSelectedValues("formalSelect");

    if (selectedAttribute === "line") {
        if (searchTerm === "") {
            displayLineResults([], searchTerm, true);
            return;
        }

        const matchingLines = lineData.filter((line) => {
            return line.id.toLowerCase() === searchTerm;
        });

        displayLineResults(matchingLines, searchTerm, false);
        return;
    }

    //// changes output to lowercase so values aren't filtered out 
    const matches = verbData.filter((verb) => {
        const matchesSearch =
            ///searchTerm === "" (so when we put it as balnk someitmes for search it doesnt tweak out and states it as valid)
            searchTerm === "" ||
            verb[selectedAttribute]?.trim().toLowerCase() === searchTerm; ////gets selected attribute if root selected root. wordform wordform 

        /// If clicked its true so abtituary value should be 1 
        const matchesFilters = selectedFilters.every((filter) => {
            if (filter === "altr") {
                return verb.altr !== "1";
            }
            return verb[filter] === "1";
        });

        const matchesTextual =
            selectedTextual.length === 0 ||
            selectedTextual.every((filter) => {
                if (filter === "altr") {
                    return !verb.altr?.trim();
                }
                return true;
            });

        const matchesFormal =
            selectedFormal.length === 0 ||
            selectedFormal.some((filter) => {
                if (filter === "neg") {
                    return verb.neg === "1";
                }

                if (filter === "aug") {
                    return verb.aug === "1";
                }

                return true;
            });
        ///review these filters added 
        const matchesModal =
            selectedModal.length === 0 ||
            selectedModal.every((filter) => {

                if (filter === "mod") {
                    return verb.mod === "1";
                }

                if (filter === "nonmod") {
                    return verb.mod === "0" || !verb.mod;
                }

                if (filter === "dir") {
                    return verb.dir === "1";
                }

                if (filter === "prohib") {
                    return verb.prohib === "1";
                }

                if (filter === "directive") {
                    return verb.dir === "1" || verb.prohib === "1";
                }

                if (filter === "funcsjv") {
                    return verb.sjv === "1";
                }

                if (filter === "funcopt") {
                    return verb.opt === "1";
                }



                return true;
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

       // const matchesGender =
       //     selectedGender.length === 0 || selectedGender.some((gender) => {
        //        return verb.parse?.includes(gender);
        //    });

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
        console.log(verb.mod);

        return matchesFilters && matchesVoice && matchesMood && matchesCasee && matchesNumber && matchesPerson && matchesTensev && matchesUsage && matchesPvv && matchesSearch && matchesModal && matchesTextual && matchesFormal;
    });

    ///console logs 
    console.log("Matches:", matches);
    console.log("Selected Filters:", selectedFilters)
    console.log("Search term:", searchTerm);


    const groupedResults = groupWordForms(matches);

    groupedResults.sort((a, b) => {
        return b.count - a.count;
    });

    displayResults(groupedResults, searchTerm, selectedAttribute);
});

// Load and process XML file 
async function testXML() {
    const response = await fetch("/iliad_1.xml"); ////fetches rv2 file 
    const xmlText = await response.text();

    ////Converts raw data into readable files for the system 
    const parser = new DOMParser();

    const xmlDoc = parser.parseFromString(
        xmlText,
        "application/xml"
    );

    const lines = xmlDoc.querySelectorAll("l");

    lineData = Array.from(lines).map((line) => {
        return {
            id: line.getAttribute("n") || "",
            text: line.textContent.trim()
        };
    });

    console.log("Greek line data loaded:", lineData);


    const verbs = xmlDoc.querySelectorAll("Verb, Verbal");
    ///finds verb element in xml 
    verbData = [];


    ////takes that long string and gets the individual roots, gloss 
    verbs.forEach((verb) => {
        const wordForm = verb.textContent.trim();
        const root = verb.getAttribute("lemma") || "";
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

        const line = verb.closest("l"); ////aka lines orignally pada 
        const padaId = line?.getAttribute("n") || ""; ///// hmm
        const padaText = line?.textContent.trim();

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
        const mood = verb.getAttribute("mood");
        const voice = verb.getAttribute("voice");
        const casee = verb.getAttribute("case");
      ////  const gender = verb.getAttribute("gender");
        const number = verb.getAttribute("number");
        const person = verb.getAttribute("person");
        const dir = verb.getAttribute("dir");
        const prohib = verb.getAttribute("prohib");
        const sjv = verb.getAttribute("sjv");
        const opt = verb.getAttribute("opt");
        const adv = verb.getAttribute("adv");
        const note = verb.getAttribute("note");


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
            altr: altr,
            mood,
            voice,
            casee,
            ///gender,
            number,
            person,
            mod,
            dir,
            prohib,
            sjv,
            opt,
            adv,
            note,




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

function clearMiniResults() {
    document.getElementById("textincontext").textContent = "Text in Context";
    document.getElementById("preverbdisplay").textContent = "";
    document.getElementById("translation").textContent = "";
    document.getElementById("tense").textContent = "";
    document.getElementById("mood").textContent = "";
    document.getElementById("case").textContent = "";
   /// document.getElementById("gender").textContent = "";
    document.getElementById("number").textContent = "";
    document.getElementById("person").textContent = "";
    document.getElementById("usage").textContent = "";
    document.getElementById("adv").textContent = "";

}

function displayLineResults(lines, searchTerm, isEmptySearch) {
    const wordFormList = document.getElementById("wordFormList");

    wordFormList.innerHTML = "";
    clearMiniResults();

    document.getElementById("word").textContent =
        searchTerm || "Line Search";

    document.getElementById("thinnerword").textContent = "Line";
    document.getElementById("glosshere").textContent = "";
    document.getElementById("numberCount").textContent = "";

    if (isEmptySearch) {
        document.getElementById("resultCount").textContent = "";

        const listItem = document.createElement("li");
        listItem.textContent = "Please enter a line number.";
        wordFormList.appendChild(listItem);
        return;
    }

    document.getElementById("resultCount").textContent =
        `Retrieved ${lines.length} line(s)`;

    if (lines.length === 0) {
        const listItem = document.createElement("li");
        listItem.textContent = "No line found.";
        wordFormList.appendChild(listItem);
        return;
    }

    lines.forEach((line) => {
        const listItem = document.createElement("li");

        listItem.textContent = `${line.id}: ${line.text}`;
        listItem.classList.add("context-line");

        wordFormList.appendChild(listItem);
    });
}

// Displaying results on page 
function displayResults(results, searchTerm, selectAttribute) {  ///pushes selectAttribute now (wordForm, root)
    const wordFormList = document.getElementById("wordFormList");
    wordFormList.innerHTML = "";

    clearMiniResults();
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



    ///clearing the attribute card
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
    ////gets it again so basicallty results for seleccted filter-> word clicked (like normal)
    document.getElementById("word").textContent = wordForm;
    document.getElementById("thinnerword").textContent = wordForm;
    displayOccurrences(occurrences);
}

function displayDetails(verb) {

    document.getElementById("textincontext").textContent =
        `${verb.padaId}: ${verb.padaText}`;

    /* result display */
    let resultdisplay;

    if (!verb.pv || verb.pv === "0") {
        resultdisplay = "none";
    } else {
        resultdisplay = verb.pv;
    }
    document.getElementById("preverbdisplay").textContent = resultdisplay;


    if (verb.trans) {
        document.getElementById("translation").textContent = verb.trans;
    } else {
        document.getElementById("translation").textContent = "";
    }

    if (verb.mood) {
        document.getElementById("mood").textContent = verb.mood;
    } else {
        document.getElementById("mood").textContent = "";
    }

    const tense = verb.tense || "";

    document.getElementById("tense").textContent =
        tense.includes("Pres") ? "Present" :
            tense.includes("Aor") ? "Aorist" :
                tense.includes("Ipf") ? "Imperfect" :
                    tense.includes("Plpf") ? "Pluperfect" :
                        tense.includes("Pf") ? "Perfect" :
                            tense.includes("Cond") ? "Conditional" :
                                "";

    const parse = verb.parse || "";

    document.getElementById("case").textContent =
        parse.includes("nom") ? "Nominative" :
            parse.includes("gen") ? "Genitive" :
                parse.includes("dat") ? "Dative" :
                    parse.includes("acc") ? "Accusative" :
                        "";

   //document.getElementById("gender").textContent =
    //    parse.includes(".m.") ? "Masculine" :
     //       parse.includes(".f.") ? "Feminine" :
     //           parse.includes(".n.") ? "Neuter" :
      ///              "";

    document.getElementById("number").textContent =
        parse.includes("sg") ? "Singular" :
            parse.includes("pl") ? "Plural" :
                parse.includes("du") ? "Dual" :
                    "";

    document.getElementById("person").textContent =
        parse.includes("1") ? "1st Person" :
            parse.includes("2") ? "2nd Person" :
                parse.includes("3") ? "3rd Person" :
                    "";

    console.log(verb.trans);
    console.log(number);
  //  console.log(gender);
    console.log(verb.tense);


    const noteText = document.getElementById("note");
    const noteRow = document.getElementById("noterow");
    if (verb.note?.trim()) {
        noteRow.style.display = "block";
        document.getElementById("note").textContent = verb.note;
    } else {
        noteRow.style.display = "none";
        noteText.textContent = "";
    }

    const adverbRow = document.getElementById("adverbrow");
    if (verb.adv) {
        adverbRow.style.display = "block";
        document.getElementById("adv").textContent = verb.adv;
    } else {
        adverbRow.style.display = "none";
    }



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

        const highlightedText = verb.padaText.replace(
            verb.wordForm,
            `<span class="highlight-word">${verb.wordForm}</span>`
        );

        listItem.innerHTML = `${verb.padaId}: ${highlightedText}`;

        listItem.classList.add("context-line");

        if (verb.altr === "1") {
            listItem.classList.add("alternative-reading");
        }
        if (verb.dub === "1") {
            listItem.classList.add("dubious-reading");
        }

        listItem.addEventListener("click", () => {
            displayDetails(verb);
        });

        wordFormList.appendChild(listItem);
    });
}

testXML();

/* keyboard */


/* Greek keyboard */

const searchInput = document.getElementById("searchInput");
const keyboardButton = document.getElementById("keyboardButton");
const greekKeyboard = document.getElementById("greekKeyboard");

keyboardButton.addEventListener("click", () => {
    greekKeyboard.hidden = !greekKeyboard.hidden;
});

greekKeyboard.addEventListener("click", (event) => {
    const key = event.target.closest("[data-char]");

    if (!key) {
        return;
    }

    const character = key.dataset.char;
    const start = searchInput.selectionStart ?? searchInput.value.length;
    const end = searchInput.selectionEnd ?? searchInput.value.length;

    searchInput.value =
        searchInput.value.slice(0, start) +
        character +
        searchInput.value.slice(end);

    const newCursorPosition = start + character.length;

    searchInput.focus();
    searchInput.setSelectionRange(
        newCursorPosition,
        newCursorPosition
    );
});