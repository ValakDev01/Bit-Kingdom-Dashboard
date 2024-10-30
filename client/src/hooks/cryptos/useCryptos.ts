import { getAllCryptos, getTotalCryptoCount } from '../../services/apiCryptos';
import { CryptoResponse } from '../../types/cryptosTypes';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useCryptos = (
  sortParameter: string,
  filter: string,
  page: number,
  limit: number
) => {
  const queryClient = useQueryClient();

  const sort =
    sortParameter === 'price-asc'
      ? 'quote.USD.price'
      : sortParameter === 'price-desc'
        ? '-quote.USD.price'
        : sortParameter === 'volume-desc-1h'
          ? '-quote.USD.percent_change_1h'
          : sortParameter === 'volume-asc-1h'
            ? 'quote.USD.percent_change_1h'
            : sortParameter === 'volume-desc-24h'
              ? '-quote.USD.percent_change_24h'
              : sortParameter === 'volume-asc-24h'
                ? 'quote.USD.percent_change_24h'
                : sortParameter === 'volume-desc-7d'
                  ? '-quote.USD.percent_change_7d'
                  : sortParameter === 'volume-asc-7d'
                    ? 'quote.USD.percent_change_7d'
                    : '';

  const filterParams =
    filter === 'gainers'
      ? { 'percent_change_24h[gt]': 0 }
      : filter === 'losers'
        ? { 'percent_change_24h[lt]': 0 }
        : {};

  const { data: totalCount } = useQuery<number>(
    ['cryptoTotalCount', sort, filter],
    () => getTotalCryptoCount(sort, filterParams)
  );

  const cryptoQuery = useQuery<CryptoResponse>({
    queryKey: ['crypto', sortParameter, filter, page, limit],
    queryFn: () => getAllCryptos(sort, filterParams, page, limit),
  });

  const pageCount = Math.ceil((totalCount || 0) / limit);

  // Pre-Fetch Query

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['crypto', sortParameter, filter, page + 1, limit],
      queryFn: () => getAllCryptos(sort, filterParams, page + 1, limit),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['crypto', sortParameter, filter, page - 1, limit],
      queryFn: () => getAllCryptos(sort, filterParams, page - 1, limit),
    });
  }

  return { ...cryptoQuery, totalCount };
};

export default useCryptos;
