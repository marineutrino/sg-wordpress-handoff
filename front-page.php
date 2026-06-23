<?php
/**
 * Template Name: Homepage
 * Homepage template — SeaGlass Home & Lifestyle v2
 * Static HTML handoff. ACF fields wired by dev team post-integration.
 */

get_header();
?>

<?php
/*
 * ============================================================
 *  HIDDEN SVG FILTERS — Glassmorphism distortion
 *  Required by WhySeaglassBrand and FranchiseSection cards.
 * ============================================================
 */
?>
<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
  <defs>
    <filter id="glass-distortion-brand" x="-20%" y="-20%" width="140%" height="140%"
            color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.65 0.65" numOctaves="3"
                    seed="2" stitchTiles="stitch" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="6"
                         xChannelSelector="R" yChannelSelector="G" result="displaced"/>
      <feComposite in="displaced" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
</svg>


<?php
/* ============================================================
 *  SECTION 1 — HERO (Swiper carousel + search)
 *  ACF: hero_slides[] → title, location, type (image|video),
 *       image_url, video_url
 *       search_placeholder, search_pills[] → label
 * ============================================================ */
?>
<section id="sg-hero" class="sg-hero" aria-label="Homepage hero">

  <div class="swiper sg-hero__swiper">
    <div class="swiper-wrapper">

      <!-- Slide 1 — Video (ACF: hero_slides[0]) -->
      <div class="swiper-slide sg-hero__slide">
        <div class="sg-hero__media">
          <video autoplay muted loop playsinline
                 poster="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&h=1080&fit=crop">
            <!-- ACF: get_field('hero_video_url') -->
            <source src="https://res.cloudinary.com/dpqzkg1yc/video/upload/v1777309906/FPO-lux-realestate-trimmed_ugin9n.mov" type="video/mp4">
          </video>
          <div class="sg-hero__gradient" aria-hidden="true"></div>
        </div>
        <div class="sg-hero__property-info">
          <p class="sg-hero__property-title">Krystal House</p><!-- ACF: title -->
          <p class="sg-hero__property-location">Paradise Island, Bahamas</p><!-- ACF: location -->
        </div>
      </div>

      <!-- Slide 2 (ACF: hero_slides[1]) -->
      <div class="swiper-slide sg-hero__slide">
        <div class="sg-hero__media">
          <img loading="lazy"
               src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1777496380/salman-saqib-URD4NdWyd60-unsplash_mzbzaq.jpg"
               alt="Coastal Estate, SeaGlass"><!-- ACF: image_url / alt -->
          <div class="sg-hero__gradient" aria-hidden="true"></div>
        </div>
        <div class="sg-hero__property-info">
          <p class="sg-hero__property-title">Coastal Estate</p>
          <p class="sg-hero__property-location">SeaGlass Collection</p>
        </div>
      </div>

      <!-- Slide 3 (ACF: hero_slides[2]) -->
      <div class="swiper-slide sg-hero__slide">
        <div class="sg-hero__media">
          <img loading="lazy"
               src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
               alt="Azure Villa, Malibu California"><!-- ACF: image_url / alt -->
          <div class="sg-hero__gradient" aria-hidden="true"></div>
        </div>
        <div class="sg-hero__property-info">
          <p class="sg-hero__property-title">Azure Villa</p>
          <p class="sg-hero__property-location">Malibu, California</p>
        </div>
      </div>

      <!-- Slide 4 (ACF: hero_slides[3]) -->
      <div class="swiper-slide sg-hero__slide">
        <div class="sg-hero__media">
          <img loading="lazy"
               src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
               alt="Ocean Breeze Estate, Miami Beach Florida">
          <div class="sg-hero__gradient" aria-hidden="true"></div>
        </div>
        <div class="sg-hero__property-info">
          <p class="sg-hero__property-title">Ocean Breeze Estate</p>
          <p class="sg-hero__property-location">Miami Beach, Florida</p>
        </div>
      </div>

      <!-- Slide 5 (ACF: hero_slides[4]) -->
      <div class="swiper-slide sg-hero__slide">
        <div class="sg-hero__media">
          <img loading="lazy"
               src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&h=1080&fit=crop"
               alt="Sunset Manor, Cabo San Lucas Mexico">
          <div class="sg-hero__gradient" aria-hidden="true"></div>
        </div>
        <div class="sg-hero__property-info">
          <p class="sg-hero__property-title">Sunset Manor</p>
          <p class="sg-hero__property-location">Cabo San Lucas, Mexico</p>
        </div>
      </div>

    </div><!-- /.swiper-wrapper -->

  </div><!-- /.swiper -->

  <!-- Center content (headline + search) -->
  <div class="sg-hero__content">
    <p class="sg-hero__headline">
      <!-- ACF: hero_headline -->
      Find your perfect<br>elsewhere
    </p>

    <div id="sg-hero-search-wrap" class="sg-hero__search-wrap">
      <div class="sg-hero__search-row">
        <button id="sg-hero-search-icon" class="sg-hero__search-icon" aria-label="Toggle property search" aria-expanded="false" aria-controls="sg-hero-search-field">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
        </button>
        <div id="sg-hero-search-field" class="sg-hero__search-field" role="search">
          <div class="sg-hero__search-inner">
            <input id="sg-hero-search-input" class="sg-hero__search-input"
                   type="search" placeholder="Explore your ideal lifestyle or destination..."
                   aria-label="Search properties"><!-- ACF: search_placeholder -->
            <button id="sg-hero-search-close" class="sg-hero__search-close" aria-label="Close search">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Lifestyle pills — ACF: search_pills[] → label -->
      <div id="sg-hero-pills" class="sg-hero__pills">
        <button class="sg-hero__pill" type="button">Vineyard</button>
        <button class="sg-hero__pill" type="button">Coastal</button>
        <button class="sg-hero__pill" type="button">Mountain</button>
        <button class="sg-hero__pill" type="button">Island</button>
        <button class="sg-hero__pill" type="button">Golf</button>
        <button class="sg-hero__pill" type="button">Equestrian</button>
        <button class="sg-hero__pill" type="button">Aviation</button>
        <button class="sg-hero__pill" type="button">Boater</button>
        <button class="sg-hero__pill" type="button">Yachting</button>
      </div>
    </div><!-- /.sg-hero__search-wrap -->
  </div><!-- /.sg-hero__content -->

  <!-- Navigation arrows — outside .swiper so z-index 20 beats .sg-hero__content z-index 10 -->
  <button class="sg-hero__prev" aria-label="Previous slide">
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
    </svg>
    <div class="sg-hero__arrow-line"></div>
  </button>
  <button class="sg-hero__next" aria-label="Next slide">
    <div class="sg-hero__arrow-line"></div>
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
    </svg>
  </button>

  <!-- Scroll hint -->
  <div class="sg-hero__scroll-hint" aria-hidden="true">
    <span class="sg-hero__scroll-label">SCROLL TO EXPLORE</span>
    <div class="sg-hero__scroll-line"></div>
  </div>

