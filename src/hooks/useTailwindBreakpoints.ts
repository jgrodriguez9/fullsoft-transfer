import { useMemo } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

const tailwindBreakpoints = {
  xs: "(max-width: 639px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

type Breakpoint = keyof typeof tailwindBreakpoints | null;
interface TailwindBreakpointsReturn {
  current: Breakpoint;
  actives: Breakpoint[];
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
}

const useTailwindBreakpoints = (): TailwindBreakpointsReturn => {
  const isXs = useMediaQuery(tailwindBreakpoints.xs);
  const isSm = useMediaQuery(tailwindBreakpoints.sm);
  const isMd = useMediaQuery(tailwindBreakpoints.md);
  const isLg = useMediaQuery(tailwindBreakpoints.lg);
  const isXl = useMediaQuery(tailwindBreakpoints.xl);
  const is2Xl = useMediaQuery(tailwindBreakpoints["2xl"]);

  const { current, actives } = useMemo(() => {
    let current: Breakpoint = null;
    const actives: Breakpoint[] = [];

    if (is2Xl) {
      actives.push("2xl");
      current ??= "2xl";
    }

    if (isXl) {
      actives.push("xl");
      current ??= "xl";
    }

    if (isLg) {
      actives.push("lg");
      current ??= "lg";
    }

    if (isMd) {
      actives.push("md");
      current ??= "md";
    }

    if (isSm) {
      actives.push("sm");
      current ??= "sm";
    }

    if (isXs) {
      actives.push("xs");
      current ??= "xs";
    }

    return { current, actives };
  }, [is2Xl, isXl, isLg, isMd, isSm, isXs]);

  return { current, actives, isXs, isSm, isMd, isLg, isXl, is2Xl };
};

export default useTailwindBreakpoints;
