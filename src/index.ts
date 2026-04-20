/**
 * CE.SDK Getty Images Editor Starterkit - Main Entry Point
 *
 * A design editor with Getty Images stock photos integrated as the primary image source.
 * Search and browse premium stock photos from Getty Images directly within the editor.
 *
 * @see https://img.ly/docs/cesdk/js/getting-started/
 * @see https://developer.gettyimages.com/
 */

import CreativeEditorSDK from '@cesdk/cesdk-js';

import { initGettyImagesEditor } from './imgly';
import { resolveAssetPath } from './imgly/resolveAssetPath';

// ============================================================================
// Configuration
// ============================================================================

const config = {
  userId: 'starterkit-getty-asset-source-user'

  // Local assets (uncomment and set path for self-hosted assets)
  // baseURL: `/assets/`,

  // License key (required for production)
  // license: 'YOUR_LICENSE_KEY',
};

// ============================================================================
// Getty Images Configuration
// ============================================================================

// Your Getty Images API proxy URL
// IMPORTANT: Never expose your Getty Images API key in frontend code.
// Use a proxy server to add the API key server-side.
const gettyConfig = {
  gettyProxyUrl: undefined as string | undefined
  // gettyProxyUrl: 'https://your-proxy-server.com/getty-api'
};

// ============================================================================
// Initialize Getty Images Editor
// ============================================================================

CreativeEditorSDK.create('#cesdk_container', config)
  .then(async (cesdk) => {
    // Debug access (remove in production)
    (window as any).cesdk = cesdk;

    // Initialize the editor with Getty Images integration
    await initGettyImagesEditor(cesdk, gettyConfig);
    // ============================================================================
    // Scene Loading
    // ============================================================================

    // Load the Getty Images demo scene from CDN
    // This scene showcases images that can be replaced with photos from Getty Images
    await cesdk.loadFromURL(
      resolveAssetPath('/assets/getty-images.scene')
    );
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize CE.SDK:', error);
  });
