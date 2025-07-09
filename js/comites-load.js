async function cargarComites() {
  const loader = document.getElementById('loader-comites');
  const container = document.getElementById('comites-container');

  loader.style.display = 'flex';
  container.style.display = 'none';

  try {
    const res = await fetch("/data/comites.json");
    const comites = await res.json();

    comites.forEach(comite => {
      const div = document.createElement('div');
      div.classList.add('comite-box');
      div.innerHTML = `
        <h4 class="titulo-carrera">${comite.carrera.toUpperCase()}</h4>
        <table class="tabla-comite">
          ${comite.miembros.map(m => `
            <tr>
              <td>${m.rol}</td>
              <td>${m.nombre}</td>
            </tr>
          `).join('')}
        </table>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error al cargar comités:", error);
    loader.innerHTML = `<p>Error al cargar los comités. Intente nuevamente.</p>`;
  } finally {
    loader.style.display = 'none';
    container.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', cargarComites);
