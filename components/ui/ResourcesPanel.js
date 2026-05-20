"use client"

import { useState } from 'react'
import { getResourcesForModule } from '../../data/resources'
import VideoModal from './VideoModal'

const TYPE_ICONS = {
  Book: '📖', Article: '📄', Video: '▶', Course: '🎓',
  Tool: '⚙', Podcast: '🎙', Website: '🔗',
}

function extractYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|[?&]v=)([^#&?]{11})/)
  return match ? match[1] : null
}

function ResourceItem({ resource, onVideoClick }) {
  const videoId = resource.type === 'Video' ? extractYouTubeId(resource.url) : null

  const inner = (
    <>
      <span className="text-xs text-gold-dim shrink-0 mt-0.5">{TYPE_ICONS[resource.type] || '◆'}</span>
      <div className="min-w-0 flex-1">
        <div className="text-mist text-xs font-medium leading-snug">{resource.title}</div>
        {resource.source && (
          <p className="text-grey text-[10px] mt-0.5 leading-snug italic">{resource.source}</p>
        )}
      </div>
    </>
  )

  return (
    <div className="pb-2.5 border-b border-rule last:border-b-0 last:pb-0">
      <div className="flex gap-2">
        {resource.url ? (
          <a
            href={videoId ? undefined : resource.url}
            target={videoId ? undefined : '_blank'}
            rel="noopener noreferrer"
            onClick={videoId ? (e) => { e.preventDefault(); onVideoClick(videoId) } : undefined}
            className="flex gap-2 w-full hover:text-gold transition-colors cursor-pointer"
          >
            {inner}
          </a>
        ) : inner}
      </div>
    </div>
  )
}

export default function ResourcesPanel({ moduleNumber }) {
  const [currentVideoId, setCurrentVideoId] = useState(null)
  const resources = getResourcesForModule(moduleNumber)

  if (!resources?.length) return null

  const essential = resources.filter(r => r.tier === 'Essential')
  const recommended = resources.filter(r => r.tier === 'Recommended')

  return (
    <>
      <div className="space-y-4">
        {essential.length > 0 && (
          <div className="slide-card p-4">
            <h3 className="eyebrow mb-3 text-gold">Essential</h3>
            <div className="space-y-2.5">
              {essential.map((r, i) => <ResourceItem key={i} resource={r} onVideoClick={setCurrentVideoId} />)}
            </div>
          </div>
        )}
        {recommended.length > 0 && (
          <div className="slide-card p-4">
            <h3 className="eyebrow mb-3 text-gold-dim">Recommended</h3>
            <div className="space-y-2.5">
              {recommended.map((r, i) => <ResourceItem key={i} resource={r} onVideoClick={setCurrentVideoId} />)}
            </div>
          </div>
        )}
      </div>
      <VideoModal isOpen={!!currentVideoId} onClose={() => setCurrentVideoId(null)} videoId={currentVideoId} />
    </>
  )
}
