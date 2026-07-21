// @ts-ignore
import defaultBatchThumbnail from '../assets/images/curious_bharat_banner_1784624268246.jpg';

export function getProxiedImageUrl(url: string | null | undefined): string {
  if (!url) return defaultBatchThumbnail;
  
  // If it's already using our local build images or a transparent data URL, return it directly
  if (url.startsWith('data:') || url.startsWith('/') || url.startsWith('blob:') || url.includes('curious_bharat_banner_')) {
    return url;
  }
  
  // For web URLs, wrap Google Photos/Google Drive or other problematic links in our server-side image resolver proxy
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (
      url.includes('photos.app.goo.gl') || 
      url.includes('photos.google.com') || 
      url.includes('drive.google.com') ||
      url.includes('googleusercontent.com')
    ) {
      return `/api/proxy-image?url=${encodeURIComponent(url)}`;
    }
  }
  
  return url;
}
