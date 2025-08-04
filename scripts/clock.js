    function updateClock() {
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      document.getElementById('clock').textContent = formattedTime;
    }

    setInterval(updateClock, 1000);
    updateClock();
