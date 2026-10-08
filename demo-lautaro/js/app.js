var WA_NUMBER = "5491100000000"; // TODO: tu número con código de país
var $ = function (i) { return document.getElementById(i); };
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function wa(m) { window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hola! Me interesa el plan " + m), "_blank"); return false; }
function U(id) { return "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=900&q=70"; }
var CUR = "$";
function money(n) { return n ? CUR + n.toLocaleString("es-AR") : "Gratis"; }
function hs(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
function toast(m) { var t = $("toast"); t.textContent = m; t.classList.add("on"); setTimeout(function () { t.classList.remove("on"); }, 3200); }

var H = ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
var FAQ_PAGO = ["¿Qué medios de pago aceptan?", "Efectivo, transferencia y Mercado Pago."];
var P = {
    concesionario: {
        ft: "Rajdhani", im: ["photo-1503376780353-7e6692767b70", "photo-1494976388531-d1058494cdd8", "photo-1549317661-bd32c8ce0db2", "photo-1533473359331-0135ef1b58bf", "photo-1552519507-da3b142c6e3d"], k: /concesion|0 ?km|usados|automotor|agencia de autos|vendemos autos|compra ?venta de autos/, c1: "#0b1b3a", c2: "#e11d48", ico: "🚘", mode: "v", cur: "USD ", fin: 1, act: "Consultar / Test drive", cta: "Ver autos", nav: "Autos disponibles", tag: "Tu próximo auto, con financiación a tu medida",
        about: "En {n} te acompañamos en toda la compra: unidades seleccionadas y revisadas, tomamos tu usado como parte de pago y armamos un plan de financiación a tu medida.",
        stats: [["+400", "autos vendidos"], ["Garantía", "en todas las unidades"], ["Hasta 48", "cuotas"]],
        svc: [["Toyota Corolla XEi", "Automático, único dueño", 24500, "2021 · 38.000 km · Nafta", "🚘", "Sedán"], ["Volkswagen Amarok V6", "4x4 automática, service oficial", 52000, "2020 · 62.000 km · Diésel", "🛻", "Pickup"], ["Ford Ranger Limited", "Cuero, techo y cámara 360", 58000, "2022 · 21.000 km · Diésel", "🛻", "Pickup"], ["Jeep Renegade Sport", "Pantalla multimedia, cubiertas nuevas", 21000, "2019 · 54.000 km · Nafta", "🚙", "SUV"], ["Peugeot 208 Feline", "Techo panorámico, full", 17500, "2022 · 15.000 km · Nafta", "🚗", "Hatch"], ["Chevrolet Cruze LTZ", "Equipado, historial completo", 19800, "2018 · 71.000 km · Nafta", "🚘", "Sedán"]],
        gal: ["🚘", "🔑", "🛻", "🏁", "✅", "🚙"], hrs: "Lun a Vie 9 a 19 · Sáb 9 a 13 hs",
        rev: [["Ricardo", "Me tomaron el usado y salí con el auto en el día."], ["Julieta", "Transparentes con el estado y con la financiación."], ["Pablo", "Probé tres autos sin presión. Súper recomendable."]],
        faq: [["¿Toman mi usado?", "Sí, lo tasamos en el día y sin cargo."], ["¿Qué financiación tienen?", "Planes hasta 48 cuotas, con aprobación en el día."], ["¿Puedo hacer un test drive?", "Claro, coordinamos el horario que te quede cómodo."]]
    },
    inmobiliaria: {
        ft: "DM Serif Display", im: ["photo-1560518883-ce09059eeffa", "photo-1564013799919-ab600027ffc6", "photo-1512917774080-9991f1c4c750", "photo-1568605114967-8130f3a36994", "photo-1502672260266-1c1ef2d93688"], k: /inmobil|propiedad|alquiler|departament|casas en venta|bienes ra|desarrollista/, c1: "#1b3a34", c2: "#c9a227", ico: "🏡", mode: "v", cur: "USD ", act: "Coordinar visita", cta: "Ver propiedades", nav: "Propiedades", tag: "Encontrá el lugar donde querés vivir",
        about: "En {n} te acompañamos en la compra, venta y tasación de tu propiedad, con asesoramiento legal y atención personalizada de principio a fin.",
        stats: [["+250", "operaciones"], ["Tasación", "sin cargo"], ["10 años", "en la zona"]],
        svc: [["Casa con jardín y pileta", "3 dormitorios, quincho y cochera", 185000, "4 amb · 220 m² · Venta", "🏡", "Casas"], ["Departamento céntrico", "Balcón aterrazado, cochera y amenities", 98000, "3 amb · 68 m² · Venta", "🏢", "Departamentos"], ["Monoambiente a estrenar", "Ideal inversión, renta asegurada", 52000, "1 amb · 34 m² · Venta", "🏢", "Departamentos"], ["Casa de 2 plantas", "Barrio cerrado, 3 dormitorios", 142000, "5 amb · 160 m² · Venta", "🏠", "Casas"], ["Lote en esquina", "Escritura inmediata y servicios", 38000, "Terreno · 400 m² · Venta", "📐", "Terrenos"], ["Dúplex moderno", "Patio y parrilla, listo para mudarse", 120000, "4 amb · 110 m² · Venta", "🏘️", "Departamentos"]],
        gal: ["🏡", "🛋️", "🌳", "🔑", "🏢", "☀️"], hrs: "Lun a Vie 9 a 18 · Sáb 10 a 13 hs",
        rev: [["Marcela", "Vendimos en dos meses y nos asesoraron en todo."], ["Hernán", "Atención honesta, sin vueltas."], ["Dolores", "Encontramos nuestra casa gracias a ellos."]],
        faq: [["¿Hacen tasaciones?", "Sí, sin cargo y en menos de 48 hs."], ["¿Me acompañan con la escritura?", "Trabajamos con escribanos de confianza."]]
    },
    gimnasio: {
        ft: "Bebas Neue", im: ["photo-1534438327276-14e5300c3a48", "photo-1571019613454-1cb2f99b2d8b", "photo-1517836357463-d25dfeac3438", "photo-1540497077202-7c8a3999166f", "photo-1549060279-7e168fcee0c2"], k: /gimnas|\bgym\b|crossfit|fitness|pilates|yoga|entrenamiento|musculaci/, c1: "#0f172a", c2: "#22c55e", ico: "💪", mode: "m", cta: "Ver planes", nav: "Planes", tag: "Entrená a tu ritmo, con profes que te acompañan",
        about: "En {n} tenés sala de musculación, clases grupales y seguimiento personalizado. Empezá con una clase de prueba gratis.",
        stats: [["+600", "socios activos"], ["12", "clases por semana"], ["Prueba", "gratis"]],
        svc: [["Pase libre", "Acceso a sala y musculación", 28000, "/mes", "💪"], ["Pase + clases", "Sala y todas las clases grupales", 36000, "/mes", "🔥"], ["Plan trimestral", "3 meses con 15% off", 84000, "cada 3 meses", "⭐"], ["Clase de prueba", "Primera clase gratis, sin compromiso", 0, "", "🎟️"]],
        cls: [["Lun", "19:00", "Funcional"], ["Mar", "08:00", "Spinning"], ["Mié", "19:00", "Cross"], ["Jue", "20:00", "Yoga"], ["Vie", "18:00", "Funcional"], ["Sáb", "10:00", "Stretching"]],
        gal: ["🏋️", "🔥", "🧘", "🚴", "💪", "🥇"], hrs: "Lun a Vie 7 a 22 · Sáb 9 a 14 hs",
        rev: [["Agus", "Los profes se fijan en tu técnica, no te dejan solo."], ["Belén", "Las clases son un hit, siempre con ganas."], ["Ezequiel", "Bajé 8 kilos en 4 meses, gracias al equipo."]],
        faq: [["¿Hay clase de prueba?", "Sí, la primera es gratis y sin compromiso."], ["¿Puedo congelar el plan?", "Sí, hasta 30 días por viaje o lesión."]]
    },
    oficios: {
        ft: "Archivo", im: ["photo-1581244277943-fe4a9c777189", "photo-1621905251189-08b45d6a269e", "photo-1504328345606-18bbc8c9d7d1", "photo-1558618666-fcd25c85cd64", "photo-1503387762-592deb58ef4e"], k: /plomer|electric|gasista|construc|pintur|alba[ñn]il|herrer|carpint|cerraj|reforma|arquitec|mantenimiento|techista/, c1: "#1f2a44", c2: "#fb923c", ico: "🛠️", mode: "p", pre: "Desde ", act: "Pedir presupuesto", cta: "Pedir presupuesto", nav: "Trabajos que hacemos", tag: "Trabajos bien hechos, con presupuesto sin cargo",
        about: "En {n} resolvemos tu problema con puntualidad, materiales de calidad y garantía por escrito. Presupuesto sin compromiso.",
        stats: [["+800", "trabajos"], ["Garantía", "por escrito"], ["24 hs", "para presupuestar"]],
        svc: [["Reparaciones y urgencias", "Respuesta en el día", 15000, "", "🚨"], ["Instalaciones nuevas", "Cañerías, eléctrica y gas", 35000, "", "🔌"], ["Reformas", "Baños, cocinas y ampliaciones", 0, "", "🏗️"], ["Mantenimiento", "Plan mensual para casas y comercios", 20000, "", "🧰"]],
        gal: ["🔧", "🏗️", "🔌", "🧰", "🚿", "✅"], hrs: "Lun a Sáb 8 a 19 hs",
        rev: [["Silvia", "Vinieron en el día y quedó impecable."], ["Roberto", "Presupuesto claro y cumplieron el plazo."], ["Gaby", "Prolijos, limpios y de confianza."]],
        faq: [["¿El presupuesto tiene costo?", "No, es gratis y sin compromiso."], ["¿Dan garantía?", "Sí, por escrito en todos los trabajos."]]
    },
    salud: {
        ft: "Nunito Sans", im: ["photo-1629909613654-28e377c37b09", "photo-1606811841689-23dfddce3e95", "photo-1576091160399-112ba8d25d1d", "photo-1579684385127-1ef15d508118", "photo-1584982751601-97dcc096659c"], k: /dentist|odont|consultorio|kinesi|psicolog|nutricion|veterin|m[eé]dic|cl[ií]nica|salud|fonoaud/, c1: "#0e5a6b", c2: "#5eead4", ico: "🩺", mode: "t", tag: "Tu salud, con atención cercana y profesional",
        about: "En {n} te atendemos con tiempo y calidez. Reservá tu turno online y recibí recordatorios para no olvidarte.",
        stats: [["+2.000", "pacientes"], ["Obras", "sociales"], ["Turnos", "online 24 hs"]],
        svc: [["Primera consulta", "Evaluación completa", 18000, 40], ["Control", "Seguimiento del tratamiento", 12000, 30], ["Tratamiento", "Según indicación profesional", 25000, 45], ["Urgencias", "Atención el mismo día", 30000, 30]],
        gal: ["🩺", "🦷", "💙", "🌿", "✅", "🏥"], hrs: "Lun a Vie 9 a 19 hs",
        rev: [["Inés", "Te explican todo con paciencia. Muy profesionales."], ["Julián", "Saqué turno online en un minuto."], ["Mirta", "Atención cálida y puntual."]],
        faq: [["¿Trabajan con obras sociales?", "Sí, consultanos por la tuya."], ["¿Cómo cancelo un turno?", "Con 24 hs de aviso, por WhatsApp o desde acá."]]
    },
    tienda: {
        ft: "Josefin Sans", im: ["photo-1441986300917-64674bd600d8", "photo-1445205170230-053b83016050", "photo-1523381210434-271e8be1f52b", "photo-1515886657613-9f3515b0c78f", "photo-1472851294608-062f824d29cc"], k: /tienda|ropa|indument|zapat|boutique|accesorios|jugueter|regal|librer|ferreter|bazar|decoraci/, c1: "#3b1d4a", c2: "#f472b6", ico: "🛍️", mode: "v", act: "Lo quiero", cta: "Ver productos", nav: "Productos", tag: "Lo que buscás, con envíos a todo el país",
        about: "En {n} elegimos cada producto con cariño. Consultá stock, talles y formas de pago y te respondemos al toque.",
        stats: [["+1.500", "pedidos enviados"], ["Envíos", "a todo el país"], ["Cambios", "sin vueltas"]],
        svc: [["Cartera de cuero", "Varios colores, cierre reforzado", 38000, "Stock disponible", "👜", "Carteras"], ["Aros y collares", "Acero quirúrgico, no se oxidan", 9500, "Set x3", "💍", "Accesorios"], ["Remera oversize", "Algodón premium, talles S a XL", 16000, "Nueva temporada", "👕", "Ropa"], ["Lentes de sol", "Protección UV400", 14000, "Varios modelos", "🕶️", "Accesorios"], ["Mochila urbana", "Impermeable, con lugar para notebook", 32000, "Stock limitado", "🎒", "Carteras"], ["Gorra bordada", "Ajustable, edición limitada", 8500, "Últimas unidades", "🧢", "Ropa"]],
        gal: ["🛍️", "👜", "✨", "👗", "🕶️", "🎁"], hrs: "Lun a Sáb 10 a 20 hs",
        rev: [["Flor", "Llegó rapidísimo y es igual a las fotos."], ["Nacho", "Me cambiaron el talle sin problemas."], ["Cami", "Hermosos productos y muy buena atención."]],
        faq: [["¿Hacen envíos?", "Sí, a todo el país por correo o moto."], ["¿Puedo cambiar un producto?", "Sí, dentro de los 30 días."]]
    },
    barberia: {
        ft: "Oswald", im: ["photo-1585747860715-2ba37e788b70", "photo-1503951914875-452162b0f3f1", "photo-1621605815971-fbc98d665033", "photo-1599351431202-1e0f0137899a", "photo-1605497788044-5a32c7078486"], k: /barber|peluq|corte|barba/, c1: "#161b26", c2: "#d4a017", ico: "💈", mode: "t", tag: "Cortes con estilo, atención con turno",
        about: "En {n} nos tomamos en serio tu imagen. Ambiente cómodo, barberos que escuchan lo que querés y turnos que se respetan.",
        stats: [["+1.200", "clientes felices"], ["8 años", "de experiencia"], ["4.9 ★", "en Google"]],
        svc: [["Corte clásico", "Tijera o máquina, con lavado y peinado", 8000, 40], ["Corte + barba", "El combo completo con toalla caliente", 12000, 60], ["Perfilado de barba", "Prolijo, con navaja y aceites", 5000, 25], ["Corte infantil", "Para los más chicos, sin llantos", 6500, 30]],
        gal: ["✂️", "🪒", "💈", "🧔", "✨", "🔥"], hrs: "Lun a Sáb de 10 a 20 hs",
        rev: [["Mateo R.", "El mejor corte que me hicieron en años. Puntuales y re prolijos."], ["Nico P.", "Ambiente de primera y te escuchan lo que querés."], ["Fede L.", "Reservo desde el celu y listo, sin esperar."]],
        faq: [["¿Hace falta turno?", "Podés reservar acá en 30 segundos. Si hay lugar, también atendemos sin turno."], ["¿Puedo cancelar?", "Sí, avisanos por WhatsApp con 2 horas de anticipación."]]
    },
    estetica: {
        ft: "Playfair Display", im: ["photo-1540555700478-4be289fbecef", "photo-1544161515-4ab6ce6db874", "photo-1604654894610-df63bc536371", "photo-1570172619644-dfd03ed5d881", "photo-1519823551278-64ac92734fb1"], k: /estet|uñas|unas|spa|masaj|depil|belleza|nail|cosmet/, c1: "#6d1b45", c2: "#f0a6ca", ico: "🌸", mode: "t", tag: "Tu momento de cuidado y relax",
        about: "En {n} cuidamos cada detalle: productos de calidad, profesionales matriculadas y un espacio pensado para desconectar.",
        stats: [["+900", "clientas"], ["6 años", "de trayectoria"], ["4.9 ★", "en Google"]],
        svc: [["Limpieza facial", "Hidratación profunda y piel renovada", 15000, 60], ["Manicuría semipermanente", "Diseños y colores a elección", 11000, 75], ["Masaje descontracturante", "Alivia la tensión y el estrés", 18000, 60], ["Depilación definitiva", "Sesión por zona", 14000, 30]],
        gal: ["💅", "🌸", "🧖‍♀️", "✨", "💆", "🌿"], hrs: "Lun a Vie 9 a 19 · Sáb 9 a 14 hs",
        rev: [["Camila", "Salí renovada, la atención es un 10."], ["Lu", "Súper prolijas y los productos son excelentes."], ["Vale", "Reservar es facilísimo, me encantó."]],
        faq: [["¿Cuánto dura cada sesión?", "Entre 30 y 75 minutos según el tratamiento."], ["¿Puedo reprogramar?", "Sí, con 24 hs de aviso sin costo."]]
    },
    taller: {
        ft: "Barlow Condensed", im: ["photo-1486262715619-67b85e0b08d3", "photo-1503376780353-7e6692767b70", "photo-1530046339160-ce3e530c7d2f", "photo-1625047509248-ec889cbff17f", "photo-1580273916550-e323be2ae537"], k: /taller|mecan|auto|gomer|moto|frenos|lubric/, c1: "#12306b", c2: "#f59e0b", ico: "🔧", mode: "t", tag: "Tu vehículo en manos de confianza",
        about: "En {n} diagnosticamos con equipos modernos y te explicamos todo antes de tocar el auto. Presupuesto claro, sin sorpresas.",
        stats: [["+3.000", "autos atendidos"], ["15 años", "de experiencia"], ["Garantía", "por escrito"]],
        svc: [["Service completo", "Aceite, filtros y revisión de 30 puntos", 65000, 120], ["Frenos", "Pastillas, discos y control", 40000, 90], ["Suspensión", "Amortiguadores y tren delantero", 55000, 150], ["Diagnóstico computarizado", "Escáner e informe por escrito", 15000, 45]],
        gal: ["🔧", "🚗", "🛞", "⚙️", "🔩", "🛠️"], hrs: "Lun a Vie 8 a 18 · Sáb 8 a 13 hs",
        rev: [["Carlos", "Me explicaron todo y no me cobraron de más."], ["Sergio", "Entrega en el día, como prometieron."], ["Marta", "Confianza total, ya llevé a toda la familia."]],
        faq: [["¿Dan presupuesto sin cargo?", "Sí, el presupuesto es gratis y sin compromiso."], ["¿Tienen garantía?", "Todos los trabajos tienen garantía por escrito."]]
    },
    gastro: {
        ft: "Lilita One", im: ["photo-1517248135467-4c7edcad34c4", "photo-1513104890138-7c749659a591", "photo-1504674900247-0877df9cc836", "photo-1555396273-367ea4eb4db5", "photo-1414235077428-338989a2e8c0"], k: /pizz|hot ?dog|burger|hamburg|comida|resto|café|cafe|panader|helad|parrilla|empanada|lomit|sushi|bar\b/, c1: "#8f1d1d", c2: "#fbbf24", ico: "🍽️", mode: "c", tag: "Hecho al momento, con muchas ganas",
        about: "En {n} cocinamos con ingredientes frescos todos los días. Pedí desde acá y te lo llevamos calentito.",
        stats: [["+5.000", "pedidos entregados"], ["30 min", "tiempo promedio"], ["4.8 ★", "en Google"]],
        svc: [["Plato estrella", "La especialidad de la casa", 9500, "⭐"], ["Combo para dos", "Dos principales y bebida", 17000, "🍽️"], ["Porción individual", "Ideal para el almuerzo", 6000, "😋"], ["Bebida", "Bien fría", 2500, "🥤"]],
        gal: ["🍽️", "🔥", "😋", "🥤", "🧀", "🌟"], hrs: "Todos los días de 19 a 00 hs",
        rev: [["Lau", "Todo riquísimo y llegó calentito."], ["Tomi", "Porciones abundantes, volvemos seguro."], ["Romi", "Pedir desde la web es súper fácil."]],
        faq: [["¿Hacen delivery?", "Sí, en toda la zona. El costo depende de la distancia."], ["¿Cuánto demora un pedido?", "Entre 30 y 45 minutos."]]
    },
    otro: {
        ft: "Poppins", im: ["photo-1497366216548-37526070297c", "photo-1556761175-5973dc0f32e7", "photo-1521737604893-d14cc237f11d", "photo-1542744173-8e7e53415bb0", "photo-1553877522-43269d4ea984"], k: /./, c1: "#0f5e57", c2: "#f59e0b", ico: "⭐", mode: "t", tag: "Atención de confianza y cerca tuyo",
        about: "En {n} trabajamos para resolverte lo que necesitás, con trato cercano y profesionalismo.",
        stats: [["+500", "clientes"], ["5 años", "de experiencia"], ["4.9 ★", "de valoración"]],
        svc: [["Servicio principal", "Lo que mejor hacemos", 10000, 45], ["Consulta inicial", "Sin compromiso", 0, 20], ["Plan a medida", "Lo adaptamos a vos", 20000, 60], ["Seguimiento", "Acompañamiento continuo", 7000, 30]],
        gal: ["⭐", "🤝", "✨", "📌", "💡", "👍"], hrs: "Lun a Vie de 9 a 18 hs",
        rev: [["Ana", "Excelente atención, resolvieron todo rápido."], ["Martín", "Muy profesionales y claros con los precios."], ["Sofi", "Reservar desde la web es una comodidad."]],
        faq: [["¿Cómo reservo?", "Desde esta misma página, en menos de un minuto."], ["¿Dónde están?", "Mirá la sección de ubicación más abajo."]]
    }
};
var M = {
    t: { n: "turnos", cta: "Reservar turno", nav: "Servicios", val: "facturación estimada" },
    c: { n: "pedidos", cta: "Hacer mi pedido", nav: "Menú", val: "facturación estimada" },
    v: { n: "consultas", cta: "Ver catálogo", nav: "Catálogo", val: "valor en consultas", act: "Consultar", ok: "Un asesor te contacta en menos de 1 hora.", sub: "Filtrá y elegí lo que te interesa.", ttl: "Consultá sin compromiso" },
    p: { n: "pedidos de presupuesto", cta: "Pedir presupuesto", nav: "Servicios", val: "trabajos potenciales", act: "Pedir presupuesto", ok: "Te enviamos el presupuesto sin cargo en 24 hs.", sub: "Contanos qué necesitás y te cotizamos.", ttl: "Pedí tu presupuesto sin cargo" },
    m: { n: "altas y consultas", cta: "Ver planes", nav: "Planes", val: "ingresos potenciales", act: "Quiero este plan", ok: "Te esperamos para tu primera clase de prueba, es gratis.", sub: "Elegí tu plan y sumate hoy.", ttl: "Empezá hoy" }
};
function X(k) { return D.t[k] || M[D.t.mode][k]; }
var S, C, D, L = [];

function parse(txt) {
    var cm = txt.match(/\ben ([A-ZÁÉÍÓÚÑ][^,.]{1,28})/);
    var name = txt.split(/,| - | – |\.| en (?=[A-ZÁÉÍÓÚÑ])/)[0].trim().slice(0, 50);
    return { name: name, city: cm ? cm[1].trim() : "", all: txt };
}
function detect(t) { var l = t.toLowerCase(); for (var k in P) { if (k !== "otro" && P[k].k.test(l)) return k; } return "otro"; }

var R = [["barberia", "💈", "Barbería"], ["estetica", "🌸", "Estética y spa"], ["taller", "🔧", "Taller mecánico"], ["gastro", "🍽️", "Gastronomía"], ["concesionario", "🚘", "Concesionaria"], ["inmobiliaria", "🏡", "Inmobiliaria"], ["gimnasio", "💪", "Gimnasio"], ["oficios", "🛠️", "Oficios y obras"], ["salud", "🩺", "Salud"], ["tienda", "🛍️", "Tienda"], ["otro", "⭐", "Otro rubro"]];
var LB = { barberia: "Servicios", estetica: "Servicios", taller: "Servicios", gastro: "Platos del menú", concesionario: "Autos en venta", inmobiliaria: "Propiedades", gimnasio: "Planes", oficios: "Trabajos", salud: "Servicios", tienda: "Productos", otro: "Servicios" };
var COL = [["Automático", 0, 0], ["Azul", "#1e3a8a", "#38bdf8"], ["Verde", "#14532d", "#4ade80"], ["Rojo", "#7f1d1d", "#fb7185"], ["Violeta", "#4c1d95", "#c084fc"], ["Negro y dorado", "#111111", "#d4a017"]];
var FNT = [["Automática", ""], ["Moderna", "Poppins"], ["Elegante", "Playfair Display"], ["Fuerte", "Oswald"]];
var F, st = 0;
function resetF() { F = { name: "", rubro: null, pick: false, city: "", desc: "", phone: "", addr: "", hrs: "", ig: "", items: [{ n: "", p: "", d: "" }, { n: "", p: "", d: "" }, { n: "", p: "", d: "" }], cur: "", col: 0, font: 0, logo: "", cover: "" }; st = 0; }
resetF();
function waNum(s) { var d = String(s).replace(/\D/g, ""); if (d.indexOf("0") === 0) d = d.slice(1); if (d.length === 10) d = "549" + d; return d; }
function markRb() { [].forEach.call(document.querySelectorAll("#wz .rb button"), function (b) { b.classList.toggle("sel", b.dataset.v === F.rubro); }); }
function fld(l, id, v, ph, hint, ml) { return '<label for="' + id + '">' + l + '</label><input id="' + id + '" data-f="' + id.slice(2) + '" maxlength="' + (ml || 60) + '" placeholder="' + esc(ph) + '" value="' + esc(v) + '" autocomplete="off">' + (hint ? '<div class="hint">' + hint + "</div>" : ""); }
function wz() {
    var h = "", b = P[F.rubro || "otro"];
    $("wn").textContent = "Paso " + (st + 1) + " de 4";
    $("stp").innerHTML = [0, 1, 2, 3].map(function (i) { return '<i class="' + (i <= st ? "on" : "") + '"></i>'; }).join("");
    $("prev").classList.toggle("hide", st === 0);
    $("go").textContent = st === 3 ? "Generar mi web PRO ahora" : "Siguiente";
    $("wt").textContent = ["Tu negocio", "Contacto y ubicación", F.rubro ? LB[F.rubro] : "Tu catálogo", "Estilo y marca"][st];
    if (st === 0) {
        h = fld("Nombre del negocio *", "f_name", F.name, "Ej: Barbería Lo de Juan", "", 50) + "<label>¿A qué se dedica? *</label>" +
            '<div class="rb">' + R.map(function (r) { return '<button data-w="rb" data-v="' + r[0] + '" class="' + (F.rubro === r[0] ? "sel" : "") + '"><b>' + r[1] + "</b>" + r[2] + "</button>"; }).join("") + "</div>" +
            fld("Ciudad o zona", "f_city", F.city, "Ej: Merlo, Buenos Aires", "", 30) +
            '<label for="f_desc">Contanos en 1 o 2 líneas qué hacen (opcional)</label><textarea id="f_desc" data-f="desc" rows="3" maxlength="260" placeholder="Ej: Somos una barbería con más de 8 años en el barrio. Atendemos con turno.">' + esc(F.desc) + "</textarea>";
    } else if (st === 1) {
        h = fld("WhatsApp del negocio *", "f_phone", F.phone, "11 2345 6789", "Con código de área, sin 0 ni 15. Ahí te van a escribir tus clientes.", 20) +
            fld("Dirección", "f_addr", F.addr, "Ej: Av. Unión 1223", "", 60) + fld("Horarios de atención", "f_hrs", F.hrs, "Lun a Sáb de 10 a 20 hs", "Si lo dejás vacío usamos un horario de ejemplo.", 60) + fld("Instagram (opcional)", "f_ig", F.ig, "@tunegocio", "", 31);
    } else if (st === 2) {
        h = "<label>" + LB[F.rubro || "otro"] + " (hasta 8)</label>" + F.items.map(function (r, i) {
            var bs = b.svc[i % b.svc.length];
            return '<div class="rw"><input data-i="' + i + '" data-p="n" maxlength="40" placeholder="Ej: ' + esc(bs[0]) + '" value="' + esc(r.n) + '"><input data-i="' + i + '" data-p="p" inputmode="numeric" maxlength="10" placeholder="Precio ' + (bs[2] || "") + '" value="' + esc(r.p) + '"><input class="dd" data-i="' + i + '" data-p="d" maxlength="60" placeholder="Detalle (ej: ' + esc(b.mode === "v" ? bs[3] : bs[1]) + ')" value="' + esc(r.d) + '"></div>';
        }).join("") + '<button class="mini" data-w="addr">＋ Agregar otro</button> <button class="mini" data-w="ex">Usar ejemplos del rubro</button>' +
            '<label for="f_cur">Moneda</label><select id="f_cur" data-f="cur"><option value="">Según el rubro</option><option value="$"' + (F.cur === "$" ? " selected" : "") + '>Pesos ($)</option><option value="USD "' + (F.cur === "USD " ? " selected" : "") + '>Dólares (USD)</option></select><div class="hint">Si no cargás nada, armamos la demo con ejemplos del rubro.</div>';
    } else {
        var n = F.items.filter(function (r) { return r.n.trim(); }).length;
        h = '<label>Colores</label><div class="sw">' + COL.map(function (c, i) { return '<button data-w="col" data-v="' + i + '" class="' + (i === F.col ? "sel" : "") + (i ? "" : " auto") + '" title="' + c[0] + '" style="' + (i ? "background:linear-gradient(135deg," + c[1] + "," + c[2] + ")" : "") + '">' + (i ? "" : "Automático") + "</button>"; }).join("") + "</div>" +
            '<label>Tipografía</label><div class="ch">' + FNT.map(function (f, i) { return '<button class="chip' + (i === F.font ? " sel" : "") + '" data-w="font" data-v="' + i + '">' + f[0] + "</button>"; }).join("") + "</div>" +
            '<label>Logo y portada (opcional)</label><label class="fl">📷 Subir logo<input type="file" accept="image/*" data-u="logo" hidden></label><span class="hint" id="st_logo">' + (F.logo ? "✓ Logo cargado" : "") + '</span><br><label class="fl" style="margin-top:8px">🖼️ Subir foto de portada<input type="file" accept="image/*" data-u="cover" hidden></label><span class="hint" id="st_cover">' + (F.cover ? "✓ Portada cargada" : "") + "</span>" +
            '<div class="hint" style="margin-top:14px">Se va a crear la demo de <b>' + esc(F.name || "tu negocio") + "</b> (" + esc((R.filter(function (r) { return r[0] === F.rubro; })[0] || ["", "", "otro rubro"])[2]) + ") con " + (n ? n + " ítem(s) tuyos" : "ejemplos del rubro") + ".</div>";
    }
    $("wz").innerHTML = h;
    $("step1").parentNode.scrollTop = 0;
}
function check(s) {
    if (s === 0) { if (F.name.trim().length < 2) return "Escribí el nombre de tu negocio."; if (!F.rubro) return "Elegí a qué se dedica tu negocio."; }
    if (s === 1 && waNum(F.phone).length < 10) return "Ingresá un WhatsApp válido, con código de área.";
    return "";
}
function readImg(file, max, type, cb) {
    var r = new FileReader();
    r.onload = function () { var im = new Image(); im.onload = function () { var k = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); cb(c.toDataURL(type, 0.82)); }; im.src = r.result; };
    r.readAsDataURL(file);
}
function openM() { resetF(); $("err").textContent = ""; $("overlay").classList.add("on"); $("step1").classList.remove("hide"); $("step2").classList.add("hide"); wz(); setTimeout(function () { var i = $("f_name"); if (i && i.focus) i.focus(); }, 50); }
[].forEach.call(document.querySelectorAll("[data-open]"), function (b) { b.onclick = openM; });
$("cancel").onclick = function () { $("overlay").classList.remove("on"); };
$("prev").onclick = function () { if (st > 0) { st--; $("err").textContent = ""; wz(); } };
$("go").onclick = function () {
    var e = check(st); $("err").textContent = e; if (e) return;
    if (st < 3) { st++; wz(); } else generate();
};
$("wz").onkeydown = function (e) { if (e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "file") { e.preventDefault(); $("go").click(); } };
$("wz").oninput = function (e) {
    var t = e.target, f = t.dataset.f, p = t.dataset.p;
    if (f) { F[f] = t.value; if ((f === "name" || f === "desc") && !F.pick) { var k = detect(F.name + " " + F.desc); if (k !== "otro") { F.rubro = k; markRb(); } } }
    else if (p) { F.items[+t.dataset.i][p] = t.value; }
};
$("wz").onclick = function (e) {
    var b = e.target.closest("[data-w]"); if (!b) return; var w = b.dataset.w, v = b.dataset.v;
    if (w === "rb") { F.rubro = v; F.pick = true; markRb(); }
    else if (w === "col") { F.col = +v; wz(); } else if (w === "font") { F.font = +v; wz(); }
    else if (w === "addr") { if (F.items.length < 8) { F.items.push({ n: "", p: "", d: "" }); wz(); } }
    else if (w === "ex") { var bs = P[F.rubro || "otro"]; F.items = bs.svc.slice(0, 4).map(function (s) { return { n: s[0], p: String(s[2] || ""), d: (bs.mode === "v" ? s[3] : s[1]) || "" }; }); wz(); }
};
$("wz").onchange = function (e) {
    var t = e.target, u = t.dataset.u; if (!u || !t.files || !t.files[0]) return;
    var f = t.files[0]; if (!/^image\//.test(f.type)) { $("err").textContent = "Subí una imagen (JPG o PNG)."; return; }
    readImg(f, u === "logo" ? 256 : 1400, u === "logo" ? "image/png" : "image/jpeg", function (data) { F[u] = data; $("st_" + u).textContent = "✓ Cargado: " + f.name.slice(0, 24); $("err").textContent = ""; });
};

function generate() {
    var key = F.rubro || "otro";
    var d = { name: F.name.trim().slice(0, 50), city: F.city.trim().slice(0, 30), desc: F.desc.trim().slice(0, 260), phone: waNum(F.phone), addr: F.addr.trim().slice(0, 60), hrs: F.hrs.trim().slice(0, 60), ig: F.ig.replace(/[^A-Za-z0-9._]/g, "").slice(0, 30), items: F.items, cur: F.cur, col: F.col, font: F.font, logo: F.logo, cover: F.cover };
    $("step1").classList.add("hide"); $("step2").classList.remove("hide");
    var lb = ["Creando " + slug(d.name) + ".demo.tusistema.com", "Cargando la plantilla de " + R.filter(function (r) { return r[0] === key; })[0][2].toLowerCase(), "Escribiendo tus textos con IA", "Cargando tus " + LB[key].toLowerCase(), "Armando galería, reseñas y panel del dueño"];
    var ul = $("steps"), i = 0;
    ul.innerHTML = lb.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("");
    (function tick() {
        if (i > 0) ul.children[i - 1].className = "done";
        $("barfill").style.width = (i / lb.length * 100) + "%";
        if (i < lb.length) { ul.children[i].className = "now"; i++; setTimeout(tick, 750); }
        else { $("barfill").style.width = "100%"; setTimeout(function () { $("overlay").classList.remove("on"); render(d, key); }, 450); }
    })();
}
function custom(d, key) {
    var b = P[key], t = Object.assign({}, b), m = b.mode;
    var rows = (d.items || []).filter(function (r) { return r.n.trim(); });
    if (rows.length) t.svc = rows.map(function (r, i) {
        var q = b.svc[i % b.svc.length], p = parseInt(String(r.p).replace(/\D/g, ""), 10) || 0, n = r.n.trim().slice(0, 40), dt = r.d.trim();
        if (m === "v") return [n, dt, p, "", q[4], "Disponibles"];
        return [n, dt, p, q[3], q[4]];
    });
    if (d.cur) t.cur = d.cur;
    if (d.col > 0) { t.c1 = COL[d.col][1]; t.c2 = COL[d.col][2]; }
    if (d.font > 0) t.ft = FNT[d.font][1];
    if (d.hrs) t.hrs = d.hrs;
    if (d.desc) t.about = esc(d.desc);
    return t;
}

function slug(s) { return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30) || "demo"; }

function bkw() {
    var t = D.t, h;
    if (S.ok) return '<div class="ok"><div style="font-size:44px">✅</div><h4>¡Listo, ' + esc(S.ok.w) + '! Turno confirmado</h4><p>' + esc(S.ok.a) + ' · ' + esc(S.ok.t) + '</p><p style="color:var(--mut);font-size:14px">Al dueño le llegó el aviso al panel y a vos te llega un recordatorio.</p><button data-k="again">Reservar otro</button> <button data-k="adm">Ver panel del dueño</button></div>';
    h = '<div class="lbl">1. Elegí el servicio</div><div class="ch">' + t.svc.map(function (s, i) { return '<button class="chip' + (i === S.s ? " sel" : "") + '" data-k="s" data-v="' + i + '">' + esc(s[0]) + " · " + money(s[2]) + "</button>"; }).join("") + "</div>";
    h += '<div class="lbl">2. Elegí el día</div><div class="ch">' + D.days.map(function (x, i) { return '<button class="chip' + (i === S.d ? " sel" : "") + '" data-k="d" data-v="' + i + '">' + x.l + "</button>"; }).join("") + "</div>";
    h += '<div class="lbl">3. Elegí el horario</div><div class="ch">' + H.map(function (x, i) { var tk = hs(D.d.name + S.d + x) % 4 === 0; return '<button class="chip' + (i === S.h ? " sel" : "") + '" data-k="h" data-v="' + i + '"' + (tk ? " disabled" : "") + ">" + x + "</button>"; }).join("") + "</div>";
    h += '<div class="lbl">4. Tus datos</div><div class="two"><input id="fn" placeholder="Tu nombre" maxlength="40" value="' + esc(S.nm) + '"><input id="ft" placeholder="Tu teléfono" maxlength="20" value="' + esc(S.tl) + '"></div><p style="margin:16px 0 0"><button class="btn-pro" data-k="go" style="width:100%">Confirmar turno</button></p>';
    return h;
}
function ctw() {
    var t = D.t, tot = 0, n = 0, h = "";
    t.svc.forEach(function (s, i) { var q = C[i] || 0; tot += q * s[2]; n += q; });
    h = '<div class="cards">' + t.svc.map(function (s, i) {
        var q = C[i] || 0;
        return '<div class="card"><div style="font-size:30px">' + s[3] + "</div><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + '</span><div class="pr">' + money(s[2]) + '</div><div class="qty"><button data-k="sub" data-v="' + i + '">−</button><b>' + q + '</b><button data-k="add" data-v="' + i + '">+</button></div></div>';
    }).join("") + "</div>";
    if (S.ok) return '<div class="box ok"><div style="font-size:44px">✅</div><h4>¡Pedido recibido!</h4><p>' + esc(S.ok.a) + '</p><p style="color:var(--mut);font-size:14px">Le llegó al local y al panel del dueño.</p><button data-k="again">Hacer otro pedido</button></div>';
    return h + '<div class="box" style="margin-top:14px"><b>Tu pedido: ' + n + " ítem(s) · " + money(tot) + '</b><div class="two" style="margin-top:10px"><input id="fn" placeholder="Tu nombre" maxlength="40" value="' + esc(S.nm) + '"><input id="ft" placeholder="Dirección o teléfono" maxlength="40" value="' + esc(S.tl) + '"></div><p style="margin:12px 0 0"><button class="btn-pro" data-k="order" style="width:100%">Enviar pedido</button></p></div>';
}
function adw() {
    var tot = L.reduce(function (a, x) { return a + x.m; }, 0), mm = M[D.t.mode];
    $("apb").innerHTML = '<div class="kp"><div><b>' + L.length + "</b><span>" + mm.n + " de hoy</span></div><div><b>" + money(tot) + "</b><span>" + mm.val + "</span></div></div>" +
        L.map(function (x) { return '<div class="it"><b>' + esc(x.w) + "</b> · " + esc(x.a) + "<span>" + esc(x.t) + " · " + money(x.m) + "</span></div>"; }).join("");
}
function refresh() {
    var m = D.t.mode;
    if (m === "c") $("ctw").innerHTML = ctw();
    else { $("bkw").innerHTML = m === "t" ? bkw() : lfw(); if ($("cat")) $("cat").innerHTML = cat(); }
    adw();
}
function cat() {
    var t = D.t, m = t.mode, h = "", cs = [];
    if (m === "v") {
        t.svc.forEach(function (s) { if (cs.indexOf(s[5]) < 0) cs.push(s[5]); });
        if (cs.length > 1) h += '<div class="ch">' + ["Todos"].concat(cs).map(function (c) { return '<button class="chip' + (S.f === c ? " sel" : "") + '" data-k="f" data-v="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + "</div>";
    }
    h += '<div class="cards">' + t.svc.map(function (s, i) {
        if (m === "v" && S.f !== "Todos" && s[5] !== S.f) return "";
        var im = m === "v" ? '<div class="ci"><span>' + s[4] + '</span><img loading="lazy" alt="" src="' + U(t.im[1 + i % (t.im.length - 1)]) + '" onerror="this.remove()"></div><small class="tg">' + esc(s[5]) + "</small>" : '<div style="font-size:30px">' + s[4] + "</div>";
        return '<div class="card">' + im + "<b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span>" + (m === "v" && s[3] ? "<small>" + esc(s[3]) + "</small>" : "") +
            '<div class="pr">' + (t.pre || "") + (s[2] ? money(s[2]) : (m === "p" ? "A cotizar" : "Gratis")) + (m === "m" && s[3] ? ' <small style="font-weight:400;color:var(--mut)">' + esc(s[3]) + "</small>" : "") +
            '</div><button class="' + (S.i === i ? "btn-pro" : "") + '" data-k="ask" data-v="' + i + '">' + X("act") + "</button></div>";
    }).join("") + "</div>";
    if (t.cls) h += '<h3 style="margin:28px 0 12px;font-size:20px">Grilla semanal de clases</h3><div class="cards">' + t.cls.map(function (c) { return '<div class="card"><b>' + c[0] + " " + c[1] + " hs</b><span>" + esc(c[2]) + "</span></div>"; }).join("") + "</div>";
    return h;
}
function lfw() {
    var t = D.t, m = t.mode, s = t.svc[S.i], h = "", mo = [12, 24, 36, 48];
    if (S.ok) return '<div class="ok"><div style="font-size:44px">✅</div><h4>¡Listo, ' + esc(S.ok.w) + "!</h4><p>" + esc(S.ok.a) + '</p><p style="color:var(--mut);font-size:14px">' + X("ok") + '</p><button data-k="again">Hacer otra consulta</button> <button data-k="adm">Ver panel del dueño</button></div>';
    if (m === "p") h += '<div class="lbl">1. ¿Qué necesitás?</div><div class="ch">' + t.svc.map(function (x, i) { return '<button class="chip' + (i === S.i ? " sel" : "") + '" data-k="pick" data-v="' + i + '">' + esc(x[0]) + "</button>"; }).join("") + "</div>";
    else h += '<div class="lbl">Tu consulta</div><div class="chip sel" style="display:inline-block;margin-bottom:6px">' + esc(s[0]) + (s[2] ? " · " + money(s[2]) : "") + "</div>";
    if (t.fin && s[2]) {
        var cu = Math.round(s[2] * 0.7 * (1 + 0.1 * mo[S.cu] / 12) / mo[S.cu]);
        h += '<div class="lbl">Simulá tu cuota (anticipo 30%)</div><div class="ch">' + mo.map(function (x, i) { return '<button class="chip' + (i === S.cu ? " sel" : "") + '" data-k="cu" data-v="' + i + '">' + x + " cuotas</button>"; }).join("") + '</div><p class="fnote">≈ <b>' + money(cu) + "</b> por mes · valor orientativo, sin compromiso.</p>";
    }
    h += '<div class="lbl">' + (m === "p" ? "2. " : "") + 'Tus datos</div><div class="two"><input id="fn" placeholder="Tu nombre" maxlength="40" value="' + esc(S.nm) + '"><input id="ft" placeholder="Tu teléfono" maxlength="20" value="' + esc(S.tl) + '"></div><input id="fm" style="margin-top:10px" placeholder="' + (m === "p" ? "Zona y breve descripción del trabajo" : "Mensaje (opcional)") + '" maxlength="120" value="' + esc(S.ms) + '"><p style="margin:16px 0 0"><button class="btn-pro" data-k="lead" style="width:100%">' + X("act") + "</button></p>";
    return h;
}

function render(d, key) {
    var t = custom(d, key), m = t.mode, mm = M[m], n = esc(d.name), c = esc(d.city || "tu zona"), f = function (s) { return s.replace(/\{n\}/g, n); };
    var ini = d.name.split(/\s+/).slice(0, 2).map(function (w) { return w[0] || ""; }).join("").toUpperCase();
    var dn = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"], days = [], i, now = new Date();
    for (i = 1; i <= 6; i++) { var x = new Date(now.getTime() + i * 864e5); days.push({ l: dn[x.getDay()] + " " + x.getDate() }); }
    CUR = t.cur || "$";
    D = { d: d, t: t, days: days }; S = { s: 0, d: 0, h: null, nm: "", tl: "", ms: "", ok: null, i: 0, cu: 1, f: "Todos" }; C = {};
    var hr = m === "t" ? "hoy 10:00" : m === "c" ? "ahora" : "consulta · hoy";
    L = ["Lucía G.", "Diego S.", "Paula M."].map(function (w, j) { var q = t.svc[j % t.svc.length]; return { w: w, a: q[0], t: hr, m: q[2] }; });
    var end = Date.now() + 48 * 3600 * 1000, el = $("demo"), main, anchor = (m === "t" || m === "p") ? "tn" : "sv";
    el.style.setProperty("--c1", t.c1); el.style.setProperty("--c2", t.c2);
    el.style.setProperty("--hero", "url(" + (d.cover && /^data:image\//.test(d.cover) ? '"' + d.cover + '"' : U(t.im[0])) + ")"); el.style.setProperty("--fh", "'" + t.ft + "',system-ui,sans-serif");
    if (!document.getElementById("gf-" + key)) { var lk = document.createElement("link"); lk.id = "gf-" + key; lk.rel = "stylesheet"; lk.href = "https://fonts.googleapis.com/css2?family=" + t.ft.replace(/ /g, "+") + "&display=swap"; document.head.appendChild(lk); }
    if (m === "c") main = '<section class="sec" id="sv"><h3>Menú y pedidos</h3><p>Armá tu pedido y envialo en un toque.</p><div id="ctw"></div></section>';
    else if (m === "t") main = '<section class="sec" id="sv"><h3>Servicios</h3><p>Precios claros, sin sorpresas.</p><div class="cards">' + t.svc.map(function (s) { return '<div class="card"><b>' + esc(s[0]) + "</b><span>" + esc(s[1]) + '</span><div class="pr">' + money(s[2]) + ' <small style="color:var(--mut);font-weight:400">· ' + s[3] + " min</small></div></div>"; }).join("") + '</div></section><section class="sec" id="tn"><h3>Sacá tu turno online</h3><p>Probalo: así reservan tus clientes, las 24 hs.</p><div class="box" id="bkw"></div></section>';
    else main = '<section class="sec" id="sv"><h3>' + X("nav") + "</h3><p>" + mm.sub + '</p><div id="cat"></div></section><section class="sec" id="tn"><h3>' + mm.ttl + '</h3><p>Probalo: así le llegan las consultas a tu negocio.</p><div class="box" id="bkw"></div></section>';
    el.innerHTML =
        '<div class="top"><div class="banner"><span><b>Estás viendo tu demo PRO.</b> Así te verían tus clientes. ¿La activamos en tu dominio?</span><a class="btn" href="#" onclick="return wa(\'PRO - ' + n.replace(/&#39;|&amp;|&quot;/g, "") + '\')">Hablar por WhatsApp</a></div>' +
        '<nav class="dn"><div class="lg"><i>' + (d.logo && /^data:image\//.test(d.logo) ? '<img alt="" src="' + d.logo + '">' : esc(ini)) + "</i>" + n + '</div><div class="nl"><a href="#sv">' + X("nav") + '</a><a href="#gl">Galería</a><a href="#rs">Reseñas</a><a href="#ub">Ubicación</a></div><button data-k="adm">Panel del dueño</button></nav></div>' +
        '<header class="dh"><div><small>' + t.ico + " " + c + "</small><h2>" + n + "</h2><p>" + esc(t.tag) + '</p><a class="b1" href="#' + anchor + '">' + X("cta") + "</a></div></header>" +
        '<div class="stats">' + t.stats.map(function (s) { return "<div><b>" + s[0] + "</b><span>" + s[1] + "</span></div>"; }).join("") + "</div>" +
        '<section class="sec"><p style="font-size:18px;color:var(--fg)">' + f(t.about) + "</p></section>" + main +
        '<section class="sec" id="gl"><h3>Galería</h3><p>Acá van las fotos reales de tu local.</p><div class="gal">' + t.gal.map(function (g, i) { var u = t.im[i + 1]; return "<div>" + g + (u ? '<img loading="lazy" alt="" src="' + U(u) + '" onerror="this.remove()">' : "") + "</div>"; }).join("") + "</div></section>" +
        '<section class="sec" id="rs"><h3>Lo que dicen nuestros clientes</h3><p></p><div class="cards">' + t.rev.map(function (r) { return '<div class="card rev"><div>★★★★★</div><em>“' + esc(r[1]) + "”</em><b>" + esc(r[0]) + "</b></div>"; }).join("") + "</div></section>" +
        '<section class="sec"><h3>Preguntas frecuentes</h3><p></p>' + t.faq.concat([FAQ_PAGO]).map(function (q) { return "<details><summary>" + q[0] + "</summary><p>" + q[1] + "</p></details>"; }).join("") + "</section>" +
        '<section class="sec" id="ub"><h3>Dónde encontrarnos</h3><p></p><div class="two"><div class="map">📍</div><div class="box"><b>' + n + "</b><p>" + (d.addr ? esc(d.addr) + ", " : "Av. Principal 123, ") + c + "<br>" + esc(t.hrs) + "</p>" + (d.ig ? '<p><a href="https://instagram.com/' + d.ig + '" target="_blank" rel="noopener" style="color:inherit">@' + d.ig + "</a></p>" : "") + '<button class="btn-pro" data-k="bwa">Escribirnos por WhatsApp</button>' + (d.addr ? ' <a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(d.addr + " " + (d.city || "")) + '">Cómo llegar</a>' : "") + '</div></div></section>' +
        '<div class="foot">Demo en <b>' + slug(d.name) + '.demo.tusistema.com</b> · vence en <span id="left"></span> · textos de ejemplo · fotos: Unsplash<br><a href="#" data-k="back" style="color:inherit">Crear otra demo</a></div>' +
        '<aside class="ap" id="ap"><h4>Panel del dueño <button data-k="close">✕</button></h4><div id="apb"></div></aside><a class="wf" href="https://wa.me/' + d.phone + '?text=' + encodeURIComponent("Hola! Vi la web de " + d.name) + '" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>';
    $("landing").classList.add("hide"); el.classList.remove("hide"); window.scrollTo(0, 0);
    refresh();
    if (/admin=1/.test(location.search)) $("ap").classList.add("on");
    setTimeout(function () { if (D && D.d === d) { L.unshift({ w: "Lucas M.", a: t.svc[0][0], t: m === "t" ? "hoy 18:00" : "ahora", m: t.svc[0][2] }); adw(); toast("🔔 Nueva entrada en el panel: Lucas M."); } }, 9000);
    (function cd() { var ms = end - Date.now(), l = $("left"); if (l) { l.textContent = Math.floor(ms / 36e5) + " h " + Math.floor(ms % 36e5 / 6e4) + " min"; setTimeout(cd, 30000); } })();
}

$("demo").onclick = function (e) {
    var b = e.target.closest("[data-k]"); if (!b) return;
    var k = b.dataset.k, sv = b.dataset.v, v = +sv, t = D.t;
    if (k === "s") { S.s = v; } else if (k === "d") { S.d = v; S.h = null; } else if (k === "h") { S.h = v; }
    else if (k === "add") { C[v] = (C[v] || 0) + 1; } else if (k === "sub") { C[v] = Math.max(0, (C[v] || 0) - 1); }
    else if (k === "f") { S.f = sv; } else if (k === "cu") { S.cu = v; } else if (k === "pick") { S.i = v; S.ok = null; }
    else if (k === "ask") { S.i = v; S.ok = null; refresh(); var q = $("tn"); if (q) q.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    else if (k === "adm") { $("ap").classList.add("on"); return; } else if (k === "close") { $("ap").classList.remove("on"); return; }
    else if (k === "bwa") { window.open("https://wa.me/" + D.d.phone + "?text=" + encodeURIComponent("Hola " + D.d.name + "! Quería hacer una consulta."), "_blank"); return; }
    else if (k === "toast") { toast("En tu web real, esto abre el WhatsApp de tu negocio."); return; }
    else if (k === "back") { e.preventDefault(); $("demo").classList.add("hide"); $("landing").classList.remove("hide"); resetF(); D = null; return; }
    else if (k === "again") { S.ok = null; S.h = null; }
    else if (k === "go") {
        if (S.h === null || S.nm.trim().length < 2) { toast("Elegí un horario y escribí tu nombre."); return; }
        var sv2 = t.svc[S.s]; S.ok = { w: S.nm.trim(), a: sv2[0], t: D.days[S.d].l + " · " + H[S.h] };
        L.unshift({ w: S.ok.w, a: sv2[0], t: S.ok.t, m: sv2[2] }); toast("Turno confirmado ✅");
    } else if (k === "lead") {
        if (S.nm.trim().length < 2 || S.tl.trim().length < 5) { toast("Completá tu nombre y teléfono."); return; }
        var it = t.svc[S.i]; S.ok = { w: S.nm.trim(), a: (t.mode === "p" ? "Pedido de presupuesto: " : "Consulta por ") + it[0] };
        L.unshift({ w: S.ok.w, a: it[0], t: "consulta" + (t.fin ? " · " + [12, 24, 36, 48][S.cu] + " cuotas" : " · ahora"), m: it[2] }); toast("Consulta enviada ✅");
    } else if (k === "order") {
        var tot = 0, txt = [];
        t.svc.forEach(function (s, i) { if (C[i]) { tot += C[i] * s[2]; txt.push(C[i] + "x " + s[0]); } });
        if (!txt.length || S.nm.trim().length < 2) { toast("Sumá algo al pedido y escribí tu nombre."); return; }
        S.ok = { w: S.nm.trim(), a: txt.join(", ") + " · " + money(tot) }; L.unshift({ w: S.ok.w, a: txt.join(", "), t: "ahora", m: tot }); C = {}; toast("Pedido enviado ✅");
    }
    refresh();
};
$("demo").oninput = function (e) { if (e.target.id === "fn") S.nm = e.target.value; if (e.target.id === "ft") S.tl = e.target.value; if (e.target.id === "fm") S.ms = e.target.value; };