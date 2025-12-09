"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

import { useCopy } from "@/hooks/use-copy";

import { Button } from "./button";

type CopyButtonProps = {
  code: string;
};

export function CopyButton({ code }: CopyButtonProps) {
  const { copied, handleClick } = useCopy(code);
  return (
    <Button onClick={handleClick} variant="icon" aria-label={copied ? "Copied!" : "Copy"}>
      <span className="ease text-foreground absolute flex size-full items-center justify-center">
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </span>
    </Button>
  );
}
