/* =========================================================
   BULLION BRIDGE — CINEMATIC FRONT END
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const loader = document.getElementById("loader");
    const loaderNumber = document.getElementById("loader-number");

    const header = document.getElementById("site-header");

    const progressBar =
        document.getElementById("scroll-progress-bar");

    const sideProgress =
        document.getElementById("side-line-progress");

    const menuButton =
        document.getElementById("menu-button");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const reveals =
        document.querySelectorAll(".reveal");

    const cursor =
        document.getElementById("custom-cursor");

    const cursorRing =
        document.getElementById("cursor-ring");


    /* =====================================================
       LOADER
    ====================================================== */

    let loaderValue = 0;

    const loaderInterval = setInterval(() => {

        loaderValue += Math.floor(
            Math.random() * 9
        ) + 2;

        if (loaderValue >= 100) {

            loaderValue = 100;

            clearInterval(loaderInterval);

            if (loaderNumber) {
                loaderNumber.textContent = "100";
            }

            setTimeout(() => {

                if (loader) {
                    loader.classList.add("hidden");
                }

                revealVisibleElements();

            }, 400);

            return;
        }

        if (loaderNumber) {
            loaderNumber.textContent =
                loaderValue;
        }

    }, 70);


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const scrollPercentage =
            documentHeight > 0
                ? scrollTop / documentHeight
                : 0;

        const percentage =
            Math.min(
                Math.max(scrollPercentage, 0),
                1
            );

        if (progressBar) {
            progressBar.style.width =
                `${percentage * 100}%`;
        }

        if (sideProgress) {
            sideProgress.style.height =
                `${percentage * 100}%`;
        }

    }


    /* =====================================================
       HEADER SCROLL STATE
    ====================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }


    /* =====================================================
       REVEAL ANIMATIONS
    ====================================================== */

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    reveals.forEach((element) => {
        revealObserver.observe(element);
    });


    function revealVisibleElements() {

        reveals.forEach((element) => {

            const rect =
                element.getBoundingClientRect();

            if (
                rect.top <
                window.innerHeight * 0.95
            ) {
                element.classList.add(
                    "visible"
                );
            }

        });

    }


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.toggle(
                        "active"
                    );

                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerOffset = 75;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    const heroOrb =
        document.querySelector(".orb-one");

    const heroTitle =
        document.querySelector(".hero-title");

    function updateHeroParallax() {

        const scrollY =
            window.scrollY;

        if (
            heroOrb &&
            scrollY < window.innerHeight * 1.2
        ) {

            heroOrb.style.marginTop =
                `${scrollY * 0.12}px`;

        }

        if (
            heroTitle &&
            scrollY < window.innerHeight
        ) {

            heroTitle.style.transform =
                `translateY(${scrollY * 0.05}px)`;

        }

    }


    /* =====================================================
       CUSTOM CURSOR
    ====================================================== */

    if (
        cursor &&
        cursorRing &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;

        let ringX = mouseX;
        let ringY = mouseY;


        window.addEventListener(
            "mousemove",
            (event) => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                cursor.style.left =
                    `${mouseX}px`;

                cursor.style.top =
                    `${mouseY}px`;

            }
        );


        function animateCursor() {

            ringX +=
                (mouseX - ringX) * 0.15;

            ringY +=
                (mouseY - ringY) * 0.15;

            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;

            requestAnimationFrame(
                animateCursor
            );

        }

        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button"
            );


        interactiveElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        cursorRing.classList.add(
                            "hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        cursorRing.classList.remove(
                            "hover"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       SECTION NUMBER
    ====================================================== */

    const sections =
        document.querySelectorAll(
            ".story-section"
        );

    const sideNumbers =
        document.querySelectorAll(
            ".side-number"
        );


    function updateCurrentSection() {

        let currentSection = "01";

        sections.forEach((section) => {

            const rect =
                section.getBoundingClientRect();

            if (
                rect.top <=
                window.innerHeight * 0.5
            ) {

                currentSection =
                    section.dataset.section ||
                    currentSection;

            }

        });


        if (sideNumbers.length > 0) {

            sideNumbers[0].textContent =
                currentSection;

        }

    }


    /* =====================================================
       SUBTLE BACKGROUND MOVEMENT
    ====================================================== */

    const backgroundGrid =
        document.querySelector(
            ".background-grid"
        );


    function updateBackground() {

        if (!backgroundGrid) {
            return;
        }

        const movement =
            window.scrollY * 0.02;

        backgroundGrid.style.transform =
            `translateY(${movement}px)`;

    }


    /* =====================================================
       SCROLL LOOP
    ====================================================== */

    let ticking = false;


    function handleScroll() {

        if (!ticking) {

            window.requestAnimationFrame(
                () => {

                    updateScrollProgress();

                    updateHeader();

                    updateHeroParallax();

                    updateCurrentSection();

                    updateBackground();

                    ticking = false;

                }
            );

            ticking = true;

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            updateScrollProgress();

            revealVisibleElements();

        }
    );


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    updateScrollProgress();

    updateHeader();

    updateCurrentSection();

    updateBackground();

});