import { gql, request } from 'graphql-request';
import { PostInterface } from '@/interfaces';

const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || '';

export const getPosts = async (page = 1, limit = 5): Promise<PostInterface[]> => {
  const query = gql`
    query GetAllPosts($page: Int!, $limit: Int!) {
      posts(options: { paginate: { page: $page, limit: $limit } }) {
        data {
          id
          title
          body
          user {
            id
            name
            username
            email
          }
        }
        meta {
          totalCount
        }
      }
    }
  `;

  const result: any = await request(graphqlAPI, query, { page, limit });

  return result.posts;
};

export const createPost = async ({ title, body }: { title: string; body: string }): Promise<PostInterface> => {
  const mutation = gql`
    mutation CreatePost($title: String!, $body: String!) {
      createPost(input: { title: $title, body: $body }) {
        id
        title
        body
        user {
          id
          name
          username
          email
        }
      }
    }
  `;

  const result: any = await request(graphqlAPI, mutation, { title, body });

  return result.createPost;
};
