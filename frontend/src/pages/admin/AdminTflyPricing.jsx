import { useMemo, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, useFieldArray, FormProvider, useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  Plus, Trash2, Save, RotateCcw, ChevronUp, ChevronDown,
  ExternalLink, Tag, Layers, TrendingUp, Gift, Package, PlusCircle, FileText, AlignLeft
} from 'lucide-react'
import { adminAPI } from '../../utils/api'

// ─────────────────────────────────────────────────────────────
// Shape transforms — the API stores plain string[] for bullet lists.
// In this form they're edited as a single "one line per item" textarea,
// which is far easier to use than a nested field array of single-string
// objects. Same pattern as AdminTflyPortfolio.jsx.
// ─────────────────────────────────────────────────────────────

function linesToArray(text) {
  return (text || '').split('\n').map(s => s.trim()).filter(Boolean)
}

function toFormValues(content) {
  if (!content) return undefined
  return {
    ...content,
    track1: {
      ...content.track1,
      bulletsText: (content.track1?.bullets || []).join('\n'),
    },
    track2: {
      ...content.track2,
      bulletsText: (content.track2?.bullets || []).join('\n'),
    },
    onetime: {
      ...content.onetime,
      cards: (content.onetime?.cards || []).map(card => ({
        ...card,
        bulletsText: (card.bullets || []).join('\n'),
      })),
    },
    terms: {
      ...content.terms,
      itemsText: (content.terms?.items || []).join('\n'),
    },
  }
}

function fromFormValues(formData) {
  const clean = JSON.parse(JSON.stringify(formData))

  clean.track1.bullets = linesToArray(clean.track1.bulletsText)
  delete clean.track1.bulletsText

  clean.track2.bullets = linesToArray(clean.track2.bulletsText)
  delete clean.track2.bulletsText

  clean.onetime.cards = (clean.onetime.cards || []).map(card => {
    const { bulletsText, ...rest } = card
    return { ...rest, bullets: linesToArray(bulletsText) }
  })

  clean.terms.items = linesToArray(clean.terms.itemsText)
  delete clean.terms.itemsText

  return clean
}

// ─────────────────────────────────────────────────────────────
// Small shared UI bits (identical to AdminTflyPortfolio.jsx)
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
// Reusable "price card" list editor — used by Track 1, Track 2 and Bundle,
// each of which is just an array of the same plan-card shape.
// ─────────────────────────────────────────────────────────────

function PlanCardsEditor({ name, addLabel = 'Add price card' }) {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name })

  return (
    <div className="pt-2 border-t border-white/5">
      <p className="text-sm font-medium text-white/60 mb-3">Price cards</p>
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="p-3 rounded-xl bg-white/3 border border-white/5 space-y-2">
            <div className="flex items-start gap-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                <input {...register(`${name}.${i}.planLabel`)} placeholder="Plan label e.g. Monthly plan" className={inputCls} />
                <input {...register(`${name}.${i}.badge`)} placeholder="Badge e.g. 20% off (blank to hide)" className={inputCls} />
              </div>
              <RowControls
                canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
                onMoveUp={() => move(i, i - 1)} onMoveDown={() => move(i, i + 1)}
                onRemove={() => remove(i)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input {...register(`${name}.${i}.was`)} placeholder="Struck-through price (blank to hide)" className={inputCls} />
              <input {...register(`${name}.${i}.now`)} placeholder="Current price" className={inputCls} />
              <input {...register(`${name}.${i}.per`)} placeholder="Unit e.g. /month, total" className={inputCls} />
            </div>
            <div className="flex items-center gap-3">
              <input {...register(`${name}.${i}.effective`)} placeholder="Effective note (blank to hide)" className={`${inputCls} flex-1`} />
              <label className="flex items-center gap-2 text-xs text-white/40 whitespace-nowrap">
                <input type="checkbox" {...register(`${name}.${i}.highlight`)} className="accent-brand-500" />
                Gold highlight
              </label>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ planLabel: '', was: '', now: '', per: '', effective: '', badge: '', highlight: false })}
        className="btn-secondary text-xs mt-3"
      >
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────

