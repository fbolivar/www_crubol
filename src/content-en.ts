/**
 * English content for the Crubol site. Same shape as content.ts (Spanish).
 * Shared data (company, WhatsApp numbers) is re-used from content.ts.
 * The i18n context swaps between this module and the Spanish one.
 */
import { empresa, hero as heroEs } from "./content";

export { empresa, whatsapp, seo, diagnosticoResultado } from "./content";

export const opcionesInteres = [
  "I don't know the state of my technology",
  "We had an incident and don't want a repeat",
  "I have a provider, but they don't respond in time",
  "A client or audit requires compliance from me",
  "I want to use AI without exposing my information",
] as const;

export const whatsappForm = {
  titulo: "Crubol",
  estado: "Online",
  saludo: "Hi! 👋 Leave your details and we'll assist you on WhatsApp right now.",
  campos: {
    nombre: "Full name",
    correo: "Email address",
    telefono: "WhatsApp number",
    area: "Area of interest",
  },
  indicativo: "CO +57",
  placeholderArea: "— Area of interest —",
  opciones: opcionesInteres,
  enviar: "Contact via WhatsApp",
  legalAntes: "By continuing you accept our",
  legalLink: "Privacy Policy",
} as const;

export const asistente = {
  titulo: "Crubol Assistant",
  subtitulo: "We'll guide you instantly",
  saludo:
    "Hi! 👋 I'm the Crubol assistant. Tell me what your company needs and I'll guide you — or, if you prefer, leave your details and an advisor will contact you.",
  placeholder: "Type your message…",
  ctaDatos: "Leave my details",
  sugerencias: [
    "What services do you offer?",
    "How do you work?",
    "Service plans",
    "How do you protect my information?",
  ],
  error:
    "I couldn't respond right now. Please try again or leave your details and an advisor will contact you.",
  aviso: "Automated assistant. It can make mistakes; confirm anything important with an advisor.",
} as const;

export const nav = {
  marca: "Crubol",
  enlaces: [
    { label: "About", href: "#nosotros" },
    { label: "Services", href: "#servicios" },
    { label: "Why us", href: "#por-que" },
    { label: "Process", href: "#proceso" },
    { label: "Plans", href: "#modalidades" },
    { label: "Contact", href: "#contacto" },
  ],
  cta: "Let's talk →",
  portal: { label: "Client portal", href: "https://crubolos.crubol.com" },
} as const;

export const hero = {
  eyebrow: "IT solutions for your business",
  tituloAntes: "Technology that keeps your operation running,",
  tituloResaltado: "every day",
  parrafo:
    "Infrastructure, cybersecurity and artificial intelligence for mid-sized companies in Colombia. We assess with evidence, fix by priority and stay watching.",
  ctaPrimario: "Free assessment →",
  ctaSecundario: "See services",
  confianza: heroEs.confianza,
  panel: heroEs.panel,
  chips: [
    "Active cybersecurity",
    "AI automation",
    "Infrastructure & Cloud",
    "ISO 27001 compliance",
  ],
  tecnologias: heroEs.tecnologias,
} as const;

export const nosotros = {
  eyebrow: "Who we are",
  tarjeta: {
    titulo: "A Colombian firm, not a middleman",
    dato: `${empresa.nombre} · Tax ID ${empresa.nit} · Business Reg. ${empresa.matricula}, Bogotá Chamber of Commerce.`,
    sello: "+25 years of combined experience",
  },
  tituloAntes: "Your technology operation,",
  tituloResaltado: "under expert judgment",
  apertura:
    "Most mid-sized companies discover the real state of their technology the day operations stop. Not out of neglect: because no one had the time or the judgment to review it before. Crubol exists to fill that role.",
  puntos: [
    "Assessment with evidence, not assumptions.",
    "Clear priorities: first what stops the operation.",
    "Reports a board can understand.",
    "The same partners who design are the ones who answer.",
  ],
  cta: "Let's discuss your case →",
} as const;

export const contadores = [
  { valor: 25, prefijo: "+", sufijo: "", label: "Years of experience" },
  { valor: 1000, prefijo: "+", sufijo: "", label: "Devices managed" },
  { valor: 4, prefijo: "", sufijo: "", label: "Service fronts" },
  { valor: 15, prefijo: "", sufijo: "", label: "Days to the assessment" },
] as const;

