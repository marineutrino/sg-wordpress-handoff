# SeaGlass Homepage — WordPress Handoff Package

Version 2.0 · Prepared for dev team integration

---

## Package Contents

```
wordpress-handoff/
├── front-page.php          Homepage template (all sections)
├── header.php              Site header + nav + mobile menu
├── footer.php              Global footer + closing body/html
├── scss/
│   ├── style.scss          Main entry point (imports all partials)
│   ├── _variables.scss     Brand tokens, breakpoints, mixins
│   ├── _base.scss          Reset, scrollbar-hide, fade-in utility
│   ├── _header.scss        Site header + mobile menu
│   ├── _hero.scss          Swiper hero, search, pills
│   ├── _elite-destinations.scss
│   ├── _listing-showcase.scss
│   ├── _lifestyle-coastal.scss   CoastalLivingHero (all .clh-* classes)
│   ├── _lifestyle-golf.scss      GolfCourseLivingHero (all .glh-* classes)
│   ├── _lifestyle-carousel.scss  Wrapper/panel switcher (.lcw-* classes)
│   ├── _areas.scss
│   ├── _why-seaglass.scss
│   ├── _brokerage.scss
│   ├── _franchise.scss
│   └── _footer.scss
└── js/
    └── main.js             All vanilla JS interactions (no framework)
```

---

## Integration Steps

### 1. Place template files

Copy the three PHP files into the active theme root:

```
wp-content/themes/<your-theme>/
├── front-page.php   ← replaces existing homepage template
├── header.php       ← replaces existing header.php
└── footer.php       ← replaces existing footer.php
```

WordPress will automatically use `front-page.php` for the static front page
(`Settings → Reading → A static page → Front page`).

---

### 2. Compile SCSS → CSS

The `scss/` folder uses standard SASS. Compile with any SASS toolchain:

```bash
# Using Dart Sass CLI
sass scss/style.scss css/seaglass-homepage.css --style=compressed

# Or add to your existing webpack/gulp/vite build
```

Place the compiled `css/seaglass-homepage.css` in your theme's assets folder.

---

### 3. Enqueue stylesheet and scripts

Add to your theme's `functions.php`:

```php
function sg_homepage_assets() {
    // Only load on front page
    if ( ! is_front_page() ) return;

    // Compiled stylesheet
    wp_enqueue_style(
        'sg-homepage',
        get_template_directory_uri() . '/css/seaglass-homepage.css',
        [],
        '2.0'
    );

    // Swiper (CDN) — already in header.php <head>
    // No need to wp_enqueue_style for Swiper if using header.php as-is.

    // Main JS
    wp_enqueue_script(
        'sg-homepage-js',
        get_template_directory_uri() . '/js/main.js',
        [],   // no dependencies — vanilla JS
        '2.0',
        true  // load in footer
    );
}
add_action( 'wp_enqueue_scripts', 'sg_homepage_assets' );
```

---

### 4. CDN dependencies (already in header.php / footer.php)

| Library | Version | Purpose |
|---------|---------|---------|
| Swiper  | 11.x    | Hero fade carousel |
| Google Fonts — Montserrat | — | All typography |

These are loaded via CDN tags already present in `header.php` (`<head>`) and
`footer.php` (before `wp_footer()`). No npm install required.

---

### 5. ACF field wiring (post-integration)

Every dynamic content point is marked with a PHP comment:
```
<!-- ACF: field_name -->
```

Replace these comments with standard ACF calls, e.g.:
```php
<?php echo esc_html( get_field('hero_headline') ); ?>
```

#### Field map by section

**Header**
- `nav_items` (repeater) — label, url, has_dropdown, dropdown_links[]

**Hero**
- `hero_slides[]` — title, location, type (image|video), image_url, video_url
- `hero_headline`
- `search_placeholder`
- `search_pills[]` — label

**Elite Destinations**
- `elite_quote`
- `elite_quote_attr`
- `elite_bg_image`

**Listing Showcase**
- `listing_showcase_cards[]` — image, address, city, price, beds, baths, sqft

**Areas Section**
- `areas_eyebrow`
- `areas_title`
- `areas[]` — name, region, image *(optional — JS has static fallback)*

