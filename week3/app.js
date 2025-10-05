const routes = {
  '/': () => `<h1>Home</h1><p>홈 페이지</p>`,
  '/about': () => `<h1>About</h1><p>React Router 없이 만든 SPA 실습</p>`,
  '/contact': () => `
    <h1>Contact</h1>
    <form id="contactForm">
      <input type="text" placeholder="이름" required />
      <input type="email" placeholder="이메일" required />
      <button type="submit">전송</button>
    </form>
    <div id="message"></div>
  `
};

function render(path) {
  const app = document.getElementById('app');
  app.innerHTML = routes[path] ? routes[path]() : `<h1>404</h1><p>페이지를 찾을 수 없습니다.</p>`;

  if (path === '/contact') {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('message').textContent = '폼이 제출되었습니다!';
      form.reset();
    });
  }
}

function navigateTo(url) {
  history.pushState(null, null, url);
  render(url);
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-link]');
  if (link) {
    e.preventDefault();
    navigateTo(link.getAttribute('href'));
  }
});

window.addEventListener('popstate', () => render(location.pathname));

render(location.pathname);
