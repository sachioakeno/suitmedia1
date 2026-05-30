import React, { useState, useEffect, useCallback } from 'react';
import PostCard from './PostCard';
import Pagination from './Pagination';
import { useIdeas } from '../hooks/useIdeas';
import { getUrlState, setUrlState } from '../utils/urlState';
import './IdeasSection.css';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function IdeasSection() {
  const [{ page, pageSize, sort }, setState] = useState(getUrlState);

  useEffect(() => {
    setUrlState({ page, pageSize, sort });
  }, [page, pageSize, sort]);

  const { data, loading, error } = useIdeas({ page, pageSize, sort });

  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const items = data?.data || [];

  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  const handlePageSize = useCallback((e) => {
    setState(prev => ({ ...prev, pageSize: Number(e.target.value), page: 1 }));
  }, []);

  const handleSort = useCallback((e) => {
    setState(prev => ({ ...prev, sort: e.target.value, page: 1 }));
  }, []);

  const handlePage = useCallback((p) => {
    setState(prev => ({ ...prev, page: p }));
    window.scrollTo({ top: document.getElementById('ideas-section')?.offsetTop - 100 || 0, behavior: 'smooth' });
  }, []);

  return (
    <section id="ideas-section" className="ideas">
      <div className="ideas__container">
        {/* Controls Bar */}
        <div className="ideas__bar">
          <p className="ideas__count">
            {loading
              ? 'Loading...'
              : total > 0
                ? `Showing ${startItem} - ${endItem} of ${total}`
                : 'No results found'
            }
          </p>

          <div className="ideas__controls">
            <label className="ideas__label" htmlFor="sort-select">
              Sort by:
            </label>
            <div className="ideas__select-wrap">
              <select
                id="sort-select"
                className="ideas__select"
                value={sort}
                onChange={handleSort}
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
              <span className="ideas__chevron" aria-hidden="true">▼</span>
            </div>

            <label className="ideas__label" htmlFor="size-select">
              Show per page:
            </label>
            <div className="ideas__select-wrap">
              <select
                id="size-select"
                className="ideas__select"
                value={pageSize}
                onChange={handlePageSize}
              >
                {PAGE_SIZE_OPTIONS.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="ideas__chevron" aria-hidden="true">▼</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        {error ? (
          <div className="ideas__error">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>Failed to load ideas. Please try again.</p>
            <small>{error}</small>
          </div>
        ) : (
          <>
            <div className={`ideas__grid ${loading ? 'ideas__grid--loading' : ''}`}>
              {loading
                ? Array.from({ length: pageSize > 8 ? 8 : pageSize }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : items.map(item => (
                    <PostCard key={item.id} item={item} />
                  ))
              }
            </div>

            {!loading && items.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__thumb" />
      <div className="skeleton-card__body">
        <div className="skeleton-card__line skeleton-card__line--short" />
        <div className="skeleton-card__line" />
        <div className="skeleton-card__line" />
        <div className="skeleton-card__line skeleton-card__line--mid" />
      </div>
    </div>
  );
}
