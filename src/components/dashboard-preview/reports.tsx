import { Download, FileText } from 'lucide-react'
import { Fragment } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Panel } from '@/components/dashboard-preview/panel'
import { paddock, reports } from '@/components/dashboard-preview/data'

export function Reports({ className }: { className?: string }) {
  return (
    <Panel title="Reports" className={className}>
      <ul>
        {reports.map((report, index) => (
          <Fragment key={report.title}>
            {index > 0 && <Separator />}
            <li className="group/report flex items-center gap-3 py-2.5 focus-within:bg-background/40">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <FileText className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{report.title}</p>
                <p className="truncate font-mono text-[11px] text-muted-foreground">
                  {paddock.name} · {report.date}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Download ${report.title}`}
                className="opacity-0 transition-opacity group-hover/report:opacity-100 focus-visible:opacity-100"
              >
                <Download />
              </Button>
            </li>
          </Fragment>
        ))}
      </ul>
    </Panel>
  )
}
