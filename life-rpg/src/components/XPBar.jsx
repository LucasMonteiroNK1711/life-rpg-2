export default function XPBar({ xp, level }) {
  const xpForNext = 100 * level ** 2
  const currentLevelXP = xpForNext - 100 * (level - 1) ** 2
  const progress = (xp % currentLevelXP) / currentLevelXP * 100

  return (
    <div className="xp-wrapper">
      <div className="xp-bar" style={{ width: `${progress}%` }} />
      <span className="xp-text">{xp} XP</span>
    </div>
  )
}