</section><!-- /#sg-hero -->


<?php
/* ============================================================
 *  SECTION 2 — ELITE DESTINATIONS (parallax quote + boat)
 *  ACF: elite_quote, elite_quote_attr, elite_bg_image
 * ============================================================ */
?>
<section class="sg-elite-destinations sg-fade-in" aria-label="Elite destinations">

  <!-- Parallax background image -->
  <div class="sg-elite-destinations__bg">
    <!-- ACF: elite_bg_image -->
    <img class="sg-elite-destinations__bg-img"
         src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1780691741/jane-utochkina-0GrtD_9WnPU-unsplash_1_ia7i4p.jpg"
         alt="" aria-hidden="true" loading="lazy">
    <div class="sg-elite-destinations__scrim" aria-hidden="true"></div>
  </div>

  <!-- Seagull decoration -->
  <img class="sg-elite-destinations__bird"
       src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1749168000/seagull-silhouette_sgbird.png"
       alt="" aria-hidden="true">

  <!-- Quote + CTA -->
  <div class="sg-elite-destinations__content">
    <div class="sg-elite-destinations__vbar" aria-hidden="true"></div>
    <p class="sg-elite-destinations__quote">
      <!-- ACF: elite_quote -->
      True luxury isn&rsquo;t a price point, it&rsquo;s the morning view, the local community, and the lifestyle of your ideal second home.
    </p>
    <a href="#" class="sg-elite-destinations__cta">
      Discover your perfect elsewhere &rarr;
    </a>
  </div>

  <!-- Bottom white fade -->
  <div class="sg-elite-destinations__fade" aria-hidden="true"></div>

  <!-- Boat image — JS animates translateY from 100% to 0 -->
  <div class="sg-elite-destinations__boat" aria-hidden="true">
    <img src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1780952514/boat_hhont6.png"
         alt="" loading="lazy">
  </div>

</section><!-- /.sg-elite-destinations -->


<?php
/* ============================================================
 *  SECTION 3 — LISTING SHOWCASE (tabbed + horizontal scroll)
 *  ACF: listing_tabs[] → label, listings[] → image, address,
 *       city, price, beds, baths, sqft
 * ============================================================ */
