// The one scroll scene: hero, MediGraph, InfraSync on a pinned stage.
// Without this script (or with reduced motion) the same layers stack as ordinary sections.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const root = document.documentElement;
if (root.classList.contains('motion')) {
  gsap.registerPlugin(ScrollTrigger);
  build();
}

function build() {
  const stage = document.querySelector<HTMLElement>('#stage');
  const pin = document.querySelector<HTMLElement>('#stage .pin');
  if (!stage || !pin) return;
  const q = gsap.utils.selector(stage);
  const mark = document.querySelector<HTMLElement>('[data-mark]');
  const mobile = window.matchMedia('(max-width: 767px)').matches;

  // Chips fly out from the centre of their screenshot to their resting place.
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
      end: () => '+=' + window.innerHeight * (mobile ? 7.5 : 8.5),
      pin,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => mark?.classList.toggle('show', self.progress > 0.09),
    },
  });

  // Hero: hold, then the name lifts away and the film sinks.
  tl.to(q('.layer-hero .hero-text'), { y: '-35vh', autoAlpha: 0, duration: 1 }, 0.55)
    .to(q('.layer-hero .film'), { scale: 1.12, filter: 'brightness(0.18) saturate(0.5) contrast(1.05)', duration: 1.4 }, 0.4);

  // MediGraph: the timeline rises in perspective and flattens, chips fly out, three beats.
  tl.set(q('.layer-mg'), { autoAlpha: 1 }, 0.9)
    .fromTo(q('.shot-mg'), { y: '110vh', rotateX: 22, scale: 0.9 }, { y: 0, rotateX: 0, scale: 1, duration: 1.3 }, 0.9);

  const mgChips = flyFrom('.layer-mg', '.shot-mg');
  mgChips.forEach((c, i) => {
    tl.fromTo(c.el, { x: c.dx, y: c.dy, scale: 0.55, autoAlpha: 0 }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.55, ease: 'power2.out' }, 2.05 + i * 0.07);
  });
  tl.fromTo(q('.copy-mg .reveal'), { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.42, ease: 'power2.out' }, 2.2);

  // MediGraph leaves, the trench opens the street.
  tl.to([q('.shot-mg'), q('.layer-mg .chip'), q('.copy-mg')], { y: '-=28vh', autoAlpha: 0, duration: 0.7 }, 4.3)
    .set(q('.layer-is'), { autoAlpha: 1 }, 4.3)
    .fromTo(q('.layer-is .film-wrap'), { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.8 }, 4.35)
    .fromTo(q('.dig .l1'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 4.75)
    .fromTo(q('.dig .l2'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 5.0)
    .to(q('.dig .l2'), { y: -40, autoAlpha: 0, duration: 0.3 }, 5.6)
    .fromTo(q('.dig .l3'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 5.65);

  // The map rises, the statement shrinks to the corner, cut-outs land, three beats.
  tl.to(q('.dig'), { scale: mobile ? 0.5 : 0.42, y: mobile ? '-30vh' : '-36vh', duration: 0.8 }, 6.1)
    .to(q('.layer-is .film'), { filter: 'brightness(0.22) saturate(0.5)', duration: 0.8 }, 6.1)
    .fromTo(q('.shot-map'), { y: '100vh', scale: 0.92 }, { y: 0, scale: 1, duration: 1 }, 6.1);
  const isChips = flyFrom('.layer-is', '.shot-map');
  isChips.forEach((c, i) => {
    tl.fromTo(c.el, { x: c.dx, y: c.dy, scale: 0.55, autoAlpha: 0 }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 7.0 + i * 0.07);
  });
  tl.fromTo(q('.copy-is .reveal'), { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.4, ease: 'power2.out' }, 7.1)
    .to({}, { duration: 0.6 });
  tl.addLabel('mg', 3.0).addLabel('is', 7.4);

  // Links into the scene jump to the moment that layer is fully on stage, not to the stage's top.
  const jumpTo = (label: string) => {
    const st = tl.scrollTrigger!;
    const y = st.start + (tl.labels[label] / tl.duration()) * (st.end - st.start);
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  const targets: Record<string, string> = { '#work': 'mg', '#medigraph': 'mg', '#infrasync': 'is' };
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

  // Play film only while its layer is on screen.
  const films = q<HTMLVideoElement>('video.film');
  tl.scrollTrigger?.vars;
  ScrollTrigger.create({
    trigger: stage,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => films.forEach((v) => (self.isActive ? v.play().catch(() => {}) : v.pause())),
  });
  const trench = q<HTMLVideoElement>('.layer-is video')[0];
  if (trench) {
    tl.scrollTrigger!.vars.onUpdate = (self) => {
      mark?.classList.toggle('show', self.progress > 0.09);
      const p = self.progress * tl.duration();
      if (p > 4.2 && trench.paused) trench.play().catch(() => {});
    };
  }
}
