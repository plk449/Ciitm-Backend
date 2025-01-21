var typed = new Typed('#typed', {
  strings: [
    '<b>BCA Program 💻</b> ',
    '<b>MCA Program 🖥️</b> ',
    '<b>MBA Program 🎓</b> ',
    '<b>BBA Program 📈</b> ',
  ],
  loop: true,
  typeSpeed: 30,
  loopCount: Infinity,
  showCursor: true,
  startDelay: 10,
});

// swiper js

var swiper = new Swiper('.mySwiper', {
  cssMode: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // Makes pagination bullets clickable
  },
  mousewheel: true,
  keyboard: true,
  autoplay: {
    delay: 2500, // Delay between slides in milliseconds
    disableOnInteraction: false, // Continue autoplay after user interactions
  },
  speed: 600, // Duration of transition (in milliseconds)
  effect: 'slide', // 'slide', 'fade', 'cube', 'coverflow', 'flip'
});
