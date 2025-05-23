const imageList = [
  "assets/image-one.jpg",
  "assets/image-two.jpg",
  "assets/image-three.jpg",
  "assets/image-four.jpg",
  "assets/image-five.jpg",
  "assets/image-six.jpg",
  "assets/image-seven.jpg",
  "assets/image-eight.jpg",
];

function preloadImages(list, onComplete) {
  let loaded = 0;
  list.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = img.onerror = () => {
      loaded++;
      if (loaded === list.length && typeof onComplete === "function") {
        onComplete();
      }
    };
  });
}

const allcontainer = gsap.utils.toArray(".container-item");
const venueImageWrap = document.querySelector(".container-img-wrap");
const venueImage = document.querySelector(".container-img");

function initcontainer() {
  allcontainer.forEach((link) => {
    link.addEventListener("mouseenter", venueHover);
    link.addEventListener("mouseleave", venueLeave);
    link.addEventListener("mousemove", moveVenueImage);
  });
}

const quickX = gsap.quickTo(venueImageWrap, "x", {
  duration: 0.2,
  ease: "power3.out",
});
const quickY = gsap.quickTo(venueImageWrap, "y", {
  duration: 0.2,
  ease: "power3.out",
});

function moveVenueImage(e) {
  quickX(e.clientX);
  quickY(e.clientY);
}

function venueHover(e) {
  const targetImage = e.target.dataset.img;
  venueImage.style.backgroundImage = `url(${targetImage})`;
  gsap.set(venueImageWrap, { visibility: "visible" });
  gsap.to(venueImageWrap, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
}

function venueLeave() {
  gsap.to(venueImageWrap, { autoAlpha: 0, duration: 0.3, ease: "power2.out" });
}

function init() {
  initcontainer();
}

const tl = gsap.timeline();

tl.from(".navbar > div", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: "power2.out",
});
tl.from(
  ".site-logo",
  { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" },
  "-=0.6"
);
tl.from(".site-menu > div", {
  opacity: 0,
  y: 30,
  duration: 0.6,
  ease: "power3.out",
  stagger: 0.15,
});
tl.from(
  ".header > div",
  { opacity: 0, y: 30, duration: 0.6, ease: "power3.out", stagger: 0.15 },
  "-=0.5"
);
tl.from(".container-item h3", {
  opacity: 0,
  y: 40,
  duration: 0.6,
  ease: "power3.out",
  stagger: 0.1,
});

window.addEventListener("load", () => {
  preloadImages(imageList, init);
});
