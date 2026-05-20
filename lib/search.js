'use client'

import Fuse from 'fuse.js'
import { buildSearchIndex } from '../data/modules'

const FUSE_OPTIONS = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'tag',   weight: 0.2 },
    { name: 'body',  weight: 0.4 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
}

let fuse = null
export function getSearchFuse() {
  if (!fuse) fuse = new Fuse(buildSearchIndex(), FUSE_OPTIONS)
  return fuse
}
