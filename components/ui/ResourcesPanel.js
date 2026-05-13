import { getResourcesForModule } from '../../data/resources'

export default function ResourcesPanel({ moduleNumber }) {
  const resources = getResourcesForModule(moduleNumber)

  if (!resources || resources.length === 0) {
    return null
  }

  const essential = resources.filter(r => r.tier === 'Essential')
  const recommended = resources.filter(r => r.tier === 'Recommended')

  const getIcon = (type) => {
    const icons = {
      'Book': '📖',
      'Article': '📄',
      'Video': '▶',
      'Course': '🎓',
      'Tool': '⚙',
      'Podcast': '🎙',
      'Website': '🔗',
    }
    return icons[type] || '◆'
  }

  const ResourceItem = ({ resource }) => (
    <div className="pb-2.5 border-b border-rule last:border-b-0 last:pb-0">
      <div className="flex gap-2">
        <span className="text-xs text-gold-dim shrink-0 mt-0.5">{getIcon(resource.type)}</span>
        <div className="min-w-0 flex-1">
          {resource.url ? (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mist hover:text-gold transition-colors text-xs font-medium leading-snug block"
            >
              {resource.title}
            </a>
          ) : (
            <div className="text-mist text-xs font-medium leading-snug">{resource.title}</div>
          )}
          {resource.source && (
            <p className="text-grey text-[10px] mt-0.5 leading-snug italic">{resource.source}</p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {essential.length > 0 && (
        <div className="slide-card p-4">
          <h3 className="eyebrow mb-3 text-gold">Essential</h3>
          <div className="space-y-2.5">
            {essential.map((resource, i) => (
              <ResourceItem key={i} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {recommended.length > 0 && (
        <div className="slide-card p-4">
          <h3 className="eyebrow mb-3 text-gold-dim">Recommended</h3>
          <div className="space-y-2.5">
            {recommended.map((resource, i) => (
              <ResourceItem key={i} resource={resource} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
