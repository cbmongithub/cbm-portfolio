"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Cross1Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

import { useClickAway } from "@/hooks/use-click-away";

import {
  BASE_TRANSITION,
  EFFECT_TRANSITION,
  MORPH_EFFECT_VARIANTS,
} from "@/lib/config/variants";

type MorphEffectContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
};

const MorphEffectContext = React.createContext<MorphEffectContextType | null>(null);

function useMorphEffect() {
  const context = useContext(MorphEffectContext);
  if (!context) {
    throw new Error("useMorphEffect must be used within a MorphEffectProvider");
  }
  return context;
}

type MorphEffectProviderProps = {
  children: React.ReactNode;
};

function MorphEffectProvider({ children }: MorphEffectProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null!);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      uniqueId,
      triggerRef,
    }),
    [isOpen, uniqueId]
  );

  return (
    <MorphEffectContext.Provider value={contextValue}>
      <MotionConfig transition={EFFECT_TRANSITION}>{children}</MotionConfig>
    </MorphEffectContext.Provider>
  );
}

type MorphEffectProps = {
  children: React.ReactNode;
};

function MorphEffect({ children }: MorphEffectProps) {
  return (
    <MorphEffectProvider>
      <MotionConfig transition={BASE_TRANSITION}>{children}</MotionConfig>
    </MorphEffectProvider>
  );
}

type MorphEffectTriggerProps = {
  children: React.ReactNode;
};

function MorphEffectTrigger({ children }: MorphEffectTriggerProps) {
  const { setIsOpen, isOpen, uniqueId } = useMorphEffect();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <motion.div
      layoutId={`dialog-${uniqueId}`}
      className="relative cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`motion-ui-morphing-dialog-content-${uniqueId}`}
      aria-label={`Open dialog ${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type MorphEffectContentProps = {
  children: React.ReactNode;
};

function MorphEffectContent({ children }: MorphEffectContentProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphEffect();
  const containerRef = useRef<HTMLDivElement>(null!);
  const [firstFocusableElement, setFirstFocusableElement] = useState<HTMLElement | null>(
    null
  );
  const [lastFocusableElement, setLastFocusableElement] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if (event.key === "Tab") {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        setFirstFocusableElement(focusableElements[0] as HTMLElement);
        setLastFocusableElement(
          focusableElements[focusableElements.length - 1] as HTMLElement
        );
        (focusableElements[0] as HTMLElement).focus();
      }
    } else {
      document.body.classList.remove("overflow-hidden");
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  useClickAway(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <motion.div
      ref={containerRef}
      layoutId={`dialog-${uniqueId}`}
      className="bg-card ring-border relative max-h-[90vh] w-5/6 max-w-4xl overflow-hidden rounded-lg ring-1 ring-inset"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`motion-ui-morphing-dialog-title-${uniqueId}`}
      aria-describedby={`motion-ui-morphing-dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type MorphEffectContainerProps = {
  children: React.ReactNode;
};

function MorphEffectContainer({ children }: MorphEffectContainerProps) {
  const { isOpen, uniqueId } = useMorphEffect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="bg-foreground/40 fixed inset-0 h-full w-full backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

type MorphEffectImageProps = {
  src: string;
  alt: string;
};

function MorphEffectImage({ src, alt }: MorphEffectImageProps) {
  const { uniqueId } = useMorphEffect();
  return (
    <motion.img
      src={src}
      alt={alt}
      className="h-auto w-full rounded-lg"
      layoutId={`dialog-img-${uniqueId}`}
    />
  );
}

function MorphEffectClose() {
  const { setIsOpen, uniqueId } = useMorphEffect();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      className="border-border bg-background group text-muted-foreground hover:bg-secondary absolute top-6 right-6 z-50 size-fit rounded border p-2"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={MORPH_EFFECT_VARIANTS}
    >
      <Cross1Icon className="text-foreground" />
    </motion.button>
  );
}

export {
  MorphEffect,
  MorphEffectClose,
  MorphEffectContainer,
  MorphEffectContent,
  MorphEffectImage,
  MorphEffectTrigger,
};
