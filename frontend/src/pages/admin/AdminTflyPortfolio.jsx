import { useMemo, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, useFieldArray, FormProvider, useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  Plus, Trash2, Save, RotateCcw, ChevronUp, ChevronDown,
  ExternalLink, Compass, Sparkles, Layers, Grid3x3,
  Map, ListChecks, PhoneCall, AlignLeft
} from 'lucide-react'
import { adminAPI } from '../../utils/api'

// ─────────────────────────────────────────────────────────────
// Shape transforms — the API stores plain string[] for bullet /
// paragraph lists. In this form they're edited as a single
// "one line per item" textarea, which is far easier to use than
// a nested field array of single-string objects.
// ─────────────────────────────────────────────────────────────

function linesToArray(text) {
  return (text || '').split('\n').map(s => s.trim()).filter(Boolean)
}

function toFormValues(content) {
  if (!content) return undefined
  return {
    ...content,
    who: {
      ...content.who,
      paragraphsText: (content.who?.paragraphs || []).join('\n'),
    },
    serviceSections: (content.serviceSections || []).map(sec => ({
      ...sec,
      blocks: (sec.blocks || []).map(b => ({
        ...b,
        bulletsText: (b.bullets || []).join('\n'),
      })),
    })),
    verticals: {
      ...content.verticals,
      items: (content.verticals?.items || []).map(v => ({
        ...v,
        bulletsText: (v.bullets || []).join('\n'),
      })),
    },
  }
}

function fromFormValues(formData) {
  const clean = JSON.parse(JSON.stringify(formData))

  clean.who.paragraphs = linesToArray(clean.who.paragraphsText)
  delete clean.who.paragraphsText

  clean.serviceSections = (clean.serviceSections || []).map(sec => {
    const blocks = (sec.blocks || []).map(b => {
      const { bulletsText, ...rest } = b
      return { ...rest, bullets: linesToArray(bulletsText) }
    })
    return { ...sec, blocks }
  })

  clean.verticals.items = (clean.verticals.items || []).map(v => {
    const { bulletsText, ...rest } = v
    return { ...rest, bullets: linesToArray(bulletsText) }
  })

  return clean
}

// ─────────────────────────────────────────────────────────────
// Small shared UI bits
// ─────────────────────────────────────────────────────────────

function SectionCard({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="glass-card p-4 sm:p-6 space-y-5">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-brand-400" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">{title}</h2>
          {subtitle && <p className="text-xs text-white/35 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/60 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-white/20 mt-1">{hint}</p>}
    </div>
  )
}

function RowControls({ onMoveUp, onMoveDown, onRemove, canMoveUp, canMoveDown, removeLabel = 'Remove' }) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <button type="button" disabled={!canMoveUp} onClick={onMoveUp}
        className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:hover:bg-transparent transition-colors">
        <ChevronUp size={14} />
      </button>
      <button type="button" disabled={!canMoveDown} onClick={onMoveDown}
        className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:hover:bg-transparent transition-colors">
        <ChevronDown size={14} />
      </button>
      <button type="button" onClick={onRemove} title={removeLabel}
        className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
        <Trash2 size={14} />
      </button>
    </div>
  )
}

const inputCls = 'input-field text-sm'
const taCls = 'input-field text-sm resize-none'

// ─────────────────────────────────────────────────────────────
// Navigation rail
// ─────────────────────────────────────────────────────────────

function NavEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'nav' })

  return (
    <SectionCard icon={Compass} title="Side navigation" subtitle="The thin rail of section links on wide screens.">
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 p-3 rounded-xl bg-white/3 border border-white/5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
              <input {...register(`nav.${i}.mark`)} placeholder="Marker e.g. +24.0" className={inputCls} />
              <input {...register(`nav.${i}.label`)} placeholder="Label e.g. Who we are" className={inputCls} />
              <input {...register(`nav.${i}.href`)} placeholder="Link e.g. #who" className={inputCls} />
            </div>
            <RowControls
              canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
              onMoveUp={() => move(i, i - 1)} onMoveDown={() => move(i, i + 1)}
              onRemove={() => remove(i)}
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => append({ mark: '', label: '', href: '#' })} className="btn-secondary text-xs">
        <Plus size={14} /> Add nav link
      </button>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────

function HeroEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'hero.credentials' })

  return (
    <SectionCard icon={Sparkles} title="Hero" subtitle="Top of the page — headline, subtext, CTAs and the stat strip.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Brand name"><input {...register('brand.logoText')} className={inputCls} /></Field>
        <Field label="Location line"><input {...register('brand.locationText')} className={inputCls} /></Field>

        <div className="md:col-span-2">
          <Field label="Headline" required>
            <textarea {...register('hero.title')} rows={2} className={taCls} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Subheading">
            <textarea {...register('hero.subtitle')} rows={3} className={taCls} />
          </Field>
        </div>

        <Field label="Primary button text" hint="Leave blank to hide the button.">
          <input {...register('hero.ctaPrimaryText')} className={inputCls} />
        </Field>
        <Field label="Primary button link">
          <input {...register('hero.ctaPrimaryHref')} placeholder="#talk" className={inputCls} />
        </Field>
        <Field label="Secondary button text" hint="Leave blank to hide the button.">
          <input {...register('hero.ctaSecondaryText')} className={inputCls} />
        </Field>
        <Field label="Secondary button link">
          <input {...register('hero.ctaSecondaryHref')} placeholder="#work" className={inputCls} />
        </Field>
      </div>

      <div className="pt-2 border-t border-white/5">
        <p className="text-sm font-medium text-white/60 mb-3">Stat strip</p>
        <div className="space-y-3">
          {fields.map((f, i) => (
            <div key={f.id} className="flex items-start gap-2 p-3 rounded-xl bg-white/3 border border-white/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                <input {...register(`hero.credentials.${i}.value`)} placeholder="Big number e.g. ––+" className={inputCls} />
                <input {...register(`hero.credentials.${i}.label`)} placeholder="Description" className={inputCls} />
              </div>
              <label className="flex items-center gap-2 text-xs text-white/40 pt-2 whitespace-nowrap">
                <input type="checkbox" {...register(`hero.credentials.${i}.highlight`)} className="accent-brand-500" />
                Accent
              </label>
              <RowControls
                canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
                onMoveUp={() => move(i, i - 1)} onMoveDown={() => move(i, i + 1)}
                onRemove={() => remove(i)}
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={() => append({ value: '', label: '', highlight: true })} className="btn-secondary text-xs mt-3">
          <Plus size={14} /> Add stat
        </button>
      </div>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Who we are
// ─────────────────────────────────────────────────────────────

function WhoEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'who.edgelist' })

  return (
    <SectionCard icon={AlignLeft} title="Who we are" subtitle="Intro section with the two-column pitch and the edge list.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Eyebrow tag"><input {...register('who.levelLabel')} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Heading"><input {...register('who.heading')} className={inputCls} /></Field>
        </div>
      </div>

      <Field label="Paragraphs" hint="One paragraph per line.">
        <textarea {...register('who.paragraphsText')} rows={4} className={taCls} />
      </Field>

      <Field label="Callout note" hint="Optional highlighted note under the paragraphs.">
        <textarea {...register('who.note')} rows={2} className={taCls} />
      </Field>

      <div className="pt-2 border-t border-white/5">
        <p className="text-sm font-medium text-white/60 mb-3">Edge list</p>
        <div className="space-y-3">
          {fields.map((f, i) => (
            <div key={f.id} className="flex items-start gap-2 p-3 rounded-xl bg-white/3 border border-white/5">
              <div className="grid grid-cols-1 gap-2 flex-1">
                <input {...register(`who.edgelist.${i}.title`)} placeholder="Title" className={inputCls} />
                <textarea {...register(`who.edgelist.${i}.description`)} rows={2} placeholder="Description" className={taCls} />
              </div>
              <RowControls
                canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
                onMoveUp={() => move(i, i - 1)} onMoveDown={() => move(i, i + 1)}
                onRemove={() => remove(i)}
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={() => append({ title: '', description: '' })} className="btn-secondary text-xs mt-3">
          <Plus size={14} /> Add item
        </button>
      </div>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Service sections (Content / Ads / Leads / Web / Automation ...)
// ─────────────────────────────────────────────────────────────

function ServiceBlockEditor({ sectionIndex, blockIndex, remove, move, canMoveUp, canMoveDown }) {
  const { register } = useFormContext()
  const base = `serviceSections.${sectionIndex}.blocks.${blockIndex}`
  return (
    <div className="p-3 rounded-xl bg-white/3 border border-white/5 space-y-2">
      <div className="flex items-start gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
          <input {...register(`${base}.no`)} placeholder="Eyebrow e.g. Production" className={inputCls} />
          <input {...register(`${base}.title`)} placeholder="Block title" className={inputCls} />
        </div>
        <RowControls
          canMoveUp={canMoveUp} canMoveDown={canMoveDown}
          onMoveUp={() => move(blockIndex, blockIndex - 1)} onMoveDown={() => move(blockIndex, blockIndex + 1)}
          onRemove={() => remove(blockIndex)}
        />
      </div>
      <textarea {...register(`${base}.description`)} rows={2} placeholder="Short description" className={taCls} />
      <textarea {...register(`${base}.bulletsText`)} rows={4} placeholder={'One bullet point per line'} className={taCls} />
      <textarea {...register(`${base}.note`)} rows={2} placeholder="Optional highlighted note (leave blank to hide)" className={taCls} />
    </div>
  )
}

function ServiceSectionEditor({ index, remove, move, canMoveUp, canMoveDown }) {
  const { control, register } = useFormContext()
  const { fields, append, remove: removeBlock, move: moveBlock } = useFieldArray({
    control, name: `serviceSections.${index}.blocks`
  })

  return (
    <div className="p-4 rounded-xl bg-white/2 border border-white/8 space-y-3">
      <div className="flex items-start gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
          <input {...register(`serviceSections.${index}.anchorId`)} placeholder="Anchor id e.g. content" className={inputCls} />
          <input {...register(`serviceSections.${index}.levelLabel`)} placeholder="Eyebrow e.g. +18.0" className={inputCls} />
          <input {...register(`serviceSections.${index}.heading`)} placeholder="Section heading" className={inputCls} />
        </div>
        <RowControls
          canMoveUp={canMoveUp} canMoveDown={canMoveDown}
          onMoveUp={() => move(index, index - 1)} onMoveDown={() => move(index, index + 1)}
          onRemove={() => remove(index)} removeLabel="Remove whole section"
        />
      </div>
      <textarea {...register(`serviceSections.${index}.intro`)} rows={2} placeholder="Optional intro line under the heading (leave blank to hide)" className={taCls} />

      <div className="space-y-3 pl-3 border-l border-white/8">
        {fields.map((f, bi) => (
          <ServiceBlockEditor
            key={f.id}
            sectionIndex={index}
            blockIndex={bi}
            remove={removeBlock}
            move={moveBlock}
            canMoveUp={bi > 0}
            canMoveDown={bi < fields.length - 1}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ no: '', title: '', description: '', bulletsText: '', note: '' })}
        className="btn-secondary text-xs"
      >
        <Plus size={14} /> Add block
      </button>
    </div>
  )
}

function ServiceSectionsEditor() {
  const { control } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'serviceSections' })

  return (
    <SectionCard icon={Layers} title="Service sections"
      subtitle="Content, Ads, Leads, Web, Automation — add, remove or reorder entire sections and their blocks.">
      <div className="space-y-4">
        {fields.map((f, i) => (
          <ServiceSectionEditor
            key={f.id} index={i} remove={remove} move={move}
            canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ anchorId: '', levelLabel: '', heading: '', intro: '', blocks: [] })}
        className="btn-primary text-xs"
      >
        <Plus size={14} /> Add service section
      </button>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Selected work
// ─────────────────────────────────────────────────────────────

function WorkEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'work.items' })

  return (
    <SectionCard icon={Grid3x3} title="Selected work" subtitle="The tile grid of case studies / reels near the bottom of the page.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Eyebrow tag"><input {...register('work.levelLabel')} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Heading"><input {...register('work.heading')} className={inputCls} /></Field>
        </div>
        <div className="md:col-span-3">
          <Field label="Intro line" hint="Optional, shown under the heading."><input {...register('work.intro')} className={inputCls} /></Field>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="p-3 rounded-xl bg-white/3 border border-white/5 space-y-2">
            <div className="flex items-start gap-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                <input {...register(`work.items.${i}.tag`)} placeholder="Tag e.g. Real estate" className={inputCls} />
                <input {...register(`work.items.${i}.title`)} placeholder="Title" className={inputCls} />
              </div>
              <RowControls
                canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
                onMoveUp={() => move(i, i - 1)} onMoveDown={() => move(i, i + 1)}
                onRemove={() => remove(i)}
              />
            </div>
            <textarea {...register(`work.items.${i}.description`)} rows={2} placeholder="Short caption" className={taCls} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input {...register(`work.items.${i}.href`)} placeholder="Link URL" className={inputCls} />
              <select {...register(`work.items.${i}.orientation`)} className={inputCls}>
                <option value="vertical">Vertical tile (9:16)</option>
                <option value="horizontal">Horizontal tile (16:9)</option>
              </select>
              <label className="flex items-center gap-2 text-xs text-white/40 px-1">
                <input type="checkbox" {...register(`work.items.${i}.wide`)} className="accent-brand-500" />
                Full width (horizontal only)
              </label>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ tag: '', title: '', description: '', href: '', orientation: 'vertical', wide: false })}
        className="btn-secondary text-xs"
      >
        <Plus size={14} /> Add tile
      </button>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Verticals (industries)
// ─────────────────────────────────────────────────────────────

function VerticalsEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'verticals.items' })

  return (
    <SectionCard icon={Map} title="Industries served" subtitle="The three-column 'what this looks like in your business' grid.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Eyebrow tag"><input {...register('verticals.levelLabel')} className={inputCls} /></Field>
        <Field label="Heading"><input {...register('verticals.heading')} className={inputCls} /></Field>
      </div>

      <div className="pt-2 border-t border-white/5 space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="p-3 rounded-xl bg-white/3 border border-white/5 space-y-2">
            <div className="flex items-start gap-2">
              <input {...register(`verticals.items.${i}.title`)} placeholder="Industry name" className={`${inputCls} flex-1`} />
              <RowControls
                canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
                onMoveUp={() => move(i, i - 1)} onMoveDown={() => move(i, i + 1)}
                onRemove={() => remove(i)}
              />
            </div>
            <textarea {...register(`verticals.items.${i}.description`)} rows={2} placeholder="Description" className={taCls} />
            <textarea {...register(`verticals.items.${i}.bulletsText`)} rows={4} placeholder="One bullet point per line" className={taCls} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ title: '', description: '', bulletsText: '' })}
        className="btn-secondary text-xs"
      >
        <Plus size={14} /> Add industry
      </button>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Process
