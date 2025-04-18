import apiClient from '@/helpers/api-client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

async function getValuations() {
  const response = await apiClient.get('valuations');
  return response.data;
}

async function getAllValuations() {
  const response = await apiClient.get('all_valuations');
  return response.data;
}

export const useValuations = (isAllValuations: boolean): UseQueryResult => {
  return useQuery({
    queryKey: ['valuations', isAllValuations],
    queryFn: isAllValuations ? getAllValuations : getValuations,
  });
};
