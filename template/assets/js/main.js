(function ($, bootstrap) {
  "use strict";

  const bookingModalElement = document.getElementById("bookingModal");
  const bookingModal = bootstrap.Modal.getOrCreateInstance(bookingModalElement);

  $("[data-open-booking]").on("click", function () {
    window.setTimeout(function () {
      bookingModal.show();
    }, 220);
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
