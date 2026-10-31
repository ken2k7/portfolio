# Design notes

Direction: "The page is the object" (dealt from the taste-skill library; the other two dealt options,
pinned poster and contact sheet, need photographs the brief forbids).

Idea: MediGraph is a source-traceable record, so the portfolio is a case file. Folders with tabs are the
navigation, each section is a piece of the same stationery, and the footer is the back of the folder.

- Hero blueprint: tabbed folder stack. The front folder is open and the Work section lives inside it.
- Type (dealt): Bebas Neue for the name, tabs and headings; EB Garamond for everything else. Self-hosted.
- Palette (dealt): "Cobalt on sand". Sand paper and one cobalt ink, nothing else. Dark mode inverts the print.
- Sections: Work as stacked sticky folders with code-drawn figures; About as a covering letter with a
  tear-off email strip; Skills as one giant word with filled bars; Education and activities as a printed
  record sheet; Contact as the back of the folder, uncovered by a CSS-only curtain footer.
- Motion: one load sequence (name, sentence, folders rise), the scroll-driven pile of folders, the curtain.
  No per-section fades. Reduced motion removes the entrance.

House rules kept: no hairlines, eyebrows, numbering, middle dots, arrows, monospace, gradients, shadows,
glass, or a styled accent word. Every heading fits two lines at 1440, 768 and 390.

Known limits: the brief bans stock photography, so the figures are drawn in code. The taste rubric caps
design at 6.5 without real pictures; that is a deliberate trade for honesty about what imagery exists.

Round 2 critique (desktop 1280, phone 360):
- Seen in one second: a sand folder stack under a huge name on cobalt.
- Layout words: hero=stack / work=pile / about=sheet / skills=word+bars / education=split+sheet / contact=card.
- Fixed this round: duplicate wordmark removed; Work tab moved left so no tab covers a strip hint; band
  content starts below the 72px stacked strip; band tabs anchored on phones; footer scallops cut into the
  panel; heading "Education and activities" held to two lines.
- Still soft: the Skills column is a second centred moment after the hero; the Kenbot band is short.

## Round 3: pictures and motion (31 Oct 2026)

Kenil asked for real pictures and a fluid feel. Photographs are from Wikimedia Commons, all CC BY, CC BY-SA
or public domain, credited in the footer and listed in `src/data/credits.ts`. Originals were fetched at
2400px into `src/assets/photos/`; Astro emits AVIF and WebP at several widths.

Pictures and their jobs:
- Doha West Bay at night: the hero ground. Its blues are the palette's cobalt.
- Khor Al Udayd dunes meeting the sea: the About scene, a window that opens to the edges on scroll.
- Tampines Street 45: tipped into the letter, where the move to Singapore is mentioned.
- Paddock casebook: MediGraph's plate, a handwritten record of remedies.
- Plan of the City of Singapore, 1893, and the Sunset Boulevard excavation: InfraSync's plates.
- CREATE Tower, NUS: the Education plate. Souq Waqif at night: the stamp on the back of the folder.

Motion layer:
- Signature move: a WebGL water ripple on the hero photograph following the pointer, custom GLSL, no
  library. Fine pointers only, started after load or first movement. The photo beneath is a plain img.
- Scroll-driven CSS: plates open with a clip reveal and drift; the About window opens from 26% inset to
  full bleed over the scene's contain range. Browsers without scroll timelines get the finished state.
- Kept: the load sequence, the sticky folder pile, the curtain footer (now only where it fits the viewport).
- Reduced motion switches off the shader, the entrances and the scroll animations.

Measured after this round: Lighthouse 99 mobile, 100 desktop. The mobile drop to 80 before gating the
shader (810 ms blocking) is why the shader waits for load and skips touch devices.
