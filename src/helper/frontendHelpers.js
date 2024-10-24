export const scrollDown = (id) => {
    console.log(id);
    const targetDiv = document.getElementById(id);
    console.log(targetDiv);
    const startPosition = window.pageYOffset;
    const targetPosition = targetDiv.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration of the scroll in milliseconds
    let startTime = null;
  
    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  
    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed / duration) * distance + startPosition;
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, targetPosition);
      }
    };
  
    requestAnimationFrame(animateScroll);
  }