export const servicios = {
  eyebrow: "What we do",
  tituloAntes: "Four fronts,",
  tituloResaltado: "one accountable partner",
  cta: "Request assessment →",
  verDetalle: "See what's included →",
  idealLabel: "Ideal for",
  items: [
    {
      numero: "01",
      titulo: "Infrastructure technology",
      descripcion:
        "The foundation your company runs on, built not to fail and to recover fast when something happens.",
      items: ["Networks & servers", "Virtualization", "Verified backups", "Ongoing support"],
      intro:
        "The foundation of everything: networks, servers and devices running in a stable, orderly way, ready to grow with your operation.",
      detalles: [
        { titulo: "Network design & modernization", descripcion: "Secure wired and wireless networks, segmented and documented." },
        { titulo: "Servers & virtualization", descripcion: "Efficient platforms, with high availability where the business demands it." },
        { titulo: "Verified backups", descripcion: "Backups that are actually tested: your data recoverable when it matters." },
        { titulo: "Administration & support", descripcion: "Daily operation of your platform with clear service agreements." },
      ],
      idealPara: "Companies that grew faster than their technology and need order, stability and room to scale.",
    },
    {
      numero: "02",
      titulo: "Managed cybersecurity",
      descripcion: "Protection that's operated every day, not a product you install and forget.",
      items: ["Audits", "Endpoint protection", "Monitoring", "Incident response"],
      intro:
        "Your information and your clients' protected, with permanent monitoring and response when something happens.",
      detalles: [
        { titulo: "Assessments & audits", descripcion: "We evaluate firewalls, email, cloud and access; we deliver a prioritized plan." },
        { titulo: "Endpoint & email protection", descripcion: "Modern defense against viruses, ransomware and fraudulent email." },
        { titulo: "Monitoring & response", descripcion: "Continuous monitoring and immediate action on incidents." },
        { titulo: "Compliance & best practices", descripcion: "Guidance toward ISO 27001 and policies tailored to you." },
      ],
      idealPara: "Companies that handle sensitive client data or that already suffered —or fear— an incident.",
    },
    {
      numero: "03",
      titulo: "Applied artificial intelligence",
      descripcion: "AI that's useful for your business, without exposing your information or buying promises.",
      items: ["Opportunity assessment", "Automation", "Internal assistants", "Training"],
      intro:
        "Adopt AI with judgment and with security as the foundation: automate the repetitive and empower your team, without putting your information at risk.",
      detalles: [
        { titulo: "Opportunity assessment", descripcion: "We identify where AI creates real value in your operation — and where it doesn't." },
        { titulo: "Process automation", descripcion: "Repetitive tasks solved with AI: reports, documents, classification." },
        { titulo: "Custom assistants", descripcion: "Tools trained on your company's context and documents." },
        { titulo: "Practical training", descripcion: "Your team using AI productively and safely from week one." },
      ],
      idealPara: "Companies that want to leverage AI but don't know where to start or how to do it without exposing their information.",
    },
    {
      numero: "04",
      titulo: "Compliance & best practices",
      descripcion: "The order clients and audits demand, translated into concrete steps.",
      items: ["ISO 27001 gap", "Policies", "Audit evidence", "Training"],
      intro:
        "We translate the standard into concrete steps your team can sustain, with evidence ready for clients and auditors.",
      detalles: [
        { titulo: "ISO 27001 gap analysis", descripcion: "Where you stand today against the standard and what's missing to close the gap." },
        { titulo: "Tailored policies", descripcion: "Clear policies and procedures, applicable to your real operation." },
        { titulo: "Audit evidence", descripcion: "Documentation and records ready to respond to clients or auditors." },
        { titulo: "Training", descripcion: "Your team understands and sustains best practices day to day." },
      ],
      idealPara: "Companies required by a client or an audit to demonstrate compliance.",
    },
  ],
} as const;

export const porque = {
  eyebrow: "Why Crubol",
  tituloAntes: "No smoke, no fear,",
  tituloResaltado: "with evidence",
  compromisos: [
    { label: "Findings with evidence", valor: 100 },
    { label: "Direct response from the partners", valor: 100 },
    { label: "Clear reports for management", valor: 100 },
  ],
  socio: {
    nombre: "Fernando Bolívar",
    rol: "Founding partner · Cybersecurity",
    credencial: "Master's degree and ISO 27001:2022 certified",
    iniciales: "FB",
  },
  filas: [
    { numero: "01", titulo: "Every finding, with evidence", descripcion: "No claims without proof. Every point is backed up." },
    { numero: "02", titulo: "Reports understood in the boardroom", descripcion: "The technical translated into decisions and business impact." },
    { numero: "03", titulo: "Who answers is who designed it", descripcion: "You talk to the founding partners, not a rotating help desk." },
    { numero: "04", titulo: "We never sell fear", descripcion: "We tell you what's urgent and what can wait, without alarmism." },
  ],
} as const;

