import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// FORGE FITNESS — SITIO COMPLETO FINAL
// ═══════════════════════════════════════════════════════════════

const FontLoader = () => (<><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" /></>);

const S = () => (
  <style>{`
:root{--bg:#0A0A0A;--bg1:#111;--bg2:#141414;--g9:#1E1E1E;--g8:#2A2A2A;--g7:#3A3A3A;--g6:#555;--g5:#777;--g4:#999;--g3:#BBB;--wh:#F5F5F0;--lm:#C8F731;--ld:#A8D426;--ll:#D4FF4A;--lg:rgba(200,247,49,.15);--lgm:rgba(200,247,49,.25);--lgl:rgba(200,247,49,.4);--fd:'Bebas Neue','Impact',sans-serif;--fb:'Barlow','Helvetica Neue',sans-serif;--eo:cubic-bezier(.16,1,.3,1);--gb:rgba(10,10,10,.85);--gbl:20px}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body,#root{background:var(--bg);color:var(--wh);font-family:var(--fb);overflow-x:hidden}
::selection{background:var(--lm);color:var(--bg)}
a{color:inherit;text-decoration:none}button{cursor:pointer;border:none;background:none;font-family:inherit;color:inherit}img,video{display:block;max-width:100%}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--g7);border-radius:9px}::-webkit-scrollbar-thumb:hover{background:var(--lm)}
.G{position:fixed;top:-50%;left:-50%;width:200%;height:200%;pointer-events:none;z-index:9999;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:gs .5s steps(1) infinite}
@keyframes gs{0%,100%{transform:translate(0,0)}25%{transform:translate(-2%,-3%)}50%{transform:translate(3%,1%)}75%{transform:translate(-1%,4%)}}

/* PRELOADER */
.PL{position:fixed;inset:0;z-index:10000;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .6s,visibility .6s}.PL.dn{opacity:0;visibility:hidden;pointer-events:none}
.PL-logo{font-family:var(--fd);font-size:clamp(3rem,8vw,7rem);text-transform:uppercase;letter-spacing:.05em;line-height:.95}
.PL-logo .lt{display:inline-block;opacity:0;transform:translateY(100%);animation:ltR .6s var(--eo) forwards}
@keyframes ltR{to{opacity:1;transform:translateY(0)}}
.PL-bar{width:clamp(200px,40vw,400px);height:2px;background:var(--g8);margin-top:2rem;border-radius:2px;overflow:hidden}
.PL-fill{height:100%;background:var(--lm);border-radius:2px;box-shadow:0 0 12px var(--lgm);transition:width .3s}
.PL-tag{font-size:clamp(.6rem,1vw,.75rem);text-transform:uppercase;letter-spacing:.3em;color:var(--g5);margin-top:1.5rem;opacity:0;animation:fi .5s ease .8s forwards}
@keyframes fi{to{opacity:1}}

/* NAVBAR */
.N{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 clamp(1rem,3vw,3rem);height:72px;display:flex;align-items:center;justify-content:space-between;transition:all .4s var(--eo)}
.N.sc{background:var(--gb);backdrop-filter:blur(var(--gbl));-webkit-backdrop-filter:blur(var(--gbl));border-bottom:1px solid rgba(200,247,49,.06);height:64px}
.N-logo{font-family:var(--fd);font-size:clamp(1.3rem,2.2vw,1.7rem);text-transform:uppercase;letter-spacing:.04em;z-index:1001;display:flex;align-items:center;gap:.3em}
.N-hex{width:clamp(20px,2.5vw,26px);height:clamp(20px,2.5vw,26px);background:var(--lm);display:flex;align-items:center;justify-content:center;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)}
.N-hex span{font-family:var(--fd);font-size:clamp(.6rem,1vw,.75rem);color:var(--bg);font-weight:900;line-height:1}
.NL{display:flex;align-items:center;gap:clamp(1rem,2.2vw,2rem);list-style:none}
.nl{font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:var(--g3);position:relative;padding:.3rem 0;transition:color .3s}
.nl::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:var(--lm);transition:width .3s var(--eo)}.nl:hover{color:var(--wh)}.nl:hover::after{width:100%}
.nc{padding:.5rem 1.3rem;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;background:var(--lm);color:var(--bg);border-radius:3px;transition:all .3s var(--eo)}.nc:hover{background:var(--ll);box-shadow:0 0 20px var(--lgm);transform:translateY(-1px)}
.BG{display:none;width:30px;height:22px;position:relative;z-index:1001;flex-direction:column;justify-content:space-between}
.BG span{display:block;width:100%;height:2px;background:var(--wh);border-radius:2px;transition:all .4s var(--eo);transform-origin:center}
.BG.op span:nth-child(1){transform:translateY(10px) rotate(45deg);background:var(--lm)}.BG.op span:nth-child(2){opacity:0;transform:scaleX(0)}.BG.op span:nth-child(3){transform:translateY(-10px) rotate(-45deg);background:var(--lm)}
.MM{position:fixed;inset:0;z-index:999;background:var(--bg);display:flex;flex-direction:column;justify-content:center;padding:2rem clamp(2rem,8vw,4rem);opacity:0;visibility:hidden;transition:opacity .5s,visibility .5s}.MM.op{opacity:1;visibility:visible}
.ML{list-style:none;display:flex;flex-direction:column}.MI{border-bottom:1px solid var(--g8)}.MI:first-child{border-top:1px solid var(--g8)}
.ml{display:flex;align-items:center;justify-content:space-between;padding:1.1rem 0;font-family:var(--fd);font-size:clamp(1.8rem,5.5vw,3rem);text-transform:uppercase;letter-spacing:.03em;color:var(--wh);opacity:0;transform:translateY(25px);transition:color .3s,opacity .5s var(--eo),transform .5s var(--eo)}
.MM.op .ml{opacity:1;transform:translateY(0)}.ml:hover{color:var(--lm)}.ml .ln{font-family:var(--fb);font-size:.65rem;font-weight:500;color:var(--g6);letter-spacing:.1em}
.MF{margin-top:auto;padding-top:2rem;display:flex;flex-direction:column;gap:1rem;opacity:0;transform:translateY(15px);transition:opacity .5s ease .4s,transform .5s var(--eo) .4s}.MM.op .MF{opacity:1;transform:translateY(0)}
.mc{display:block;text-align:center;padding:.9rem;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;background:var(--lm);color:var(--bg);border-radius:4px}
.mi{display:flex;justify-content:space-between;font-size:.65rem;color:var(--g5);letter-spacing:.05em;text-transform:uppercase}
@media(max-width:900px){.NL{display:none}.BG{display:flex}}

/* HERO */
.H{position:relative;width:100%;height:100vh;min-height:600px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.H-v{position:absolute;inset:0}.H-v video{width:100%;height:100%;object-fit:cover}
.H-o1{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,rgba(10,10,10,.7),rgba(10,10,10,.3) 30%,rgba(10,10,10,.3) 60%,rgba(10,10,10,.85))}
.H-o2{position:absolute;inset:0;z-index:2;background:radial-gradient(ellipse at center,transparent 50%,rgba(10,10,10,.6))}
.H-c{position:relative;z-index:10;text-align:center;padding:0 1.5rem;max-width:1200px;width:100%}
.H-ey{display:inline-flex;align-items:center;gap:.75rem;font-size:clamp(.58rem,.8vw,.7rem);font-weight:600;text-transform:uppercase;letter-spacing:.3em;color:var(--lm);margin-bottom:clamp(1rem,2vw,1.8rem);opacity:0;animation:hfd .8s var(--eo) .3s forwards}
.H-eyl{width:clamp(16px,3vw,30px);height:1px;background:var(--lm)}
@keyframes hfd{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
.H-t{font-family:var(--fd);text-transform:uppercase;line-height:.88;letter-spacing:-.01em;margin-bottom:clamp(.8rem,1.5vw,1.2rem)}
.H-tl{display:block;overflow:hidden}.H-ti{display:block;opacity:0;transform:translateY(105%);animation:tsu 1s var(--eo) forwards}
@keyframes tsu{to{opacity:1;transform:translateY(0)}}
.H-tl:nth-child(1) .H-ti{font-size:clamp(3.8rem,14vw,13rem);color:var(--wh);animation-delay:.5s}
.H-tl:nth-child(2) .H-ti{font-size:clamp(3.8rem,14vw,13rem);color:var(--lm);animation-delay:.65s;text-shadow:0 0 60px var(--lgm),0 0 120px var(--lg)}
.H-sub{font-size:clamp(.82rem,1.1vw,1rem);font-weight:300;color:var(--g3);max-width:500px;margin:0 auto;line-height:1.75;opacity:0;animation:hfu .8s var(--eo) .9s forwards}
@keyframes hfu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.H-btns{display:flex;align-items:center;justify-content:center;gap:clamp(.7rem,1.2vw,1rem);margin-top:clamp(1.2rem,2.5vw,2rem);flex-wrap:wrap;opacity:0;animation:hfu .8s var(--eo) 1.1s forwards}
.hb{padding:clamp(.75rem,1vw,.9rem) clamp(1.5rem,2.5vw,2.2rem);font-weight:700;font-size:clamp(.68rem,.85vw,.78rem);text-transform:uppercase;letter-spacing:.12em;border-radius:3px;transition:all .4s var(--eo);position:relative;overflow:hidden}
.hbp{background:var(--lm);color:var(--bg)}.hbp:hover{background:var(--ll);box-shadow:0 0 30px var(--lgm);transform:translateY(-2px)}
.hbp::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transition:left .5s}.hbp:hover::before{left:100%}
.hbo{background:transparent;color:var(--wh);border:1px solid var(--g6)}.hbo:hover{border-color:var(--lm);color:var(--lm);box-shadow:0 0 20px var(--lg)}
.H-si{position:absolute;z-index:10;font-size:.52rem;font-weight:500;text-transform:uppercase;letter-spacing:.25em;color:var(--g6);writing-mode:vertical-rl;opacity:0;animation:hfu .8s var(--eo) 1.3s forwards}
.H-sl{left:clamp(1rem,2.5vw,2.5rem);bottom:clamp(3rem,6vw,6rem)}.H-sr{right:clamp(1rem,2.5vw,2.5rem);bottom:clamp(3rem,6vw,6rem)}
.H-sc{position:absolute;bottom:clamp(1.5rem,3vw,2.5rem);left:50%;transform:translateX(-50%);z-index:10;display:flex;flex-direction:column;align-items:center;gap:.5rem;opacity:0;animation:hfu .8s var(--eo) 1.5s forwards}
.H-sct{font-size:.5rem;text-transform:uppercase;letter-spacing:.25em;color:var(--g6)}
.H-scl{width:1px;height:clamp(28px,3.5vw,45px);position:relative;overflow:hidden}
.H-scl::before{content:'';position:absolute;top:-100%;width:100%;height:100%;background:linear-gradient(to bottom,var(--lm),transparent);animation:scd 2s ease-in-out infinite}
@keyframes scd{0%{top:-100%}50%{top:0}100%{top:100%}}
.H-st{position:absolute;bottom:0;left:0;right:0;z-index:10;display:flex;border-top:1px solid rgba(200,247,49,.08);opacity:0;animation:hfu .8s var(--eo) 1.6s forwards}
.H-s{flex:1;padding:clamp(.7rem,1.2vw,1rem) clamp(.8rem,1.5vw,1.5rem);text-align:center;border-right:1px solid rgba(200,247,49,.08);background:rgba(10,10,10,.5);backdrop-filter:blur(10px)}.H-s:last-child{border-right:none}
.H-sv{font-family:var(--fd);font-size:clamp(1.1rem,2.2vw,1.7rem);color:var(--lm);line-height:1}
.H-sl2{font-size:clamp(.45rem,.6vw,.58rem);text-transform:uppercase;letter-spacing:.12em;color:var(--g5);margin-top:.25rem;font-weight:500}
@media(max-width:768px){.H-si{display:none}.H-sl2{letter-spacing:.06em;font-size:.45rem}}

/* TICKER */
.TK{width:100%;overflow:hidden;border-top:1px solid var(--g8);border-bottom:1px solid var(--g8);padding:clamp(.6rem,1vw,.85rem) 0;position:relative}
.TK::before,.TK::after{content:'';position:absolute;top:0;bottom:0;width:55px;z-index:2;pointer-events:none}
.TK::before{left:0;background:linear-gradient(to right,var(--bg),transparent)}.TK::after{right:0;background:linear-gradient(to left,var(--bg),transparent)}
.TK.lm{background:var(--lm);border-color:var(--lm);padding:clamp(.4rem,.7vw,.55rem) 0}.TK.lm::before{background:linear-gradient(to right,var(--lm),transparent)}.TK.lm::after{background:linear-gradient(to left,var(--lm),transparent)}
.TK-t{display:flex;width:max-content;animation:tkr var(--spd,28s) linear infinite}.TK:hover .TK-t{animation-play-state:paused}.TK-t.rv{animation-name:tkrR}
@keyframes tkr{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}@keyframes tkrR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
.ti{display:flex;align-items:center;gap:clamp(.6rem,1.2vw,1.2rem);padding:0 clamp(.6rem,1.2vw,1.2rem);white-space:nowrap;flex-shrink:0}
.tt{font-family:var(--fd);font-size:clamp(.85rem,1.5vw,1.2rem);text-transform:uppercase;letter-spacing:.05em;color:var(--wh)}
.TK.lm .tt{color:var(--bg);font-family:var(--fb);font-weight:800;font-size:clamp(.55rem,.85vw,.72rem);letter-spacing:.12em}
.ts{width:clamp(4px,.45vw,5px);height:clamp(4px,.45vw,5px);border-radius:50%;background:var(--lm);flex-shrink:0}.TK.lm .ts{background:var(--bg)}
.tst{font-size:clamp(.7rem,1.2vw,1rem);color:var(--lm);flex-shrink:0}

/* SHARED */
.SC{max-width:1400px;margin:0 auto;padding:0 clamp(1rem,3vw,3rem);position:relative;z-index:1}
.ey{display:inline-flex;align-items:center;gap:.75rem;font-size:clamp(.58rem,.78vw,.7rem);font-weight:600;text-transform:uppercase;letter-spacing:.25em;color:var(--lm);margin-bottom:clamp(.7rem,1.2vw,1rem)}
.eyl{width:clamp(14px,2vw,24px);height:1px;background:var(--lm)}
.st{font-family:var(--fd);font-size:clamp(2.5rem,5.5vw,5rem);text-transform:uppercase;line-height:.9;letter-spacing:.01em}.st span{color:var(--lm)}
.rv{opacity:0;transform:translateY(35px);transition:opacity .8s var(--eo),transform .8s var(--eo)}.rv.v{opacity:1;transform:translateY(0)}

/* DIFF */
.DF{padding:clamp(4.5rem,9vw,9rem) 0;position:relative;overflow:hidden}
.DF::before{content:'';position:absolute;top:10%;right:-10%;width:clamp(280px,38vw,550px);height:clamp(280px,38vw,550px);background:radial-gradient(circle,var(--lg),transparent 65%);pointer-events:none}
.dg{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(.8rem,1.5vw,1.2rem);margin:clamp(2.5rem,4vw,4rem) 0}
.dc{background:var(--bg2);border:1px solid var(--g8);border-radius:10px;padding:clamp(1.3rem,2.2vw,2rem);position:relative;overflow:hidden;transition:all .5s var(--eo)}
.dc:hover{border-color:var(--lm);transform:translateY(-5px);box-shadow:0 18px 45px rgba(0,0,0,.4),0 0 25px var(--lg)}
.dc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--lm);transform:scaleX(0);transform-origin:left;transition:transform .5s var(--eo)}.dc:hover::before{transform:scaleX(1)}
.dn{font-family:var(--fd);font-size:clamp(2.2rem,3.5vw,3rem);color:var(--g8);line-height:1;margin-bottom:clamp(.6rem,1vw,1rem);transition:color .4s}.dc:hover .dn{color:var(--lm)}
.di{width:clamp(36px,3.5vw,46px);height:clamp(36px,3.5vw,46px);background:var(--g9);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:clamp(1rem,1.8vw,1.3rem);margin-bottom:clamp(.8rem,1.2vw,1.2rem);transition:all .4s var(--eo)}.dc:hover .di{background:var(--lm);transform:scale(1.1) rotate(-5deg)}
.dt{font-family:var(--fd);font-size:clamp(1.15rem,1.7vw,1.4rem);text-transform:uppercase;letter-spacing:.03em;margin-bottom:clamp(.3rem,.6vw,.5rem)}
.dd{font-size:clamp(.72rem,.85vw,.82rem);font-weight:300;color:var(--g4);line-height:1.65}
.CN{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--g8);border-radius:12px;overflow:hidden;background:var(--bg2)}
.cn{padding:clamp(1.3rem,2.5vw,2.2rem) clamp(.8rem,1.5vw,1.5rem);text-align:center;border-right:1px solid var(--g8);transition:background .4s}.cn:last-child{border-right:none}.cn:hover{background:var(--g9)}
.cv{font-family:var(--fd);font-size:clamp(2rem,4.5vw,3.5rem);color:var(--lm);line-height:1;margin-bottom:.2rem}
.cl{font-size:clamp(.55rem,.72vw,.65rem);font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:var(--g5)}
@media(max-width:768px){.CN{grid-template-columns:repeat(2,1fr)}.cn:nth-child(2){border-right:none}.cn:nth-child(1),.cn:nth-child(2){border-bottom:1px solid var(--g8)}}

/* PROGRAMS */
.PR{padding:clamp(4.5rem,9vw,9rem) 0;position:relative;overflow:hidden}
.PR::before{content:'';position:absolute;bottom:0;left:-15%;width:clamp(350px,45vw,650px);height:clamp(350px,45vw,650px);background:radial-gradient(circle,var(--lg),transparent 65%);pointer-events:none;opacity:.5}
.ph{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:clamp(2.5rem,4vw,4rem);flex-wrap:wrap;gap:1.2rem}
.ps{font-size:clamp(.78rem,.95vw,.9rem);font-weight:300;color:var(--g4);max-width:300px;line-height:1.7}
.pg{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(.7rem,1vw,1rem)}
@media(max-width:1024px){.pg{grid-template-columns:repeat(2,1fr)}}@media(max-width:640px){.pg{grid-template-columns:1fr}}
.pc{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:3/4;cursor:pointer;border:1px solid var(--g8);transition:border-color .5s}.pc:hover{border-color:var(--lm)}
.pc-bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:grayscale(60%) brightness(.5);transition:filter .7s var(--eo),transform .7s var(--eo)}.pc:hover .pc-bg{filter:grayscale(0%) brightness(.45);transform:scale(1.07)}
.pc-ov{position:absolute;inset:0;z-index:1;background:linear-gradient(to top,rgba(10,10,10,.95),rgba(10,10,10,.5) 40%,rgba(10,10,10,.2) 70%,rgba(10,10,10,.3))}
.pc-tg{position:absolute;top:clamp(.7rem,1.2vw,1rem);left:clamp(.7rem,1.2vw,1rem);z-index:2;display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .6rem;font-size:.55rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;border:1px solid rgba(200,247,49,.3);border-radius:100px;color:var(--lm);background:rgba(10,10,10,.5);backdrop-filter:blur(8px)}
.pc-td{width:5px;height:5px;border-radius:50%;background:var(--lm)}
.pc-nm{position:absolute;top:clamp(.4rem,.8vw,.8rem);right:clamp(.7rem,1.2vw,1.2rem);z-index:2;font-family:var(--fd);font-size:clamp(2.5rem,4.5vw,4rem);color:rgba(255,255,255,.04);line-height:1;transition:color .5s}.pc:hover .pc-nm{color:rgba(200,247,49,.08)}
.pc-ct{position:absolute;bottom:0;left:0;right:0;z-index:2;padding:clamp(1rem,1.8vw,1.5rem)}
.pc-ic{font-size:clamp(1.2rem,2.2vw,1.6rem);margin-bottom:.4rem;display:inline-block;transition:transform .5s var(--eo)}.pc:hover .pc-ic{transform:scale(1.2) rotate(-8deg)}
.pc-n{font-family:var(--fd);font-size:clamp(1.4rem,2.2vw,1.9rem);text-transform:uppercase;letter-spacing:.03em;line-height:1;margin-bottom:.3rem}
.pc-int{display:flex;align-items:center;gap:.35rem;margin-bottom:clamp(.4rem,.8vw,.6rem)}
.ib{width:14px;height:2.5px;border-radius:2px;background:var(--g7)}.ib.on{background:var(--lm)}
.il{font-size:.52rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--g5);margin-left:.2rem}
.pc-d{font-size:clamp(.7rem,.82vw,.8rem);font-weight:300;color:var(--g4);line-height:1.6;max-height:0;overflow:hidden;opacity:0;transition:max-height .6s var(--eo),opacity .4s,margin .4s;margin-bottom:0}.pc:hover .pc-d{max-height:100px;opacity:1;margin-bottom:clamp(.5rem,.8vw,.8rem)}
.pc-ft{display:flex;align-items:center;justify-content:space-between;padding-top:clamp(.5rem,.8vw,.6rem);border-top:1px solid var(--g8);transition:border-color .4s}.pc:hover .pc-ft{border-color:rgba(200,247,49,.15)}
.pc-m{display:flex;align-items:center;gap:clamp(.6rem,1vw,1rem)}.pm{display:flex;align-items:center;gap:.25rem;font-size:clamp(.55rem,.68vw,.63rem);font-weight:500;color:var(--g5);text-transform:uppercase;letter-spacing:.04em}
.pc-cta{display:flex;align-items:center;gap:.25rem;font-size:clamp(.55rem,.68vw,.63rem);font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--lm);opacity:0;transform:translateX(-8px);transition:opacity .4s,transform .4s var(--eo)}.pc:hover .pc-cta{opacity:1;transform:translateX(0)}
.pc-ac{position:absolute;bottom:0;left:0;width:100%;height:3px;background:var(--lm);transform:scaleX(0);transform-origin:left;z-index:3;transition:transform .6s var(--eo);box-shadow:0 0 12px var(--lgm)}.pc:hover .pc-ac{transform:scaleX(1)}

/* COACHES */
.CO{padding:clamp(4.5rem,9vw,9rem) 0;position:relative;overflow:hidden;background:var(--bg1)}
.CO::before{content:'';position:absolute;top:20%;right:-10%;width:clamp(280px,38vw,550px);height:clamp(280px,38vw,550px);background:radial-gradient(circle,var(--lg),transparent 65%);pointer-events:none;opacity:.4}
.cg{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(.7rem,1.2vw,1.2rem)}
@media(max-width:1024px){.cg{grid-template-columns:repeat(2,1fr)}}@media(max-width:540px){.cg{grid-template-columns:1fr;max-width:380px;margin:0 auto}}
.cc{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:3/4;cursor:pointer;border:1px solid var(--g8);transition:border-color .5s,box-shadow .5s}.cc:hover{border-color:var(--lm);box-shadow:0 18px 55px rgba(0,0,0,.5),0 0 35px var(--lg)}
.cc-tb{position:absolute;top:0;left:0;right:0;height:3px;background:var(--lm);z-index:3;transform:scaleX(0);transform-origin:left;transition:transform .6s var(--eo);box-shadow:0 0 10px var(--lgm)}.cc:hover .cc-tb{transform:scaleX(1)}
.cc-ph{position:absolute;inset:0;background-size:cover;background-position:center top;filter:grayscale(100%) contrast(1.1) brightness(.7);transition:filter .7s var(--eo),transform .7s var(--eo)}.cc:hover .cc-ph{filter:grayscale(0%) contrast(1.05) brightness(.55);transform:scale(1.06)}
.cc-gr{position:absolute;inset:0;z-index:1;background:linear-gradient(to top,rgba(10,10,10,.95),rgba(10,10,10,.4) 45%,transparent)}
.cc-nm{position:absolute;top:clamp(.5rem,.8vw,.8rem);left:clamp(.7rem,1vw,1rem);z-index:2;font-family:var(--fd);font-size:clamp(1.8rem,2.5vw,2.2rem);color:rgba(255,255,255,.06);line-height:1;transition:color .5s}.cc:hover .cc-nm{color:rgba(200,247,49,.12)}
.cc-ct{position:absolute;bottom:0;left:0;right:0;z-index:2;padding:clamp(1rem,1.8vw,1.5rem)}
.cc-tg{display:inline-flex;align-items:center;gap:.25rem;padding:.18rem .5rem;font-size:.5rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--lm);border:1px solid rgba(200,247,49,.25);border-radius:100px;background:rgba(10,10,10,.4);backdrop-filter:blur(6px);margin-bottom:.5rem}
.cc-td{width:4px;height:4px;border-radius:50%;background:var(--lm)}
.cc-n{font-family:var(--fd);font-size:clamp(1.3rem,1.9vw,1.7rem);text-transform:uppercase;letter-spacing:.03em;line-height:1;margin-bottom:.15rem;transition:color .3s}.cc:hover .cc-n{color:var(--lm)}
.cc-r{font-size:clamp(.6rem,.72vw,.68rem);color:var(--g5);text-transform:uppercase;letter-spacing:.1em;margin-bottom:.6rem}
.cc-b{font-size:clamp(.68rem,.78vw,.75rem);font-weight:300;color:var(--g4);line-height:1.6;max-height:0;opacity:0;overflow:hidden;transition:max-height .6s var(--eo),opacity .4s}.cc:hover .cc-b{max-height:90px;opacity:1}
.cc-s{display:flex;gap:clamp(.7rem,1.2vw,1.2rem);padding-top:.6rem;margin-top:.6rem;border-top:1px solid var(--g8);opacity:0;transform:translateY(6px);transition:opacity .4s ease .1s,transform .4s var(--eo) .1s}.cc:hover .cc-s{opacity:1;transform:translateY(0)}
.cc-sv{font-family:var(--fd);font-size:clamp(.9rem,1.3vw,1.15rem);color:var(--lm);line-height:1}.cc-sl{font-size:.45rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--g6);margin-top:.1rem}

/* SCHEDULE */
.SD{padding:clamp(4.5rem,9vw,9rem) 0;position:relative;overflow:hidden}
.SD::before{content:'';position:absolute;top:30%;left:-15%;width:clamp(300px,40vw,600px);height:clamp(300px,40vw,600px);background:radial-gradient(circle,var(--lg),transparent 65%);pointer-events:none;opacity:.35}
.sd-h{text-align:center;margin-bottom:clamp(2rem,3.5vw,3.5rem)}
.sd-sub{font-size:clamp(.8rem,1vw,.92rem);font-weight:300;color:var(--g4);max-width:460px;margin:clamp(.6rem,1vw,1rem) auto 0;line-height:1.7}
.tbs{display:flex;justify-content:center;gap:clamp(.25rem,.4vw,.4rem);margin-bottom:clamp(1.8rem,3vw,2.8rem);flex-wrap:wrap}
.tb{position:relative;padding:clamp(.5rem,.8vw,.7rem) clamp(.8rem,1.5vw,1.3rem);font-size:clamp(.6rem,.75vw,.7rem);font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--g5);border-radius:6px;border:1px solid var(--g8);transition:all .35s var(--eo)}.tb:hover{color:var(--wh);border-color:var(--g6);background:var(--g9)}.tb.on{color:var(--bg);background:var(--lm);border-color:var(--lm);box-shadow:0 0 18px var(--lg)}
.tb .tdn{display:block;font-family:var(--fd);font-size:clamp(.9rem,1.3vw,1.1rem);line-height:1;margin-bottom:.05rem}
.stb{width:100%;border:1px solid var(--g8);border-radius:12px;overflow:hidden;background:var(--bg2)}
.sth{display:grid;grid-template-columns:80px 1fr 100px 80px 100px;padding:clamp(.6rem,.9vw,.8rem) clamp(.8rem,1.5vw,1.2rem);border-bottom:1px solid var(--g8);background:var(--g9)}
.sth span{font-size:clamp(.5rem,.65vw,.58rem);font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--g5)}
.sr{display:grid;grid-template-columns:80px 1fr 100px 80px 100px;align-items:center;padding:clamp(.7rem,1vw,.9rem) clamp(.8rem,1.5vw,1.2rem);border-bottom:1px solid var(--g8);transition:all .3s;cursor:pointer;position:relative}.sr:last-child{border-bottom:none}.sr:hover{background:rgba(200,247,49,.03)}
.sr::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--lm);transform:scaleY(0);transition:transform .35s var(--eo)}.sr:hover::before{transform:scaleY(1)}
.sr-t{font-family:var(--fd);font-size:clamp(.85rem,1.1vw,1.05rem);color:var(--lm)}.sr-n{font-family:var(--fd);font-size:clamp(.9rem,1.2vw,1.1rem);text-transform:uppercase;letter-spacing:.03em;display:flex;align-items:center;gap:.4rem}.sr-c{font-size:clamp(.55rem,.68vw,.62rem);color:var(--g5)}
.sr-d{font-size:clamp(.6rem,.75vw,.7rem);color:var(--g4);font-weight:500}
.sr-sp{display:flex;align-items:center;gap:.35rem}.spd{display:flex;gap:2px}.sd2{width:4px;height:4px;border-radius:50%;background:var(--g7)}.sd2.on{background:var(--lm)}.sd2.wn{background:#FF6B35}
.spt{font-size:clamp(.5rem,.62vw,.55rem);font-weight:600;color:var(--g5)}.spt.lo{color:#FF6B35}
.sr-bk{padding:clamp(.3rem,.45vw,.38rem) clamp(.6rem,1vw,.8rem);font-size:clamp(.5rem,.6vw,.55rem);font-weight:700;text-transform:uppercase;letter-spacing:.08em;border-radius:4px;border:1px solid var(--g7);color:var(--g4);background:transparent;transition:all .3s var(--eo);white-space:nowrap}
.sr:hover .sr-bk{border-color:var(--lm);color:var(--lm)}.sr-bk:hover{background:var(--lm)!important;color:var(--bg)!important;border-color:var(--lm)!important}.sr-bk.fl{border-color:var(--g8);color:var(--g7);pointer-events:none}
@keyframes ri{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
@media(max-width:768px){.sth{display:none}.sr{grid-template-columns:auto 1fr auto;gap:.4rem}.sr-sp,.sr-d{display:none}}

/* PRICING */
.PP{padding:clamp(4.5rem,9vw,9rem) 0;position:relative;overflow:hidden;background:var(--bg1)}
.po{position:absolute;border-radius:50%;pointer-events:none;filter:blur(80px)}
.po1{width:clamp(280px,32vw,450px);height:clamp(280px,32vw,450px);background:rgba(200,247,49,.06);top:-10%;right:-5%}
.po2{width:clamp(220px,28vw,380px);height:clamp(220px,28vw,380px);background:rgba(200,247,49,.04);bottom:-10%;left:-5%}
.pp-h{text-align:center;margin-bottom:clamp(1.8rem,2.5vw,2.5rem)}.pp-sub{font-size:clamp(.8rem,1vw,.92rem);font-weight:300;color:var(--g4);max-width:440px;margin:clamp(.6rem,1vw,1rem) auto 0;line-height:1.7}
.bl{display:flex;align-items:center;justify-content:center;gap:clamp(.7rem,1.2vw,1rem);margin-bottom:clamp(2.2rem,3.5vw,3.5rem)}
.bll{font-size:clamp(.65rem,.8vw,.75rem);font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--g5);transition:color .3s}.bll.on{color:var(--wh)}
.tg{width:48px;height:26px;border-radius:100px;background:var(--g8);border:1px solid var(--g7);position:relative;cursor:pointer;transition:all .35s var(--eo)}.tg.yr{background:rgba(200,247,49,.15);border-color:var(--lm)}
.tgt{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:var(--g4);transition:all .35s var(--eo)}.tg.yr .tgt{left:25px;background:var(--lm);box-shadow:0 0 8px var(--lgm)}
.blb{font-size:.5rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--bg);background:var(--lm);padding:.18rem .45rem;border-radius:100px;opacity:0;transform:scale(.8);transition:all .3s var(--eo)}.blb.on{opacity:1;transform:scale(1)}
.ppg{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(.8rem,1.2vw,1.2rem);align-items:stretch}
@media(max-width:900px){.ppg{grid-template-columns:1fr;max-width:420px;margin:0 auto}}
.ppc{position:relative;border-radius:16px;padding:clamp(1.6rem,2.5vw,2.2rem);display:flex;flex-direction:column;transition:all .5s var(--eo);overflow:hidden}
.ppc.bs{background:rgba(20,20,20,.6);backdrop-filter:blur(16px);border:1px solid var(--g8)}.ppc.bs:hover{border-color:var(--g6);transform:translateY(-5px);box-shadow:0 18px 45px rgba(0,0,0,.4)}
.ppc.ft{background:rgba(20,20,20,.7);backdrop-filter:blur(20px);border:1px solid var(--lm);box-shadow:0 0 35px var(--lg),0 18px 55px rgba(0,0,0,.3)}.ppc.ft:hover{transform:translateY(-7px);box-shadow:0 0 55px var(--lgm),0 25px 70px rgba(0,0,0,.4)}
.ppc.ft::before{content:'';position:absolute;top:-1px;left:-1px;right:-1px;height:70px;background:linear-gradient(to bottom,var(--lg),transparent);border-radius:16px 16px 0 0;pointer-events:none}
.ppb{position:absolute;top:clamp(.8rem,1.2vw,1rem);right:clamp(.8rem,1.2vw,1rem);padding:.2rem .6rem;font-size:.5rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--bg);background:var(--lm);border-radius:100px;z-index:2}
.ppt{font-size:clamp(.55rem,.7vw,.62rem);font-weight:700;text-transform:uppercase;letter-spacing:.18em;color:var(--g5);margin-bottom:.3rem}.ppc.ft .ppt{color:var(--lm)}
.ppn{font-family:var(--fd);font-size:clamp(1.6rem,2.2vw,2rem);text-transform:uppercase;letter-spacing:.03em;margin-bottom:clamp(.6rem,1vw,.8rem)}
.ppd{font-size:clamp(.7rem,.82vw,.78rem);font-weight:300;color:var(--g4);line-height:1.6;margin-bottom:clamp(1rem,1.5vw,1.4rem)}
.ppp{display:flex;align-items:baseline;gap:.2rem;margin-bottom:.2rem}
.ppc2{font-size:clamp(.8rem,1vw,.95rem);font-weight:700;color:var(--g4);align-self:flex-start;margin-top:.4rem}
.ppa{font-family:var(--fd);font-size:clamp(2.5rem,4.2vw,3.5rem);line-height:1;transition:all .4s var(--eo)}.ppc.ft .ppa{color:var(--lm)}
.pper{font-size:clamp(.6rem,.72vw,.68rem);font-weight:500;color:var(--g6)}
.ppor{font-size:clamp(.62rem,.75vw,.72rem);color:var(--g7);text-decoration:line-through;margin-bottom:clamp(.8rem,1.2vw,1.2rem);min-height:1.1em}
.ppdv{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--g7),transparent);margin-bottom:clamp(.8rem,1.2vw,1.2rem)}.ppc.ft .ppdv{background:linear-gradient(90deg,transparent,rgba(200,247,49,.2),transparent)}
.ppfl{list-style:none;display:flex;flex-direction:column;gap:clamp(.35rem,.6vw,.5rem);margin-bottom:clamp(1.2rem,2vw,1.6rem);flex:1}
.ppf{display:flex;align-items:center;gap:.5rem;font-size:clamp(.68rem,.8vw,.75rem);color:var(--g3)}.ppf.off{color:var(--g7)}
.fck{width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.5rem;flex-shrink:0}.fck.y{background:rgba(200,247,49,.12);color:var(--lm);border:1px solid rgba(200,247,49,.2)}.fck.n{background:var(--g9);color:var(--g7);border:1px solid var(--g8)}
.ppct{width:100%;padding:clamp(.7rem,1vw,.85rem);font-size:clamp(.65rem,.75vw,.72rem);font-weight:700;text-transform:uppercase;letter-spacing:.12em;border-radius:6px;transition:all .35s var(--eo);text-align:center;overflow:hidden}
.ppct.ol{background:transparent;color:var(--wh);border:1px solid var(--g6)}.ppct.ol:hover{border-color:var(--lm);color:var(--lm);box-shadow:0 0 18px var(--lg)}
.ppct.pri{background:var(--lm);color:var(--bg);border:1px solid var(--lm)}.ppct.pri:hover{background:var(--ll);box-shadow:0 0 25px var(--lgm);transform:translateY(-2px)}
.gu{display:flex;align-items:center;justify-content:center;gap:clamp(1.2rem,2.5vw,2.5rem);margin-top:clamp(2rem,3.5vw,3.5rem);padding:clamp(.8rem,1.5vw,1.2rem);border:1px solid var(--g8);border-radius:10px;background:rgba(20,20,20,.4);backdrop-filter:blur(8px);flex-wrap:wrap}
.gui{display:flex;align-items:center;gap:.4rem;font-size:clamp(.58rem,.7vw,.65rem);font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--g4)}

/* TESTIMONIALS */
.TE{padding:clamp(4.5rem,9vw,9rem) 0 clamp(2.5rem,5vw,4rem);position:relative;overflow:hidden}
.TE::before{content:'';position:absolute;top:20%;left:50%;transform:translateX(-50%);width:clamp(350px,55vw,700px);height:clamp(350px,55vw,700px);background:radial-gradient(circle,var(--lg),transparent 65%);pointer-events:none;opacity:.25}
.te-h{text-align:center;margin-bottom:clamp(2.5rem,4vw,4.5rem)}
.te-r{display:flex;align-items:center;justify-content:center;gap:clamp(.4rem,.8vw,.6rem);margin-top:clamp(.8rem,1.2vw,1.2rem)}
.te-rs{display:flex;gap:.15rem;font-size:clamp(.8rem,1vw,.95rem);color:var(--lm)}
.te-rt{font-size:clamp(.65rem,.8vw,.75rem);font-weight:500;color:var(--g4)}.te-rt strong{color:var(--wh);font-weight:700}
.cw{position:relative;overflow:hidden;margin-bottom:clamp(1.5rem,2.5vw,2.5rem)}
.ct2{display:flex;transition:transform .6s var(--eo)}
.cs{min-width:100%;padding:0 clamp(.4rem,1.5vw,1.5rem);display:flex;justify-content:center}
.tc{width:100%;max-width:850px;display:grid;grid-template-columns:auto 1fr;gap:clamp(1.2rem,2.5vw,2.5rem);align-items:center;padding:clamp(1.3rem,2.5vw,2.5rem);background:var(--bg2);border:1px solid var(--g8);border-radius:14px;position:relative;overflow:hidden}
.tc::before{content:'';position:absolute;top:0;left:0;bottom:0;width:3px;background:var(--lm)}
@media(max-width:700px){.tc{grid-template-columns:1fr;text-align:center}}
.tc-aw{position:relative;width:clamp(85px,12vw,130px);height:clamp(85px,12vw,130px)}
@media(max-width:700px){.tc-aw{margin:0 auto}}
.tc-av{width:100%;height:100%;border-radius:10px;object-fit:cover;filter:grayscale(40%) contrast(1.05)}
.tc-ab{position:absolute;inset:-3px;border-radius:12px;border:1px solid rgba(200,247,49,.15);pointer-events:none}
.tc-ag{position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:55%;height:16px;background:var(--lm);filter:blur(12px);opacity:.15}
.tc-qm{font-family:var(--fd);font-size:clamp(2.5rem,4.5vw,4rem);color:var(--lm);line-height:.6;margin-bottom:.2rem;opacity:.4}
.tc-qt{font-size:clamp(.82rem,1.05vw,1rem);font-weight:300;font-style:italic;color:var(--g3);line-height:1.7;margin-bottom:clamp(.8rem,1.2vw,1.2rem)}
.tc-ar{display:flex;align-items:center;gap:clamp(.6rem,1.2vw,1rem);flex-wrap:wrap}@media(max-width:700px){.tc-ar{justify-content:center}}
.tc-an{font-family:var(--fd);font-size:clamp(1rem,1.3vw,1.2rem);text-transform:uppercase;letter-spacing:.03em;line-height:1}.tc-ad{font-size:clamp(.55rem,.68vw,.62rem);color:var(--g5);margin-top:.12rem}
.tc-as{display:flex;gap:.12rem;font-size:clamp(.6rem,.72vw,.68rem);color:var(--lm)}
.tc-at{padding:.15rem .5rem;font-size:.45rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--lm);border:1px solid rgba(200,247,49,.25);border-radius:100px}
.ccr{display:flex;align-items:center;justify-content:center;gap:clamp(.8rem,1.5vw,1.2rem)}
.cb{width:clamp(36px,4.5vw,44px);height:clamp(36px,4.5vw,44px);border-radius:50%;border:1px solid var(--g7);color:var(--g4);font-size:clamp(.8rem,1vw,.95rem);display:flex;align-items:center;justify-content:center;transition:all .3s var(--eo)}.cb:hover{border-color:var(--lm);color:var(--lm);box-shadow:0 0 12px var(--lg)}
.cds{display:flex;gap:clamp(.3rem,.5vw,.4rem)}
.cd{width:clamp(5px,.7vw,7px);height:clamp(5px,.7vw,7px);border-radius:50%;background:var(--g7);padding:0;transition:all .3s}.cd.on{background:var(--lm);box-shadow:0 0 6px var(--lgm);transform:scale(1.3)}

/* EXPERIENCE */
.EX{position:relative;min-height:90vh;display:flex;align-items:center;overflow:hidden}
.EX-bg{position:absolute;inset:0}.EX-img{position:absolute;inset:-15%;width:130%;height:130%;background-image:url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80");background-size:cover;background-position:center;filter:grayscale(70%) brightness(.35) contrast(1.1)}
.EX-ov{position:absolute;inset:0;z-index:1;background:linear-gradient(to right,rgba(10,10,10,.92),rgba(10,10,10,.6) 50%,rgba(10,10,10,.92)),linear-gradient(to bottom,rgba(10,10,10,.5),transparent 30%,transparent 70%,rgba(10,10,10,.9))}
.EX-ct{position:relative;z-index:2;max-width:1300px;margin:0 auto;padding:clamp(5rem,10vw,9rem) clamp(1.5rem,4vw,4rem);display:grid;grid-template-columns:1fr 1fr;gap:clamp(2.5rem,5vw,5rem);align-items:center}
@media(max-width:900px){.EX-ct{grid-template-columns:1fr;text-align:center}}
.EX-d{font-size:clamp(.82rem,1.05vw,1rem);font-weight:300;color:var(--g3);line-height:1.75;margin-bottom:clamp(1.2rem,2vw,2rem);max-width:500px}@media(max-width:900px){.EX-d{margin-left:auto;margin-right:auto}}
.EX-p{display:flex;flex-wrap:wrap;gap:clamp(.4rem,.6vw,.6rem)}@media(max-width:900px){.EX-p{justify-content:center}}
.ep{display:inline-flex;align-items:center;gap:.35rem;padding:.35rem .85rem;font-size:clamp(.58rem,.7vw,.65rem);font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--wh);border:1px solid var(--g7);border-radius:100px;background:rgba(20,20,20,.5);backdrop-filter:blur(6px);transition:all .3s}.ep:hover{border-color:var(--lm);color:var(--lm);box-shadow:0 0 10px var(--lg)}
.epd{width:5px;height:5px;border-radius:50%;background:var(--lm)}
.EX-ss{display:flex;flex-direction:column;gap:clamp(.8rem,1.5vw,1.2rem)}@media(max-width:900px){.EX-ss{flex-direction:row;flex-wrap:wrap;justify-content:center}}
.esc{padding:clamp(1rem,1.8vw,1.5rem) clamp(1.2rem,2vw,1.7rem);background:rgba(20,20,20,.6);backdrop-filter:blur(12px);border:1px solid var(--g8);border-radius:12px;transition:all .4s var(--eo);position:relative;overflow:hidden}
.esc:hover{border-color:var(--lm);transform:translateX(-6px);box-shadow:0 8px 35px rgba(0,0,0,.3),0 0 18px var(--lg)}@media(max-width:900px){.esc:hover{transform:translateY(-4px)}}
.esc::before{content:'';position:absolute;top:0;left:0;bottom:0;width:3px;background:var(--lm);transform:scaleY(0);transform-origin:top;transition:transform .4s var(--eo)}.esc:hover::before{transform:scaleY(1)}
.esv{font-family:var(--fd);font-size:clamp(1.5rem,2.5vw,2.2rem);color:var(--lm);line-height:1;margin-bottom:.15rem}
.esl{font-size:clamp(.58rem,.72vw,.68rem);font-weight:500;color:var(--g4);text-transform:uppercase;letter-spacing:.08em}

/* GALLERY */
.GA{padding:clamp(4.5rem,9vw,9rem) 0;background:var(--bg1)}
.GA-h{text-align:center;margin-bottom:clamp(2.5rem,4vw,4rem)}
.GA-g{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,clamp(140px,18vw,220px));gap:clamp(.4rem,.6vw,.6rem)}
@media(max-width:768px){.GA-g{grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(4,clamp(120px,22vw,180px))}}
.gi{position:relative;border-radius:8px;overflow:hidden;cursor:pointer}
.gi img{width:100%;height:100%;object-fit:cover;filter:grayscale(50%) brightness(.6);transition:filter .6s var(--eo),transform .6s var(--eo)}.gi:hover img{filter:grayscale(0%) brightness(.75);transform:scale(1.05)}
.gi-o{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,.75),transparent 50%);opacity:0;transition:opacity .4s;display:flex;align-items:flex-end;padding:clamp(.6rem,1vw,.9rem)}.gi:hover .gi-o{opacity:1}
.gi-l{font-family:var(--fd);font-size:clamp(.75rem,1vw,.9rem);text-transform:uppercase;letter-spacing:.04em}
.gi::after{content:'';position:absolute;inset:0;border-radius:8px;border:2px solid var(--lm);opacity:0;transition:opacity .4s;pointer-events:none}.gi:hover::after{opacity:.4}
.gw{grid-column:span 2}

/* CTA */
.CT{position:relative;padding:clamp(5.5rem,12vw,12rem) 0;overflow:hidden;text-align:center}
.CT-bg{position:absolute;inset:0}.CT-gr{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(200,247,49,.08),transparent 50%),radial-gradient(ellipse at 70% 50%,rgba(200,247,49,.06),transparent 50%),var(--bg)}
.CT-o{position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;animation:of 8s ease-in-out infinite}
.CT-o1{width:clamp(180px,28vw,380px);height:clamp(180px,28vw,380px);background:rgba(200,247,49,.07);top:10%;left:10%}.CT-o2{width:clamp(130px,22vw,320px);height:clamp(130px,22vw,320px);background:rgba(200,247,49,.05);bottom:10%;right:15%;animation-delay:-3s}
@keyframes of{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(12px,-18px) scale(1.04)}66%{transform:translate(-8px,12px) scale(.96)}}
.CT-gl{position:absolute;inset:0;pointer-events:none;opacity:.03;background-image:linear-gradient(var(--lm) 1px,transparent 1px),linear-gradient(90deg,var(--lm) 1px,transparent 1px);background-size:70px 70px}
.CT-ct{position:relative;z-index:2;max-width:850px;margin:0 auto;padding:0 clamp(1.5rem,4vw,3rem)}
.CT-t{font-family:var(--fd);font-size:clamp(3.2rem,9vw,8rem);text-transform:uppercase;line-height:.88;margin-bottom:clamp(.8rem,1.5vw,1.2rem)}
.CT-tl{color:var(--lm);text-shadow:0 0 50px var(--lgm),0 0 100px var(--lg)}
.CT-sub{font-size:clamp(.85rem,1.1vw,1rem);font-weight:300;color:var(--g3);line-height:1.7;max-width:520px;margin:0 auto clamp(1.8rem,2.5vw,2.5rem)}
.CT-bs{display:flex;align-items:center;justify-content:center;gap:clamp(.7rem,1.2vw,1rem);flex-wrap:wrap;margin-bottom:clamp(1.5rem,2.5vw,2.5rem)}
.CT-bm{position:relative;padding:clamp(.85rem,1.2vw,1.05rem) clamp(1.8rem,3.5vw,2.8rem);font-weight:800;font-size:clamp(.72rem,.92vw,.85rem);text-transform:uppercase;letter-spacing:.12em;background:var(--lm);color:var(--bg);border-radius:4px;overflow:hidden;transition:all .4s var(--eo);box-shadow:0 0 25px var(--lgm)}
.CT-bm:hover{background:var(--ll);box-shadow:0 0 45px var(--lgl);transform:translateY(-3px) scale(1.02)}
.CT-bm::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);transition:left .6s}.CT-bm:hover::before{left:100%}
.CT-bs2{padding:clamp(.85rem,1.2vw,1.05rem) clamp(1.8rem,3.5vw,2.8rem);font-weight:700;font-size:clamp(.72rem,.92vw,.85rem);text-transform:uppercase;letter-spacing:.12em;background:transparent;color:var(--wh);border:1px solid var(--g6);border-radius:4px;transition:all .4s var(--eo)}.CT-bs2:hover{border-color:var(--lm);color:var(--lm);box-shadow:0 0 18px var(--lg)}
.CT-tr{display:flex;align-items:center;justify-content:center;gap:clamp(1.2rem,2.5vw,2.2rem);flex-wrap:wrap}
.CT-ti{display:flex;align-items:center;gap:.35rem;font-size:clamp(.55rem,.68vw,.62rem);font-weight:500;color:var(--g5);text-transform:uppercase;letter-spacing:.05em}

/* FOOTER */
.FT{background:var(--bg);border-top:1px solid var(--g8)}
.FT-m{max-width:1400px;margin:0 auto;padding:clamp(2.5rem,5vw,4.5rem) clamp(1.5rem,3vw,3rem);display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:clamp(1.5rem,3.5vw,3.5rem)}
@media(max-width:900px){.FT-m{grid-template-columns:1fr 1fr;gap:1.8rem}}@media(max-width:540px){.FT-m{grid-template-columns:1fr}}
.FT-logo{display:flex;align-items:center;gap:.3em;font-family:var(--fd);font-size:clamp(1.3rem,1.8vw,1.6rem);text-transform:uppercase;letter-spacing:.04em;margin-bottom:clamp(.6rem,1.2vw,1rem)}
.FT-hex{width:clamp(20px,2.2vw,25px);height:clamp(20px,2.2vw,25px);background:var(--lm);display:flex;align-items:center;justify-content:center;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)}
.FT-hex span{font-family:var(--fd);font-size:clamp(.55rem,.85vw,.7rem);color:var(--bg);font-weight:900;line-height:1}
.FT-d{font-size:clamp(.7rem,.82vw,.78rem);font-weight:300;color:var(--g5);line-height:1.7;max-width:280px;margin-bottom:clamp(1rem,1.5vw,1.2rem)}
.FT-s{display:flex;gap:.5rem}
.FT-sb{width:32px;height:32px;border-radius:7px;border:1px solid var(--g8);display:flex;align-items:center;justify-content:center;font-size:.78rem;color:var(--g5);transition:all .3s}.FT-sb:hover{border-color:var(--lm);color:var(--lm);background:rgba(200,247,49,.06);transform:translateY(-2px)}
.FT-ct{font-family:var(--fd);font-size:clamp(.82rem,1vw,.92rem);text-transform:uppercase;letter-spacing:.08em;margin-bottom:clamp(.6rem,1.2vw,1rem)}
.FT-l{list-style:none;display:flex;flex-direction:column;gap:clamp(.3rem,.5vw,.45rem)}
.FT-lk{font-size:clamp(.68rem,.8vw,.75rem);color:var(--g5);transition:color .3s;position:relative;display:inline-block;width:fit-content}.FT-lk:hover{color:var(--lm)}.FT-lk::after{content:'';position:absolute;bottom:-1px;left:0;width:0;height:1px;background:var(--lm);transition:width .3s var(--eo)}.FT-lk:hover::after{width:100%}
.FT-ci{display:flex;align-items:flex-start;gap:.4rem;margin-bottom:clamp(.4rem,.6vw,.5rem)}
.FT-cic{font-size:.72rem;margin-top:.1rem;color:var(--lm)}.FT-cit{font-size:clamp(.68rem,.8vw,.75rem);color:var(--g5);line-height:1.45}
.FT-b{max-width:1400px;margin:0 auto;padding:clamp(1rem,1.5vw,1.3rem) clamp(1.5rem,3vw,3rem);border-top:1px solid var(--g8);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.6rem}
.FT-cp{font-size:clamp(.55rem,.65vw,.6rem);color:var(--g6)}
.FT-bl{display:flex;gap:clamp(.8rem,1.5vw,1.2rem)}
.FT-blk{font-size:clamp(.55rem,.65vw,.6rem);color:var(--g6);transition:color .3s}.FT-blk:hover{color:var(--lm)}

.BTT{position:fixed;bottom:clamp(1.2rem,2.5vw,1.8rem);right:clamp(1.2rem,2.5vw,1.8rem);width:40px;height:40px;border-radius:50%;background:var(--bg2);border:1px solid var(--g7);color:var(--lm);font-size:.9rem;display:flex;align-items:center;justify-content:center;z-index:100;opacity:0;transform:translateY(15px);transition:all .4s var(--eo);pointer-events:none}
.BTT.on{opacity:1;transform:translateY(0);pointer-events:auto}.BTT:hover{background:var(--lm);color:var(--bg);border-color:var(--lm);box-shadow:0 0 18px var(--lgm);transform:translateY(-3px)}
  `}</style>
);

/* HOOKS */
const useR = (t=.15)=>{const r=useRef(null);const[v,s]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){s(true);o.disconnect()}},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect()},[t]);return[r,v]};
const AC=({end,s="",d=2200})=>{const[c,sC]=useState(0);const r=useRef(null);const st=useRef(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!st.current){st.current=true;const t0=performance.now();const go=n=>{const p=Math.min((n-t0)/d,1);sC(Math.floor((1-Math.pow(1-p,4))*end));if(p<1)requestAnimationFrame(go)};requestAnimationFrame(go)}},{threshold:.3});if(r.current)o.observe(r.current);return()=>o.disconnect()},[end,d]);return <span ref={r}>{c}{s}</span>};

