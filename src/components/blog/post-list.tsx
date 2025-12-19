import Link from "next/link";

import { BackgroundEffect } from "@/components/ui/effects";
import { Text } from "@/components/ui/typography";

type PostList = {
  slug: string;
  title: string;
  description: string;
  formattedDate?: string;
  href?: string;
};

type PostsListProps = {
  posts: PostList[];
  showDate?: boolean;
};

export function PostsList({ posts, showDate = false }: PostsListProps) {
  return (
    <BackgroundEffect enableHover className="bg-muted size-full">
      {posts.map(({ slug, title, description, formattedDate, href }) => (
        <Link
          key={slug}
          href={href ?? `/blog/${slug}`}
          className="bg-card border-muted text-muted-foreground my-2 mb-2 border-l p-3 pl-4"
          data-id={slug}
        >
          {showDate && formattedDate ? (
            <Text className="text-sm" muted>
              {formattedDate}
            </Text>
          ) : null}
          <Text>{title}</Text>
          <Text muted>{description}</Text>
        </Link>
      ))}
    </BackgroundEffect>
  );
}
