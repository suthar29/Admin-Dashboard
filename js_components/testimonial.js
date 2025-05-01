export async function loadTestimonials() {
    const testimonials = [
        {
            text: "This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com",
            image: "assets/Client Image.png",
            name: "Gemma Nolen",
            company: "Google",
            stars: 3
          },
          {
            text: "This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com",
            image: "assets/Client Image.png",
            name: "Gemma Nolen",
            company: "Google",
            stars: 3
          },
          {
            text: "This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com",
            image: "assets/Client Image.png",
            name: "Gemma Nolen",
            company: "Google",
            stars: 2
          },
          {
            text: "This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com",
            image: "assets/Client Image.png",
            name: "Gemma Nolen",
            company: "Google",
            stars: 3
          },
          {
            text: "This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com",
            image: "assets/Client Image.png",
            name: "Gemma Nolen",
            company: "Google",
            stars: 2
          },
          {
            text: "This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com",
            image: "assets/Client Image.png",
            name: "Gemma Nolen",
            company: "Google",
            stars: 2
          }
    ];
  
    const wrapper = document.getElementById("testimonial-wrapper");
    wrapper.innerHTML = ""; // Clear previous testimonials if any
  
    testimonials.forEach((t) => {
      const stars = Array.from({ length: 5 }, (_, i) =>
        `<span class="${i < t.stars ? 'filled' : ''}">&#9733;</span>`
      ).join("");
  
      const card = `
        <div class="testimonial-card">
          <p class="testimonial-text">${t.text}</p>
          <div class="author">
            <div class="author-image">
              <img src="${t.image}" alt="${t.name}">
            </div>
            <div class="author-info">
              <div class="star-rating">${stars}</div>
              <h3 class="author-name">${t.name}</h3>
              <p class="company">${t.company}</p>
            </div>
          </div>
        </div>
      `;
      wrapper.innerHTML += card;
    });
  }
  