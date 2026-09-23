import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Studly',
    short_name: 'Studly',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#1a1a1a',
icons: [
      {
        src: '/ikoner/logo.png', // Sti til filen i public-mappen
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/ikoner/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable', // Gjør at ikonet tilpasser seg sirkler/rundinger på Android
      }
    ],
  };
}
