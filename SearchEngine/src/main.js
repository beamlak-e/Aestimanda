import './style.css'


document.getElementById('searchForm')
.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const searchTerm = document.getElementById('searchInput').value; // Get the search term from the input field
    
    const attribute = document.getElementById('attribute').value; // Get the selected attribute from the dropdown
     
    ///// okay so basically we have the search term and the attribute that the user wants to search by but we need to figure out how to use that information to perform the search and display the results.
    /// / we can use the search term and attribute to query our database or API and retrieve the relevant results. Once we have the results, we can display them in the #Results div. We can also add some styling to make the results look nice and organized.
   /// const selectAttribute = document.getElementById('selectAttribute').value; // Get the selected attribute from the dropdown
    
    ///okay i neeed code here for selecting mutiple terms in the drop down for selectAttribute but im unsure how 

    /// add selectAtttirbutes back later for verison 2: selectAttribute
    console.log(searchTerm, attribute); // Log the search term and attribute to the console (for demonstration purposes)

}); 


/// test added this ust grabs all fo the text i think from the RV2
async function testXML(){
  const response = await fetch("/RV2.xml"); 
  const xmlText = await response.text();

  const parser = new DOMParser(); 
   const xmlDoc = parser.parseFromString(
    xmlText,
   "application/xml"); /// this is where the xml text is being parsed into a document object that we can work with in JavaScript.
   
   
   const verbs = xmlDoc.querySelectorAll("Verb");

   ////Testing if we can get the wordform and the root and gloss :)
  
   const verbData = []; 

   verbs.forEach((verb) => {
     const wordForm = verb.textContent.trim(); /// this is where we are getting the text content of the verb element and trimming any whitespace from it. This will give us the word form of the verb.
     const root = verb.getAttribute("root");
     const gloss = verb.getAttribute("gloss");

     verbData.push({wordForm, root, gloss}); 

   }); 

  console.log(verbData);

  ////now next step is searching manually 
  const matches = verbData.filter((verb) => {
    return verb.root === "jan";
  });
  console.log(matches);
  
}

testXML();

