



/*=========================================

           CARGA DE LISTADOS

===========================================*/

function cargaLstYac(callback){
  $.ajax({
    url: './datos/cargaYacis.php',
    success: callback
  });
}

function cargaLstReg(callback){
  $.ajax({
    url: './datos/cargaRegiones.php',
    success: callback
  });
}

function cargaLstTipYac(callback){
  $.ajax({
    url: './datos/cargaTiposYac.php',
    success: callback
  });
}

function cargaLstCrono(callback){
  $.ajax({
    url: './datos/cargaCronos.php',
    success: callback
  });
}

function cargaLstTipMuest(callback){
  $.ajax({
    url: './datos/cargaTiposMuestra.php',
    success: callback
  });
}

function cargaLstTipMat(callback){
  $.ajax({
    url: './datos/cargaTiposMaterial.php',
    success: callback
  });
}

function cargaLstMetodos(callback){
  $.ajax({
    url: './datos/cargaMetodos.php',
    success: callback
  });
}

function cargaLstLabos(callback){
  $.ajax({
    url: './datos/cargaLabos.php',
    success: callback
  });
}

/*=========================================

           CARGA DE LISTADOS

===========================================*/

function selYacCronoTipo(prov,tipo,crono,callback){
  $.ajax({
    url: "./datos/selecYacCronoTipo.php",
    data:{
      prov : prov,
      tipo : tipo,
      crono : crono
    },
    success: callback
  });
}

function selYacDat(tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
  $.ajax({
    url: "./datos/selecYacDat.php",
    data:{
      tmuestra : tmuestra,
      tmat : tmat,
      edadmin : edadmin,
      edadmax : edadmax,
      stdevmin : stdevmin,
      stdevmax : stdevmax,
      metod : metod,
      lab : lab
    },
    success: callback
  });
}

function selYaci(yaci,callback){
  $.ajax({
    url: "./datos/selecYaci.php",
    data:{
      yaci : yaci
    },
    success: callback
  });
}

function selYacTodo(prov,tipo,crono,tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
  $.ajax({
    url: "./datos/selecYacTodo.php",
    data:{
      prov : prov,
      tipo : tipo,
      crono : crono,
      tmuestra : tmuestra,
      tmat : tmat,
      edadmin : edadmin,
      edadmax : edadmax,
      stdevmin : stdevmin,
      stdevmax : stdevmax,
      metod : metod,
      lab : lab
    },
    success: callback
  });
}

/*==========================================

         ORGANIZACIÓN DE DATOS

============================================*/

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}

function organizaOpciones(arrObjt){
  var grupos = [];
  var grup = [];
  var gruposOpciones = [];
  for (var i = 0; i < arrObjt.length; i++) {
    grupos.push(arrObjt[i].grupo);
  }
  grup = unique(grupos);
  for (var i = 0; i < grup.length; i++) {
    var objgrup = {};
    objgrup.text = grup[i];
    var opcionesGrupo = jQuery.grep(arrObjt, function( opcion ) {
      return ( opcion.grupo == grup[i]);
    });
    objgrup.children = opcionesGrupo;
    gruposOpciones.push(objgrup);
  }
  for (var i = 0; i < gruposOpciones.length; i++) {
    var hijos = gruposOpciones[i].children;
    for (var j = 0; j < hijos.length; j++) {
      delete hijos[j].grupo;
    }
  }
  return gruposOpciones;
}

function colPorGrupo (data) {
  if (!data.id) {
    return $('<span style="color:#8A0808;font-size:1rem;">'+data.text+'</span>');
  }
  return $(
      '<span>'+data.text+'</span>'
  );
};

function detalles (data) {
  if (data.detalle){
    return $(
      '<span>'+data.text+'</span><br><span style="color:#FF7542;font-size:0.8rem">'+data.detalle+'</span>'
    );
  }
  return $(
      '<span>'+data.text+'</span>'
  );
};

function selecConDetalle(params, data) {
    // If there are no search terms, return all of the data
    if ($.trim(params.term) === '') {
      return data;
    }
    // Do not display the item if there is no 'text' property
    if (typeof data.text === 'undefined') {
      return null;
    }
    if (data.detalle) {
      if (data.detalle.indexOf(params.term) > -1) {console.log('casa detalle');
        return data;
      }
      else if (data.text.indexOf(params.term) > -1){console.log('casa texto con detalle');
        return data;
      }
    }
    else if (data.text.indexOf(params.term) > -1){console.log('casa texto sin detalle');
      return data;
    }
    // Return `null` if the term should not be displayed
    return null;
}


/*==========================================

      INICIALIZACION DE FORMULARIOS

============================================*/

