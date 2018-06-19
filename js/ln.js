var titulo = '';
var txtIntro = '';
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
var noReg = '';
var thYac = '';
var thUbi = '';
var thTmuest = '';
var thTmat = '';
var thEdad = '';
var thDsv = '';
var thMed = '';
var thLab = '';
var titDesc = '';
var popYac = '';
var titIrA = '';
var titLimpFilt = '';
var verMapa = '';
var ocultarMapa = '';
var lnkCita = '';
var cita = '';
var alertCopiaCita = '';

function ponIdioma(ln){
  if (ln == 'es') {
    titulo = 'IDEArq C<span class="align-top superindice">14</span>';
    txtIntro = '<p class="p-idearq">Este portal da acceso al Archivo Antonio Gilman. Base de Datos de Dataciones Radiocarbónicas de la Prehistoria Reciente de la Península Ibérica (IDEArq C<span class="align-top superindice">14</span>).<br>Contiene información técnica y contextual de dataciones radiocarbónicas de la Península Ibérica desde el Epipaleolítico a la Edad del Hierro extraídas de las fuentes bibliográficas, recopiladas y revisadas críticamente por el Prof. Antonio Gilman y normalizadas para su publicación, bajo su dirección, por el equipo editorial de IDEArq. Mediante los formularios de consulta, el usuario puede obtener aquellas dataciones que se ajusten a los criterios seleccionados, relativos tanto al contexto arqueológico y al material datado como a las propias características de la datación.<br>En el <a href="http://www.idearqueologia.org/visualizador_idearq/">visualizador cartográfico IDEArq</a> se pueden consultar los mismos datos a partir de los yacimientos datados.</p>';
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
    etiFecha = 'Edad C<span class="align-top superindice">14</span>';
    etiDev = 'Desviación estándar';
    etiMetodo = 'Métodos de datación';
    etiLab = 'Laboratorios';
    filtraYa = 'Filtra dataciones';
    noSelec = 'Es necesario seleccionar algún filtro';
    noReg = 'Es necesario seleccionar alguna región geográfica';
    thYac = 'Yacimiento';
    thUbi = 'Ubicación';
    thTmuest = 'Tipo de muestra';
    thTmat = 'Material';
    thEdad = 'Fecha';
    thDsv = 'σ';
    thMed = 'Método';
    thLab = 'Referencia';
    titDesc = 'Descargas';
    popYac = 'yacimientos';
    titIrA = 'Mostrar en mapa';
    titLimpFilt = 'Limpiar todos los filtros';
    verMapa = 'Mostrar mapa';
    ocultarMapa = 'Ocultar mapa';
    lnkCita = 'Cítanos';
    cita = 'IDEArq (n.d.). IDEArq-C14: Base de Datos de Dataciones Radiocarbónicas de la Península Ibérica (Archivo Antonio Gilman). IDEArq: Infraestructura de Datos Espaciales de Investigación Arqueológica. Madrid: CSIC. Disponible en: http://www.idearqueologia.org/idearq_c14/. ['+fechaHoy()+']';
    alertCopiaCita = 'Cita copiada al portapapeles';
  }
  else if (ln == 'en'){
    titulo = 'IDEArq C<span class="align-top superindice">14</span>';
    tituloBuscaYaci = 'Search for a site';
    tituloFiltrar = 'Filter radiocarbon dates';
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
    noReg = 'At least one geographic region required';
    thYac = 'Site';
    thUbi = 'Location';
    thTmuest = 'Sample type';
    thTmat = 'Material';
    thEdad = 'Date';
    thDsv = 'σ';
    thMed = 'Method';
    thLab = 'Reference';
    titDesc = 'Downloads';
    popYac = 'sites';
    titIrA = 'Show in map';
    titLimpFilt = 'Clear all filters';
    verMapa = 'Show map';
    ocultarMapa = 'Hide map';
    lnkCita = 'Cite us';
    cita = 'IDEArq (n.d.). IDEArq-C14: Iberian Peninsula Radiocarbon Database (Antonio Gilman Archive). IDEArq: Infraestructura de Datos Espaciales de Investigación Arqueológica. Madrid: CSIC. Available at: http://www.idearqueologia.org/idearq_c14/. ['+fechaHoy()+']';
    alertCopiaCita = 'Citation copied to clipboard';
  }
  $('#titulo').html(titulo);
  $('#intro').html(txtIntro);
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
  $('#th-yac').html(thYac);
  $('#th-ubi').html(thUbi);
  $('#th-tmuest').html(thTmuest);
  $('#th-tmat').html(thTmat);
  $('#th-edad').html(thEdad);
  $('#th-dsv').html(thDsv);
  $('#th-med').html(thMed);
  $('#th-lab').html(thLab);
  $('#limp-filt').prop('title',titLimpFilt);
  $('#tira-mapa').html(verMapa);
  $('#cita').html(lnkCita);
  $('#cita').attr('data-content',cita);
}
