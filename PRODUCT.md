# PRODUCT — Fractal Studio MX

register: brand

## Qué es

Sitio propio de Fractal Studio MX, estudio creativo en CDMX (fundador: Fermín "Neiky" Monroy). No es un folleto: **es la prueba**. Fractal vende diseño, foto, video y desarrollo web; si su propio sitio no impresiona, la venta muere antes de empezar. Cada visitante debe salir pensando "si esto le hicieron a su casa, imagínate lo que me hacen a mí".

## Quién lo ve

1. **Dueños de negocio mexicanos** (restaurantes, estudios de belleza, constructoras, industria eléctrica) que llegan por prospección en frío, WhatsApp o por la herramienta gratuita `/analiza`. Casi siempre en celular, a media jornada, entre pendientes. Deciden en segundos si esto se ve caro y serio.
2. **Organizadores de expos** (VanExpo y similares) que ya conocen a Fractal por coberturas audiovisuales y evalúan encargarle también lo digital.
3. **Clientes tibios por referencia** que llegan a validar antes de una llamada.

## Tono

Técnico y confiado, nunca corporativo tibio. Etiquetas tipo HUD ("CDMX // ESTUDIO CREATIVO"), lenguaje de sala de control. Español mexicano, de tú a tú, sin anglicismos de agencia. Muestra capacidad, no la explica.

## Principios

- **Enseñar, no prometer.** Cada afirmación de capacidad va acompañada de la capacidad ejecutándose en pantalla.
- **Sumar, nunca criticar.** Regla dura del negocio: jamás señalar defectos del prospecto (ya costó un cliente).
- **La velocidad es parte del lujo.** Un sitio pesado contradice el argumento de venta.
- **Nada genérico.** Si el visitante puede imaginar el mismo bloque en el sitio de otra agencia, se rehace.

## Anti-referencias

- Plantillas de agencia con stock de gente sonriendo en juntas.
- Degradados morado-a-azul de SaaS.
- Grids de tarjetas idénticas con icono + título + párrafo.
- Cualquier cosa que se lea como hecha con IA sin criterio.

## Restricciones reales

- Se despliega en Vercel (Next.js 14, App Router). El `tsconfig` apunta a target < ES2015: nada de `matchAll` con spread.
- Los assets pesados se sirven desde `/public`; el presupuesto de peso importa porque el público principal está en datos móviles.
- Marca verificada en disco: lima `#C3DD2E`, negro `#080808`. WhatsApp 52 55 6212 3864.
