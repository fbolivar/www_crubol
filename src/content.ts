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
  portal: { label: "Portal cliente", href: "https://crubolos.crubol.com" },
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
  verDetalle: "Ver qué incluye →",
  idealLabel: "Ideal para",
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
      intro:
        "La base de todo: redes, servidores y equipos funcionando de forma estable, ordenada y lista para crecer con su operación.",
      detalles: [
        {
          titulo: "Diseño y modernización de redes",
          descripcion: "Redes cableadas e inalámbricas seguras, segmentadas y documentadas.",
        },
        {
          titulo: "Servidores y virtualización",
          descripcion: "Plataformas eficientes, con alta disponibilidad donde el negocio lo exige.",
        },
        {
          titulo: "Copias de seguridad verificadas",
          descripcion: "Respaldos que sí se prueban: su información recuperable cuando importa.",
        },
        {
          titulo: "Administración y soporte",
          descripcion: "Operación diaria de su plataforma con acuerdos de servicio claros.",
        },
      ],
      idealPara:
        "Empresas que crecieron más rápido que su tecnología y necesitan orden, estabilidad y capacidad de escalar.",
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
      intro:
        "Su información y la de sus clientes protegidas, con vigilancia permanente y respuesta cuando algo pasa.",
      detalles: [
        {
          titulo: "Diagnósticos y auditorías",
          descripcion: "Evaluamos firewalls, correo, nube y accesos; entregamos un plan priorizado.",
        },
        {
          titulo: "Protección de equipos y correo",
          descripcion: "Defensa moderna contra virus, secuestro de datos y correos fraudulentos.",
        },
        {
          titulo: "Monitoreo y respuesta",
          descripcion: "Vigilancia continua y actuación inmediata ante incidentes.",
        },
        {
          titulo: "Cumplimiento y buenas prácticas",
          descripcion: "Acompañamiento hacia ISO 27001 y políticas a su medida.",
        },
      ],
      idealPara:
        "Empresas que manejan información sensible de clientes o que ya sufrieron —o temen— un incidente.",
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
      intro:
        "Adopte IA con criterio y con la seguridad como base: automatice lo repetitivo y potencie a su equipo, sin poner en riesgo su información.",
      detalles: [
        {
          titulo: "Diagnóstico de oportunidades",
          descripcion: "Identificamos dónde la IA genera valor real en su operación — y dónde no.",
        },
        {
          titulo: "Automatización de procesos",
          descripcion: "Tareas repetitivas resueltas con IA: reportes, documentos, clasificación.",
        },
        {
          titulo: "Asistentes a la medida",
          descripcion: "Herramientas entrenadas en el contexto y los documentos de su empresa.",
        },
        {
          titulo: "Capacitación práctica",
          descripcion: "Su equipo usando IA de forma productiva y segura desde la primera semana.",
        },
      ],
      idealPara:
        "Empresas que quieren aprovechar la IA pero no saben por dónde empezar ni cómo hacerlo sin exponer su información.",
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
      intro:
        "Traducimos la norma a pasos concretos que su equipo puede sostener, con evidencia lista para clientes y auditores.",
      detalles: [
        {
          titulo: "Análisis de brecha ISO 27001",
          descripcion: "Dónde está hoy frente a la norma y qué falta para cerrar la brecha.",
        },
        {
          titulo: "Políticas a la medida",
          descripcion: "Políticas y procedimientos claros, aplicables a su operación real.",
        },
        {
          titulo: "Evidencia para auditoría",
          descripcion: "Documentación y registros listos para responder a clientes o auditores.",
        },
        {
          titulo: "Capacitación",
          descripcion: "Su equipo entiende y sostiene las buenas prácticas en el día a día.",
        },
      ],
      idealPara:
        "Empresas a las que un cliente o una auditoría les exige demostrar cumplimiento.",
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
// Diagnóstico de dominio (CTA de captura)
// --------------------------------------------------------------------------
export const diagnostico = {
  eyebrow: "Diagnóstico de dominio · Gratis",
  tituloAntes: "¿Su infraestructura es",
  tituloResaltado: "segura?",
  parrafo:
    "Ingrese su dominio y obtenga una evaluación completamente gratuita. Revisamos su exposición en internet y le decimos, con evidencia, qué conviene corregir primero.",
  placeholder: "su-dominio.com",
  cta: "Solicitar evaluación →",
  nota: "Gratis y sin compromiso. Le respondemos los socios.",
  errorDominio: "Ingrese un dominio válido (por ejemplo, empresa.com).",
  linkFooter: "Diagnóstico Infraestructura",
} as const;

// Página de resultados del diagnóstico (pestaña nueva).
export const diagnosticoResultado = {
  eyebrow: "Diagnóstico de dominio · Gratis",
  cargando: {
    mensajes: [
      "Conectando con el dominio…",
      "Revisando cabeceras de seguridad…",
      "Verificando el certificado SSL/TLS…",
      "Analizando SEO y metadatos…",
      "Calculando su puntaje…",
    ],
    nota: "Analizando seguridad, SSL y SEO. No cierre esta ventana.",
  },
  labelSeguridad: "Seguridad",
  labelWeb: "Web / SEO",
  de100: "de 100",
  resultadoDe: "Resultado de",
  parcialNota:
    "Este es un análisis parcial y automático. El escaneo profundo de puertos, vulnerabilidades y superficie de exposición lo realizan los socios de forma manual y con su autorización.",
  form: {
    titulo: "Desbloquee su informe completo",
    texto:
      "Incluye el escaneo profundo (puertos, vulnerabilidades y exposición), la auditoría técnica y las recomendaciones priorizadas — déjenos su correo y un socio lo ayuda a priorizar.",
    nombre: "Su nombre",
    correo: "Su correo",
    politicaAntes: "Acepto la",
    politicaLink: "política de tratamiento de datos",
    enviar: "Quiero el informe completo →",
    gracias: "¡Recibido! Un socio de Crubol lo contactará con el informe completo.",
    error: "No pudimos registrar su solicitud. Intente de nuevo.",
  },
  errorTitulo: "No pudimos analizar el dominio",
  reintentar: "Volver a intentar",
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
  legal: empresa.nombre,
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
