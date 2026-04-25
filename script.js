const collocationGroups = [
  {
    title: "Education & Society",
    items: [
      "responsible members of society",
      "shape someone's character",
      "social values",
      "structured environment",
      "acquire knowledge",
      "develop social skills",
      "diverse perspectives",
      "cooperate with others",
      "contribute to society",
    ],
  },
  {
    title: "School context",
    items: [
      "standardized curricula",
      "classroom activities",
      "group projects",
      "develop teamwork skills",
      "communication skills",
      "large class sizes",
      "individual attention",
      "shape personal values",
    ],
  },
  {
    title: "Family influence",
    items: [
      "moral development",
      "family environment",
      "fundamental values",
      "provide guidance",
      "individualized support",
      "role-modelling",
      "instil values",
      "positive behaviours",
      "supportive environment",
    ],
  },
  {
    title: "Argument language",
    items: [
      "play a crucial role in",
      "be strongly influenced by",
      "be more likely to",
      "have a lasting impact on",
      "contribute significantly to",
      "form the foundation of",
    ],
  },
];

const fillQuestions = [
  {
    prompt: "Parents play a __________ in shaping children's behaviour.",
    answer: "crucial role",
  },
  {
    prompt: "Schools provide a __________ where students can develop social skills.",
    answer: "structured environment",
  },
  {
    prompt: "Children are strongly __________ their family environment.",
    answer: "influenced by",
  },
  {
    prompt: "Group work helps students __________ and communication skills.",
    answer: "develop teamwork skills",
  },
];

const rewriteQuestions = [
  {
    prompt: "Rewrite: Parents help children learn what is right and wrong.",
    hint: "Use: moral development",
    answer: "Parents support children's moral development.",
  },
  {
    prompt: "Rewrite: Values learned at home can affect behaviour for a long time.",
    hint: "Use: have a lasting impact on",
    answer: "Values learned at home can have a lasting impact on behaviour.",
  },
  {
    prompt: "Rewrite: Schools help a lot with academic and social development.",
    hint: "Use: contribute significantly to",
    answer: "Schools contribute significantly to academic and social development.",
  },
];

const choiceQuestions = [
  {
    prompt: "Which collocation best completes the sentence? Parents can __________ a child's moral and social development.",
    answer: "form the foundation of",
    options: ["form the foundation of", "large class sizes", "group projects", "diverse perspectives"],
  },
  {
    prompt: "Which phrase fits best? Through discussions, students are exposed to __________.",
    answer: "diverse perspectives",
    options: ["individual attention", "diverse perspectives", "positive behaviours", "role-modelling"],
  },
  {
    prompt: "Which phrase fits best? Teachers may struggle to support everyone because of __________.",
    answer: "large class sizes",
    options: ["family environment", "large class sizes", "fundamental values", "social values"],
  },
];

const matchQuestions = [
  {
    prompt: "A place with routines, rules, and learning support",
    answer: "structured environment",
  },
  {
    prompt: "Care designed for one child's needs",
    answer: "individualized support",
  },
  {
    prompt: "Learning by watching parents' behaviour",
    answer: "role-modelling",
  },
  {
    prompt: "Helping the community or wider society",
    answer: "contribute to society",
  },
];

const matchOptions = [
  "structured environment",
  "individualized support",
  "role-modelling",
  "contribute to society",
  "standardized curricula",
  "communication skills",
];

function normalizeAnswer(value) {
  return value.trim().toLowerCase().replace(/[.,!?]/g, "").replace(/\s+/g, " ");
}

