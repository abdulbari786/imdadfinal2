# Imdad-ul-Fuqaraa Trust website

A responsive React + Vite website and manual donation-information page. This is a static front end: it does not process payments, collect donor details, or issue receipts.

## Run locally

1. Install Node.js 18 or newer.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL printed by Vite.
5. Run `npm run build` to produce the deployable `dist/` folder.
6. Run `npm run preview` to test the production build locally.

The donation information page is at `/donate`. `vercel.json` keeps that path working on Vercel.

## Editing content

- Programme descriptions, impact figures, timeline, contact information, payment details and social links live in `src/content.js`.
- Page sections and interactions live in `src/App.jsx`.
- Donation details and copy buttons live in `src/DonationPage.jsx`.
- Layout, colors, responsive behavior and motion are in `src/styles.css`.
- Replace or add local images in `public/images`, then update the matching paths and alt text in `src/content.js` or `src/App.jsx`.

## Accuracy and launch checks

- The displayed impact figures are reported in the trust's 2026 report, not live totals. Confirm reporting dates and figures before launch.
- Supplied payment and contact information should be confirmed directly with the trust. On the donation page, donors are asked to verify the recipient name in their own payment app. No UPI ID is fabricated.
- Confirm permission to publish all identifiable people, especially children, and approve image captions before launch.
- Recognition, pledge, course-completion and nomination documents are described by type. They are not represented as tax exemptions or blanket government endorsements.
- Confirm the report's conflicting resident-girl figures, fee arrangements, registration records and campus information before publishing definitive claims.
- The Instagram images in `public/images` are locally saved public post thumbnails linking to their original posts. They are not official Instagram embeds; confirm permission and refresh them as needed.
- The archive MP4 is local and uses a user-controlled player with no autoplay.
- The bank and payment-provider logos were downloaded from the URLs supplied for this project.

## Deployment

Create a GitHub repository from this folder and import it into Vercel. Vercel detects Vite; the provided rewrite preserves the `/donate` route. Review payment details, safeguarding permissions, contact details and current impact information with the trust before launch.