// ─────────────────────────────────────────────────────────────

function ProcessEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'process.steps' })

  return (
    <SectionCard icon={ListChecks} title="Process" subtitle="The numbered 'How we start' steps.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Eyebrow tag"><input {...register('process.levelLabel')} className={inputCls} /></Field>
        <Field label="Heading"><input {...register('process.heading')} className={inputCls} /></Field>
      </div>

      <div className="pt-2 border-t border-white/5 space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 p-3 rounded-xl bg-white/3 border border-white/5">
            <input {...register(`process.steps.${i}.number`)} placeholder="01" className={`${inputCls} w-16 shrink-0`} />
            <div className="flex-1 space-y-2">
              <input {...register(`process.steps.${i}.title`)} placeholder="Step title" className={inputCls} />
              <textarea {...register(`process.steps.${i}.description`)} rows={2} placeholder="Description" className={taCls} />
            </div>
            <RowControls
              canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
              onMoveUp={() => move(i, i - 1)} onMoveDown={() => move(i, i + 1)}
              onRemove={() => remove(i)}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ number: String(fields.length + 1).padStart(2, '0'), title: '', description: '' })}
        className="btn-secondary text-xs"
      >
        <Plus size={14} /> Add step
      </button>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// CTA / Contact + Footer
// ─────────────────────────────────────────────────────────────

function CtaEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'cta.contactList' })

  return (
    <SectionCard icon={PhoneCall} title="Closing call-to-action" subtitle="The final section with your contact details, plus the site footer.">
      <Field label="Heading"><input {...register('cta.heading')} className={inputCls} /></Field>
      <Field label="Description">
        <textarea {...register('cta.description')} rows={3} className={taCls} />
      </Field>

      <div className="pt-2 border-t border-white/5 space-y-3">
        <p className="text-sm font-medium text-white/60">Contact list</p>
        {fields.map((f, i) => (
          <div key={f.id} className="p-3 rounded-xl bg-white/3 border border-white/5 space-y-2">
            <div className="flex items-start gap-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                <input {...register(`cta.contactList.${i}.label`)} placeholder="Label e.g. Email" className={inputCls} />
                <input {...register(`cta.contactList.${i}.value`)} placeholder="Displayed text" className={inputCls} />
              </div>
              <RowControls
                canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
                onMoveUp={() => move(i, i - 1)} onMoveDown={() => move(i, i + 1)}
                onRemove={() => remove(i)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input {...register(`cta.contactList.${i}.href`)} placeholder="Link (tel:, mailto:, https://... — leave blank for plain text)" className={inputCls} />
              <label className="flex items-center gap-2 text-xs text-white/40 px-1">
                <input type="checkbox" {...register(`cta.contactList.${i}.external`)} className="accent-brand-500" />
                Opens in new tab <ExternalLink size={12} />
              </label>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ label: '', value: '', href: '', external: false })}
          className="btn-secondary text-xs"
        >
          <Plus size={14} /> Add contact line
        </button>
      </div>

      <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Footer line 1"><input {...register('footer.line1')} className={inputCls} /></Field>
        <Field label="Footer line 2"><input {...register('footer.line2')} className={inputCls} /></Field>
      </div>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────

const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'who', label: 'Who we are' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'verticals', label: 'Industries' },
  { id: 'process', label: 'Process' },
  { id: 'cta', label: 'Contact & footer' },
  { id: 'nav', label: 'Navigation' },
]

