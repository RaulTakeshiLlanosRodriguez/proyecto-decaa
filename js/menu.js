export function initMenu() {
  document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("main-nav").classList.toggle("activo");
  });

  document.querySelectorAll('.has-submenu > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        const parent = link.parentElement;
        const hasRealSubmenu = parent.querySelector('.submenu');
        const href = link.getAttribute('href');

        if (href == "#" || hasRealSubmenu) {
          e.preventDefault();

          const isOpen = parent.classList.contains('open');

          document.querySelectorAll('.has-submenu').forEach(function (item) {
            item.classList.remove('open');
          });

          if (!isOpen) {
            parent.classList.add('open');
          }
        }
      }
    });
  });
}