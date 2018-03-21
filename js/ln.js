var titulo = '';

function ponIdioma(ln){
  if (ln == 'es') {
    titulo = 'IDEArq Carbon';
  }
  else if (ln == 'en'){
    titulo = 'Carbon IDEArq';
  }
  $('#titulo').html(titulo);
}
