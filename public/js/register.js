function validarRegistro() {
    var form = document.getElementById("registro-form");
    var nombre = form.nombre.value;
    var email = form.email.value;
    var password = form.password.value;
    var confirm_password = form['confirm-password'].value;
    var phone = form.phone.value;
    var location = form.location.value;
    var errorMessages = document.getElementById("error-messages");
    errorMessages.innerHTML = "";
    
    // Validar nombre
    if (nombre == "") {
      errorMessages.innerHTML += "<p class='text-danger'>Por favor, introduce tu nombre.<br></p>";
    }
    
    // Validar email
    if (email == "") {
      errorMessages.innerHTML += "<p class='text-danger'>Por favor, introduce tu email.<br></p>";
    } else if (!validarEmail(email)) {
      errorMessages.innerHTML += "<p class='text-danger'>Por favor, introduce un email válido.<br></p>";
    }
    
    // Validar contraseña
    if (password == "") {
      errorMessages.innerHTML += "<p class='text-danger'>Por favor, introduce una contraseña.<br></p>";
    } else if (password.length < 6) {
      errorMessages.innerHTML += "<p class='text-danger'>La contraseña debe tener al menos 6 caracteres.<br></p>";
    }
    
    // Validar confirmación de contraseña
    if (confirm_password == "") {
      errorMessages.innerHTML += "<p class='text-danger'>Por favor, confirma tu contraseña.<br></p>";
    } else if (password != confirm_password) {
      errorMessages.innerHTML += "<p class='text-danger'>La contraseña y su confirmación no coinciden.<br></p>";
    }
    
    // Validar número de teléfono
    if (phone == "") {
      errorMessages.innerHTML += "<p class='text-danger'>Por favor, introduce tu número de teléfono.<br></p>";
    } else if (!validarTelefono(phone)) {
      errorMessages.innerHTML += "<p class='text-danger'>Por favor, introduce un número de teléfono válido.<br></p>";
    }
    
    // Validar ubicación
    if (location == "") {
      errorMessages.innerHTML += "<p class='text-danger'>Por favor, introduce tu ubicación.<br></p>";
    }
    
    if (errorMessages.innerHTML == "") {
      // Registro correcto, guardar datos en localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      
      // Redirigir a la página de inicio
      window.location.href = "login.html";
    }
    
    return false;   
  }
  
  function validarEmail(email) {
    // Validar dirección de email utilizando una expresión regular
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  function validarTelefono(phone) {
    // Validar número de teléfono utilizando una expresión regular
    var re = /^\d{10}$/;
    return re.test(phone);
  }