/* PRELOADER */
const PL=({onDone})=>{const[p,sP]=useState(0);const[d,sD]=useState(false);useEffect(()=>{[[30,200],[55,500],[78,900],[92,1300],[100,1600]].forEach(([t,dl])=>setTimeout(()=>sP(t),dl));setTimeout(()=>{sD(true);setTimeout(()=>onDone?.(),600)},2200)},[]);const w1="FORGE",w2="FITNESS";return(<div className={`PL ${d?"dn":""}`}><div className="PL-logo">{w1.split("").map((c,i)=><span key={`a${i}`} className="lt" style={{animationDelay:`${i*.06}s`,color:"var(--wh)"}}>{c}</span>)}<span style={{display:"inline-block",width:".25em"}}/>{w2.split("").map((c,i)=><span key={`b${i}`} className="lt" style={{animationDelay:`${(w1.length+i)*.06}s`,color:"var(--lm)"}}>{c}</span>)}</div><div className="PL-bar"><div className="PL-fill" style={{width:`${p}%`}}/></div><div className="PL-tag">Forjá tu mejor versión</div></div>)};

/* NAVBAR */
const Nav=()=>{const[sc,sS]=useState(false);const[op,sO]=useState(false);useEffect(()=>{const f=()=>sS(window.scrollY>50);window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f)},[]);useEffect(()=>{document.body.style.overflow=op?"hidden":"";return()=>{document.body.style.overflow=""}},[op]);const it=[{l:"Programas",h:"#programas"},{l:"Coaches",h:"#coaches"},{l:"Horarios",h:"#horarios"},{l:"Planes",h:"#planes"},{l:"Contacto",h:"#contacto"}];return(<><nav className={`N ${sc?"sc":""}`}><a href="#" className="N-logo"><div className="N-hex"><span>F</span></div>FORGE</a><ul className="NL">{it.map(i=><li key={i.l}><a href={i.h} className="nl">{i.l}</a></li>)}<li><a href="#join" className="nc">Empezar</a></li></ul><button className={`BG ${op?"op":""}`} onClick={()=>sO(!op)} aria-label="Menu"><span/><span/><span/></button></nav><div className={`MM ${op?"op":""}`}><ul className="ML">{it.map((x,i)=><li key={x.l} className="MI"><a href={x.h} className="ml" style={{transitionDelay:op?`${i*.07}s`:"0s"}} onClick={()=>sO(false)}>{x.l}<span className="ln">0{i+1}</span></a></li>)}</ul><div className="MF"><a href="#join" className="mc" onClick={()=>sO(false)}>Reservá Tu Clase Gratis</a><div className="mi"><span>Buenos Aires, ARG</span><span>@forgefitness</span></div></div></div></>)};

