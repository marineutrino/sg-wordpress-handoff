<!-- ============================================================
     GLOBAL FOOTER
     ACF: footer_tagline, hq_address, hq_phone, hq_email,
          franchise_block (toggle + sub-links), nav columns[],
          social links[], legal disclaimer, copyright text
     ============================================================ -->
<footer class="sg-footer" role="contentinfo">

  <!-- Blurred bg image -->
  <div class="sg-footer__bg" aria-hidden="true"></div>
  <div class="sg-footer__overlay" aria-hidden="true"></div>

  <!-- Wave top edge — white shape bites down into footer from above -->
  <div class="sg-footer__wave" aria-hidden="true">
    <svg viewBox="0 0 1440 20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0,0 L1440,0 L1440,11 C1280,5 1120,17 960,11 C800,5 640,17 480,11 C320,5 160,17 0,11 Z" fill="white"/>
    </svg>
  </div>

  <div class="sg-footer__inner">

    <!-- Logo + tagline -->
    <div class="sg-footer__logo-wrap">
      <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="SeaGlass Home &amp; Lifestyle">
        <svg viewBox="0 0 818 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <mask id="sgfoot-mask0" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="178" y="32" width="639" height="81"><path d="M817 32H178V112.007H817V32Z" fill="white"/></mask>
          <g mask="url(#sgfoot-mask0)">
            <path d="M182.813 93.3341C189.601 97.7273 196.491 100.62 203.496 102.011C205.869 102.485 208.273 102.722 210.719 102.722C213.165 102.722 215.69 102.491 218.299 102.035C220.909 101.58 223.216 100.82 225.22 99.7568C229.742 97.3384 232.007 93.6258 232.007 88.6128C232.007 83.5999 228.211 79.8448 220.624 77.797C218.396 77.2137 216.029 76.679 213.51 76.2051L205.688 74.8318C195.728 73.1122 188.783 70.5845 184.842 67.2547C181.197 64.2165 179.368 60.115 179.368 54.9562C179.368 47.926 182.723 42.2386 189.437 37.8819C195.419 33.9566 202.473 32 210.61 32C218.747 32 225.438 33.2821 231.674 35.8463C233.896 36.7274 236.215 37.8211 238.624 39.1396L234.907 48.09C229.615 44.9061 223.379 42.8401 216.192 41.8861C213.928 41.558 211.742 41.394 209.629 41.394C204.779 41.394 200.493 42.3297 196.769 44.1951C192.428 46.3887 190.261 49.4329 190.261 53.3096C190.261 57.4111 193.015 60.4128 198.525 62.3146C201.007 63.1957 203.811 63.9066 206.953 64.4535L216.695 66.1549C224.899 67.6922 230.59 69.43 233.763 71.3683C236.935 73.3067 239.278 75.4759 240.792 77.876C242.306 80.2762 243.062 83.4602 243.062 87.428C243.062 91.3958 242.13 94.9626 240.271 98.1101C238.413 101.258 235.93 103.858 232.83 105.906C226.776 109.971 219.062 112.001 209.684 112.001C200.929 112.001 192.707 110.099 185.005 106.289C182.486 105.043 180.155 103.615 178 102.005L182.813 93.3281V93.3341Z" fill="white"/>
            <path d="M263.866 33.0997H321.699V42.3235H273.989V63.2989H316.498V72.5227H273.989V101.622H322.795V110.846H263.872V33.0997H263.866Z" fill="white"/>
            <path d="M369.706 33.0997H375.452L408.988 110.852H397.939L390.606 93.8323H351.815L343.883 110.852H333.488L369.706 33.0997ZM386.671 84.6024L379.666 68.2936C378.788 66.2459 377.934 64.1192 377.093 61.9257L374.907 55.7218C373.52 51.6932 372.697 48.9528 372.443 47.4884H371.789C371.498 48.9528 370.838 51.037 369.821 53.747L367.03 60.8866C366.188 62.9343 365.28 65.0246 364.293 67.1452L356.144 84.6085H386.671V84.6024Z" fill="white"/>
            <path d="M463.897 102.831C470.563 102.831 476.557 100.978 481.879 97.2714V106.854C478.543 108.78 474.608 110.22 470.079 111.174C467.53 111.69 464.551 111.946 461.16 111.946C457.77 111.946 454.319 111.514 450.819 110.651C447.314 109.789 444.074 108.549 441.077 106.921C438.087 105.286 435.362 103.317 432.898 101.014C430.434 98.7054 428.345 96.0987 426.631 93.1882C424.912 90.2776 423.586 87.1119 422.629 83.6909C421.679 80.2699 421.212 76.5938 421.212 72.6807C421.212 68.7675 421.715 65.0245 422.714 61.4517C423.713 57.8788 425.154 54.5915 427.013 51.5716C428.871 48.5517 431.093 45.8295 433.691 43.4111C436.276 40.9988 439.164 38.9511 442.331 37.2619C448.973 33.7498 456.214 31.9938 464.049 31.9938C475.576 31.9938 485.118 35.2203 492.662 41.6612L486.977 49.457C480.596 43.8972 472.628 41.1143 463.062 41.1143C454.422 41.1143 447.09 43.9702 441.071 49.6819C434.981 55.43 431.935 62.5818 431.935 71.1494C431.935 80.4887 434.944 88.1023 440.962 93.9963C446.938 99.8903 454.579 102.837 463.885 102.837L463.897 102.831Z" fill="white"/>
            <path d="M496.882 75.3239V110.846H486.759V91.9C486.747 91.7481 486.735 91.584 486.729 91.3957C486.723 91.2073 486.723 91.0128 486.723 90.8002C486.723 86.6622 484.029 85.2221 481.873 84.7421C481.449 84.6388 481.05 84.578 480.692 84.5537H459.895V75.3299H496.876L496.882 75.3239Z" fill="white"/>
            <path d="M520.38 33.0997H530.503V101.628H572.74V110.852H520.38V33.0997Z" fill="white"/>
            <path d="M617.356 33.0997H623.102L656.638 110.852H645.589L638.257 93.8323H599.465L591.534 110.852H581.138L617.356 33.0997ZM634.321 84.6024L627.316 68.2936C626.438 66.2459 625.585 64.1192 624.743 61.9257L622.557 55.7218C621.171 51.6932 620.347 48.9528 620.093 47.4884H619.439C619.149 48.9528 618.489 51.037 617.471 53.747L614.68 60.8866C613.839 62.9343 612.93 65.0246 611.944 67.1452L603.794 84.6085H634.321V84.6024Z" fill="white"/>
            <path d="M673.573 93.3341C680.36 97.7273 687.25 100.62 694.256 102.011C696.629 102.485 699.033 102.722 701.479 102.722C703.925 102.722 706.449 102.491 709.059 102.035C711.669 101.58 713.975 100.82 715.979 99.7568C720.502 97.3384 722.767 93.6258 722.767 88.6128C722.767 83.5999 718.97 79.8448 711.384 77.797C709.156 77.2137 706.789 76.679 704.27 76.2051L696.447 74.8318C686.488 73.1122 679.543 70.5845 675.601 67.2547C671.957 64.2165 670.128 60.115 670.128 54.9562C670.128 47.926 673.482 42.2386 680.197 37.8819C686.173 33.9566 693.232 32 701.364 32C709.495 32 716.191 33.2821 722.427 35.8463C724.65 36.7274 726.968 37.8211 729.378 39.1396L725.661 48.09C720.369 44.9061 714.133 42.8401 706.946 41.8861C704.682 41.558 702.496 41.394 700.383 41.394C695.533 41.394 691.246 42.3297 687.523 44.1951C683.182 46.3887 681.014 49.4329 681.014 53.3096C681.014 57.4111 683.769 60.4128 689.279 62.3146C691.761 63.1957 694.564 63.9066 697.707 64.4535L707.448 66.1549C715.652 67.6922 721.344 69.43 724.516 71.3683C727.689 73.3067 730.032 75.4759 731.546 77.876C733.059 80.2762 733.816 83.4602 733.816 87.428C733.816 91.3958 732.884 94.9626 731.025 98.1101C729.166 101.258 726.684 103.858 723.584 105.906C717.529 109.971 709.816 112.001 700.437 112.001C691.682 112.001 683.46 110.099 675.759 106.289C673.24 105.043 670.909 103.615 668.754 102.005L673.567 93.3281L673.573 93.3341Z" fill="white"/>
            <path d="M756.757 93.3341C763.544 97.7273 770.434 100.62 777.439 102.011C779.813 102.485 782.216 102.722 784.662 102.722C787.108 102.722 789.633 102.491 792.243 102.035C794.852 101.58 797.159 100.82 799.163 99.7568C803.686 97.3384 805.95 93.6258 805.95 88.6128C805.95 83.5999 802.154 79.8448 794.568 77.797C792.339 77.2137 789.972 76.679 787.453 76.2051L779.631 74.8318C769.671 73.1122 762.727 70.5845 758.785 67.2547C755.14 64.2165 753.312 60.115 753.312 54.9562C753.312 47.926 756.666 42.2386 763.38 37.8819C769.362 33.9566 776.422 32 784.553 32C792.685 32 799.381 33.2821 805.617 35.8463C807.839 36.7274 810.158 37.8211 812.568 39.1396L808.85 48.09C803.559 44.9061 797.322 42.8401 790.136 41.8861C787.871 41.558 785.686 41.394 783.572 41.394C778.723 41.394 774.436 42.3297 770.713 44.1951C766.371 46.3887 764.204 49.4329 764.204 53.3096C764.204 57.4111 766.959 60.4128 772.468 62.3146C774.951 63.1957 777.754 63.9066 780.896 64.4535L790.638 66.1549C798.842 67.6922 804.533 69.43 807.706 71.3683C810.879 73.3067 813.222 75.4759 814.735 77.876C816.249 80.2762 817.006 83.4602 817.006 87.428C817.006 91.3958 816.073 94.9626 814.215 98.1101C812.356 101.258 809.874 103.858 806.774 105.906C800.719 109.971 793.006 112.001 783.627 112.001C774.872 112.001 766.65 110.099 758.949 106.289C756.43 105.043 754.099 103.615 751.943 102.005L756.757 93.3281V93.3341Z" fill="white"/>
          </g>
          <mask id="sgfoot-mask1" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="12" y="14" width="121" height="113"><path d="M132.397 14.35H12.8286V126.35H132.397V14.35Z" fill="white"/></mask>
          <g mask="url(#sgfoot-mask1)">
            <path d="M12.8286 47.2202V67.3613C12.8286 67.7485 13.0955 68.0876 13.4742 68.1762C34.4515 73.0299 53.9621 67.1715 72.329 58.6914C102.513 44.7528 117.166 47.2556 131.367 50.6011C131.893 50.7251 132.399 50.3277 132.399 49.7887V14.7751C132.399 14.7043 132.35 14.6334 132.289 14.5701C132.137 14.4208 131.928 14.35 131.72 14.35H47.9025C28.519 14.35 12.8286 29.0529 12.8286 47.2202Z" fill="white"/>
            <path d="M12.8286 84.3645V124.988C12.8286 125.743 13.4412 126.352 14.1986 126.352H97.3223C116.706 126.352 132.396 111.65 132.396 93.4823V80.2952C132.396 79.779 132.104 79.3032 131.639 79.073C109.012 67.9357 88.7743 70.8029 70.26 77.8456C39.4664 89.5598 25.0571 84.4809 14.3842 83.0055C13.5606 82.8917 12.8286 83.537 12.8286 84.3645Z" fill="white"/>
          </g>
        </svg>
      </a>
      <!-- ACF: footer_tagline -->
      <p class="sg-footer__tagline">Luxury Real Estate Franchisor</p>
    </div><!-- /.sg-footer__logo-wrap -->

    <!-- Franchise & Partnership Opportunities — expandable -->
    <!-- ACF: franchise_section_label, franchise_cols[] → title, links[] -->
    <div class="sg-footer__franchise-block" id="sg-footer-franchise-block">
      <button class="sg-footer__franchise-toggle" type="button" aria-expanded="false" aria-controls="sg-footer-franchise-content">
        <span class="sg-footer__franchise-toggle-label">Franchise &amp; Partnership Opportunities</span>
        <span class="sg-footer__franchise-toggle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
        </span>
      </button>
      <div id="sg-footer-franchise-content" class="sg-footer__franchise-content" aria-hidden="true">
        <div class="sg-footer__franchise-grid">

          <!-- Col 1: Global Destinations -->
          <div>
            <h4 class="sg-footer__franchise-col-title">Global Destinations</h4>
            <ul class="sg-footer__franchise-links">
              <li><a href="#caribbean" class="sg-footer__franchise-link">Caribbean Markets</a></li>
              <li><a href="#east-coast" class="sg-footer__franchise-link">East Coast Properties</a></li>
              <li><a href="#west-coast" class="sg-footer__franchise-link">West Coast Estates</a></li>
              <li><a href="#mountain" class="sg-footer__franchise-link">Mountain Retreats</a></li>
              <li><a href="#gulf-coast" class="sg-footer__franchise-link">Gulf Coast Homes</a></li>
              <li><a href="#international" class="sg-footer__franchise-link">International Partnerships</a></li>
              <li><a href="#all-markets" class="sg-footer__franchise-link">View All Markets</a></li>
            </ul>
          </div>

          <!-- Col 2: Target Lifestyles -->
          <div>
            <h4 class="sg-footer__franchise-col-title">Target Lifestyles</h4>
            <ul class="sg-footer__franchise-links">
              <li><a href="#oceanfront" class="sg-footer__franchise-link">Oceanfront Homes</a></li>
              <li><a href="#yachting" class="sg-footer__franchise-link">Boating &amp; Yachting</a></li>
              <li><a href="#alpine" class="sg-footer__franchise-link">Mountain &amp; Alpine</a></li>
              <li><a href="#island" class="sg-footer__franchise-link">Island Residences</a></li>
              <li><a href="#metropolitan" class="sg-footer__franchise-link">Metropolitan Luxury</a></li>
              <li><a href="#golf" class="sg-footer__franchise-link">Golf Communities</a></li>
              <li><a href="#vineyard" class="sg-footer__franchise-link">Vineyard Estates</a></li>
            </ul>
          </div>

          <!-- Col 3: Franchise Opportunities -->
          <div>
            <h4 class="sg-footer__franchise-col-title">Franchise Opportunities</h4>
            <ul class="sg-footer__franchise-links">
              <li><a href="#franchise" class="sg-footer__franchise-link">Franchise Overview</a></li>
              <li><a href="#affiliate" class="sg-footer__franchise-link">Affiliate Network</a></li>
              <li><a href="#marketing" class="sg-footer__franchise-link">Marketing Support</a></li>
              <li><a href="#training" class="sg-footer__franchise-link">Training &amp; Development</a></li>
              <li><a href="#apply" class="sg-footer__franchise-link">Apply to Join</a></li>
            </ul>
          </div>

        </div><!-- /.sg-footer__franchise-grid -->
      </div><!-- /#sg-footer-franchise-content -->
    </div><!-- /.sg-footer__franchise-block -->

    <!-- Primary navigation — 5 columns -->
    <!-- ACF: footer_nav[] → col_title, links[] (label, url) -->
    <nav class="sg-footer__nav" aria-label="Footer navigation">
      <div class="sg-footer__nav-grid">

        <!-- Buy -->
        <div class="sg-footer__col" data-col="buy">
          <h3 class="sg-footer__col-title">Buy</h3>
          <ul class="sg-footer__links">
            <li><a href="#home-buying-faqs" class="sg-footer__link">Home Buying FAQs</a></li>
            <li><a href="#first-steps" class="sg-footer__link">Home Buying First Steps</a></li>
            <li><a href="#buyers-checklist" class="sg-footer__link">Home Buyer&#39;s Checklist</a></li>
            <li><a href="#mortgage-pre-approval" class="sg-footer__link">Mortgage Pre-Approval</a></li>
            <li><a href="#home-loans" class="sg-footer__link">Types of Home Loans</a></li>
          </ul>
          <ul class="sg-footer__links-extra" aria-hidden="true">
            <li><a href="#afford" class="sg-footer__link">How Much Home Can I Afford?</a></li>
            <li><a href="#must-haves" class="sg-footer__link">Must Haves for Your Home</a></li>
            <li><a href="#search-tips" class="sg-footer__link">17 Home Search Tips</a></li>
            <li><a href="#contingencies" class="sg-footer__link">Real Estate Contingencies</a></li>
            <li><a href="#inspections" class="sg-footer__link">Home Inspections</a></li>
            <li><a href="#appraisals" class="sg-footer__link">Home Appraisals</a></li>
            <li><a href="#buying-costs" class="sg-footer__link">Costs of Buying a House</a></li>
            <li><a href="#buying-documents" class="sg-footer__link">Home Buying Documents</a></li>
            <li><a href="#making-offer" class="sg-footer__link">Making an Offer</a></li>
          </ul>
          <button class="sg-footer__show-more" type="button" aria-expanded="false">MORE <span aria-hidden="true">›</span></button>
        </div>

        <!-- Sell -->
        <div class="sg-footer__col" data-col="sell">
          <h3 class="sg-footer__col-title">Sell</h3>
          <ul class="sg-footer__links">
            <li><a href="#selling-faqs" class="sg-footer__link">Selling a Home FAQs</a></li>
            <li><a href="#selling-checklist" class="sg-footer__link">Home Selling Checklist</a></li>
            <li><a href="#pre-sale-inspections" class="sg-footer__link">Pre-Sale Home Inspections</a></li>
            <li><a href="#prepare-showings" class="sg-footer__link">Prepare Your Home for Showings</a></li>
            <li><a href="#property-types" class="sg-footer__link">Is it Personal or Real Property?</a></li>
          </ul>
          <ul class="sg-footer__links-extra" aria-hidden="true">
            <li><a href="#pricing" class="sg-footer__link">Pricing Your Home for Sale</a></li>
            <li><a href="#staging" class="sg-footer__link">Stage Your Home</a></li>
            <li><a href="#curb-appeal" class="sg-footer__link">Maximize Curb Appeal</a></li>
            <li><a href="#marketing" class="sg-footer__link">Marketing Your Home</a></li>
            <li><a href="#negotiation" class="sg-footer__link">Master the Art of Negotiation</a></li>
            <li><a href="#prepare-closing" class="sg-footer__link">Prepare for Closing</a></li>
            <li><a href="#closing-documents" class="sg-footer__link">Closing Documents</a></li>
          </ul>
          <button class="sg-footer__show-more" type="button" aria-expanded="false">MORE <span aria-hidden="true">›</span></button>
        </div>

        <!-- Search -->
        <div class="sg-footer__col" data-col="search">
          <h3 class="sg-footer__col-title">Search</h3>
          <ul class="sg-footer__links">
            <li><a href="#property-search" class="sg-footer__link">Property Search</a></li>
            <li><a href="#map-search" class="sg-footer__link">Map Search</a></li>
            <li><a href="#rentals" class="sg-footer__link">Rentals</a></li>
            <li><a href="#new-listings" class="sg-footer__link">New Listings</a></li>
            <li><a href="#commercial" class="sg-footer__link">Commercial</a></li>
          </ul>
          <ul class="sg-footer__links-extra" aria-hidden="true">
            <li><a href="#new-construction" class="sg-footer__link">New Construction</a></li>
            <li><a href="#farm-land" class="sg-footer__link">Farm and Land</a></li>
            <li><a href="#foreclosures" class="sg-footer__link">Foreclosures</a></li>
          </ul>
          <button class="sg-footer__show-more" type="button" aria-expanded="false">MORE <span aria-hidden="true">›</span></button>
        </div>

        <!-- Communities -->
        <div class="sg-footer__col" data-col="communities">
          <h3 class="sg-footer__col-title">Communities</h3>
          <ul class="sg-footer__links">
            <li><a href="#all-communities" class="sg-footer__link">All Communities</a></li>
            <li><a href="#clearwater" class="sg-footer__link">Clearwater, FL</a></li>
            <li><a href="#st-petersburg" class="sg-footer__link">St Petersburg, FL</a></li>
            <li><a href="#tampa" class="sg-footer__link">Tampa, FL</a></li>
            <li><a href="#gulf-coast" class="sg-footer__link">Florida Gulf Coast Beaches</a></li>
          </ul>
          <ul class="sg-footer__links-extra" aria-hidden="true">
            <li><a href="#wilmington" class="sg-footer__link">Wilmington, NC</a></li>
            <li><a href="#fayetteville" class="sg-footer__link">Fayetteville, NC</a></li>
            <li><a href="#myrtle-beach" class="sg-footer__link">Myrtle Beach, SC</a></li>
            <li><a href="#st-thomas" class="sg-footer__link">St. Thomas, USVI</a></li>
            <li><a href="#st-john" class="sg-footer__link">St. John, USVI</a></li>
            <li><a href="#st-croix" class="sg-footer__link">St. Croix, USVI</a></li>
            <li><a href="#puerto-rico" class="sg-footer__link">Puerto Rico</a></li>
          </ul>
          <button class="sg-footer__show-more" type="button" aria-expanded="false">MORE <span aria-hidden="true">›</span></button>
        </div>

        <!-- Company Info -->
        <div class="sg-footer__col" data-col="company-info">
          <h3 class="sg-footer__col-title">Company Info</h3>
          <ul class="sg-footer__links">
            <li><a href="#locations" class="sg-footer__link">Our Locations</a></li>
            <li><a href="#about" class="sg-footer__link">About Us</a></li>
            <li><a href="#find-agent" class="sg-footer__link">Find an Agent</a></li>
            <li><a href="#contact" class="sg-footer__link">Contact</a></li>
            <li><a href="#market-stats" class="sg-footer__link">Real Estate Market Stats</a></li>
          </ul>
        </div>

      </div>
    </nav><!-- /.sg-footer__nav -->

    <!-- HQ + Contact info -->
    <!-- ACF: hq_address, hq_city_state, hq_phone, hq_email -->
    <div class="sg-footer__info">
      <div class="sg-footer__info-grid">
        <div>
          <p class="sg-footer__info-heading">Global Headquarters</p>
          <address class="sg-footer__address">
            SeaGlass Franchising<br>
            5328 Yacht Haven Grande<br>
            St. Thomas, USVI 00802
          </address>
        </div>
        <div>
          <p class="sg-footer__info-heading">Corporate Contact</p>
          <div class="sg-footer__contact">
            <p>Phone: <a href="tel:+13407745277">1.340.774.5277</a></p>
            <p>Email: <a href="mailto:franchise@seaglass.com">franchise@seaglass.com</a></p>
          </div>
        </div>
      </div>
    </div><!-- /.sg-footer__info -->

    <!-- Social -->
    <div class="sg-footer__social">
      <!-- ACF: social_links[] → platform, url -->
      <a href="#facebook" class="sg-footer__social-link" aria-label="Facebook">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
      </a>
      <a href="#instagram" class="sg-footer__social-link" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
      <a href="#linkedin" class="sg-footer__social-link" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <a href="#youtube" class="sg-footer__social-link" aria-label="YouTube">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
      </a>
    </div><!-- /.sg-footer__social -->

    <!-- Legal -->
    <!-- ACF: legal_disclaimer, copyright_year, legal_links[] -->
    <div class="sg-footer__legal">
      <p class="sg-footer__disclaimer">
        Information is deemed reliable but not guaranteed. Information is provided, in part, by multiple MLS databases.
        This information being provided is for consumer&#39;s personal, non-commercial use and may not be used for any other
        purpose other than to identify prospective properties consumers may be interested in purchasing. Each office is
        independently owned and operated.
      </p>
      <div class="sg-footer__legal-row">
        <p class="sg-footer__copyright">
          &copy; 2026 All Rights are Reserved. Powered by <a href="#mrt-systems">MRT Systems</a>
        </p>
        <div class="sg-footer__legal-links">
          <a href="#privacy" class="sg-footer__legal-link">Privacy Policy</a>
          <span class="sg-footer__legal-divider" aria-hidden="true">|</span>
          <a href="#terms" class="sg-footer__legal-link">Terms of Use</a>
          <span class="sg-footer__legal-divider" aria-hidden="true">|</span>
          <a href="#accessibility" class="sg-footer__legal-link">Accessibility</a>
        </div>
      </div>
    </div><!-- /.sg-footer__legal -->

  </div><!-- /.sg-footer__inner -->

</footer><!-- /.sg-footer -->

<!-- ============================================================
     CDN SCRIPTS
     ============================================================ -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- SeaGlass main JS (also enqueued via wp_footer in WordPress) -->
<script src="js/main.js"></script>

<?php wp_footer(); ?>

</body>
</html>