**Why SeaGlass**
- `why_eyebrow`
- `why_title`
- `why_tagline`
- `why_bg_video`
- `why_buyers_body` / `why_sellers_body`
- `why_buyers_cta` / `why_sellers_cta`

**Brokerage**
- `brokerage_heading`
- `brokerage_tabs[]` — label, title, body, cta_label, cta_url, image

**Franchise**
- `franchise_hero_image`
- `franchise_eyebrow`
- `franchise_hero_title`
- `franchise_hero_body`
- `franchise_cards[]` — eyebrow, title, body, list_items[], cta_label, cta_url, image

**Footer**
- `footer_tagline`
- `franchise_locations[]` — city, state, url
- `footer_nav_col_*_title` / `footer_nav_col_*_links[]` (5 columns)
- `hq_address` / `hq_city_state` / `hq_phone` / `hq_email`
- `social_links[]` — platform, url
- `legal_disclaimer`
- `copyright_year`
- `legal_links[]` — label, url

---

## Key Technical Notes

### Glassmorphism SVG filter
Both `WhySeaglassBrand` and `FranchiseSection` use a shared SVG `feDisplacementMap`
filter (`#glass-distortion-brand`). The hidden SVG is rendered at the top of
`front-page.php`, before any section. Do not remove it.

### Lifestyle Carousel scroll behaviour
The `#sg-lifestyle-carousel` wrapper has `height: calc(640vh + 140px)` — this is
intentional. Both the Coastal and Golf sections use sticky positioning inside it.
No parent element should have `overflow-y: scroll` or `overflow: hidden` set between
the wrapper and `<body>`, or sticky will break.

### CoastalLivingHero / GolfCourseLivingHero
All card content, location lists, stats, and card nav are built entirely by JS
(`initCoastalLivingHero` / `initGolfCourseLivingHero` in `main.js`). The `.clh-*`
and `.glh-*` DOM elements in `front-page.php` are the mounting points — JS populates
them on `DOMContentLoaded`.

### Areas grid
The 22 area cards are also built by JS. The `<div class="sg-areas__grid">` is the
mount point. If you want ACF to control the areas, replace the `areas` array in
`initAreas()` inside `main.js` with a PHP-rendered JSON data attribute:

```php
<div class="sg-areas__grid"
     data-areas="<?php echo esc_attr( json_encode( get_field('areas') ) ); ?>">
</div>
```

Then in `main.js`, read it back with:
```js
var raw = grid && grid.dataset.areas;
var areas = raw ? JSON.parse(raw) : [...defaultAreas];
```

### Fixed-position elements (Coastal/Golf heroes)
The `.clh-coastal`, `.clh-loc-head`, `.clh-loc-list`, `.clh-stats`, `.clh-stat-city`,
`.clh-cards-tag`, `.clh-blurb` (and `.glh-*` equivalents) are set to
`position: fixed` by JS during scroll. Their positions are computed in JavaScript.
They should not be styled with fixed positioning in CSS — the `_lifestyle-coastal.scss`
and `_lifestyle-golf.scss` files define their visual appearance only.

---

## Browser Support

| Browser | Min version |
|---------|------------|
| Chrome  | 90+        |
| Safari  | 15+        |
| Firefox | 88+        |
| Edge    | 90+        |

`backdrop-filter` (glassmorphism) requires Safari 9+ / Chrome 76+. It degrades
gracefully to a semi-transparent background on unsupported browsers.

---

## Asset URL replacements needed

The following placeholder images/videos should be replaced with production assets:

| Location | Current placeholder | Replace with |
|----------|--------------------|----|
| Hero slide 1 | Cloudinary video | Production hero video |
| Hero slides 2–4 | Unsplash photos | Licensed property photos |
| Elite Destinations bg | Unsplash | Licensed aerial/ocean photo |
| Elite Destinations boat | Unsplash | Brand boat photo |
| Why SeaGlass video | Cloudinary (same as hero) | Brand lifestyle video |
| All listing cards | Unsplash | MLS listing photos (ACF) |
| Footer bg | Unsplash | Brand lifestyle photo |

---

## Questions

Contact the design team at mari@neutrinoinc.com with questions about
component behaviour or design intent before modifying layout structure.
