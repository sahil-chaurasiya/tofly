import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { publicAPI } from '../utils/api'
import TFLY_PORTFOLIO_DEFAULTS from '../data/tflyPortfolioDefaults'

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

  // Every piece of copy on this page is fetched from the admin-editable
  // content API. While it loads (or if it's ever unreachable) we fall back
  // to TFLY_PORTFOLIO_DEFAULTS so the page always renders something sensible.
  const { data } = useQuery({
    queryKey: ['tofly-portfolio-content'],
    queryFn: () => publicAPI.getPortfolio(),
    select: (res) => res.data.content,
  })

  const c = data || TFLY_PORTFOLIO_DEFAULTS

  return (
    <div className="tfport-root">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <nav className="rail" aria-label="Sections">
        {(c.nav || []).map((item, i) => (
          <a href={item.href} key={i}><span className="mark">{item.mark}</span>{item.label}</a>
        ))}
      </nav>

      <main className="wrap">

        {/* HERO */}
        <section className="hero">
          <div className="brandline">
            <span className="logo">{c.brand?.logoText}</span>
            <span className="sep" aria-hidden="true"></span>
            <span className="loc">{c.brand?.locationText}</span>
          </div>

          <h1>{c.hero?.title}</h1>

          <p className="sub">{c.hero?.subtitle}</p>

          <div className="heroCta">
            {c.hero?.ctaPrimaryText && (
              <a className="btn" href={c.hero.ctaPrimaryHref || '#talk'}>{c.hero.ctaPrimaryText}</a>
            )}
            {c.hero?.ctaSecondaryText && (
              <a className="btn ghost" href={c.hero.ctaSecondaryHref || '#work'}>{c.hero.ctaSecondaryText}</a>
            )}
          </div>

          <div className="creds">
            {(c.hero?.credentials || []).map((cred, i) => (
              <div key={i}>
                <span className={cred.highlight !== false ? 'n fill' : 'n'}>{cred.value}</span>
                <span className="l">{cred.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* WHO */}
        <section id={c.who?.anchorId || 'who'}>
          <div className="sechead"><span className="lvl">{c.who?.levelLabel}</span><h2>{c.who?.heading}</h2></div>

          <div className="twocol">
            <div>
              {(c.who?.paragraphs || []).map((p, i) => (
                <p className="lede" style={i === 0 ? { marginTop: '0' } : undefined} key={i}>{p}</p>
              ))}
              {c.who?.note && <div className="note">{c.who.note}</div>}
            </div>

            <ul className="edgelist">
              {(c.who?.edgelist || []).map((item, i) => (
                <li key={i}>
                  <span className="k" aria-hidden="true"></span>
                  <div><strong>{item.title}</strong><span>{item.description}</span></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICE SECTIONS (Content, Ads, Leads, Web, Automation ...) */}
        {(c.serviceSections || []).map((sec, si) => (
          <section id={sec.anchorId} key={si}>
            <div className="sechead"><span className="lvl">{sec.levelLabel}</span><h2>{sec.heading}</h2></div>
            {sec.intro && <p className="lede" style={{ marginTop: '-18px' }}>{sec.intro}</p>}

            {(sec.blocks || []).map((block, bi) => (
              <div className="svc" style={bi === 0 && sec.intro ? { marginTop: '34px' } : undefined} key={bi}>
                <div>
                  {block.no && <div className="no">{block.no}</div>}
                  <h3>{block.title}</h3>
                  {block.description && <p className="desc">{block.description}</p>}
                </div>
                <div className="grid2">
                  {(block.bullets || []).map((b, li) => (
                    <div key={li}><i>▸</i><span>{b}</span></div>
                  ))}
                </div>
                {block.note && <div className="note">{block.note}</div>}
              </div>
            ))}
          </section>
        ))}

        {/* WORK */}
        <section id={c.work?.anchorId || 'work'}>
          <div className="sechead"><span className="lvl">{c.work?.levelLabel}</span><h2>{c.work?.heading}</h2></div>
          {c.work?.intro && <p className="lede" style={{ marginTop: '-18px' }}>{c.work.intro}</p>}

          <div className="media" style={{ marginTop: '32px' }}>
            {(c.work?.items || []).map((item, i) => {
              const cls = ['slot', item.orientation === 'horizontal' ? 'h' : 'v', item.wide ? 'wide' : '']
                .filter(Boolean).join(' ')
              return (
                <a className={cls} href={item.href || '#'} target="_blank" rel="noopener" key={i}>
                  {item.tag && <span className="tag">{item.tag}</span>}
                  <span className="ti"><span className="fill">{item.title}</span></span>
                  {item.description && <span className="su">{item.description}</span>}
                </a>
              )
            })}
          </div>
        </section>

        {/* VERTICALS */}
        <section>
          <div className="sechead"><span className="lvl">{c.verticals?.levelLabel}</span><h2>{c.verticals?.heading}</h2></div>
          <div className="vert">
            {(c.verticals?.items || []).map((v, i) => (
              <div key={i}>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
                <ul>
                  {(v.bullets || []).map((b, li) => <li key={li}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section>
          <div className="sechead"><span className="lvl">{c.process?.levelLabel}</span><h2>{c.process?.heading}</h2></div>
          <div className="steps">
            {(c.process?.steps || []).map((s, i) => (
              <div className="step" key={i}>
                <span className="sn">{s.number}</span>
                <div><strong>{s.title}</strong><p>{s.description}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id={c.cta?.anchorId || 'talk'}>
          <div className="cta">
            <div>
              <h2>{c.cta?.heading}</h2>
              <p className="lede">{c.cta?.description}</p>
            </div>
            <ul className="contactlist">
              {(c.cta?.contactList || []).map((item, i) => (
                <li key={i}>
                  <span className="lab">{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="fill"
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener' : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="fill">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer>
          <div className="fr">
            <span>{c.footer?.line1}</span>
            <span>{c.footer?.line2}</span>
          </div>
        </footer>

      </main>

    </div>
  )
}