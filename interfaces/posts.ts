export interface AuthorInterface {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface PostInterface {
  id: number;
  title: string;
  body: string;
  user: AuthorInterface;
}

export interface NewPostProps {
  title: string;
  body: string;
}
