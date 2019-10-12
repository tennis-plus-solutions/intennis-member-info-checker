$(function () {
    var apiKey = 'api-key-here';
    var apiCall = 'https://api.sportlogic.net.au/api/v1/memberships?membershipNumber=';

    // function to output string is not null
    function checkString(string) {
        // if the string is not null or empty
        if (string != null && string.toString() != '') {
            return string.toString();
        } else {
            return '-';
        }
    }

    // if the submit button is clicked on
    $('#input-submit').on('click', function (e) {
        e.preventDefault();

        // inform the user the call is loading
        $('#status-message').html('<strong>Status</strong>: Loading...');

        // clear out all current data
        $('table td').text('-');
        $('#log').text(null);

        // ajax call to get our member info
        $.ajax({
            type: "get",
            contentType: "application/json",
            url: apiCall + $('#member-id').val(),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('apikey', apiKey);
            },
            success: function (data) {
                // inform the user the call was successful
                $('#status-message').html('<strong>Status</strong>: Success');

                // if the data returned is not null
                if (data != null) {
                    data = data[0];
                    $('#member-id').text(checkString(data.memberId));
                    $('#membership-number').text(checkString(data.membershipNumber));
                    $('#membership-type-id').text(checkString(data.membershipTypeId));
                    $('#membership-type-name').text(checkString(data.membershipTypeName));
                    $('#status').text(checkString(data.status));
                    $('#status-text').text(checkString(data.statusText));
                    $('#expired').text(checkString(data.expired));
                    $('#period-start').text(checkString(data.periodStart));
                    $('#period-end').text(checkString(data.periodEnd));
                    $('#card-number').text(checkString(data.cardNumber));
                    $('#contact-id').text(checkString(data.contactId));
                    $('#first-name').text(checkString(data.firstName));
                    $('#last-name').text(checkString(data.lastName));
                    $('#email').text(checkString(data.email));
                    $('#mobile').text(checkString(data.mobile));
                    $('#home-phone').text(checkString(data.homePhone));
                    $('#work-phone').text(checkString(data.workPhone));
                    $('#phone').text(checkString(data.phone));
                    $('#gender').text(checkString(data.gender));
                    $('#itn').text(checkString(data.itn));
                    
                    // output the data into the log container
                    $('#log').html(JSON.stringify(data, null, 2));
                }
            },
            error: function (err) {
                // inform the user the call failed
                $('#message').html('<strong>Status</strong>: Failed');
            }
        });

        return false;
    });
});