?>
<section id="listing-showcase" class="sg-listing-showcase sg-fade-in" aria-label="Featured listings">

  <!-- Section header -->
  <div class="sg-listing-showcase__header">
    <h2 class="sg-listing-showcase__title">Listing showcase</h2>

    <!-- Tab bar -->
    <div class="sg-listing-tabs">
      <div class="sg-listing-tabs__inner" role="tablist" aria-label="Property categories">
        <button class="sg-listing-tab is-active" role="tab" aria-selected="true"
                data-tab="ocean-front">
          <span class="sg-listing-tab__label">Ocean Front</span>
          <span class="sg-listing-tab__underline" aria-hidden="true"></span>
        </button>
        <button class="sg-listing-tab" role="tab" aria-selected="false"
                data-tab="mountain">
          <span class="sg-listing-tab__label">Mountain Retreats</span>
          <span class="sg-listing-tab__underline" aria-hidden="true"></span>
        </button>
        <button class="sg-listing-tab" role="tab" aria-selected="false"
                data-tab="island">
          <span class="sg-listing-tab__label">Island Properties</span>
          <span class="sg-listing-tab__underline" aria-hidden="true"></span>
        </button>
        <button class="sg-listing-tab" role="tab" aria-selected="false"
                data-tab="golf">
          <span class="sg-listing-tab__label">Golf Paradise</span>
          <span class="sg-listing-tab__underline" aria-hidden="true"></span>
        </button>
        <button class="sg-listing-tab" role="tab" aria-selected="false"
                data-tab="vineyard">
          <span class="sg-listing-tab__label">Vineyard Estates</span>
          <span class="sg-listing-tab__underline" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </div>
  <!-- Scroll sentinel (IntersectionObserver trigger) -->
  <div class="sg-listing-showcase__sentinel" aria-hidden="true"></div>

  <!-- Horizontal scroll cards -->
  <!-- ACF: listing_showcase_cards[] — replace static data below -->
  <div class="sg-listing-showcase__scroll-wrap">
    <button class="sg-listing-showcase__arrow sg-listing-showcase__arrow--left" aria-label="Scroll left">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
      </svg>
    </button>
    <button class="sg-listing-showcase__arrow sg-listing-showcase__arrow--right" aria-label="Scroll right">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
      </svg>
    </button>
  <div class="sg-listing-showcase__scroll">

    <article class="sg-listing-card">
      <div class="sg-listing-card__image-wrap">
        <img class="sg-listing-card__image" loading="lazy"
             src="https://cdn.mos.cms.futurecdn.net/SwbkiryGnbyp49RB3aFLvh.jpg"
             alt="311 Lower Lovenlund Gns, St. Croix">
        <div class="sg-listing-card__gradient" aria-hidden="true"></div>
        <div class="sg-listing-card__lifestyle" aria-hidden="true"><span>Ocean Front</span></div>
        <div class="sg-listing-card__hover-details" aria-hidden="true">
          <p>$1,265,000</p>
          <p>3 BEDS · 3 BATHS · 2,300 SQFT</p>
        </div>
        <div class="sg-listing-card__location"><span>St. Croix, USVI</span></div>
      </div>
    </article>

    <article class="sg-listing-card">
      <div class="sg-listing-card__image-wrap">
        <img class="sg-listing-card__image" loading="lazy"
             src="https://cdn.photos.sparkplatform.com/vir/20260119170418979474000000-o.jpg?date=2026-02-26"
             alt="439 Upper Lovenlund Gns, St. Thomas">
        <div class="sg-listing-card__gradient" aria-hidden="true"></div>
        <div class="sg-listing-card__lifestyle" aria-hidden="true"><span>Ocean Front</span></div>
        <div class="sg-listing-card__hover-details" aria-hidden="true">
          <p>$3,265,000</p>
          <p>5 BEDS · 4 BATHS · 4,200 SQFT</p>
        </div>
        <div class="sg-listing-card__location"><span>St. Thomas, USVI</span></div>
      </div>
    </article>

    <article class="sg-listing-card">
      <div class="sg-listing-card__image-wrap">
        <img class="sg-listing-card__image" loading="lazy"
             src="https://assets.wander.com/466274865133912077/640.webp"
             alt="528 Paradise Cove, Miami Beach">
        <div class="sg-listing-card__gradient" aria-hidden="true"></div>
        <div class="sg-listing-card__lifestyle" aria-hidden="true"><span>Ocean Front</span></div>
        <div class="sg-listing-card__hover-details" aria-hidden="true">
          <p>$2,365,000</p>
          <p>4 BEDS · 3 BATHS · 3,100 SQFT</p>
        </div>
        <div class="sg-listing-card__location"><span>Miami Beach, FL</span></div>
      </div>
    </article>

    <article class="sg-listing-card">
      <div class="sg-listing-card__image-wrap">
        <img class="sg-listing-card__image" loading="lazy"
             src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop"
             alt="892 Oceanview Dr, Malibu">
        <div class="sg-listing-card__gradient" aria-hidden="true"></div>
        <div class="sg-listing-card__lifestyle" aria-hidden="true"><span>Ocean Front</span></div>
        <div class="sg-listing-card__hover-details" aria-hidden="true">
          <p>$4,765,000</p>
          <p>6 BEDS · 5 BATHS · 5,800 SQFT</p>
        </div>
        <div class="sg-listing-card__location"><span>Malibu, CA</span></div>
      </div>
    </article>

    <article class="sg-listing-card">
      <div class="sg-listing-card__image-wrap">
        <img class="sg-listing-card__image" loading="lazy"
             src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop"
             alt="123 Seaside Lane, Charleston">
        <div class="sg-listing-card__gradient" aria-hidden="true"></div>
        <div class="sg-listing-card__lifestyle" aria-hidden="true"><span>Ocean Front</span></div>
        <div class="sg-listing-card__hover-details" aria-hidden="true">
          <p>$1,895,000</p>
          <p>3 BEDS · 2 BATHS · 2,800 SQFT</p>
        </div>
        <div class="sg-listing-card__location"><span>Charleston, SC</span></div>
      </div>
    </article>

    <article class="sg-listing-card">
      <div class="sg-listing-card__image-wrap">
        <img class="sg-listing-card__image" loading="lazy"
             src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop"
             alt="456 Marina Boulevard, Fort Myers">
        <div class="sg-listing-card__gradient" aria-hidden="true"></div>
        <div class="sg-listing-card__lifestyle" aria-hidden="true"><span>Ocean Front</span></div>
        <div class="sg-listing-card__hover-details" aria-hidden="true">
          <p>$5,250,000</p>
          <p>5 BEDS · 4 BATHS · 4,800 SQFT</p>
        </div>
        <div class="sg-listing-card__location"><span>Fort Myers, FL</span></div>
      </div>
    </article>

  </div><!-- /.sg-listing-showcase__scroll -->
  </div><!-- /.sg-listing-showcase__scroll-wrap -->

