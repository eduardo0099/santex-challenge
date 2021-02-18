export const randomNumber = (from, to) => {
  return Math.floor(Math.random() * to + from);
}

export const formatTimeinSecUntilNow = (lastTimeStamp) => {
  const difference = Math.floor((new Date().getTime() - lastTimeStamp));
  let timeLeft;
  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft;
};