export const seoFields = [
    {
      key: "seo_title",
      type: "text",
      label: "Title Tag",
      placeholder: "Enter the title tag",
      note: "Custom title tag.",
    },
    {
      key: "meta_description",
      type: "textarea",
      rows: 4,
      label: "Meta Description",
      placeholder: "Enter a brief description",
      note: "Most search engines use a maximum of 160 characters for the description.",
    },
    {
      key: "meta_keywords",
      type: "textarea",
      rows: 4,
      label: "Meta Keywords",
      placeholder: "Enter keywords separated by commas",
      note: "Separate each term with a comma.",
    },
  ];

  export const swatchSeoFields = [
    {
      key: "seo_title",
      type: "text",
      label: "Title Tag",
      placeholder: "Enter the title tag",
      note: "Custom title tag.",
    },
    {
      key: "seo_meta_description",
      type: "textarea",
      rows: 4,
      label: "Meta Description",
      placeholder: "Enter a brief description",
      note: "Most search engines use a maximum of 160 characters for the description.",
    },
    {
      key: "seo_meta_keywords",
      type: "textarea",
      rows: 4,
      label: "Meta Keywords",
      placeholder: "Enter keywords separated by commas",
      note: "Separate each term with a comma.",
    },
  ];

export const materialOptionsFields = [
    {
      key: "material_term_key",
      type: "text",
      label: "Term key",
      placeholder: "Term key",
      note: `The material term id. This is generated from material taxonomy.Please do not make any changes here.`,
    },
    {
      key: "material_item",
      type: "number",
      label: "Material item",
      placeholder: "Material item",
      note: "Put material taxonomy term id. Seperate with commas.",
    },
    {
      key: "material_group_name",
      type: "text",
      label: "Group Name",
      placeholder: "Group Name",
      note: "",
    },
  ];
  