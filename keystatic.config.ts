import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'Panel de Administración' }
  },
  collections: {
    articulos: collection({
      label: 'Artículos',
      slugField: 'title',
      path: 'src/content/articulos/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Título' },
        }),
        description: fields.text({
          label: 'Descripción',
          multiline: true,
        }),
        pubDate: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
        }),
        heroImage: fields.image({
          label: 'Imagen de portada (Solo formato .webp)',
          description: 'Por favor, sube únicamente imágenes en formato .webp.',
          directory: 'src/content/articulos',
          publicPath: './',
        }),
        author: fields.text({
          label: 'Autor',
          defaultValue: 'Vicente Espinoza',
        }),
        affiliation: fields.text({
          label: 'Afiliación',
          defaultValue: 'Instituto Nacional',
        }),
        category: fields.text({
          label: 'Categoría',
          defaultValue: 'Opinión',
        }),
        tags: fields.array(fields.text({ label: 'Etiqueta' }), {
          label: 'Etiquetas',
          itemLabel: props => props.value,
        }),
        content: fields.document({
          label: 'Contenido',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/content/articulos',
            publicPath: './',
          },
        }),
      },
    }),
    pleno: collection({
      label: 'Noticias del Pleno',
      slugField: 'title',
      path: 'src/content/pleno/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Título' },
        }),
        description: fields.text({
          label: 'Descripción',
          multiline: true,
        }),
        pubDate: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
        }),
        heroImage: fields.image({
          label: 'Imagen de portada',
          directory: 'src/content/pleno',
          publicPath: './',
        }),
        content: fields.document({
          label: 'Contenido',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/content/pleno',
            publicPath: './',
          },
        }),
      },
    }),
    centros: collection({
      label: 'Centros Federados',
      slugField: 'sigla',
      path: 'src/content/centros/*',
      format: { contentField: 'content' },
      schema: {
        sigla: fields.slug({
          name: { label: 'Sigla (ej. CEI)' },
        }),
        nombre: fields.text({
          label: 'Nombre completo',
        }),
        facultad: fields.text({
          label: 'Facultad',
        }),
        campus: fields.text({
          label: 'Campus',
        }),
        color: fields.text({
          label: 'Color Hex (ej. #005b96)',
        }),
        integrantes: fields.array(
          fields.object({
            nombre: fields.text({ label: 'Nombre' }),
            cargo: fields.text({ label: 'Cargo' }),
            email: fields.text({ label: 'Email (Opcional)' }),
          }),
          {
            label: 'Integrantes',
            itemLabel: props => `${props.fields.cargo.value || 'Integrante'}: ${props.fields.nombre.value || ''}`,
          }
        ),
        content: fields.document({
          label: 'Descripción / Historia (Opcional)',
          formatting: true,
          dividers: true,
          links: true,
        }),
      },
    }),
    publicaciones: collection({
      label: 'Publicaciones de Centros',
      slugField: 'title',
      path: 'src/content/publicaciones/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Título' },
        }),
        description: fields.text({
          label: 'Descripción',
          multiline: true,
        }),
        pubDate: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
        }),
        heroImage: fields.image({
          label: 'Imagen de portada',
          directory: 'src/content/publicaciones',
          publicPath: './',
        }),
        centro: fields.relationship({
          label: 'Centro Federado',
          collection: 'centros',
        }),
        content: fields.document({
          label: 'Contenido',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/content/publicaciones',
            publicPath: './',
          },
        }),
      },
    }),
  },
});
