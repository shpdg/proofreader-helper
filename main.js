const placeholders = { // I tried making this a separate file and then importing it; it didn't work and I couldn't figure out why.
  sections: [
    "Taco recipe",
    "Recipe",
    "Rocket Blueprint",
    "main.js",
    "Instructions",
    "Section One",
    "Slide One",
    "Slide 42",
    "Russia",
    "index.html",
    "Slide 1",
    "README",
    "Action plan",
    "Disaster planning kit",
    "Main page",
    "Brochure",
    "Campaign goals",
    "Plan #1",
    "Ad campaign",
    "Plan of action",
    "Slide five",
    "Grading policy",
    "Section 18",
    "Ingredients list",
    "Page 87",
    "'Evil Unicorns' section",
    "Plan #3",
    "Third caption",
    "Subtitles",
    "Homepage",
    "First-aid kit section",
    "Chapter three",
    "Chapter ten",
    "Bullet point #10",
    "Third JSON file",
    "Section #13",
    "Two",
    "Section #1",
    "Banana pie recipe",
    "Video notes",
    "Worksheet #1",
    "Summer camp brochure",
    "Page 95",
    "Plan #18",
    "Article 3",
    "Article 5",
    "Page 90",
    "Number three",
    "Biography",
    "'History' section"
  ],
  errors: {
    'ardvark': 'aardvark',
    'hllo': 'hello',
    'united states': 'United States',
    'Aerodynamis': 'Aerodynamics',
    'hi': 'hi :)',
    'Kiwis are a fruit.': 'Kiwis are a bird.',
    'puppi': 'puppy',
    'wrning': 'warning',
    '... dogs are not cute': '... dogs are cute',
    'That\'s a tyop.': 'That\'s a typo.',
    'dont': 'don\'t',
    'kittens!': 'cats!',
    'pnumonoultramicroscopicsilicovolcanoconiosis': 'pneumonoultramicroscopicsilicovolcanoconiosis',
    'Example.net': 'Example.com',
    'json': 'JSON',
    'it depends on the context?': 'It depends on the context.',
    'i like txting': 'I like texting.',
    '43': '42',
    'random': 'pseudorandom',
    'agre': 'agree'
  }
}

const originalErrorPlaceholders = Object.keys(placeholders.errors); // thanks: https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/

const randNum50 = _ => Math.floor(Math.random() * 50); // find random number between 0 and 50
const randNum20 = _ => Math.floor(Math.random() * 20); // find random number betweeen 0 and 20

function generateRandomPlaceholder(inputType) {
  if (inputType === 'section') {
    return placeholders.sections[randNum50()];
  } else { // i.e. if inputType === 'error'
    let randomErrorPlaceholder = originalErrorPlaceholders[randNum20()];
    return [randomErrorPlaceholder, placeholders.errors[randomErrorPlaceholder]];
  }
}

const finalArray = [];

let currentInputType = 'section';

const sectionNameInput = document.getElementById('section-name-input');
sectionNameInput.setAttribute('placeholder', generateRandomPlaceholder('section'));

const inputArea = document.getElementById('input-area');

function recordCurrentInput() { // records the input currently in the box(es)
  if (currentInputType === 'section') {
    finalArray.push(document.getElementById('section-name-input').value);
  } else { // i.e. if currentInputType === 'error', since that's the only other option
    let obj = {};
    obj[document.getElementById('original-text-input').value] = document.getElementById('new-text-input').value;
    finalArray.push(obj);
  }
  console.log(`Current recorded input: ${finalArray}`);
}

const errorInputArea = document.getElementById('error-input-area');