</section><!-- /#listing-showcase -->


<?php
/* ============================================================
 *  SECTION 4 — LIFESTYLE CAROUSEL WRAPPER
 *  Contains CoastalLivingHero + GolfCourseLivingHero.
 *  All cards/locations built dynamically by JS (main.js).
 *  ACF: not required — content is JS-driven with static data.
 * ============================================================ */
?>
<section id="sg-lifestyle-carousel" class="sg-lifestyle-carousel show-coastal"
         aria-label="Lifestyle sections">

  <!-- Right chevron (go to Golf) -->
  <div id="lcw-right-wrap" class="lcw-btn-wrap lcw-btn-wrap--right">
    <button id="lcw-go-golf" class="lcw-chevron-btn lcw-chevron-btn--right"
            aria-label="Explore Golf Course Living">
      <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"
           viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
      </svg>
    </button>
  </div>

  <!-- Left chevron (back to Coastal) -->
  <div id="lcw-left-wrap" class="lcw-btn-wrap lcw-btn-wrap--left">
    <button id="lcw-go-coastal" class="lcw-chevron-btn lcw-chevron-btn--left"
            aria-label="Explore Coastal Living">
      <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"
           viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
      </svg>
    </button>
  </div>

  <!-- ---- COASTAL LIVING HERO panel ---- -->
  <div class="lcw-panel lcw-panel--coastal">
    <div class="clh-track">
      <div class="clh-stage">

        <!-- Morphing hero image frame (layers + scrim + stats inside) -->
        <div class="clh-frame">
          <div class="clh-layer-a clh-layer" style="background-image:url('https://www.vacationstravel.com/wp-content/uploads/2023/03/AK-Greece.jpg')"></div>
          <div class="clh-layer-b clh-layer"></div>
          <div class="clh-scrim"></div>
          <div class="clh-stats-group">
            <div class="clh-stat-city">Saint Croix</div>
            <div class="clh-stats"></div>
          </div>
        </div>

        <!-- Centered tagline (fades out as frame shrinks) -->
        <div class="clh-tagline">
          <div class="clh-big">People don&#8217;t just buy a home. They buy a way of living.</div>
        </div>

        <!-- Scroll hint -->
        <div class="clh-hint" aria-hidden="true">
          <span>SCROLL</span>
          <span class="clh-bar"></span>
        </div>

        <!-- "Coastal Living" headline (fades in after shrink) -->
        <div class="clh-coastal">
          <h2><span>COASTAL</span><span>LIVING</span></h2>
        </div>

        <!-- Location list (wrapper positions it via CSS) -->
        <div class="clh-locations">
          <div class="clh-loc-head">FIND YOUR PERFECT ELSEWHERE</div>
          <div class="clh-loc-list"></div>
        </div>

        <!-- Cards viewport — row built by JS -->
        <div class="clh-cards-vp">
          <div class="clh-cards-row"></div>
        </div>

        <!-- Card nav tag — built by JS -->
        <div class="clh-cards-tag"></div>

        <!-- Blurb — positioned by JS -->
        <div class="clh-blurb">
          <p>Location is everything. Coastal homes consistently trade at a 30% to 50% premium, reflecting the timeless demand for life by the water.</p>
          <a href="#" class="clh-blurb-cta">View All Coastal Listings</a>
        </div>

      </div><!-- /.clh-stage -->
    </div><!-- /.clh-track -->
  </div><!-- /.lcw-panel--coastal -->


  <!-- ---- GOLF COURSE LIVING HERO panel ---- -->
  <div class="lcw-panel lcw-panel--golf">
    <div class="glh-track">
      <div class="glh-stage">

        <!-- Morphing hero image frame -->
        <div class="glh-frame">
          <div class="glh-layer-a glh-layer" style="background-image:url('https://images.unsplash.com/photo-1543105177-748ceda71741?q=80&w=2070&auto=format&fit=crop')"></div>
          <div class="glh-layer-b glh-layer"></div>
          <div class="glh-scrim"></div>
          <div class="glh-stats-group">
            <div class="glh-stat-city">Pebble Beach, CA</div>
            <div class="glh-stats"></div>
          </div>
        </div>

        <!-- Centered tagline -->
        <div class="glh-tagline">
          <div class="glh-big">Tee off from your backyard.<br>Live among the world's finest courses.</div>
        </div>

        <!-- Scroll hint -->
        <div class="glh-hint" aria-hidden="true">
          <span>SCROLL</span>
          <span class="glh-bar"></span>
        </div>

        <!-- "Golf Course Living" headline -->
        <div class="glh-coastal">
          <h2><span>GOLF</span><span>COURSE</span><span>LIVING</span></h2>
        </div>

        <!-- Location list -->
        <div class="glh-locations">
          <div class="glh-loc-head">FIND YOUR PERFECT FAIRWAY</div>
          <div class="glh-loc-list"></div>
        </div>

        <!-- Cards viewport — row built by JS -->
        <div class="glh-cards-vp">
          <div class="glh-cards-row"></div>
        </div>

        <!-- Card nav tag — built by JS -->
        <div class="glh-cards-tag"></div>

        <!-- Blurb — positioned by JS -->
        <div class="glh-blurb">
          <p>Golf participation is up 46% since 2020, fueling demand for homes near premier courses.</p>
          <a href="#" class="glh-blurb-cta">View All Golf Properties</a>
        </div>

      </div><!-- /.glh-stage -->
    </div><!-- /.glh-track -->
  </div><!-- /.lcw-panel--golf -->

