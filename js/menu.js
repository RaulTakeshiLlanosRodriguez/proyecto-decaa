export function initMenu(){
    document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("main-nav").classList.toggle("activo");
  });

   document.querySelectorAll('.has-submenu > a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();

        document.querySelectorAll('.has-submenu').forEach(function(item) {
          if (item !== link.parentElement) {
            item.classList.remove('open');
          }
        });

        link.parentElement.classList.toggle('open');
      }
    });
  });
}