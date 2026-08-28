//=========================================
// ESTADO GLOBAL DEL PRESUPUESTO
//=========================================
const presupuesto = {
  pasoActual: 1,
  servicio: null,
  extras: [],
  infraestructura: [],
  seguridad: null,
  cliente: { nombre: "", empresa: "" },
  total: 0,
  diasTotales: 0
};

const iconosServicios = {
  landing: "bi-rocket-takeoff",
  institucional: "bi-building",
  personalizado: "bi-code-slash"
};

let datosJSON = null;

//=========================================
// INICIALIZACIÓN Y CARGA DE JSON
//=========================================
fetch("data/presupuesto.json")
  .then(response => {
    if (!response.ok) throw new Error("Error al cargar el JSON");
    return response.json();
  })
  .then(data => {
    datosJSON = data;
    cargarPaso1();
    inicializarEventosMovil();
  })
  .catch(error => console.error("Error:", error));

//=========================================
// PASO 1: SERVICIOS
//=========================================
function cargarPaso1() {
  presupuesto.pasoActual = 1;
  const serviceGrid = document.getElementById("serviceGrid");
  serviceGrid.innerHTML = "";

  document.getElementById("stepText").textContent = "Paso 1 de 5: Selección de Servicio";
  document.getElementById("progressBar").style.width = "20%";

  for (const clave in datosJSON.servicios) {
    const servicio = datosJSON.servicios[clave];
    const card = document.createElement("div");
    card.className = "service-card";
    const esSeleccionado = presupuesto.servicio && presupuesto.servicio.id === servicio.id;
    if (esSeleccionado) card.classList.add("selected");

    const iconClass = iconosServicios[servicio.id] || "bi-display";

    card.innerHTML = `
      <div class="service-icon"><i class="bi ${iconClass}"></i></div>
      <h3>${servicio.nombre}</h3>
      <p>${servicio.descripcion}</p>
      <ul class="service-features">
        ${servicio.incluye.map(item => `<li>✔ ${item}</li>`).join("")}
      </ul>
      <div class="service-footer">
        <div>
          <small>Desde</small>
          <span>$${servicio.precio.toLocaleString("es-AR")}</span>
        </div>
        <button class="btn-select ${esSeleccionado ? 'selected-btn' : ''}">
          ${esSeleccionado ? '✔ Seleccionado' : 'Seleccionar'}
        </button>
      </div>
    `;

    card.addEventListener("click", () => {
      presupuesto.servicio = servicio;
      presupuesto.recalcularTotal();
      cargarPaso1();
    });

    serviceGrid.appendChild(card);
  }

  renderizarResumen();
}

//=========================================
// PASO 2: EXTRAS
//=========================================
function cargarPaso2() {
  presupuesto.pasoActual = 2;
  const serviceGrid = document.getElementById("serviceGrid");
  serviceGrid.innerHTML = "";

  document.getElementById("stepText").textContent = "Paso 2 de 5: Módulos Extras";
  document.getElementById("progressBar").style.width = "40%";

  const explicaciones = {
    administrador: "Gestor para que puedas cargar y editar tus propios contenidos fácilmente.",
    blog: "Sección de artículos para posicionar en Google y atraer clientes.",
    catalogo: "Muestrario organizado de productos con categorías y fichas técnicas.",
    turnos: "Sistema para que tus clientes agenden citas automáticamente.",
    login: "Área privada para usuarios registrados con usuario y contraseña.",
    multidioma: "Traducción completa del sitio a otros idiomas."
  };

  for (const clave in datosJSON.extras) {
    const extra = datosJSON.extras[clave];
    const card = document.createElement("div");
    card.className = "service-card";
    const yaAgregado = presupuesto.extras.some(e => e.clave === clave);
    if (yaAgregado) card.classList.add("selected");

    // Botón de Ver Ejemplo rediseñado en bloque o estilo link superior
    let demoButtonHTML = '';
    if (clave === 'turnos') {
      demoButtonHTML = `
        <a href="turnos.html" class="btn btn-sm btn-outline-warning w-100 rounded-pill mb-2 py-2 fw-semibold text-decoration-none" onclick="event.stopPropagation();">
          👁️ Ver Ejemplo Interactivo
        </a>
      `;
    }

    card.innerHTML = `
      <div class="service-icon"><i class="bi bi-plus-circle"></i></div>
      <h3>${extra.nombre}</h3>
      <p>${explicaciones[clave] || 'Funcionalidad avanzada para tu sitio.'}</p>
      
      ${demoButtonHTML}

      <div class="service-footer mt-3">
        <div>
          <small>Costo adicional</small>
          <span>+$${extra.precio.toLocaleString("es-AR")}</span>
        </div>
        <button class="btn-select btn-extra ${yaAgregado ? 'selected-btn' : ''}">
          ${yaAgregado ? '✔ Agregado (Quitar)' : '+ Agregar'}
        </button>
      </div>
    `;

    card.addEventListener("click", () => {
      const index = presupuesto.extras.findIndex(e => e.clave === clave);
      if (index === -1) {
        presupuesto.extras.push({ clave, ...extra });
      } else {
        presupuesto.extras.splice(index, 1);
      }
      presupuesto.recalcularTotal();
      cargarPaso2();
    });

    serviceGrid.appendChild(card);
  }

  renderizarResumen();
}

