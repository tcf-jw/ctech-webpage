import { useRef, useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const industryOptions = [
  'Agriculture',
  'Mining rehabilitation',
  'Environmental restoration',
  'Government & research',
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldErrors = Partial<Record<'name' | 'email' | 'organisation', string>>

export function DemoRequestForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [industry, setIndustry] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const organisation = String(data.get('organisation') ?? '').trim()

    const nextErrors: FieldErrors = {}
    if (!name) nextErrors.name = 'Please enter your name.'
    if (!email) {
      nextErrors.email = 'Please enter your work email.'
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = 'That email address doesn’t look right.'
    }
    if (!organisation) {
      nextErrors.organisation = 'Please enter your organisation.'
    }

    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      form.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    toast.success('Request received — we’ll be in touch within one business day.')
    form.reset()
    setIndustry('')
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="demo-name">Name</Label>
          <Input
            id="demo-name"
            name="name"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'demo-name-error' : undefined}
          />
          {errors.name && (
            <p id="demo-name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="demo-email">Work email</Label>
          <Input
            id="demo-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'demo-email-error' : undefined}
          />
          {errors.email && (
            <p id="demo-email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="demo-organisation">Organisation</Label>
          <Input
            id="demo-organisation"
            name="organisation"
            autoComplete="organization"
            aria-invalid={errors.organisation ? true : undefined}
            aria-describedby={
              errors.organisation ? 'demo-organisation-error' : undefined
            }
          />
          {errors.organisation && (
            <p
              id="demo-organisation-error"
              className="text-sm text-destructive"
            >
              {errors.organisation}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="demo-industry">Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger id="demo-industry" className="w-full">
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              {industryOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="demo-message">
          Anything specific you’d like to see?{' '}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="demo-message"
          name="message"
          rows={4}
          placeholder="Hectares, crops or program, current soil testing setup…"
        />
      </div>

      <div>
        <Button type="submit" size="lg" className="rounded-lg">
          Request a Demo
        </Button>
      </div>
    </form>
  )
}