</section><!-- /#sg-lifestyle-carousel -->


<?php
/* ============================================================
 *  SECTION 5 — AREAS SECTION
 *  ACF: areas_section_title, areas[] → name, region, image
 *       (JS renders the grid dynamically with static data)
 * ============================================================ */
?>
<section class="sg-areas sg-fade-in" aria-label="Areas we serve">

  <div class="sg-areas__inner">

    <!-- Section header -->
    <div class="sg-areas__header">
      <h2 class="sg-areas__heading">
        <!-- ACF: areas_title -->
        Areas We Serve
      </h2>
    </div>

    <!-- Mobile dropdown filter -->
    <div class="sg-areas__dropdown-wrap">
      <select class="sg-areas__dropdown" aria-label="Filter by region">
        <option value="All Markets">All Markets</option>
        <option value="Caribbean">Caribbean</option>
        <option value="East Coast">East Coast</option>
        <option value="Gulf Coast">Gulf Coast</option>
        <option value="West Coast">West Coast</option>
        <option value="Mountain Regions">Mountain Regions</option>
        <option value="Southern">Southern</option>
      </select>
      <span class="sg-areas__dropdown-caret" aria-hidden="true">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"/></svg>
      </span>
    </div>

    <!-- Desktop tab bar filter -->
    <div class="sg-areas__tabs-wrap">
      <div class="sg-areas__tab-bar">
        <div class="sg-areas__tab-row" role="tablist" aria-label="Filter by region">
          <button class="sg-areas__tab is-active" role="tab" aria-selected="true" data-filter="All Markets">
            <span class="sg-areas__tab-label">All Markets</span>
            <span class="sg-areas__tab-line" aria-hidden="true"><span class="sg-areas__tab-underline"></span></span>
          </button>
          <button class="sg-areas__tab" role="tab" aria-selected="false" data-filter="Caribbean">
            <span class="sg-areas__tab-label">Caribbean</span>
            <span class="sg-areas__tab-line" aria-hidden="true"><span class="sg-areas__tab-underline"></span></span>
          </button>
          <button class="sg-areas__tab" role="tab" aria-selected="false" data-filter="East Coast">
            <span class="sg-areas__tab-label">East Coast</span>
            <span class="sg-areas__tab-line" aria-hidden="true"><span class="sg-areas__tab-underline"></span></span>
          </button>
          <button class="sg-areas__tab" role="tab" aria-selected="false" data-filter="Gulf Coast">
            <span class="sg-areas__tab-label">Gulf Coast</span>
            <span class="sg-areas__tab-line" aria-hidden="true"><span class="sg-areas__tab-underline"></span></span>
          </button>
          <button class="sg-areas__tab" role="tab" aria-selected="false" data-filter="West Coast">
            <span class="sg-areas__tab-label">West Coast</span>
            <span class="sg-areas__tab-line" aria-hidden="true"><span class="sg-areas__tab-underline"></span></span>
          </button>
          <button class="sg-areas__tab" role="tab" aria-selected="false" data-filter="Mountain Regions">
            <span class="sg-areas__tab-label">Mountain</span>
            <span class="sg-areas__tab-line" aria-hidden="true"><span class="sg-areas__tab-underline"></span></span>
          </button>
          <button class="sg-areas__tab" role="tab" aria-selected="false" data-filter="Southern">
            <span class="sg-areas__tab-label">Southern</span>
            <span class="sg-areas__tab-line" aria-hidden="true"><span class="sg-areas__tab-underline"></span></span>
          </button>
        </div>
      </div>
    </div>

    <p class="sg-areas__count" aria-live="polite">22 AREAS SERVED</p>

    <!-- Grid — rendered by JS -->
    <div class="sg-areas__grid" role="list" aria-live="polite" aria-label="Area listings"></div>

    <!-- Pagination — shown by JS when needed -->
    <div class="sg-areas__pagination" aria-label="Pagination" style="display:none">
      <button class="sg-areas__page-btn sg-areas__page-btn--prev" aria-label="Previous page" disabled>
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
        </svg>
      </button>
      <span class="sg-areas__page-label" aria-live="polite">1 / 2</span>
      <button class="sg-areas__page-btn sg-areas__page-btn--next" aria-label="Next page">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
        </svg>
      </button>
    </div>

  </div><!-- /.sg-areas__inner -->

