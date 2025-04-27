import apiClient from '@/helpers/api-client';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { PropertyVisit } from '../models';

async function getPropertyVisitById(id: string | number) {
  const response = await apiClient.get(`property_visits/${id}`);
  return response.data;
}

async function getPropertyVisitOptions() {
  const response = await apiClient.get('property_visit_options');
  return response.data;
}

async function addPropertyVisit(data: PropertyVisit) {
  return apiClient.put(`properties/${data.property_id}/property_visits`, {
    valuations_property_visit: data,
  });
}
async function updatePropertyVisit(data: PropertyVisit) {
  return apiClient.put(`property_visits/${data.property_id}`, {
    valuations_property_visit: data,
  });
}

export const usePropertyVisitById = (id: string | number): UseQueryResult => {
  return useQuery({
    queryKey: ['property_visits', id],
    queryFn: () => getPropertyVisitById(id),
    enabled: !!id,
  });
};

export const usePropertyVisitOptions = (): UseQueryResult => {
  return useQuery({
    queryKey: ['property_visit_options'],
    queryFn: getPropertyVisitOptions,
  });
};

export const useAddPropertyVisit = () => {
  return useMutation({
    mutationFn: addPropertyVisit,
  });
};

export const useUpdatePropertyVisit = () => {
  return useMutation({
    mutationFn: updatePropertyVisit,
  });
};