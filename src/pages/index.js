import Link from 'next/link';
import { createClient } from '../../prismicio';

import Post from "../components/Post";

export default function Home({ posts }) {
  return (
    <div>
      <h1>
        Posts
      </h1>
      {posts.map(post => (
        <Link
          href={`/posts/${post.slug}`}
          key={post.slug}
        >
          <a>
            <Post
              title={post.title}
            />
          </a>
        </Link>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  // create an prismic client
  const client = createClient();

  // fetch the posts from prismic
  const response = await client.getAllByType('post');

  // format the posts for the page
  const posts = response.map((post) => ({
    slug: post.uid,
    title: post.data.title,
  }));

  // return the posts as props
  return {
    props: { posts },
    revalidate: 60 * 60, // 1 hour
  };
}
