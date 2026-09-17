// ---------- Tijdlijn scroll knoppen ----------
const timeline = document.getElementById('timeline');
const arrowLeft = document.querySelector('.tl-arrow-left');
const arrowRight = document.querySelector('.tl-arrow-right');

function scrollTimeline(amount) {
  timeline.scrollBy({ left: amount, behavior: 'smooth' });
}
arrowLeft?.addEventListener('click', () => scrollTimeline(-320));
arrowRight?.addEventListener('click', () => scrollTimeline(320));

// ---------- Chatbot: Vraag het Rob ----------
const toggleBtn = document.getElementById('eindje-toggle');
const windowEl = document.getElementById('eindje-window');
const closeBtn = document.getElementById('eindje-close');
const messagesEl = document.getElementById('eindje-messages');
const formEl = document.getElementById('eindje-form');
const inputEl = document.getElementById('eindje-input');
const quickEl = document.getElementById('eindje-quick');

const KNOWLEDGE = [
  {
    keywords: ['1232', 'stadsrecht', 'ontstaan', 'opgericht', 'begin', 'gesticht'],
    answer: "Eindhoven kreeg op 21 september 1232 stadsrechten van hertog Hendrik I van Brabant. Daarom vieren we in 2032 precies 800 jaar Eindhoven! 🏰"
  },
  {
    keywords: ['800', 'jubileum', 'jarig', 'viering', 'feest'],
    answer: "In 2032 is het 800 jaar geleden dat Eindhoven stadsrechten kreeg (1232). Dat wordt gevierd met een heel jaar aan festiviteiten, georganiseerd in de geest van EHV365! 🎉"
  },
  {
    keywords: ['philips'],
    answer: "Philips werd op 1 mei 1891 opgericht door Gerard en Anton Philips als gloeilampenfabriek. Het groeide uit tot een wereldwijd technologieconcern en maakte Eindhoven groot. 💡"
  },
  {
    keywords: ['oorlog', 'bombardement', 'bevrijding', 'bevrijd', '1944', 'wo2', 'tweede wereldoorlog'],
    answer: "Eindhoven werd op 18 september 1944 bevrijd tijdens Operatie Market Garden — de eerste grote Nederlandse stad die werd bevrijd. Eerder, in 1942, werden de Philipsfabrieken zwaar gebombardeerd."
  },
  {
    keywords: ['daf'],
    answer: "DAF werd in 1928 opgericht door Hub van Doorne in Eindhoven, eerst als aanhangwagenfabriek, later wereldberoemd om vrachtwagens."
  },
  {
    keywords: ['psv'],
    answer: "PSV (Philips Sport Vereniging) werd in 1913 opgericht door en voor medewerkers van Philips."
  },
  {
    keywords: ['annexatie', '1920', 'woensel', 'stratum', 'strijp', 'gestel', 'tongelre'],
    answer: "Op 1 januari 1920 gingen de gemeenten Woensel, Stratum, Gestel en Blaarthem, Strijp en Tongelre op in Eindhoven. Zo werd Eindhoven in één klap de 5e stad van Nederland."
  },
  {
    keywords: ['naam', 'betekenis', 'waarom heet'],
    answer: "De naam 'Eindhoven' komt vermoedelijk van 'aan het einde van de hoeven' (landbouwpercelen), gelegen bij de samenvloeiing van de Dommel en de Gender."
  },
  {
    keywords: ['tu/e', 'universiteit', 'technische hogeschool', 'th eindhoven'],
    answer: "De Technische Hogeschool Eindhoven (nu TU/e) opende in 1956 haar deuren en maakte van Eindhoven een echte kennisstad."
  },
  {
    keywords: ['strijp-s', 'strijp s'],
    answer: "Strijp-S is een voormalig Philips-fabrieksterrein dat sinds de jaren 2000 is herontwikkeld tot een bruisende creatieve wijk met wonen, cultuur en evenementen."
  },
  {
    keywords: ['brainport', 'slimste regio'],
    answer: "Brainport Eindhoven werd in 2011 door Forbes uitgeroepen tot de 'slimste regio ter wereld' vanwege de sterke samenwerking tussen technologie, bedrijfsleven en kennisinstellingen."
  },
  {
    keywords: ['contact', 'ehv365', 'eindhoven365'],
    answer: "Deze jubileumsite is gemaakt in de stijl van EHV365 (Eindhoven365), de citymarketingorganisatie van de stad. Kijk voor officiële info op eindhoven365.nl of mail info@eindhoven365.nl."
  },
  {
    keywords: ['foto', 'fotos', "foto's", 'afbeelding'],
    answer: "Scroll naar de sectie \"Foto's\" op deze pagina voor oude historische foto's en moderne beelden van Eindhoven!"
  },
  {
    keywords: ['tijdlijn', 'timeline'],
    answer: "In de sectie \"Tijdlijn\" kun je horizontaal scrollen door 800 jaar Eindhovense geschiedenis, van 1232 tot 2032!"
  },
  {
    keywords: ['hallo', 'hoi', 'hey', 'goedemorgen', 'goedemiddag'],
    answer: "Hoi, ik ben Rob! Ik weet alles over de geschiedenis van Eindhoven. Vraag me bijvoorbeeld naar Philips, de bevrijding, of waarom Eindhoven 800 jaar bestaat."
  },
  {
    keywords: ['bedankt', 'dank je', 'dankjewel'],
    answer: "Graag gedaan! Nog een vraag over Eindhoven? Ik hoor het graag. 😊"
  }
];

const FALLBACKS = [
  "Goede vraag! Daar heb ik nog geen kant-en-klaar antwoord op, maar bekijk de sectie 'Geschiedenis' hierboven voor het volledige verhaal van Eindhoven.",
  "Hmm, dat weet ik niet precies. Probeer eens te vragen naar Philips, 1232, de bevrijding of Brainport!",
];

const QUICK_QUESTIONS = [
  "Waarom 800 jaar?",
  "Vertel over Philips",
  "Wat gebeurde in 1944?",
  "Wat is Brainport?"
];

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `eindje-msg ${sender}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function findAnswer(question) {
  const q = question.toLowerCase();
  for (const entry of KNOWLEDGE) {
    if (entry.keywords.some(k => q.includes(k))) {
      return entry.answer;
    }
  }
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

function renderQuickQuestions() {
  quickEl.innerHTML = '';
  QUICK_QUESTIONS.forEach(q => {
    const btn = document.createElement('button');
    btn.textContent = q;
    btn.addEventListener('click', () => handleUserMessage(q));
    quickEl.appendChild(btn);
  });
}

function handleUserMessage(text) {
  if (!text.trim()) return;
  addMessage(text, 'user');
  setTimeout(() => {
    addMessage(findAnswer(text), 'bot');
  }, 400);
}

let initialized = false;
function openChat() {
  windowEl.classList.remove('hidden');
  if (!initialized) {
    addMessage("Hoi! Ik ben Rob, jouw gids door 800 jaar Eindhoven. Waar ben je benieuwd naar?", 'bot');
    renderQuickQuestions();
    initialized = true;
  }
}

toggleBtn.addEventListener('click', () => {
  windowEl.classList.contains('hidden') ? openChat() : windowEl.classList.add('hidden');
});
closeBtn.addEventListener('click', () => windowEl.classList.add('hidden'));

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = inputEl.value;
  inputEl.value = '';
  handleUserMessage(text);
});
