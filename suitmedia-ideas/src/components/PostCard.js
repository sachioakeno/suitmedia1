import React, { useRef, useState } from 'react';
import './PostCard.css';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).toUpperCase();
}

function getImageUrl(item) {
  const url = item.medium_image?.[0]?.url || item.small_image?.[0]?.url;
  if (!url) return null;
  return url.replace('https://assets.suitdev.com', '');
}

export default function PostCard({ item }) {
  console.log('item:', JSON.stringify(item, null, 2));
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imageUrl = getImageUrl(item);
  const dateStr = item.published_at || item.created_at;

  return (
    <article className="post-card">
      <div className="post-card__thumb">
        {!imgLoaded && !imgError && (
          <div className="post-card__skeleton" aria-hidden="true" />
        )}
        <img
          ref={imgRef}
          src={imageUrl}
          alt={item.title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={`post-card__img ${imgLoaded ? 'post-card__img--loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgError(true);
            setImgLoaded(true);
          }}
        />
        {imgError && (
          <div className="post-card__fallback" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      <div className="post-card__body">
        <time className="post-card__date" dateTime={dateStr}>
          {formatDate(dateStr)}
        </time>
        <h3 className="post-card__title">{item.title}</h3>
      </div>
    </article>
  );
}
