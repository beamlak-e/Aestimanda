# Aestimanda
**A Comparative Corpus of Verbal Usage in Homer and the Rig Veda**

Aestimanda is a web-based corpus exploration tool developed as part of the HDW Undergraduate Fellowship at Washington University in St. Louis. It allows users to search annotated Greek and Sanskrit corpora by lemma, wordform, line identifier, and a variety of morphological and functional filters.

---

# Features

* Greek and Sanskrit corpus search
* Lemma and wordform search
* Line identifier search
* Morphological filtering

  * Tense
  * Mood
  * Voice
  * Case
  * Gender
  * Number
  * Person
* Preverb filtering
* Functional filters
* Interactive Greek and Sanskrit keyboards
* Contextual display of matching passages
* Responsive interface

# Technologies Used

* HTML5
* CSS3
* JavaScript (ES6 Modules)
* Choices.js
* Bootstrap Icons
* Google Fonts

# Project Structure

```text
index.html
greek.html
updatedsanskrit.html
src/
    greek.js
    sanskrit.js
    greek.css
    ...
```

---

# Running the Project

This project is a static website.

Clone the repository and run it using a local development server.

For example:

```bash
npm install
npm run dev
```

or open it using a Live Server extension if appropriate for your setup.
---
# Development Note (Vite)

If you're running this project with Vite:

- Use `/RV2.xml` (and other assets) instead of `/public/RV2.xml`.
- Keep `import "./greek.css";` in the JavaScript if you want Vite to bundle the stylesheet.

The version in this repository is configured for the current deployment environment, which uses `/public/...` asset paths and loads CSS through the HTML instead.

# License

See `License.html` for licensing information and acknowledgements.

---

# Acknowledgements

This project was developed during the HDW Undergraduate Research Fellowship at Washington University in St. Louis.

- **Research project, corpus preparation, and linguistic annotations:** Professor Ian Hollenbaugh
- **Web application design and implementation:** Beamlak Eskender
