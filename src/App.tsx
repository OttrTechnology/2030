import { useState } from "react"

import { AsciiControls } from "@/components/ascii-controls"
import { useTheme } from "@/components/theme-provider"
import { AsciiLogo } from "@/components/ui/ascii-logo"
import { InnerMoon } from "@/components/ui/inner-moon"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { ASCII_LOGO_DEFAULT_CONFIG } from "@/lib/ascii-logo-settings"

export function App() {
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState(ASCII_LOGO_DEFAULT_CONFIG)
  const appliedCellSize = useDebouncedValue(settings.cellSize, 150)
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <div className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-auto size-[min(84vmin,690px)]">
          <AsciiLogo
            src="/ottr-mark.png"
            fit={0.9}
            threshold={0.1}
            cellGap={1}
            color={isDark ? "#fafafa" : "#111111"}
            backgroundColor="transparent"
            theme="auto"
            cellSize={appliedCellSize}
            hoverPush={settings.hoverPush}
            gravity={settings.gravity}
            bounce={settings.bounce}
            label="Ottr"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
        <p className="pointer-events-none text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Ottr
        </p>
        <InnerMoon
          toggled={isDark}
          className="pointer-events-auto inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background text-base text-foreground hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex p-4 pt-16">
        <div className="pointer-events-auto ml-auto flex h-full min-h-0 items-end">
          <AsciiControls
            value={settings}
            onChange={setSettings}
            onReset={() => setSettings(ASCII_LOGO_DEFAULT_CONFIG)}
          />
        </div>
      </div>
    </div>
  )
}

export default App