//=========================================
// PASO 3: INFRAESTRUCTURA
//=========================================
function cargarPaso3() {
  presupuesto.pasoActual = 3;
  const serviceGrid = document.getElementById("serviceGrid");
  serviceGrid.innerHTML = "";

  document.getElementById("stepText").textContent = "Paso 3 de 5: Infraestructura";
  document.getElementById("progressBar").style.width = "60%";

  const explicaciones = {
    dominio: "Tu dirección web única en internet (ej: tunegocio.com.ar).",
    hosting: "Servidor donde se alojan los archivos de tu web para estar activa 24/7.",
    correo: "Cuentas de mail profesionales con la marca de tu empresa."
  };

  const iconosInfra = { dominio: "bi-globe", hosting: "bi-server", correo: "bi-envelope-at" };

  for (const clave in datosJSON.infraestructura) {
    const item = datosJSON.infraestructura[clave];
    const card = document.createElement("div");
    card.className = "service-card";
    const yaAgregado = presupuesto.infraestructura.some(i => i.clave === clave);
    if (yaAgregado) card.classList.add("selected");

    card.innerHTML = `
      <div class="service-icon"><i class="bi ${iconosInfra[clave] || 'bi-hdd-network'}"></i></div>
      <h3>${item.nombre}</h3>
      <p>${explicaciones[clave] || 'Servicio anual de infraestructura web.'}</p>
      <div class="service-footer">
        <div>
          <small>Costo anual</small>
          <span>+$${item.precio.toLocaleString("es-AR")}</span>
        </div>
        <button class="btn-select btn-infra ${yaAgregado ? 'selected-btn' : ''}">
          ${yaAgregado ? '✔ Agregado (Quitar)' : '+ Agregar'}
        </button>
      </div>
    `;

    card.addEventListener("click", () => {
      const index = presupuesto.infraestructura.findIndex(i => i.clave === clave);
      if (index === -1) {
        presupuesto.infraestructura.push({ clave, ...item });
      } else {
        presupuesto.infraestructura.splice(index, 1);
      }
      presupuesto.recalcularTotal();
      cargarPaso3();
    });

    serviceGrid.appendChild(card);
  }

  renderizarResumen();
}

//=========================================
// PASO 4: SEGURIDAD
//=========================================
function cargarPaso4() {
  presupuesto.pasoActual = 4;
  const serviceGrid = document.getElementById("serviceGrid");
  serviceGrid.innerHTML = "";

  document.getElementById("stepText").textContent = "Paso 4 de 5: Capa de Seguridad";
  document.getElementById("progressBar").style.width = "80%";

  for (const clave in datosJSON.seguridad) {
    const item = datosJSON.seguridad[clave];
    const card = document.createElement("div");
    card.className = "service-card";
    const esSeleccionado = presupuesto.seguridad && presupuesto.seguridad.clave === clave;
    if (esSeleccionado) card.classList.add("selected");

    const esPro = clave === "pro";
    const precioTexto = item.precio === 0 ? "Incluida (Gratis)" : `+$${item.precio.toLocaleString("es-AR")}`;

    card.innerHTML = `
      <div class="service-icon"><i class="bi ${esPro ? 'bi-shield-lock-fill' : 'bi-shield-check'}"></i></div>
      <h3>${item.nombre}</h3>
      <p>${esPro ? 'Protección avanzada con Cloudflare, Anti-Spam y Copias de Seguridad.' : 'Protección estándar para sitios informativos.'}</p>
      <div class="service-footer">
        <div>
          <small>Inversión</small>
          <span>${precioTexto}</span>
        </div>
        <button class="btn-select btn-seg ${esSeleccionado ? 'selected-btn' : ''}">
          ${esSeleccionado ? '✔ Seleccionado' : 'Elegir'}
        </button>
      </div>
    `;

    card.addEventListener("click", () => {
      presupuesto.seguridad = { clave, ...item };
      presupuesto.recalcularTotal();
      cargarPaso4();
    });

    serviceGrid.appendChild(card);
  }

  renderizarResumen();
}

