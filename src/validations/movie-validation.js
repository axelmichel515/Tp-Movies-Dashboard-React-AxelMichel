export const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Es Requerido';
    } 
  
    if (!values.awards) {
      errors.awards = '0 premios ?';
    } 
  
    if (!values.rating) {
      errors.rating = 'tan mal estuvo ?';
    } 
    if (!values.length) {
      errors.length = 'duracion obligatoria';
    } 
    if (!values.genre_id) {
      errors.genre_id = 'genero es ologatorio';
    } 
    if (!values.release_date) {
        errors.release_date = 'fecha obligatoria';
      } 
    return errors;
  };
  