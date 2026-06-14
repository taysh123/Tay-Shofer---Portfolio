"use client";

import { useReducedMotion } from "framer-motion";
import { useAccessibility } from "@/components/providers/AccessibilityProvider";

/**
 * Combined reduced-motion signal.
 *
 * Framer's `useReducedMotion()` only reads the OS `prefers-reduced-motion`
 * media query. The in-app Accessibility panel exposes a *separate* toggle
 * (`useAccessibility().reducedMotion`, mirrored onto `data-reduced-motion`).
 *
 * The CSS kill-switch in globals.css neutralizes CSS animations/transitions
 * for both, but it CANNOT stop a JS-driven loop (rAF / Framer motion values)
 * that writes transforms — e.g. a rotating 3D carousel. Any such animation
 * must gate on this combined hook, not on `useReducedMotion()` alone.
 */
export function useReducedMotionPref(): boolean {
  const media = useReducedMotion();
  const { reducedMotion } = useAccessibility();
  return Boolean(media) || reducedMotion;
}
