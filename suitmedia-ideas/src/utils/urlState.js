export function getUrlState() {
  const params = new URLSearchParams(window.location.search);
  return {
    page: parseInt(params.get('page') || '1', 10),
    pageSize: parseInt(params.get('size') || '10', 10),
    sort: params.get('sort') || '-published_at',
  };
}

export function setUrlState({ page, pageSize, sort }) {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('size', String(pageSize));
  params.set('sort', sort);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
}
