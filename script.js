document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle --- (يبقى كما هو)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });
    // Progress Bar Scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        document.getElementById('progress-bar').style.width = progress + '%';
    });
    // --- Dropdown Navigation (الطريقة الجديدة) ---
    const dropdownButton = document.querySelector('.dropbtn');
    const sectionDropdown = document.getElementById('sectionDropdown');

    if (dropdownButton && sectionDropdown) {
        // ⭐ تغيير هنا: البحث عن section بسمات محددة
        const sectionsForNav = document.querySelectorAll('#content section[id][data-nav-title]');

        console.log('Sections for Nav found:', sectionsForNav);
        console.log('Number of sections for Nav found:', sectionsForNav.length);

        if (sectionsForNav.length === 0) {
            console.warn("No sections with 'id' and 'data-nav-title' found within #content. The dropdown will be empty.");
        }

        sectionsForNav.forEach(section => {
            const link = document.createElement('a');
            link.href = `#${section.id}`; // الـ id الخاص بالـ section

            // ⭐ تغيير هنا: استخدام data-nav-title للنص
            let navTitle = section.dataset.navTitle; //  dataset.navTitle  يقابل data-nav-title

            if (navTitle) {
                link.textContent = navTitle.substring(0, 50) + (navTitle.length > 50 ? '...' : '');
            } else {
                link.textContent = "Untitled Section"; // احتياطي إذا نسيت data-nav-title
            }

            // يمكنك إضافة تنسيق خاص إذا أردت التمييز بين مستويات العناوين هنا
            // بناءً على نوع الوسم الأصلي (h2 أو h3) إذا كنت لا تزال تريد هذا التمييز،
            // ولكن هذه الطريقة تعتمد على <section> بشكل أساسي.

            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetElement = document.getElementById(section.id); // استخدام id القسم مباشرة
                if (targetElement) {
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 10;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
                sectionDropdown.classList.remove('show');
            });
            sectionDropdown.appendChild(link);
        });

        // Toggle dropdown visibility (يبقى كما هو)
        dropdownButton.addEventListener('click', (event) => {
            event.stopPropagation();
            sectionDropdown.classList.toggle('show');
        });

        // Close dropdown if clicked outside (يبقى كما هو)
        window.addEventListener('click', (event) => {
            if (!dropdownButton.contains(event.target) && !sectionDropdown.contains(event.target)) {
                if (sectionDropdown.classList.contains('show')) {
                    sectionDropdown.classList.remove('show');
                }
            }
        });
    } else {
        console.error('Dropdown button (.dropbtn) or content area (#sectionDropdown) not found!');
    }

    // --- Scroll Animations (Intersection Observer) --- (يبقى كما هو)
    const animatedSections = document.querySelectorAll('#content section.visible-on-scroll'); // يمكنك استخدام كلاس محدد إذا أردت، أو كل الـ section
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    // تأكد من أن animatedSections هنا هي العناصر التي تريد تطبيق التأثير عليها
    // في CSS، يجب أن يكون هناك تعريف للكلاس .visible-on-scroll إذا استخدمته
    // أو ببساطة طبق التأثير على كل section
    document.querySelectorAll('#content section').forEach(section => {
        scrollObserver.observe(section);
    });

}); // End of DOMContentLoaded