// ─── Standalone page: converted 1:1 from the provided tofly-pricing.html ───
// All CSS below is copied verbatim from the source file (only the font
// <link> tags were replaced with an equivalent @import) and scoped under
// .tfprice-root so it cannot leak into / clash with any other page's styles.
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

export default function TflyPricingPage() {
  return (
    <div className="tfprice-root">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="wrap">

        <header className="top">
          <div className="brandline">
            <span className="logo">To Fly Media</span><span className="sep"></span><span className="loc">Bhopal, Madhya Pradesh</span>
          </div>
          <h1>Pricing &amp; Packages</h1>
          <p className="sub">Pick the track that matches what you actually need — content, performance marketing, or both. Pay quarterly and lock in our deepest discount.</p>
          <div className="validity">Offer prices valid for agreements signed within 15 days of this quote</div>
        </header>

        {/* TRACK 1 */}
        <section>
          <div className="track-head">
            <div><span className="tag">Track 1</span></div>
          </div>
          <h2>Content &amp; Social Media Management</h2>
          <p className="lede">Full content engine across every active platform — shot, scripted, posted and engaged with, daily.</p>

          <div className="cardgrid">
            <div className="card">
              <div className="plan">Monthly plan</div>
              <div className="pricebox"><span className="was">₹25,000</span><span className="now">₹20,000</span><span className="per">/month</span></div>
              <span className="badge">20% off</span>
            </div>
            <div className="card hi">
              <div className="plan">3-month plan · pay upfront</div>
              <div className="pricebox"><span className="was">₹75,000</span><span className="now">₹50,000</span><span className="per">total</span></div>
              <div className="eff">Effective ₹16,667/month</div>
              <span className="badge">33% off</span>
            </div>
          </div>

          <ul className="dl">
            <li>12–15 reels/posts per month, plus daily status updates</li>
            <li>Monthly content planning, scripting and posting across all active platforms</li>
            <li>Engagement management — likes, comments, DM and review replies</li>
            <li>Real site posts, testimonials, AI-generated videos and graphics</li>
            <li>Minimum 200–300 new followers/engagement growth targeted per month</li>
            <li>Brand and page collaborations for added visibility and credibility</li>
            <li>Google Business Profile comment and review handling</li>
          </ul>
          <div className="teamline"><strong>Team included:</strong> Dedicated Social Media Manager, Editor / Graphic Designer</div>
          <div className="note">Excludes shoot days, influencer fees and printed materials — billed separately at actual cost (see Add-ons below).</div>
        </section>

        {/* TRACK 2 */}
        <section>
          <div className="track-head"><span className="tag">Track 2</span></div>
          <h2>Performance Marketing</h2>
          <p className="lede">Ad creative, testing, targeting and a full lead management system — built to lower cost per site visit, not just cost per lead.</p>

          <div className="scrollx">
            <table className="rate">
              <thead><tr><th>Monthly ad budget</th><th>Regular fee</th><th>Offer fee</th><th>Billing</th></tr></thead>
              <tbody>
                <tr><td>Up to ₹50,000</td><td className="was">₹20,000/mo</td><td className="now">₹15,000/mo</td><td>Flat monthly</td></tr>
                <tr><td>Above ₹50,000</td><td className="was">38% of spend</td><td className="now">30% of spend</td><td>% of ad budget</td></tr>
              </tbody>
            </table>
          </div>

          <div className="cardgrid" style={{marginTop: '22px'}}>
            <div className="card">
              <div className="plan">3-month plan · budget ≤ ₹50k</div>
              <div className="pricebox"><span className="was">₹60,000</span><span className="now">₹40,000</span><span className="per">total</span></div>
              <div className="eff">Effective ₹13,333/month</div>
              <span className="badge">33% off</span>
            </div>
            <div className="card hi">
              <div className="plan">3-month plan · budget &gt; ₹50k</div>
              <div className="pricebox"><span className="was">38%</span><span className="now">25%</span><span className="per">of ad spend</span></div>
              <div className="eff">Locked in for the full quarter</div>
              <span className="badge">34% off</span>
            </div>
          </div>

          <ul className="dl">
            <li>Engaging ad creatives, tested in multiple variants (A/B and A/B/n)</li>
            <li>Continuous lead-quality improvement, not just lower cost per lead</li>
            <li>Full Lead Management System — every lead tracked from new to converted</li>
            <li>Follow-up tracking and lead-quality monitoring with your sales team</li>
            <li>Sales script standardisation support for your calling team</li>
            <li>Manager dashboard — real-time status of every lead and site visit</li>
            <li>Weekly reports on ad spend and lead quality; regular creative and campaign testing</li>
            <li>Your leads stay exclusive to you and confidential — always</li>
            <li>We do not work with a direct competitor on the same project or micro-market</li>
          </ul>
          <div className="teamline"><strong>Team included:</strong> Dedicated Ad Manager &nbsp;·&nbsp; Sales Lead Coordinator available as an add-on</div>
          <div className="note">Ad spend itself is paid directly to Meta/Google by you (or reimbursed at actual) — this fee covers management only.</div>
        </section>

        {/* BUNDLE */}
        <section>
          <div className="track-head"><span className="tag">Best value</span></div>
          <div className="bundle-wrap">
            <div className="bundle">
              <div className="top">
                <div>
                  <h3>Growth Bundle — Content + Performance</h3>
                  <p className="lede" style={{marginTop: '8px'}}>Both tracks under one retainer, one point of contact, one unified report. Recommended for developers and studios running always-on marketing. (Ad budget up to ₹50,000/month; higher budgets add the % fee from Track 2 above.)</p>
                </div>
                <span className="recommend">Recommended</span>
              </div>

              <div className="bundlegrid">
                <div className="bp">
                  <div className="plan">Monthly</div>
                  <div className="pricebox"><span className="was">₹50,000</span><span className="now">₹38,000</span><span className="per">/month</span></div>
                  <span className="badge">24% off</span>
                </div>
                <div className="bp">
                  <div className="plan">3-month plan · pay upfront</div>
                  <div className="pricebox"><span className="was">₹1,50,000</span><span className="now">₹1,00,000</span><span className="per">total</span></div>
                  <div className="eff">Effective ₹33,333/month</div>
                  <span className="badge">33% off</span>
                </div>
              </div>
              <p className="savenote">Includes everything in Track 1 and Track 2 — one dedicated account team, no coordination gap between content and ads.</p>
            </div>
          </div>
        </section>

        {/* ONE-TIME */}
        <section>
          <div className="track-head"><span className="tag">One-time setup</span></div>
          <h2>Website, GMB &amp; Automation</h2>
          <p className="lede">Built once, owned by you. Not a monthly retainer.</p>

          <div className="cardgrid" style={{marginTop: '26px'}}>
            <div className="card">
              <div className="plan">Website + Landing Page + GMB setup</div>
              <div className="pricebox"><span className="was">₹25,000</span><span className="now">₹20,000</span><span className="per">one-time</span></div>
              <span className="badge">20% off</span>
              <ul className="dl">
                <li>Custom-built on Next.js + MongoDB — not WordPress or a template</li>
                <li>Dynamic 4–5 page website with admin panel for self-editing content</li>
                <li>Dedicated landing page for your sales funnel</li>
                <li>Domain + hosting included for 1 year</li>
                <li>Full source code handed over for future development</li>
                <li>1 month of free changes and support after launch</li>
                <li>Google Business Profile setup and optimisation</li>
              </ul>
              <div className="note">Website SEO is scoped and quoted separately after a free audit of your keywords and competition.</div>
            </div>

            <div className="card">
              <div className="plan">WhatsApp Business + Automation setup</div>
              <div className="pricebox"><span className="was">₹10,000</span><span className="now">₹8,000</span><span className="per">one-time</span></div>
              <span className="badge">20% off</span>
              <ul className="dl">
                <li>WhatsApp Business API setup and green-tick application</li>
                <li>Instant auto-reply with brochure, price list and location</li>
                <li>Drip follow-up flows and site-visit reminders</li>
                <li>Shared team inbox — no chat stuck on one phone</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ADD-ONS */}
        <section>
          <div className="track-head"><span className="tag">Add-ons</span></div>
          <h2>Billed at actual cost — zero markup</h2>
          <p className="lede">Invoice shared for every one of these. You only pay what it actually costs.</p>

          <div className="addon-grid">
            <div><span className="an">Professional camera + drone shoot day</span><span className="av">₹5,000<small>per day</small></span></div>
            <div><span className="an">iPhone-native content shoot day</span><span className="av">₹3,000<small>per day</small></span></div>
            <div><span className="an">Influencers / models</span><span className="av">At cost<small>invoice shared</small></span></div>
            <div><span className="an">Standees, brochures &amp; printed collateral</span><span className="av">At cost<small>invoice shared</small></span></div>
          </div>
        </section>

        {/* TERMS */}
        <section>
          <div className="track-head"><span className="tag">Terms</span></div>
          <ul className="termslist">
            <li>All prices are exclusive of <b>18% GST</b>.</li>
            <li>Offer prices are valid for agreements signed within <b>15 days</b> of this quote; regular pricing applies after.</li>
            <li>3-month plans require <b>100% payment in advance</b>; monthly plans require the current month in advance.</li>
            <li>Ad spend (where applicable) is separate from the management fee and paid directly to the platform.</li>
            <li>Scope not listed above — additional shoot days, extra platforms, paid influencer campaigns — is quoted separately before starting.</li>
          </ul>
        </section>

        <footer>
          <span>To Fly Media — growth partner for real estate, interiors and construction.</span>
          <span>Valid as on <span style={{color: 'var(--brass-soft)'}}>20 September 2026</span></span>
        </footer>

      </div>

    </div>
  )
}