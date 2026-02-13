export function playLevelSound() {
  const audio = new Audio("/sounds/levelup.mp3")
  audio.volume = 0.4
  audio.play()
}
