
'use client';

import { useEffect, useRef } from 'react';

// Define the type for the props
interface LiteVideoPlayerProps {
  videoId: string;
  baseUrl?: string;
  aspectRatio?: string;
  params?: string;
}

// Extend the JSX.IntrinsicElements interface to include our custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lite-video-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & LiteVideoPlayerProps, HTMLElement>;
    }
  }
}

export const LiteVideoPlayer: React.FC<LiteVideoPlayerProps> = (props) => {
  const videoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if the custom element is already defined
    if (!window.customElements.get('lite-video-player')) {
      class LiteVideoPlayerElement extends HTMLElement {
        connectedCallback() {
          const shadowRoot = this.attachShadow({ mode: 'open' });
          const getAttr = this.getAttribute.bind(this);

          const videoId = getAttr('video-id') || '';
          const baseUrl = getAttr('base-url') || 'https://app.litevideo.net';
          const aspectRatio = getAttr('aspect-ratio') || '16:9';
          const params = getAttr('params') || '';

          let cssAspectRatio = '16/9';
          if (aspectRatio === '1:1') {
            cssAspectRatio = '1/1';
          } else if (aspectRatio.includes(':')) {
            cssAspectRatio = aspectRatio.replace(':', '/');
          } else {
            cssAspectRatio = aspectRatio;
          }

          shadowRoot.innerHTML = `
            <style>
              :host { display: block; max-width: 1280px; margin: auto; }
              .v { position: relative; width: 100%; aspect-ratio: ${cssAspectRatio}; overflow: hidden; border-radius: 8px; background: #000; }
              iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
            </style>
            <div class="v">
              <iframe src="${baseUrl}/embed/${videoId}?${params}" loading="lazy" allowfullscreen></iframe>
            </div>
          `;
        }
      }
      window.customElements.define('lite-video-player', LiteVideoPlayerElement);
    }
  }, []);

  return (
    <lite-video-player
      ref={videoRef}
      video-id={props.videoId}
      aspect-ratio={props.aspectRatio}
      base-url={props.baseUrl}
      params={props.params}
    />
  );
};
