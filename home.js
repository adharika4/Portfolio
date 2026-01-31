/* ================= THEME TOGGLE ================= */
const toggleBtn = document.querySelector('.nav__toggle i');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  if (document.body.classList.contains('light-theme')) {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
  } else {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
  }
});

/* ================= SMOOTH SCROLL (Contact Button) ================= */
const contactBtn = document.querySelector('.home__button');

contactBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const target = document.querySelector('#contact');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

/* ================= PROJECT SLIDER ================= */

const projects = [
  {
    name: "DarshanMitr",
    desc: "A smart pilgrimage management web application designed to enhance devotee safety and experience through live crowd monitoring, virtual queue management, and emergency SOS features. The project focuses on accessibility, real-time guidance, and scalable crowd control.",
    tech: "Web Application · UI/UX · Safety Systems",
    status: "Deployed",
    links: [
      { text: "Prototype", url: "https://darshan-mitr.vercel.app/" }
    ]
  },
  {
    name: "Sahas",
    desc: "A machine learning-based system aimed at predicting and preventing human trafficking in India by analyzing socio-economic and demographic data spanning over 10 years. Achieved high accuracy using ensemble learning techniques.",
    tech: "Machine Learning · Random Forest · Data Analysis",
    status: "Model Based",
    links: [
      { text: "Research Work", url: "https://colab.research.google.com/drive/1bEu9LS1XNTKiKXNnkrup-nHCnmbXyeh6?usp=sharing" }
    ]
  },

  {
  name: "Keen to Clean",
  desc: "A community-focused prototype application designed to connect individuals with employment opportunities through local clean-up drives. The project integrates reward-based participation and educational initiatives to promote sustainability and social responsibility.",
  tech: "Prototype App · Sustainability · Social Impact",
  status: "Prototype",
  links: [
    { text: "Concept Project", url: "https://www.figma.com/proto/mlvG97fU2v9s6Zs2RgtGUu/Ideathon---Keen-To-Clean?node-id=1-6&starting-point-node-id=1%3A6&t=cP3iL3ntVkRDQ7k3-1" }
  ]
},


   {
    name: "SafeDrive",
    desc: "A real-time driver drowsiness detection system leveraging MobileNetV2 and transfer learning to detect fatigue using live webcam input. Integrated into a full-stack application with real-time alerts and safety mechanisms.",
    tech: "Deep Learning · MobileNetV2 · Full Stack",
    status: "To Be Deployed",
    links: [
      { text: "In Progress", url: "#" }
    ]
  },

  {
    name: "MineMate AI App",
    desc: "An AI-powered application built using modern AI tools, focused on delivering an interactive and intuitive user experience. The project is showcased through a working demo video explaining the core idea and functionality.",
    tech: "AI Tools · UX · Rapid Prototyping",
    status: "Demo Available",
    links: [
      { text: "YouTube Demo", url: "https://youtu.be/YJcnQTL-sv4" }
    ]
  },
 
];

let current = 0;

const nameEl = document.querySelector(".projects__name");
const descEl = document.querySelector(".projects__desc");
const techEl = document.querySelector(".projects__tech");
const statusEl = document.querySelector(".projects__status");
const linksEl = document.querySelector(".projects__links");

function loadProject() {
  const p = projects[current];
  nameEl.textContent = p.name;
  descEl.textContent = p.desc;
  techEl.textContent = p.tech;
  statusEl.textContent = p.status;

  linksEl.innerHTML = "";
  p.links.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.textContent = link.text;
    linksEl.appendChild(a);
  });
}

document.querySelector(".next").onclick = () => {
  current = (current + 1) % projects.length;
  loadProject();
};

document.querySelector(".prev").onclick = () => {
  current = (current - 1 + projects.length) % projects.length;
  loadProject();
};

loadProject();


/* ================= CONTACT FORM ================= */

document.querySelector(".contact__form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Message sent successfully! 🚀");
  e.target.reset();
});


