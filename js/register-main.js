$(document).ready(function () {
    const API_KEY = 'abb033d4ffef4b86bbd122515250208'; 

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password);

    $('#registration-form').on('submit', function (e) {
        e.preventDefault();
        
        $('.error-message').text('').hide();
        $('.form-group input').removeClass('error-border');
        
        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirm-password').val();
        let isValid = true;
        
        if (!validateEmail(email)) {
            $('#email').addClass('error-border').next('.error-message').text('Unesite ispravan email.').show();
            isValid = false;
        }

        if (!validatePassword(password)) {
            $('#password').addClass('error-border').next('.error-message').text('Lozinka mora imati barem 8 znakova, jedno veliko, jedno malo slovo i broj.').show();
            isValid = false;
        }

        if (password !== confirmPassword) {
            $('#confirm-password').addClass('error-border').next('.error-message').text('Lozinke se ne podudaraju.').show();
            isValid = false;
        }

        if (isValid) {
            $('#registration-message').text('Registracija uspješna!').css('color', 'green').show();
        } else {
            $('#registration-message').text('Došlo je do greške. Provjerite polja.').css('color', 'red').show();
        }
    });

    $('.toggle-password').on('click', function() {
        const passwordInput = $(this).prev('input');
        const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
        passwordInput.attr('type', type);
        $(this).text(type === 'password' ? 'Prikaži' : 'Sakrij');
    });

    $('#weather-form').on('submit', function(e) {
        e.preventDefault();

        const city = $('#city').val();
        if (!city) {
            alert('Molimo unesite ime grada.');
            return;
        }

        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
        
        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                const temp = data.current.temp_c;
                const lat = data.location.lat;
                const lon = data.location.lon;
                
                $('#weather-data').html(`
                    <p><strong>Temperatura:</strong> ${temp}°C</p>
                    <p><strong>Latituda:</strong> ${lat}</p>
                    <p><strong>Longituda:</strong> ${lon}</p>
                `);
            },
            error: function() {
                $('#weather-data').html('<p style="color:red;">Greška: Nismo pronašli podatke za taj grad.</p>');
            }
        });
    });
});