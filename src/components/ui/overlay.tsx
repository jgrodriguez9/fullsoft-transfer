import { cn } from "@/libs/utils";
import React, {
  type CSSProperties,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

/**
 * Props for children render function
 */
interface ChildrenProps {
  isOpen: boolean;
}

/**
 * Overlay component props
 * @prop isOpen - Controls overlay visibility
 * @prop onClose - Callback when overlay should close
 * @prop children - Render function receiving open state
 * @prop className - Additional CSS classes
 * @prop blur - Whether to apply backdrop blur
 * @prop opacity - Opacity level for overlay
 * @prop operationMode - Animation mode (parallel/sequential)
 * @prop overlayTransitionDuration - Duration for overlay animation
 * @prop contentTransitionDuration - Duration for content animation
 * @prop closeOnEsc - Whether to close on ESC key
 * @prop closeOnClickOutside - Whether to close on outside click
 */
interface OverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ({ isOpen }: ChildrenProps) => React.ReactNode;
  className?: string;
  blur?: boolean;
  opacity?: "low" | "medium" | "high";
  operationMode?: "parallel" | "sequential";
  overlayTransitionDuration?: number;
  contentTransitionDuration?: number;
  closeOnEsc?: boolean;
  closeOnClickOutside?: boolean;
}

const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  (
    {
      isOpen,
      onClose,
      children,
      className,
      blur = true,
      opacity = "low",
      operationMode = "parallel",
      overlayTransitionDuration = 300,
      contentTransitionDuration = 300,
      closeOnEsc = true,
      closeOnClickOutside = true,
    },
    ref
  ) => {
    const [isOpenOverlay, setIsOpenOverlay] = useState(false); // Controls overlay visibility
    const [isOpenContent, setIsOpenContent] = useState(false); // Controls content visibility
    const [isOpenGlobal, setIsOpenGlobal] = useState(false); // Controls component mount state

    useEffect(() => {
      const timers: NodeJS.Timeout[] = []; // Store all animation timers
      const originalBodyOverflow = document.body.style.overflow; // Save original overflow
      const isSequentialMode = operationMode === "sequential"; // Animation mode flag

      /**
       * Adds a timer to the cleanup array
       * @param callback - Function to execute after delay
       * @param delay - Delay in milliseconds (0 for immediate execution)
       */
      const registerTimer = (callback: () => void, delay: number): void => {
        const timerId = setTimeout(callback, delay);
        timers.push(timerId);
      };

      if (isOpen) {
        setIsOpenGlobal(true); // Mount component
        setIsOpenOverlay(true); // Show overlay immediately
        document.body.style.overflow = "hidden"; // Prevent page scrolling

        // In sequential mode: wait for overlay animation
        // In parallel mode: show immediately (0 delay)
        const contentAppearDelay = isSequentialMode
          ? overlayTransitionDuration
          : 0;

        // Schedule content appearance
        registerTimer(() => {
          setIsOpenContent(true); // Reveal main content
        }, contentAppearDelay);
      } else {
        setIsOpenContent(false); // Hide content immediately

        // In sequential mode: wait for content hide animation
        // In parallel mode: hide immediately (0 delay)
        const overlayDisappearDelay = isSequentialMode
          ? contentTransitionDuration
          : 0;

        // Schedule overlay hide animation
        registerTimer(() => {
          setIsOpenOverlay(false); // Hide overlay
        }, overlayDisappearDelay);

        // Final unmount after all animations complete
        registerTimer(
          () => {
            setIsOpenGlobal(false); // Complete unmount
          },
          // Use the longest duration to ensure all animations complete
          Math.max(overlayTransitionDuration, contentTransitionDuration)
        );
      }

      return () => {
        // Clear all pending animations to prevent memory leaks
        timers.forEach((timer) => {
          clearTimeout(timer);
        });

        // Restore original body overflow state
        document.body.style.overflow = originalBodyOverflow;
      };
    }, [
      contentTransitionDuration,
      isOpen,
      operationMode,
      overlayTransitionDuration,
    ]);

    // ============================================
    // KEYBOARD EVENT HANDLING (ESC KEY)
    // ============================================
    useEffect(() => {
      if (!closeOnEsc || onClose === undefined || !isOpen) return;

      const handleKeyDown = (e: KeyboardEvent): void => {
        e.key === "Escape" && onClose();
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onClose, closeOnEsc]);

    const opacityClasses = {
      low: "bg-black/30",
      medium: "bg-black/50",
      high: "bg-black/70",
    };

    // Render children with open state
    const rendererChildren = children?.({ isOpen: isOpenContent });

    // Early return if not mounted
    if (!isOpen && !isOpenGlobal) return null;

    return createPortal(
      <div
        ref={ref}
        role="presentation"
        aria-hidden={!isOpenOverlay}
        style={{
          transitionDuration: `${overlayTransitionDuration}ms`,
        }}
        className={cn(
          "fixed inset-0 z-[9999999999] flex items-center justify-center",
          `transition-opacity`,
          opacityClasses[opacity],
          blur && "backdrop-blur-sm",
          !isOpenOverlay && "pointer-events-none opacity-0",
          className
        )}
        onClick={closeOnClickOutside ? onClose : undefined}
      >
        {React.Children.map(rendererChildren, (child) => {
          if (
            React.isValidElement<{
              onClick?: any;
              style?: CSSProperties;
              className?: string;
            }>(child)
          ) {
            return React.cloneElement(child, {
              className: cn("transition-all", child.props.className),
              style: {
                ...(child.props.style ?? {}),
                transitionDuration: `${contentTransitionDuration}ms`,
              },
              onClick: (e: React.MouseEvent) => {
                e.stopPropagation(); // Prevent overlay close when clicking content
                child.props.onClick?.(e); // Preserve original onClick
              },
            });
          }
          return child;
        })}
      </div>,

      document.body.querySelector("#root") ?? document.body
    );
  }
);

Overlay.displayName = "Overlay";

export default Overlay;
