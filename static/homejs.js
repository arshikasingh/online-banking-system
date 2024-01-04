function changebg()
{
    const images = [
        "url('atmpin.jpg')",
        "url('loan2.jpg')",
        "url('passbook1.jpg')",
        "url('transfer.jpg')",
        "url('mpin.jpg')"
    ]
    const bgImages = document.getElementById('background-image');
    const bg = images[Math.floor(Math.random() * images.length)];
    bgImages.style.backgroundImage = bg;
}
// setInterval(changebg, 4000)
const toggleButton = document.getElementsByClassName('toggle-button')
const navbarButtons = document.getElementsByClassName('nav-button')
toggleButton.addEventListener('click', () =>{
    navbarButtons.classList.toggle('active')
});