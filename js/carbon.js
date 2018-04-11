



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

/*=========================================

       LLAMADAS A BASE DE datos

===========================================*/

function cargaYacCronoTipo(prov,tipo,crono,callback){
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

function cargaYacDat(tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
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

function cargaYaci(yaci,callback){
  $.ajax({
    url: "./datos/selecYaci.php",
    data:{
      yaci : yaci
    },
    success: callback
  });
}

function cargaYacTodo(prov,tipo,crono,tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
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

function colPorGrupo (o) {
  // if (!o.disabled) {
  //   if (!o.id) {console.log(o);
  //     var bloque = document.createElement('div');
  //     $(bloque).addClass('varcol');
  //     var encabeza = document.createElement('p');
  //     $(encabeza).html(o.text);
  //     bloque.appendChild(encabeza);
  //     for (var i = 0; i < o.children.length; i++) {
  //       var item = document.createElement('p');
  //       $(item).html(o.children[i].text);
  //       bloque.appendChild(item);
  //       console.log(o.children[i]);
  //     }
  //   }
  // return $(bloque);
  // }
  if (!o.id) {
    return $('<span style="color:#8A0808">'+o.text+'</span>');
  }
  return $(
      '<span>'+o.text+'</span>'
  );

  // return o.text;

};

/*==========================================

      COLOCACION DE datos

============================================*/

function ponTema(resultado){
  console.log(resultado);
}

/*==========================================

      INICIALIZACION DE FORMULARIOS

============================================*/

function initSelFiltYac(){
  cargaLstReg(initSelReg);
  initSelTipYac();
  initSelCronYac();
}

function initSelFiltMat(){
  initSelTipMuest();
  initSelMat();
}

function initSelFiltDat(){
  initBarraBP();
  initBarraDesv();
  initSelMetod();
  initSelLab();
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
    theme: "bootstrap"
  });
}

function initSelReg(resultado){
  var data = organizaOpciones(resultado);
  $('#selprov').select2({
    data:data,
    placeholder: 'Selecciona región',
    allowClear: true,
    theme: "bootstrap",
    templateResult: colPorGrupo
  });
}

function initSelTipYac(){
  $('#seltipoyac').select2({
    placeholder: 'Selecciona tipos de yacimiento',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelCronYac(){
  $('#selcronoyac').select2({
    placeholder: 'Selecciona cronología de yacimiento',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelTipMuest(){
  $('#seltipomuest').select2({
    placeholder: 'Selecciona tipos de muestra',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelMat(){
  $('#seltipomat').select2({
    placeholder: 'Selecciona materiales',
    allowClear: true,
    theme: "bootstrap"
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

function initSelMetod(){
  $('#selmetodo').select2({
    placeholder: 'Selecciona métodos',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelLab(){
  $('#sellab').select2({
    placeholder: 'Selecciona laboratorios',
    allowClear: true,
    theme: "bootstrap"
  });
}