</section><!-- /.sg-areas -->


<?php
/* ============================================================
 *  SECTION 6 — WHY SEAGLASS BRAND (video bg + glass cards)
 *  ACF: why_bg_video, why_eyebrow, why_title, why_tagline,
 *       why_buyers_body, why_sellers_body, why_buyers_cta,
 *       why_sellers_cta
 * ============================================================ */
?>
<section class="sg-why-seaglass" aria-label="Why SeaGlass">

  <!-- SVG filter for liquid glass distortion — must live in DOM -->
  <svg width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true">
    <defs>
      <filter id="glass-distortion-brand" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.012" numOctaves="2" seed="92" result="noise"/>
        <feGaussianBlur in="noise" stdDeviation="2" result="blurred"/>
        <feDisplacementMap in="SourceGraphic" in2="blurred" scale="28" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
  </svg>

  <!-- Background video -->
  <div class="sg-why-seaglass__bg" aria-hidden="true">
    <!-- ACF: why_bg_video -->
    <video class="sg-why-seaglass__video" autoplay muted loop playsinline
           poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop">
      <source src="https://res.cloudinary.com/dkzsdyown/video/upload/v1780522023/shqijzcxhmrciwj0abq8_tvjeno.mp4" type="video/mp4">
    </video>
    <div class="sg-why-seaglass__scrim" aria-hidden="true"></div>
  </div>

  <div class="sg-why-seaglass__content">
    <div class="sg-why-seaglass__cards">

      <!-- Single shared liquid glass bg — spans main card + expanded panel -->
      <div class="sg-why-seaglass__glass-bg" aria-hidden="true"></div>

      <!-- Main glass card -->
      <div class="sg-why-seaglass__main">

        <!-- Card content -->
        <div style="position:relative;z-index:1;display:flex;flex-direction:column;gap:24px;">
          <h2 class="sg-why-seaglass__heading">
            <!-- ACF: why_title -->
            Why choose SeaGlass?
          </h2>
          <div style="display:flex;flex-direction:column;gap:24px;">
            <p class="sg-why-seaglass__body-text">
              <!-- ACF: why_body -->
              We combine deep coastal market expertise with a straightforward,
              results-driven approach to buy and sell premium real estate.
            </p>
            <div class="sg-why-seaglass__ctas">
              <!-- ACF: why_buyers_cta_label, why_sellers_cta_label -->
              <button class="sg-why-seaglass__cta-btn" type="button" data-panel="buyers">For Buyers</button>
              <button class="sg-why-seaglass__cta-btn" type="button" data-panel="sellers">For Sellers</button>
            </div>
          </div>
        </div>
      </div><!-- /.sg-why-seaglass__main -->

      <!-- Expandable side panel — content swapped by JS -->
      <div class="sg-why-seaglass__panel" aria-live="polite">
        <div class="sg-why-seaglass__panel-inner">
          <button class="sg-why-seaglass__panel-close" aria-label="Close panel">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div class="sg-why-seaglass__panel-content">
            <p class="sg-why-seaglass__panel-label"></p>
            <p class="sg-why-seaglass__panel-body"></p>
            <a href="#" class="sg-why-seaglass__panel-cta"></a>
          </div>
        </div>
      </div>

    </div><!-- /.sg-why-seaglass__cards -->
  </div><!-- /.sg-why-seaglass__content -->

</section><!-- /.sg-why-seaglass -->


<?php
/* ============================================================
 *  SECTION 7 — BROKERAGE (tabbed content + image)
 *  ACF: brokerage_heading, brokerage_tabs[] → label, title,
 *       body, cta_label, cta_url, image
 * ============================================================ */
