import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { AsciiLogoPlaygroundConfig } from "@/lib/ascii-logo-settings"

type AsciiControlsProps = {
  value: AsciiLogoPlaygroundConfig
  onChange: (next: AsciiLogoPlaygroundConfig) => void
  onReset: () => void
}

function NumberSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  format = (n) => n.toString(),
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  format?: (value: number) => string
  onChange: (value: number) => void
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id} className="text-xs font-normal text-muted-foreground">
          {label}
        </Label>
        <span className="font-mono text-[11px] tabular-nums">{format(value)}</span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(next) => {
          const parsed = Array.isArray(next) ? next[0] : next
          if (typeof parsed === "number") onChange(parsed)
        }}
      />
    </div>
  )
}

export function AsciiControls({ value, onChange, onReset }: AsciiControlsProps) {
  const patch = (partial: Partial<AsciiLogoPlaygroundConfig>) =>
    onChange({ ...value, ...partial })

  return (
    <Card
      size="sm"
      className="flex max-h-full w-[min(calc(100vw-1.5rem),280px)] flex-col overflow-hidden bg-card/85 backdrop-blur-md"
    >
      <CardHeader className="shrink-0 border-b">
        <CardTitle>ASCII</CardTitle>
        <CardAction>
          <Button variant="ghost" size="xs" onClick={onReset}>
            <RotateCcw />
            Reset
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-3">
        <NumberSlider
          id="cellSize"
          label="Cell size"
          value={value.cellSize}
          min={6}
          max={18}
          step={1}
          onChange={(cellSize) => patch({ cellSize })}
        />
        <NumberSlider
          id="hoverPush"
          label="Hover push"
          value={value.hoverPush}
          min={0}
          max={8}
          step={0.1}
          format={(n) => n.toFixed(1)}
          onChange={(hoverPush) => patch({ hoverPush })}
        />
        <NumberSlider
          id="gravity"
          label="Gravity"
          value={value.gravity}
          min={0}
          max={0.5}
          step={0.01}
          format={(n) => n.toFixed(2)}
          onChange={(gravity) => patch({ gravity })}
        />
        <NumberSlider
          id="bounce"
          label="Bounce"
          value={value.bounce}
          min={0}
          max={0.9}
          step={0.01}
          format={(n) => n.toFixed(2)}
          onChange={(bounce) => patch({ bounce })}
        />
      </CardContent>
    </Card>
  )
}