//=========================================
// PASO 5: DATOS Y WHATSAPP
//=========================================
function cargarPaso5() {
  presupuesto.pasoActual = 5;
  const serviceGrid = document.getElementById("serviceGrid");
  document.getElementById("stepText").textContent = "Paso 5 de 5: Confirmación";
  document.getElementById("progressBar").style.width = "100%";

  serviceGrid.innerHTML = `
    <div class="service-card p-4">
      <h3 class="text-warning mb-3">Tus Datos de Contacto</h3>
      <p class="text-secondary mb-4">Ingresá tu nombre y negocio para personalizar la cotización antes de enviar.</p>
      
      <div class="mb-3">
        <label class="form-label text-white fw-bold">Nombre Completo *</label>
        <input type="text" id="clienteNombre" class="form-control bg-dark text-white border-secondary" placeholder="Ej: Juan Pérez" value="${presupuesto.cliente.nombre}">
      </div>

      <div class="mb-4">
        <label class="form-label text-white fw-bold">Empresa o Rubro</label>
        <input type="text" id="clienteEmpresa" class="form-control bg-dark text-white border-secondary" placeholder="Ej: Barbería / Gimnasio" value="${presupuesto.cliente.empresa}">
      </div>

      <button id="btnEnviarWA" class="btn btn-success btn-lg w-100 fw-bold rounded-pill">
        <i class="bi bi-whatsapp me-2"></i> Enviar Presupuesto por WhatsApp
      </button>
    </div>
  `;

  document.getElementById("btnEnviarWA").addEventListener("click", enviarWhatsApp);
  renderizarResumen();
}

//=========================================
// RECALCULAR TOTALES
//=========================================
presupuesto.recalcularTotal = function() {
  if (!this.servicio) return;
  let total = this.servicio.precio;
  let dias = this.servicio.dias;

  this.extras.forEach(e => { total += e.precio; dias += e.dias || 0; });
  this.infraestructura.forEach(i => { total += i.precio; });
  if (this.seguridad) { total += this.seguridad.precio; }

  this.total = total;
  this.diasTotales = dias;
};

//=========================================
// RENDERIZAR RESUMEN LATERAL
//=========================================
function renderizarResumen() {
  const summary = document.getElementById("summaryContent");
  if (!presupuesto.servicio) {
    summary.innerHTML = "<p>Elegí un servicio para comenzar.</p>";
    actualizarWidgetMovil();
    return;
  }

  let extrasHTML = presupuesto.extras.length > 0 ? `
    <hr><strong class="text-warning">Extras:</strong>
    <ul class="list-unstyled mb-0">
      ${presupuesto.extras.map(e => `<li class="d-flex justify-content-between"><small>• ${e.nombre}</small><small>+$${e.precio.toLocaleString("es-AR")}</small></li>`).join("")}
    </ul>
  ` : '';

  let infraHTML = presupuesto.infraestructura.length > 0 ? `
    <hr><strong class="text-warning">Infraestructura:</strong>
    <ul class="list-unstyled mb-0">
      ${presupuesto.infraestructura.map(i => `<li class="d-flex justify-content-between"><small>• ${i.nombre}</small><small>+$${i.precio.toLocaleString("es-AR")}</small></li>`).join("")}
    </ul>
  ` : '';

  let segHTML = presupuesto.seguridad ? `
    <hr><strong class="text-warning">Seguridad:</strong>
    <div class="d-flex justify-content-between"><small>• ${presupuesto.seguridad.nombre}</small><small>+$${presupuesto.seguridad.precio.toLocaleString("es-AR")}</small></div>
  ` : '';

  let botonVolverHTML = presupuesto.pasoActual > 1 ? `
    <button class="btn btn-outline-secondary w-100 mb-2 fw-bold" id="btnVolverPaso">
      ← Paso Anterior
    </button>
  ` : '';

  let textoBotonSiguiente = "Siguiente paso →";
  if (presupuesto.pasoActual === 1) textoBotonSiguiente = "Siguiente: Extras →";
  if (presupuesto.pasoActual === 2) textoBotonSiguiente = "Siguiente: Infraestructura →";
  if (presupuesto.pasoActual === 3) textoBotonSiguiente = "Siguiente: Seguridad →";
  if (presupuesto.pasoActual === 4) textoBotonSiguiente = "Finalizar Presupuesto →";

  summary.innerHTML = `
    <h4>${presupuesto.servicio.nombre}</h4>
    <p class="d-flex justify-content-between mb-1"><span>Base:</span><strong>$${presupuesto.servicio.precio.toLocaleString("es-AR")}</strong></p>

    ${extrasHTML}
    ${infraHTML}
    ${segHTML}

    <hr>
    <p class="d-flex justify-content-between mb-2"><span>Tiempo estimado:</span><strong>${presupuesto.diasTotales} días</strong></p>
    <div class="d-flex justify-content-between mb-3">
      <span class="fs-5 fw-bold">Total:</span>
      <span class="fs-4 fw-bold text-warning">$${presupuesto.total.toLocaleString("es-AR")}</span>
    </div>

    ${botonVolverHTML}
    ${presupuesto.pasoActual < 5 ? `
      <button class="btn-select w-100 fw-bold py-2" id="btnSiguientePaso">
        ${textoBotonSiguiente}
      </button>
    ` : ''}
  `;

  if (document.getElementById("btnVolverPaso")) {
    document.getElementById("btnVolverPaso").addEventListener("click", () => {
      if (presupuesto.pasoActual === 2) cargarPaso1();
      if (presupuesto.pasoActual === 3) cargarPaso2();
      if (presupuesto.pasoActual === 4) cargarPaso3();
      if (presupuesto.pasoActual === 5) cargarPaso4();
    });
  }

  if (document.getElementById("btnSiguientePaso")) {
    document.getElementById("btnSiguientePaso").addEventListener("click", () => {
      if (presupuesto.pasoActual === 1) cargarPaso2();
      else if (presupuesto.pasoActual === 2) cargarPaso3();
      else if (presupuesto.pasoActual === 3) cargarPaso4();
      else if (presupuesto.pasoActual === 4) cargarPaso5();
    });
  }

  actualizarWidgetMovil();
}

