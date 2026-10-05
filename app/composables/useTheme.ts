export type Theme = "light" | "dark";

// Light/dark theme, persisted in localStorage. The initial value is applied
// before first paint by an inline script (see app.vue) to avoid a flash.
export function useTheme() {
  const theme = useState<Theme>("theme", () => "light");

  const apply = (next: Theme) => {
    theme.value = next;
    if (!import.meta.client) return;
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const sync = () => {
    const current = document.documentElement.dataset.theme;
    theme.value = current === "dark" ? "dark" : "light";
  };

  const toggle = () => apply(theme.value === "dark" ? "light" : "dark");

  return { theme, apply, sync, toggle };
}