export const marquesinaGrande = [
  "INFRASTRUCTURE",
  "CYBERSECURITY",
  "ARTIFICIAL INTELLIGENCE",
  "COMPLIANCE",
] as const;

export const proceso = {
  eyebrow: "How we work",
  tituloAntes: "From uncertainty",
  tituloResaltado: "to control",
  pasos: [
    { numero: "1", dia: "Day 0", titulo: "We listen", descripcion: "We understand your operation, your risks and what keeps you up at night." },
    { numero: "2", dia: "Day 15", titulo: "We assess", descripcion: "We review with evidence and prioritize by real impact." },
    { numero: "3", dia: "Day 45", titulo: "We implement", descripcion: "We fix the critical first, with a plan you approve." },
    { numero: "4", dia: "Day 60", titulo: "We stay", descripcion: "We keep watching and reporting month to month." },
  ],
} as const;

export const modalidades = {
  eyebrow: "How to engage us",
  tituloAntes: "The scope your",
  tituloResaltado: "moment needs",
  pestanas: [
    { id: "puntual", label: "One-time" },
    { id: "continuo", label: "Ongoing" },
  ],
  items: [
    {
      tipo: "puntual",
      titulo: "One-time assessment",
      formato: "Delivered in 15 days",
      descripcion: "A clear snapshot of your technology, with priorities.",
      incluye: ["Review with evidence", "Executive & technical report", "Prioritized plan", "Results meeting"],
      destacado: false,
    },
    {
      tipo: "puntual",
      titulo: "Turnkey project",
      formato: "Project with defined scope",
      descripcion: "We design, fix and implement end to end.",
      incluye: ["Assessment included", "Priority execution", "Documentation & evidence", "Closeout with training"],
      destacado: true,
      cinta: "Most requested",
    },
    {
      tipo: "continuo",
      titulo: "Monthly watch",
      formato: "Ongoing support",
      descripcion: "Monitoring, response and a monthly report, with the partners behind it.",
      incluye: ["Continuous monitoring", "Incident response", "Monthly report", "Prioritized improvement"],
      destacado: false,
    },
  ],
} as const;

export const diagnostico = {
  eyebrow: "Domain diagnostic · Free",
  tituloAntes: "Is your infrastructure",
  tituloResaltado: "secure?",
  parrafo:
    "Enter your domain and get a completely free assessment. We review your exposure on the internet and tell you, with evidence, what to fix first.",
  placeholder: "your-domain.com",
  cta: "Request assessment →",
  nota: "Free and no commitment. The partners reply.",
  errorDominio: "Enter a valid domain (for example, company.com).",
  linkFooter: "Infrastructure Diagnostic",
} as const;

export const contacto = {
  eyebrow: "Let's talk",
  tituloAntes: "Let's start with",
  tituloResaltado: "a free assessment",
  parrafo: "Tell us where your operation stands. The partners reply, no middlemen.",
  datos: [
    { label: "Email", valor: empresa.correo, tipo: "email" as const },
    { label: "Coverage", valor: `${empresa.ciudad} · Across Colombia`, tipo: "texto" as const },
    { label: "WhatsApp", valor: "Sales & support", tipo: "whatsapp" as const },
  ],
  form: {
    campos: {
      nombre: "Name",
      empresa: "Company",
      correo: "Email",
      telefono: "Phone",
      necesidad: "What brings you here?",
      mensaje: "Tell us briefly",
    },
    opciones: opcionesInteres,
    enviar: "Request free assessment →",
    placeholderSelect: "Choose an option",
  },
} as const;

export const pie = {
  descripcion:
    "IT and cybersecurity services for mid-sized companies in Colombia. Security that enables.",
  columnas: [
    {
      titulo: "Services",
      enlaces: [
        { label: "Infrastructure", href: "#servicios" },
        { label: "Cybersecurity", href: "#servicios" },
        { label: "Artificial intelligence", href: "#servicios" },
        { label: "Compliance", href: "#servicios" },
      ],
    },
    {
      titulo: "Company",
      enlaces: [
        { label: "About", href: "#nosotros" },
        { label: "Why Crubol", href: "#por-que" },
        { label: "Process", href: "#proceso" },
        { label: "Plans", href: "#modalidades" },
      ],
    },
  ],
  contacto: {
    titulo: "Contact",
    correo: empresa.correo,
    ciudad: `${empresa.ciudad}, Colombia`,
  },
  legal: empresa.nombre,
} as const;
