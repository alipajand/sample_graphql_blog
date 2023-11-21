type postStatus = 'pending' | 'failed' | 'successful';

export interface AuthorInterface {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface PostInterface {
  title: string;
  body: string;
  id?: number;
  user?: AuthorInterface;
  status?: postStatus;
}

export interface NewPostProps {
  title: string;
  body: string;
  status?: postStatus;
}
