"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

import { useCopy } from "@/hooks/use-copy";

import { Button } from "./button";

type CopyButtonProps = {
  code: string;
};

export function CopyButton({ code }: CopyButtonProps) {
  const { isCopied, handleClick } = useCopy(code);

  return (
    <Button
      onClick={handleClick}
      variant="icon"
      icon={
        isCopied ? (
          <CheckIcon className="size-4" />
        ) : (
          <CopyIcon className="size-4" />
        )
      }
      aria-label={isCopied ? "Copied!" : "Copy"}
    />
  );
}
