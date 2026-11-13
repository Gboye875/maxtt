# MaxTT Glass Website — reconstructed edition

The missing `glass.css` and `glass.js` have been rebuilt from the surviving HTML page. This is a reconstruction, not recovery of the unavailable original files. The saved page content and its built-in planner, product filters, FAQs and enquiry form remain in place.

## Preview

Extract the complete ZIP, keeping all files together, then open `index.html` in a browser. No installation or build step is required. The fonts and stock solar photograph are external resources and require an internet connection; system font and green background fallbacks remain available offline.

## Edit

- `index.html`: page copy, inline base styles, enquiry fields, planning assumptions and inline interaction code.
- `glass.css`: rebuilt glass surfaces, teal/green styling, responsive layout and navigation styling.
- `glass.js`: mobile navigation, keyboard dismissal, skip link and input length limits. It handles the WhatsApp enquiry and floating social menu; the planner and filters use the inline script.

The energy planner is an illustrative estimate, not a final design or quotation. The enquiry form opens a WhatsApp draft for the customer to send. The website has no AI or live lead backend connected. The hero uses the stock solar photograph referenced in the saved page, not the video from the separate older project.

## Before launch

Confirm all existing business claims, including service areas and country references. Add verified company contacts and reviewed privacy/terms, configure and test real enquiry delivery, and confirm image permissions. Test on real mobile and desktop devices. This reconstruction has not been publicly deployed.

For static hosting, upload `index.html`, `glass.css` and `glass.js` together to the site's public root. No build command is needed. The original inline scripts are required for the planner and filters.

## Latest hero update

The hero now uses assets/hero-background.mp4 (the supplied Create-a-fresh-corrected-photorealistic.mp4) as a full-width background. The existing text is overlaid on a translucent glass panel. Background playback is muted with volume held at zero; the file itself is unmodified. A pause/play button is available. Reduced-motion preferences start the video paused, and playback suspends while the browser tab is hidden. This supersedes the earlier stock-photo hero description above. Extract the full ZIP to keep the local video path intact.

## Simple motion system

Local Motion 12.23.24 (vendor/motion.js, MIT licence included) adds short hero and section/card entrances. CSS handles 3px card lifts, button/arrow feedback and the mobile menu entrance. motions.js also eases the planner result over 220ms and FAQ open/close over 220ms. Entrances run once as content enters view, with a small card stagger; filter results animate after each selection. Reduced-motion preferences disable these effects. Content stays visible if the library or script fails. No 3D effects, continuous decorative animations or layout changes were added. Restart preview.cjs to serve the new local script files.

## WhatsApp enquiries and social links

The quote form opens a prefilled WhatsApp chat with MaxTT at +234 912 239 5636. Customers review and tap Send in WhatsApp; there is no automatic submission or backend. In index.html, the floating social panel contains the WhatsApp wa.me link used by the form. Set the Instagram and TikTok links to the official profiles and update their preview captions once confirmed. The current mock links open the platform homepages.
