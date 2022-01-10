'use strict';

/**
 * Display the returned message.
 * @param {string} data - data returned from the server's ajax call
 * @param {Object} button - button that was clicked for contact us sign-up
 */
function displayMessage(data, button) {
    $.spinner().stop();

    let status;
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

    let modal = document.getElementById('myModal');
    modal.style.display = 'none';    
    setTimeout(function () {
        $('.backInStock-signup-message').remove();
        button.removeAttr('disabled');
    }, 3000);
}

module.exports = {
    /**
     * Manage when the subsciption modal should be open and when closed
     */
    openCloseNotification: function () {
        let notificationButton = document.getElementById('notificationButton');
        let modal = document.getElementById('myModal');
        let span = document.getElementById('closeButton');
        notificationButton.onclick = function () {
            modal.style.display = 'block';
            setTimeout(function () {
                let productInput = document.querySelector('#productId.product-id');
                let productNumber = document.querySelector('.product-number .product-id');
                productInput.value = productNumber.textContent;
            }, 500);
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

    /**
     * Check for specific phone number validation
     */
    phoneErrorValidation: function () {
        let button = document.querySelector('button.subscribe-backInStock');
        let phoneNumber = document.getElementById('phoneNumber');
        let errorPhone = document.getElementById('backInStock-error');

        button.onclick = function () {
            let pattern = /^\+\d{1,4}[1-9]\d{0,9}$/;
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

    /**
     * Create AJAX request to Twillio-Subscirbe
     */
    subscribeContact: function () {
        $('form.backInStock').submit(function (e) {
            e.preventDefault();
            let form = $(this);
            let button = $('.subscribe-backInStock');
            let url = form.attr('action');

            let pattern = /^\+\d{1,4}[1-9]\d{0,9}$/;
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