function HeaderEditor() {
  const { register } = useFormContext()
  return (
    <SectionCard icon={Tag} title="Page header" subtitle="Brand line, headline and the offer-validity banner at the top of the page.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Brand name"><input {...register('brand.logoText')} className={inputCls} /></Field>
        <Field label="Location line"><input {...register('brand.locationText')} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Headline" required><input {...register('header.title')} className={inputCls} /></Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Subheading">
            <textarea {...register('header.subtitle')} rows={3} className={taCls} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Validity banner" hint="Leave blank to hide the banner entirely.">
            <input {...register('header.validityText')} className={inputCls} />
          </Field>
        </div>
      </div>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Track 1 — Content & Social
// ─────────────────────────────────────────────────────────────

function Track1Editor() {
  const { register } = useFormContext()
  return (
    <SectionCard icon={Layers} title="Track 1 — Content & Social" subtitle="Retainer track, its price cards, bullet list, team line and note.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Eyebrow tag"><input {...register('track1.tag')} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Heading" required><input {...register('track1.heading')} className={inputCls} /></Field>
        </div>
        <div className="md:col-span-3">
          <Field label="Intro line"><textarea {...register('track1.lede')} rows={2} className={taCls} /></Field>
        </div>
      </div>

      <PlanCardsEditor name="track1.plans" />

      <Field label="Feature bullets" hint="One bullet per line.">
        <textarea {...register('track1.bulletsText')} rows={6} className={taCls} />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
        <Field label="Team line label" hint='e.g. "Team included:"'><input {...register('track1.teamLabel')} className={inputCls} /></Field>
        <Field label="Team line value"><input {...register('track1.teamValue')} className={inputCls} /></Field>
      </div>

      <Field label="Note" hint="Optional highlighted note under the team line.">
        <textarea {...register('track1.note')} rows={2} className={taCls} />
      </Field>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Track 2 — Performance Marketing
// ─────────────────────────────────────────────────────────────

function RateRowsEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'track2.rateRows' })

  return (
    <div className="pt-2 border-t border-white/5">
      <p className="text-sm font-medium text-white/60 mb-3">Rate table</p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2">
        <input {...register('track2.rateTableHeaders.budget')} placeholder="Column 1 header" className={inputCls} />
        <input {...register('track2.rateTableHeaders.regularFee')} placeholder="Column 2 header" className={inputCls} />
        <input {...register('track2.rateTableHeaders.offerFee')} placeholder="Column 3 header" className={inputCls} />
        <input {...register('track2.rateTableHeaders.billing')} placeholder="Column 4 header" className={inputCls} />
      </div>
      <div className="space-y-2">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 p-3 rounded-xl bg-white/3 border border-white/5">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1">
              <input {...register(`track2.rateRows.${i}.budget`)} placeholder="Budget band" className={inputCls} />
              <input {...register(`track2.rateRows.${i}.regularFee`)} placeholder="Regular fee (struck through)" className={inputCls} />
              <input {...register(`track2.rateRows.${i}.offerFee`)} placeholder="Offer fee" className={inputCls} />
              <input {...register(`track2.rateRows.${i}.billing`)} placeholder="Billing basis" className={inputCls} />
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
        onClick={() => append({ budget: '', regularFee: '', offerFee: '', billing: '' })}
        className="btn-secondary text-xs mt-3"
      >
        <Plus size={14} /> Add row
      </button>
    </div>
  )
}

function Track2Editor() {
  const { register } = useFormContext()
  return (
    <SectionCard icon={TrendingUp} title="Track 2 — Performance Marketing" subtitle="Ad-spend rate table, price cards, bullet list, team line and note.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Eyebrow tag"><input {...register('track2.tag')} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Heading" required><input {...register('track2.heading')} className={inputCls} /></Field>
        </div>
        <div className="md:col-span-3">
          <Field label="Intro line"><textarea {...register('track2.lede')} rows={2} className={taCls} /></Field>
        </div>
      </div>

      <RateRowsEditor />
      <PlanCardsEditor name="track2.plans" />

      <Field label="Feature bullets" hint="One bullet per line.">
        <textarea {...register('track2.bulletsText')} rows={8} className={taCls} />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
        <Field label="Team line label"><input {...register('track2.teamLabel')} className={inputCls} /></Field>
        <Field label="Team line value"><input {...register('track2.teamValue')} className={inputCls} /></Field>
      </div>

      <Field label="Note" hint="Optional highlighted note under the team line.">
        <textarea {...register('track2.note')} rows={2} className={taCls} />
      </Field>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Growth Bundle
// ─────────────────────────────────────────────────────────────

function BundleEditor() {
  const { register } = useFormContext()
  return (
    <SectionCard icon={Gift} title="Growth Bundle" subtitle="The combined Track 1 + Track 2 offer.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Eyebrow tag"><input {...register('bundle.tag')} className={inputCls} /></Field>
        <Field label="Recommend badge" hint="Leave blank to hide."><input {...register('bundle.recommendBadge')} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Heading"><input {...register('bundle.heading')} className={inputCls} /></Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Description"><textarea {...register('bundle.lede')} rows={3} className={taCls} /></Field>
        </div>
      </div>

      <PlanCardsEditor name="bundle.plans" addLabel="Add bundle price" />

      <Field label="Save note" hint="Line under the price cards.">
        <textarea {...register('bundle.savenote')} rows={2} className={taCls} />
      </Field>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// One-time setup
// ─────────────────────────────────────────────────────────────

function OneTimeCardEditor({ index, remove, move, canMoveUp, canMoveDown }) {
  const { register } = useFormContext()
  const base = `onetime.cards.${index}`
  return (
    <div className="p-4 rounded-xl bg-white/2 border border-white/8 space-y-3">
      <div className="flex items-start gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
          <input {...register(`${base}.planLabel`)} placeholder="Card title" className={inputCls} />
          <input {...register(`${base}.badge`)} placeholder="Badge e.g. 20% off (blank to hide)" className={inputCls} />
        </div>
        <RowControls
          canMoveUp={canMoveUp} canMoveDown={canMoveDown}
          onMoveUp={() => move(index, index - 1)} onMoveDown={() => move(index, index + 1)}
          onRemove={() => remove(index)} removeLabel="Remove whole card"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input {...register(`${base}.was`)} placeholder="Struck-through price (blank to hide)" className={inputCls} />
        <input {...register(`${base}.now`)} placeholder="Current price" className={inputCls} />
        <input {...register(`${base}.per`)} placeholder="Unit e.g. one-time" className={inputCls} />
      </div>
      <textarea {...register(`${base}.bulletsText`)} rows={5} placeholder="One bullet per line" className={taCls} />
      <textarea {...register(`${base}.note`)} rows={2} placeholder="Optional note (leave blank to hide)" className={taCls} />
    </div>
  )
}

function OneTimeEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'onetime.cards' })

  return (
    <SectionCard icon={Package} title="One-time setup" subtitle="Website/GMB, WhatsApp automation — add, remove or reorder whole cards.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Eyebrow tag"><input {...register('onetime.tag')} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Heading"><input {...register('onetime.heading')} className={inputCls} /></Field>
        </div>
        <div className="md:col-span-3">
          <Field label="Intro line"><input {...register('onetime.lede')} className={inputCls} /></Field>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-white/5">
        {fields.map((f, i) => (
          <OneTimeCardEditor
            key={f.id} index={i} remove={remove} move={move}
            canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ planLabel: '', was: '', now: '', per: 'one-time', badge: '', bulletsText: '', note: '' })}
        className="btn-primary text-xs"
      >
        <Plus size={14} /> Add card
      </button>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Add-ons
// ─────────────────────────────────────────────────────────────

function AddonsEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'addons.items' })

  return (
    <SectionCard icon={PlusCircle} title="Add-ons" subtitle="Billed-at-cost line items grid.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Eyebrow tag"><input {...register('addons.tag')} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Heading"><input {...register('addons.heading')} className={inputCls} /></Field>
        </div>
        <div className="md:col-span-3">
          <Field label="Intro line"><input {...register('addons.lede')} className={inputCls} /></Field>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 p-3 rounded-xl bg-white/3 border border-white/5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
              <input {...register(`addons.items.${i}.name`)} placeholder="Item name" className={inputCls} />
              <input {...register(`addons.items.${i}.value`)} placeholder="Value e.g. ₹5,000 or At cost" className={inputCls} />
              <input {...register(`addons.items.${i}.sub`)} placeholder="Sub-label e.g. per day" className={inputCls} />
            </div>
            <RowControls
              canMoveUp={i > 0} canMoveDown={i < fields.length - 1}
              onMoveUp={() => move(i, i - 1)} onMoveDown={() => move(i, i + 1)}
              onRemove={() => remove(i)}
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => append({ name: '', value: '', sub: '' })} className="btn-secondary text-xs">
        <Plus size={14} /> Add item
      </button>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Terms & Footer
// ─────────────────────────────────────────────────────────────

function TermsFooterEditor() {
  const { register } = useFormContext()
  return (
    <SectionCard icon={FileText} title="Terms & footer" subtitle="Terms list at the bottom of the page, plus the footer line and date.">
      <Field label="Eyebrow tag"><input {...register('terms.tag')} className={inputCls} /></Field>
      <Field label="Terms" hint="One term per line. Wrap words in **double asterisks** to bold them, e.g. All prices are exclusive of **18% GST**.">
        <textarea {...register('terms.itemsText')} rows={7} className={taCls} />
      </Field>

      <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Field label="Footer line"><input {...register('footer.line1')} className={inputCls} /></Field>
        </div>
        <Field label="Valid-as-on prefix" hint='e.g. "Valid as on"'><input {...register('footer.validPrefix')} className={inputCls} /></Field>
        <div className="md:col-span-3">
          <Field label="Valid-as-on date"><input {...register('footer.validDate')} className={inputCls} /></Field>
        </div>
      </div>
    </SectionCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────

const TABS = [
  { id: 'header', label: 'Header' },
  { id: 'track1', label: 'Track 1' },
  { id: 'track2', label: 'Track 2' },
  { id: 'bundle', label: 'Bundle' },
  { id: 'onetime', label: 'One-time setup' },
  { id: 'addons', label: 'Add-ons' },
  { id: 'terms', label: 'Terms & footer' },
]

export default function AdminTflyPricing() {
  const qc = useQueryClient()
  const [tab, setTab] = useState('header')

  const { data: content, isLoading } = useQuery({
    queryKey: ['admin-pricing-content'],
    queryFn: () => adminAPI.getPricing(),
    select: res => res.data.content,
  })

  const formValues = useMemo(() => toFormValues(content), [content])

  const methods = useForm({ values: formValues })
  const { handleSubmit, formState: { isDirty } } = methods

  const save = useMutation({
    mutationFn: (data) => adminAPI.updatePricing(fromFormValues(data)),
    onSuccess: (res) => {
      qc.setQueryData(['admin-pricing-content'], res)
      toast.success('Pricing page updated')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error saving changes')
  })

  const reset = useMutation({
    mutationFn: () => adminAPI.resetPricing(),
    onSuccess: (res) => {
      qc.setQueryData(['admin-pricing-content'], res)
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Tofly Pricing page</h1>
            <p className="text-white/40 text-sm">
              Everything on{' '}
              <a href="/tofly-pricing" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 inline-flex items-center gap-1">
                /tofly-pricing <ExternalLink size={12} />
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
        <div className={tab === 'header' ? '' : 'hidden'}><HeaderEditor /></div>
        <div className={tab === 'track1' ? '' : 'hidden'}><Track1Editor /></div>
        <div className={tab === 'track2' ? '' : 'hidden'}><Track2Editor /></div>
        <div className={tab === 'bundle' ? '' : 'hidden'}><BundleEditor /></div>
        <div className={tab === 'onetime' ? '' : 'hidden'}><OneTimeEditor /></div>
        <div className={tab === 'addons' ? '' : 'hidden'}><AddonsEditor /></div>
        <div className={tab === 'terms' ? '' : 'hidden'}><TermsFooterEditor /></div>
      </form>
    </FormProvider>
  )
}