?>
<section class="sg-brokerage sg-fade-in" aria-label="Our brokerage">

  <div class="sg-brokerage__inner">

    <div class="sg-brokerage__heading-wrap">
      <h2 class="sg-brokerage__heading">
        <!-- ACF: brokerage_heading -->
        A brokerage that elevates <em>your</em> business
      </h2>
    </div>

    <!-- Mobile dropdown -->
    <div class="sg-brokerage__dropdown-wrap">
      <select class="sg-brokerage__select" aria-label="Select topic">
        <option value="about">About</option>
        <option value="values">Values</option>
        <option value="design">Design</option>
        <option value="tech">Tech</option>
      </select>
      <div class="caret" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
        </svg>
      </div>
    </div>

    <!-- Desktop tab bar -->
    <!-- ACF: brokerage_tabs[] → label -->
    <div class="sg-brokerage__tabs" role="tablist" aria-label="Brokerage features">
      <button class="sg-brokerage__tab is-active" role="tab" aria-selected="true" data-tab="about">
        <div class="sg-brokerage__tab-bar"></div>
        <span class="sg-brokerage__tab-label">About</span>
      </button>
      <button class="sg-brokerage__tab" role="tab" aria-selected="false" data-tab="values">
        <div class="sg-brokerage__tab-bar"></div>
        <span class="sg-brokerage__tab-label">Values</span>
      </button>
      <button class="sg-brokerage__tab" role="tab" aria-selected="false" data-tab="design">
        <div class="sg-brokerage__tab-bar"></div>
        <span class="sg-brokerage__tab-label">Design</span>
      </button>
      <button class="sg-brokerage__tab" role="tab" aria-selected="false" data-tab="tech">
        <div class="sg-brokerage__tab-bar"></div>
        <span class="sg-brokerage__tab-label">Tech</span>
      </button>
    </div>

    <!-- Tab panels — ACF: brokerage_tabs[] → title, body, cta_label, cta_url, image -->
    <div class="sg-brokerage__panel is-active" role="tabpanel" data-tab="about">
      <div class="sg-brokerage__panel-text">
        <h3 class="sg-brokerage__panel-title">Who we are</h3>
        <p class="sg-brokerage__panel-body">We are a luxury real estate brokerage dedicated to providing exceptional service and unparalleled expertise. Our team of seasoned professionals brings decades of combined experience in high-end residential sales, investment properties, and exclusive market access. We pride ourselves on our white-glove approach, ensuring every client receives personalized attention and strategic guidance throughout their real estate journey.</p>
        <a href="#" class="sg-brokerage__panel-cta">Our story</a>
      </div>
      <div class="sg-brokerage__panel-image-wrap">
        <img src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1777311478/SG-Ocean-Signage_ullo9o.jpg"
             alt="Who we are" loading="lazy">
      </div>
    </div>

    <div class="sg-brokerage__panel" role="tabpanel" data-tab="values">
      <div class="sg-brokerage__panel-text">
        <h3 class="sg-brokerage__panel-title">Our core values</h3>
        <p class="sg-brokerage__panel-body">Integrity, transparency, and excellence form the foundation of everything we do. We believe in building lasting relationships based on trust and mutual respect. Our commitment to ethical practices, combined with our relentless pursuit of perfection, ensures that we consistently exceed expectations. We measure our success not just in transactions closed, but in the long-term satisfaction and loyalty of our clients.</p>
        <a href="#" class="sg-brokerage__panel-cta">Learn more</a>
      </div>
      <div class="sg-brokerage__panel-image-wrap">
        <img src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1777311744/Gemini_Generated_Image_xf4av3xf4av3xf4a_wo9qc0.png"
             alt="Our core values" loading="lazy">
      </div>
    </div>

    <div class="sg-brokerage__panel" role="tabpanel" data-tab="design">
      <div class="sg-brokerage__panel-text">
        <h3 class="sg-brokerage__panel-title">Design builds trust</h3>
        <p class="sg-brokerage__panel-body">Great marketing moves people. Great design builds confidence. From striking property marketing to educational client resources, our in-house creative team crafts every detail with impact. We understand that luxury buyers expect nothing less than perfection, which is why we invest in world-class photography, cinematic videography, and stunning print materials that showcase properties in their best light.</p>
        <a href="#" class="sg-brokerage__panel-cta">Our design</a>
      </div>
      <div class="sg-brokerage__panel-image-wrap">
        <img src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1779491783/5E7A8143-22E4-4004-87CA-6B70566B7E69_fnv6pe.png"
             alt="Design builds trust" loading="lazy">
      </div>
    </div>

    <div class="sg-brokerage__panel" role="tabpanel" data-tab="tech">
      <div class="sg-brokerage__panel-text">
        <h3 class="sg-brokerage__panel-title">Technology-driven excellence</h3>
        <p class="sg-brokerage__panel-body">In today's fast-paced market, cutting-edge technology isn't optional—it's essential. We leverage advanced data analytics, AI-powered market insights, and proprietary CRM systems to give our clients a competitive edge. Our digital marketing strategies reach qualified buyers worldwide, while our virtual tour technology allows prospects to experience properties from anywhere. Innovation meets tradition in our approach to modern real estate.</p>
        <a href="#" class="sg-brokerage__panel-cta">Explore tech</a>
      </div>
      <div class="sg-brokerage__panel-image-wrap">
        <img src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1777311181/SG-Design_ujti9z.webp"
             alt="Technology-driven excellence" loading="lazy">
      </div>
    </div>

  </div><!-- /.sg-brokerage__inner -->