function initSelFiltYac(){
  cargaLstReg(initSelReg);
  cargaLstTipYac(initSelTipYac);
  cargaLstCrono(initSelCronYac);
}

function initSelFiltMat(){
  cargaLstTipMuest(initSelTipMuest);
  cargaLstTipMat(initSelMat);
}

function initSelFiltDat(){
  initBarraBP();
  initBarraDesv();
  cargaLstMetodos(initSelMetod);
  cargaLstLabos(initSelLab);
}

function initPaneles(){
  $('#panel-busca-yaci').hide();
  $('#panel-sel-filt').hide();
  $('.filt').hide();

  $('#panel-yaci').on('click',function(){
    $('#panel-busca-yaci').show();
    $('#panel-sel-filt').hide();
    $('#tit-buscayaci').hide();
    $('#tit-filtrar').show();
  });
  $('#panel-yaci').one('click',function(){
    cargaLstYac(initBuscaYaci);
  });

  $('#panel-filt').on('click',function(){
    $('#panel-busca-yaci').hide();
    $('#panel-sel-filt').show();
    $('#tit-buscayaci').show();
    $('#tit-filtrar').hide();
  });
  $('#panel-filt').one('click',function(){
    var mostrar = $('#carac-yaci');
    muestraFilt(mostrar,'filt-yac');
  });
}

function muestraFilt(este,selec){
  $('.lst-filt-elem').removeClass('activo');
  $(este).addClass('activo');
  $('.filt').hide();
  $('#'+selec).show(0,'start',function(){
    if (selec == 'filt-yac') {
      var init = $('#selprov').hasClass("select2-hidden-accessible");
      if (!init) {
        initSelFiltYac();
      }
    }
    else if (selec == 'filt-mat') {
      var init = $('#seltipomuest').hasClass("select2-hidden-accessible");
      if (!init) {
        initSelFiltMat();
      }
    }
    else if (selec == 'filt-dat') {
      var init = $('#selmetodo').hasClass("select2-hidden-accessible");
      if (!init) {
        initSelFiltDat();
      }
    }
  });
}

function initBuscaYaci(resultado){
  var data = resultado;
  $('#intro-yaci').select2({
    data : data,
    placeholder: 'Busca un yacimiento',
    allowClear: true,
    theme: "bootstrap",
    width: 'copy'
  });
}

function initSelReg(resultado){
  var data = organizaOpciones(resultado);
  $('#selprov').select2({
    data:data,
    placeholder: 'Selecciona región',
    allowClear: true,
    closeOnSelect: false,
    theme: "bootstrap",
    templateResult: colPorGrupo
  });
}

function initSelTipYac(resultado){
  var data = organizaOpciones(resultado);
  $('#seltipoyac').select2({
    data:data,
    placeholder: 'Selecciona tipos de yacimiento',
    allowClear: true,
    closeOnSelect: false,
    theme: "bootstrap",
    templateResult: colPorGrupo
  });
}

function initSelCronYac(resultado){
  var data = resultado;
  $('#selcronoyac').select2({
    data:data,
    placeholder: 'Selecciona cronología de yacimiento',
    theme: "bootstrap",
    allowClear: true,
    closeOnSelect: false
  });
}

function initSelTipMuest(resultado){
  var data = resultado;
  $('#seltipomuest').select2({
    data:data,
    placeholder: 'Selecciona tipos de muestra',
    allowClear: true,
    theme: "bootstrap",
    closeOnSelect:false
  });
}

function initSelMat(resultado){
  var data = organizaOpciones(resultado);
  $('#seltipomat').select2({
    data:data,
    placeholder: 'Selecciona materiales',
    allowClear: true,
    theme: "bootstrap",
    closeOnSelect:false,
    templateResult: colPorGrupo
  });
}

function initBarraBP(){
	$("#selfecha").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: 8000,
    from: 1000,
    to: 7000,
    step: 50,
    postfix: " BP"
  });
}

function initBarraDesv(){
	$("#seldev").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: 1000,
    from: 100,
    to: 900,
    step: 10,
    postfix: ""
  });
}

function initSelMetod(resultado){
  var data = resultado;
  $('#selmetodo').select2({
    data:data,
    placeholder: 'Selecciona métodos',
    allowClear: true,
    theme: "bootstrap",
    closeOnSelect:false
  });
}

function initSelLab(resultado){
  var data = resultado;
  $('#sellab').select2({
    data:data,
    placeholder: 'Selecciona laboratorios',
    allowClear: true,
    theme: "bootstrap",
    closeOnSelect:false,
    templateResult:detalles,
    //matcher: selecConDetalle
  });
}
