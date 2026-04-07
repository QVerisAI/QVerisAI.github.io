/**
 * Code block copy buttons: inject a "Copy" button into every <pre> block.
 */
function initCodeCopy() {
	const pres = document.querySelectorAll('.prose pre');
	if (!pres.length) return;

	pres.forEach((pre) => {
		// Skip if already has a copy button
		if (pre.querySelector('.code-copy-btn')) return;

		const btn = document.createElement('button');
		btn.className = 'code-copy-btn';
		btn.textContent = 'Copy';
		btn.type = 'button';
		btn.setAttribute('aria-label', 'Copy code to clipboard');

		btn.addEventListener('click', async () => {
			const code = pre.querySelector('code');
			const text = code?.textContent ?? pre.textContent ?? '';

			try {
				await navigator.clipboard.writeText(text);
			} catch {
				// Fallback
				const textarea = document.createElement('textarea');
				textarea.value = text;
				textarea.style.position = 'fixed';
				textarea.style.opacity = '0';
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand('copy');
				document.body.removeChild(textarea);
			}

			btn.textContent = 'Copied!';
			btn.classList.add('copied');
			setTimeout(() => {
				btn.textContent = 'Copy';
				btn.classList.remove('copied');
			}, 1800);
		});

		(pre as HTMLElement).style.position = 'relative';
		pre.appendChild(btn);
	});
}

document.addEventListener('astro:page-load', initCodeCopy);
if (document.readyState !== 'loading') {
	initCodeCopy();
}