export default function AdminTflyPortfolio() {
  const qc = useQueryClient()
  const [tab, setTab] = useState('hero')

  const { data: content, isLoading } = useQuery({
    queryKey: ['admin-portfolio-content'],
    queryFn: () => adminAPI.getPortfolio(),
    select: res => res.data.content,
  })

  const formValues = useMemo(() => toFormValues(content), [content])

  const methods = useForm({ values: formValues })
  const { handleSubmit, formState: { isDirty } } = methods

  const save = useMutation({
    mutationFn: (data) => adminAPI.updatePortfolio(fromFormValues(data)),
    onSuccess: (res) => {
      qc.setQueryData(['admin-portfolio-content'], res)
      toast.success('Portfolio page updated')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error saving changes')
  })

  const reset = useMutation({
    mutationFn: () => adminAPI.resetPortfolio(),
    onSuccess: (res) => {
      qc.setQueryData(['admin-portfolio-content'], res)
      toast.success('Restored the original default copy')
    },
    onError: () => toast.error('Error resetting content')
  })

  const onSubmit = handleSubmit((data) => save.mutate(data))

  if (isLoading || !formValues) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Tofly Portfolio page</h1>
            <p className="text-white/40 text-sm">
              Everything on{' '}
              <a href="/tofly-portfolio" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 inline-flex items-center gap-1">
                /tofly-portfolio <ExternalLink size={12} />
              </a>{' '}
              is edited here.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { if (confirm('Restore the original default copy? Unsaved changes will be lost.')) reset.mutate() }}
              className="btn-secondary text-sm"
            >
              <RotateCcw size={14} /> Reset to defaults
            </button>
            <button type="submit" disabled={save.isLoading} className="btn-primary text-sm">
              <Save size={15} /> {save.isLoading ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>

        {isDirty && (
          <div className="text-xs text-amber-400/80 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
            You have unsaved changes.
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                tab === t.id
                  ? 'bg-brand-500/15 text-brand-300 border-brand-500/30'
                  : 'text-white/40 border-white/10 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Keep all sections mounted so react-hook-form state / field arrays
            aren't lost when switching tabs — just hide the inactive ones. */}
        <div className={tab === 'hero' ? '' : 'hidden'}><HeroEditor /></div>
        <div className={tab === 'who' ? '' : 'hidden'}><WhoEditor /></div>
        <div className={tab === 'services' ? '' : 'hidden'}><ServiceSectionsEditor /></div>
        <div className={tab === 'work' ? '' : 'hidden'}><WorkEditor /></div>
        <div className={tab === 'verticals' ? '' : 'hidden'}><VerticalsEditor /></div>
        <div className={tab === 'process' ? '' : 'hidden'}><ProcessEditor /></div>
        <div className={tab === 'cta' ? '' : 'hidden'}><CtaEditor /></div>
        <div className={tab === 'nav' ? '' : 'hidden'}><NavEditor /></div>
      </form>
    </FormProvider>
  )
}