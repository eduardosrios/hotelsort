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
  // STAGE 05: premium interactive layer.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('stage5-js-ready');

  const stageSections = Array.from(document.querySelectorAll('header.hero, main > section, footer.site-footer'));
  const progressShell = document.querySelector('[data-stage5-progress]');
  const progressIndex = document.querySelector('[data-stage5-progress-index]');
  const progressTitle = document.querySelector('[data-stage5-progress-title]');
  const dynamicCta = document.querySelector('[data-stage5-cta]');
  const dynamicCtaLabel = document.querySelector('[data-stage5-cta-label]');

  function stageTitle(section, index) {
    if (section.classList.contains('hero')) {
      return 'Arrival';
    }
    if (section.classList.contains('site-footer')) {
      return 'Stay connected';
    }
    const title = section.querySelector('h1, h2, h3');
    return (title?.textContent || `Section ${index + 1}`).replace(/\s+/g, ' ').trim();
  }

  function stageCtaFor(section) {
    const cls = section.className || '';
    if (/restaurant|dining|terra-luce/.test(cls)) {
      return { label: 'Reserve dining', target: '#diningModal' };
    }
    if (/insiders|footer|loyalty/.test(cls)) {
      return { label: 'Join insiders', target: '#insidersModal' };
    }
    if (/gallery|photo|video/.test(cls)) {
      return { label: 'View gallery', target: '#galleryModal' };
    }
    return { label: 'Plan your stay', target: '#bookingModal' };
  }

  stageSections.forEach(function (section, index) {
    section.dataset.stage5Index = String(index + 1).padStart(2, '0');
    section.dataset.stage5Title = stageTitle(section, index);
    section.classList.add('stage5-reveal');
  });

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 })
    : null;

  stageSections.forEach(function (section) {
    if (revealObserver) {
      revealObserver.observe(section);
    } else {
      section.classList.add('is-visible');
    }
  });

  const parallaxTargets = Array.from(document.querySelectorAll('.hero__image, .relax-banner__image, .arbany-selection__visual img, .modern-sanctuary__image, .qelli-nature__image, .signature-suites__tile--hero img')).filter(Boolean);
  parallaxTargets.forEach(function (target) {
    target.classList.add('stage5-parallax');
  });

  let stageTicking = false;
  function updateStage5Scroll() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    document.documentElement.style.setProperty('--stage5-progress', progress.toFixed(4));

    let active = stageSections[0];
    stageSections.forEach(function (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.42 && rect.bottom > window.innerHeight * 0.18) {
        active = section;
      }
    });

    if (progressShell && active) {
      const shouldShow = window.scrollY > 180;
      progressShell.classList.toggle('is-visible', shouldShow);
      progressIndex.textContent = active.dataset.stage5Index || '01';
      progressTitle.textContent = active.dataset.stage5Title || 'Hotelsort';
    }

    if (dynamicCta && active) {
      const shouldShowCta = window.scrollY > window.innerHeight * 0.72;
      const cta = stageCtaFor(active);
      dynamicCta.classList.toggle('is-visible', shouldShowCta);
      dynamicCta.setAttribute('data-bs-target', cta.target);
      dynamicCta.setAttribute('aria-label', cta.label);
      dynamicCtaLabel.textContent = cta.label;
    }

    if (!reduceMotion) {
      parallaxTargets.forEach(function (target) {
        const rect = target.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          const shift = ((rect.top + rect.height / 2) - window.innerHeight / 2) * -0.035;
          target.style.setProperty('--stage5-shift', `${Math.max(-28, Math.min(28, shift)).toFixed(1)}px`);
        }
      });
    }

    stageTicking = false;
  }

  function requestStage5Scroll() {
    if (!stageTicking) {
      stageTicking = true;
      window.requestAnimationFrame(updateStage5Scroll);
    }
  }

  updateStage5Scroll();
  window.addEventListener('scroll', requestStage5Scroll, { passive: true });
  window.addEventListener('resize', requestStage5Scroll);

  const counterObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.target.dataset.counted === 'true') {
          return;
        }
        const target = entry.target;
        const raw = target.textContent.trim();
        const end = Number(raw.replace(/[^0-9.]/g, ''));
        if (!Number.isFinite(end)) {
          return;
        }
        target.dataset.counted = 'true';
        const suffix = raw.replace(/[0-9.]/g, '');
        const start = performance.now();
        const duration = reduceMotion ? 1 : 900;
        function step(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const value = end % 1 ? (end * eased).toFixed(1) : Math.round(end * eased);
          target.textContent = `${value}${suffix}`;
          if (t < 1) {
            window.requestAnimationFrame(step);
          } else {
            target.textContent = raw;
          }
        }
        window.requestAnimationFrame(step);
      });
    }, { threshold: 0.55 })
    : null;

  Array.from(document.querySelectorAll('.wellness-stats strong, .arbany-selection__meta strong, .loyalty-benefits strong, .hotelix-featured strong')).forEach(function (el) {
    if (counterObserver && /\d/.test(el.textContent)) {
      counterObserver.observe(el);
    }
  });

  Array.from(document.querySelectorAll('.escape-gallery__item, .loyalty-benefits__card, .horizon-destinations__card, .signature-suites__tile, .arbany-selection__card, .trending-destinations article, .hotelix-featured article')).forEach(function (card) {
    card.classList.add('stage5-hot-card');
  });

  const galleryModalElement = document.getElementById('galleryModal');
  const galleryModal = galleryModalElement ? bootstrap.Modal.getOrCreateInstance(galleryModalElement) : null;
  const lightboxSelectors = '.photo-gallery-wave img, .signature-suites img, .escape-gallery__item img, .activities-gallery img, .moments-editorial img, .arbany-selection__visual img';
  Array.from(document.querySelectorAll(lightboxSelectors)).forEach(function (img) {
    if (img.closest('.auxiliary-link') || img.closest('.brand')) {
      return;
    }
    const imageRect = img.getBoundingClientRect();
    if (imageRect.width < 80 || imageRect.height < 80) {
      return;
    }
    img.classList.add('stage5-lightbox-ready');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Open gallery image: ${img.alt || 'Hotelsort image'}`);
    function openImage() {
      if (!galleryModal) {
        return;
      }
      $('[data-gallery-modal-image]').attr('src', img.getAttribute('src')).attr('alt', img.getAttribute('alt') || 'Hotelsort gallery image');
      $('#galleryModalLabel').text(img.getAttribute('alt') || 'Hotelsort gallery highlight');
      galleryModal.show();
    }
    img.addEventListener('click', openImage);
    img.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImage();
      }
    });
  });

  const videoModalElement = document.getElementById('stage5VideoModal');
  const videoModal = videoModalElement ? bootstrap.Modal.getOrCreateInstance(videoModalElement) : null;
  const videoPlayer = document.querySelector('[data-stage5-video-player]');
  const videoTitle = document.querySelector('[data-stage5-video-title]');
  Array.from(document.querySelectorAll('.video-variant')).forEach(function (section) {
    if (section.querySelector('.video-modal-trigger')) {
      return;
    }
    const source = section.querySelector('video source');
    if (!source || !videoModal || !videoPlayer) {
      return;
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-modal-trigger';
    button.innerHTML = '<i class="fa-solid fa-play" aria-hidden="true"></i><span>Play motion</span>';
    button.addEventListener('click', function () {
      const label = section.dataset.stage5Title || section.querySelector('h2, h3')?.textContent?.trim() || 'Featured stay in motion';
      videoTitle.textContent = label;
      videoPlayer.setAttribute('poster', section.querySelector('video')?.getAttribute('poster') || '');
      videoPlayer.setAttribute('src', source.getAttribute('src'));
      videoPlayer.load();
      videoModal.show();
    });
    section.appendChild(button);
  });

  if (videoModalElement && videoPlayer) {
    videoModalElement.addEventListener('hidden.bs.modal', function () {
      videoPlayer.pause();
      videoPlayer.removeAttribute('src');
      videoPlayer.load();
    });
  }

  function setupDragTrack(track) {
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    track.classList.add('stage5-drag-ready');
    track.addEventListener('pointerdown', function (event) {
      if (event.button !== 0 || track.scrollWidth <= track.clientWidth + 12) {
        return;
      }
      dragging = true;
      startX = event.clientX;
      startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    });
    track.addEventListener('pointermove', function (event) {
      if (!dragging) {
        return;
      }
      track.scrollLeft = startScroll - (event.clientX - startX);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (type) {
      track.addEventListener(type, function () {
        dragging = false;
        track.classList.remove('is-dragging');
      });
    });
  }

  Array.from(document.querySelectorAll('.horizon-destinations__track, .signature-suites__gallery, .photo-gallery-wave__track, .trending-destinations__grid')).forEach(setupDragTrack);
})(window.jQuery, window.bootstrap);





