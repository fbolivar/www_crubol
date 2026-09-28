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
    texto: "ISO 27001:2022 · +25 años — Atención directa de expertos en ciberseguridad e infraestructura",
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
  chips: [
    "Ciberseguridad activa",
    "Automatización con IA",
    "Infraestructura & Cloud",
    "Cumplimiento ISO 27001",
  ],
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
  tituloAntes: "Un equipo experto en",
  tituloResaltado: "ciberseguridad e infraestructura",
  apertura:
    "Somos un equipo con más de 25 años de experiencia combinada en ciberseguridad e infraestructura. Entendemos cómo optimizar su tecnología mientras la protegemos de amenazas, y cómo traducir lo técnico en decisiones para su negocio. Ese criterio es el que ponemos a su servicio.",
  puntos: [
    "Especialistas en ciberseguridad, redes, servidores y continuidad.",
    "Certificación ISO 27001:2022 y formación de posgrado en seguridad.",
    "Criterio para decidir qué protege su negocio y qué puede esperar.",
    "Quien responde es experto en la materia, no una mesa de turno.",
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
      descripcion: "Habla con expertos en ciberseguridad e infraestructura, no con una mesa de turno. Damos valor a tu negocio.",
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
      descripcion: "Monitoreamos de forma constante y reportamos con evidencia, en lenguaje claro.",
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
      "Analizando correo (SPF, DKIM, DMARC)…",
      "Consultando reputación y listas negras…",
      "Calculando su puntaje…",
    ],
    nota: "Analizando seguridad, SSL, correo y reputación. No cierre esta ventana.",
  },
  labelSeguridad: "Seguridad web",
  labelWeb: "Correo / DNS",
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
    gracias:
      "¡Recibido! Le enviamos el reporte parcial en PDF a su correo y un socio de Crubol lo contactará con el informe completo.",
    error: "No pudimos registrar su solicitud. Intente de nuevo.",
  },
  errorTitulo: "No pudimos analizar el dominio",
  reintentar: "Volver a intentar",
  faqEyebrow: "Preguntas frecuentes",
  faqTituloAntes: "Sobre el",
  faqTituloResaltado: "diagnóstico",
  faq: [
    {
      p: "¿Qué analiza el diagnóstico gratis?",
      r: "Revisa las cabeceras de seguridad, el certificado SSL/TLS y el SEO on-page (título, metadatos, encabezados e imágenes). Le da un puntaje y qué conviene priorizar primero.",
    },
    {
      p: "¿Tiene costo o compromiso?",
      r: "No. Es gratis y sin compromiso. Ve el puntaje al instante y, si quiere el informe completo con recomendaciones priorizadas, deja su correo.",
    },
    {
      p: "¿Analizan puertos y vulnerabilidades?",
      r: "El análisis automático es parcial y no intrusivo. El escaneo profundo de puertos, vulnerabilidades y superficie de exposición lo realizan los socios de forma manual y con su autorización.",
    },
    {
      p: "¿Sirve para cualquier dominio?",
      r: "Sí, funciona con cualquier sitio accesible por internet: landing, sitio corporativo, e-commerce o blog. Solo ingrese su dominio.",
    },
    {
      p: "¿Es una auditoría profesional?",
      r: "No. Es un chequeo automático orientativo. Una auditoría formal, con evidencia y alcance definido, es un servicio aparte que ejecutan los socios.",
    },
  ],
  aviso:
    "Aviso legal — Este diagnóstico es un análisis automatizado y parcial, de carácter meramente informativo y orientativo, generado a partir de información públicamente accesible del dominio mediante solicitudes HTTP y TLS estándar. No constituye una auditoría de seguridad profesional, prueba de penetración ni garantía sobre el estado real de seguridad, disponibilidad o cumplimiento del dominio evaluado. CRUBOL TECHNOLOGY S.A.S. no realiza accesos no autorizados ni pruebas intrusivas y no se responsabiliza por decisiones tomadas con base en este reporte. Al utilizar esta herramienta, usted declara estar autorizado para solicitar el análisis del dominio ingresado y acepta estos términos. Los datos se tratan conforme a nuestra Política de Privacidad.",
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
  privacidad: "Política de privacidad",
} as const;