function nextError() { // makes new error boxes appear (not using innerHTML anymore, yay)
  recordCurrentInput();
  currentInputType = 'error';
  let placeholderArray = generateRandomPlaceholder('error');

  errorInputArea.textContent = '';

  let originalTextInputArea = document.createElement('input');
  originalTextInputArea.setAttribute('type', 'text'); // thanks: https://stackoverflow.com/a/11515428
  originalTextInputArea.setAttribute('id', 'original-text-input');
  originalTextInputArea.setAttribute('name', 'Original Text');
  originalTextInputArea.setAttribute('placeholder', placeholderArray[0]);

  let newTextInputArea = document.createElement('input');
  newTextInputArea.setAttribute('type', 'text');
  newTextInputArea.setAttribute('id', 'new-text-input');
  newTextInputArea.setAttribute('name', 'New Text');
  newTextInputArea.setAttribute('placeholder', placeholderArray[1]);

  let arrow = document.createTextNode(' → ');
  errorInputArea.appendChild(originalTextInputArea);
  errorInputArea.appendChild(arrow);
  errorInputArea.appendChild(newTextInputArea);
  // Here is the old code I was using. I changed it to the above so that I wasn't using innerHTML anymore.
  // inputArea.innerHTML = `<input type="text" id="original-text-input" name="Original Text" placeholder="${placeholderArray[0]}"></input> → <input type="text" id="new-text-input" name="New" placeholder="${placeholderArray[1]}"></input>`;
}

function nextSection() { // makes the "Section name:" box appear (also not using innerHTML anymore, yay)
  recordCurrentInput();
  currentInputType = 'section';

  errorInputArea.textContent = '';

  let sectionNameInput = document.createElement('input');
  sectionNameInput.setAttribute('type', 'text'); // thanks: https://stackoverflow.com/a/11515428
  sectionNameInput.setAttribute('id', 'section-name-input');
  sectionNameInput.setAttribute('name', 'section-name-input');
  sectionNameInput.setAttribute('placeholder', generateRandomPlaceholder('section'));

  let sectionNameInputLabel = document.createElement('label');
  sectionNameInputLabel.setAttribute('for', 'section-name-input');
  sectionNameInputLabel.textContent = 'Section name: ';

  errorInputArea.appendChild(sectionNameInputLabel);
  errorInputArea.appendChild(sectionNameInput);

  // Here is the old code I was using. I changed it to the above so that I wasn't using innerHTML anymore.
  // inputArea.innerHTML = `<label for="section-name-input">Section name:</label> <input type="text" id="section-name-input" name="section-name-input" placeholder="${generateRandomPlaceholder('section')}"></input>`
}

function convert(outputArray, outputType) { // converts an outputArray (which is the JSON output) to other formats, like BBCode etc.
  returnString = `${outputType.toUpperCase()}:\n`;
  let onlyKey = '';
  switch (outputType) {
    case 'plaintext':
      outputArray.forEach(element => {
        if (typeof(element) === 'string') {
          returnString += `\n${element}:\n`;
        } else { // i.e. if it's an object (the only other possible option)
          onlyKey = Object.keys(element);
          returnString += `- "${onlyKey[0]}" → "${element[onlyKey[0]]}"\n`;
        }
      })
      break;
    case 'bbcode':
      outputArray.forEach(element => {
        if (typeof(element) === 'string') {
          if (element === outputArray[0] && element !== outputArray[outputArray.length - 1]) {
            returnString += `\n[b]${element}:[/b]\n[list]\n`;
          } else if (element !== outputArray[outputArray.length - 1] && element !== outputArray[outputArray.length - 1]) {
            returnString += `[/list]\n\n[b]${element}:[/b]\n[list]\n`;
          } else if (element === outputArray[0] && element === outputArray[outputArray.length - 1]) {
            returnString += `\n[b]${element}:[/b]\n`;
          } else { // i.e. if element !== outputArray[0] && element === outputArray[outputArray.length - 1]
            returnString += `[/list]\n\n[b]${element}:[/b]`;
          }
        } else {
          onlyKey = Object.keys(element);
          if (element !== outputArray[outputArray.length - 1]) {
            onlyKey = Object.keys(element);
            returnString += `[*] "${onlyKey[0]}" → "${element[onlyKey[0]]}"\n`;
          } else {
            returnString += `[*] "${onlyKey[0]}" → "${element[onlyKey[0]]}"\n[/list]`;
          }
        }
      })
      break;
    case 'markdown':
      outputArray.forEach(element => {
        if (typeof(element) === 'string') {
          returnString += `\n**${element}:**\n`;
        } else {
          onlyKey = Object.keys(element);
          returnString += `- "${onlyKey[0]}" → "${element[onlyKey[0]]}"\n`;
        }
      })
      break;
    case 'wikitext':
      outputArray.forEach(element => {
        if (typeof(element) === 'string') {
          returnString += `\n'''${element}:'''\n`;
        } else {
          onlyKey = Object.keys(element);
          returnString += `* "${onlyKey[0]}" → "${element[onlyKey[0]]}"\n`;
        }
      })
      break;
    case 'html':
      outputArray.forEach(element => {
        if (typeof(element) === 'string') {
          if (element === outputArray[0] && element !== outputArray[outputArray.length - 1]) {
            returnString += `\n<b>${element}:</b>\n<ul>\n`;
          } else if (element !== outputArray[outputArray.length - 1] && element !== outputArray[outputArray.length - 1]) {
            returnString += `</ul>\n\n<b>${element}:</b>\n<ul>\n`;
          } else if (element === outputArray[0] && element === outputArray[outputArray.length - 1]) {
            returnString += `\n<b>${element}:<b>\n`;
          } else { // i.e. if element !== outputArray[0] && element === outputArray[outputArray.length - 1]
            returnString += `</ul>\n\n<b>${element}:</b>`;
          }
        } else {
          onlyKey = Object.keys(element);
          if (element !== outputArray[outputArray.length - 1]) {
            onlyKey = Object.keys(element);
            returnString += `<li>"${onlyKey[0]}" → "${element[onlyKey[0]]}"</li>\n`;
          } else {
            returnString += `<li>"${onlyKey[0]}" → "${element[onlyKey[0]]}"</li>\n</ul>`;
          }
        }
      });
      break;
    case 'json':
      returnString += `\n${JSON.stringify(outputArray)}`;
      break;
  }
  return returnString;
}

