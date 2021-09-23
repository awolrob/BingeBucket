async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
     
      document.location.replace('');
      
    } else {
      alert(response.statusText);
    }
  }
}

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('');

    } else {
      alert(response.statusText);
    }
  }
}

let el = document.getElementById('logonForm');
if (el) {
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

  var addToBucket = document.querySelectorAll('.bucketAddition')
  addToBucket.forEach(bucket => {
    // console.log(bucket);
    bucket.style.display = "none"
  });

  var searchServices = document.querySelectorAll('.bg-body')
  searchServices.forEach(search => {
    // console.log(search);
    search.style.display = "none"
  });

}