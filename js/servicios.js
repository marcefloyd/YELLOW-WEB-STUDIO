//=========================================
// CARGAR SERVICIOS DESDE PRESUPUESTO.JSON
//=========================================
fetch("data/presupuesto.json")
  .then(response => {
    if (!response.ok) throw new Error("Error al cargar el JSON");
    return response.json();
  })
  .then(data => {
    renderizarServiciosBase(data.servicios);
    renderizarExtras(data.extras);
  })
  .catch(error => console.error("Error:", error));

function renderizarServiciosBase(servicios) {
  const contenedor = document.getElementById("contenedorServicios");
  contenedor.innerHTML = "";

  const iconos = {
    landing: "bi-rocket-takeoff",
    institucional: "bi-building",
    personalizado: "bi-code-slash"
  };

  for (const clave in servicios) {
    const s = servicios[clave];
    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6";

    col.innerHTML = `
      <div class="service-card h-100 d-flex flex-column justify-content-between p-4">
        <div>
          <div class="service-icon mb-3">
            <i class="bi ${iconos[s.id] || 'bi-display'} text-warning display-5"></i>
          </div>
          <h3 class="text-white h4 mb-2">${s.nombre}</h3>
          <p class="text-secondary fs-6 mb-3">${s.descripcion}</p>
          
          <ul class="service-features list-unstyled mb-4">
            ${s.incluye.map(item => `<li class="text-white mb-2"><i class="bi bi-check2-circle text-warning me-2"></i>${item}</li>`).join("")}
          </ul>
        </div>

        <div class="pt-3 border-top border-secondary">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-secondary">Inversión base:</span>
            <span class="fs-5 fw-bold text-warning">$${s.precio.toLocaleString("es-AR")}</span>
          </div>
          <a href="presupuesto.html" class="btn btn-outline-warning w-100 fw-bold">
            Cotizar este servicio
          </a>
        </div>
      </div>
    `;

    contenedor.appendChild(col);
  }
}

function renderizarExtras(extras) {
  const contenedor = document.getElementById("contenedorExtras");
  contenedor.innerHTML = "";

  const explicacionesDetalladas = {
    administrador: "Incluye un panel autocontrolable con usuario y contraseña para que modifiques textos, fotos y productos sin depender de nosotros.",
    blog: "Sección optimizada para subir novedades, artículos de interés y mejorar tu posicionamiento orgánico en Google (SEO).",
    catalogo: "Muestrario digital para exponer tus productos organizados por categorías con botón de consulta directa por WhatsApp.",
    turnos: "Plataforma de agenda online para que tus clientes elijan día, horario y servicio sin cruzar mensajes manualmente.",
    login: "Módulo de registro para clientes con panel privado donde pueden ver información exclusiva o sus turnos agendados.",
    multidioma: "Estructura traducida y adaptable a dos o más idiomas con selector de banderas en el menú principal."
  };

  for (const clave in extras) {
    const extra = extras[clave];
    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6";

    col.innerHTML = `
      <div class="service-card h-100 d-flex flex-column justify-content-between p-4">
        <div>
          <div class="service-icon mb-3">
            <i class="bi bi-plus-circle text-warning display-6"></i>
          </div>
          <h3 class="text-white h5 mb-2">${extra.nombre}</h3>
          <p class="text-secondary fs-6 mb-3">${explicacionesDetalladas[clave] || 'Módulo adicional para potenciar las capacidades de tu sitio web.'}</p>
        </div>

        <div class="pt-3 border-top border-secondary d-flex justify-content-between align-items-center">
          <small class="text-secondary">Costo adicional</small>
          <span class="fw-bold text-warning">+$${extra.precio.toLocaleString("es-AR")}</span>
        </div>
      </div>
    `;

    contenedor.appendChild(col);
  }
}