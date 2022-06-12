import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../../prismicio";

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <div>
        <PrismicRichText field={post.content} />
      </div>
      <Link href="/">
        <a>
          Back
        </a>
      </Link>
    </div>
  );
}

export const getStaticPaths = async () => {
  // create a prismic client
  const client = createClient();

  // fetch the posts from prismic
  const response = await client.getAllByType('post');

  return {
    paths: [
      ...response.map((post) => ({
        params: {
          slug: post.uid,
        },
      })),
    ],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  // create a prismic client
  const client = createClient();

  // get the slug from the params
  const { slug } = params;

  // fetch the post from prismic using the slug (UID)
  const response = await client.getByUID('post', String(slug));

  // format the post for the page
  const post = {
    slug,
    title: response.data.title,
    content: response.data.content,
  };

  return {
    props: { post },
    revalidate: 60 * 60 * 6, // 6 hours
  };
};
