/* ====================Typing=============== */

var typed = new Typed(".typing", {
   strings: ["FrontEnd"],
   typeSpeed: 150,
   backSpeed: 100,
   loop: true
})

var typed1 = new Typed(".typing1", {
   strings: ["Data processing manager"],
   typeSpeed: 100,
   backSpeed: 50,
   loop: true
})

var typed2 = new Typed(".typing2", {
   strings: ["Data processing manager"],
   typeSpeed: 100,
   backSpeed: 50,
   loop: true
})

/* ==========================Slider====================== */

var swiper = new Swiper(".mySwiper", {
   effect: "coverflow",
   grabCursor: true,
   centeredSlides: true,
   autoplay: {
      delay: 2000,
      disableOnInteraction: false,
   },
   slidesPerView: "auto",
   coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
   },
   pagination: {
      el: ".swiper-pagination",
   },
});


/* ========================Button back to top================ */

const toTop = document.querySelector(".to-top-btn");

window.addEventListener("scroll", () => {
   if (window.scrollY > 500) {
      toTop.classList.add("active");
   } else {
      toTop.classList.remove("active");
   }
})

/* ==========================Navigation================ */

$(document).ready(function () {
   $(window).bind("scroll", function () {
      var gap = 50;
      if ($(window).scrollTop() > gap) {
         $("nav").addClass("active");
      } else {
         $("nav").removeClass("active");
      }
   });
});


/* ========= Save data form to ============== */
/* ========= Send data from form to email ============ */


function sendEmail() {
   (function () {
      emailjs.init("1MJoYYsvjIHAr6q00")
   })()

   const serviceID = "service_8yddwoc"
   const templateID = "template_yuqa5nn"

   const params = {
      name: document.querySelector("#name").value,
      mail: document.querySelector("#email").value,
      subject: document.querySelector("#subject").value,
      message: document.querySelector("#message").value,
   }

   emailjs.send(serviceID, templateID, params).then(res => {
      alert("Email trimis cu succes!")
      document.querySelector("#name").textContent = ""
      document.querySelector("#email").textContent = ""
      document.querySelector("#subject").textContent = ""
      document.querySelector("#message").textContent = ""
   })
      .catch()
}

/* const scriptURL = 'https://script.google.com/macros/s/AKfycbxAs290P3Ei2SMYdbzpPztCcyqWhoTjdfAM80gSlmMPon1NFu4uPsMSCtuYrbbPW_YD/exec'
const form = document.forms['submit-to-google-sheet']
const sendText = document.getElementById('sendText')

form.addEventListener('submit', e => {
   e.preventDefault()
   fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
         sendText.innerHTML = "Va multumim, datele au fost trimise cu succes!"
         setTimeout(function () {
            sendText.innerHTML = ""
         }, 3000)
         form.reset()
      })
      .catch(error => console.error('Error!', error.message))
}) */


/* ===================Modal================ */

$(function () {

   const modalCall = $("[data-modal]");
   const modalClose = $("[data-close]");


   modalCall.on("click", function (event) {
      event.preventDefault();

      let $this = $(this);
      let modalId = $this.data('modal');

      $(modalId).addClass('show');
      $("body").addClass('no-scroll');

      setTimeout(function () {
         $(modalId).find(".modal__dialog").css({
            transform: "rotateX(0)"
         })
      }, 200);

   });


   modalClose.on("click", function (event) {
      event.preventDefault();

      let $this = $(this);
      let modalParent = $this.parents('.modal');

      modalParent.find(".modal__dialog").css({
         transform: "rotateX(90deg)"
      });

      setTimeout(function () {
         modalParent.removeClass('show');
         $("body").removeClass('no-scroll');
      }, 200);

   });

   $(".modal").on("click", function (event) {
      let $this = $(this);
      $this.find(".modal__dialog").css({
         transform: "rotateX(90deg)"
      });

      setTimeout(function () {
         $this.removeClass('show');
         $("body").removeClass('no-scroll');
      }, 200);


   });

   $(".modal__dialog").on("click", function (event) {
      event.stopPropagation();

   });

   /* ===data scroll==== */

   $("[data-scroll]").on("click", function () {

      event.preventDefault();

      let elementId = $(this).data('scroll');
      let elementOffset = $(elementId).offset().top

      $("html, body").animate({
         scrollTop: elementOffset
      });

   });

});

/* ===========show/hide nav menu========== */

const menu = document.querySelector("#nav__menu");
const menuBtn = document.querySelector("#open-menu-btn");
const closeBtn = document.querySelector("#close-menu-btn");

menuBtn.addEventListener('click', () => {

   menu.style.display = "flex";
   closeBtn.style.display = "block";
   menuBtn.style.display = "none";

})

/* ======close nav menu========= */

const closeNav = () => {
   menu.style.display = "none";
   closeBtn.style.display = "none";
   menuBtn.style.display = "block";
}

closeBtn.addEventListener('click', closeNav)

/* ===== lazy content ====== */
window.addEventListener('scroll', reveal)
function reveal() {
   const reveals = document.querySelectorAll('.reveal')

   for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight
      const revealTop = reveals[i].getBoundingClientRect().top
      const revealPoint = 150

      if (revealTop < windowHeight - revealPoint) {
         reveals[i].classList.add('scroll-active')
      } else {
         reveals[i].classList.remove('scroll-active')
      }
   }
}

/* ===== Filter works ===== */

const filterWorks = document.querySelectorAll('.work-item')

document.querySelector('.work-links').addEventListener('click', e => {
   e.preventDefault()
   if (e.target.tagName !== 'BUTTON') return false

   let filterClass = e.target.dataset['f']

   filterWorks.forEach(el => {
      el.classList.remove('hide')
      if (!el.classList.contains(filterClass) && filterClass !== 'all') {
         el.classList.add('hide')
      }
   })
})