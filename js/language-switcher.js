(function () {
	var languages = window.SITE_LANGS;
	var defaultLang = window.SITE_DEFAULT_LANG;
	var currentLang = window.PAGE_LANG || defaultLang;
	var langUrls = window.PAGE_LANG_URLS || {};

	// Salva idioma escolhido quando o usuário clica no switcher
	document.addEventListener('click', function (e) {
		var el = e.target.closest('[data-lang]');
		if (el) localStorage.setItem('lang-choice', el.getAttribute('data-lang'));
	});

	// Determina idioma alvo
	var saved = localStorage.getItem('lang-choice');
	var target;

	if (saved && languages.indexOf(saved) !== -1) {
		target = saved;
	} else {
		var preferred = (navigator.language || navigator.userLanguage || '').toLowerCase();
		target = languages.find(function (l) {
			return l.toLowerCase() === preferred;
		}) || languages.find(function (l) {
			return l.toLowerCase().split('-')[0] === preferred.split('-')[0];
		}) || defaultLang;
		localStorage.setItem('lang-choice', target);
	}

	if (target === currentLang) return;

	// Página sem tradução: deixa o polyglot exibir o que tiver
	var permalink = langUrls[target];
	if (!permalink) return;

	var url = target === defaultLang ? permalink : '/' + target + permalink;

	var currentPath = window.location.pathname;
	if (url === currentPath || url.replace(/\/$/, '') === currentPath.replace(/\/$/, '')) return;

	window.location.replace(url + window.location.search + window.location.hash);
})();