import { Database } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DataPending({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border border-dashed border-border bg-background/60 p-5 text-sm',
        className,
      )}
    >
      <Database className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-foreground">{title}</p>
        <div className="leading-relaxed text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}
