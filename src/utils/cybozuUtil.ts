
declare const cybozu: any;

interface Field {
  id: string;
  var: string;
  label: string;
  type: string;
}

export const getFields = () => {

  const schema = cybozu.data.page.SCHEMA_DATA || cybozu.data.page.FORM_DATA.schema;

  return <Field[]>Object.values(schema.table.fieldList);
}

export const getFieldMap = () => {

  const fields = getFields();

  return new Map(fields.map((field) => [field.var, field]));
}