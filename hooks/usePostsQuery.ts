import { useQuery, useQueryClient } from 'react-query';
import { getPosts } from '@/services';

export const usePostsQuery = ({ page = 1, limit = 100 } = {}) => {
  const queryClient = useQueryClient();

  return useQuery('posts', () => getPosts(page, limit), {
    initialData: () => queryClient.getQueryData('posts') // Use stored data as initial data
  });
};
