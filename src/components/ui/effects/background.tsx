"use client";

import { Children, cloneElement, isValidElement, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { EFFECT_TRANSITION } from "@/lib/config/variants";
import { cn } from "@/lib/utils";

type ChildProps = {
  key: number;
  "data-id": string;
  className?: string;
  "data-checked"?: string;
  children?: React.ReactNode;
};

type BackgroundEffectProps = {
  children: React.ReactElement<ChildProps>[] | React.ReactElement<ChildProps>;
  defaultValue?: string;
  onValueChangeAction?: (newActiveId: string) => void;
  className?: string;
  enableHover?: boolean;
};

export function BackgroundEffect({
  children,
  className,
  defaultValue,
  onValueChangeAction,
  enableHover = false,
}: BackgroundEffectProps) {
  const isControlled = defaultValue !== undefined;
  const [uncontrolledId, setUncontrolledId] = useState<string>(defaultValue ?? "");
  const activeId = isControlled ? (defaultValue as string) : uncontrolledId;
  const uniqueId = useId();

  function handleSetActiveId(id: string) {
    if (!isControlled) {
      setUncontrolledId(id);
    }

    if (onValueChangeAction) {
      onValueChangeAction(id);
    }
  }

  return Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;

    const id = child.props["data-id"];
    const isActiveId = id === activeId;

    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(""),
        }
      : {
          onClick: () => handleSetActiveId(id),
        };

    return cloneElement(
      child as React.ReactElement<ChildProps>,
      {
        key: index,
        className: cn("relative inline-flex", child.props.className),
        "data-checked": isActiveId ? "true" : "false",
        ...interactionProps,
      } satisfies Partial<ChildProps>,
      <>
        <AnimatePresence initial={false}>
          {isActiveId && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn("absolute inset-0 rounded-sm", className)}
              transition={EFFECT_TRANSITION}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
        <div className="z-10">{child.props.children}</div>
      </>
    );
  });
}
