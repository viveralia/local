window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav')
  if (window.scrollY <= 0) {
    nav.classList.remove('nav-scroll')
  } else {
    nav.classList.add('nav-scroll')
  }
})
