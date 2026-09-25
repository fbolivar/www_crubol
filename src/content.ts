/**
 * Contenido del sitio de Crubol Technology S.A.S.
 * Todo el texto vive aquí, separado de los componentes: cambiar copia no
 * requiere tocar UI. Datos de empresa reales; no inventar clientes ni casos.
 *
 * TODO Fernando: completar los teléfonos marcados antes de publicar.
 */

// --------------------------------------------------------------------------
// Empresa
// --------------------------------------------------------------------------
export const empresa = {
  nombre: "CRUBOL TECHNOLOGY S.A.S.",
  nombreCorto: "Crubol",
  nit: "902107870-4",
  matricula: "4156504",
  camara: "Cámara de Comercio de Bogotá",
  dominio: "crubol.com.co",
  correo: "info@crubol.com",
  ciudad: "Bogotá",
  cobertura: "Cobertura en toda Colombia",
  frase: "Seguridad que habilita",
  telefono: "+57 300 406 9787",
  // TODO Fernando: dirección pública para el JSON-LD (o dejar solo ciudad/país).
  direccion: {
    calle: "Bogotá D.C.",
    ciudad: "Bogotá",
    region: "Cundinamarca",
    pais: "CO",
  },
} as const;

// --------------------------------------------------------------------------
// Opciones de "área de interés" (compartidas por el formulario de contacto y
// el widget de WhatsApp).
// --------------------------------------------------------------------------
export const opcionesInteres = [
  "No sé en qué estado está mi tecnología",
  "Tuvimos un incidente y no quiero repetirlo",
  "Tengo proveedor, pero no responde a tiempo",
  "Un cliente o auditoría me exige cumplimiento",
  "Quiero usar IA sin exponer mi información",
] as const;

// --------------------------------------------------------------------------
// WhatsApp — líneas de atención. Formato internacional sin '+', espacios ni
// guiones. Al contactar se elige una al azar para balancear la atención entre
// los socios. Para cambiar los números, edite solo este arreglo.
// --------------------------------------------------------------------------
export const whatsapp = {
  numeros: ["573004069787", "573219213134"],
} as const;

// Contenido del widget de WhatsApp (estilo chat).
export const whatsappForm = {
  titulo: "Crubol",
  estado: "En línea",
  saludo:
    "¡Hola! 👋 Déjenos sus datos y lo atendemos por WhatsApp en este momento.",
  campos: {
    nombre: "Nombre completo",
    correo: "Correo electrónico",
    telefono: "Número de WhatsApp",
    area: "Área de interés",
  },
  indicativo: "CO +57",
  placeholderArea: "— Área de interés —",
  opciones: opcionesInteres,
  enviar: "Contactar por WhatsApp",
  legalAntes: "Al continuar acepta nuestra",
  legalLink: "Política de Privacidad",
} as const;

// Asistente de chat (IA).
export const asistente = {
  titulo: "Asistente Crubol",
  subtitulo: "Le orientamos al instante",
  saludo:
    "¡Hola! 👋 Soy el asistente de Crubol. Cuénteme qué necesita para su empresa y lo oriento — o, si prefiere, déjeme sus datos y un asesor lo contacta.",
  placeholder: "Escriba su mensaje…",
  ctaDatos: "Dejar mis datos",
  sugerencias: [
    "¿Qué servicios ofrecen?",
    "¿Cómo trabajan?",
    "Modalidades de servicio",
    "¿Cómo protegen mi información?",
  ],
  error:
    "No pude responder en este momento. Intente de nuevo o déjeme sus datos y un asesor lo contacta.",
  aviso: "Asistente automático. Puede cometer errores; confirme lo importante con un asesor.",
} as const;

// --------------------------------------------------------------------------
// Navegación
// --------------------------------------------------------------------------
export const nav = {
  marca: "Crubol",
  enlaces: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Servicios", href: "#servicios" },
    { label: "Por qué", href: "#por-que" },
    { label: "Proceso", href: "#proceso" },
    { label: "Modalidades", href: "#modalidades" },
    { label: "Contacto", href: "#contacto" },
  ],
  cta: "Hablemos →",
} as const;

