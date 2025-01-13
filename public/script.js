// JavaScript for toggling the navigation menu on small screens
const hamburger = document.getElementById('hamburger');
const navigation = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
    // Toggle the 'active' class to show/hide the nav list
    navigation.classList.toggle('active');
});
const headerHeight = document.querySelector('header').offsetHeight;
document.querySelector('.contact-form').style.paddingTop = headerHeight + 'px';
document.querySelector('.contact-form').style.marginTop = `-${headerHeight}px`;
function scrollToTop() {
    document.documentElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
const form = document.getElementById('get-in-touch');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            result.innerHTML = '<i class="fas fa-check-circle"></i> Submitted successfully!';
            result.style.color = "green";
            result.style.display = "flex";
            result.style.alignItems = "center";
            result.style.gap = "10px";
        } else {
            console.log(response);
            result.innerHTML = json.message;
            result.style.color = "red";
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
        result.style.color = "red";
    })
    .then(function() {
        form.reset();
        setTimeout(() => {
            result.style.display = "none";
        }, 3000);
    });
});
