export function contenido(){
    document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      // Activar enlace
      document.querySelectorAll('.sidebar a').forEach(el => el.classList.remove('active'));
      link.classList.add('active');

      // Mostrar contenido correspondiente
      const target = link.getAttribute('data-target');
      document.querySelectorAll('.contenido-item').forEach(item => {
        item.classList.remove('active');
      });
      document.getElementById(target).classList.add('active');
    });
  });
}

