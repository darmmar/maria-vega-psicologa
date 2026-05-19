# Estructura de repositorio deseada

```txt
maria-psicologia/
  docs/
    ai-plan/

  src/
    components/
      layout/
        Header.astro
        Footer.astro
        Layout.astro

      sections/
        Hero.astro
        SectionHeader.astro
        TherapyApproach.astro
        ServicesGrid.astro
        ExperienceBlock.astro
        TrainingBlock.astro
        CTASection.astro
        FAQSection.astro
        ResourcesPreview.astro
        CourseHighlight.astro

      ui/
        Button.astro
        Card.astro
        Badge.astro
        Container.astro

      islands/
        MobileMenu.tsx
        FAQAccordion.tsx
        CalEmbed.tsx

      seo/
        SeoHead.astro
        JsonLd.astro
        Breadcrumbs.astro

    content/
      pages/
      services/
      resources/
      courses/
      faq/

    lib/
      config/
        site.ts
        navigation.ts
      seo/
        metadata.ts
        schema.ts
        breadcrumbs.ts
      content/
        collections.ts

    pages/
      index.astro
      conoceme.astro
      psicologa-malaga.astro
      terapia-online.astro
      terapia-duelo.astro
      terapia-ansiedad.astro
      terapia-adicciones.astro
      terapia-infantil-juvenil.astro
      terapia-contextual-act.astro
      curso-duelo.astro
      reserva.astro
      contacto.astro
      recursos/
        index.astro
        [slug].astro
      legal/
        aviso-legal.astro
        privacidad.astro
        cookies.astro

  public/
    images/

  .tina/
    config.ts
```

## Reglas

- No crear `utils.ts` genérico.
- No crear archivos gigantes.
- Separar componentes por responsabilidad.
- Usar `siteConfig` para datos globales.
- Evitar datos hardcodeados repetidos.
- No inventar datos sensibles.