// --------------------------------------------------------------------------
// Política de privacidad (Ley 1581 de 2012)
// --------------------------------------------------------------------------
export const politica = {
  eyebrow: "Legal",
  titulo: "Política de Tratamiento de Datos Personales",
  actualizadoLabel: "Última actualización",
  fecha: "25 de septiembre de 2026",
  volver: "← Volver al inicio",
  intro: `En cumplimiento de la Ley Estatutaria 1581 de 2012, el Decreto 1074 de 2015 y demás normas concordantes sobre protección de datos personales en Colombia, ${empresa.nombre} (en adelante, «Crubol») adopta la presente política, que rige el tratamiento de los datos personales que recolectamos a través de este sitio web y de nuestros canales de contacto.`,
  secciones: [
    {
      titulo: "1. Responsable del tratamiento",
      parrafos: [
        `${empresa.nombre}, sociedad identificada con NIT ${empresa.nit} y matrícula ${empresa.matricula} de la ${empresa.camara}, con domicilio en ${empresa.ciudad}, Colombia. Correo de contacto para asuntos de datos personales: ${empresa.correo}.`,
      ],
    },
    {
      titulo: "2. Datos que recolectamos",
      parrafos: [
        "Recolectamos únicamente los datos que usted nos proporciona de forma voluntaria al diligenciar nuestros formularios de contacto o al iniciar una conversación por WhatsApp: nombre, correo electrónico, número de teléfono o WhatsApp, empresa, área de interés y el contenido del mensaje que decida enviarnos. No recolectamos datos sensibles ni datos de menores de edad.",
      ],
    },
    {
      titulo: "3. Finalidad del tratamiento",
      parrafos: ["Los datos personales se tratan con las siguientes finalidades:"],
      lista: [
        "Atender sus solicitudes de contacto, diagnóstico o cotización.",
        "Comunicarnos con usted por los canales que nos indique (correo o WhatsApp).",
        "Elaborar y enviar propuestas de servicios que usted haya solicitado.",
        "Dar seguimiento a la relación comercial o de servicio.",
      ],
      cierre:
        "No vendemos, arrendamos ni compartimos sus datos personales con terceros con fines comerciales. Tampoco los usamos para elaborar perfiles ni para decisiones automatizadas.",
    },
    {
      titulo: "4. Autorización y base legal",
      parrafos: [
        "Al enviar un formulario de este sitio o al escribirnos por WhatsApp, usted autoriza de manera previa, expresa e informada el tratamiento de sus datos personales para las finalidades aquí descritas, conforme al artículo 9 de la Ley 1581 de 2012. Esta autorización puede ser revocada en cualquier momento, sin efecto retroactivo.",
      ],
    },
    {
      titulo: "5. Canales de contacto y terceros",
      parrafos: [
        "El contacto se realiza por correo electrónico y por WhatsApp. WhatsApp es un servicio operado por Meta Platforms, Inc.; al comunicarse con nosotros por ese medio, sus datos también se sujetan a las políticas de privacidad de dicho proveedor. Este sitio no utiliza cookies de rastreo publicitario ni herramientas de analítica que identifiquen individualmente a los visitantes.",
      ],
    },
    {
      titulo: "6. Conservación de los datos",
      parrafos: [
        "Conservamos sus datos personales durante el tiempo necesario para atender su solicitud y mantener la relación comercial o de servicio, y por el término adicional que exijan las obligaciones legales aplicables. Una vez cumplidas las finalidades y vencidos dichos términos, procederemos a su supresión segura.",
      ],
    },
    {
      titulo: "7. Derechos del titular",
      parrafos: ["Como titular de sus datos personales, usted tiene derecho a:"],
      lista: [
        "Conocer, actualizar y rectificar sus datos personales.",
        "Solicitar prueba de la autorización otorgada.",
        "Ser informado sobre el uso que se ha dado a sus datos.",
        "Revocar la autorización y/o solicitar la supresión de sus datos, cuando proceda.",
        "Acceder de forma gratuita a sus datos personales.",
        "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).",
      ],
    },
    {
      titulo: "8. Cómo ejercer sus derechos",
      parrafos: [
        `Puede ejercer sus derechos escribiendo a ${empresa.correo}, indicando su nombre, el derecho que desea ejercer y la información de contacto. Atenderemos las consultas en un término máximo de diez (10) días hábiles y los reclamos en un término máximo de quince (15) días hábiles, conforme a la Ley 1581 de 2012.`,
      ],
    },
    {
      titulo: "9. Seguridad de la información",
      parrafos: [
        "Adoptamos medidas técnicas, humanas y administrativas razonables para proteger sus datos personales frente a acceso no autorizado, pérdida, alteración o divulgación indebida.",
      ],
    },
    {
      titulo: "10. Vigencia y cambios",
      parrafos: [
        "La presente política rige a partir de su publicación y puede ser actualizada para reflejar cambios legales u operativos. Cualquier modificación sustancial se informará a través de este sitio web.",
      ],
    },
    {
      titulo: "11. Contacto",
      parrafos: [
        `Para cualquier inquietud relacionada con el tratamiento de sus datos personales, escríbanos a ${empresa.correo}.`,
      ],
    },
  ],
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
