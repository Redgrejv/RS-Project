function validate(form) {
        var reason = "";

        if (form.login.value == "" || /[^a-zA-z]/.test(form.login.value))
            reason += "Ошибка имени ";
        if (form.password.value == "" || /[^0-9]/.test(form.password.value))
            reason += "Ошибка пароля ";

        if (reason == "")
            return true;  
        else {
            alert(reason);  
            return false;
        }
    }
