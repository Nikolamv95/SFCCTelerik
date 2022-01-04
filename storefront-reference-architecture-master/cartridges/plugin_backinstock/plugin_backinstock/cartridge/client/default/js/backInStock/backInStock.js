'use strict';

/**
 * Display the returned message.
 * @param {string} data - data returned from the server's ajax call
 * @param {Object} button - button that was clicked for contact us sign-up
 */
function displayMessage(data, button) {
    $.spinner().stop();
    var status;
    if (data.success) {
        status = 'alert-success';
    } else {
        status = 'alert-danger';
    }

    if ($('.backInStock-signup-message').length === 0) {
        $('body').append(
            '<div class="backInStock-signup-message"></div>'
        );
    }
    $('.backInStock-signup-message')
        .append('<div class="backInStock-signup-alert text-center ' + status + '" role="alert">' + data.msg + '</div>');

    setTimeout(function () {
        $('.backInStock-signup-message').remove();
        button.removeAttr('disabled');
    }, 3000);
}

module.exports = {
    openCloseNotification: function () {
        var notificationButton = document.getElementById('notificationButton');
        var modal = document.getElementById('myModal');
        var span = document.getElementById('closeButton');
        notificationButton.onclick = function () {
            modal.style.display = 'block';
        };
        span.onclick = function () {
            modal.style.display = 'none';
        };
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    },

    phoneErrorValidation: function () {
        var button = document.querySelector('button.subscribe-backInStock');
        var phoneNumber = document.getElementById('phoneNumber');
        var errorPhone = document.getElementById('backInStock-error');

        button.onclick = function () {
            var pattern = /^\+\d{1,4}[1-9]\d{0,9}$/;
            if (!pattern.test(phoneNumber.value)) {
                errorPhone.style.display = 'block';
            }
            setTimeout(function () {
                if (errorPhone.style.display === 'block') {
                    errorPhone.style.display = 'none';
                }
            }, 3000);
        };
    },

    subscribeContact: function () {
        $('form.backInStock').submit(function (e) {
            e.preventDefault();
            var form = $(this);
            var button = $('.subscribe-backInStock');
            var url = form.attr('action');

            var pattern = /^\+\d{1,4}[1-9]\d{0,9}$/;
            if (!pattern.test(phoneNumber.value)) {
                return;
            }

            $.spinner().start();
            button.attr('disabled', true);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: form.serialize(),
                success: function (data) {
                    displayMessage(data, button);
                    if (data.success) {
                        $('.backInStock').trigger('reset');
                    }
                },
                error: function (err) {
                    displayMessage(err, button);
                }
            });
        });
    }
};
