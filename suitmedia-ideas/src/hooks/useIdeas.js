import { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api/ideas';

export function useIdeas({ page, pageSize, sort }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('page[number]', page);
      params.set('page[size]', pageSize);
      params.append('append[]', 'small_image');
      params.append('append[]', 'medium_image');
      params.set('sort', sort);

      const res = await fetch(`${API_BASE}?${params.toString()}`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sort]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  return { data, loading, error };
}
