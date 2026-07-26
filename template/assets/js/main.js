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
  const featuredTestimonials = [
    {
      quote: "From the infinity pool to the fine dining, everything felt world class. Truly one of the best stays I've ever found through Hotelsort.",
      name: "Daniel Brooks",
      location: "New York, USA"
    },
    {
      quote: "The mountain views were extraordinary, yet the quiet service made the stay unforgettable. Every recommendation felt personal from the moment we arrived.",
      name: "Sofia Laurent",
      location: "Lyon, France"
    },
    {
      quote: "Hotelsort found a coastal retreat that balanced privacy, character, and effortless hospitality. It was exactly the escape we hoped to find.",
      name: "Marcus Reed",
      location: "London, UK"
    }
  ];
  let featuredTestimonialIndex = 0;

  $("[data-featured-testimonial-nav]").on("click", function () {
    featuredTestimonialIndex = $(this).data("featured-testimonial-nav") === "next"
      ? (featuredTestimonialIndex + 1) % featuredTestimonials.length
      : (featuredTestimonialIndex + featuredTestimonials.length - 1) % featuredTestimonials.length;

    const testimonial = featuredTestimonials[featuredTestimonialIndex];
    $("[data-featured-testimonial-quote]").text(testimonial.quote);
    $("[data-featured-testimonial-name]").text(testimonial.name);
    $("[data-featured-testimonial-location]").text(testimonial.location);
  });
  $("[data-gallery-image]").on("click", function () {
    const imageSrc = $(this).data("gallery-image");
    const imageTitle = $(this).data("gallery-title");
    $("[data-gallery-modal-image]").attr("src", imageSrc).attr("alt", imageTitle);
    $("#galleryModalLabel").text(imageTitle);
    bootstrap.Modal.getOrCreateInstance(document.getElementById("galleryModal")).show();
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
  $("#bookingForm").on("submit", function (event) {
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
})(window.jQuery, window.bootstrap);
