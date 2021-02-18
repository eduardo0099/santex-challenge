const Sound = () => {
  const missileSound = new Audio("/missile_impact.mp3");
  const waterSplashSound = new Audio("/water_splash.mp3");
  const playMissileEffect = () => {
    missileSound.play();
  }
  const playWatterEffect = () => {
    waterSplashSound.play();
  }
  return {playMissileEffect, playWatterEffect};
};

export default Sound();