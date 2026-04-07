/**
 * Table of Contents: highlight the active section based on scroll position.
 * Expects a <nav class="toc"> with <a href="#heading-id"> links.
 */
function initTocHighlight() {
	const toc = document.querySelector('.toc');
	if (!toc) return;

	const links = Array.from(toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
	if (!links.length) return;

	const headings = links
		.map((link) => {
			const id = link.getAttribute('href')?.slice(1);
			return id ? document.getElementById(id) : null;
		})
		.filter(Boolean) as HTMLElement[];

	if (!headings.length) return;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const id = entry.target.id;
				const link = toc.querySelector<HTMLAnchorElement>(`a[href="#${id}"]`);
				if (link) {
					if (entry.isIntersecting) {
						links.forEach((l) => l.classList.remove('toc-active'));
						link.classList.add('toc-active');
					}
				}
			});
		},
		{
			rootMargin: '-80px 0px -65% 0px',
			threshold: 0,
		},
	);

	headings.forEach((h) => observer.observe(h));
}

document.addEventListener('astro:page-load', initTocHighlight);
if (document.readyState !== 'loading') {
	initTocHighlight();
}
