import { db, collection, getDocs,addDoc, CLOUD_NAME, UPLOAD_PRESET } from "./firebase_configuration.js"


const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Optional: Close modal when clicking outside modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

async function uploadImage(file) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
  
    const res = await fetch(url, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    return data.secure_url;
  }

  const form = document.getElementById("projectForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const file = form.image.files[0];
    if (!file) {
      alert("Please select an image");
      return;
    }
  
    try {
      const imageUrl = await uploadImage(file);
  
      const newProject = {
        title: form.title.value,
        description: form.description.value,
        github: form.github.value,
        live: form.live.value,
        image: imageUrl,
        createdAt: new Date()
      };
  
      await addDoc(collection(db, "projects"), newProject); // ✅ Modular Firestore
  
      console.log("Project added!");
      form.reset();
      loadAndRenderProjects(); // your function to re-render cards
    } catch (err) {
      console.error("Error adding project:", err);
      alert("Failed to add project.");
    }
  });

export async function loadAndRenderProjects(){
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects = querySnapshot.docs.map(doc => doc.data());

  const container = document.getElementById("projects-container");
  container.innerHTML = projects.map(project => `
    <div class="project-card">
      <img src="${project.image}" alt="Project" class="project-image" />
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-categories">${project.description}</p>
        <div class="repos">
          <a href="${project.github}" target="_blank"><img src="../assets/github.png" class="card-icon git"></a>
          <a href="${project.live}" target="_blank" class="live">LIVE LINK</a>
        </div> 
        <div class="edit">
            <button class="view btn"><img src="../assets/view.png" class="edit-btn">  View</button>
            <button class="view btn"><img src="../assets/edit.png" class="edit-btn">  Edit</button>
            <button class="view btn"><img src="../assets/delete.png" class="edit-btn"></button>
          </div>
      </div>
    </div>
  `).join("");
}

/*
export async function loadAndRenderProjects() {
    const projects = [
        {
            title: "Library Solutions",
            image: "../assets/library.jpeg",
            description: "They streamline library operations and improve user experience.",
            github: "https://github.com/Anupam0329/Library",
            live: "https://anupam0329.github.io/Library/"
          },
          {
            title: "Tic Tac Toe Game",
            image: "../assets/TTT.jpeg",
            description: "Tic Tac Toe is a simple two-player game where players take turns marking X or O on a 3×3 grid.",
            github: "https://github.com/Anupam0329/Tic-Tac-Toe",
            live: "https://anupam0329.github.io/Tic-Tac-Toe/"
          },
          {
            title: "Calculator",
            image: "../assets/calc.jpeg",
            description: "It simplifies mathematical calculations, ranging from simple to complex, with user-friendly interfaces.",
            github: "https://github.com/Anupam0329/calculator",
            live: "https://anupam0329.github.io/calculator/"
          },
          {
            title: "Admin Dashboard",
            image: "../assets/Admin login illustration.jpeg",
            description: "An admin page provides a central dashboard for managing and monitoring system activities and user data.",
            github: "https://github.com/Anupam0329/Admin-Dashboard",
            live: "https://anupam0329.github.io/Admin-Dashboard/"
          },
          {
            title: "Landing Page",
            image: "../assets/landing-page.jpeg",
            description: "A landing page is a standalone web page designed to capture visitors’ attention and encourage specific actions.",
            github: "https://github.com/Anupam0329/landing-page",
            live: "https://anupam0329.github.io/landing-page/"
          },
          {
            title: "Etch-a-sketch",
            image: "../assets/sketch.jpeg",
            description: "It offers a simple, fun way to sketch and erase designs, making it a timeless hands-on creative tool.",
            github: "https://github.com/Anupam0329/Etch-a-sketch",
            live: "https://anupam0329.github.io/Etch-a-sketch/"
          }
    ];
  
    const container = document.getElementById("projects-container");
    container.innerHTML = projects.map(project => `
      <div class="project-card">
        <img src="${project.image}" alt="Project" class="project-image" />
        <div class="project-info">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-categories">${project.description}</p>
          <div class="repos">
            <a href="${project.github}" target="_blank"><img src="../assets/github.png" class="card-icon git"></a>
            <a href="${project.live}" target="_blank" class="live">LIVE LINK</a>
          </div> 
          <div class="edit">
            <button class="view btn"><img src="../assets/view.png">  View</button>
            <button class="view btn"><img src="../assets/edit.png">  Edit</button>
            <button class="view btn"><img src="../assets/delete.png">/button>
          </div>
        </div>
      </div>
    `).join("");
  }
  */