function renderCollocations() {
  const grid = document.querySelector("#collocationGrid");
  grid.innerHTML = collocationGroups
    .map(
      (group) => `
        <article class="collocation-group">
          <h3>${group.title}</h3>
          <div class="chip-list">
            ${group.items.map((item) => `<span class="chip">${item}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderFillQuestions() {
  const container = document.querySelector('[data-activity="fill"]');
  container.innerHTML = fillQuestions
    .map(
      (question, index) => `
        <div class="question-card">
          <label for="fill-${index}">${index + 1}. ${question.prompt}</label>
          <input id="fill-${index}" type="text" autocomplete="off" placeholder="Type the collocation" />
        </div>
      `
    )
    .join("");
}

function renderRewriteQuestions() {
  const container = document.querySelector('[data-activity="rewrite"]');
  container.innerHTML = rewriteQuestions
    .map(
      (question, index) => `
        <div class="question-card">
          <label for="rewrite-${index}">${index + 1}. ${question.prompt}</label>
          <p>${question.hint}</p>
          <input id="rewrite-${index}" type="text" autocomplete="off" placeholder="Write your sentence" />
        </div>
      `
    )
    .join("");
}

function renderChoiceQuestions() {
  const container = document.querySelector('[data-activity="choice"]');
  container.innerHTML = choiceQuestions
    .map(
      (question, index) => `
        <div class="question-card">
          <p>${index + 1}. ${question.prompt}</p>
          <div class="choice-list">
            ${question.options
              .map(
                (option) => `
                  <label class="choice-option">
                    <input type="radio" name="choice-${index}" value="${option}" />
                    <span>${option}</span>
                  </label>
                `
              )
              .join("")}
          </div>
        </div>
      `
    )
    .join("");
}

function renderMatchQuestions() {
  const container = document.querySelector('[data-activity="match"]');
  container.innerHTML = matchQuestions
    .map(
      (question, index) => `
        <div class="match-row">
          <div class="match-prompt">${index + 1}. ${question.prompt}</div>
          <select aria-label="Match for ${question.prompt}" id="match-${index}">
            <option value="">Choose a collocation</option>
            ${matchOptions.map((option) => `<option value="${option}">${option}</option>`).join("")}
          </select>
        </div>
      `
    )
    .join("");
}

function showFeedback(activity, score, total) {
  const feedback = document.querySelector(`[data-feedback="${activity}"]`);
  const perfect = score === total;
  feedback.className = `feedback ${perfect ? "good" : "needs-work"}`;
  feedback.textContent = perfect
    ? `Perfect: ${score}/${total}. Your collocations are glowing.`
    : `Score: ${score}/${total}. Check the highlighted collocations in the essay and try again.`;
}

function checkFill() {
  const score = fillQuestions.reduce((total, question, index) => {
    const input = document.querySelector(`#fill-${index}`);
    return total + (normalizeAnswer(input.value) === normalizeAnswer(question.answer) ? 1 : 0);
  }, 0);
  showFeedback("fill", score, fillQuestions.length);
}

function checkRewrite() {
  const score = rewriteQuestions.reduce((total, question, index) => {
    const input = document.querySelector(`#rewrite-${index}`);
    return total + (normalizeAnswer(input.value) === normalizeAnswer(question.answer) ? 1 : 0);
  }, 0);
  showFeedback("rewrite", score, rewriteQuestions.length);
}

function checkChoice() {
  const score = choiceQuestions.reduce((total, question, index) => {
    const selected = document.querySelector(`input[name="choice-${index}"]:checked`);
    return total + (selected?.value === question.answer ? 1 : 0);
  }, 0);
  showFeedback("choice", score, choiceQuestions.length);
}

function checkMatch() {
  const score = matchQuestions.reduce((total, question, index) => {
    const select = document.querySelector(`#match-${index}`);
    return total + (select.value === question.answer ? 1 : 0);
  }, 0);
  showFeedback("match", score, matchQuestions.length);
}

function setupTabs() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      document.querySelectorAll(".tab-button").forEach((tab) => {
        tab.classList.toggle("active", tab === button);
        tab.setAttribute("aria-selected", String(tab === button));
      });

      document.querySelectorAll(".activity-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === target);
      });
    });
  });
}

function setupChecks() {
  document.querySelector('[data-check="fill"]').addEventListener("click", checkFill);
  document.querySelector('[data-check="rewrite"]').addEventListener("click", checkRewrite);
  document.querySelector('[data-check="choice"]').addEventListener("click", checkChoice);
  document.querySelector('[data-check="match"]').addEventListener("click", checkMatch);
}

renderCollocations();
renderFillQuestions();
renderRewriteQuestions();
renderChoiceQuestions();
renderMatchQuestions();
setupTabs();
setupChecks();