/* HERO */
const Hero=()=>{const[vl,sV]=useState(false);return(<section className="H" id="hero"><div className="H-v"><video autoPlay muted loop playsInline onLoadedData={()=>sV(true)} style={{opacity:vl?1:0,transition:"opacity 1.5s"}}><source src="https://cdn.coverr.co/videos/coverr-a-man-working-out-1749/1080p.mp4" type="video/mp4"/></video><div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 40%,rgba(200,247,49,.06),transparent 60%),var(--bg)",opacity:vl?0:1,transition:"opacity 1.5s"}}/></div><div className="H-o1"/><div className="H-o2"/><div className="H-c"><div className="H-ey"><span className="H-eyl"/>Gym Boutique Premium — Buenos Aires<span className="H-eyl"/></div><h1 className="H-t"><span className="H-tl"><span className="H-ti">FORGE</span></span><span className="H-tl"><span className="H-ti">YOUR BODY</span></span></h1><p className="H-sub">Entrenamiento de élite en un espacio diseñado para quienes buscan resultados reales. Sin excusas, sin límites.</p><div className="H-btns"><button className="hb hbp">Empezar Ahora</button><button className="hb hbo">Ver Programas</button></div></div><div className="H-si H-sl">Est. 2024 — Buenos Aires</div><div className="H-si H-sr">No Pain, No Gain</div><div className="H-sc"><span className="H-sct">Scroll</span><div className="H-scl"/></div><div className="H-st">{[{v:"500+",l:"Miembros Activos"},{v:"50+",l:"Clases / Semana"},{v:"15",l:"Coaches Elite"},{v:"98%",l:"Satisfacción"}].map((s,i)=><div key={i} className="H-s"><div className="H-sv">{s.v}</div><div className="H-sl2">{s.l}</div></div>)}</div></section>)};

/* TICKER */
const Tk=({items,speed=28,reverse=false,lime=false,sep="dot"})=>{const d=[...items,...items];return(<div className={`TK ${lime?"lm":""}`}><div className={`TK-t ${reverse?"rv":""}`} style={{"--spd":`${speed}s`}}>{d.map((t,i)=><div key={i} className="ti">{sep==="star"?<span className="tst">✦</span>:<span className="ts"/>}<span className="tt">{t}</span></div>)}</div></div>)};

/* DIFF */
const Diff=()=>{const[hr,hv]=useR();const[gr,gv]=useR(.1);const[cr,cv]=useR(.2);const cards=[{n:"01",i:"🔥",t:"Clases de 45 Min",d:"Entrenamientos intensos diseñados para maximizar resultados en menos tiempo."},{n:"02",i:"🎯",t:"Coaching 1:1",d:"Plan personalizado. Coaches que te guían y empujan a tu máximo potencial."},{n:"03",i:"⚡",t:"Tecnología Integrada",d:"Heart rate tracking, métricas de progreso y datos que impulsan resultados."},{n:"04",i:"🏗️",t:"Equipamiento Premium",d:"Lo último en máquinas y equipamiento funcional para atletas exigentes."},{n:"05",i:"🧬",t:"Recovery Zone",d:"Sauna, crioterapia y stretching. La recuperación es clave."},{n:"06",i:"👥",t:"Comunidad Elite",d:"Eventos, challenges mensuales y una red de personas con tu visión."}];return(<section className="DF"><div className="SC"><div ref={hr} className={`rv ${hv?"v":""}`}><div className="ey"><span className="eyl"/>Por qué elegirnos</div><h2 className="st" style={{maxWidth:650}}>NO SOMOS UN GYM<br/><span>SOMOS TU VENTAJA</span></h2></div><div ref={gr} className="dg">{cards.map((c,i)=><div key={c.n} className="dc" style={{opacity:gv?1:0,transform:gv?"translateY(0)":"translateY(25px)",transition:`all .6s var(--eo) ${gv?i*.08:0}s`}}><div className="dn">{c.n}</div><div className="di">{c.i}</div><h3 className="dt">{c.t}</h3><p className="dd">{c.d}</p></div>)}</div><div ref={cr} className={`CN rv ${cv?"v":""}`}>{[{v:500,s:"+",l:"Miembros"},{v:12,s:"K",l:"Clases Dictadas"},{v:98,s:"%",l:"Retención"},{v:0,s:"",l:"Rating",raw:"4.9"}].map((c,i)=><div key={i} className="cn"><div className="cv">{c.raw||<AC end={c.v} s={c.s}/>}</div><div className="cl">{c.l}</div></div>)}</div></div></section>)};

/* PROGRAMS */
const pD=[{name:"CrossFit",icon:"🏋️",tag:"Más Popular",int:5,dur:"45 min",cal:"600-800",desc:"Funcional de alta intensidad: gimnasia, halterofilia y cardio.",img:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"},{name:"Boxing",icon:"🥊",tag:"Nuevo",int:5,dur:"50 min",cal:"700-900",desc:"Técnica real combinada con cardio explosivo.",img:"https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80"},{name:"HIIT Power",icon:"⚡",tag:"Intenso",int:5,dur:"35 min",cal:"500-700",desc:"Intervalos de máxima intensidad. El método más eficiente.",img:"https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80"},{name:"Strength Lab",icon:"💪",tag:null,int:4,dur:"55 min",cal:"400-600",desc:"Fuerza periodizada. Masa muscular inteligente.",img:"https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"},{name:"Yoga Flow",icon:"🧘",tag:null,int:2,dur:"60 min",cal:"200-350",desc:"Flexibilidad, equilibrio y fuerza mental.",img:"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"},{name:"Functional",icon:"🔥",tag:null,int:4,dur:"45 min",cal:"450-650",desc:"Kettlebells, TRX y peso corporal. Resultados reales.",img:"https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80"}];
const Progs=()=>{const[hr,hv]=useR();const[gr,gv]=useR(.05);return(<section className="PR" id="programas"><div className="SC"><div ref={hr} className={`ph rv ${hv?"v":""}`}><div><div className="ey"><span className="eyl"/>Nuestros Programas</div><h2 className="st">ELEGÍ TU<br/><span>DISCIPLINA</span></h2></div><p className="ps">+50 clases semanales diseñadas por coaches certificados.</p></div><div ref={gr} className="pg">{pD.map((p,i)=><div key={p.name} className="pc" style={{opacity:gv?1:0,transform:gv?"translateY(0)":"translateY(40px)",transition:`all .7s var(--eo) ${gv?i*.1:0}s`}}><div className="pc-bg" style={{backgroundImage:`url(${p.img})`}}/><div className="pc-ov"/><div className="pc-nm">{String(i+1).padStart(2,"0")}</div>{p.tag&&<div className="pc-tg"><span className="pc-td"/>{p.tag}</div>}<div className="pc-ct"><div className="pc-ic">{p.icon}</div><h3 className="pc-n">{p.name}</h3><div className="pc-int">{[1,2,3,4,5].map(l=><div key={l} className={`ib ${l<=p.int?"on":""}`}/>)}<span className="il">{p.int>=5?"Max":p.int>=4?"Alta":"Media"}</span></div><p className="pc-d">{p.desc}</p><div className="pc-ft"><div className="pc-m"><span className="pm">⏱ {p.dur}</span><span className="pm">🔥 {p.cal} cal</span></div><span className="pc-cta">Ver más →</span></div></div><div className="pc-ac"/></div>)}</div></div></section>)};

/* COACHES */
const cD=[{name:"Marcos Ruiz",role:"Head Coach",spec:"CrossFit",bio:"10 años de experiencia. Ex competidor CrossFit Games Regional.",img:"https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=500&q=80",stats:{e:"10+",a:"200+",c:"8"}},{name:"Valentina López",role:"Boxing Coach",spec:"Boxing",bio:"Campeona nacional amateur. Técnica pura + HIIT explosivo.",img:"https://images.unsplash.com/photo-1609899464926-209bc2e0f751?w=500&q=80",stats:{e:"7",a:"150+",c:"5"}},{name:"Nicolás Ferro",role:"Strength Coach",spec:"Strength",bio:"Powerlifting certificado. Especialista en periodización.",img:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80",stats:{e:"8",a:"180+",c:"6"}},{name:"Camila Duarte",role:"Yoga & Recovery",spec:"Yoga",bio:"Vinyasa y Yin Yoga. Movilidad y recuperación activa.",img:"https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&q=80",stats:{e:"6",a:"120+",c:"7"}}];
const Coaches=()=>{const[hr,hv]=useR();const[gr,gv]=useR(.05);return(<section className="CO" id="coaches"><div className="SC"><div ref={hr} className={`ph rv ${hv?"v":""}`}><div><div className="ey"><span className="eyl"/>El Equipo</div><h2 className="st">QUIENES TE<br/><span>ENTRENAN</span></h2></div><p className="ps" style={{maxWidth:320}}>Coaches certificados con experiencia competitiva real.</p></div><div ref={gr} className="cg">{cD.map((c,i)=><div key={c.name} className="cc" style={{opacity:gv?1:0,transform:gv?"translateY(0)":"translateY(40px)",transition:`all .7s var(--eo) ${gv?i*.12:0}s`}}><div className="cc-tb"/><div className="cc-ph" style={{backgroundImage:`url(${c.img})`}}/><div className="cc-gr"/><div className="cc-nm">{String(i+1).padStart(2,"0")}</div><div className="cc-ct"><div className="cc-tg"><span className="cc-td"/>{c.spec}</div><h3 className="cc-n">{c.name}</h3><p className="cc-r">{c.role}</p><p className="cc-b">{c.bio}</p><div className="cc-s"><div><div className="cc-sv">{c.stats.e}</div><div className="cc-sl">Años</div></div><div><div className="cc-sv">{c.stats.a}</div><div className="cc-sl">Atletas</div></div><div><div className="cc-sv">{c.stats.c}</div><div className="cc-sl">Certif.</div></div></div></div></div>)}</div></div></section>)};

/* SCHEDULE */
const sD={LUN:[{t:"07:00",n:"CrossFit",i:"🏋️",c:"Marcos Ruiz",d:"45 min",sp:4,tot:20},{t:"08:00",n:"Yoga Flow",i:"🧘",c:"Camila Duarte",d:"60 min",sp:8,tot:15},{t:"09:30",n:"HIIT Power",i:"⚡",c:"Marcos Ruiz",d:"35 min",sp:2,tot:20},{t:"17:30",n:"Boxing",i:"🥊",c:"Valentina López",d:"50 min",sp:0,tot:18},{t:"18:30",n:"CrossFit",i:"🏋️",c:"Marcos Ruiz",d:"45 min",sp:6,tot:20},{t:"19:30",n:"Functional",i:"🔥",c:"Nicolás Ferro",d:"45 min",sp:12,tot:20}],MAR:[{t:"07:00",n:"HIIT Power",i:"⚡",c:"Marcos Ruiz",d:"35 min",sp:7,tot:20},{t:"09:30",n:"Boxing",i:"🥊",c:"Valentina López",d:"50 min",sp:3,tot:18},{t:"17:30",n:"CrossFit",i:"🏋️",c:"Marcos Ruiz",d:"45 min",sp:1,tot:20},{t:"18:30",n:"Functional",i:"🔥",c:"Nicolás Ferro",d:"45 min",sp:9,tot:20}],MIÉ:[{t:"07:00",n:"CrossFit",i:"🏋️",c:"Marcos Ruiz",d:"45 min",sp:6,tot:20},{t:"08:00",n:"Yoga Flow",i:"🧘",c:"Camila Duarte",d:"60 min",sp:10,tot:15},{t:"17:30",n:"Boxing",i:"🥊",c:"Valentina López",d:"50 min",sp:2,tot:18},{t:"18:30",n:"CrossFit",i:"🏋️",c:"Marcos Ruiz",d:"45 min",sp:0,tot:20},{t:"19:30",n:"Functional",i:"🔥",c:"Nicolás Ferro",d:"45 min",sp:14,tot:20}],JUE:[{t:"07:00",n:"HIIT Power",i:"⚡",c:"Marcos Ruiz",d:"35 min",sp:9,tot:20},{t:"08:00",n:"Boxing",i:"🥊",c:"Valentina López",d:"50 min",sp:6,tot:18},{t:"17:30",n:"CrossFit",i:"🏋️",c:"Marcos Ruiz",d:"45 min",sp:3,tot:20},{t:"19:30",n:"Boxing",i:"🥊",c:"Valentina López",d:"50 min",sp:1,tot:18}],VIE:[{t:"07:00",n:"CrossFit",i:"🏋️",c:"Marcos Ruiz",d:"45 min",sp:8,tot:20},{t:"09:30",n:"HIIT Power",i:"⚡",c:"Marcos Ruiz",d:"35 min",sp:3,tot:20},{t:"17:30",n:"Boxing",i:"🥊",c:"Valentina López",d:"50 min",sp:5,tot:18}],SÁB:[{t:"08:00",n:"CrossFit Open",i:"🏋️",c:"Marcos Ruiz",d:"60 min",sp:5,tot:25},{t:"09:30",n:"Boxing",i:"🥊",c:"Valentina López",d:"50 min",sp:7,tot:18},{t:"10:30",n:"Yoga Flow",i:"🧘",c:"Camila Duarte",d:"60 min",sp:9,tot:15}]};
const Schedule=()=>{const[day,sDay]=useState("LUN");const[key,sK]=useState(0);const[hr,hv]=useR();const[tr,tv]=useR(.05);const cls=sD[day]||[];return(<section className="SD" id="horarios"><div className="SC" style={{maxWidth:1200}}><div ref={hr} className={`sd-h rv ${hv?"v":""}`}><div className="ey"><span className="eyl"/>Horarios<span className="eyl"/></div><h2 className="st">ENCONTRÁ TU<br/><span>HORARIO</span></h2><p className="sd-sub">+50 clases semanales. Reservá tu lugar con un click.</p></div><div className="tbs">{["LUN","MAR","MIÉ","JUE","VIE","SÁB"].map(d=><button key={d} className={`tb ${day===d?"on":""}`} onClick={()=>{sDay(d);sK(k=>k+1)}}><span className="tdn">{d}</span></button>)}</div><div ref={tr} className={`stb rv ${tv?"v":""}`} key={key}><div className="sth"><span>Hora</span><span>Clase</span><span>Duración</span><span>Cupos</span><span></span></div>{cls.map((c,idx)=>{const fl=c.sp===0;const lo=c.sp>0&&c.sp/c.tot<=.15;const fd=Math.round((c.sp/c.tot)*5);return(<div key={`${day}-${idx}`} className="sr" style={{animation:`ri .4s var(--eo) ${idx*.05}s both`}}><span className="sr-t">{c.t}</span><div><span className="sr-n"><span>{c.i}</span> {c.n}</span><span className="sr-c">con {c.c}</span></div><span className="sr-d">{c.d}</span><div className="sr-sp"><div className="spd">{[0,1,2,3,4].map(j=><div key={j} className={`sd2 ${j<fd?(lo?"wn":"on"):""}`}/>)}</div><span className={`spt ${lo||fl?"lo":""}`}>{fl?"Lleno":`${c.sp} left`}</span></div><button className={`sr-bk ${fl?"fl":""}`}>{fl?"Espera":"Reservar"}</button></div>)})}</div></div></section>)};

/* PRICING */
const prD=[{tier:"Starter",name:"Essentials",desc:"Para quienes arrancan su camino fitness.",mo:25000,yr:20000,feat:false,fts:[{t:"8 clases por mes",y:true},{t:"Zona musculación",y:true},{t:"App con seguimiento",y:true},{t:"1 evaluación corporal",y:true},{t:"Clases premium",y:false},{t:"Coaching personalizado",y:false},{t:"Recovery Zone",y:false}]},{tier:"Más Popular",name:"Pro",desc:"Acceso completo para resultados reales.",mo:45000,yr:36000,feat:true,fts:[{t:"Clases ilimitadas",y:true},{t:"Zona musculación",y:true},{t:"App con seguimiento",y:true},{t:"Evaluaciones mensuales",y:true},{t:"Clases premium",y:true},{t:"Coaching personalizado",y:true},{t:"Recovery Zone",y:false}]},{tier:"Premium",name:"Elite",desc:"La experiencia FORGE completa. Sin límites.",mo:65000,yr:52000,feat:false,fts:[{t:"Clases ilimitadas",y:true},{t:"Musculación 24/7",y:true},{t:"App avanzada",y:true},{t:"Evaluaciones semanales",y:true},{t:"Clases premium",y:true},{t:"Coaching 1:1",y:true},{t:"Recovery Zone ilimitada",y:true}]}];
const fm=n=>n.toLocaleString("es-AR");
const Pricing=()=>{const[yr,sY]=useState(false);const[hr,hv]=useR();const[gr,gv]=useR(.05);const[br,bv]=useR();return(<section className="PP" id="planes"><div className="po po1"/><div className="po po2"/><div className="SC" style={{maxWidth:1200}}><div ref={hr} className={`pp-h rv ${hv?"v":""}`}><div className="ey"><span className="eyl"/>Planes & Precios<span className="eyl"/></div><h2 className="st">INVERTÍ EN<br/><span>VOS</span></h2><p className="pp-sub">Planes flexibles. Sin contratos. Cancelá cuando quieras.</p></div><div className="bl"><span className={`bll ${!yr?"on":""}`}>Mensual</span><div className={`tg ${yr?"yr":""}`} onClick={()=>sY(!yr)}><div className="tgt"/></div><span className={`bll ${yr?"on":""}`}>Anual</span><span className={`blb ${yr?"on":""}`}>Hasta 20% OFF</span></div><div ref={gr} className="ppg">{prD.map((p,i)=>{const pr=yr?p.yr:p.mo;const sv=yr?Math.round((1-p.yr/p.mo)*100):0;return(<div key={p.name} className={`ppc ${p.feat?"ft":"bs"}`} style={{opacity:gv?1:0,transform:gv?"translateY(0)":"translateY(40px)",transition:`all .7s var(--eo) ${gv?i*.12:0}s`}}>{p.feat&&<div className="ppb">Recomendado</div>}<div className="ppt">{p.tier}</div><h3 className="ppn">{p.name}</h3><p className="ppd">{p.desc}</p><div className="ppp"><span className="ppc2">$</span><span className="ppa">{fm(pr)}</span><span className="pper">/mes</span></div><div className="ppor">{yr?<><span style={{textDecoration:"line-through"}}>${fm(p.mo)}</span><span style={{marginLeft:".4rem",color:"var(--lm)",fontWeight:700,textDecoration:"none",fontSize:".65rem"}}>Ahorrás {sv}%</span></>:"\u00A0"}</div><div className="ppdv"/><ul className="ppfl">{p.fts.map((f,j)=><li key={j} className={`ppf ${f.y?"":"off"}`}><span className={`fck ${f.y?"y":"n"}`}>{f.y?"✓":"—"}</span>{f.t}</li>)}</ul><button className={`ppct ${p.feat?"pri":"ol"}`}>{p.feat?"Empezar Ahora":"Elegir Plan"}</button></div>)})}</div><div ref={br} className={`gu rv ${bv?"v":""}`}>{[["🛡️","Garantía 7 días"],["🔓","Sin permanencia"],["💳","Pagá en cuotas"],["⚡","Activación inmediata"]].map(([ic,tx],i)=><div key={i} className="gui"><span>{ic}</span><span>{tx}</span></div>)}</div></div></section>)};

/* TESTIMONIALS */
const tD=[{name:"Martín Aguirre",det:"2 años · Plan Pro",tag:"CrossFit",q:"Probé 5 gyms antes de FORGE. La diferencia está en los coaches: te corrigen, te empujan y celebran cada PR. Bajé 12kg.",img:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&q=80"},{name:"Lucía Fernández",det:"8 meses · Plan Elite",tag:"Boxing",q:"El boxing con Valentina es adictivo. Lo mejor es la comunidad: acá no te juzgan, te bancan.",img:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"},{name:"Santiago Morales",det:"1 año · Plan Pro",tag:"Strength",q:"Vine buscando masa muscular y me fui con disciplina y constancia. Nico sabe periodizar para resultados reales.",img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"},{name:"Carolina Ruiz",det:"6 meses · Essentials",tag:"Yoga",q:"Empecé con yoga pensando que era solo estirar. Camila me mostró que es una disciplina completa.",img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80"}];
const Testi=()=>{const[cur,sC]=useState(0);const tot=tD.length;const ir=useRef(null);const go=useCallback(n=>sC((n+tot)%tot),[tot]);const nx=useCallback(()=>go(cur+1),[cur,go]);const pv=useCallback(()=>go(cur-1),[cur,go]);useEffect(()=>{ir.current=setInterval(nx,6000);return()=>clearInterval(ir.current)},[nx]);const rs=()=>{clearInterval(ir.current);ir.current=setInterval(nx,6000)};const[hr,hv]=useR();const[cr,cv]=useR(.05);return(<section className="TE"><div className="SC" style={{maxWidth:1200}}><div ref={hr} className={`te-h rv ${hv?"v":""}`}><div className="ey"><span className="eyl"/>Testimonios<span className="eyl"/></div><h2 className="st">LO QUE DICEN<br/><span>NUESTROS ATLETAS</span></h2><div className="te-r"><div className="te-rs">{"★★★★★".split("").map((s,i)=><span key={i}>{s}</span>)}</div><span className="te-rt"><strong>4.9/5</strong> — +200 reseñas</span></div></div><div ref={cr} className={`rv ${cv?"v":""}`}><div className="cw"><div className="ct2" style={{transform:`translateX(-${cur*100}%)`}}>{tD.map((t,i)=><div key={i} className="cs"><div className="tc"><div className="tc-aw"><img src={t.img} alt={t.name} className="tc-av"/><div className="tc-ab"/><div className="tc-ag"/></div><div><div className="tc-qm">"</div><p className="tc-qt">{t.q}</p><div className="tc-ar"><div><div className="tc-an">{t.name}</div><div className="tc-ad">{t.det}</div></div><div className="tc-as">{"★★★★★".split("").map((s,j)=><span key={j}>{s}</span>)}</div><span className="tc-at">{t.tag}</span></div></div></div></div>)}</div></div><div className="ccr"><button className="cb" onClick={()=>{pv();rs()}}>←</button><div className="cds">{tD.map((_,i)=><button key={i} className={`cd ${i===cur?"on":""}`} onClick={()=>{go(i);rs()}}/>)}</div><button className="cb" onClick={()=>{nx();rs()}}>→</button></div></div></div></section>)};

/* EXPERIENCE */
const Exp=()=>{const r=useRef(null);const ir=useRef(null);useEffect(()=>{const fn=()=>{if(!r.current||!ir.current)return;const rc=r.current.getBoundingClientRect();const wh=window.innerHeight;if(rc.bottom<0||rc.top>wh)return;const p=(wh-rc.top)/(wh+rc.height);ir.current.style.transform=`translateY(${(p-.5)*40}px)`};window.addEventListener("scroll",fn,{passive:true});fn();return()=>window.removeEventListener("scroll",fn)},[]);const[cr,cv]=useR(.1);return(<section className="EX" ref={r}><div className="EX-bg"><div className="EX-img" ref={ir}/></div><div className="EX-ov"/><div ref={cr} className={`EX-ct rv ${cv?"v":""}`}><div><div className="ey"><span className="eyl"/>La Experiencia</div><h2 className="st" style={{fontSize:"clamp(2.8rem,6.5vw,5.5rem)"}}>UN ESPACIO<br/>DISEÑADO PARA<br/><span>RENDIR</span></h2><p className="EX-d">Cada detalle está pensado para potenciar tu entrenamiento. Acústica, temperatura, iluminación — todo calibrado.</p><div className="EX-p">{["1.200 m²","Equipamiento Rogue","Iluminación dinámica","Sonido envolvente","Recovery Zone","Vestuarios premium"].map(f=><span key={f} className="ep"><span className="epd"/>{f}</span>)}</div></div><div className="EX-ss">{[["📐","1.200 m²","Superficie"],["🌡️","22°C","Climatización"],["🔊","JBL Pro","Sonido"],["💡","DMX","Iluminación"]].map(([ic,v,l],i)=><div key={i} className="esc" style={{opacity:cv?1:0,transform:cv?"translateY(0)":"translateY(20px)",transition:`all .6s var(--eo) ${cv?i*.1:0}s`}}><div style={{fontSize:"clamp(1rem,1.5vw,1.3rem)",marginBottom:".35rem"}}>{ic}</div><div className="esv">{v}</div><div className="esl">{l}</div></div>)}</div></div></section>)};

/* GALLERY */
const gD=[{src:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",lb:"Zona Funcional",sp:"gw"},{src:"https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",lb:"Peso Libre",sp:""},{src:"https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80",lb:"Cardio Zone",sp:""},{src:"https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&q=80",lb:"Boxing Ring",sp:""},{src:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",lb:"Recovery",sp:""},{src:"https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80",lb:"Entrenamiento",sp:"gw"}];
const Gallery=()=>{const[hr,hv]=useR();const[gr,gv]=useR(.05);return(<section className="GA"><div className="SC"><div ref={hr} className={`GA-h rv ${hv?"v":""}`}><div className="ey"><span className="eyl"/>Nuestro Espacio<span className="eyl"/></div><h2 className="st">CONOCÉ EL<br/><span>AMBIENTE</span></h2></div><div ref={gr} className="GA-g">{gD.map((g,i)=><div key={i} className={`gi ${g.sp}`} style={{opacity:gv?1:0,transform:gv?"scale(1)":"scale(.97)",transition:`all .6s var(--eo) ${gv?i*.07:0}s`}}><img src={g.src} alt={g.lb} loading="lazy"/><div className="gi-o"><span className="gi-l">{g.lb}</span></div></div>)}</div></div></section>)};

/* CTA */
const CTA=()=>{const[r,v]=useR(.1);return(<section className="CT" id="contacto"><div className="CT-bg"><div className="CT-gr"/><div className="CT-o CT-o1"/><div className="CT-o CT-o2"/><div className="CT-gl"/></div><div ref={r} className={`CT-ct rv ${v?"v":""}`}><div className="ey" style={{justifyContent:"center"}}><span className="eyl"/>Tu transformación empieza hoy<span className="eyl"/></div><h2 className="CT-t">DEJÁ DE<br/><span className="CT-tl">PENSARLO</span></h2><p className="CT-sub">Tu primera clase es gratis. Sin compromiso, sin letra chica. Vení, entrená y sentí la diferencia FORGE.</p><div className="CT-bs"><button className="CT-bm">⚡ Reservá Tu Clase Gratis</button><button className="CT-bs2">Hablar por WhatsApp</button></div><div className="CT-tr">{[["🛡️","Sin compromiso"],["⏱️","Reservá en 30 seg"],["🎯","+500 ya lo hicieron"]].map(([ic,tx],i)=><span key={i} className="CT-ti"><span>{ic}</span>{tx}</span>)}</div></div></section>)};

/* FOOTER */
const Foot=()=>{const[r,v]=useR(.05);return(<footer className="FT"><div ref={r} className={`rv ${v?"v":""}`}><div className="FT-m"><div><div className="FT-logo"><div className="FT-hex"><span>F</span></div>FORGE <span style={{color:"var(--lm)"}}>FITNESS</span></div><p className="FT-d">Gym boutique premium en Buenos Aires. Entrenamiento de élite, comunidad real, resultados medibles.</p><div className="FT-s">{["📷","▶️","💬","🎵"].map((ic,i)=><button key={i} className="FT-sb">{ic}</button>)}</div></div><div><h4 className="FT-ct">Navegación</h4><ul className="FT-l">{["Programas","Coaches","Horarios","Planes","Galería","Contacto"].map(l=><li key={l}><a href={`#${l.toLowerCase()}`} className="FT-lk">{l}</a></li>)}</ul></div><div><h4 className="FT-ct">Programas</h4><ul className="FT-l">{["CrossFit","Boxing","HIIT Power","Strength Lab","Yoga Flow","Functional"].map(p=><li key={p}><a href="#programas" className="FT-lk">{p}</a></li>)}</ul></div><div><h4 className="FT-ct">Contacto</h4>{[["📍","Av. del Libertador 4980\nPalermo, Buenos Aires"],["📞","+54 11 5555-0000"],["✉️","info@forgefitness.com"],["🕐","Lun-Vie: 6:00–22:00\nSáb: 8:00–14:00"]].map(([ic,tx],i)=><div key={i} className="FT-ci"><span className="FT-cic">{ic}</span><span className="FT-cit" style={{whiteSpace:"pre-line"}}>{tx}</span></div>)}</div></div><div className="FT-b"><span className="FT-cp">© 2024 FORGE FITNESS. Todos los derechos reservados.</span><div className="FT-bl">{["Términos","Privacidad","Cookies"].map(l=><a key={l} href="#" className="FT-blk">{l}</a>)}</div></div></div></footer>)};

/* BACK TO TOP */
const BTT=()=>{const[s,sS]=useState(false);useEffect(()=>{const f=()=>sS(window.scrollY>500);window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f)},[]);return <button className={`BTT ${s?"on":""}`} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>↑</button>};

/* ═══ ROOT ═══ */
export default function ForgeFitness(){
  const[loaded,sL]=useState(false);
  const tkM=["PUSH YOUR LIMITS","NO EXCUSES","FORGE YOUR BODY","TRAIN INSANE","BECOME UNSTOPPABLE","EVERY REP COUNTS","PAIN IS FUEL","RISE & GRIND"];
  const tkC=["CROSSFIT","BOXING","HIIT","YOGA FLOW","STRENGTH","FUNCTIONAL","SPINNING","CALISTHENICS"];
  const tkR=["★★★★★ INCREÍBLE","LOS MEJORES COACHES","★★★★★ CAMBIÓ MI VIDA","VALE CADA PESO","★★★★★ RESULTADOS REALES"];
  const tkB=["GOOGLE REVIEWS 4.9","TOP 1 GYM BOUTIQUE","500+ MIEMBROS","98% RETENCIÓN","CERTIFICACIÓN INTERNACIONAL"];

  return(<>
    <FontLoader/><S/>
    <PL onDone={()=>sL(true)}/>
    <Nav/>
    <div style={{opacity:loaded?1:0,transition:"opacity .8s ease .2s"}}>
      <Hero/>
      <Tk items={tkM} speed={35} sep="star"/>
      <Diff/>
      <Tk items={tkC} speed={25} reverse lime/>
      <Progs/>
      <Coaches/>
      <Schedule/>
      <Pricing/>
      <Testi/>
      <Tk items={tkR} speed={32}/>
      <Tk items={tkB} speed={26} reverse lime/>
      <Exp/>
      <Gallery/>
      <CTA/>
      <Foot/>
    </div>
    <BTT/>
    <div className="G"/>
  </>);
}
