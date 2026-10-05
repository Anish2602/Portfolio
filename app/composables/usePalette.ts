// Shared open/close state for the ⌘K command palette.
export function usePalette() {
  return useState<boolean>("palette-open", () => false);
}
