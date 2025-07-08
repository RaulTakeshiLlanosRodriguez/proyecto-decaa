let publicaciones = [];
let paginaActual = 1;
const publicacionesPorPagina = 5;

async function cargarPublicaciones() {
  const res = await fetch('../data/investigaciones.json');
  publicaciones = await res.json();
  poblarFiltroAnios();
  poblarFiltroCarreras();
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

function poblarFiltroCarreras() {
  const select = document.getElementById('filtro-carrera');
  const carreras = [...new Set(publicaciones.map(p => p.carrera))].sort((a, b) => b - a);
  carreras.forEach(carrera => {
    const option = document.createElement('option');
    option.value = carrera;
    option.textContent = carrera;
    select.appendChild(option);
  });
}

function obtenerColorCarrera(nombreCarrera) {
  const carrera = nombreCarrera.toLowerCase();
  if (carrera.includes('educación')) return 'celeste';
  if (carrera.includes('ingeniería')) return 'guinda';
  return 'verde';
}

function renderizarPublicaciones() {
  const contenedor = document.getElementById('listado-publicaciones');
  contenedor.innerHTML = '';

  const tipoFiltro = document.getElementById('tipo-filtro').value;
  const textoFiltro = document.getElementById('filtro-texto').value.toLowerCase();
  const filtroAnio = document.getElementById('filtro-anio').value;
  const filtroCarrera = document.getElementById('filtro-carrera').value;

  let filtradas = publicaciones.filter(p => {
    if (tipoFiltro === 'docente') return p.docente.toLowerCase().includes(textoFiltro);
    if (tipoFiltro === 'titulo') return p.titulo.toLowerCase().includes(textoFiltro);
    if (tipoFiltro === 'anio') return filtroAnio === '' || p.anio.toString() === filtroAnio;
    if (tipoFiltro === 'carrera') return filtroCarrera === '' || p.carrera === filtroCarrera;
    return true;
  });

  const totalPaginas = Math.ceil(filtradas.length / publicacionesPorPagina);
  const inicio = (paginaActual - 1) * publicacionesPorPagina;
  const publicacionesPagina = filtradas.slice(inicio, inicio + publicacionesPorPagina);

  publicacionesPagina.forEach(pub => {
    const color = obtenerColorCarrera(pub.carrera);
    const div = document.createElement('div');
    div.classList.add('publicacion');
    div.innerHTML = `
      <div class="etiqueta-carrera ${color}">${pub.carrera}</div>
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

document.getElementById('tipo-filtro').addEventListener('change', () => {
  const tipo = document.getElementById('tipo-filtro').value;
  document.getElementById('filtro-texto').style.display = (tipo === 'docente' || tipo === 'titulo') ? 'inline-block' : 'none';
  document.getElementById('filtro-anio').style.display = tipo === 'anio' ? 'inline-block' : 'none';
  document.getElementById('filtro-carrera').style.display = tipo === 'carrera' ? 'inline-block' : 'none';
  paginaActual = 1;
  renderizarPublicaciones();
});

document.getElementById('filtro-texto').addEventListener('input', () => {
  paginaActual = 1;
  renderizarPublicaciones();
});
document.getElementById('filtro-anio').addEventListener('change', () => {
  paginaActual = 1;
  renderizarPublicaciones();
});
document.getElementById('filtro-carrera').addEventListener('change', () => {
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
