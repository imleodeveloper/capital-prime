document.addEventListener("DOMContentLoaded", () => {
  const clockSpan = document.querySelector(".clock-span");

  const liveHours = [13, 19, 22]; // pode deixar isso em qualquer ordem
  const liveDurationMinutes = 60;

  function isLiveNow(brNow) {
    for (let hour of liveHours) {
      const liveStart = new Date(brNow);
      liveStart.setHours(hour, 0, 0, 0);

      const liveEnd = new Date(
        liveStart.getTime() + liveDurationMinutes * 60 * 1000
      );

      if (brNow >= liveStart && brNow <= liveEnd) {
        return {
          isLive: true,
          currentLiveHour: hour,
        };
      }
    }
    return { isLive: false };
  }

  function formatAMPM(hour) {
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}${ampm}`;
  }

  function getNextLiveTime(brNow) {
    const currentHour = brNow.getHours();

    // Ordena os horários em ordem crescente
    const sortedHours = [...liveHours].sort((a, b) => a - b);

    let nextLiveHour = sortedHours.find((h) => h > currentHour);
    let liveDate = new Date(brNow);

    if (nextLiveHour) {
      liveDate.setHours(nextLiveHour, 0, 0, 0);
    } else {
      // Nenhum horário futuro hoje, pega o primeiro do dia seguinte
      nextLiveHour = sortedHours[0];
      liveDate.setDate(liveDate.getDate() + 1);
      liveDate.setHours(nextLiveHour, 0, 0, 0);
    }

    return {
      targetTime: liveDate,
      label: formatAMPM(nextLiveHour),
    };
  }

  function updateClock() {
    const now = new Date();
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60000;
    const brNow = new Date(utcNow - 3 * 60 * 60 * 1000);

    const liveCheck = isLiveNow(brNow);

    if (liveCheck.isLive) {
      clockSpan.innerHTML = `¡Estamos en vivo!  <br/> Próxima transmisión en vivo próximamente.`;
      return;
    }

    const { targetTime, label } = getNextLiveTime(brNow);
    const diff = targetTime - brNow;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const format = (num) => String(num).padStart(2, "0");

    clockSpan.innerHTML = `Faltan ${format(hours)}:${format(minutes)}:${format(
      seconds
    )} para la transmisión<br /> en vivo de las ${label}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
});