// --------------------------------------------------------------------------
// Hero
// --------------------------------------------------------------------------
export const hero = {
  eyebrow: "Soluciones de TI para su empresa",
  tituloAntes: "Tecnología que sostiene su operación,",
  tituloResaltado: "todos los días",
  parrafo:
    "Infraestructura, ciberseguridad e inteligencia artificial para empresas medianas en Colombia. Evaluamos con evidencia, corregimos por prioridad y nos quedamos vigilando.",
  ctaPrimario: "Diagnóstico gratis →",
  ctaSecundario: "Ver servicios",
  confianza: {
    avatares: ["EC", "FB"],
    texto: "ISO 27001:2022 · +25 años — Atención directa de los socios fundadores",
  },
  panel: {
    titulo: "Panel de operación",
    estado: "TODO OPERATIVO",
    kpis: [
      { valor: 42, sufijo: "", label: "Equipos protegidos" },
      { valor: 23, sufijo: "", label: "Amenazas bloqueadas" },
      { valor: 99.9, sufijo: "%", label: "Disponibilidad" },
    ],
    grafica: {
      titulo: "Incidentes evitados",
      subtitulo: "Últimos 8 meses · +68%",
      barras: [38, 46, 42, 55, 61, 58, 72, 84],
    },
    filas: [
      { label: "Copias verificadas", valor: "Al día" },
      { label: "Última restauración", valor: "4 min" },
      { label: "Reporte mensual", valor: "Enviado" },
    ],
  },
  tecnologias: [
    "FORTINET",
    "WAZUH SIEM",
    "MICROSOFT 365",
    "ACTIVE DIRECTORY",
    "ISO 27001",
    "SONICWALL",
    "SOPHOS",
    "PALO ALTO",
    "PFSENSE",
    "FORTISIEM",
    "BITDEFENDER",
    "KASPERSKY",
    "APPGATE",
    "VMWARE",
    "WINDOWS SERVER",
    "LINUX",
    "NIST CSF",
    "VELOCIRAPTOR",
    "PROXMOX",
  ],
} as const;

// --------------------------------------------------------------------------
// Nosotros
// --------------------------------------------------------------------------
export const nosotros = {
  eyebrow: "Quiénes somos",
  tarjeta: {
    titulo: "Una sociedad colombiana, no un intermediario",
    dato: `${empresa.nombre} · NIT ${empresa.nit} · Matrícula ${empresa.matricula}, ${empresa.camara}.`,
    sello: "+25 años de experiencia combinada",
  },
  tituloAntes: "Su operación tecnológica,",
  tituloResaltado: "bajo criterio experto",
  apertura:
    "La mayoría de las empresas medianas descubre el estado real de su tecnología el día que se detiene la operación. No por descuido: porque nadie tenía el tiempo ni el criterio para revisarla antes. Crubol existe para ocupar ese lugar.",
  puntos: [
    "Diagnóstico con evidencia, no con supuestos.",
    "Prioridades claras: primero lo que detiene la operación.",
    "Informes que se entienden en una junta directiva.",
    "Los mismos socios que diseñan son quienes responden.",
  ],
  cta: "Conversemos su caso →",
} as const;

// --------------------------------------------------------------------------
// Contadores
// --------------------------------------------------------------------------
export const contadores = [
  { valor: 25, prefijo: "+", sufijo: "", label: "Años de experiencia" },
  { valor: 1000, prefijo: "+", sufijo: "", label: "Equipos gestionados" },
  { valor: 4, prefijo: "", sufijo: "", label: "Frentes de servicio" },
  { valor: 15, prefijo: "", sufijo: "", label: "Días para el diagnóstico" },
] as const;

