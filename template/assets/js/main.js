(function ($, bootstrap) {
  "use strict";

  const bookingModalElement = document.getElementById("bookingModal");
  const bookingModal = bootstrap.Modal.getOrCreateInstance(bookingModalElement);

  $("[data-open-booking]").on("click", function () {
    window.setTimeout(function () {
      bookingModal.show();
    }, 220);
  });

  const treatmentCopy = {
    "Deep Tissue Massage": "Deep pressure and considered movement release tension while warmed botanical oils leave the body grounded and restored.",
    "Thermal Bathing Ritual": "Alternating warmth and cool mineral water settles the nervous system and returns the body to its natural rhythm.",
    "Aromatherapy Journey": "A sensory ritual of essential oils, gentle touch, and guided breath creates space for a deeper kind of rest."
  };

  $("[data-treatment]").on("click", function () {
    const $button = $(this);
    const treatment = $button.data("treatment");

    $button.closest(".wellness-index__menu").find("li").removeClass("is-active");
    $button.closest("li").addClass("is-active");
    $("[data-treatment-copy]").fadeOut(120, function () {
      $(this).text(treatmentCopy[treatment]).fadeIn(180);
    });
  });

  let destinationIndex = 0;

  $("[data-destination-nav]").on("click", function () {
    const direction = $(this).data("destination-nav");
    destinationIndex = direction === "next"
      ? (destinationIndex + 1) % 9
      : (destinationIndex + 8) % 9;

    $("[data-destination-current]").text(String(destinationIndex + 1).padStart(2, "0"));
    $("[data-destination-grid]").toggleClass("is-reversed", destinationIndex % 2 === 1);
  });
  $("[data-escape-filter]").on("click", function () {
    const $button = $(this);
    const filter = String($button.data("escape-filter"));

    $("[data-escape-filter]")
      .removeClass("is-active")
      .attr("aria-selected", "false");
    $button
      .addClass("is-active")
      .attr("aria-selected", "true");

    $("[data-escape-category]").each(function () {
      const categories = String($(this).data("escape-category")).split(" ");
      $(this).prop("hidden", filter !== "all" && !categories.includes(filter));
    });
  });
  const testimonials = [
    {
      quote: "Hotelsort made discovery feel effortless. Every recommendation was thoughtful, beautifully presented, and genuinely suited to the way we wanted to travel.",
      name: "Maya Chen",
      rating: "4.9"
    },
    {
      quote: "From the first shortlist to our final welcome, every detail felt calm and personal. We found a remarkable coastal retreat we would never have discovered alone.",
      name: "Elena Rossi",
      rating: "5.0"
    },
    {
      quote: "The visual guides were honest, the amenities were clear, and the concierge understood our pace. It turned planning into one of the pleasures of the trip.",
      name: "Amelia Hart",
      rating: "4.8"
    }
  ];
  let testimonialIndex = 0;

  $("[data-testimonial-nav]").on("click", function () {
    testimonialIndex = $(this).data("testimonial-nav") === "next"
      ? (testimonialIndex + 1) % testimonials.length
      : (testimonialIndex + testimonials.length - 1) % testimonials.length;

    const testimonial = testimonials[testimonialIndex];
    $("[data-testimonial-quote]").text(testimonial.quote);
    $("[data-testimonial-name]").text(testimonial.name);
    $("[data-testimonial-rating]").text(testimonial.rating);
    $(".guest-voices__rating").attr("aria-label", `Rated ${testimonial.rating} out of 5`);
  });
  $("[data-gallery-image]").on("click", function () {
    const imageSrc = $(this).data("gallery-image");
    const imageTitle = $(this).data("gallery-title");
    $("[data-gallery-modal-image]").attr("src", imageSrc).attr("alt", imageTitle);
    $("#galleryModalLabel").text(imageTitle);
    bootstrap.Modal.getOrCreateInstance(document.getElementById("galleryModal")).show();
  });
  const graceRooms = [
    {
      main: "assets/images/body/suite-warm.jpg",
      detail: "assets/images/body/room-suite-city-view.jpg",
      mainAlt: "Standard Hotelsort room with warm bedding and architectural calm",
      detailAlt: "Bright suite lounge with city view and soft neutral palette"
    },
    {
      main: "assets/images/body/suite-calm.jpg",
      detail: "assets/images/body/room-suite-city-view.jpg",
      mainAlt: "Superior Hotelsort room with calm bedding and soft morning light",
      detailAlt: "Polished suite detail with lounge area and generous daylight"
    },
    {
      main: "assets/images/body/room-mountain-view.jpg",
      detail: "assets/images/body/indoor-pool.jpg",
      mainAlt: "Junior suite with mountain-facing windows and restful atmosphere",
      detailAlt: "Indoor wellness pool with glass walls and tranquil lounge chairs"
    },
    {
      main: "assets/images/body/room-suite-city-view.jpg",
      detail: "assets/images/body/unparalleled-service-sofa-alt.jpg",
      mainAlt: "Studio apartment suite with city view and comfortable seating",
      detailAlt: "Textural suite sofa detail in a quiet luxury interior"
    },
    {
      main: "assets/images/body/grand-hotel-exterior.jpg",
      detail: "assets/images/body/london-hotel-exterior.jpg",
      mainAlt: "Suite destination with dramatic landscape and private architecture",
      detailAlt: "Classic hotel exterior with refined urban arrival"
    }
  ];

  $("[data-grace-room]").on("click", function () {
    const $button = $(this);
    const room = graceRooms[Number($button.data("grace-room"))];

    $("[data-grace-room]").removeClass("is-active").attr("aria-selected", "false");
    $button.addClass("is-active").attr("aria-selected", "true");

    $("[data-grace-room-main]").fadeTo(100, 0.25, function () {
      $(this).attr("src", room.main).attr("alt", room.mainAlt).fadeTo(160, 1);
    });
    $("[data-grace-room-detail]").fadeTo(100, 0.25, function () {
      $(this).attr("src", room.detail).attr("alt", room.detailAlt).fadeTo(160, 1);
    });
  });
  $("#diningForm").on("submit", function (event) {
    event.preventDefault();

    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }

    const form = this;
    const $success = $(form).find(".booking-success");
    $success.prop("hidden", false);

    window.setTimeout(function () {
      bootstrap.Modal.getOrCreateInstance(document.getElementById("diningModal")).hide();
      form.reset();
      $success.prop("hidden", true);
    }, 1800);
  });
  $("#insidersForm").on("submit", function (event) {
    event.preventDefault();

    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }

    const form = this;
    const $success = $(form).find(".booking-success");
    $success.prop("hidden", false);

    window.setTimeout(function () {
      bootstrap.Modal.getOrCreateInstance(document.getElementById("insidersModal")).hide();
      form.reset();
      $success.prop("hidden", true);
    }, 1800);
  });
  $("#footerNewsletterForm").on("submit", function (event) {
    event.preventDefault();

    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }

    const form = this;
    const $success = $(form).find(".site-footer__success");
    $success.prop("hidden", false);

    window.setTimeout(function () {
      form.reset();
      $success.prop("hidden", true);
    }, 1800);
  });  $("#bookingForm").on("submit", function (event) {
    event.preventDefault();

    const form = this;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const $success = $(form).find(".booking-success");
    $success.prop("hidden", false);

    window.setTimeout(function () {
      bookingModal.hide();
      form.reset();
      $success.prop("hidden", true);
    }, 1800);
  });

  // STAGE 04I: desktop submenu aria state + mobile chevron toggles.
  $('.hero__nav-item--has-submenu').each(function () {
    const item = this;
    const trigger = item.querySelector('.hero__nav-link');

    item.addEventListener('mouseenter', function () {
      item.classList.add('is-open');
      trigger?.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('mouseleave', function () {
      item.classList.remove('is-open');
      trigger?.setAttribute('aria-expanded', 'false');
    });

    item.addEventListener('focusin', function () {
      item.classList.add('is-open');
      trigger?.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('focusout', function () {
      window.setTimeout(function () {
        if (!item.contains(document.activeElement)) {
          item.classList.remove('is-open');
          trigger?.setAttribute('aria-expanded', 'false');
        }
      }, 0);
    });
  });

  $('[data-mobile-submenu-toggle]').on('click', function () {
    const button = this;
    const item = button.closest('.mobile-nav__item');
    const submenu = document.getElementById(button.getAttribute('aria-controls'));
    const open = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', String(!open));
    item?.classList.toggle('is-open', !open);
    if (submenu) {
      submenu.hidden = open;
    }
  });

  // STAGE 04J: sticky topbar appears after scroll and hides when footer enters viewport.
  const stickyTopbar = document.querySelector('[data-sticky-topbar]');
  const siteFooter = document.querySelector('.site-footer');
  let stickyTicking = false;
  let footerInView = false;

  function updateStickyTopbar() {
    if (!stickyTopbar) {
      return;
    }

    const scrolled = window.scrollY > 160;
    const footerRect = siteFooter ? siteFooter.getBoundingClientRect() : null;
    const footerVisible = footerInView || (footerRect ? footerRect.top <= window.innerHeight && footerRect.bottom >= 0 : false);
    const show = scrolled && !footerVisible;

    stickyTopbar.classList.toggle('is-visible', show);
    stickyTopbar.setAttribute('aria-hidden', String(!show));
    stickyTicking = false;
  }

  function requestStickyTopbarUpdate() {
    if (!stickyTicking) {
      stickyTicking = true;
      window.requestAnimationFrame(updateStickyTopbar);
    }
  }

  if (siteFooter && 'IntersectionObserver' in window) {
    const stickyFooterObserver = new IntersectionObserver(function (entries) {
      footerInView = entries.some(function (entry) {
        return entry.isIntersecting;
      });
      updateStickyTopbar();
    }, { threshold: 0.01 });
    stickyFooterObserver.observe(siteFooter);
  }

  updateStickyTopbar();
  window.addEventListener('scroll', requestStickyTopbarUpdate, { passive: true });
  window.addEventListener('resize', requestStickyTopbarUpdate);
})(window.jQuery, window.bootstrap);



