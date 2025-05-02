import apiClient from '@/helpers/api-client';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';

async function getPropertyById(id: string | number) {
  const response = await apiClient.get(`properties/${id}`);
  return response.data;
}

async function updatePropertyVisitDelay(data: {
  id: number;
  visit_rescheduled_date?: string;
  visit_delay_reason?: string;
}) {
  const response = await apiClient.put(`${data.id}/property_visit_delayed`, {
    valuations_property: data,
  });
  return response.data;
}

export const usePropertyById = (id: string | number): UseQueryResult => {
  return useQuery({
    queryKey: ['properties', id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  });
};

export const useUpdatePropertyVisitDelay = () => {
  return useMutation({
    mutationFn: updatePropertyVisitDelay,
  });
};
