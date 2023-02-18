// comprobar las credenciales del usuario en el inicio de sesión
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // comprobar si las credenciales son válidas
  if (email === localStorage.getItem('email') && password === localStorage.getItem('password')) {
    window.location.href = '/libros';
  } else {
    alert('Email o contraseña incorrectos.');
  }
});