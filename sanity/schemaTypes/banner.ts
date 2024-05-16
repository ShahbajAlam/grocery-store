export default {
  name: 'banner',
  title: 'Banner Images',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Title of the banner',
      type: 'string',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule: any) => rule.required(),
    },
  ],
}