</section><!-- /.sg-brokerage -->


<?php
/* ============================================================
 *  SECTION 8 — FRANCHISE (hero band + dual path cards)
 *  ACF: franchise_hero_image, franchise_eyebrow,
 *       franchise_hero_title, franchise_hero_body,
 *       franchise_card_1_* / franchise_card_2_*
 * ============================================================ */
?>
<section class="sg-franchise is-visible" aria-label="Franchise">

  <!-- Hero band with parallax image -->
  <div class="sg-franchise__hero">
    <div class="sg-franchise__hero-bg" aria-hidden="true">
      <!-- ACF: franchise_hero_image -->
      <img class="sg-franchise__hero-img" loading="lazy"
           src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1781556701/f289da61-b63d-455c-9841-80c2ed2caf7a_ukzmp4.jpg"
           alt="">
      <div class="sg-franchise__hero-gradient" aria-hidden="true"></div>
    </div>

    <!-- Glass card -->
    <div class="sg-franchise__hero-card">
      <div class="sg-franchise__hero-card-glass" aria-hidden="true"></div>
      <div class="sg-franchise__hero-card-text">
        <h2 class="sg-franchise__hero-title">
          <!-- ACF: franchise_hero_title -->
          Live the lifestyle. Build your legacy with SeaGlass.
        </h2>
        <p class="sg-franchise__hero-body">
          <!-- ACF: franchise_hero_body -->
          Join a real estate brand defined by local soul, not algorithms, and build a business rooted in the communities you serve.
        </p>
      </div>
    </div>

  </div><!-- /.sg-franchise__hero -->

  <!-- Dual path cards -->
  <!-- ACF: franchise_cards[] → eyebrow, title, body, list_items[], cta_label, cta_url, image -->
  <div class="sg-franchise__cards">

    <article class="sg-franchise-card is-visible">
      <div class="sg-franchise-card__image-frame">
        <div class="sg-franchise-card__image-wrap">
          <img class="sg-franchise-card__image" loading="lazy"
               src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1777312474/Gemini_Generated_Image_tryiidtryiidtryi_fbzsxn.png"
               alt="Become an Agent">
        </div>
      </div>
      <div class="sg-franchise-card__body">
        <p class="sg-franchise-card__eyebrow">For Owners</p>
        <h3 class="sg-franchise-card__title">Open a SeaGlass office</h3>
        <p class="sg-franchise-card__body-text">Launch and grow your business with the brand, network and skills behind SeaGlass.</p>
        <ul class="sg-franchise-card__list">
          <li class="sg-franchise-card__list-item">
            <span class="sg-franchise-card__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0d84a9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg>
            </span>
            <span class="sg-franchise-card__list-text">Marketing, design &amp; legal support</span>
          </li>
          <li class="sg-franchise-card__list-item">
            <span class="sg-franchise-card__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0d84a9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg>
            </span>
            <span class="sg-franchise-card__list-text">Management consultation and training</span>
          </li>
          <li class="sg-franchise-card__list-item">
            <span class="sg-franchise-card__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0d84a9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg>
            </span>
            <span class="sg-franchise-card__list-text">National network &amp; brand partnerships</span>
          </li>
        </ul>
        <a href="#" class="sg-franchise-card__cta">Learn about franchising</a>
      </div>
    </article>

    <article class="sg-franchise-card is-visible">
      <div class="sg-franchise-card__image-frame">
        <div class="sg-franchise-card__image-wrap">
          <img class="sg-franchise-card__image" loading="lazy"
               src="https://res.cloudinary.com/dpqzkg1yc/image/upload/v1777311744/Gemini_Generated_Image_xf4av3xf4av3xf4a_wo9qc0.png"
               alt="Become a SeaGlass Agent">
        </div>
      </div>
      <div class="sg-franchise-card__body">
        <p class="sg-franchise-card__eyebrow">For Agents</p>
        <h3 class="sg-franchise-card__title">Become a SeaGlass agent</h3>
        <p class="sg-franchise-card__body-text">We support our agents with best-in-class marketing, operations and technology.</p>
        <ul class="sg-franchise-card__list">
          <li class="sg-franchise-card__list-item">
            <span class="sg-franchise-card__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0d84a9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg>
            </span>
            <span class="sg-franchise-card__list-text">Industry-leading commission split</span>
          </li>
          <li class="sg-franchise-card__list-item">
            <span class="sg-franchise-card__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0d84a9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg>
            </span>
            <span class="sg-franchise-card__list-text">Robust in-house marketing &amp; tech</span>
          </li>
          <li class="sg-franchise-card__list-item">
            <span class="sg-franchise-card__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0d84a9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg>
            </span>
            <span class="sg-franchise-card__list-text">Access to our best-in-class technology</span>
          </li>
        </ul>
        <a href="#" class="sg-franchise-card__cta">Get in touch</a>
      </div>
    </article>

  </div><!-- /.sg-franchise__cards -->

</section><!-- /.sg-franchise -->

<?php
get_footer();
?>
