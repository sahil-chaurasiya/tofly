import { useQuery } from '@tanstack/react-query'
import { publicAPI } from '../utils/api'
import TFLY_PRICING_DEFAULTS from '../data/tflyPricingDefaults'

// ─── Standalone page: converted 1:1 from the provided tofly-pricing.html ───
// All CSS below is copied verbatim from the source file (only the font
// <link> tags were replaced with an equivalent @import) and scoped under
// .tfprice-root so it cannot leak into / clash with any other page's styles.
// Every piece of copy/pricing below is now fetched from the admin-editable
// content API (Admin → Tofly Pricing) — nothing on this page is hardcoded.
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap');


  .tfprice-root{
    color-scheme: dark;
    --ink:#0C1420; --ink-2:#121D2E; --ink-3:#1A2942;
    --line:#2A3C58; --light:#E7EBF2; --muted:#95A5BF;
    --brass:#C9883A; --brass-soft:#E0A85C; --survey:#5FA8A6; --ok:#7BAE7F;
    --f:"Archivo","Helvetica Neue",Arial,sans-serif;
    --pad:clamp(20px,5vw,64px); --maxw:1080px;
    box-sizing:border-box; padding-top:env(safe-area-inset-top,0px); padding-bottom:env(safe-area-inset-bottom,0px);
  }
  .tfprice-root *, .tfprice-root *::before, .tfprice-root *::after{box-sizing:border-box}
  .tfprice-root{scroll-padding-top:env(safe-area-inset-top,0px)}
  .tfprice-root{margin:0;background:var(--ink);color:var(--light);font-family:var(--f);font-variation-settings:"wdth" 100;font-size:16.5px;line-height:1.6;-webkit-font-smoothing:antialiased}
  .tfprice-root h1, .tfprice-root h2, .tfprice-root h3{margin:0;font-weight:700;line-height:1.08;letter-spacing:-0.02em;font-variation-settings:"wdth" 116}
  .tfprice-root h1{font-size:clamp(2rem,5.6vw,3.4rem)}
  .tfprice-root h2{font-size:clamp(1.4rem,3vw,1.9rem)}
  .tfprice-root h3{font-size:1.15rem;font-variation-settings:"wdth" 106}
  .tfprice-root p{margin:0}
  .tfprice-root .wrap{max-width:var(--maxw);margin:0 auto;padding:0 var(--pad)}

  .tfprice-root header.top{padding:clamp(40px,7vw,68px) 0 clamp(28px,5vw,44px);border-bottom:1px solid var(--line)}
  .tfprice-root .brandline{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:22px}
  .tfprice-root .logo{font-size:1rem;font-weight:800;letter-spacing:-0.01em}
  .tfprice-root .sep{width:22px;height:1px;background:var(--line)}
  .tfprice-root .loc{font-size:12.5px;color:var(--muted)}
  .tfprice-root header.top .sub{margin-top:14px;color:var(--muted);max-width:56ch;font-size:.98rem}
  .tfprice-root .validity{
    display:inline-flex;align-items:center;gap:8px;margin-top:20px;padding:8px 14px;
    border:1px solid var(--line);border-radius:2px;font-size:12.5px;color:var(--brass-soft)
  }
  .tfprice-root .validity::before{content:"●";color:var(--brass);font-size:8px}

  .tfprice-root section{padding:clamp(40px,6vw,64px) 0;border-top:1px solid var(--line)}

  .tfprice-root .track-head{display:flex;align-items:baseline;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:22px}
  .tfprice-root .track-head .tag{font-size:11.5px;color:var(--brass);border:1px solid var(--line);border-radius:2px;padding:3px 9px}
  .tfprice-root .lede{color:var(--muted);font-size:.95rem;max-width:62ch;margin-top:10px}

  .tfprice-root .cardgrid{display:grid;grid-template-columns:1fr;gap:16px;margin-top:26px}
  @media(min-width:760px){.tfprice-root .cardgrid{grid-template-columns:1fr 1fr}}
  .tfprice-root .card{border:1px solid var(--line);background:var(--ink-2);padding:24px 22px;border-radius:2px;position:relative}
  .tfprice-root .card.hi{border-color:var(--brass);background:linear-gradient(180deg,rgba(201,136,58,.08),var(--ink-2) 40%)}
  .tfprice-root .card .plan{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;font-variation-settings:"wdth" 86}
  .tfprice-root .badge{display:inline-block;margin-left:8px;background:rgba(123,174,127,.15);color:var(--ok);font-size:11px;padding:2px 8px;border-radius:20px;font-variation-settings:"wdth" 86}
  .tfprice-root .pricebox{margin-top:12px;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
  .tfprice-root .was{color:#6C7E9B;text-decoration:line-through;font-size:.92rem}
  .tfprice-root .now{font-size:clamp(1.5rem,3.4vw,2rem);font-weight:800;letter-spacing:-0.02em}
  .tfprice-root .per{color:var(--muted);font-size:.85rem}
  .tfprice-root .eff{color:var(--muted);font-size:.83rem;margin-top:6px}

  .tfprice-root table.rate{width:100%;border-collapse:collapse;margin-top:22px;font-size:.92rem}
  .tfprice-root table.rate th, .tfprice-root table.rate td{padding:11px 12px;border:1px solid var(--line);text-align:left}
  .tfprice-root table.rate th{background:var(--ink-3);color:var(--muted);font-weight:600;font-size:.82rem;text-transform:uppercase;letter-spacing:.03em}
  .tfprice-root table.rate td.was{white-space:nowrap}
  .tfprice-root table.rate td.now{font-weight:700;color:var(--light);white-space:nowrap}
  .tfprice-root .scrollx{overflow-x:auto}

  .tfprice-root ul.dl{list-style:none;margin:18px 0 0;padding:0}
  .tfprice-root ul.dl li{padding:8px 0 8px 18px;position:relative;font-size:.9rem;color:#C6D0E0;border-top:1px solid var(--line)}
  .tfprice-root ul.dl li:first-child{border-top:0}
  .tfprice-root ul.dl li::before{content:"▸";position:absolute;left:0;color:var(--brass)}

  .tfprice-root .teamline{margin-top:16px;padding-top:14px;border-top:1px dashed var(--line);font-size:.85rem;color:var(--muted)}
  .tfprice-root .teamline strong{color:var(--light);font-weight:650}

  .tfprice-root .bundle-wrap{margin-top:26px}
  .tfprice-root .bundle{border:1px solid var(--brass);background:linear-gradient(180deg,rgba(201,136,58,.10),var(--ink-2) 55%);padding:clamp(24px,4vw,34px);border-radius:2px}
  .tfprice-root .bundle .top{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap}
  .tfprice-root .bundle h3{font-size:1.35rem}
  .tfprice-root .bundle .recommend{font-size:11px;color:#12100C;background:var(--brass-soft);padding:4px 10px;border-radius:20px;font-variation-settings:"wdth" 88}
  .tfprice-root .bundlegrid{display:grid;grid-template-columns:1fr;gap:16px;margin-top:22px}
  @media(min-width:640px){.tfprice-root .bundlegrid{grid-template-columns:1fr 1fr}}
  .tfprice-root .bundlegrid .bp{border:1px solid var(--line);background:rgba(12,20,32,.5);padding:18px}
  .tfprice-root .savenote{margin-top:16px;font-size:.85rem;color:var(--survey)}

  .tfprice-root .note{margin-top:18px;padding:12px 15px;border-left:2px solid var(--survey);background:rgba(95,168,166,.07);font-size:.85rem;color:#B6C6D6;max-width:64ch}

  .tfprice-root .addon-grid{display:grid;grid-template-columns:1fr;gap:1px;background:var(--line);border:1px solid var(--line);margin-top:24px}
  @media(min-width:700px){.tfprice-root .addon-grid{grid-template-columns:1fr 1fr}}
  .tfprice-root .addon-grid > div{background:var(--ink-2);padding:16px 18px;display:flex;justify-content:space-between;gap:14px;align-items:baseline}
  .tfprice-root .addon-grid .an{font-size:.92rem}
  .tfprice-root .addon-grid .av{font-weight:700;white-space:nowrap;font-size:.92rem}
  .tfprice-root .addon-grid .av small{color:var(--muted);font-weight:400;font-size:.78rem;display:block;margin-top:2px}

  .tfprice-root .termslist{list-style:none;margin:18px 0 0;padding:0;font-size:.86rem;color:var(--muted)}
  .tfprice-root .termslist li{padding:9px 0;border-top:1px solid var(--line)}
  .tfprice-root .termslist li:last-child{border-bottom:1px solid var(--line)}
  .tfprice-root .termslist b{color:var(--light)}

  .tfprice-root footer{padding:30px 0 44px;color:#6C7E9B;font-size:12px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}

`

// Renders "some **bold** text" with the **...** segments wrapped in <b>,
// so admins can highlight key phrases (e.g. "**18% GST**") from a plain
// textarea in the admin panel without needing raw HTML.
function Bold({ text }) {
  const parts = String(text || '').split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <b key={i}>{part.slice(2, -2)}</b>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

// A single price card used across Track 1, Track 2 and the Bundle section.
function PlanCard({ plan }) {
  if (!plan) return null
  return (
    <div className={plan.highlight ? 'card hi' : 'card'}>
      <div className="plan">{plan.planLabel}</div>
      <div className="pricebox">
        {plan.was && <span className="was">{plan.was}</span>}
        <span className="now">{plan.now}</span>
        {plan.per && <span className="per">{plan.per}</span>}
      </div>
      {plan.effective && <div className="eff">{plan.effective}</div>}
      {plan.badge && <span className="badge">{plan.badge}</span>}
    </div>
  )
}

export default function TflyPricingPage() {
  // Every piece of copy/pricing on this page is fetched from the
  // admin-editable content API. While it loads (or if it's ever
  // unreachable) we fall back to TFLY_PRICING_DEFAULTS so the page
  // always renders something sensible.
  const { data } = useQuery({
    queryKey: ['tofly-pricing-content'],
    queryFn: () => publicAPI.getPricing(),
    select: (res) => res.data.content,
  })

  const c = data || TFLY_PRICING_DEFAULTS

  const t1 = c.track1 || {}
  const t2 = c.track2 || {}
  const rateHeaders = t2.rateTableHeaders || {}
  const bundle = c.bundle || {}
  const onetime = c.onetime || {}
  const addons = c.addons || {}
  const terms = c.terms || {}
  const footer = c.footer || {}

  return (
    <div className="tfprice-root">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="wrap">

        <header className="top">
          <div className="brandline">
            <span className="logo">{c.brand?.logoText}</span><span className="sep"></span><span className="loc">{c.brand?.locationText}</span>
          </div>
          <h1>{c.header?.title}</h1>
          <p className="sub">{c.header?.subtitle}</p>
          {c.header?.validityText && <div className="validity">{c.header.validityText}</div>}
        </header>

        {/* TRACK 1 */}
        <section>
          <div className="track-head">
            <div><span className="tag">{t1.tag}</span></div>
          </div>
          <h2>{t1.heading}</h2>
          {t1.lede && <p className="lede">{t1.lede}</p>}

          <div className="cardgrid">
            {(t1.plans || []).map((plan, i) => <PlanCard plan={plan} key={i} />)}
          </div>

          <ul className="dl">
            {(t1.bullets || []).map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          {t1.teamValue && (
            <div className="teamline"><strong>{t1.teamLabel}</strong> {t1.teamValue}</div>
          )}
          {t1.note && <div className="note">{t1.note}</div>}
        </section>

        {/* TRACK 2 */}
        <section>
          <div className="track-head">
            <div><span className="tag">{t2.tag}</span></div>
          </div>
          <h2>{t2.heading}</h2>
          {t2.lede && <p className="lede">{t2.lede}</p>}

          <div className="scrollx">
            <table className="rate">
              <thead>
                <tr>
                  <th>{rateHeaders.budget}</th>
                  <th>{rateHeaders.regularFee}</th>
                  <th>{rateHeaders.offerFee}</th>
                  <th>{rateHeaders.billing}</th>
                </tr>
              </thead>
              <tbody>
                {(t2.rateRows || []).map((row, i) => (
                  <tr key={i}>
                    <td>{row.budget}</td>
                    <td className="was">{row.regularFee}</td>
                    <td className="now">{row.offerFee}</td>
                    <td>{row.billing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cardgrid" style={{marginTop: '22px'}}>
            {(t2.plans || []).map((plan, i) => <PlanCard plan={plan} key={i} />)}
          </div>

          <ul className="dl">
            {(t2.bullets || []).map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          {t2.teamValue && (
            <div className="teamline"><strong>{t2.teamLabel}</strong> {t2.teamValue}</div>
          )}
          {t2.note && <div className="note">{t2.note}</div>}
        </section>

        {/* BUNDLE */}
        <section>
          <div className="track-head"><span className="tag">{bundle.tag}</span></div>
          <div className="bundle-wrap">
            <div className="bundle">
              <div className="top">
                <div>
                  <h3>{bundle.heading}</h3>
                  {bundle.lede && <p className="lede" style={{marginTop: '8px'}}>{bundle.lede}</p>}
                </div>
                {bundle.recommendBadge && <span className="recommend">{bundle.recommendBadge}</span>}
              </div>

              <div className="bundlegrid">
                {(bundle.plans || []).map((plan, i) => (
                  <div className="bp" key={i}>
                    <div className="plan">{plan.planLabel}</div>
                    <div className="pricebox">
                      {plan.was && <span className="was">{plan.was}</span>}
                      <span className="now">{plan.now}</span>
                      {plan.per && <span className="per">{plan.per}</span>}
                    </div>
                    {plan.effective && <div className="eff">{plan.effective}</div>}
                    {plan.badge && <span className="badge">{plan.badge}</span>}
                  </div>
                ))}
              </div>
              {bundle.savenote && <p className="savenote">{bundle.savenote}</p>}
            </div>
          </div>
        </section>

        {/* ONE-TIME */}
        <section>
          <div className="track-head"><span className="tag">{onetime.tag}</span></div>
          <h2>{onetime.heading}</h2>
          {onetime.lede && <p className="lede">{onetime.lede}</p>}

          <div className="cardgrid" style={{marginTop: '26px'}}>
            {(onetime.cards || []).map((card, i) => (
              <div className="card" key={i}>
                <div className="plan">{card.planLabel}</div>
                <div className="pricebox">
                  {card.was && <span className="was">{card.was}</span>}
                  <span className="now">{card.now}</span>
                  {card.per && <span className="per">{card.per}</span>}
                </div>
                {card.badge && <span className="badge">{card.badge}</span>}
                <ul className="dl">
                  {(card.bullets || []).map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
                {card.note && <div className="note">{card.note}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ADD-ONS */}
        <section>
          <div className="track-head"><span className="tag">{addons.tag}</span></div>
          <h2>{addons.heading}</h2>
          {addons.lede && <p className="lede">{addons.lede}</p>}

          <div className="addon-grid">
            {(addons.items || []).map((item, i) => (
              <div key={i}>
                <span className="an">{item.name}</span>
                <span className="av">{item.value}<small>{item.sub}</small></span>
              </div>
            ))}
          </div>
        </section>

        {/* TERMS */}
        <section>
          <div className="track-head"><span className="tag">{terms.tag}</span></div>
          <ul className="termslist">
            {(terms.items || []).map((item, i) => (
              <li key={i}><Bold text={item} /></li>
            ))}
          </ul>
        </section>

        <footer>
          <span>{footer.line1}</span>
          <span>{footer.validPrefix} <span style={{color: 'var(--brass-soft)'}}>{footer.validDate}</span></span>
        </footer>

      </div>

    </div>
  )
}