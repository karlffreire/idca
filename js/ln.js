var titulo = '';
var tituloBuscaYaci = '';
var tituloFiltrar = '';
var caracYac = '';
var caracMat = '';
var caracDat = '';
var placeUnYac = '';
var etiProv = '';
var etiTipoYac = '';
var etiCronoYac = '';
var etiTipoMuest = '';
var etiTipoMat = '';
var etiFecha = '';
var etiDev = '';
var etiMetodo = '';
var etiLab = '';
var filtraYa = '';
var noSelec = '';

function ponIdioma(ln){
  if (ln == 'es') {
    titulo = 'IDEArq Carbon';
    tituloBuscaYaci = 'Buscar un yacimiento';
    tituloFiltrar = 'Filtrar dataciones';
    caracYac = 'Tipo de yacimientos';
    caracMat = 'Tipo de materiales datados';
    caracDat = 'Tipo de dataciones';
    placeUnYac = 'Buscar por yacimiento';
    etiProv = 'Regiones geográficas';
    etiTipoYac = 'Tipologías de yacimiento';
    etiCronoYac = 'Períodos cronológicos';
    etiTipoMuest = 'Tipos de muestra';
    etiTipoMat = 'Tipologías de material';
    etiFecha = 'Edad C14';
    etiDev = 'Desviación estándar';
    etiMetodo = 'Métodos de datación';
    etiLab = 'Laboratorios';
    filtraYa = 'Filtra dataciones';
    noSelec = 'Es necesario seleccionar algún filtro';
  }
  else if (ln == 'en'){
    titulo = 'Carbon IDEArq';
    tituloBuscaYaci = 'Search for a site';
    tituloFiltrar = 'Filter datings';
    caracYac = 'Site features';
    caracMat = 'Material features';
    caracDat = 'Dating features';
    placeUnYac = 'Search for a site';
    etiProv = 'Geographical regions';
    etiTipoYac = 'Site typologies';
    etiCronoYac = 'Chronological periods';
    etiTipoMuest = 'Kinds of sample';
    etiTipoMat = 'Material typologies';
    etiFecha = 'Radiocarbon date';
    etiDev = 'Standard deviation';
    etiMetodo = 'Dating methodologies';
    etiLab = 'Laboratories';
    filtraYa = 'Filter datings';
    noSelec = 'Some filtering options required';
  }
  $('#titulo').html(titulo);
  $('#tit-buscayaci').html(tituloBuscaYaci);
  $('#intro-yaci').select2({//esto crea una nueva instancia, habría que cambiarlo
      placeholder: tituloBuscaYaci,
      allowClear: true,//
      theme:'bootstrap'
    });
  $('#tit-filtrar').html(tituloFiltrar);
  $('#carac-yaci').html(caracYac);
  $('#carac-mat').html(caracMat);
  $('#carac-data').html(caracDat);
  $('#tag-selprov').html(etiProv);
  $('#tag-seltipoyac').html(etiTipoYac);
  $('#tag-selcronoyac').html(etiCronoYac);
  $('#tag-seltipomuest').html(etiTipoMuest);
  $('#tag-seltipomat').html(etiTipoMat);
  $('#tag-fecha').html(etiFecha);
  $('#tag-dev').html(etiDev);
  $('#tag-selmetodo').html(etiMetodo);
  $('#tag-sellab').html(etiLab);
  $('#filtra-ya').html(filtraYa);
}
