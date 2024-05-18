export default {
  name: 'products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name of the product',
      type: 'string',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'price',
      title: 'Price of the product',
      type: 'number',
      validation: (rule: any) => rule.required().min(0),
    },
    {
      name: 'category',
      title: 'Category of the product',
      type: 'string',
      validation: (rule: any) => rule.required(),
      options: {
        list: [
          {title: 'Fruit', value: 'fruit'},
          {title: 'Vegetable', value: 'vegetable'},
          {title: 'Nonveg', value: 'nonveg'},
          {title: 'Dairy', value: 'dairy'},
          {title: 'Bakery', value: 'bakery'},
          {title: 'Beverage', value: 'beverage'},
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'image',
      title: 'Image of the product',
      type: 'image',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'bestselling',
      title: 'Is it a bestselling product?',
      type: 'boolean',
    },
  ],
  initialValue: {
    bestselling: false,
  },
}
