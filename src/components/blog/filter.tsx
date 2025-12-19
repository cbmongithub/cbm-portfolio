"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui";
import { BackgroundEffect } from "@/components/ui/effects";
import { Text } from "@/components/ui/typography";

import { CATEGORIES, DEFAULT_CATEGORY } from "@/lib/config/blog";
import { cn } from "@/lib/utils";

type BlogFilterPost = {
  slug: string;
  title: string;
  description: string;
  formattedDate: string;
  tags: string[];
};

type BlogFilterProps = {
  posts: BlogFilterPost[];
};

export function BlogFilter({ posts }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);

  const filteredPosts = useMemo(() => {
    if (activeCategory === DEFAULT_CATEGORY) return posts;

    const category = CATEGORIES.find((entry) => entry.id === activeCategory);
    if (!category || category.tags.length === 0) return posts;

    const tagSet = new Set(category.tags.map((tag) => tag.toLowerCase()));

    return posts.filter((post) => post.tags.some((tag) => tagSet.has(tag.toLowerCase())));
  }, [activeCategory, posts]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ id, label }) => {
          const isActive = id === activeCategory;
          return (
            <Button
              key={id}
              variant="outline"
              size="sm"
              onClick={() => setActiveCategory(id)}
              className={cn(
                isActive &&
                  "bg-foreground text-background hover:text-background hover:bg-foreground"
              )}
              aria-pressed={isActive}
            >
              {label}
            </Button>
          );
        })}
      </div>

      {filteredPosts.length ? (
        <BackgroundEffect enableHover className="bg-muted size-full">
          {filteredPosts.map(({ slug, title, description, formattedDate }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="border-muted text-muted-foreground my-2 mb-2 border-l p-3 pl-4"
              data-id={slug}
            >
              <Text className="text-sm" muted>
                {formattedDate}
              </Text>
              <Text>{title}</Text>
              <Text muted>{description}</Text>
            </Link>
          ))}
        </BackgroundEffect>
      ) : (
        <div className="border-muted text-muted-foreground border-l p-3 pl-4">
          <Text muted>No posts yet for this category.</Text>
        </div>
      )}
    </div>
  );
}