//=========================================
// ACTUALIZAR CARRITO FLOTANTE MÓVIL
//=========================================
function actualizarWidgetMovil() {
  const contadorElem = document.getElementById("mobile-cart-count");
  const totalElem = document.getElementById("mobile-cart-total");

  if (!contadorElem || !totalElem) return;

  let cantidadItems = 0;
  if (presupuesto.servicio) cantidadItems++;
  cantidadItems += presupuesto.extras.length;
  cantidadItems += presupuesto.infraestructura.length;
  if (presupuesto.seguridad) cantidadItems++;

  contadorElem.textContent = cantidadItems;
  totalElem.textContent = `$${presupuesto.total.toLocaleString("es-AR")}`;
}

//=========================================
// EVENTO DE SCROLL SUAVE PARA EL CELULAR
//=========================================
function inicializarEventosMovil() {
  const stickyBar = document.getElementById("sticky-cart-bar");
  if (!stickyBar) return;

  stickyBar.addEventListener("click", () => {
    const resumenBox = document.getElementById("summaryContent") || document.querySelector(".summary-box");
    if (resumenBox) {
      resumenBox.scrollIntoView({ behavior: "smooth" });
    }
  });
}

//=========================================
// ENVIAR A WHATSAPP
//=========================================
function enviarWhatsApp() {
  const nombre = document.getElementById("clienteNombre").value.trim();
  const empresa = document.getElementById("clienteEmpresa").value.trim();

  if (!nombre) {
    alert("Por favor ingresá tu nombre antes de enviar.");
    return;
  }

  presupuesto.cliente = { nombre, empresa };
  const numTel = "5491164639977";

  let mensaje = `Hola Yellow Web Studio! Soy *${nombre}*${empresa ? ` de *${empresa}*` : ''}.\n`;
  mensaje += `Armé este presupuesto desde la web:\n\n`;
  mensaje += `📌 *Servicio Base:* ${presupuesto.servicio.nombre} ($${presupuesto.servicio.precio.toLocaleString("es-AR")})\n`;

  if (presupuesto.extras.length > 0) {
    mensaje += `\n➕ *Extras:* \n` + presupuesto.extras.map(e => `- ${e.nombre}: $${e.precio.toLocaleString("es-AR")}`).join("\n");
  }
  if (presupuesto.infraestructura.length > 0) {
    mensaje += `\n\n🌐 *Infraestructura:* \n` + presupuesto.infraestructura.map(i => `- ${i.nombre}: $${i.precio.toLocaleString("es-AR")}`).join("\n");
  }
  if (presupuesto.seguridad) {
    mensaje += `\n\n🛡️ *Seguridad:* ${presupuesto.seguridad.nombre} ($${presupuesto.seguridad.precio.toLocaleString("es-AR")})`;
  }

  mensaje += `\n\n⏱️ *Tiempo estimado:* ${presupuesto.diasTotales} días`;
  mensaje += `\n💰 *TOTAL ESTIMADO:* $${presupuesto.total.toLocaleString("es-AR")}`;

  const linkWa = `https://api.whatsapp.com/send?phone=${numTel}&text=${encodeURIComponent(mensaje)}`;
  window.open(linkWa, "_blank");
}