// --------------------------------------------------------------------------
// Servicios
// --------------------------------------------------------------------------
export const servicios = {
  eyebrow: "Qué hacemos",
  tituloAntes: "Cuatro frentes,",
  tituloResaltado: "un solo responsable",
  cta: "Solicitar diagnóstico →",
  items: [
    {
      numero: "01",
      titulo: "Infraestructura tecnológica",
      descripcion:
        "La base sobre la que corre su empresa, montada para no fallar y para recuperarse rápido cuando algo pasa.",
      items: [
        "Redes y servidores",
        "Virtualización",
        "Copias verificadas",
        "Soporte continuo",
      ],
    },
    {
      numero: "02",
      titulo: "Ciberseguridad gestionada",
      descripcion:
        "Protección que se opera todos los días, no un producto que se instala y se olvida.",
      items: [
        "Auditorías",
        "Protección de equipos",
        "Monitoreo",
        "Respuesta a incidentes",
      ],
    },
    {
      numero: "03",
      titulo: "Inteligencia artificial aplicada",
      descripcion:
        "IA útil para su negocio, sin exponer su información ni comprar promesas.",
      items: [
        "Diagnóstico de oportunidades",
        "Automatización",
        "Asistentes internos",
        "Capacitación",
      ],
    },
    {
      numero: "04",
      titulo: "Cumplimiento y buenas prácticas",
      descripcion:
        "El orden que exigen clientes y auditorías, traducido a pasos concretos.",
      items: [
        "Brecha ISO 27001",
        "Políticas",
        "Evidencia para auditoría",
        "Capacitación",
      ],
    },
  ],
} as const;

// --------------------------------------------------------------------------
// Por qué Crubol
// --------------------------------------------------------------------------
export const porque = {
  eyebrow: "Por qué Crubol",
  tituloAntes: "Sin humo, sin miedo,",
  tituloResaltado: "con evidencia",
  compromisos: [
    { label: "Hallazgos con evidencia", valor: 100 },
    { label: "Respuesta directa de los socios", valor: 100 },
    { label: "Informes claros para dirección", valor: 100 },
  ],
  socio: {
    nombre: "Fernando Bolívar",
    rol: "Socio fundador · Ciberseguridad",
    credencial: "Magíster y certificado ISO 27001:2022",
    iniciales: "FB",
  },
  filas: [
    {
      numero: "01",
      titulo: "Todo hallazgo, con evidencia",
      descripcion: "Nada de afirmaciones sin prueba. Cada punto se sustenta.",
    },
    {
      numero: "02",
      titulo: "Informes que se entienden en junta",
      descripcion: "Lo técnico traducido a decisiones y a impacto de negocio.",
    },
    {
      numero: "03",
      titulo: "Quien contesta es quien diseñó",
      descripcion: "Habla con los socios fundadores, no con una mesa de turno.",
    },
    {
      numero: "04",
      titulo: "Nunca vendemos miedo",
      descripcion: "Le decimos qué es urgente y qué puede esperar, sin alarmismo.",
    },
  ],
} as const;

// --------------------------------------------------------------------------
// Marquesina grande
// --------------------------------------------------------------------------
export const marquesinaGrande = [
  "INFRAESTRUCTURA",
  "CIBERSEGURIDAD",
  "INTELIGENCIA ARTIFICIAL",
  "CUMPLIMIENTO",
] as const;

// --------------------------------------------------------------------------
// Proceso
// --------------------------------------------------------------------------
export const proceso = {
  eyebrow: "Cómo trabajamos",
  tituloAntes: "De la incertidumbre",
  tituloResaltado: "al control",
  pasos: [
    {
      numero: "1",
      dia: "Día 0",
      titulo: "Escuchamos",
      descripcion: "Entendemos su operación, sus riesgos y qué lo tiene despierto.",
    },
    {
      numero: "2",
      dia: "Día 15",
      titulo: "Diagnosticamos",
      descripcion: "Revisamos con evidencia y priorizamos por impacto real.",
    },
    {
      numero: "3",
      dia: "Día 45",
      titulo: "Implementamos",
      descripcion: "Corregimos primero lo crítico, con un plan que usted aprueba.",
    },
    {
      numero: "4",
      dia: "Día 60",
      titulo: "Acompañamos",
      descripcion: "Nos quedamos vigilando y reportando mes a mes.",
    },
  ],
} as const;

