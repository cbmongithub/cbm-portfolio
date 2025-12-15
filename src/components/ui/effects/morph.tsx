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

import { useClickAway, useMounted } from "@/hooks";

import { MORPH_EFFECT_TRANSITION, MORPH_EFFECT_VARIANTS } from "@/lib/config/motion";

type MorphEffectContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
};

const MorphEffectContext = React.createContext<MorphEffectContextType | null>(null);

export function useMorphEffect() {
  const context = useContext(MorphEffectContext);
  if (!context) {
    throw new Error("useMorphEffect must be used within a MorphEffectProvider");
  }
  return context;
}

type MorphEffectProviderProps = {
  children: React.ReactNode;
};

export function MorphEffectProvider({ children }: MorphEffectProviderProps) {
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
      <MotionConfig transition={MORPH_EFFECT_TRANSITION}>{children}</MotionConfig>
    </MorphEffectContext.Provider>
  );
}

type MorphEffectProps = {
  children: React.ReactNode;
};

export function MorphEffect({ children }: MorphEffectProps) {
  return (
    <MorphEffectProvider>
      <MotionConfig transition={MORPH_EFFECT_TRANSITION} reducedMotion="user">
        {children}
      </MotionConfig>
    </MorphEffectProvider>
  );
}

type MorphEffectTriggerProps = {
  children: React.ReactNode;
};

export function MorphEffectTrigger({ children }: MorphEffectTriggerProps) {
  const { setIsOpen, isOpen, uniqueId } = useMorphEffect();

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    },
    [setIsOpen]
  );

  return (
    <motion.div
      layoutId={`dialog-${uniqueId}`}
      className="relative isolate cursor-pointer"
      style={{ zIndex: isOpen ? 10 : 0 }}
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

export function MorphEffectContent({ children }: MorphEffectContentProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphEffect();
  const containerRef = useRef<HTMLDivElement>(null!);
  const [firstFocusableElement, setFirstFocusableElement] = useState<HTMLElement | null>(
    null
  );
  const [lastFocusableElement, setLastFocusableElement] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
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
        } else if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      requestAnimationFrame(() => {
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
      });
    } else {
      document.body.classList.remove("overflow-hidden");
      triggerRef.current?.focus();
      setFirstFocusableElement(null);
      setLastFocusableElement(null);
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
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
      className="relative max-h-[90vh] w-5/6 max-w-4xl overflow-hidden rounded-2xl"
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

export function MorphEffectContainer({ children }: MorphEffectContainerProps) {
  const { isOpen, uniqueId } = useMorphEffect();
  const { mounted } = useMounted();

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="bg-foreground/30 fixed inset-0 size-full"
            style={{ willChange: "opacity" }}
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
  sizes?: string;
};

export function MorphEffectImage({ src, alt, sizes }: MorphEffectImageProps) {
  const { uniqueId } = useMorphEffect();
  const { mounted } = useMounted();

  return (
    <div className="bg-muted relative aspect-285/178 w-full overflow-hidden rounded-lg">
      {!mounted && (
        <div className="bg-muted absolute inset-0 animate-pulse" aria-hidden="true" />
      )}
      <motion.img
        src={src}
        alt={alt}
        sizes={sizes}
        width={1920}
        height={1199}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
        layoutId={`dialog-img-${uniqueId}`}
      />
    </div>
  );
}

export function MorphEffectClose() {
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
      className="border-border bg-background group text-foreground hover:bg-muted hover:text-muted-foreground absolute top-6 right-6 z-50 size-fit rounded border p-2 transition-colors duration-200"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={MORPH_EFFECT_VARIANTS}
    >
      <Cross1Icon className="text-foreground" />
    </motion.button>
  );
}
