let publicaciones = [];
let paginaActual = 1;
const publicacionesPorPagina = 5;

async function cargarPublicaciones() {
  const res = await fetch('../data/investigaciones.json');
  publicaciones = await res.json();
  poblarFiltroAnios();
  renderizarPublicaciones();
}

function poblarFiltroAnios() {
  const select = document.getElementById('filtro-anio');
  const anios = [...new Set(publicaciones.map(p => p.anio))].sort((a, b) => b - a);
  anios.forEach(anio => {
    const option = document.createElement('option');
    option.value = anio;
    option.textContent = anio;
    select.appendChild(option);
  });
}

function renderizarPublicaciones() {
  const contenedor = document.getElementById('listado-publicaciones');
  contenedor.innerHTML = '';

  const filtroDocente = document.getElementById('filtro-docente').value.toLowerCase();
  const filtroTitulo = document.getElementById('filtro-titulo').value.toLowerCase();
  const filtroAnio = document.getElementById('filtro-anio').value;

  let filtradas = publicaciones.filter(p => {
    const coincideDocente = p.docente.toLowerCase().includes(filtroDocente);
    const coincideTitulo = p.titulo.toLowerCase().includes(filtroTitulo);
    const coincideAnio = filtroAnio === '' || p.anio.toString() === filtroAnio;
    return coincideDocente && coincideTitulo && coincideAnio;
  });

  const totalPaginas = Math.ceil(filtradas.length / publicacionesPorPagina);
  const inicio = (paginaActual - 1) * publicacionesPorPagina;
  const publicacionesPagina = filtradas.slice(inicio, inicio + publicacionesPorPagina);

  publicacionesPagina.forEach(pub => {
    const div = document.createElement('div');
    div.classList.add('publicacion');
    div.innerHTML = `
      <h4>${pub.titulo}</h4>
      <p><strong>Docente:</strong> ${pub.docente}</p>
      <p><strong>Año:</strong> ${pub.anio}</p>
      <a href="${pub.enlace}" class="btn-repositorio" target="_blank">Ver en Repositorio</a>
    `;
    contenedor.appendChild(div);
  });

  document.getElementById('pagina-actual').textContent = `${paginaActual} / ${totalPaginas || 1}`;
  document.getElementById('prev-page').disabled = paginaActual === 1;
  document.getElementById('next-page').disabled = paginaActual === totalPaginas;
}

document.getElementById('filtro-docente').addEventListener('input', () => {
  paginaActual = 1;
  renderizarPublicaciones();
});
document.getElementById('filtro-titulo').addEventListener('input', () => {
  paginaActual = 1;
  renderizarPublicaciones();
});
document.getElementById('filtro-anio').addEventListener('change', () => {
  paginaActual = 1;
  renderizarPublicaciones();
});

document.getElementById('prev-page').addEventListener('click', () => {
  paginaActual--;
  renderizarPublicaciones();
});

document.getElementById('next-page').addEventListener('click', () => {
  paginaActual++;
  renderizarPublicaciones();
});

document.addEventListener('DOMContentLoaded', cargarPublicaciones);
