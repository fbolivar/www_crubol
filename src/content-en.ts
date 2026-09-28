/**
 * English content for the Crubol site. Same shape as content.ts (Spanish).
 * Shared data (company, WhatsApp numbers) is re-used from content.ts.
 * The i18n context swaps between this module and the Spanish one.
 */
import { empresa, hero as heroEs } from "./content";

export { empresa, whatsapp } from "./content";

export const seo = {
  title: "Crubol Technology · IT & cybersecurity solutions in Bogotá",
  description:
    "Infrastructure, cybersecurity and artificial intelligence for mid-sized companies in Colombia. We assess with evidence, fix by priority and stay watching.",
  url: "https://crubol.com.co",
} as const;

export const diagnosticoResultado = {
  eyebrow: "Domain diagnostic · Free",
  cargando: {
    mensajes: [
      "Connecting to the domain…",
      "Checking security headers…",
      "Verifying the SSL/TLS certificate…",
      "Analyzing email (SPF, DKIM, DMARC)…",
      "Checking reputation and blocklists…",
      "Calculating your score…",
    ],
    nota: "Analyzing security, SSL, email and reputation. Don't close this window.",
  },
  labelSeguridad: "Web security",
  labelWeb: "Email / DNS",
  de100: "of 100",
  resultadoDe: "Result for",
  parcialNota:
    "This is a partial, automated analysis. Deep scanning of ports, vulnerabilities and exposure surface is performed by the partners manually and with your authorization.",
  form: {
    titulo: "Unlock your full report",
    texto:
      "Includes deep scanning (ports, vulnerabilities and exposure), the technical audit and prioritized recommendations — leave us your email and a partner helps you prioritize.",
    nombre: "Your name",
    correo: "Your email",
    politicaAntes: "I accept the",
    politicaLink: "data processing policy",
    enviar: "I want the full report →",
    gracias:
      "Received! We've emailed the partial PDF report to you and a Crubol partner will contact you with the full report.",
    error: "We couldn't register your request. Please try again.",
  },
  errorTitulo: "We couldn't analyze the domain",
  reintentar: "Try again",
  faqEyebrow: "Frequently asked questions",
  faqTituloAntes: "About the",
  faqTituloResaltado: "diagnostic",
  faq: [
    {
      p: "What does the free diagnostic analyze?",
      r: "It reviews security headers, the SSL/TLS certificate and email/DNS records (SPF, DKIM, DMARC) plus reputation. It gives you a score and what to prioritize first.",
    },
    {
      p: "Is there a cost or commitment?",
      r: "No. It's free and no commitment. You see the score instantly and, if you want the full report with prioritized recommendations, you leave your email.",
    },
    {
      p: "Do you scan ports and vulnerabilities?",
      r: "The automated analysis is partial and non-intrusive. Deep scanning of ports, vulnerabilities and exposure surface is performed by the partners manually and with your authorization.",
    },
    {
      p: "Does it work for any domain?",
      r: "Yes, it works with any site accessible on the internet: landing page, corporate site, e-commerce or blog. Just enter your domain.",
    },
    {
      p: "Is it a professional audit?",
      r: "No. It's an orientation-only automated check. A formal audit, with evidence and defined scope, is a separate service performed by the partners.",
    },
  ],
  aviso:
    "Legal notice — This diagnostic is an automated, partial analysis, of a purely informative and orientative nature, generated from publicly accessible information about the domain via standard HTTP and TLS requests. It does not constitute a professional security audit, a penetration test, or any warranty about the actual state of security, availability or compliance of the evaluated domain. CRUBOL TECHNOLOGY S.A.S. does not perform unauthorized access or intrusive testing and is not responsible for decisions made based on this report. By using this tool, you declare that you are authorized to request the analysis of the entered domain and accept these terms. Data is processed in accordance with our Privacy Policy.",
} as const;

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
  tituloAntes: "An expert team in",
  tituloResaltado: "cybersecurity and infrastructure",
  apertura:
    "We are a team with over 25 years of combined experience in cybersecurity and infrastructure. We understand how to optimize your technology while protecting it from threats, and how to translate the technical into business decisions. That judgment is what we put at your service.",
  puntos: [
    "Specialists in cybersecurity, networks, servers and continuity.",
    "ISO 27001:2022 certification and postgraduate training in security.",
    "The judgment to decide what protects your business and what can wait.",
    "Whoever answers is an expert in the field, not a rotating help desk.",
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
    { numero: "03", titulo: "Who answers is who designed it", descripcion: "You talk to cybersecurity and infrastructure experts, not a rotating help desk. We add value to your business." },
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
  privacidad: "Privacy policy",
} as const;

