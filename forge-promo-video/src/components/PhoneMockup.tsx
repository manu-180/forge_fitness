import React from 'react';
import { LIME, BG } from '../constants';
import { BEBAS, INTER } from '../fonts';

// Stylized phone mockup with an inline CSS replica of the Forge Fitness site.
// Scroll progress 0→1 reveals sections top to bottom.
export const PhoneMockup: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const W = 370;
  const H = 800;
  const BR = 46;
  const INSET = 8;
  const SW = W - INSET * 2; // screen width
  const SH = H - INSET * 2; // screen height

  const CONTENT_H = 2600;
  const maxScroll = CONTENT_H - SH;
  const scrollY = -scrollProgress * maxScroll;

  return (
    <div
      style={{
        width: W,
        height: H,
        background: '#1c1c1e',
        borderRadius: BR,
        border: '1.5px solid rgba(255,255,255,0.13)',
        boxShadow: '0 60px 140px rgba(0,0,0,0.95), inset 0 0 0 1px rgba(255,255,255,0.04)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Dynamic island */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 110,
          height: 28,
          background: '#000',
          borderRadius: 14,
          zIndex: 30,
        }}
      />

      {/* Screen area */}
      <div
        style={{
          position: 'absolute',
          top: INSET,
          left: INSET,
          width: SW,
          height: SH,
          borderRadius: BR - INSET,
          overflow: 'hidden',
          background: BG,
        }}
      >
        {/* Scrolling content */}
        <div
          style={{
            transform: `translateY(${scrollY}px)`,
            width: SW,
          }}
        >
          {/* ── HERO SECTION ────────────────────────── */}
          <div
            style={{
              width: SW,
              height: 440,
              background: '#080808',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '0 18px 22px',
              overflow: 'hidden',
            }}
          >
            {/* Background gradient accent */}
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(ellipse at 80% 30%, rgba(204,255,0,0.07) 0%, transparent 65%)',
              }}
            />
            {/* Navbar */}
            <div
              style={{
                position: 'absolute',
                top: 52, left: 18, right: 18,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div
                  style={{
                    width: 26, height: 26,
                    background: LIME,
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <span style={{ color: '#000', fontWeight: 900, fontSize: 11, fontFamily: INTER }}>F</span>
                </div>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 13, fontFamily: INTER, letterSpacing: 2 }}>FORGE</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 20, height: 1.5, background: 'rgba(255,255,255,0.7)' }} />
                ))}
              </div>
            </div>
            {/* Eyebrow */}
            <div style={{ fontSize: 9, color: LIME, letterSpacing: 3, fontFamily: INTER, marginBottom: 5, fontWeight: 700 }}>
              GYM BOUTIQUE PREMIUM · PALERMO
            </div>
            {/* Title */}
            <div style={{ fontSize: 52, color: '#fff', fontFamily: BEBAS, lineHeight: 0.9, letterSpacing: 1 }}>FORGE</div>
            <div style={{ fontSize: 52, color: '#fff', fontFamily: BEBAS, lineHeight: 0.9, letterSpacing: 1 }}>YOUR BODY</div>
            {/* Subtitle */}
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', fontFamily: INTER, lineHeight: 1.5, marginTop: 9 }}>
              Entrenamiento de élite. Coaches certificados.{'\n'}Resultados reales. Sin excusas.
            </div>
            {/* CTA Button */}
            <div
              style={{
                marginTop: 14,
                display: 'inline-flex',
                alignSelf: 'flex-start',
                background: LIME,
                color: '#000',
                fontSize: 9,
                fontWeight: 900,
                fontFamily: INTER,
                padding: '7px 14px',
                borderRadius: 2,
                letterSpacing: 1.5,
              }}
            >
              PROBALO GRATIS →
            </div>
          </div>

          {/* ── TICKER STRIP ────────────────────────── */}
          <div
            style={{
              background: LIME,
              padding: '7px 0',
              display: 'flex',
              gap: 20,
              alignItems: 'center',
              paddingLeft: 12,
            }}
          >
            {['★ CROSSFIT', '★ BOXING', '★ HIIT', '★ YOGA', '★ STRENGTH', '★ FUNCTIONAL'].map((t) => (
              <span key={t} style={{ fontSize: 8, fontWeight: 900, color: '#000', whiteSpace: 'nowrap', fontFamily: INTER, letterSpacing: 2 }}>
                {t}
              </span>
            ))}
          </div>

          {/* ── DIFFERENTIATORS ─────────────────────── */}
          <div style={{ padding: '18px', background: '#0e0e0e' }}>
            <div style={{ fontSize: 9, color: LIME, letterSpacing: 3, fontFamily: INTER, marginBottom: 3, fontWeight: 700 }}>POR QUÉ FORGE</div>
            <div style={{ fontSize: 26, color: '#fff', fontFamily: BEBAS, lineHeight: 1, marginBottom: 12 }}>
              MÁS QUE UN GIMNASIO
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
              {[
                ['🔥', 'Clases 45 Min', 'Máxima intensidad'],
                ['🎯', 'Coaching 1:1', 'Plan personalizado'],
                ['⚡', 'Tech Integrada', 'Heart rate tracking'],
                ['🏗️', 'Equipo Premium', 'Marca Rogue'],
                ['🧬', 'Recovery Zone', 'Sauna + crioterapia'],
                ['👥', 'Comunidad Elite', 'Challenges mensuales'],
              ].map(([icon, title, sub]) => (
                <div
                  key={String(title)}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '0.5px solid rgba(255,255,255,0.09)',
                    padding: '9px 8px',
                    borderRadius: 4,
                  }}
                >
                  <div style={{ fontSize: 15, marginBottom: 3 }}>{icon}</div>
                  <div style={{ fontSize: 9, color: '#fff', fontFamily: INTER, fontWeight: 700, lineHeight: 1.3 }}>{title}</div>
                  <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.4)', fontFamily: INTER, marginTop: 1 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── PROGRAMS ────────────────────────────── */}
          <div style={{ padding: '18px', background: '#080808' }}>
            <div style={{ fontSize: 9, color: LIME, letterSpacing: 3, fontFamily: INTER, marginBottom: 3, fontWeight: 700 }}>PROGRAMAS</div>
            <div style={{ fontSize: 26, color: '#fff', fontFamily: BEBAS, lineHeight: 1, marginBottom: 12 }}>
              TU DISCIPLINA
            </div>
            {[
              { name: 'CrossFit', tag: 'Popular', cal: '600–800 kcal', icon: '🏋️', int: 5 },
              { name: 'Boxing', tag: 'Nuevo', cal: '700–900 kcal', icon: '🥊', int: 5 },
              { name: 'HIIT Power', tag: 'Intenso', cal: '500–700 kcal', icon: '⚡', int: 5 },
              { name: 'Strength Lab', tag: null, cal: '400–600 kcal', icon: '💪', int: 4 },
            ].map((p) => (
              <div
                key={p.name}
                style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: '0.5px solid rgba(255,255,255,0.07)',
                  borderRadius: 4,
                  padding: '9px 10px',
                  marginBottom: 6,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#fff', fontFamily: INTER, fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', fontFamily: INTER, marginTop: 1 }}>{p.cal}</div>
                </div>
                {p.tag && (
                  <div
                    style={{
                      fontSize: 7,
                      background: LIME,
                      color: '#000',
                      fontWeight: 900,
                      fontFamily: INTER,
                      padding: '3px 7px',
                      borderRadius: 2,
                      letterSpacing: 0.5,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.tag}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── PRICING ─────────────────────────────── */}
          <div style={{ padding: '18px', background: '#0e0e0e' }}>
            <div style={{ fontSize: 9, color: LIME, letterSpacing: 3, fontFamily: INTER, marginBottom: 3, fontWeight: 700 }}>PLANES</div>
            <div style={{ fontSize: 26, color: '#fff', fontFamily: BEBAS, lineHeight: 1, marginBottom: 12 }}>ELEGÍ TU PLAN</div>
            <div style={{ display: 'flex', gap: 7 }}>
              {[
                { name: 'Essentials', price: '$25K', feat: false },
                { name: 'Pro', price: '$45K', feat: true },
                { name: 'Elite', price: '$65K', feat: false },
              ].map((plan) => (
                <div
                  key={plan.name}
                  style={{
                    flex: 1,
                    background: plan.feat ? LIME : 'rgba(255,255,255,0.04)',
                    border: `0.5px solid ${plan.feat ? LIME : 'rgba(255,255,255,0.09)'}`,
                    borderRadius: 4,
                    padding: '10px 7px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 7, fontFamily: INTER, fontWeight: 700, color: plan.feat ? '#000' : 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>
                    {plan.name}
                  </div>
                  <div style={{ fontSize: 18, fontFamily: BEBAS, color: plan.feat ? '#000' : '#fff', marginTop: 4 }}>
                    {plan.price}
                  </div>
                  <div style={{ fontSize: 7, color: plan.feat ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.35)', fontFamily: INTER, marginTop: 2 }}>
                    /mes
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ─────────────────────────────────── */}
          <div style={{ padding: '24px 18px', background: BG, textAlign: 'center' }}>
            <div style={{ fontSize: 32, color: '#fff', fontFamily: BEBAS, lineHeight: 1 }}>EMPEZÁ</div>
            <div style={{ fontSize: 32, color: LIME, fontFamily: BEBAS, lineHeight: 1 }}>HOY MISMO</div>
            <div
              style={{
                marginTop: 12,
                display: 'inline-block',
                background: LIME,
                color: '#000',
                fontSize: 9,
                fontWeight: 900,
                fontFamily: INTER,
                padding: '9px 18px',
                borderRadius: 2,
                letterSpacing: 1.5,
              }}
            >
              RESERVAR CLASE GRATIS →
            </div>
            <div style={{ marginTop: 10, fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: INTER, letterSpacing: 1 }}>
              @forgefitness
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
