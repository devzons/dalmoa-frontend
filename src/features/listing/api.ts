export async function getListings({ domain, locale }: Params) {
  const data = await apiFetch<any>(
    `/wp-json/dalmoa/v1/${domain}?lang=${locale}`
  );

  if (Array.isArray(data)) {
    return {
      items: data,
      total: data.length,
      page: 1,
      totalPages: 1,
    };
  }

  return data;
}