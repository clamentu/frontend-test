$(document).ready(function() {
        /* VALIDAZIONE GENERICA CAMPI */
        function validateField($input, isValid, isEmptyAllowed = false) {
                const $icon = $input.siblings('.icon-validate').find('i');
                const $group = $input.closest('.input-group');
                const $feedback = $group.siblings('.invalid-feedback');
                $group.removeClass('is-valid is-invalid');
                if ($feedback.length) $feedback.addClass('d-none');
                const val = $input.val().trim();
                if (val === '' && isEmptyAllowed) {
                        //CAMPO VUOTO E FACOLTATIVO - BORDI E ICONA NEUTRI
                        $icon.removeClass('fa-check fa-times text-success text-danger').addClass('fa-solid');
                } else if (isValid) {
                        $group.addClass('is-valid');
                        $icon.removeClass('fa-times text-danger').addClass('fa-check text-success');
                } else {
                        $group.addClass('is-invalid');
                        $icon.removeClass('fa-check text-success').addClass('fa-times text-danger');
                        if ($feedback.length) $feedback.removeClass('d-none');
                }
        }
        /* CONTROLLO EMAIL */
        function isEmailValid(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        /* NOME */
        $('#name').on('input', function() {
                const val = $(this).val().trim();
                validateField($(this), val !== '', false);
        });
        /* COGNOME */
        $('#surname').on('input', function() {
                const val = $(this).val().trim();
                validateField($(this), val !== '', false);
        });
        /* EMAIL */
        $('#email').on('input', function() {
                const val = $(this).val().trim();
                validateField($(this), isEmailValid(val), false);
        });
        /* INDIRIZZO */
        $('#address').on('input', function() {
                const val = $(this).val().trim();
                const isValid = val === '' || val.length >= 10;
                const $icon = $(this).siblings('.icon-validate').find('i');
                const $group = $(this).closest('.input-group');
                const $feedback = $group.siblings('.invalid-feedback');
                $group.removeClass('is-valid is-invalid');
                if ($feedback.length) $feedback.addClass('d-none');
                if (val === '') {
                        $icon.removeClass('fa-check fa-times text-success text-danger').addClass('fa-regular fa-check');
                } else if (isValid) {
                        $group.addClass('is-valid');
                        $icon.removeClass('fa-times fa-regular fa-check text-danger').addClass('fa-check text-success');
                } else {
                        $group.addClass('is-invalid');
                        $icon.removeClass('fa-check fa-regular fa-check text-success').addClass('fa-times text-danger');
                        if ($feedback.length) $feedback.removeClass('d-none');
                }
        });
        /* VALIDAZIONE PASSWORD */
        function validatePassword() {
                const $password = $('#password');
                const $confirm = $('#confirm_password');
                const passwordVal = $password.val();
                const nameVal = $('#name').val().trim().toLowerCase();
                const surnameVal = $('#surname').val().trim().toLowerCase();
                const $checklist = $('#passwordChecklist li');
                const $icon = $password.siblings('.icon-validate').find('i');
                const $group = $password.closest('.input-group');

                /* RESET se password vuota */
                if (passwordVal === '') {
                        $checklist.removeClass('valid');
                        $group.removeClass('is-valid is-invalid');
                        $icon.removeClass('fa-check fa-times text-success text-danger')
                                .addClass('fa-solid fa-check'); // icona neutra
                        return;
                }
                /* REGOLA 1: Lunghezza*/
                const lengthValid = passwordVal.length >= 10;
                /* REGOLA 2: Almeno 1 numero */
                const numberValid = /\d/.test(passwordVal);
                /* REGOLA 3: Almeno 3 caratteri speciali */
                const specialValid = (passwordVal.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length >= 3;
                /* REGOLA 4: Nessuno spazio */
                const spacesValid = !(/\s/.test(passwordVal));
                /* REGOLA 5: Non contiene nome o cognome */
                const namesValid = !(passwordVal.toLowerCase().includes(nameVal) || passwordVal.toLowerCase().includes(surnameVal));
                const allValid = lengthValid && numberValid && specialValid && spacesValid && namesValid;
                /* AGGIORNA CHECKLIST */
                $checklist.each(function() {
                        const rule = $(this).data('rule');
                        switch (rule) {
                                case 'length':
                                        $(this).toggleClass('valid', lengthValid);
                                        break;
                                case 'number':
                                        $(this).toggleClass('valid', numberValid);
                                        break;
                                case 'special':
                                        $(this).toggleClass('valid', specialValid);
                                        break;
                                case 'spaces':
                                        $(this).toggleClass('valid', spacesValid);
                                        break;
                                case 'names':
                                        $(this).toggleClass('valid', namesValid);
                                        break;
                        }
                });
                /* AGGIORNA ICONA DI VALIDAZIONE */
                validateField($password, allValid, false);
                /* AGGIORNA CONFERMA PASSWORD SE PRESENTE */
                validateConfirmPassword();
        }
        /* FUNZIONE PER VALIDARE LA CONFERMA PASSWORD */
        function validateConfirmPassword() {
                const passwordVal = $('#password').val();
                const confirmVal = $('#confirm_password').val();
                const allMatch = passwordVal === confirmVal && passwordVal !== '';
                validateField($('#confirm_password'), allMatch, false);
        }

        $('#password').on('input', validatePassword);
        $('#confirm_password').on('input', validateConfirmPassword);
        $('#name, #surname').on('input', validatePassword); 
});

/* INTERCETTAZIONE DELSUBMIT DEL FORM */
$('form').on('submit', function(e) {
        e.preventDefault(); 
        /* VALIDA TUTTI I CAMPI PRINCIPALI*/
        $('#name').trigger('input');
        $('#surname').trigger('input');
        $('#email').trigger('input');
        $('#address').trigger('input');
        $('#password').trigger('input');
        $('#confirm_password').trigger('input');
        /* CONTROLLO FINALE: SE CI SONO ERRORI, BLOCCA SUBMIT */
        const invalidFields = $(this).find('.is-invalid');
        if (invalidFields.length > 0) {
                Swal.fire({
                        title: 'Attention!',
                        text: 'Please correct the highlighted fields before registering',
                        icon: 'warning',
                        confirmButtonText: 'Close'
                });
                return false;
        }
        Swal.fire({
        title: 'Success!',
        text: 'Registration successful!',
        icon: 'success',
        confirmButtonText: 'Close'
        }).then((result) => {
        if (result.isConfirmed) {
                location.reload();
        }
        });
});