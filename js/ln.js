var titulo = '';
var tituloBuscaYaci = '';
var tituloFiltrar = '';
var caracYac = '';
var caracMat = '';
var caracDat = '';
var placeUnYac = '';
var etiFecha = '';
var etiDev = '';

function ponIdioma(ln){
  if (ln == 'es') {
    titulo = 'IDEArq Carbon';
    tituloBuscaYaci = 'Buscar yacimiento';
    tituloFiltrar = 'Filtrar dataciones';
    caracYac = 'Elementos del yacimiento';
    caracMat = 'Elementos del material datado';
    caracDat = 'Elementos de la datación';
    placeUnYac = 'Buscar por yacimiento';
    etiFecha = 'Edad C14';
    etiDev = 'Desviación estándar';
  }
  else if (ln == 'en'){
    titulo = 'Carbon IDEArq';
    tituloBuscaYaci = 'Search for a site';
    tituloFiltrar = 'Filter datings';
    caracYac = 'Site features';
    caracMat = 'Material features';
    caracDat = 'Dating features';
    placeUnYac = 'Search for a site';
    etiFecha = 'Radiocarbon date';
    etiDev = 'Standard deviation';
  }
  $('#titulo').html(titulo);
  $('#tit-buscayaci').html(tituloBuscaYaci);
  $('#tit-filtrar').html(tituloFiltrar);
  $('#carac-yaci').html(caracYac);
  $('#carac-mat').html(caracMat);
  $('#carac-data').html(caracDat);
  $('#tag-fecha').html(etiFecha);
  $('#tag-dev').html(etiDev);
}
