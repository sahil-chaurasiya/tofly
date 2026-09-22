import { useEffect } from 'react'

// ─── Standalone page: converted 1:1 from the provided tofly-portfolio.html ───
// All CSS below is copied verbatim from the source file (only the font
// <link> tags were replaced with an equivalent @import) and scoped under
// .tfport-root so it cannot leak into / clash with any other page's styles.
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap');


  .tfport-root{
    color-scheme: dark;
    --ink:#0C1420;
    --ink-2:#121D2E;
    --ink-3:#1A2942;
    --line:#2A3C58;
    --light:#E7EBF2;
    --muted:#95A5BF;
    --brass:#C9883A;
    --brass-soft:#E0A85C;
    --survey:#5FA8A6;

    --f: "Archivo", "Helvetica Neue", Arial, sans-serif;

    --rail: 84px;
    --pad: clamp(20px, 5vw, 64px);
    --maxw: 1180px;

    box-sizing:border-box;
    padding-top: env(safe-area-inset-top, 0px);
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
  .tfport-root *, .tfport-root *::before, .tfport-root *::after{box-sizing:border-box}
  .tfport-root{scroll-behavior:smooth; scroll-padding-top: calc(env(safe-area-inset-top, 0px) + 24px);}
  .tfport-root{
    margin:0; background:var(--ink); color:var(--light);
    font-family:var(--f); font-variation-settings:"wdth" 100;
    font-size:17px; line-height:1.62; -webkit-font-smoothing:antialiased;
  }
  @media (prefers-reduced-motion: reduce){.tfport-root *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}

  .tfport-root a{color:inherit}
  .tfport-root h1, .tfport-root h2, .tfport-root h3{margin:0; font-weight:700; line-height:1.05; letter-spacing:-0.02em; font-variation-settings:"wdth" 118;}
  .tfport-root h1{font-size:clamp(2.3rem,6.4vw,4.6rem)}
  .tfport-root h2{font-size:clamp(1.7rem,3.8vw,2.9rem); letter-spacing:-0.025em}
  .tfport-root h3{font-size:clamp(1.12rem,1.9vw,1.42rem); letter-spacing:-0.012em; font-variation-settings:"wdth" 108;}
  .tfport-root p{margin:0}

  
  .tfport-root .rail{
    position:fixed; left:0; top:0; bottom:0; width:var(--rail);
    border-right:1px solid var(--line); background:var(--ink);
    display:none; flex-direction:column; justify-content:center; gap:26px;
    padding:0 0 0 14px; z-index:40;
  }
  @media (min-width:1080px){ .tfport-root .rail{display:flex} .tfport-root{padding-left:var(--rail)} }
  .tfport-root .rail a{
    display:block; text-decoration:none; color:var(--muted);
    font-size:10.5px; letter-spacing:0.02em; font-variation-settings:"wdth" 86;
    padding:3px 0; border-left:2px solid transparent; padding-left:9px; margin-left:-11px;
    transition:color .18s, border-color .18s;
  }
  .tfport-root .rail a:hover, .tfport-root .rail a:focus-visible{color:var(--brass-soft); border-left-color:var(--brass)}
  .tfport-root .rail .mark{font-size:9px; color:#5A7093; display:block; margin-bottom:1px}

  .tfport-root .wrap{max-width:var(--maxw); margin:0 auto; padding-left:var(--pad); padding-right:var(--pad)}
  .tfport-root section{padding:clamp(54px,8vw,104px) 0; border-top:1px solid var(--line)}
  .tfport-root section:first-of-type{border-top:0}

  .tfport-root .sechead{display:flex; align-items:baseline; gap:16px; flex-wrap:wrap; margin-bottom:clamp(26px,4vw,46px)}
  .tfport-root .sechead .lvl{
    font-size:12px; color:var(--brass); font-variation-settings:"wdth" 84;
    border:1px solid var(--line); border-radius:2px; padding:3px 8px; white-space:nowrap;
  }
  .tfport-root .lede{max-width:62ch; color:var(--muted); font-size:clamp(1rem,1.5vw,1.12rem); margin-top:14px}

  
  .tfport-root .hero{
    position:relative; padding-top:clamp(56px,9vw,96px); padding-bottom:clamp(40px,6vw,72px);
    overflow:hidden;
  }
  .tfport-root .hero::before{
    content:""; position:absolute; inset:0; pointer-events:none;
    background:
      linear-gradient(180deg, rgba(201,136,58,.10), transparent 46%),
      repeating-linear-gradient(90deg, transparent 0 62px, rgba(42,60,88,.42) 62px 63px);
    mask-image:linear-gradient(180deg,#000,transparent 82%);
    -webkit-mask-image:linear-gradient(180deg,#000,transparent 82%);
  }
  .tfport-root .hero > *{position:relative}
  .tfport-root .brandline{display:flex; align-items:center; gap:13px; margin-bottom:clamp(34px,6vw,58px); flex-wrap:wrap}
  .tfport-root .logo{
    font-size:1.06rem; font-weight:800; letter-spacing:-0.015em; font-variation-settings:"wdth" 120;
  }
  .tfport-root .brandline .sep{width:26px; height:1px; background:var(--line)}
  .tfport-root .brandline .loc{font-size:13px; color:var(--muted); font-variation-settings:"wdth" 88}

  .tfport-root .hero h1{max-width:16ch}
  .tfport-root .hero .sub{margin-top:24px; max-width:56ch; font-size:clamp(1.02rem,1.8vw,1.22rem); color:#BDC8DA}
  .tfport-root .heroCta{display:flex; gap:12px; flex-wrap:wrap; margin-top:34px}
  .tfport-root .btn{
    display:inline-block; text-decoration:none; padding:13px 22px; border-radius:2px;
    font-size:.94rem; font-weight:600; letter-spacing:.005em;
    border:1px solid var(--brass); background:var(--brass); color:#12100C;
    transition:background .18s, border-color .18s, color .18s;
  }
  .tfport-root .btn:hover, .tfport-root .btn:focus-visible{background:var(--brass-soft); border-color:var(--brass-soft)}
  .tfport-root .btn.ghost{background:transparent; color:var(--light); border-color:var(--line)}
  .tfport-root .btn.ghost:hover, .tfport-root .btn.ghost:focus-visible{border-color:var(--brass); color:var(--brass-soft)}
  .tfport-root :focus-visible{outline:2px solid var(--brass-soft); outline-offset:3px}

  
  .tfport-root .fill{
    color:var(--brass-soft); border-bottom:1px dashed var(--brass);
    padding-bottom:1px; font-variation-settings:"wdth" 92;
  }

  
  .tfport-root .creds{display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1px; background:var(--line); border:1px solid var(--line); margin-top:clamp(40px,6vw,66px)}
  .tfport-root .creds > div{background:var(--ink); padding:22px 20px}
  .tfport-root .creds .n{font-size:clamp(1.6rem,3vw,2.15rem); font-weight:800; letter-spacing:-0.03em; font-variation-settings:"wdth" 116; color:var(--light); display:block; line-height:1}
  .tfport-root .creds .l{font-size:12.5px; color:var(--muted); margin-top:9px; display:block; line-height:1.45}

  
  .tfport-root .twocol{display:grid; grid-template-columns:1fr; gap:clamp(28px,4vw,56px)}
  @media (min-width:900px){ .tfport-root .twocol{grid-template-columns:1.05fr .95fr} }
  .tfport-root .edgelist{list-style:none; margin:0; padding:0}
  .tfport-root .edgelist li{padding:15px 0 15px 0; border-top:1px solid var(--line); display:grid; grid-template-columns:auto 1fr; gap:14px; align-items:start}
  .tfport-root .edgelist li:last-child{border-bottom:1px solid var(--line)}
  .tfport-root .edgelist .k{width:7px; height:7px; margin-top:9px; background:var(--brass); border-radius:50%}
  .tfport-root .edgelist strong{display:block; font-weight:650; font-size:1rem; margin-bottom:3px}
  .tfport-root .edgelist span{color:var(--muted); font-size:.93rem; line-height:1.55}

  
  .tfport-root .svc{border-top:1px solid var(--line); padding:clamp(28px,4vw,42px) 0; display:grid; grid-template-columns:1fr; gap:22px}
  @media (min-width:900px){ .tfport-root .svc{grid-template-columns:minmax(0,300px) 1fr; gap:clamp(30px,5vw,68px)} }
  .tfport-root .svc:last-of-type{border-bottom:1px solid var(--line)}
  .tfport-root .svc .no{font-size:12px; color:var(--brass); font-variation-settings:"wdth" 84; margin-bottom:11px}
  .tfport-root .svc .desc{color:var(--muted); font-size:.95rem; margin-top:11px; max-width:44ch}
  .tfport-root .grid2{display:grid; grid-template-columns:repeat(auto-fit,minmax(215px,1fr)); gap:11px 26px}
  .tfport-root .grid2 div{display:grid; grid-template-columns:auto 1fr; gap:10px; align-items:start; font-size:.925rem; line-height:1.5}
  .tfport-root .grid2 i{
    font-style:normal; color:var(--brass); font-size:.8rem; margin-top:4px; flex:none;
  }
  .tfport-root .note{
    margin-top:20px; padding:13px 16px; border-left:2px solid var(--survey);
    background:rgba(95,168,166,.07); font-size:.875rem; color:#B6C6D6; max-width:58ch;
  }

  
  .tfport-root .media{display:grid; gap:14px; grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))}
  .tfport-root .slot{
    border:1px dashed var(--line); border-radius:2px; background:var(--ink-2);
    display:flex; flex-direction:column; justify-content:flex-end; padding:16px;
    text-decoration:none; min-height:0; transition:border-color .18s, background .18s;
  }
  .tfport-root .slot:hover, .tfport-root .slot:focus-visible{border-color:var(--brass); background:var(--ink-3)}
  .tfport-root .slot.v{aspect-ratio:9/16}
  .tfport-root .slot.h{aspect-ratio:16/9}
  .tfport-root .slot .tag{font-size:11px; color:var(--brass); font-variation-settings:"wdth" 84; margin-bottom:auto}
  .tfport-root .slot .ti{font-size:.95rem; font-weight:650; margin-top:10px}
  .tfport-root .slot .su{font-size:12.5px; color:var(--muted); margin-top:4px; line-height:1.45}
  .tfport-root .wide{grid-column:1/-1}

  
  .tfport-root .steps{display:grid; gap:0}
  .tfport-root .step{display:grid; grid-template-columns:auto 1fr; gap:18px; padding:20px 0; border-top:1px solid var(--line)}
  .tfport-root .step:last-child{border-bottom:1px solid var(--line)}
  .tfport-root .step .sn{
    font-size:.82rem; color:var(--brass); font-variation-settings:"wdth" 82;
    width:30px; padding-top:3px; flex:none;
  }
  .tfport-root .step p{color:var(--muted); font-size:.93rem; margin-top:5px; max-width:66ch}

  
  .tfport-root .vert{display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,255px),1fr)); gap:1px; background:var(--line); border:1px solid var(--line)}
  .tfport-root .vert > div{background:var(--ink-2); padding:24px 22px}
  .tfport-root .vert h3{margin-bottom:11px}
  .tfport-root .vert p{color:var(--muted); font-size:.91rem}
  .tfport-root .vert ul{margin:13px 0 0; padding-left:17px; color:var(--muted); font-size:.89rem; line-height:1.72}

  
  .tfport-root .cta{background:var(--ink-2); border:1px solid var(--line); padding:clamp(30px,5vw,54px); display:grid; gap:24px}
  @media (min-width:860px){ .tfport-root .cta{grid-template-columns:1.2fr .8fr; align-items:center; gap:48px} }
  .tfport-root .cta h2{max-width:16ch}
  .tfport-root .contactlist{list-style:none; margin:0; padding:0; font-size:.95rem}
  .tfport-root .contactlist li{padding:11px 0; border-top:1px solid var(--line); display:flex; gap:14px; justify-content:space-between; flex-wrap:wrap}
  .tfport-root .contactlist li:last-child{border-bottom:1px solid var(--line)}
  .tfport-root .contactlist .lab{color:var(--muted); font-size:12.5px; font-variation-settings:"wdth" 88}
  .tfport-root .contactlist a{color:var(--brass-soft); text-decoration:none; word-break:break-all}
  .tfport-root .contactlist a:hover{text-decoration:underline}

  .tfport-root footer{padding:32px 0 44px; color:#6C7E9B; font-size:12.5px; border-top:1px solid var(--line)}
  .tfport-root footer .fr{display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap}

  .tfport-root .scrollx{overflow-x:auto}

`

export default function TflyPortfolioPage() {
  // The source page used html{ scroll-behavior:smooth } for the in-page
  // rail nav anchors. We apply that only while this page is mounted, and
  // restore the previous value on unmount so no other page is affected.
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = prev
    }
  }, [])

  return (
    <div className="tfport-root">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />


      <nav className="rail" aria-label="Sections">
        <a href="#who"><span className="mark">+24.0</span>Who we are</a>
        <a href="#content"><span className="mark">+18.0</span>Content</a>
        <a href="#ads"><span className="mark">+13.5</span>Ads</a>
        <a href="#leads"><span className="mark">+09.0</span>Leads</a>
        <a href="#web"><span className="mark">+04.5</span>Web</a>
        <a href="#auto"><span className="mark">+02.0</span>Automation</a>
        <a href="#work"><span className="mark">±00.0</span>Work</a>
        <a href="#talk"><span className="mark">-02.0</span>Talk</a>
      </nav>

      <main className="wrap">

        {/* HERO */}
        <section className="hero">
          <div className="brandline">
            <span className="logo">To Fly Media</span>
            <span className="sep" aria-hidden="true"></span>
            <span className="loc">Bhopal, Madhya Pradesh</span>
          </div>

          <h1>We fill site visits, not just lead forms.</h1>

          <p className="sub">A performance marketing and content studio built for developers, interior studios and construction firms. We handle the drone shoot, the script, the ad account, the follow-up calls and the CRM — so the only number you have to watch is bookings.</p>

          <div className="heroCta">
            <a className="btn" href="#talk">Book a 30-minute call</a>
            <a className="btn ghost" href="#work">See the work</a>
          </div>

          <div className="creds">
            <div><span className="n fill">Since 20––</span><span className="l">Building brands out of Bhopal, serving clients across India.</span></div>
            <div><span className="n fill">––+</span><span className="l">Brands handled across real estate, interiors, retail and services.</span></div>
            <div><span className="n fill">₹––L+</span><span className="l">Ad spend managed on Meta and Google.</span></div>
            <div><span className="n">In-house</span><span className="l">Drone, camera and edit team. No shoot is outsourced and re-sold.</span></div>
          </div>
        </section>

        {/* WHO */}
        <section id="who">
          <div className="sechead"><span className="lvl">+24.0</span><h2>A growth partner, not a posting service</h2></div>

          <div className="twocol">
            <div>
              <p className="lede" style={{marginTop: '0'}}>Most agencies hand a builder a content calendar and a monthly report full of reach and impressions. That is not what sells an apartment. Bookings come from a specific chain: the right person sees a credible piece of content, clicks, gets called within minutes, and actually turns up at the site.</p>
              <p className="lede">We own that entire chain. One team, one point of contact, and one number we are accountable for — qualified site visits at a cost you can live with.</p>
              <div className="note">We work with a limited number of projects per city at a time. Two competing developers in the same micro-market will not both be our clients — your audience, creatives and learnings stay yours.</div>
            </div>

            <ul className="edgelist">
              <li><span className="k" aria-hidden="true"></span><div><strong>Bhopal page network</strong><span>Established working relationships with the city's largest local pages and community accounts, for seeding launches and reaching local buyers organically.</span></div></li>
              <li><span className="k" aria-hidden="true"></span><div><strong>Direct influencer access</strong><span>Direct contact with Bhopal's top creators — no agency middleman, no inflated rates. Property walkthroughs, interior reveals and site tours with faces the city already trusts.</span></div></li>
              <li><span className="k" aria-hidden="true"></span><div><strong>Full production in-house</strong><span>Drone, cinema camera and iPhone-native content under one roof. Construction progress, elevation shots, model flat tours, founder pieces.</span></div></li>
              <li><span className="k" aria-hidden="true"></span><div><strong>Complete visibility</strong><span>Your project shows up where your buyer already is — Instagram, Google Search, Maps, YouTube and WhatsApp — with a consistent story across all of them.</span></div></li>
              <li><span className="k" aria-hidden="true"></span><div><strong>Built for this sector</strong><span>We understand booking cycles, channel partners, RERA-safe claims, inventory-wise targeting and why a 60-day lead is still a live lead.</span></div></li>
            </ul>
          </div>
        </section>

        {/* SERVICE 1 : CONTENT + SOCIAL */}
        <section id="content">
          <div className="sechead"><span className="lvl">+18.0</span><h2>Content &amp; social media management</h2></div>

          <div className="svc">
            <div>
              <div className="no">Production</div>
              <h3>We shoot it ourselves</h3>
              <p className="desc">Drone for elevation and locality context, cinema camera for walkthroughs and brand films, iPhone for fast reels that actually perform. Monthly shoot days planned around your construction timeline.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Drone aerials — site, elevation, locality and connectivity shots</span></div>
              <div><i>▸</i><span>Model flat and sample interior walkthroughs</span></div>
              <div><i>▸</i><span>Monthly construction progress films</span></div>
              <div><i>▸</i><span>Founder, CEO and sales team authority content</span></div>
              <div><i>▸</i><span>Customer handover and testimonial shoots</span></div>
              <div><i>▸</i><span>Before / after interior transformation edits</span></div>
              <div><i>▸</i><span>Material, finish and craftsmanship detail shots</span></div>
              <div><i>▸</i><span>Models and influencers arranged on request</span></div>
            </div>
          </div>

          <div className="svc">
            <div>
              <div className="no">Planning</div>
              <h3>Scripts and content strategy</h3>
              <p className="desc">Nothing is shot without a reason. Every month starts with a plan mapped to what you are trying to sell that month.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Monthly content calendar approved before shoot day</span></div>
              <div><i>▸</i><span>Reel scripts, hooks and voice-over copy</span></div>
              <div><i>▸</i><span>Caption writing in Hindi, English or Hinglish</span></div>
              <div><i>▸</i><span>Hashtag, location and keyword strategy</span></div>
              <div><i>▸</i><span>Trend and audio research for local relevance</span></div>
              <div><i>▸</i><span>Static creatives, carousels and offer posts</span></div>
              <div><i>▸</i><span>Festive and launch campaign concepts</span></div>
              <div><i>▸</i><span>Brand guideline and template system</span></div>
            </div>
          </div>

          <div className="svc">
            <div>
              <div className="no">Management</div>
              <h3>Daily handling and engagement</h3>
              <p className="desc">Your page is a sales channel, so it is treated like one. Comments and DMs are answered by people who know your inventory and pricing.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Scheduling and posting across Instagram, Facebook, YouTube and LinkedIn</span></div>
              <div><i>▸</i><span>Story management — polls, behind the scenes, daily site updates</span></div>
              <div><i>▸</i><span>Comment and DM replies within working hours</span></div>
              <div><i>▸</i><span>Enquiries from DMs passed to your sales team, not left unread</span></div>
              <div><i>▸</i><span>Review and reputation monitoring</span></div>
              <div><i>▸</i><span>Negative comment and crisis handling protocol</span></div>
              <div><i>▸</i><span>Competitor activity tracking</span></div>
              <div><i>▸</i><span>Monthly performance report with next month's plan</span></div>
            </div>
            <div className="note">Models, influencers, actors and any paid page seeding are billed at actual cost with the invoice shared — we do not add a margin on top of talent fees.</div>
          </div>
        </section>

        {/* SERVICE 2 : PERFORMANCE */}
        <section id="ads">
          <div className="sechead"><span className="lvl">+13.5</span><h2>Performance marketing</h2></div>
          <p className="lede" style={{marginTop: '-18px'}}>Lead cost is easy to reduce and meaningless on its own. We optimise for cost per site visit and cost per booking, which means we cut audiences that produce cheap leads nobody can reach.</p>

          <div className="svc" style={{marginTop: '34px'}}>
            <div>
              <div className="no">Setup</div>
              <h3>Account and tracking foundation</h3>
              <p className="desc">Built in your own ad accounts, under your Business Manager. You keep every asset, audience and learning if we ever part ways.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Meta and Google Ads account structure</span></div>
              <div><i>▸</i><span>Pixel, Conversions API and server-side tracking</span></div>
              <div><i>▸</i><span>GA4, Google Tag Manager and call tracking setup</span></div>
              <div><i>▸</i><span>Offline conversion upload — bookings fed back into the algorithm</span></div>
              <div><i>▸</i><span>UTM convention so every lead is traceable to a creative</span></div>
              <div><i>▸</i><span>Baseline report of your current numbers before we touch anything</span></div>
            </div>
          </div>

          <div className="svc">
            <div>
              <div className="no">Creative</div>
              <h3>Systematic A/B testing</h3>
              <p className="desc">In this category the creative is the targeting. We run structured tests instead of guessing, and retire losers fast.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Multiple creative variants live per campaign, every month</span></div>
              <div><i>▸</i><span>Hook, thumbnail and first-three-second testing</span></div>
              <div><i>▸</i><span>Offer and headline testing — price point, EMI, possession date</span></div>
              <div><i>▸</i><span>Format testing across reel, carousel, static and collection</span></div>
              <div><i>▸</i><span>Landing page vs instant form vs WhatsApp click testing</span></div>
              <div><i>▸</i><span>Winning angles scaled, losing spend cut within the same week</span></div>
            </div>
          </div>

          <div className="svc">
            <div>
              <div className="no">Targeting</div>
              <h3>Reaching actual buyers</h3>
              <p className="desc">Filtering out the window shoppers matters more than reach. Qualification starts in the ad, not in the call centre.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Locality, pincode and radius targeting around your project</span></div>
              <div><i>▸</i><span>Income, life-stage and behaviour layering</span></div>
              <div><i>▸</i><span>Lookalikes built from your actual buyers, not from form fills</span></div>
              <div><i>▸</i><span>Google Search capture for high-intent project and locality queries</span></div>
              <div><i>▸</i><span>Retargeting across video viewers, page visitors and dropped leads</span></div>
              <div><i>▸</i><span>NRI and out-of-city targeting where relevant</span></div>
              <div><i>▸</i><span>Qualifying questions in-form to filter budget and timeline</span></div>
              <div><i>▸</i><span>Channel partner and broker recruitment campaigns</span></div>
            </div>
          </div>

          <div className="svc">
            <div>
              <div className="no">Reporting</div>
              <h3>Numbers you can act on</h3>
              <p className="desc">A live dashboard you can open any time, plus a monthly review call where we tell you what failed as clearly as what worked.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Live dashboard — spend, leads, CPL, site visits, bookings</span></div>
              <div><i>▸</i><span>Creative-level performance so you see which video sold</span></div>
              <div><i>▸</i><span>Weekly snapshot on WhatsApp, monthly report and strategy call</span></div>
              <div><i>▸</i><span>Daily budget pacing and anomaly checks</span></div>
              <div><i>▸</i><span>Full ad spend reconciliation each month</span></div>
              <div><i>▸</i><span>Quarterly business review with next-quarter plan</span></div>
            </div>
          </div>
        </section>

        {/* SERVICE 3 : LEAD MANAGEMENT */}
        <section id="leads">
          <div className="sechead"><span className="lvl">+09.0</span><h2>Lead management system</h2></div>
          <p className="lede" style={{marginTop: '-18px'}}>Most developers lose more money to slow follow-up than to expensive ads. We give you a system — on web and mobile — where every enquiry has an owner, a status and a next action.</p>

          <div className="svc" style={{marginTop: '34px'}}>
            <div>
              <div className="no">Capture</div>
              <h3>Every lead in one place</h3>
              <p className="desc">Nothing sits in a spreadsheet, a WhatsApp forward or somebody's personal inbox.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Meta, Google, website, GMB, WhatsApp and walk-ins in one pipeline</span></div>
              <div><i>▸</i><span>Instant alert to the assigned salesperson on new lead</span></div>
              <div><i>▸</i><span>Automatic distribution by project, source or round-robin</span></div>
              <div><i>▸</i><span>Duplicate detection so two people don't call the same buyer</span></div>
              <div><i>▸</i><span>Source tagged on every lead, down to the exact creative</span></div>
            </div>
          </div>

          <div className="svc">
            <div>
              <div className="no">Follow-up</div>
              <h3>The full journey, tracked</h3>
              <p className="desc">New → contacted → qualified → site visit scheduled → visited → negotiation → booked → lost. Every stage time-stamped.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Click-to-call from the app with automatic call recording</span></div>
              <div><i>▸</i><span>Follow-up reminders and task alerts for the sales team</span></div>
              <div><i>▸</i><span>Site visit scheduling and attendance marking</span></div>
              <div><i>▸</i><span>Lost reason capture — price, location, possession, competitor</span></div>
              <div><i>▸</i><span>Notes, documents and quotations stored against the lead</span></div>
              <div><i>▸</i><span>Automatic re-engagement of cold and dropped leads</span></div>
            </div>
          </div>

          <div className="svc">
            <div>
              <div className="no">Control</div>
              <h3>Visibility for the owner</h3>
              <p className="desc">You see what your sales team is doing without asking for it.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Salesperson-wise performance — calls, visits, conversions</span></div>
              <div><i>▸</i><span>Response time report: how fast leads are actually being called</span></div>
              <div><i>▸</i><span>Untouched and overdue lead alerts</span></div>
              <div><i>▸</i><span>Source-wise ROI — which campaign produced real bookings</span></div>
              <div><i>▸</i><span>Mobile app for the field team, web dashboard for management</span></div>
              <div><i>▸</i><span>Team training and onboarding included in setup</span></div>
            </div>
            <div className="note">This closes the loop back into the ad account. Once bookings flow back into Meta and Google, the platforms start finding more people like your actual buyers instead of more people who fill forms.</div>
          </div>
        </section>

        {/* SERVICE 4 : WEB */}
        <section id="web">
          <div className="sechead"><span className="lvl">+04.5</span><h2>Google Business, websites &amp; landing pages</h2></div>

          <div className="svc">
            <div>
              <div className="no">Local search</div>
              <h3>Google Business Profile</h3>
              <p className="desc">For interior studios and contractors this is often the highest-intent, lowest-cost channel available — and it is usually neglected.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Profile setup, verification and category optimisation</span></div>
              <div><i>▸</i><span>Photo, video and project gallery management</span></div>
              <div><i>▸</i><span>Weekly posts, offers and event updates</span></div>
              <div><i>▸</i><span>Review generation system and reply management</span></div>
              <div><i>▸</i><span>Local SEO and map pack ranking work</span></div>
              <div><i>▸</i><span>Q&amp;A, service listing and booking link setup</span></div>
            </div>
          </div>

          <div className="svc">
            <div>
              <div className="no">Build</div>
              <h3>Websites and landing pages</h3>
              <p className="desc">Fast, mobile-first pages built to convert traffic into enquiries — not brochure sites that take eight seconds to load.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>Project microsites and campaign landing pages</span></div>
              <div><i>▸</i><span>Company websites with portfolio and project galleries</span></div>
              <div><i>▸</i><span>Mobile-first, sub-three-second load targets</span></div>
              <div><i>▸</i><span>Floor plans, pricing, location map and virtual tour integration</span></div>
              <div><i>▸</i><span>Enquiry forms wired directly into the lead system</span></div>
              <div><i>▸</i><span>WhatsApp and click-to-call buttons on every scroll position</span></div>
              <div><i>▸</i><span>RERA details, disclaimers and compliance blocks</span></div>
              <div><i>▸</i><span>Conversion rate testing after launch, not just handover</span></div>
            </div>
          </div>
        </section>

        {/* SERVICE 5 : AUTOMATION */}
        <section id="auto">
          <div className="sechead"><span className="lvl">+02.0</span><h2>WhatsApp &amp; AI automation</h2></div>
          <p className="lede" style={{marginTop: '-18px'}}>A lead called within five minutes converts several times better than one called the next day. Automation makes sure the first response is instant, even at 11pm on a Sunday.</p>

          <div className="svc" style={{marginTop: '34px'}}>
            <div>
              <div className="no">WhatsApp</div>
              <h3>Official API setup</h3>
              <p className="desc">Verified business number, green tick application, and message flows that run whether your team is at their desk or not.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>WhatsApp Business API setup and green tick application</span></div>
              <div><i>▸</i><span>Instant auto-reply with brochure, price list and location pin</span></div>
              <div><i>▸</i><span>Drip follow-up sequences for leads who go quiet</span></div>
              <div><i>▸</i><span>Site visit reminders and confirmation messages</span></div>
              <div><i>▸</i><span>Broadcast campaigns for launches, offers and price revisions</span></div>
              <div><i>▸</i><span>Shared team inbox so no chat is stuck on one phone</span></div>
              <div><i>▸</i><span>Click-to-WhatsApp ads that open a chat directly</span></div>
            </div>
          </div>

          <div className="svc">
            <div>
              <div className="no">AI</div>
              <h3>Qualification and workflow automation</h3>
              <p className="desc">An AI assistant handles the repetitive first conversation and hands your salesperson a lead that is already qualified.</p>
            </div>
            <div className="grid2">
              <div><i>▸</i><span>AI chat assistant answering FAQs 24×7 — price, size, possession, location</span></div>
              <div><i>▸</i><span>Automatic budget, timeline and intent qualification before handover</span></div>
              <div><i>▸</i><span>Conversations in Hindi and English</span></div>
              <div><i>▸</i><span>Call recording transcription and summary against each lead</span></div>
              <div><i>▸</i><span>Automated daily sales report to management on WhatsApp</span></div>
              <div><i>▸</i><span>Review requests triggered automatically after handover</span></div>
              <div><i>▸</i><span>Internal workflow automation across CRM, sheets and calendars</span></div>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work">
          <div className="sechead"><span className="lvl">±00.0</span><h2>Selected work</h2></div>
          <p className="lede" style={{marginTop: '-18px'}}>Tap any tile to open the full video or case study.</p>

          <div className="media" style={{marginTop: '32px'}}>
            <a className="slot h wide" href="https://www.instagram.com/toflymedia/" target="_blank" rel="noopener">
              <span className="tag">Showreel</span>
              <span className="ti">Agency showreel — <span className="fill">add link</span></span>
              <span className="su">Replace with your 60–90 second reel covering drone, walkthrough and interior work.</span>
            </a>

            <a className="slot v" href="https://www.instagram.com/toflymedia/" target="_blank" rel="noopener">
              <span className="tag">Real estate</span>
              <span className="ti"><span className="fill">Project name</span></span>
              <span className="su">Drone elevation film. Add result: leads, cost per lead, site visits.</span>
            </a>

            <a className="slot v" href="https://www.instagram.com/toflymedia/" target="_blank" rel="noopener">
              <span className="tag">Interiors</span>
              <span className="ti"><span className="fill">Studio name</span></span>
              <span className="su">Before / after transformation reel. Add reach and enquiry numbers.</span>
            </a>

            <a className="slot v" href="https://www.instagram.com/toflymedia/" target="_blank" rel="noopener">
              <span className="tag">Construction</span>
              <span className="ti"><span className="fill">Company name</span></span>
              <span className="su">Monthly progress film. Add what it did for buyer confidence.</span>
            </a>

            <a className="slot v" href="https://www.instagram.com/toflymedia/" target="_blank" rel="noopener">
              <span className="tag">Influencer</span>
              <span className="ti"><span className="fill">Creator collaboration</span></span>
              <span className="su">Bhopal creator walkthrough. Add views and enquiries generated.</span>
            </a>

            <a className="slot h" href="https://www.instagram.com/toflymedia/" target="_blank" rel="noopener">
              <span className="tag">Ad creative</span>
              <span className="ti"><span className="fill">Campaign name</span></span>
              <span className="su">Screenshot of the ads manager result — spend, leads, cost per lead.</span>
            </a>

            <a className="slot h" href="https://www.instagram.com/toflymedia/" target="_blank" rel="noopener">
              <span className="tag">Dashboard</span>
              <span className="ti"><span className="fill">Lead system screenshot</span></span>
              <span className="su">Show the pipeline view so clients understand what they get.</span>
            </a>

            <a className="slot h" href="https://www.toflymediaa.com/" target="_blank" rel="noopener">
              <span className="tag">Website</span>
              <span className="ti"><span className="fill">Landing page build</span></span>
              <span className="su">Add the live URL and its conversion rate.</span>
            </a>
          </div>
        </section>

        {/* VERTICALS */}
        <section>
          <div className="sechead"><span className="lvl">Sector</span><h2>What this looks like in your business</h2></div>
          <div className="vert">
            <div>
              <h3>Real estate developers</h3>
              <p>Pre-launch interest, launch-day volume and steady site visits through the sales cycle.</p>
              <ul>
                <li>Pre-launch waitlist campaigns</li>
                <li>Inventory-wise targeting by configuration</li>
                <li>Channel partner recruitment</li>
                <li>Cost per site visit as the headline metric</li>
                <li>Construction progress content for buyer confidence</li>
              </ul>
            </div>
            <div>
              <h3>Interior designers &amp; studios</h3>
              <p>A portfolio that does the selling before the first meeting, and enquiries with real budgets.</p>
              <ul>
                <li>Before / after and reveal-format content</li>
                <li>Budget-qualified enquiry forms</li>
                <li>Google Business and local search dominance</li>
                <li>Material and craftsmanship detail films</li>
                <li>Client testimonial and handover shoots</li>
              </ul>
            </div>
            <div>
              <h3>Construction &amp; contracting</h3>
              <p>Credibility content for a business where trust decides the contract, plus B2B lead flow.</p>
              <ul>
                <li>Project capability and scale films</li>
                <li>Timeline and delivery-record content</li>
                <li>B2B targeting of developers and architects</li>
                <li>Tender and credential documentation support</li>
                <li>Safety, quality and team culture content</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section>
          <div className="sechead"><span className="lvl">Process</span><h2>How we start</h2></div>
          <div className="steps">
            <div className="step"><span className="sn">01</span><div><strong>Discovery call — 45 minutes</strong><p>Your projects, current marketing, what your booking cycle actually looks like and what has failed before. No pitch on this call.</p></div></div>
            <div className="step"><span className="sn">02</span><div><strong>Free audit</strong><p>We review your ad accounts, page, website and Google listing, then present specific gaps and what fixing them is worth. Yours to keep whether you hire us or not.</p></div></div>
            <div className="step"><span className="sn">03</span><div><strong>Proposal and scope</strong><p>Strategy, deliverables with quantities, timelines, team, pricing and what is explicitly not included. Sent within 48 hours of the audit.</p></div></div>
            <div className="step"><span className="sn">04</span><div><strong>Agreement and kickoff</strong><p>Signed agreement, access to your own accounts, tracking setup, baseline numbers recorded and a 30-60-90 day roadmap presented to your team.</p></div></div>
            <div className="step"><span className="sn">05</span><div><strong>First shoot and launch</strong><p>Content produced, campaigns live, lead system connected and your sales team trained on it — typically inside the first three weeks.</p></div></div>
            <div className="step"><span className="sn">06</span><div><strong>Optimise and review</strong><p>Weekly optimisation, monthly reports and strategy calls, quarterly business reviews. You always know what we are doing and why.</p></div></div>
          </div>
        </section>

        {/* CTA */}
        <section id="talk">
          <div className="cta">
            <div>
              <h2>Tell us what you're launching.</h2>
              <p className="lede">Bring your current numbers to the first call — spend, lead cost, site visits, bookings. If we don't think we can improve them, we'll say so on the call.</p>
            </div>
            <ul className="contactlist">
              <li><span className="lab">Call / WhatsApp</span><a href="tel:" className="fill">+91 –– –––– ––––</a></li>
              <li><span className="lab">Email</span><a href="mailto:" className="fill">hello@toflymedia.com</a></li>
              <li><span className="lab">Instagram</span><a href="https://www.instagram.com/toflymedia/" target="_blank" rel="noopener">@toflymedia</a></li>
              <li><span className="lab">Website</span><a href="https://www.toflymediaa.com/" target="_blank" rel="noopener">toflymediaa.com</a></li>
              <li><span className="lab">Office</span><span className="fill">Bhopal, MP — add address</span></li>
            </ul>
          </div>
        </section>

        <footer>
          <div className="fr">
            <span>To Fly Media — growth partner for real estate, interiors and construction.</span>
            <span>Bhopal · Serving clients across India</span>
          </div>
        </footer>

      </main>

    </div>
  )
}