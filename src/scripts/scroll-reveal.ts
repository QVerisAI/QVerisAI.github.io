/**
 * Scroll-reveal: fade + slide up when elements enter viewport.
 * Elements must have class="reveal".
 * Stagger siblings via CSS --reveal-delay.
 */
function initScrollReveal() {
	const els = document.querySelectorAll('.reveal');
	if (!els.length) return;

	// Respect reduced motion
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		els.forEach((el) => el.classList.add('revealed'));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.08, rootMargin: '0px 0px -36px 0px' },
	);

	els.forEach((el) => observer.observe(el));
}

// Run on initial load and Astro page transitions
document.addEventListener('astro:page-load', initScrollReveal);
if (document.readyState !== 'loading') {
	initScrollReveal();
}
