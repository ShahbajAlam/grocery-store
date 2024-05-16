export default {
  name: 'banner',
  title: 'Banner Images',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
