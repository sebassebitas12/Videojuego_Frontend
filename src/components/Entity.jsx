export default function Entity({ type, direction = 'down', label }) {
  return (
    <span className={'entity entity-' + type + ' facing-' + direction} aria-label={label} title={label}>
      <span className="entity-shadow" />
      <span className="entity-body" />
      <span className="entity-core" />
    </span>
  )
}