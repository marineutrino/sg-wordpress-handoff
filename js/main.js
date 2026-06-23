/**
 * SeaGlass — main.js
 * Vanilla JS for all homepage interactions.
 * No framework dependencies. Requires Swiper (CDN) for the hero carousel.
 */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  //  Scroll-reveal utility (replaces Framer Motion FadeIn)
  // ============================================================
  function initFadeIns() {
    var els = document.querySelectorAll('.sg-fade-in');
    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    els.forEach(function (el) { io.observe(el); });
  }


  // ============================================================
  //  Header — sticky / scrolled state
  // ============================================================
  function initHeader() {
    var header = document.getElementById('sg-site-header');
    if (!header) return;

    var lastScrollY = window.scrollY;

    function onScroll() {
      var scrollY = window.scrollY;

      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide on scroll down past 80px, reveal on scroll up
      if (scrollY > lastScrollY && scrollY > 80) {
        header.classList.add('nav-hidden');
      } else {
        header.classList.remove('nav-hidden');
      }
      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Show hamburger only when nav items no longer fit (desktop only)
    var nav   = header.querySelector('.sg-nav');
    var links = header.querySelector('.sg-nav__links');
    var logo  = header.querySelector('.sg-nav__logo');
    var icons = header.querySelector('.sg-nav__icons');

    function checkNavFit() {
      if (!nav || !links || !logo || !icons) return;
      if (window.innerWidth < 1024) return; // mobile CSS handles it
      var available = nav.clientWidth - logo.offsetWidth - icons.offsetWidth - 80;
      var needed    = links.offsetWidth;
      if (needed > available) {
        header.classList.add('nav-collapsed');
      } else {
        header.classList.remove('nav-collapsed');
      }
    }

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(checkNavFit).observe(header);
    }
    window.addEventListener('resize', checkNavFit);
    checkNavFit();
  }


  // ============================================================
  //  Mobile Menu
  // ============================================================
  function initMobileMenu() {
    var overlay  = document.getElementById('sg-mobile-menu-overlay');
    var menu     = document.getElementById('sg-mobile-menu');
    var openBtn  = document.getElementById('sg-nav-hamburger');
    var closeBtn = document.getElementById('sg-mobile-menu-close');

    function open() {
      if (overlay) overlay.classList.add('is-open');
      if (menu)    menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      if (overlay) overlay.classList.remove('is-open');
      if (menu)    menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (openBtn)  openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay)  overlay.addEventListener('click', close);

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) close();
    });
  }


  // ============================================================
  //  Hero — Swiper carousel + search + pills
  // ============================================================
  function initHero() {
    // Swiper (fade carousel)
    if (typeof Swiper !== 'undefined') {
      new Swiper('.sg-hero .swiper', {
        effect: 'fade',
        loop: true,
        autoplay: false,
        speed: 800,
        navigation: {
          prevEl: '.sg-hero__prev',
          nextEl: '.sg-hero__next',
        },
      });
    }

    // Search toggle
    var searchIcon   = document.getElementById('sg-hero-search-icon');
    var searchField  = document.getElementById('sg-hero-search-field');
    var searchInput  = document.getElementById('sg-hero-search-input');
    var searchClose  = document.getElementById('sg-hero-search-close');
    var pillsWrap    = document.getElementById('sg-hero-pills');
    var searchWrap   = document.getElementById('sg-hero-search-wrap');

    // Keyboard-reveal: scroll page so search wrap + pills stay above the software keyboard.
    // Mirrors the React useEffect that listens on visualViewport.resize.
    var _kbTimer   = null;
    var _kbHandler = null;

    function attachKeyboardReveal() {
      if (window.innerWidth >= 1024) return; // desktop: no on-screen keyboard to worry about

      function scrollToReveal() {
        if (!searchWrap) return;
        var vv       = window.visualViewport;
        var vvBottom = vv ? (vv.offsetTop + vv.height) : window.innerHeight;
        var rect     = searchWrap.getBoundingClientRect();
        // target bottom = wrap top + ~180px (field height + pill rows)
        var targetBottom = rect.top + 180;
        if (targetBottom > vvBottom) {
          window.scrollBy({ top: targetBottom - vvBottom + 16, behavior: 'smooth' });
        }
      }

      _kbTimer   = setTimeout(scrollToReveal, 350); // wait for keyboard to finish rising
      _kbHandler = scrollToReveal;
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', _kbHandler);
      }
    }

    function detachKeyboardReveal() {
      if (_kbTimer)   { clearTimeout(_kbTimer); _kbTimer = null; }
      if (_kbHandler) {
        if (window.visualViewport) window.visualViewport.removeEventListener('resize', _kbHandler);
        _kbHandler = null;
      }
    }

    function openSearch() {
      if (searchField) searchField.classList.add('is-open');
      if (pillsWrap)   pillsWrap.classList.add('is-open');
      if (searchInput) searchInput.focus();
      attachKeyboardReveal();
    }

    function closeSearch() {
      if (searchField) searchField.classList.remove('is-open');
      if (pillsWrap)   pillsWrap.classList.remove('is-open');
      if (searchInput) searchInput.value = '';
      detachKeyboardReveal();
    }

    if (searchIcon) searchIcon.addEventListener('click', function() {
      if (searchField && searchField.classList.contains('is-open')) {
        closeSearch();
      } else {
        openSearch();
      }
    });
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    // Close when clicking outside
    document.addEventListener('mousedown', function (e) {
      if (searchWrap && !searchWrap.contains(e.target)) {
        closeSearch();
      }
    });

    // Pills scroll to listing showcase
    var pills = document.querySelectorAll('.sg-hero__pill');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        closeSearch();
        var target = document.getElementById('listing-showcase');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }


  // ============================================================
  //  Elite Destinations — parallax bg + boat reveal
  // ============================================================
  function initEliteDestinations() {
    var section  = document.querySelector('.sg-elite-destinations');
    var bgImg    = document.querySelector('.sg-elite-destinations__bg-img');
    var boatImg  = document.querySelector('.sg-elite-destinations__boat img');

    if (!section) return;

    function onScroll() {
      var rect = section.getBoundingClientRect();
      var progress = -rect.top / (rect.height + window.innerHeight);

      if (bgImg) {
        bgImg.style.transform = 'translateY(' + (progress * 60) + 'px)';
      }

      if (boatImg) {
        var enterProgress = (window.innerHeight * 2.2 - rect.bottom) / (window.innerHeight * 4.4);
        var clamped = Math.max(0, enterProgress);
        boatImg.style.transform = 'translateY(' + ((1 - clamped) * 100) + '%)';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  // ============================================================
  //  Listing Showcase — tabs + horizontal scroll + card reveal
  // ============================================================
  function initListingShowcase() {
    var tabs     = document.querySelectorAll('.sg-listing-tab');
    var cards    = document.querySelectorAll('.sg-listing-card');
    var scrollEl = document.querySelector('.sg-listing-showcase__scroll');
    var leftBtn  = document.querySelector('.sg-listing-showcase__arrow--left');
    var rightBtn = document.querySelector('.sg-listing-showcase__arrow--right');
    var sentinel = document.querySelector('.sg-listing-showcase__sentinel');

    // Tab switching (visual only — ACF will filter by taxonomy)
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          t.classList.remove('is-active');
          var line = t.querySelector('.sg-listing-tab__underline');
          if (line) line.style.transform = 'scaleX(0)';
        });
        this.classList.add('is-active');
        var activeLine = this.querySelector('.sg-listing-tab__underline');
        if (activeLine) activeLine.style.transform = 'scaleX(1)';

        // Sync upper-left lifestyle label on each card to the active tab
        var labelEl = this.querySelector('.sg-listing-tab__label');
        if (labelEl) {
          var labelText = labelEl.textContent;
          cards.forEach(function (card) {
            var lifestyle = card.querySelector('.sg-listing-card__lifestyle span');
            if (lifestyle) lifestyle.textContent = labelText;
          });
        }
      });
    });

    // Card reveal via IntersectionObserver
    if (sentinel && cards.length) {
      var sentinelIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            cards.forEach(function (card, i) {
              setTimeout(function () {
                card.classList.add('is-revealed');
              }, Math.min(i, 3) * 100);
            });
            sentinelIo.disconnect();
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });

      sentinelIo.observe(sentinel);
    }

    // Arrow scroll
    function getCardWidth() {
      var first = scrollEl && scrollEl.querySelector('.sg-listing-card');
      return first ? first.offsetWidth + 20 : 580;
    }

    if (leftBtn && scrollEl) {
      leftBtn.addEventListener('click', function () {
        scrollEl.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
      });
    }
    if (rightBtn && scrollEl) {
      rightBtn.addEventListener('click', function () {
        scrollEl.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
      });
    }
  }


  // ============================================================
  //  Coastal Living Hero — scroll-driven animation
  //  (Adapted from CoastalLivingHero.tsx, TypeScript removed)
  // ============================================================
  function initCoastalLivingHero() {
    var track    = document.querySelector('.clh-track');
    var frame    = document.querySelector('.clh-frame');
    var layerA   = document.querySelector('.clh-layer-a');
    var layerB   = document.querySelector('.clh-layer-b');
    var tagline  = document.querySelector('.clh-tagline');
    var coastal  = document.querySelector('.clh-coastal');
    var hint     = document.querySelector('.clh-hint');
    var locHead  = document.querySelector('.clh-loc-head');
    var locList  = document.querySelector('.clh-loc-list');
    var cardsVp  = document.querySelector('.clh-cards-vp');
    var cardsTag = document.querySelector('.clh-cards-tag');
    var statsEl  = document.querySelector('.clh-stats');
    var statCity = document.querySelector('.clh-stat-city');
    var viewLink = document.querySelector('.clh-view-link');
    var blurb    = document.querySelector('.clh-blurb');

    if (!track || !frame) return;

    var locations = [
      { name: 'Saint Croix',    img: 'https://www.vacationstravel.com/wp-content/uploads/2023/03/AK-Greece.jpg',                                                                                                                stats: { listings: 34, avgPrice: '$1.2M', priceRange: '$350K to $12M USD' } },
      { name: 'Saint Thomas',   img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop',                                                                                                                stats: { listings: 58, avgPrice: '$2.1M', priceRange: '$500K to $50M USD' } },
      { name: 'Saint John',     img: 'https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?q=80&w=1170&auto=format&fit=crop',                                                                                                                stats: { listings: 22, avgPrice: '$3.4M', priceRange: '$800K to $18M USD' } },
      { name: 'Fort Myers, FL', img: 'https://images.unsplash.com/photo-1501509497947-782640bc1412?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',                                                                                                                stats: { listings: 81, avgPrice: '$333K', priceRange: '$200K to $18M USD' } },
    ];

    var listings = [
      { img: 'https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzb3J0fGVufDB8fDB8fHww', price: '$6,495,000 USD', addr: '43 Kaibo Crescent Dr', nm: 'Saint Croix' },
      { img: 'https://images.unsplash.com/photo-1651108066220-f61c22fc281f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGx1eHVyeSUyMHZpbGxhfGVufDB8fDB8fHww', price: '$49,950,000 USD', addr: 'Castillo Caribe',     nm: 'Saint Thomas' },
      { img: 'https://images.unsplash.com/photo-1582533401888-825fb21aedf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fHww', price: '$10,600,000 USD', addr: '528 Paradise Cove',   nm: 'Miami Beach' },
      { img: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400&h=300&fit=crop',  price: '$4,765,000 USD',  addr: '892 Oceanview Dr',   nm: 'Malibu' },
      { img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop', price: '$1,895,000 USD',  addr: '123 Seaside Lane',   nm: 'Charleston' },
      { img: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop', price: '$5,250,000 USD',  addr: '456 Marina Blvd',    nm: 'Fort Myers' },
    ];

    var state = {
      activeLoc: 0,
      interacted: false,
      topLayer: layerA,
      botLayer: layerB,
      locEls: [],
      cardEls: [],
      statsFaded: false,
      imageShrunkFired: false,
      navReadyFired: false,
      lockedLoc: null,
    };

    // Preload images
    locations.forEach(function (l) { var i = new Image(); i.src = l.img; });

    if (layerA) layerA.style.backgroundImage = 'url("' + locations[0].img + '")';
    if (layerB) layerB.style.opacity = '0';

    // Build location list
    if (locList) {
      locList.innerHTML = '';
      state.locEls = [];
      locations.forEach(function (l, i) {
        var el = document.createElement('div');
        el.className = 'clh-loc';
        el.innerHTML = '<span class="clh-idx">0' + (i + 1) + '</span><span class="clh-nm">' + l.name + '</span>';
        el.addEventListener('click', function () { selectLoc(i); });
        locList.appendChild(el);
        state.locEls.push(el);
      });
      locList.style.pointerEvents = 'auto';
    }

    // Disable cards-vp pointer events until cards are visible (it overlaps the loc list at z-index 15)
    if (cardsVp) cardsVp.style.pointerEvents = 'none';

    // Build cards
    var cardsRow = cardsVp && cardsVp.querySelector('.clh-cards-row');
    if (cardsRow) {
      cardsRow.innerHTML = '';
      state.cardEls = [];
      listings.forEach(function (c, idx) {
        var el = document.createElement('div');
        el.className = idx === 4 ? 'clh-card clh-card-flipped' : 'clh-card';
        el.innerHTML = '<div class="clh-ph"><img src="' + c.img + '" alt=""></div><div class="clh-body"><div class="clh-price">' + c.price + '</div><div class="clh-addr">' + c.addr + '</div><div class="clh-cnm">' + c.nm + '</div></div>';
        var img = el.querySelector('img');
        if (img) img.addEventListener('error', function () { this.style.display = 'none'; });
        cardsRow.appendChild(el);
        state.cardEls.push(el);
      });
    }

    // Card nav
    if (cardsTag) {
      cardsTag.innerHTML = '<div style="display:flex;gap:8px;align-items:center"><div style="width:64px;height:2px;background:#153e69"></div><div style="width:32px;height:2px;background:rgba(21,62,105,0.25)"></div><div style="width:32px;height:2px;background:rgba(21,62,105,0.25)"></div><div style="width:32px;height:2px;background:rgba(21,62,105,0.25)"></div></div><div style="display:flex;align-items:center;gap:4px"><span class="clh-counter" style="font-family:\'Montserrat\',sans-serif;font-size:12px;font-weight:500;letter-spacing:0.18em;color:#0d84a9;text-transform:uppercase;padding-right:8px;white-space:nowrap;">1 / ' + listings.length + '</span><button class="clh-cnav" data-nav="prev" aria-label="Previous listings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button><button class="clh-cnav" data-nav="next" aria-label="More listings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button></div>';
    }

    var cardPrev = cardsTag && cardsTag.querySelector('[data-nav="prev"]');
    var cardNext = cardsTag && cardsTag.querySelector('[data-nav="next"]');

    function selectLoc(i) {
      if (i !== state.activeLoc) {
        state.activeLoc = i;
        state.botLayer.style.backgroundImage = 'url("' + locations[i].img + '")';
        state.botLayer.style.opacity = '1';
        state.topLayer.style.opacity = '0';
        var t = state.topLayer; state.topLayer = state.botLayer; state.botLayer = t;
      }
      setActiveClass(i);
      var st = locations[i].stats;
      if (st && statCity && statsEl) {
        state.statsFaded = false;
        statCity.textContent = locations[i].name;
        statCity.style.opacity = '1';
        statCity.style.transform = 'translateY(0)';
        statsEl.innerHTML = '<div class="clh-stats-row"><div class="clh-stat"><span class="clh-stat-val">' + st.listings + '</span><span class="clh-stat-lbl">Available Listings</span></div><div class="clh-stat-div"></div><div class="clh-stat"><span class="clh-stat-val">' + st.avgPrice + '</span><span class="clh-stat-lbl">Avg. Home Price</span></div><div class="clh-stat-div"></div><div class="clh-stat"><span class="clh-stat-val">' + st.priceRange + '</span><span class="clh-stat-lbl">Price Range</span></div></div>';
        statsEl.style.opacity = '1';
        statsEl.style.transform = 'translateY(0)';
        if (viewLink) { viewLink.style.opacity = '1'; }
      }
    }

    function setActiveClass(i) {
      state.locEls.forEach(function (e, k) { e.classList.toggle('clh-active', k === i); });
    }

    // Mobile image nav buttons — cycle locations, cross to Golf at last location
    var mobImgPrev = document.getElementById('clh-mob-img-prev');
    var mobImgNext = document.getElementById('clh-mob-img-next');

    function updateMobImgNav() {
      if (mobImgPrev) mobImgPrev.disabled = (state.activeLoc === 0);
      // next never disabled — last location crosses to Golf
      if (mobImgNext) mobImgNext.disabled = false;
    }

    if (mobImgPrev) {
      mobImgPrev.addEventListener('click', function () {
        if (state.activeLoc > 0) {
          selectLoc(state.activeLoc - 1);
          updateMobImgNav();
        }
      });
    }
    if (mobImgNext) {
      mobImgNext.addEventListener('click', function () {
        if (state.activeLoc < locations.length - 1) {
          selectLoc(state.activeLoc + 1);
          updateMobImgNav();
        } else {
          // Last coastal location → switch to Golf section, reset Golf to location 0
          document.dispatchEvent(new CustomEvent('mob-switch-to-golf'));
        }
      });
    }

    updateMobImgNav();

    // Touch swipe on the image frame (mobile)
    if (frame) {
      var clhTouchStartX = 0;
      frame.addEventListener('touchstart', function (e) { clhTouchStartX = e.touches[0].clientX; }, { passive: true });
      frame.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - clhTouchStartX;
        if (Math.abs(dx) < 40) return;
        if (dx < 0) {
          if (state.activeLoc < locations.length - 1) { selectLoc(state.activeLoc + 1); updateMobImgNav(); }
          else { document.dispatchEvent(new CustomEvent('mob-switch-to-golf')); }
        } else {
          if (state.activeLoc > 0) { selectLoc(state.activeLoc - 1); updateMobImgNav(); }
        }
      }, { passive: true });
    }

    var clamp  = function (v, a, b) { return Math.min(b !== undefined ? b : 1, Math.max(a !== undefined ? a : 0, v)); };
    var lerp   = function (a, b, t) { return a + (b - a) * t; };
    var sub    = function (p, a, b) { return clamp((p - a) / (b - a)); };
    var easeQuart    = function (t) { return t < 0.5 ? 8*t*t*t*t : 1 - Math.pow(-2*t+2,4)/2; };
    var easeOut      = function (t) { return 1 - Math.pow(1-t, 3); };
    var easeOutQuint = function (t) { return 1 - Math.pow(1-t, 5); };
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var CGAP = 16;

    function sizeCards() {
      if (!cardsVp) return;
      var vis = cardsVp.clientWidth;
      var per = vis < 490 ? 2.5 : vis < 600 ? 2.8 : 3.5;
      var minC = vis < 490 ? 110 : 158;
      var c = (vis - Math.max(0, Math.ceil(per) - 1) * CGAP) / per;
      c = Math.max(minC, Math.min(c, 222));
      cardsVp.style.setProperty('--cardw', c.toFixed(1) + 'px');
      cardsVp.style.setProperty('--cgap', CGAP + 'px');
      var probe = cardsRow && cardsRow.querySelector('.clh-card');
      if (probe) {
        var phEl   = probe.querySelector('.clh-ph');
        var bodyEl = probe.querySelector('.clh-body');
        var phH    = phEl   ? (phEl.getBoundingClientRect().height   || c)  : c;
        var bodyH  = bodyEl ? (bodyEl.getBoundingClientRect().height || 86) : 86;
        cardsVp.style.height = (Math.ceil(phH + bodyH + 12) + 24) + 'px';
      }
    }

    function cardStep() {
      return parseFloat(getComputedStyle(cardsVp).getPropertyValue('--cardw') || '230') + CGAP;
    }

    function updateNav() {
      if (!cardsVp || !cardPrev || !cardNext) return;
      var max = cardsVp.scrollWidth - cardsVp.clientWidth - 2;
      if (cardsVp.scrollLeft <= 2) cardPrev.setAttribute('disabled', ''); else cardPrev.removeAttribute('disabled');
      if (cardsVp.scrollLeft >= max) cardNext.setAttribute('disabled', ''); else cardNext.removeAttribute('disabled');
    }

    function render(p) {
      var vw = innerWidth, vh = innerHeight;

      // On mobile: skip scroll animation, show all content statically
      if (vw < 768) {
        if (frame) { frame.style.removeProperty('left'); frame.style.removeProperty('top'); frame.style.removeProperty('width'); frame.style.removeProperty('height'); }
        if (tagline) tagline.style.opacity = '0';
        if (hint)    hint.style.opacity    = '0';
        // Let CSS control the coastal headline on mobile (CSS sets opacity:1 + absolute top-left of image)
        if (coastal) coastal.style.removeProperty('opacity');
        if (locHead) { locHead.style.opacity = '1'; locHead.style.transform = 'none'; }
        state.locEls.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; });
        if (cardsVp) { cardsVp.style.opacity = '1'; cardsVp.style.pointerEvents = 'auto'; }
        if (cardsTag) { cardsTag.style.opacity = '1'; cardsTag.style.transform = 'none'; }
        state.cardEls.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; el.style.transition = ''; });
        if (locList) locList.style.pointerEvents = 'auto';
        if (cardPrev) cardPrev.style.pointerEvents = 'auto';
        if (cardNext) cardNext.style.pointerEvents = 'auto';
        updateNav();
        return;
      }

      var isMob = vw < 480;
      var fL = vw * 3.5 / 100;
      var fT = vh * (isMob ? 4 : 7.5) / 100;
      var fW = vw * (isMob ? 90 : 58) / 100;
      var fH = vh * (isMob ? 38 : 60) / 100;

      var ip = easeQuart(sub(p, 0, 0.42));
      var frameL = lerp(0, fL, ip), frameT = lerp(0, fT, ip);
      var frameW = lerp(vw, fW, ip), frameH = lerp(vh, fH, ip);
      if (frame) {
        frame.style.left   = frameL + 'px';
        frame.style.top    = frameT + 'px';
        frame.style.width  = frameW + 'px';
        frame.style.height = frameH + 'px';
        if (ip > 0.06) frame.classList.add('clh-framed'); else frame.classList.remove('clh-framed');
      }

      // Notify lifestyle carousel wrapper
      var shrunk = ip >= 1;
      if (shrunk !== state.imageShrunkFired) {
        state.imageShrunkFired = shrunk;
        document.dispatchEvent(new CustomEvent('clh-image-shrunk', { detail: shrunk }));
      }
      // Chevron visible only after listing row is fully loaded (p >= 0.90, matches React navReady)
      var navReady = p >= 0.90;
      if (navReady !== state.navReadyFired) {
        state.navReadyFired = navReady;
        document.dispatchEvent(new CustomEvent('clh-nav-ready', { detail: navReady }));
      }

      if (hint) hint.style.opacity = String(1 - clamp(p / 0.05));

      if (tagline) {
        tagline.style.left = (frameL + frameW / 2) + 'px';
        tagline.style.top  = (frameT + frameH / 2) + 'px';
        var tScale = lerp(1, 0.62, ip);
        var tFade  = 1 - easeOut(sub(p, 0.05, 0.34));
        tagline.style.transform = 'translate(-50%,-50%) scale(' + tScale + ')';
        tagline.style.opacity   = String(tFade);
      }

      var cp = easeOut(sub(p, 0.40, 0.56));
      if (coastal) {
        coastal.style.left      = (fL + Math.max(26, vw * 0.028)) + 'px';
        coastal.style.top       = (fT + Math.max(24, vh * 0.05))  + 'px';
        coastal.style.opacity   = String(cp);
        coastal.style.transform = 'translateY(' + lerp(34, 0, cp) + 'px)';
      }

      var lp = sub(p, 0.52, 0.86);
      var hp = easeOut(sub(p, 0.48, 0.6));

      if (lp <= 0) {
        if (!state.statsFaded) {
          state.statsFaded = true;
          if (statsEl)  { statsEl.style.opacity  = '0'; statsEl.style.transform  = ''; }
          if (statCity) { statCity.style.opacity = '0'; statCity.style.transform = 'translateY(8px)'; }
          if (viewLink) { viewLink.style.opacity = '0'; }
        }
      } else { state.statsFaded = false; }

      if (locHead) { locHead.style.opacity = String(hp); locHead.style.transform = 'translateY(' + lerp(18, 0, hp) + 'px)'; }
      state.locEls.forEach(function (el, i) {
        var local = easeOut(clamp((lp - i * 0.13) / 0.55));
        el.style.opacity   = String(local);
        el.style.transform = 'translateY(' + lerp(28, 0, local) + 'px)';
      });

      var kp = sub(p, 0.75, 1);
      if (cardsVp) {
        cardsVp.style.opacity = String(easeOut(clamp(kp / 0.18)));
        if (!state.interacted) {
          var SPAN = 0.20, STEP = 0.14;
          state.cardEls.forEach(function (el, i) {
            var start = i * STEP;
            var local = easeOutQuint(clamp((kp - start) / SPAN));
            if (local >= 1) {
              el.style.transition = ''; el.style.opacity = ''; el.style.transform = '';
            } else {
              el.style.transition = 'none';
              el.style.opacity    = String(local);
              el.style.transform  = 'translateY(' + lerp(18, 0, local) + 'px)';
            }
          });
        }
        cardsVp.style.pointerEvents = kp > 0 ? 'auto' : 'none';
      }

      if (blurb) {
        var blurbOp = easeOutQuint(sub(p, 0.70, 0.92));
        blurb.style.left      = fL + 'px';
        blurb.style.top       = (fT + fH + 28) + 'px';
        blurb.style.opacity   = String(blurbOp);
        blurb.style.transform = 'translateY(' + lerp(14, 0, blurbOp) + 'px)';
        blurb.style.width     = Math.min(fW - 20, vw * 0.5 - fL - 24) + 'px';
      }

      if (cardsTag) {
        var navOp = easeOutQuint(sub(p, 0.72, 0.9));
        if (navOp > 0.6) updateNav();
        cardsTag.style.opacity   = String(navOp);
        cardsTag.style.transform = 'translateY(' + lerp(12, 0, navOp) + 'px)';
        if (cardPrev) cardPrev.style.pointerEvents = navOp > 0.6 ? 'auto' : 'none';
        if (cardNext) cardNext.style.pointerEvents = navOp > 0.6 ? 'auto' : 'none';
      }

    }

    function compute() {
      if (!track) return 0;
      var total = track.offsetHeight - innerHeight;
      if (total <= 0) return 0;
      return reduce ? 1 : clamp(-track.getBoundingClientRect().top / total);
    }

    if (cardsVp)  cardsVp.addEventListener('pointerenter',  function () { state.interacted = true; });
    if (locList)  locList.addEventListener('pointerenter',  function () { state.interacted = true; });
    if (cardPrev) cardPrev.addEventListener('click', function () { state.interacted = true; cardsVp.scrollBy({ left: -cardStep(), behavior: 'smooth' }); });
    if (cardNext) cardNext.addEventListener('click', function () { state.interacted = true; cardsVp.scrollBy({ left:  cardStep(), behavior: 'smooth' }); });
    if (cardsVp)  cardsVp.addEventListener('scroll', function () { state.interacted = true; updateNav(); }, { passive: true });

    var rafId = 0;
    window.addEventListener('scroll', function () {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function () { render(compute()); });
    }, { passive: true });

    window.addEventListener('resize', function () { sizeCards(); render(compute()); updateNav(); });

    // Expand coastal frame to full-screen so no off-white shows during golf slide-in
    document.addEventListener('clh-fill-frame', function () { render(0); });

    sizeCards();
    render(compute());
    updateNav();
    selectLoc(0); // populate stats & view-link on initial load (required for mobile)
    // Clear active highlight — user must click to select a location
    state.locEls.forEach(function(e) { e.classList.remove('clh-active'); });
  }


  // ============================================================
  //  Golf Course Living Hero — scroll-driven animation
  //  (Adapted from GolfCourseLivingHero.tsx, TypeScript removed)
  // ============================================================
  function initGolfCourseLivingHero() {
    var track    = document.querySelector('.glh-track');
    var frame    = document.querySelector('.glh-frame');
    var layerA   = document.querySelector('.glh-layer-a');
    var layerB   = document.querySelector('.glh-layer-b');
    var tagline  = document.querySelector('.glh-tagline');
    var coastal  = document.querySelector('.glh-coastal');
    var hint     = document.querySelector('.glh-hint');
    var locHead  = document.querySelector('.glh-loc-head');
    var locList  = document.querySelector('.glh-loc-list');
    var cardsVp  = document.querySelector('.glh-cards-vp');
    var cardsTag = document.querySelector('.glh-cards-tag');
    var statsEl  = document.querySelector('.glh-stats');
    var statCity = document.querySelector('.glh-stat-city');
    var viewLink = document.querySelector('.glh-view-link');
    var blurb    = document.querySelector('.glh-blurb');

    if (!track || !frame) return;

    var locations = [
      { name: 'Pebble Beach, CA',  img: 'https://images.unsplash.com/photo-1543105177-748ceda71741?q=80&w=2070&auto=format&fit=crop', stats: { listings: 18, avgPrice: '$4.2M', priceRange: '$1.8M to $28M USD' } },
      { name: 'Scottsdale, AZ',    img: 'https://images.unsplash.com/photo-1692087224072-83f25202ca4a?q=80&w=2009&auto=format&fit=crop', stats: { listings: 94, avgPrice: '$1.6M', priceRange: '$600K to $14M USD' } },
      { name: 'Kiawah Island, SC', img: 'https://images.unsplash.com/photo-1662515049537-5c4442e107d6?q=80&w=1951&auto=format&fit=crop', stats: { listings: 31, avgPrice: '$2.8M', priceRange: '$900K to $22M USD' } },
      { name: 'Palm Beach, FL',    img: 'https://images.unsplash.com/photo-1592919355415-9db1cd94b2ba?q=80&w=2532&auto=format&fit=crop', stats: { listings: 67, avgPrice: '$3.1M', priceRange: '$1.2M to $35M USD' } },
    ];

    var listings = [
      { img: 'https://images.unsplash.com/photo-1543105177-748ceda71741?w=900&auto=format&fit=crop&q=60', price: '$8,950,000 USD', addr: '17 Cypress Point Ln',  nm: 'Pebble Beach, CA' },
      { img: 'https://images.unsplash.com/photo-1596782680712-caf5530d2b3c?q=80&w=1674&auto=format&fit=crop', price: '$3,495,000 USD', addr: '92 Desert Fairway Dr', nm: 'Scottsdale, AZ' },
      { img: 'https://images.unsplash.com/photo-1605813451457-a4bed7fc6479?q=80&w=2070&auto=format&fit=crop', price: '$5,200,000 USD', addr: 'Ocean Course Blvd',   nm: 'Kiawah Island, SC' },
      { img: 'https://images.unsplash.com/photo-1742498626081-a64f9677f468?q=80&w=2232&auto=format&fit=crop', price: '$12,750,000 USD', addr: 'Greenview Estate Rd',nm: 'Palm Beach, FL' },
      { img: 'https://images.unsplash.com/photo-1594704698675-4d02bf122b19?q=80&w=1674&auto=format&fit=crop', price: '$2,850,000 USD', addr: 'Turnberry Ct',        nm: 'Scottsdale, AZ' },
      { img: 'https://images.unsplash.com/photo-1543105177-748ceda71741?w=900&auto=format&fit=crop&q=60', price: '$6,100,000 USD', addr: 'Club Manor Dr',       nm: 'Pebble Beach, CA' },
    ];

    var state = {
      activeLoc: 0, interacted: false,
      topLayer: layerA, botLayer: layerB,
      locEls: [], cardEls: [], statsFaded: false,
      imageShrunkFired: false,
      navReadyFired: false,
      lockedLoc: null,
    };

    locations.forEach(function (l) { var i = new Image(); i.src = l.img; });
    if (layerA) layerA.style.backgroundImage = 'url("' + locations[0].img + '")';
    if (layerB) layerB.style.opacity = '0';

    if (locList) {
      locList.innerHTML = '';
      state.locEls = [];
      locations.forEach(function (l, i) {
        var el = document.createElement('div');
        el.className = 'glh-loc';
        el.innerHTML = '<span class="glh-idx">0' + (i + 1) + '</span><span class="glh-nm">' + l.name + '</span>';
        el.addEventListener('click', function () { selectLoc(i); });
        locList.appendChild(el);
        state.locEls.push(el);
      });
    }

    var cardsRow = cardsVp && cardsVp.querySelector('.glh-cards-row');
    if (cardsRow) {
      cardsRow.innerHTML = '';
      state.cardEls = [];
      listings.forEach(function (c, idx) {
        var el = document.createElement('div');
        el.className = idx === 4 ? 'glh-card glh-card-flipped' : 'glh-card';
        el.innerHTML = '<div class="glh-ph"><img src="' + c.img + '" alt=""></div><div class="glh-body"><div class="glh-price">' + c.price + '</div><div class="glh-addr">' + c.addr + '</div><div class="glh-cnm">' + c.nm + '</div></div>';
        var img = el.querySelector('img');
        if (img) img.addEventListener('error', function () { this.style.display = 'none'; });
        cardsRow.appendChild(el);
        state.cardEls.push(el);
      });
    }

    if (cardsTag) {
      cardsTag.innerHTML = '<div style="display:flex;gap:8px;align-items:center"><div style="width:64px;height:2px;background:#153e69"></div><div style="width:32px;height:2px;background:rgba(21,62,105,0.25)"></div><div style="width:32px;height:2px;background:rgba(21,62,105,0.25)"></div><div style="width:32px;height:2px;background:rgba(21,62,105,0.25)"></div></div><div style="display:flex;align-items:center;gap:4px"><span class="glh-counter" style="font-family:\'Montserrat\',sans-serif;font-size:12px;font-weight:500;letter-spacing:0.18em;color:#0d84a9;text-transform:uppercase;padding-right:8px;white-space:nowrap;">1 / ' + listings.length + '</span><button class="glh-cnav" data-nav="prev" aria-label="Previous listings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button><button class="glh-cnav" data-nav="next" aria-label="More listings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button></div>';
    }

    var cardPrev = cardsTag && cardsTag.querySelector('[data-nav="prev"]');
    var cardNext = cardsTag && cardsTag.querySelector('[data-nav="next"]');

    function selectLoc(i) {
      if (i !== state.activeLoc) {
        state.activeLoc = i;
        state.botLayer.style.backgroundImage = 'url("' + locations[i].img + '")';
        state.botLayer.style.opacity = '1';
        state.topLayer.style.opacity = '0';
        var t = state.topLayer; state.topLayer = state.botLayer; state.botLayer = t;
      }
      setActiveClass(i);
      var st = locations[i].stats;
      if (st && statCity && statsEl) {
        state.statsFaded = false;
        statCity.textContent = locations[i].name;
        statCity.style.opacity = '1'; statCity.style.transform = 'translateY(0)';
        statsEl.innerHTML = '<div class="glh-stats-row"><div class="glh-stat"><span class="glh-stat-val">' + st.listings + '</span><span class="glh-stat-lbl">Available Listings</span></div><div class="glh-stat-div"></div><div class="glh-stat"><span class="glh-stat-val">' + st.avgPrice + '</span><span class="glh-stat-lbl">Avg. Home Price</span></div><div class="glh-stat-div"></div><div class="glh-stat"><span class="glh-stat-val">' + st.priceRange + '</span><span class="glh-stat-lbl">Price Range</span></div></div>';
        statsEl.style.opacity = '1'; statsEl.style.transform = 'translateY(0)';
        if (viewLink) { viewLink.style.opacity = '1'; }
      }
    }

    function setActiveClass(i) { state.locEls.forEach(function (e, k) { e.classList.toggle('glh-active', k === i); }); }

    // Mobile image nav buttons — cycle locations, cross back to Coastal at first location
    var mobImgPrev = document.getElementById('glh-mob-img-prev');
    var mobImgNext = document.getElementById('glh-mob-img-next');

    function updateMobImgNav() {
      // prev never disabled — first location crosses back to Coastal
      if (mobImgPrev) mobImgPrev.disabled = false;
      if (mobImgNext) mobImgNext.disabled = (state.activeLoc === locations.length - 1);
    }

    if (mobImgPrev) {
      mobImgPrev.addEventListener('click', function () {
        if (state.activeLoc > 0) {
          selectLoc(state.activeLoc - 1);
          updateMobImgNav();
        } else {
          // First golf location → switch back to Coastal section at last location
          document.dispatchEvent(new CustomEvent('mob-switch-to-coastal'));
        }
      });
    }
    if (mobImgNext) {
      mobImgNext.addEventListener('click', function () {
        if (state.activeLoc < locations.length - 1) {
          selectLoc(state.activeLoc + 1);
          updateMobImgNav();
        }
      });
    }

    // Reset to first location when entering Golf from Coastal
    document.addEventListener('mob-switch-to-golf', function () {
      if (state.activeLoc !== 0) {
        selectLoc(0);
        updateMobImgNav();
      }
    });

    updateMobImgNav();

    // Touch swipe on the image frame (mobile)
    if (frame) {
      var glhTouchStartX = 0;
      frame.addEventListener('touchstart', function (e) { glhTouchStartX = e.touches[0].clientX; }, { passive: true });
      frame.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - glhTouchStartX;
        if (Math.abs(dx) < 40) return;
        if (dx < 0) {
          if (state.activeLoc < locations.length - 1) { selectLoc(state.activeLoc + 1); updateMobImgNav(); }
        } else {
          if (state.activeLoc > 0) { selectLoc(state.activeLoc - 1); updateMobImgNav(); }
          else { document.dispatchEvent(new CustomEvent('mob-switch-to-coastal')); }
        }
      }, { passive: true });
    }

    var clamp  = function (v, a, b) { return Math.min(b !== undefined ? b : 1, Math.max(a !== undefined ? a : 0, v)); };
    var lerp   = function (a, b, t) { return a + (b - a) * t; };
    var sub    = function (p, a, b) { return clamp((p - a) / (b - a)); };
    var easeQuart    = function (t) { return t < 0.5 ? 8*t*t*t*t : 1 - Math.pow(-2*t+2,4)/2; };
    var easeOut      = function (t) { return 1 - Math.pow(1-t, 3); };
    var easeOutQuint = function (t) { return 1 - Math.pow(1-t, 5); };
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var CGAP = 16;
    var IMPL = 3.5, IMPT = 7.5, IMPW = 58, IMPH = 60;

    function sizeCards() {
      if (!cardsVp) return;
      var vis = cardsVp.clientWidth;
      var per = vis < 490 ? 2.5 : vis < 600 ? 2.8 : 3.5;
      var minC = vis < 490 ? 110 : 158;
      var c = (vis - Math.max(0, Math.ceil(per) - 1) * CGAP) / per;
      c = Math.max(minC, Math.min(c, 222));
      cardsVp.style.setProperty('--cardw', c.toFixed(1) + 'px');
      cardsVp.style.setProperty('--cgap', CGAP + 'px');
      var probe = cardsRow && cardsRow.querySelector('.glh-card');
      if (probe) {
        var phEl   = probe.querySelector('.glh-ph');
        var bodyEl = probe.querySelector('.glh-body');
        var phH    = phEl   ? (phEl.getBoundingClientRect().height   || c)  : c;
        var bodyH  = bodyEl ? (bodyEl.getBoundingClientRect().height || 86) : 86;
        cardsVp.style.height = (Math.ceil(phH + bodyH + 12) + 24) + 'px';
      }
    }

    function cardStep() { return parseFloat(getComputedStyle(cardsVp).getPropertyValue('--cardw') || '230') + CGAP; }

    function updateNav() {
      if (!cardsVp || !cardPrev || !cardNext) return;
      var max = cardsVp.scrollWidth - cardsVp.clientWidth - 2;
      if (cardsVp.scrollLeft <= 2) cardPrev.setAttribute('disabled', ''); else cardPrev.removeAttribute('disabled');
      if (cardsVp.scrollLeft >= max) cardNext.setAttribute('disabled', ''); else cardNext.removeAttribute('disabled');
    }

    function render(p) {
      var vw = innerWidth, vh = innerHeight;

      // On mobile: skip scroll animation, show all content statically
      if (vw < 768) {
        if (frame) { frame.style.removeProperty('left'); frame.style.removeProperty('top'); frame.style.removeProperty('width'); frame.style.removeProperty('height'); }
        // Let CSS control the golf headline on mobile
        if (coastal) coastal.style.removeProperty('opacity');
        if (locHead) { locHead.style.opacity = '1'; locHead.style.transform = 'none'; }
        state.locEls.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; });
        if (cardsVp) { cardsVp.style.opacity = '1'; cardsVp.style.pointerEvents = 'auto'; }
        if (cardsTag) { cardsTag.style.opacity = '1'; cardsTag.style.transform = 'none'; }
        state.cardEls.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; el.style.transition = ''; });
        if (locList) locList.style.pointerEvents = 'auto';
        if (cardPrev) cardPrev.style.pointerEvents = 'auto';
        if (cardNext) cardNext.style.pointerEvents = 'auto';
        updateNav();
        return;
      }

      var fL = vw * IMPL / 100, fT = vh * IMPT / 100;
      var fW = vw * IMPW / 100, fH = vh * IMPH / 100;
      var ip = easeQuart(sub(p, 0, 0.42));
      var shrunk = ip >= 1;
      if (shrunk !== state.imageShrunkFired) {
        state.imageShrunkFired = shrunk;
        document.dispatchEvent(new CustomEvent('glh-image-shrunk', { detail: shrunk }));
      }
      // Chevron visible only after listing row is fully loaded (p >= 0.90, matches React navReady)
      var navReady = p >= 0.90;
      if (navReady !== state.navReadyFired) {
        state.navReadyFired = navReady;
        document.dispatchEvent(new CustomEvent('glh-nav-ready', { detail: navReady }));
      }
      if (frame) {
        frame.style.left = lerp(0, fL, ip) + 'px'; frame.style.top  = lerp(0, fT, ip) + 'px';
        frame.style.width = lerp(vw, fW, ip) + 'px'; frame.style.height = lerp(vh, fH, ip) + 'px';
        if (ip > 0.06) frame.classList.add('glh-framed'); else frame.classList.remove('glh-framed');
      }
      var frameL = lerp(0, fL, ip), frameT = lerp(0, fT, ip);
      var frameW = lerp(vw, fW, ip), frameH = lerp(vh, fH, ip);
      if (hint) hint.style.opacity = String(1 - clamp(p / 0.05));
      if (tagline) {
        tagline.style.left = (frameL + frameW / 2) + 'px'; tagline.style.top = (frameT + frameH / 2) + 'px';
        tagline.style.transform = 'translate(-50%,-50%) scale(' + lerp(1, 0.62, ip) + ')';
        tagline.style.opacity = String(1 - easeOut(sub(p, 0.05, 0.34)));
      }
      var cp = easeOut(sub(p, 0.40, 0.56));
      if (coastal) {
        coastal.style.left = (fL + Math.max(26, vw * 0.028)) + 'px'; coastal.style.top = (fT + Math.max(24, vh * 0.05)) + 'px';
        coastal.style.opacity = String(cp); coastal.style.transform = 'translateY(' + lerp(34, 0, cp) + 'px)';
      }
      var lp = sub(p, 0.52, 0.86), hp = easeOut(sub(p, 0.48, 0.6));
      if (lp <= 0 && !state.statsFaded) {
        state.statsFaded = true;
        if (statsEl)  { statsEl.style.opacity  = '0'; statsEl.style.transform  = ''; }
        if (statCity) { statCity.style.opacity = '0'; statCity.style.transform = 'translateY(8px)'; }
        if (viewLink) { viewLink.style.opacity = '0'; }
      } else if (lp > 0) { state.statsFaded = false; }
      if (locHead) { locHead.style.opacity = String(hp); locHead.style.transform = 'translateY(' + lerp(18, 0, hp) + 'px)'; }
      state.locEls.forEach(function (el, i) {
        var local = easeOut(clamp((lp - i * 0.13) / 0.55));
        el.style.opacity = String(local); el.style.transform = 'translateY(' + lerp(28, 0, local) + 'px)';
      });
      var kp = sub(p, 0.75, 1);
      if (cardsVp) {
        cardsVp.style.opacity = String(easeOut(clamp(kp / 0.18)));
        if (!state.interacted) {
          state.cardEls.forEach(function (el) {
            el.style.transition = '';
            el.style.opacity    = '';
            el.style.transform  = '';
          });
        }
        cardsVp.style.pointerEvents = 'auto';
      }
      if (blurb) {
        var blurbOp = easeOutQuint(sub(p, 0.70, 0.92));
        blurb.style.left = fL + 'px'; blurb.style.top = (fT + fH + 28) + 'px';
        blurb.style.opacity = String(blurbOp); blurb.style.transform = 'translateY(' + lerp(14, 0, blurbOp) + 'px)';
        blurb.style.width = Math.min(fW - 20, vw * 0.5 - fL - 24) + 'px';
      }
      if (cardsTag) {
        var navOp = easeOutQuint(sub(p, 0.72, 0.9));
        if (navOp > 0.6) updateNav();
        cardsTag.style.opacity = String(navOp); cardsTag.style.transform = 'translateY(' + lerp(12, 0, navOp) + 'px)';
        if (cardPrev) cardPrev.style.pointerEvents = navOp > 0.6 ? 'auto' : 'none';
        if (cardNext) cardNext.style.pointerEvents = navOp > 0.6 ? 'auto' : 'none';
      }
      if (locList) locList.style.pointerEvents = lp > 0 ? 'auto' : 'none';
    }

    function compute() {
      if (!track) return 0;
      var total = track.offsetHeight - innerHeight;
      return total <= 0 ? 0 : (reduce ? 1 : clamp(-track.getBoundingClientRect().top / total));
    }

    if (cardsVp) cardsVp.addEventListener('pointerenter', function () { state.interacted = true; });
    if (locList) locList.addEventListener('pointerenter', function () { state.interacted = true; });
    if (cardPrev) cardPrev.addEventListener('click', function () { state.interacted = true; cardsVp.scrollBy({ left: -cardStep(), behavior: 'smooth' }); });
    if (cardNext) cardNext.addEventListener('click', function () { state.interacted = true; cardsVp.scrollBy({ left:  cardStep(), behavior: 'smooth' }); });
    if (cardsVp) cardsVp.addEventListener('scroll', function () { state.interacted = true; updateNav(); }, { passive: true });

    // When entered via carousel chevron, skip the full-screen phase entirely
    var enteredViaSlide = false;
    var entryAnimating  = false;
    var lastScrollP = 0;
    document.addEventListener('glh-entered-via-slide', function () {
      enteredViaSlide = true;
      lastScrollP = compute();
      entryAnimating = true;
      // Render at p=1 (framed image + all UI visible) so the stage slides in
      // already showing the golf section in its final state — a clean panel slide.
      // render(0) (full-screen) caused a snap/flash at 950ms; render(1) avoids that.
      render(1);
      // Unlock scroll handling once the 0.9s CSS slide completes.
      setTimeout(function () {
        entryAnimating = false;
      }, 950);
      setTimeout(function () {
        if (cardsVp)  cardsVp.style.pointerEvents  = 'auto';
        if (locList)  locList.style.pointerEvents   = 'auto';
        if (cardPrev) cardPrev.style.pointerEvents  = 'auto';
        if (cardNext) cardNext.style.pointerEvents  = 'auto';
      }, 200);
    });
    document.addEventListener('glh-left-via-slide', function () {
      enteredViaSlide = false;
    });

    var rafId = 0;
    window.addEventListener('scroll', function () {
      if (entryAnimating) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function () {
        var p = compute();
        // When scrolling UP (p decreasing), allow natural animation even if enteredViaSlide
        if (enteredViaSlide && p < lastScrollP) {
          enteredViaSlide = false;
        }
        lastScrollP = p;
        render(enteredViaSlide ? Math.max(p, 1) : p);
      });
    }, { passive: true });
    window.addEventListener('resize', function () { if (entryAnimating) return; sizeCards(); render(enteredViaSlide ? 1 : compute()); updateNav(); });
    sizeCards(); render(compute()); updateNav();
    selectLoc(0); // populate stats & view-link on initial load
    // Clear active highlight — user must click to select a location
    state.locEls.forEach(function(e) { e.classList.remove('glh-active'); });
  }


  // ============================================================
  //  Lifestyle Carousel Wrapper — slide between Coastal & Golf
  // ============================================================
  function initLifestyleCarousel() {
    var wrapper      = document.getElementById('sg-lifestyle-carousel');
    var rightWrap    = document.getElementById('lcw-right-wrap');
    var leftWrap     = document.getElementById('lcw-left-wrap');
    var goGolfBtn    = document.getElementById('lcw-go-golf');
    var goCoastalBtn = document.getElementById('lcw-go-coastal');
    var tabCoastal   = document.getElementById('lcw-tab-coastal');
    var tabGolf      = document.getElementById('lcw-tab-golf');

    if (!wrapper) return;

    var active = 'coastal';
    // On mobile the coastal scroll animation is skipped, so treat image as always shrunk.
    // Actual visibility is gated by updateSectionVisibility (scroll-based).
    var imageShrunk     = window.innerWidth < 768;
    var golfImageShrunk = window.innerWidth < 768;
    window.addEventListener('resize', function () {
      if (window.innerWidth < 768) { imageShrunk = true; golfImageShrunk = true; }
    });

    function updateTabs() {
      if (tabCoastal) {
        tabCoastal.classList.toggle('is-active', active === 'coastal');
        tabCoastal.setAttribute('aria-selected', active === 'coastal' ? 'true' : 'false');
      }
      if (tabGolf) {
        tabGolf.classList.toggle('is-active', active === 'golf');
        tabGolf.setAttribute('aria-selected', active === 'golf' ? 'true' : 'false');
      }
    }

    function updateChevrons() {
      var showRight = active === 'coastal' && imageShrunk;
      var showLeft  = active === 'golf'    && golfImageShrunk;

      if (goGolfBtn)   { if (showRight) goGolfBtn.classList.add('is-visible');   else goGolfBtn.classList.remove('is-visible'); }
      if (goCoastalBtn){ if (showLeft)  goCoastalBtn.classList.add('is-visible'); else goCoastalBtn.classList.remove('is-visible'); }
    }

    function updatePanels() {
      if (active === 'golf') {
        wrapper.classList.remove('show-coastal');
        wrapper.classList.add('show-golf');
      } else {
        wrapper.classList.remove('show-golf');
        wrapper.classList.add('show-coastal');
      }
      updateChevrons();
      updateTabs();
    }

    if (goGolfBtn) {
      goGolfBtn.addEventListener('click', function () {
        // Golf stage slides in over coastal. Both heroes keep rendering at the shared
        // scroll position, so golf arrives already showing its correct state — seamless.
        // NOTE: do NOT set overflow-x:hidden on <html> — it turns the root into a scroll
        // container and un-pins every position:sticky stage for the duration, which is
        // exactly what caused the white flash. The wrapper's `overflow-x: clip` already
        // contains the off-screen golf stage, so no horizontal scrollbar appears.
        active = 'golf';
        golfImageShrunk = true;
        updatePanels();
      });
    }

    if (goCoastalBtn) {
      goCoastalBtn.addEventListener('click', function () {
        active = 'coastal';
        golfImageShrunk = false; // reset so golf button hides if re-entering golf from top
        updatePanels();
      });
    }

    // Mobile image nav cross-section events (dispatched by coastal/golf init when at boundary)
    document.addEventListener('mob-switch-to-golf', function () {
      active = 'golf'; golfImageShrunk = true; updatePanels();
    });
    document.addEventListener('mob-switch-to-coastal', function () {
      active = 'coastal'; golfImageShrunk = false; updatePanels();
    });

    // Mobile tab buttons
    if (tabCoastal) {
      tabCoastal.addEventListener('click', function () {
        if (active !== 'coastal') {
          active = 'coastal';
          golfImageShrunk = false;
          updatePanels();
          document.dispatchEvent(new CustomEvent('glh-left-via-slide'));
        }
      });
    }
    if (tabGolf) {
      tabGolf.addEventListener('click', function () {
        if (active !== 'golf') {
          active = 'golf';
          golfImageShrunk = true;
          updatePanels();
          document.dispatchEvent(new CustomEvent('glh-entered-via-slide'));
        }
      });
    }

    // Show chevron only after listing row has finished loading (p >= 0.90)
    document.addEventListener('clh-nav-ready', function (e) {
      imageShrunk = e.detail;
      updateChevrons();
    });
    document.addEventListener('glh-nav-ready', function (e) {
      golfImageShrunk = e.detail;
      updateChevrons();
    });

    // Hide buttons when section scrolls out of viewport.
    // Only show while the sticky stage is active (rect.top ≤ 0 means we're scrolled into it).
    function updateSectionVisibility() {
      var rect = wrapper.getBoundingClientRect();
      var inView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!inView) {
        if (goGolfBtn)    goGolfBtn.classList.remove('is-visible');
        if (goCoastalBtn) goCoastalBtn.classList.remove('is-visible');
      } else {
        updateChevrons();
      }
    }
    window.addEventListener('scroll', updateSectionVisibility, { passive: true });

    updatePanels();
    updateSectionVisibility(); // correct chevron state based on initial viewport position
  }


  // ============================================================
  //  Areas Section — filter tabs + grid + pagination
  // ============================================================
  function initAreas() {
    var section   = document.querySelector('.sg-areas');
    if (!section) return;

    var tabs      = section.querySelectorAll('.sg-areas__tab');
    var dropdown  = section.querySelector('.sg-areas__dropdown');
    var grid      = section.querySelector('.sg-areas__grid');
    var countEl   = section.querySelector('.sg-areas__count');
    var prevBtn   = section.querySelector('.sg-areas__page-btn--prev');
    var nextBtn   = section.querySelector('.sg-areas__page-btn--next');
    var pageLabel = section.querySelector('.sg-areas__page-label');
    var PAGE_SIZE = 12;
    var currentPage = 1;
    var currentFilter = 'All Markets';

    // All area data
    var areas = [
      { name: "Martha's Vineyard", region: 'East Coast',      image: 'https://www.seaglass.com/wp-content/uploads/2025/03/marthasvineyardlighthouse.webp' },
      { name: 'Washington DC',     region: 'East Coast',      image: 'https://images.unsplash.com/photo-1617581629397-a72507c3de9e?q=80&w=1172&auto=format&fit=crop' },
      { name: 'Florida',           region: 'Gulf Coast',      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=250&fit=crop' },
      { name: 'Wilmington, NC',    region: 'East Coast',      image: 'https://www.seaglass.com/wp-content/uploads/2024/08/wilmington_downtown_river.jpeg' },
      { name: 'St. Petersburg, FL',region: 'Gulf Coast',      image: 'https://www.seaglass.com/wp-content/uploads/2017/11/shutterstock_2196433363.jpg' },
      { name: 'Bristol, TN',       region: 'Southern',        image: 'https://images.unsplash.com/photo-1572983025043-92661cdfa73d?q=80&w=1170&auto=format&fit=crop' },
      { name: 'Charleston, SC',    region: 'East Coast',      image: 'https://www.seaglass.com/wp-content/uploads/2025/02/charleston_historic_city.webp' },
      { name: 'Nantucket',         region: 'East Coast',      image: 'https://www.nantucket-ma.gov/ImageRepository/Document?documentID=48536' },
      { name: 'Malibu',            region: 'West Coast',      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop' },
      { name: 'Aspen',             region: 'Mountain Regions',image: 'https://images.unsplash.com/photo-1604178450035-38e6a54ffa0c?w=400&h=250&fit=crop' },
      { name: 'Savannah, GA',      region: 'Southern',        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=250&fit=crop' },
      { name: 'Nassau, Bahamas',   region: 'Caribbean',       image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400&h=250&fit=crop' },
      { name: 'Hilton Head, SC',   region: 'East Coast',      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=250&fit=crop' },
      { name: 'Destin, FL',        region: 'Gulf Coast',      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=250&fit=crop' },
      { name: 'Park City, UT',     region: 'Mountain Regions',image: 'https://images.unsplash.com/photo-1610803523148-a0052fa341bb?w=400&h=250&fit=crop' },
      { name: 'St. Thomas, USVI',  region: 'Caribbean',       image: 'https://images.unsplash.com/photo-1729720281771-b790dfb6ec7f?q=80&w=1171&auto=format&fit=crop' },
      { name: 'Nashville, TN',     region: 'Southern',        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=250&fit=crop' },
      { name: 'Asheville, NC',     region: 'Mountain Regions',image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=250&fit=crop' },
      { name: 'Miami Beach',       region: 'East Coast',      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop' },
      { name: 'St. Croix, USVI',   region: 'Caribbean',       image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop' },
      { name: 'Fort Myers, FL',    region: 'Gulf Coast',      image: 'https://images.unsplash.com/photo-1667869373278-4cb33c25ee4f?q=80&w=1170&auto=format&fit=crop' },
      { name: 'Abingdon, VA',      region: 'Mountain Regions',image: 'https://images.unsplash.com/photo-1563302589-e07eee9fed8f?q=80&w=1074&auto=format&fit=crop' },
    ];

    function getFiltered() {
      return currentFilter === 'All Markets' ? areas : areas.filter(function (a) { return a.region === currentFilter; });
    }

    function renderGrid() {
      if (!grid) return;
      var filtered   = getFiltered();
      var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
      var safePage   = Math.min(currentPage, totalPages);
      var visible    = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

      if (countEl) countEl.textContent = filtered.length + (filtered.length === 1 ? ' AREA SERVED' : ' AREAS SERVED');

      grid.classList.add('is-transitioning');
      setTimeout(function () {
        grid.innerHTML = '';
        if (visible.length === 0) {
          grid.innerHTML = '<p class="sg-areas__empty">No areas in this region yet</p>';
        } else {
          visible.forEach(function (area, i) {
            var card = document.createElement('div');
            card.className = 'sg-area-card';
            card.innerHTML =
              '<div class="sg-area-card__image-wrap">' +
                '<img class="sg-area-card__image" src="' + area.image + '" alt="' + area.name + '" loading="lazy">' +
                '<div class="sg-area-card__overlay"></div>' +
                '<div class="sg-area-card__content">' +
                  '<div class="sg-area-card__region-tag"><span>' + area.region + '</span></div>' +
                  '<div class="sg-area-card__row">' +
                    '<span class="sg-area-card__name">' + area.name + '</span>' +
                    '<span class="sg-area-card__arrow"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg></span>' +
                  '</div>' +
                '</div>' +
              '</div>';
            grid.appendChild(card);
            setTimeout(function () { card.classList.add('is-visible'); }, i * 80);
          });
        }
        grid.classList.remove('is-transitioning');

        // Pagination
        if (prevBtn) prevBtn.disabled = safePage <= 1;
        if (nextBtn) nextBtn.disabled = safePage >= totalPages;
        if (pageLabel) pageLabel.textContent = safePage + ' / ' + totalPages;

        var paginationEl = section.querySelector('.sg-areas__pagination');
        if (paginationEl) paginationEl.style.display = totalPages > 1 ? 'flex' : 'none';
      }, 150);
    }

    function setFilter(filter) {
      currentFilter = filter;
      currentPage   = 1;

      tabs.forEach(function (tab) {
        var isActive = tab.dataset.filter === filter;
        tab.classList.toggle('is-active', isActive);
        var line = tab.querySelector('.sg-areas__tab-underline');
        if (line) line.style.transform = isActive ? 'scaleX(1)' : 'scaleX(0)';
      });
      renderGrid();
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { setFilter(this.dataset.filter || 'All Markets'); });
    });

    if (dropdown) {
      dropdown.addEventListener('change', function () { setFilter(this.value); });
    }

    if (prevBtn) { prevBtn.addEventListener('click', function () { currentPage--; renderGrid(); }); }
    if (nextBtn) { nextBtn.addEventListener('click', function () { currentPage++; renderGrid(); }); }

    renderGrid();
  }


  // ============================================================
  //  Why SeaGlass Brand — expandable buyer/seller panels
  //  Desktop: width-expand to the right
  //  Mobile (≤768px): translateX slide — default ↔ panel
  // ============================================================
  function initWhySeaglass() {
    var section = document.querySelector('.sg-why-seaglass');
    if (!section) return;

    var cards         = section.querySelector('.sg-why-seaglass__cards');
    var panel         = section.querySelector('.sg-why-seaglass__panel');
    var content       = section.querySelector('.sg-why-seaglass__panel-content');
    var closeBtn      = section.querySelector('.sg-why-seaglass__panel-close');
    var ctaBtns       = section.querySelectorAll('.sg-why-seaglass__cta-btn');
    var mainCard      = section.querySelector('.sg-why-seaglass__main');

    // Mobile elements
    var defaultView       = section.querySelector('.sg-why-seaglass__default');
    var mobilePanel       = section.querySelector('.sg-why-seaglass__panel-mobile');
    var mobileCloseBtn    = section.querySelector('.sg-why-seaglass__panel-close-mobile');
    var mobilePanelContent = section.querySelector('.sg-why-seaglass__panel-mobile-content');

    var panelData = {
      buyers: {
        label: 'For Buyers',
        body:  'We are a boutique real estate brand dedicated to the art of luxury living. By focusing on unique coastal, mountain, and waterfront lifestyles, we match our clients with a community, not just a house.',
        cta:   'Find your perfect home',
      },
      sellers: {
        label: 'For Sellers',
        body:  'Maximize the true value of your coastal property with data-driven pricing strategies and bespoke luxury marketing. We manage the entire listing-to-close process to ensure a seamless, high-yield transaction.',
        cta:   'Sell With Us',
      },
    };

    var activePanel = null;

    function isMobile() { return document.documentElement.clientWidth < 768; }

    // Scroll-in reveal for the cards group
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (cards) cards.classList.add('is-visible');
          io.disconnect();
        }
      });
    }, { threshold: 0.12 });
    if (cards) io.observe(cards);

    // ── Desktop: width-expand panel to the right ──────────────
    var panelInner = panel ? panel.querySelector('.sg-why-seaglass__panel-inner') : null;

    // Clear any locked height and let flexbox auto-size cards to tallest child
    function syncCardsHeight() {
      if (!cards) return;
      cards.style.height = '';
      cards.style.transition = '';
    }

    function openDesktopPanel(key) {
      if (!panelData[key]) return;
      activePanel = key;

      ctaBtns.forEach(function (btn) {
        btn.classList.toggle('is-active', btn.dataset.panel === key);
      });

      if (mainCard) mainCard.style.borderRight = '1px solid rgba(255,255,255,0.4)';

      if (content) {
        var labelEl = content.querySelector('.sg-why-seaglass__panel-label');
        var bodyEl  = content.querySelector('.sg-why-seaglass__panel-body');
        var ctaEl   = content.querySelector('.sg-why-seaglass__panel-cta');
        var isAlreadyOpen = panel && panel.classList.contains('is-open');
        if (isAlreadyOpen) {
          content.classList.remove('is-visible');
          setTimeout(function () {
            if (labelEl) labelEl.textContent = panelData[key].label;
            if (bodyEl)  bodyEl.textContent  = panelData[key].body;
            if (ctaEl)   ctaEl.textContent   = panelData[key].cta;
            content.classList.add('is-visible');
            setTimeout(syncCardsHeight, 20);
          }, 280);
        } else {
          if (labelEl) labelEl.textContent = panelData[key].label;
          if (bodyEl)  bodyEl.textContent  = panelData[key].body;
          if (ctaEl)   ctaEl.textContent   = panelData[key].cta;
          setTimeout(function () { content.classList.add('is-visible'); }, 20);
        }
      }

      if (panel) panel.classList.add('is-open');
      // After width transition, sync height if panel-inner is taller
      setTimeout(syncCardsHeight, 360);
    }

    function closeDesktopPanel() {
      activePanel = null;
      if (panel)    panel.classList.remove('is-open');
      if (mainCard) mainCard.style.borderRight = 'none';
      if (content)  content.classList.remove('is-visible');
      ctaBtns.forEach(function (btn) { btn.classList.remove('is-active'); });
      // Restore cards to natural (main-card driven) height
      setTimeout(syncCardsHeight, 360);
    }

    // ── Mobile: translateX slide ───────────────────────────────
    function openMobilePanel(key) {
      if (!panelData[key]) return;
      activePanel = key;

      ctaBtns.forEach(function (btn) {
        btn.classList.toggle('is-active', btn.dataset.panel === key);
      });

      // Populate content before sliding in
      if (mobilePanelContent) {
        var labelEl = mobilePanelContent.querySelector('.sg-why-seaglass__panel-mobile-label');
        var bodyEl  = mobilePanelContent.querySelector('.sg-why-seaglass__panel-mobile-body');
        var ctaEl   = mobilePanelContent.querySelector('.sg-why-seaglass__panel-mobile-cta');
        if (labelEl) labelEl.textContent = panelData[key].label;
        if (bodyEl)  bodyEl.textContent  = panelData[key].body;
        if (ctaEl)   ctaEl.textContent   = panelData[key].cta;
        mobilePanelContent.classList.remove('is-visible');
        setTimeout(function () { mobilePanelContent.classList.add('is-visible'); }, 50);
      }

      if (defaultView)  defaultView.classList.add('is-offscreen');
      if (mobilePanel)  mobilePanel.classList.add('is-active');
      if (cards)        cards.classList.add('is-expanded');

      // Lock cards to expanded height after transition so collapse doesn't shift
      setTimeout(function () {
        if (cards && mobilePanel) {
          var h = cards.offsetHeight;
          if (h > 0) cards.style.minHeight = h + 'px';
        }
      }, 320);
    }

    function closeMobilePanel() {
      activePanel = null;
      if (defaultView)       defaultView.classList.remove('is-offscreen');
      if (mobilePanel)       mobilePanel.classList.remove('is-active');
      if (cards)             cards.classList.remove('is-expanded');
      if (mobilePanelContent) mobilePanelContent.classList.remove('is-visible');
      ctaBtns.forEach(function (btn) { btn.classList.remove('is-active'); });
    }

    // ── Shared click handler ───────────────────────────────────
    ctaBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = this.dataset.panel;
        if (isMobile()) {
          if (activePanel === key) {
            closeMobilePanel();
          } else if (activePanel !== null) {
            // Cross-panel switch: close first, then open after transition
            closeMobilePanel();
            setTimeout(function () { openMobilePanel(key); }, 300);
          } else {
            openMobilePanel(key);
          }
        } else {
          if (activePanel === key) { closeDesktopPanel(); } else { openDesktopPanel(key); }
        }
      });
    });

    if (closeBtn)      closeBtn.addEventListener('click', closeDesktopPanel);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobilePanel);
  }


  // ============================================================
  //  Brokerage Section — tab switching
  // ============================================================
  function initBrokerage() {
    var section = document.querySelector('.sg-brokerage');
    if (!section) return;

    var tabs    = section.querySelectorAll('.sg-brokerage__tab');
    var panels  = section.querySelectorAll('.sg-brokerage__panel');
    var dropdown = section.querySelector('.sg-brokerage__select');

    function activate(tabId) {
      tabs.forEach(function (tab) {
        tab.classList.toggle('is-active', tab.dataset.tab === tabId);
      });
      panels.forEach(function (panel) {
        panel.classList.toggle('is-active', panel.dataset.tab === tabId);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { activate(this.dataset.tab); });
    });

    if (dropdown) {
      dropdown.addEventListener('change', function () { activate(this.value); });
    }
  }


  // ============================================================
  //  Franchise Section — parallax on hero image + card images
  // ============================================================
  function initFranchise() {
    var heroImg  = document.querySelector('.sg-franchise__hero-img');
    var heroWrap = document.querySelector('.sg-franchise__hero');
    var cardImgs = document.querySelectorAll('.sg-franchise-card__image');

    if (heroImg && heroWrap) {
      function onScroll() {
        var rect = heroWrap.getBoundingClientRect();
        var progress = Math.max(0, Math.min(1, -rect.top / (rect.height + window.innerHeight)));
        heroImg.style.transform = 'scaleX(-1) translateY(' + lerp(65, -65, progress) + 'px)';
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Card images parallax + reveal
    cardImgs.forEach(function (img, i) {
      var card = img.closest('.sg-franchise-card');
      if (!card) return;

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setTimeout(function () { card.classList.add('is-visible'); }, i * 150);
            io.disconnect();
          }
        });
      }, { threshold: 0.1 });
      io.observe(card);

      var range = [25, -25];
      window.addEventListener('scroll', function () {
        var rect = img.getBoundingClientRect();
        var progress = Math.max(0, Math.min(1, -rect.top / (rect.height + window.innerHeight)));
        img.style.transform = 'translateY(' + lerp(range[0], range[1], progress) + 'px)';
      }, { passive: true });
    });

    function lerp(a, b, t) { return a + (b - a) * t; }
  }


  // ============================================================
  //  Footer — franchise accordion + show-more link lists
  // ============================================================
  function initFooter() {
    // Franchise expandable
    var franchiseBlock  = document.querySelector('.sg-footer__franchise-block');
    var franchiseToggle = document.querySelector('.sg-footer__franchise-toggle');
    var franchiseContent = document.querySelector('.sg-footer__franchise-content');

    if (franchiseToggle && franchiseBlock && franchiseContent) {
      franchiseToggle.addEventListener('click', function () {
        var expanded = franchiseBlock.classList.toggle('is-expanded');
        franchiseContent.classList.toggle('is-expanded', expanded);
        franchiseToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        franchiseContent.setAttribute('aria-hidden', expanded ? 'false' : 'true');
      });
    }

    // Show more/less per column
    var showMoreBtns = document.querySelectorAll('.sg-footer__show-more');
    showMoreBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var col   = this.closest('.sg-footer__col');
        var extra = col && col.querySelector('.sg-footer__links-extra');
        if (!extra) return;
        var open = extra.classList.toggle('is-expanded');
        extra.setAttribute('aria-hidden', open ? 'false' : 'true');
        this.setAttribute('aria-expanded', open ? 'true' : 'false');
        this.innerHTML = open ? 'LESS <span aria-hidden="true">‹</span>' : 'MORE <span aria-hidden="true">›</span>';
      });
    });
  }


  // ============================================================
  //  Universal Parallax
  // ============================================================
  function initParallax() {
    var WIN_H = window.innerHeight;
    window.addEventListener('resize', function () { WIN_H = window.innerHeight; });

    // Helper: get scroll progress for an element (-1 = fully below, 0 = centered, 1 = fully above)
    function progress(el) {
      var r = el.getBoundingClientRect();
      return -r.top / (r.height + WIN_H);
    }
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function lerp(a, b, t) { return a + (b - a) * t; }

    // — CSS background-image divs: animate backgroundPositionY —
    var bgDivs = [
      // [selector, bgY start %, bgY end %]
      ['.sg-footer__bg',  40, 60],
      ['.clh-layer-a',   42, 58],
      ['.glh-layer-a',   42, 58],
    ].map(function (cfg) {
      var el = document.querySelector(cfg[0]);
      return el ? { el: el, from: cfg[1], to: cfg[2] } : null;
    }).filter(Boolean);

    // — <img> elements: set --parallax-y CSS custom property —
    var imgEls = [];
    document.querySelectorAll('.sg-listing-card__image').forEach(function (el) {
      imgEls.push({ el: el, range: 24 });
    });
    document.querySelectorAll('.sg-brokerage__panel-image-wrap img').forEach(function (el) {
      imgEls.push({ el: el, range: 30 });
    });

    // — <video> element: transform translateY —
    var videoEl = document.querySelector('.sg-why-seaglass__bg video');

    function tick() {
      bgDivs.forEach(function (item) {
        var p = clamp(progress(item.el), -0.1, 1.1);
        item.el.style.backgroundPositionY = lerp(item.from, item.to, p) + '%';
      });

      imgEls.forEach(function (item) {
        var p = clamp(progress(item.el), 0, 1);
        item.el.style.setProperty('--parallax-y', lerp(-item.range, item.range, p) + 'px');
      });

      if (videoEl) {
        var p = clamp(progress(videoEl), 0, 1);
        videoEl.style.transform = 'translateY(' + lerp(-30, 30, p) + 'px)';
      }
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () { tick(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    tick();
  }

  // ============================================================
  //  Bootstrap all modules
  // ============================================================
  // Prevent orphan (single word) on last line of block quotes / display text
  (function preventOrphan(el) {
    if (!el) return;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    if (!nodes.length) return;
    var last = nodes[nodes.length - 1];
    var text = last.textContent;
    var idx = text.lastIndexOf(' ');
    if (idx !== -1) {
      last.textContent = text.substring(0, idx) + ' ' + text.substring(idx + 1);
    }
  }(document.querySelector('.sg-elite-destinations__quote')));

  initFadeIns();
  initHeader();
  initMobileMenu();
  initHero();
  initEliteDestinations();
  initListingShowcase();
  initCoastalLivingHero();
  initGolfCourseLivingHero();
  initLifestyleCarousel();
  initAreas();
  initWhySeaglass();
  initBrokerage();
  initFranchise();
  initFooter();
  initParallax();

});
