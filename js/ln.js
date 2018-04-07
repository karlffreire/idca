var titulo = '';
var tituloFiltrar = '';
var caracYac = '';
var caracMat = '';
var caracDat = '';
var placeUnYac = '';

function ponIdioma(ln){
  if (ln == 'es') {
    titulo = 'IDEArq Carbon';
    tituloFiltrar = 'Filtrar dataciones';
    caracYac = 'Elementos del yacimiento';
    caracMat = 'Elementos del material datado';
    caracDat = 'Resultado de la datación';
    placeUnYac = 'Buscar por yacimiento';
  }
  else if (ln == 'en'){
    titulo = 'Carbon IDEArq';
    tituloFiltrar = 'Filter datings';
    caracYac = 'Site features';
    caracMat = 'Material features';
    caracDat = 'Dating outcomes results';
    placeUnYac = 'Search for a site';
  }
  $('#titulo').html(titulo);
  $('#tit-filtrar').html(tituloFiltrar);
  $('#carac-yaci').html(caracYac);
  $('#carac-mat').html(caracMat);
  $('#carac-data').html(caracDat);

}
