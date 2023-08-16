import * as Toast from './Toast';

export async function validateForm(formData: any, event: any) {
  try {
    // -----> Validar campos vacios
    const emptyFields = Object.keys(formData).filter((key) => {
      const input = event.target.elements[key];
      return formData[key] === '' && input.required;
    });
    // -----> Busca campos vacios y colocar en variable para imprimir
    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.map((key) => {
        const input = event.target?.elements[key];
        // -----> Encontramos el label del input debe tener atributo htmlfor
        const label = input?.labels[0]?.textContent;
        return label.toUpperCase();
      });
      Toast.error(
        `Por favor, completa los siguientes campos: ${emptyFieldNames.join(
          ', '
        )}`
      );
      return false;
    }
    return true;
  } catch (error) {
    Toast.error('Se presento un error interno');
    return false
  }
}
