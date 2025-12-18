"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { BackgroundEffect } from "@/components/ui/effects";
import { Text } from "@/components/ui/typography";

import { CATEGORIES, DEFAULT_CATEGORY } from "@/lib/config/blog";
import { cn } from "@/lib/utils";

import { Button } from "../ui";

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
        <BackgroundEffect
          enableHover
          className="bg-muted size-full rounded-l-none rounded-r-lg"
        >
          {filteredPosts.map(({ slug, title, description, formattedDate }) => (
            <motion.div
              key={slug}
              layout
              data-id={slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="my-2 w-full"
            >
              <Link
                href={`/blog/${slug}`}
                className="border-muted text-muted-foreground block border-l p-3 pl-4"
              >
                <Text className="text-sm" muted>
                  {formattedDate}
                </Text>
                <Text>{title}</Text>
                <Text muted>{description}</Text>
              </Link>
            </motion.div>
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
