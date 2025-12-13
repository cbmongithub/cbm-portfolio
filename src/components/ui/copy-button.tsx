"use client";

import { memo } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

import { useCopy } from "@/hooks";

import { Button } from "@/components/ui";

type CopyButtonProps = {
  code: string;
};

export const CopyButton = memo(function CopyButton({ code }: CopyButtonProps) {
  const { copied, handleClick } = useCopy(code);
  return (
    <Button onClick={handleClick} variant="icon" aria-label={copied ? "Copied!" : "Copy"}>
      <span className="ease text-foreground absolute flex size-full items-center justify-center">
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </span>
    </Button>
  );
});