// --------------------------------------------------------------------------
// Modalidades — sin precios en pesos
// --------------------------------------------------------------------------
export const modalidades = {
  eyebrow: "Cómo contratarnos",
  tituloAntes: "El alcance que",
  tituloResaltado: "su momento necesita",
  pestanas: [
    { id: "puntual", label: "Puntual" },
    { id: "continuo", label: "Continuo" },
  ],
  items: [
    {
      tipo: "puntual",
      titulo: "Diagnóstico puntual",
      formato: "Entrega en 15 días",
      descripcion: "Una foto clara del estado de su tecnología, con prioridades.",
      incluye: [
        "Revisión con evidencia",
        "Informe ejecutivo y técnico",
        "Plan priorizado",
        "Reunión de resultados",
      ],
      destacado: false,
    },
    {
      tipo: "puntual",
      titulo: "Llave en mano",
      formato: "Proyecto con alcance definido",
      descripcion: "Diseñamos, corregimos e implementamos de principio a fin.",
      incluye: [
        "Diagnóstico incluido",
        "Ejecución por prioridad",
        "Documentación y evidencia",
        "Cierre con capacitación",
      ],
      destacado: true,
      cinta: "Más solicitado",
    },
    {
      tipo: "continuo",
      titulo: "Vigilancia mensual",
      formato: "Acompañamiento continuo",
      descripcion: "Monitoreo, respuesta y reporte mes a mes, con los socios detrás.",
      incluye: [
        "Monitoreo continuo",
        "Respuesta a incidentes",
        "Reporte mensual",
        "Mejora priorizada",
      ],
      destacado: false,
    },
  ],
} as const;

// --------------------------------------------------------------------------
// Contacto
// --------------------------------------------------------------------------
export const contacto = {
  eyebrow: "Hablemos",
  tituloAntes: "Empecemos por",
  tituloResaltado: "un diagnóstico gratis",
  parrafo:
    "Cuéntenos en qué está su operación. Le respondemos los socios, sin intermediarios.",
  datos: [
    { label: "Correo", valor: empresa.correo, tipo: "email" as const },
    { label: "Cobertura", valor: `${empresa.ciudad} · ${empresa.cobertura}`, tipo: "texto" as const },
    { label: "WhatsApp", valor: "Comercial y soporte", tipo: "whatsapp" as const },
  ],
  form: {
    campos: {
      nombre: "Nombre",
      empresa: "Empresa",
      correo: "Correo",
      telefono: "Teléfono",
      necesidad: "¿Qué lo trae por aquí?",
      mensaje: "Cuéntenos brevemente",
    },
    opciones: opcionesInteres,
    enviar: "Solicitar diagnóstico gratis →",
    placeholderSelect: "Elija una opción",
  },
} as const;

// --------------------------------------------------------------------------
// Pie
// --------------------------------------------------------------------------
export const pie = {
  descripcion:
    "Servicios de TI y ciberseguridad para empresas medianas en Colombia. Seguridad que habilita.",
  columnas: [
    {
      titulo: "Servicios",
      enlaces: [
        { label: "Infraestructura", href: "#servicios" },
        { label: "Ciberseguridad", href: "#servicios" },
        { label: "Inteligencia artificial", href: "#servicios" },
        { label: "Cumplimiento", href: "#servicios" },
      ],
    },
    {
      titulo: "Empresa",
      enlaces: [
        { label: "Nosotros", href: "#nosotros" },
        { label: "Por qué Crubol", href: "#por-que" },
        { label: "Proceso", href: "#proceso" },
        { label: "Modalidades", href: "#modalidades" },
      ],
    },
  ],
  contacto: {
    titulo: "Contacto",
    correo: empresa.correo,
    ciudad: `${empresa.ciudad}, Colombia`,
  },
  legal: `${empresa.nombre} · NIT ${empresa.nit} · Matrícula ${empresa.matricula}, ${empresa.camara}.`,
} as const;

// --------------------------------------------------------------------------
// SEO
// --------------------------------------------------------------------------
export const seo = {
  title: "Crubol Technology · Soluciones de TI y ciberseguridad en Bogotá",
  description:
    "Infraestructura, ciberseguridad e inteligencia artificial para empresas medianas en Colombia. Evaluamos con evidencia, corregimos por prioridad y nos quedamos vigilando.",
  url: "https://crubol.com.co",
} as const;
