gsap.registerPlugin(Observer);

let sections = document.querySelectorAll("section"),
  images = document.querySelectorAll(".bg"),
  outerWrappers = gsap.utils.toArray(".outer"),
  innerWrappers = gsap.utils.toArray(".inner"),
  currentIndex = -1,
  wrap = gsap.utils.wrap(0, sections.length),
  animating;

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function gotoSection(index, direction) {
  index = wrap(index); // make sure it's valid
  animating = true;
  let fromTop = direction === -1,
      dFactor = fromTop ? -1 : 1,
      tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animating = false;
        }
      });
  if (currentIndex >= 0) {
    // The first time this function runs, current is -1
    gsap.set(sections[currentIndex], { zIndex: 0 });
    tl.to(images[currentIndex], { yPercent: -15 * dFactor })
      .set(sections[currentIndex], { autoAlpha: 0 });
      
    // Animate car off-screen when leaving the third section
    if (currentIndex === 2) {
      const car = document.querySelector('.car');
      if (car) {
        // Add animation to move car off-screen instead of instantly resetting
        tl.to(car, {
          left: '100%',
          duration: 1.5,
          ease: "power2.inOut"
        }, 0); // Start immediately with the section transition
      }
    }
  }
  gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
  tl.fromTo([outerWrappers[index], innerWrappers[index]], 
    { yPercent: i => i ? -100 * dFactor : 100 * dFactor },  // Start position
    { yPercent: 0 },  // End position
    0  // Start at beginning of timeline
  )
  .fromTo(images[index], 
    { yPercent: 15 * dFactor },  // Start position
    { yPercent: 0 },  // End position
    0  // Start at beginning of timeline
  );

  // Check if we're going to the third section (index 2)
  if (index === 2) {
    // Start the car animation during the section transition
    const car = document.querySelector('.car');
    if (car) {
      // First, set the car position to the starting point (off-screen left)
      gsap.set(car, { left: '-100%' });
      
      // Then add the animation to move it to the center
      tl.to(car, {
        left: '10%',
        duration: 1.5,
        ease: "power2.inOut"
      }, 0.1); // Start the animation 0.1 seconds into the section transition
    }
  }

  currentIndex = index;
    //currentIndex = 4;

}

Observer.create({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: () => {
    // Only allow scrolling up if not on the first section
    if (!animating && currentIndex > 0) {
      gotoSection(currentIndex - 1, -1);
    }
  },
  onUp: () => {
    // Only allow scrolling down if not on the last section
    if (!animating && currentIndex < sections.length - 1) {
      gotoSection(currentIndex + 1, 1);
    }
  },
  tolerance: 10,
  preventDefault: true
});

gotoSection(0, 1);

// original: https://codepen.io/BrianCross/pen/PoWapLP
// horizontal version: https://codepen.io/GreenSock/pen/xxWdeMK


document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Debug: Check if ScrollTrigger is working
    console.log("ScrollTrigger registered:", ScrollTrigger);

    // Create a timeline for star animations
    const starTl = gsap.timeline({
        defaults: {
            ease: "power2",
            duration: 1
        }
    });

    // Add star animations to the timeline
    starTl.to(".yellow-star-1", {
        opacity: 1,
        scale: 1.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true
    })
    .to(".brown-star-1", {
        opacity: 1,
        scale: 0.8,
        duration: 1,
        repeat: -1,
        yoyo: true
    }, "-=0.9")
    .to(".yellow-star-2", {
        opacity: 1,
        scale: 0.9,
        duration: 1.2,
        repeat: -1,
        yoyo: true
    }, "-=0.8")
    .to(".brown-star-2", {
        opacity: 1,
        scale: 1.1,
        duration: 0.9,
        repeat: -1,
        yoyo: true
    }, "-=0.7");
    
    // Make sure stars are visible immediately
    gsap.set(".story-container .star", { opacity: 1 });

    // Simple direct scroll-based rotation for stars
    let stars = document.querySelectorAll(".story-container .star");
    let lastScrollTop = 0;
    let rotationValues = Array(stars.length).fill(0);
    
    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
        
        // Update rotation for each star
        stars.forEach((star, index) => {
            // Update rotation based on scroll amount and direction
            rotationValues[index] += scrollDirection * 5; // Adjust the multiplier to control rotation speed
            
            // Apply the rotation
            gsap.to(star, {
                rotation: rotationValues[index],
                duration: 0.3, // Quick but smooth transition
                ease: "power1.out"
            });
        });
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, { passive: true });
    
    // Card flip functionality for second section
    const card = document.getElementById('flip-card');
    const frontText = document.querySelector('.front-text');
    const backText = document.querySelector('.back-text');

    if (card) {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
            
            // Toggle text visibility with fade effect
            if (this.classList.contains('flipped')) {
                frontText.style.opacity = '0';
                setTimeout(() => {
                    frontText.style.display = 'none';
                    backText.style.display = 'block';
                    setTimeout(() => {
                        backText.style.opacity = '1';
                    }, 50);
                }, 500);
            } else {
                backText.style.opacity = '0';
                setTimeout(() => {
                    backText.style.display = 'none';
                    frontText.style.display = 'block';
                    setTimeout(() => {
                        frontText.style.opacity = '1';
                    }, 50);
                }, 500);
            }
        });
    }

    // Card flip functionality for fourth section
    const cardFourth = document.getElementById('flip-card-fourth');
    const frontTextFourth = document.querySelector('.front-text-fourth');
    const backTextFourth = document.querySelector('.back-text-fourth');

    if (cardFourth) {
        cardFourth.addEventListener('click', function() {
            this.classList.toggle('flipped');
            
            // Toggle text visibility with fade effect
            if (this.classList.contains('flipped')) {
                frontTextFourth.style.opacity = '0';
                setTimeout(() => {
                    frontTextFourth.style.display = 'none';
                    backTextFourth.style.display = 'block';
                    setTimeout(() => {
                        backTextFourth.style.opacity = '1';
                    }, 50);
                }, 500);
            } else {
                backTextFourth.style.opacity = '0';
                setTimeout(() => {
                    backTextFourth.style.display = 'none';
                    frontTextFourth.style.display = 'block';
                    setTimeout(() => {
                        frontTextFourth.style.opacity = '1';
                    }, 50);
                }, 500);
            }
        });
    }
});
