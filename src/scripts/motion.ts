// Scroll motion. The Projects scene is one pinned stage: MediGraph, then InfraSync.
// Without this script (or with reduced motion) the layers stack as ordinary sections.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const root = document.documentElement;
if (root.classList.contains('motion')) {
  gsap.registerPlugin(ScrollTrigger);
  hero();
  scene();
}

function hero() {
  const el = document.querySelector<HTMLElement>('.hero');
  const mark = document.querySelector<HTMLElement>('[data-mark]');
  if (!el) return;
  gsap
    .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.5, onUpdate: (s) => mark?.classList.toggle('show', s.progress > 0.5) } })
    .to(el.querySelectorAll('.film-wrap img'), { scale: 1.1, filter: 'brightness(0.3) saturate(0.6) contrast(1.05)', duration: 1 }, 0)
    .to(el.querySelector('.hero-text'), { y: '-18vh', autoAlpha: 0.2, duration: 1 }, 0);
}

function scene() {
  const stage = document.querySelector<HTMLElement>('#stage');
  const pin = document.querySelector<HTMLElement>('#stage .pin');
  if (!stage || !pin) return;
  const q = gsap.utils.selector(stage);
  const mobile = window.matchMedia('(max-width: 767px)').matches;

  const flyFrom = (layer: string, shot: string) => {
    const s = q<HTMLElement>(shot)[0];
    return q<HTMLElement>(`${layer} .chip`).map((el) => {
      const a = s.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      return { el, dx: a.left + a.width / 2 - (b.left + b.width / 2), dy: a.top + a.height / 2 - (b.top + b.height / 2) };
    });
  };

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => '+=' + window.innerHeight * (mobile ? 6.5 : 7.2),
      pin,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress * tl.duration();
        const trench = q<HTMLVideoElement>('.layer-is video')[0];
        if (trench) {
          if (p > 3.2 && trench.paused) trench.play().catch(() => {});
          if (p <= 3.2 && !trench.paused) trench.pause();
        }
      },
    },
  });

  // MediGraph: the timeline rises in perspective and flattens, chips fly out, three beats.
  tl.fromTo(q('.shot-mg'), { y: '70vh', rotateX: 20, scale: 0.9 }, { y: 0, rotateX: 0, scale: 1, duration: 1.1 }, 0);
  const mgChips = flyFrom('.layer-mg', '.shot-mg');
  mgChips.forEach((c, i) => {
    tl.fromTo(c.el, { x: c.dx, y: c.dy, scale: 0.55, autoAlpha: 0 }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.55, ease: 'power2.out' }, 1.0 + i * 0.07);
  });
  tl.fromTo(q('.copy-mg .reveal'), { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.4, ease: 'power2.out' }, 1.15);

  // MediGraph leaves, the trench opens the street.
  tl.to([q('.shot-mg'), q('.layer-mg .chip'), q('.copy-mg')], { y: '-=28vh', autoAlpha: 0, duration: 0.7 }, 3.2)
    .set(q('.layer-is'), { autoAlpha: 1 }, 3.2)
    .fromTo(q('.layer-is .film-wrap'), { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.8 }, 3.25)
    .fromTo(q('.dig .l1'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 3.65)
    .fromTo(q('.dig .l2'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 3.9)
    .to(q('.dig .l2'), { y: -40, autoAlpha: 0, duration: 0.3 }, 4.5)
    .fromTo(q('.dig .l3'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 4.55);

  // The map rises, the statement shrinks to the corner, cut-outs land, three beats.
  tl.to(q('.dig'), { scale: mobile ? 0.5 : 0.42, y: mobile ? '-30vh' : '-36vh', duration: 0.8 }, 5.0)
    .to(q('.layer-is .film'), { filter: 'brightness(0.22) saturate(0.5)', duration: 0.8 }, 5.0)
    .fromTo(q('.shot-map'), { y: '100vh', scale: 0.92 }, { y: 0, scale: 1, duration: 1 }, 5.0);
  const isChips = flyFrom('.layer-is', '.shot-map');
  isChips.forEach((c, i) => {
    tl.fromTo(c.el, { x: c.dx, y: c.dy, scale: 0.55, autoAlpha: 0 }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 5.9 + i * 0.07);
  });
  tl.fromTo(q('.copy-is .reveal'), { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.4, ease: 'power2.out' }, 6.0).to({}, { duration: 0.6 });
  tl.addLabel('mg', 1.9).addLabel('is', 6.3);

  // Links into the scene jump to the moment that layer is fully on stage.
  const jumpTo = (label: string) => {
    const st = tl.scrollTrigger!;
    const y = st.start + (tl.labels[label] / tl.duration()) * (st.end - st.start);
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  const targets: Record<string, string> = { '#medigraph': 'mg', '#infrasync': 'is' };
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    const label = targets[a.getAttribute('href') ?? ''];
    if (!label) return;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      jumpTo(label);
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });
  if (targets[location.hash]) requestAnimationFrame(() => jumpTo(targets[location.hash]));
}
