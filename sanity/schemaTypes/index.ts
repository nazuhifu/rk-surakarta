import { type SchemaTypeDefinition } from 'sanity'
import berita from './berita'
import awardee from './awardee'
import testimoni from './testimoni'
import heroSlideshow from './hero-slideshow'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [berita, awardee, testimoni, heroSlideshow],
} 