export const politica = {
  eyebrow: "Legal",
  titulo: "Personal Data Processing Policy",
  actualizadoLabel: "Last updated",
  fecha: "September 25, 2026",
  volver: "← Back to home",
  intro: `In compliance with Statutory Law 1581 of 2012, Decree 1074 of 2015 and other applicable data-protection rules in Colombia, ${empresa.nombre} (hereinafter, "Crubol") adopts this policy, which governs the processing of the personal data we collect through this website and our contact channels.`,
  secciones: [
    {
      titulo: "1. Data controller",
      parrafos: [
        `${empresa.nombre}, a company identified with Tax ID ${empresa.nit} and business registration ${empresa.matricula} of the Bogotá Chamber of Commerce, domiciled in ${empresa.ciudad}, Colombia. Contact email for data-protection matters: ${empresa.correo}.`,
      ],
    },
    {
      titulo: "2. Data we collect",
      parrafos: [
        "We only collect the data you provide voluntarily when filling out our contact forms or starting a conversation on WhatsApp: name, email address, phone or WhatsApp number, company, area of interest and the content of the message you choose to send us. We do not collect sensitive data or data from minors.",
      ],
    },
    {
      titulo: "3. Purpose of processing",
      parrafos: ["Personal data is processed for the following purposes:"],
      lista: [
        "To respond to your contact, assessment or quote requests.",
        "To communicate with you through the channels you indicate (email or WhatsApp).",
        "To prepare and send service proposals you have requested.",
        "To follow up on the commercial or service relationship.",
      ],
      cierre:
        "We do not sell, rent or share your personal data with third parties for commercial purposes. Nor do we use it for profiling or automated decisions.",
    },
    {
      titulo: "4. Authorization and legal basis",
      parrafos: [
        "By submitting a form on this site or writing to us on WhatsApp, you grant prior, express and informed authorization for the processing of your personal data for the purposes described here, pursuant to Article 9 of Law 1581 of 2012. This authorization may be revoked at any time, without retroactive effect.",
      ],
    },
    {
      titulo: "5. Contact channels and third parties",
      parrafos: [
        "Contact is made by email and WhatsApp. WhatsApp is a service operated by Meta Platforms, Inc.; when you communicate with us through it, your data is also subject to that provider's privacy policies. This site does not use advertising tracking cookies or analytics tools that individually identify visitors.",
      ],
    },
    {
      titulo: "6. Data retention",
      parrafos: [
        "We keep your personal data for as long as necessary to handle your request and maintain the commercial or service relationship, and for the additional period required by applicable legal obligations. Once the purposes are fulfilled and those periods expire, we securely delete it.",
      ],
    },
    {
      titulo: "7. Rights of the data subject",
      parrafos: ["As the owner of your personal data, you have the right to:"],
      lista: [
        "Access, update and rectify your personal data.",
        "Request proof of the authorization granted.",
        "Be informed about the use given to your data.",
        "Revoke the authorization and/or request deletion of your data, where applicable.",
        "Access your personal data free of charge.",
        "File complaints with the Superintendency of Industry and Commerce (SIC).",
      ],
    },
    {
      titulo: "8. How to exercise your rights",
      parrafos: [
        `You may exercise your rights by writing to ${empresa.correo}, stating your name, the right you wish to exercise and your contact information. We will handle inquiries within a maximum of ten (10) business days and complaints within a maximum of fifteen (15) business days, pursuant to Law 1581 of 2012.`,
      ],
    },
    {
      titulo: "9. Information security",
      parrafos: [
        "We adopt reasonable technical, human and administrative measures to protect your personal data against unauthorized access, loss, alteration or improper disclosure.",
      ],
    },
    {
      titulo: "10. Term and changes",
      parrafos: [
        "This policy is effective from its publication and may be updated to reflect legal or operational changes. Any substantial modification will be communicated through this website.",
      ],
    },
    {
      titulo: "11. Contact",
      parrafos: [
        `For any concern related to the processing of your personal data, write to us at ${empresa.correo}.`,
      ],
    },
  ],
} as const;
