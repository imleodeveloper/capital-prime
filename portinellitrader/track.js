document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("marquee-track");
  const span = track.children[0].cloneNode(true);

  // Clona e empilha o conteúdo até ultrapassar a largura da tela duas vezes
  while (track.scrollWidth < window.innerWidth * 2) {
    track.appendChild(span.cloneNode(true));
  }

  let position = 0;
  const speed = 1;

  function animateMarquee() {
    position -= speed;

    // Quando o conteúdo "passa", reinicia de forma contínua
    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateMarquee);
  }

  animateMarquee();
});
