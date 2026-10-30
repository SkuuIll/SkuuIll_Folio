export type LegalKind = "legal" | "privacidad" | "terminos" | "aviso-legal" | "creditos";
export type Locale = "es" | "en";
type Section = { heading: string; paragraphs: string[] };
type Document = { title: string; lead: string; sections: Section[] };
type Reference = { title: string; url: string };
export const updated = "2026-10-30";
export const legalNav: {kind: LegalKind; es: string; en: string}[] = [
  {kind:"legal",es:"Información legal",en:"Legal information"},
  {kind:"privacidad",es:"Privacidad y almacenamiento",en:"Privacy and storage"},
  {kind:"terminos",es:"Términos de uso",en:"Terms of use"},
  {kind:"aviso-legal",es:"Aviso legal",en:"Legal notice"},
  {kind:"creditos",es:"Créditos y licencias",en:"Credits and licenses"}
];
export const sources: Reference[] = [
  {title:"Ley 25.326 — Protección de Datos Personales",url:"https://www.argentina.gob.ar/normativa/nacional/64790/actualizacion"},
  {title:"AAIP — Derechos sobre los datos personales",url:"https://www.argentina.gob.ar/aaip/datospersonales/derechos"},
  {title:"Ley 24.240 — Defensa del Consumidor",url:"https://www.argentina.gob.ar/normativa/nacional/638/actualizacion"},
  {title:"Ley 11.723 — Propiedad Intelectual",url:"https://www.argentina.gob.ar/normativa/nacional/42755/actualizacion"},
  {title:"Disposición 954/2025 — Contratación a distancia",url:"https://www.argentina.gob.ar/normativa/nacional/disposici%C3%B3n-954-2025-417152/texto"}
];
export const legalContent: Record<Locale,Record<LegalKind,Document>> = {
 es: {
  legal: {
   title:"Información legal y transparencia",
   lead:"Encontrá en un solo lugar cómo funciona este portafolio, qué datos se usan, qué condiciones corresponden a su contenido y cómo comunicarte con su responsable.",
   sections:[
    {heading:"Un portafolio, no una tienda",paragraphs:[
     "SKULL es un portafolio profesional de desarrollo de software publicado desde Argentina. Presenta trabajos, capacidades, experiencias interactivas y canales de contacto.",
     "Actualmente este sitio no permite efectuar compras, pagar, crear cuentas de cliente ni contratar servicios mediante un proceso automático. Si una persona desea solicitar un trabajo, la propuesta, el precio y las condiciones se acuerdan por separado."
    ]},
    {heading:"Qué podés consultar",paragraphs:[
     "La Política de Privacidad explica las consultas por correo, el almacenamiento del navegador, el hosting y cómo ejercer derechos sobre datos personales.",
     "Los Términos de Uso describen el alcance de las demostraciones, los enlaces y los contenidos publicados. El Aviso Legal indica el responsable público y sus canales de contacto. Créditos y Licencias identifica recursos de terceros."
    ]},
    {heading:"Normas y actualización",paragraphs:[
     "Los textos toman como referencia las leyes argentinas 25.326, 24.240 y 11.723 en lo que resulte aplicable. La publicación de esta información no sustituye las obligaciones legales que pudieran corresponder a una actividad comercial concreta.",
     "Si el sitio incorpora pagos, contratación online, boletines, analítica o almacenamiento de formularios, se revisarán las políticas y las funciones exigidas para ese nuevo uso."
    ]}
   ]
  },
  privacidad: {
   title:"Política de privacidad y almacenamiento",
   lead:"Explicamos qué datos intervienen cuando visitás SKULL, cambiás de diseño o decidís contactarnos.",
   sections:[
    {heading:"Responsable y contacto",paragraphs:[
     "El sitio se presenta públicamente bajo el nombre profesional SKULL, desde Charata, Chaco, Argentina. Para consultas sobre datos personales y solicitudes de acceso, rectificación, actualización o supresión: moreappmix@gmail.com.",
     "Esta política se refiere al portafolio skuull.pages.dev; no cubre automáticamente los servicios de terceros enlazados desde él."
    ]},
    {heading:"Consultas por correo",paragraphs:[
     "El formulario de consulta prepara un mensaje en tu navegador. No envía su contenido a una API propia ni lo guarda en una base de datos del portafolio. Podés revisar, copiar, descargar o abrir el mensaje en tu aplicación de correo.",
     "Solo si decidís enviarlo por correo, el destinatario recibirá la información que incluyas (por ejemplo, nombre, dirección de correo, tipo de proyecto y descripción) para atender la consulta. El envío y almacenamiento del correo también se encuentran sujetos a las condiciones del proveedor de correo que utilice cada parte.",
     "No ingreses contraseñas, credenciales, datos bancarios ni otra información sensible en una consulta inicial."
    ]},
    {heading:"Preferencias almacenadas en el navegador",paragraphs:[
     "Para mantener la experiencia visual, el sitio utiliza localStorage y sessionStorage, cuando tu navegador lo permite, con preferencias de tema claro/oscuro, diseño rotativo, paleta, escena y presentación. Podés borrarlas desde los ajustes o datos del sitio de tu navegador.",
     "En el código del portafolio revisado no hay un sistema propio de publicidad comportamental ni una integración explícita de Google Analytics o píxeles publicitarios. Esto no implica que el proveedor de alojamiento no utilice registros técnicos o medidas de seguridad."
    ]},
    {heading:"Alojamiento, registros y enlaces externos",paragraphs:[
     "El sitio está alojado en Cloudflare Pages. Al acceder, el proveedor de infraestructura puede procesar datos técnicos como dirección IP, fecha y hora de la solicitud, cabeceras y registros necesarios para entregar el contenido, gestionar seguridad y mantener el servicio, conforme a sus propias políticas.",
     "Los enlaces a GitHub y a otros recursos externos pueden llevarte a servicios con prácticas de privacidad diferentes. Revisá sus políticas antes de usar esos servicios.",
     "Las operaciones de infraestructura o correo pueden implicar tratamiento fuera de Argentina; sus condiciones y plazos de conservación corresponden a los respectivos proveedores. No publicamos un plazo de retención fijo que no podamos verificar."
    ]},
    {heading:"Tus derechos",paragraphs:[
     "La Ley 25.326 reconoce derechos relacionados con tus datos personales. Podés escribir a moreappmix@gmail.com indicando tu solicitud, para que sea atendida conforme al marco legal aplicable. Si corresponde, la Agencia de Acceso a la Información Pública (AAIP) es la autoridad argentina de control.",
     "Esta política se revisará cuando cambie el funcionamiento del sitio o los tratamientos efectivamente realizados."
    ]}
   ]
  },
  terminos: {
   title:"Términos de uso",
   lead:"Condiciones para visitar, consultar y compartir contenidos de este portafolio profesional.",
   sections:[
    {heading:"Naturaleza del sitio",paragraphs:[
     "SKULL es un portafolio informativo y de demostración. Los contenidos se ofrecen para conocer proyectos y capacidades técnicas. Las simulaciones, capturas de prueba y representaciones de arquitectura no son paneles de producción en tiempo real.",
     "No se realizan compras, pagos ni contrataciones automáticas dentro del sitio. Enviar una consulta no crea un contrato ni garantiza disponibilidad, precio, plazo o aceptación de un proyecto."
    ]},
    {heading:"Uso responsable",paragraphs:[
     "Podés navegar y compartir enlaces al contenido público. No debés intentar vulnerar el sitio, afectar su funcionamiento, suplantar identidades ni utilizar materiales de una manera que infrinja derechos de terceros.",
     "Los nombres y las marcas de proyectos o plataformas de terceros pertenecen a sus titulares respectivos."
    ]},
    {heading:"Propuestas comerciales",paragraphs:[
     "Si se acuerda un servicio profesional, su alcance, entregables, precio, plazos, propiedad intelectual, soporte y demás condiciones deberán establecerse en una propuesta o acuerdo separado. Estos términos del portafolio no sustituyen ese acuerdo.",
     "No se pretende excluir ni limitar derechos irrenunciables que correspondan por la normativa argentina de defensa del consumidor u otras disposiciones aplicables."
    ]},
    {heading:"Disponibilidad, enlaces y cambios",paragraphs:[
     "El sitio puede recibir mejoras, correcciones o interrupciones técnicas. Los recursos externos y repositorios enlazados son administrados por sus respectivos responsables y pueden cambiar sin intervención de SKULL.",
     "Los textos de estas páginas pueden actualizarse cuando cambien las funcionalidades, el contenido o las obligaciones aplicables; la fecha de revisión se indica en cada página."
    ]}
   ]
  },
  "aviso-legal": {
   title:"Aviso legal",
   lead:"Datos públicos del sitio, finalidad, derechos sobre el contenido y vías de contacto.",
   sections:[
    {heading:"Identificación pública",paragraphs:[
     "Identidad profesional utilizada en este portafolio: SKULL (seudónimo público). Ubicación declarada: Charata, Chaco, República Argentina.",
     "Sitio principal: https://skuull.pages.dev/. Contacto: moreappmix@gmail.com. Perfil de desarrollo: https://github.com/SkuuIll.",
     "SKULL es el nombre de presentación de un portafolio personal; esta página no afirma la existencia de una sociedad comercial ni publica CUIT o domicilio fiscal que no se hayan verificado."
    ]},
    {heading:"Finalidad y alcance",paragraphs:[
     "El sitio documenta trabajos y muestra habilidades técnicas. Algunas capturas corresponden a entornos de demostración y ciertos proyectos son privados, prototipos o adaptaciones de software de terceros, tal como se aclara en cada caso.",
     "No se venden productos ni se concluyen contratos a través de este portafolio. Si esto cambia, también deberán revisarse los requisitos de identificación comercial, información al consumidor y los mecanismos aplicables de arrepentimiento o baja."
    ]},
    {heading:"Propiedad intelectual y solicitudes",paragraphs:[
     "Las obras originales del sitio y los programas de terceros mantienen sus respectivas titularidades y licencias. La referencia a una marca no supone patrocinio, asociación comercial ni cesión de derechos.",
     "Para avisar sobre un error, solicitar una rectificación o comunicar una cuestión de derechos de autor, escribí a moreappmix@gmail.com con la referencia al material en cuestión."
    ]}
   ]
  },
  creditos: {
   title:"Créditos y licencias",
   lead:"Reconocimiento de recursos técnicos y derechos sobre las imágenes, tipografías y software utilizado.",
   sections:[
    {heading:"Software y tipografías de terceros",paragraphs:[
     "El sitio está desarrollado con Astro, TypeScript y componentes web. Incluye tecnología de animación como GSAP y Three.js en algunas experiencias interactivas. El uso de cada dependencia está sujeto a su licencia propia.",
     "Las tipografías Manrope y Geist Mono se distribuyen bajo sus archivos de licencia SIL Open Font License incluidos en este proyecto. Three.js conserva su aviso MIT correspondiente."
    ]},
    {heading:"Trabajos e imágenes",paragraphs:[
     "Las capturas, marcas e interfaces de los proyectos mostrados se utilizan para documentar los casos correspondientes. Las contribuciones, bifurcaciones y proyectos basados en software de terceros deben mantener la atribución indicada en sus fichas y repositorios.",
     "No se declara que todos los elementos visuales sean de autoría exclusiva del titular del portafolio. Si encontrás una atribución incorrecta, podés solicitar su revisión por correo."
    ]},
    {heading:"Código y reutilización",paragraphs:[
     "La aparición de un proyecto en este sitio no implica que su código sea público o reutilizable. Consultá el repositorio de cada proyecto y el archivo de licencia antes de copiar o distribuir código o medios.",
     "La legislación argentina sobre propiedad intelectual incluye la Ley 11.723. Las licencias específicas de cada herramienta prevalecen para sus propios componentes."
    ]}
   ]
  }
 },
 en: {
  legal: {
   title:"Legal information and transparency",
   lead:"Learn how this portfolio works, what visitor data may be involved, how its content can be used, and how to contact its operator.",
   sections:[
    {heading:"A portfolio, not an online store",paragraphs:[
     "SKULL is a professional software-development portfolio published from Argentina. It presents projects, skills, interactive experiences and contact information.",
     "At present, this site does not offer online payments, purchases, customer accounts or automated service contracts. Any potential project scope, pricing and conditions are discussed separately."
    ]},
    {heading:"Information available",paragraphs:[
     "The Privacy Policy explains email inquiries, local browser preferences, hosting and personal-data rights.",
     "The Terms of Use cover demonstrations, external links and published materials. The Legal Notice identifies the public-facing operator and contact methods. Credits and Licenses lists third-party resources."
    ]},
    {heading:"Legal context and updates",paragraphs:[
     "These pages refer to Argentine Laws 25,326, 24,240 and 11,723 where applicable. They are not a substitute for obligations attached to specific commercial activities.",
     "If the site adds payments, online contracting, newsletters, analytics or server-side form storage, this information and any required customer rights controls will need reviewing."
    ]}
   ]
  },
  privacidad: {
   title:"Privacy and browser storage policy",
   lead:"How SKULL handles contact inquiries and visual preferences, including possible infrastructure processing.",
   sections:[
    {heading:"Operator and contact",paragraphs:[
     "This portfolio is publicly presented as SKULL, based in Charata, Chaco, Argentina. For personal-data inquiries or requests to access, correct, update or delete data, contact moreappmix@gmail.com.",
     "This policy covers the portfolio at skuull.pages.dev, not every linked external website."
    ]},
    {heading:"Email inquiries",paragraphs:[
     "The contact form prepares a draft inside your browser. It does not submit the form to a portfolio-owned API or store it in a portfolio database. You may inspect, copy, download or open the draft in your email app.",
     "Only if you decide to send the email does its recipient receive the details you provide, such as your name, email address, project category and description, to respond to your inquiry. Email services have their own processing and retention terms.",
     "Please do not send passwords, account credentials, payment-card details or other sensitive information in an initial inquiry."
    ]},
    {heading:"Browser preferences",paragraphs:[
     "Where supported, this site uses localStorage and sessionStorage to remember light/dark theme, rotating design, color palette, scene and presentation choices. These can be cleared using your browser's site-data controls.",
     "The reviewed portfolio code does not include its own behavioral ad-tracking system or an explicit Google Analytics or advertising-pixel integration. This does not rule out technical processing by the hosting provider."
    ]},
    {heading:"Hosting, technical logs and external links",paragraphs:[
     "This site is hosted on Cloudflare Pages. The infrastructure provider may process technical information, such as IP address, request timestamps, headers and security logs, to deliver and protect the site under its own policies.",
     "External links, including GitHub, lead to sites with separate privacy practices. Please review the relevant third-party policies.",
     "Hosting and email services may involve processing outside Argentina. Their retention practices depend on the providers; we do not publish an unverified fixed retention period."
    ]},
    {heading:"Your rights",paragraphs:[
     "Argentine Law 25,326 sets out personal-data rights. Write to moreappmix@gmail.com to make a request, which will be handled under applicable law. Argentina's Access to Public Information Agency (AAIP) is the relevant oversight authority.",
     "This notice will be reviewed if the site's functionality or actual data handling changes."
    ]}
   ]
  },
  terminos: {
   title:"Terms of use",
   lead:"Conditions for browsing, sharing and consulting this professional portfolio.",
   sections:[
    {heading:"What this site provides",paragraphs:[
     "SKULL is an informational and demonstration portfolio. Its content documents projects and technical skills. Simulated data flows, demo screenshots and architecture diagrams should not be interpreted as live production dashboards.",
     "The website does not accept online payments, purchases or automatic service contracts. Sending an inquiry does not create a contract or guarantee pricing, availability, delivery dates or acceptance."
    ]},
    {heading:"Responsible use",paragraphs:[
     "You may browse and share links to public content. Do not attempt to disrupt the site, circumvent security, impersonate others or use materials in ways that infringe third-party rights.",
     "Third-party project names and trademarks remain the property of their respective owners."
    ]},
    {heading:"Business inquiries",paragraphs:[
     "If professional services are agreed upon, scope, deliverables, price, timelines, intellectual property, support and other conditions must be specified in a separate proposal or agreement. These website terms do not replace that agreement.",
     "These terms do not attempt to waive or restrict mandatory rights granted under Argentine consumer-protection law or other applicable rules."
    ]},
    {heading:"Availability and changes",paragraphs:[
     "The site may change or experience technical interruptions. External websites and repositories are controlled by their own operators.",
     "These pages may be updated when functionality, content or legal requirements change. Each page shows its last review date."
    ]}
   ]
  },
  "aviso-legal": {
   title:"Legal notice",
   lead:"Public-facing operator information, purpose, intellectual-property notices and contact methods.",
   sections:[
    {heading:"Public identity",paragraphs:[
     "Portfolio name: SKULL (public-facing pseudonym). Declared location: Charata, Chaco, Argentina.",
     "Primary website: https://skuull.pages.dev/. Contact: moreappmix@gmail.com. Development profile: https://github.com/SkuuIll.",
     "SKULL is the display name of a personal portfolio. This notice does not claim that a registered company exists or publish an unverified tax ID or business address."
    ]},
    {heading:"Purpose and scope",paragraphs:[
     "This site documents work and demonstrates technical skills. Some screenshots show demo environments. Other projects are private, prototypes or adaptations of third-party software, as indicated in their case studies.",
     "No purchases or contracts take place on this portfolio. If online selling or contracting is introduced, business-identification, consumer-information and applicable cancellation/withdrawal controls must be reviewed."
    ]},
    {heading:"Intellectual property and requests",paragraphs:[
     "Original works and third-party materials retain their respective ownership and licenses. References to brands do not imply sponsorship, endorsement or a transfer of rights.",
     "To report an error, request a correction or raise a copyright concern, contact moreappmix@gmail.com with a reference to the material in question."
    ]}
   ]
  },
  creditos: {
   title:"Credits and licenses",
   lead:"Acknowledging third-party tools, media and rights relevant to this portfolio.",
   sections:[
    {heading:"Software and fonts",paragraphs:[
     "This site is built with Astro, TypeScript and web components. Some interactive experiences use GSAP and Three.js. Each dependency remains subject to its own license.",
     "The font packages Manrope and Geist Mono include SIL Open Font License files in this repository. Three.js includes a copy of its MIT license notice."
    ]},
    {heading:"Projects and media",paragraphs:[
     "Project images, logos and UI screenshots document their corresponding case studies. Contributions, forks and projects based on third-party tools should retain the attribution described in their case studies and repositories.",
     "No claim of exclusive authorship is made for every visual asset. Contact us if an attribution appears incorrect."
    ]},
    {heading:"Code reuse",paragraphs:[
     "Showing a project on this website does not mean its source code is public or available for reuse. Please check its repository and license before copying or distributing code or media.",
     "Argentina's Intellectual Property Law 11,723 applies where relevant. Each third-party component's specific license governs its own use."
    ]}
   ]
  }
 }
};
