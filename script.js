document.addEventListener('DOMContentLoaded', () => {
  // Tab Navigation
  const tabs = document.querySelectorAll('.tab-button');
  const panels = document.querySelectorAll('.activity-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // --- DATA ---
  const fillData = [
    { text: "Schools provide a ", blank: "structured environment", post: " where children learn." },
    { text: "Parents play a ", blank: "crucial role in", post: " guiding moral development." },
    { text: "Children are ", blank: "strongly influenced by", post: " their family environment." },
    { text: "Group projects help students ", blank: "develop teamwork skills", post: "." },
    { text: "Teachers often struggle with ", blank: "large class sizes", post: "." }
  ];

  const choiceData = [
    { q: "Schools help children ________ by interacting with their peers.", opts: ["develop social skills", "standardized curricula", "provide guidance"], ans: "develop social skills" },
    { q: "Teachers use ________ to ensure all students learn the same core topics.", opts: ["fundamental values", "standardized curricula", "diverse perspectives"], ans: "standardized curricula" },
    { q: "Parents help ________ by teaching empathy and respect.", opts: ["shape personal values", "acquire knowledge", "classroom activities"], ans: "shape personal values" },
    { q: "The home setting is also known as the ________.", opts: ["family environment", "structured environment", "classroom activities"], ans: "family environment" },
    { q: "A good citizen is one who can ________.", opts: ["contribute to society", "form the foundation of", "diverse perspectives"], ans: "contribute to society" },
    { q: "Through interaction, students learn to ________.", opts: ["cooperate with others", "instil values", "large class sizes"], ans: "cooperate with others" },
    { q: "Early childhood experiences ________ later life.", opts: ["have a lasting impact on", "standardized curricula", "provide guidance"], ans: "have a lasting impact on" },
    { q: "Learning to share and listen helps to ________.", opts: ["develop teamwork skills", "role-modelling", "fundamental values"], ans: "develop teamwork skills" },
    { q: "Exposure to different cultures provides ________.", opts: ["diverse perspectives", "individualized support", "communication skills"], ans: "diverse perspectives" },
    { q: "Teachers utilize ________ to keep lessons engaging.", opts: ["classroom activities", "form the foundation of", "be more likely to"], ans: "classroom activities" },
    { q: "Empathy and respect are primary examples of ________.", opts: ["fundamental values", "standardized curricula", "group projects"], ans: "fundamental values" },
    { q: "Setting a good example is effective ________.", opts: ["role-modelling", "large class sizes", "acquire knowledge"], ans: "role-modelling" },
    { q: "A ________ helps children feel safe and loved.", opts: ["supportive environment", "structured environment", "standardized curricula"], ans: "supportive environment" },
    { q: "Parents try to ________ like honesty in kids.", opts: ["instil positive behaviours", "contribute significantly to", "diverse perspectives"], ans: "instil positive behaviours" },
    { q: "Good schools help students ________ effectively.", opts: ["acquire knowledge", "have a lasting impact on", "be strongly influenced by"], ans: "acquire knowledge" }
  ];

  const matchData = [
    { col: "structured environment", def: "An organized setting with clear rules" },
    { col: "moral development", def: "Learning the difference between right and wrong" },
    { col: "individualized support", def: "Help tailored to a specific person's needs" },
    { col: "shape someone's character", def: "To influence how a person thinks and behaves" },
    { col: "communication skills", def: "The ability to convey information effectively" },
    { col: "responsible members of society", def: "Citizens who fulfill their social duties" },
    { col: "standardized curricula", def: "Educational programs that are the same for everyone" },
    { col: "form the foundation of", def: "To provide the basic structure or beginning" },
    { col: "contribute significantly to", def: "To play a large part in achieving something" },
    { col: "be strongly influenced by", def: "To be heavily affected by someone or something" },
    { col: "social values", def: "Beliefs about what is good and right in a community" },
    { col: "group projects", def: "Collaborative academic tasks" },
    { col: "provide guidance", def: "To give advice or direction" },
    { col: "be more likely to", def: "To have a higher probability of happening" },
    { col: "have a lasting impact on", def: "To affect something for a long time" }
  ];

  // --- RENDER EXERCISE 1: FILL GAPS ---
  const bankContainer = document.getElementById('draggable-bank');
  const fillContainer = document.getElementById('fill-questions');
  
  fillData.forEach(item => {
    // Populate word bank
    const span = document.createElement('span');
    span.className = 'draggable-item';
    span.draggable = true;
    span.textContent = item.blank;
    span.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', item.blank));
    bankContainer.appendChild(span);

    // Populate questions
    const div = document.createElement('div');
    div.className = 'question-row fill-row';
    div.innerHTML = `${item.text} <input type="text" class="drop-input" data-answer="${item.blank}" placeholder="Drop or type here"> ${item.post}`;
    fillContainer.appendChild(div);
  });

  // Setup Drag & Drop on inputs
  document.querySelectorAll('.drop-input').forEach(input => {
    input.addEventListener('dragover', (e) => {
      e.preventDefault();
      input.classList.add('drag-over');
    });
    input.addEventListener('dragleave', () => input.classList.remove('drag-over'));
    input.addEventListener('drop', (e) => {
      e.preventDefault();
      input.classList.remove('drag-over');
      input.value = e.dataTransfer.getData('text/plain');
    });
  });

  // --- RENDER EXERCISE 2: MULTIPLE CHOICE ---
  const choiceContainer = document.getElementById('choice-questions');
  choiceData.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'question-row choice-row';
    div.dataset.answer = item.ans;
    
    let optionsHtml = item.opts.map(opt => 
      `<label style="margin-right:15px;"><input type="radio" name="q${index}" value="${opt}"> ${opt}</label>`
    ).join('');

    div.innerHTML = `<p><strong>${index + 1}.</strong> ${item.q}</p><div>${optionsHtml}</div>`;
    choiceContainer.appendChild(div);
  });

  // --- RENDER EXERCISE 3: MATCHING ---
  const matchContainer = document.getElementById('match-questions');
  // Shuffle definitions for the dropdowns
  const shuffledDefs = [...matchData].sort(() => 0.5 - Math.random());
  
  matchData.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'match-grid match-row';
    
    let selectHtml = `<select class="match-select" data-answer="${item.def}">
      <option value="">Select definition...</option>
      ${shuffledDefs.map(d => `<option value="${d.def}">${d.def}</option>`).join('')}
    </select>`;

    div.innerHTML = `<div><strong>${index + 1}. ${item.col}</strong></div><div>${selectHtml}</div>`;
    matchContainer.appendChild(div);
  });

  // --- VALIDATION & CORRECTION LOGIC ---
  document.querySelectorAll('.check-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.dataset.target;
      
      if (target === 'fill') {
        document.querySelectorAll('.fill-row').forEach(row => {
          const input = row.querySelector('.drop-input');
          // Clear previous corrections
          const prevCorr = row.querySelector('.correction-label');
          if(prevCorr) prevCorr.remove();

          const userAnswer = input.value.trim().toLowerCase();
          const correctAnswer = input.dataset.answer.toLowerCase();

          if (userAnswer === correctAnswer) {
            input.classList.remove('incorrect');
            input.classList.add('correct');
          } else {
            input.classList.remove('correct');
            input.classList.add('incorrect');
            const correction = document.createElement('span');
            correction.className = 'correction-label';
            correction.textContent = `(Correct: ${input.dataset.answer})`;
            input.parentNode.insertBefore(correction, input.nextSibling);
          }
        });
      }

      if (target === 'choice') {
        document.querySelectorAll('.choice-row').forEach(row => {
          const prevCorr = row.querySelector('.correction-label');
          if(prevCorr) prevCorr.remove();

          const selected = row.querySelector('input[type="radio"]:checked');
          const correctAnswer = row.dataset.answer;

          if (selected && selected.value === correctAnswer) {
            row.style.color = "#28a745";
          } else {
            row.style.color = "#dc3545";
            const correction = document.createElement('span');
            correction.className = 'correction-label';
            correction.textContent = `Correct Answer: ${correctAnswer}`;
            row.appendChild(correction);
          }
        });
      }

      if (target === 'match') {
        document.querySelectorAll('.match-row').forEach(row => {
          const select = row.querySelector('select');
          const prevCorr = row.querySelector('.correction-label');
          if(prevCorr) prevCorr.remove();

          const userAnswer = select.value;
          const correctAnswer = select.dataset.answer;

          if (userAnswer === correctAnswer) {
            select.classList.remove('incorrect');
            select.classList.add('correct');
          } else {
            select.classList.remove('correct');
            select.classList.add('incorrect');
            const correction = document.createElement('div');
            correction.className = 'correction-label';
            correction.style.marginTop = "5px";
            correction.textContent = `Correct: ${correctAnswer}`;
            row.children[1].appendChild(correction);
          }
        });
      }
    });
  });
});