function outputInit(typeOfOutput) { // creates a read-only output box for a given output type (e.g. BBCode)
  let outputBox = document.createElement('textarea'); // thanks: https://stackoverflow.com/a/11515428
  outputBox.setAttribute('id', typeOfOutput);
  outputBox.setAttribute('name', typeOfOutput);
  outputBox.setAttribute('rows', '20');
  outputBox.setAttribute('cols', '30');
  outputBox.setAttribute('readonly', null);
  outputBox.value = convert(finalArray, typeOfOutput);
  inputArea.appendChild(outputBox);
}

function finished() { // runs outputInit() for each output type, thus making output boxes appear for each
  recordCurrentInput();
  errorInputArea.textContent = '';
  inputArea.removeChild(document.getElementById('buttons'));
  outputInit('plaintext');
  outputInit('bbcode');
  outputInit('markdown');
  outputInit('wikitext');
  outputInit('html');
  outputInit('json');
  // ** I've heard that using the "innerHTML" method is a bad idea. I was originally using it, but I converted it to use DOM methods instead. Here's some code using innerHTML:
  // inputArea.innerHTML = `<textarea id="plaintext" name="plaintext" rows="20" cols="50" readonly>${convert(finalArray, 'plaintext')}</textarea>
  // <textarea id="bbcode" name="bbcode" rows="20" cols="50" readonly>${convert(finalArray, 'bbcode')}</textarea>
  // <textarea id="markdown" name="markdown" rows="20" cols="50" readonly>${convert(finalArray, 'markdown')}</textarea>
  // <textarea id="wikitext" name="wikitext" rows="20" cols="50" readonly>${convert(finalArray, 'wikitext')}</textarea>
  // <textarea id="html" name="html" rows="20" cols="50" readonly>${convert(finalArray, 'html')}</textarea>
  // <textarea id="json" name="json" rows="20" cols="50" readonly>${convert(finalArray, 'json')}</textarea>
  // `
  // document.getElementById('buttons').innerHTML = '';
}

const nextErrorButton = document.getElementById('next-error');
const nextSectionButton = document.getElementById('next-section');
const finishedButton = document.getElementById('finished');

nextErrorButton.addEventListener('click', nextError);
nextSectionButton.addEventListener('click', nextSection);
finishedButton.addEventListener('click', finished);
