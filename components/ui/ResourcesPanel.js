'use client'

import { useEffect, useState } from 'react'

export default function ResourcesPanel({ moduleNumber }) {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`/api/resources?module=${moduleNumber}`)
        if (!response.ok) throw new Error('Failed to fetch resources')
        const data = await response.json()
        setResources(data.resources)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching resources:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [moduleNumber])

  if (loading) {
    return (
      <aside className="space-y-4">
        <div className="slide-card p-4 animate-pulse h-40 bg-rule/20" />
      </aside>
    )
  }

  if (error || !resources || resources.length === 0) {
    return null
  }

  const essential = resources.filter(r => r.priority === 'Essential')
  const recommended = resources.filter(r => r.priority === 'Recommended')

  const getIcon = (type) => {
    const icons = {
      'Book': '📖',
      'Article': '📄',
      'Video': '▶️',
      'Course': '🎓',
      'Tool': '🛠️',
      'Podcast': '🎙️',
      'Paper': '📋',
      'Community': '👥',
    }
    return icons[type] || '📌'
  }

  const ResourceItem = ({ resource }) => (
    <div className="pb-3 border-b border-rule last:border-b-0">
      <div className="flex gap-3">
        <span className="text-lg shrink-0">{getIcon(resource.type)}</span>
        <div className="min-w-0 flex-1">
          {resource.url ? (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mist hover:text-gold transition-colors font-medium text-sm underline"
            >
              {resource.title}
            </a>
          ) : (
            <div className="text-mist font-medium text-sm">{resource.title}</div>
          )}
          {resource.notes && (
            <p className="text-grey text-xs mt-1 leading-relaxed">{resource.notes}</p>
          )}
          {resource.platform && (
            <p className="text-grey-dim text-[10px] mt-1">{resource.platform}</p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <aside className="space-y-4">
      {/* Essential Resources */}
      {essential.length > 0 && (
        <div className="slide-card p-4">
          <h3 className="eyebrow mb-3 text-gold">Essential</h3>
          <div className="space-y-3">
            {essential.map((resource, i) => (
              <ResourceItem key={i} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {/* Recommended Resources */}
      {recommended.length > 0 && (
        <div className="slide-card p-4">
          <h3 className="eyebrow mb-3 text-gold-dim">Recommended</h3>
          <div className="space-y-3">
            {recommended.map((resource, i) => (
              <ResourceItem key={i} resource={resource} />
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
