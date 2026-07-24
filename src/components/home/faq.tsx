import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Section } from '@/components/shared/section'
import { FadeIn } from '@/components/shared/fade-in'
import { faqs } from '@/components/home/data'

export function Faq() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Common questions"
      containerClassName="max-w-3xl"
    >
      <FadeIn>
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </Section>
  )
}
