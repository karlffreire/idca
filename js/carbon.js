



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

function cargaLstRang(callback){
  $.ajax({
    url: './datos/cargaRangos.php',
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

/*==========================================

        ORGANIZACIÓN DE DESPLEGABLES

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
//
// function selecConDetalle(params, data) {//no funcina bien
//     // If there are no search terms, return all of the data
//     if ($.trim(params.term) === '') {
//       return data;
//     }
//     // Do not display the item if there is no 'text' property
//     if (typeof data.text === 'undefined') {
//       return null;
//     }
//     if (data.detalle) {
//       if (data.detalle.indexOf(params.term) > -1) {console.log('casa detalle');
//         return data;
//       }
//       else if (data.text.indexOf(params.term) > -1){console.log('casa texto con detalle');
//         return data;
//       }
//     }
//     else if (data.text.indexOf(params.term) > -1){console.log('casa texto sin detalle');
//       return data;
//     }
//     // Return `null` if the term should not be displayed
//     return null;
// }


/*==========================================

      INICIALIZACION DE DESPLEGABLES

============================================*/

var tipoFilSelec = {"filtyac":false,"filtmat":false,"filtdat":false};

function initSelFiltYac(){
  cargaLstReg(initSelReg);
  cargaLstTipYac(initSelTipYac);
  cargaLstCrono(initSelCronYac);
  $('.selfilt-yac').on('select2:select',function(){//si se selecciona alguna tipo de yacimiento
    tipoFilSelec.filtyac = true;
  });
  $('.selfilt-yac').on('select2:unselect',function(e){//si se borran las selecciones
    var selecyac = $('.selfilt-yac').find(':selected');
    if (selecyac.length == 0) {
      tipoFilSelec.filtyac = false;
    }
  });
}

function initSelFiltMat(){
  cargaLstTipMuest(initSelTipMuest);
  cargaLstTipMat(initSelMat);
  $('.selfilt-mat').on('select2:select',function(){
    tipoFilSelec.filtmat = true;
  });
  $('.selfilt-mat').on('select2:unselect',function(e){//si se borran las selecciones
    var selecmat = $('.selfilt-mat').find(':selected');
    if (selecmat.length == 0) {
      tipoFilSelec.filtmat = false;
    }
  });
}

function initSelFiltDat(){
  cargaLstRang(initBarras);
  cargaLstMetodos(initSelMetod);
  cargaLstLabos(initSelLab);
  $('.selfilt-dat').on('select2:select',function(){
    tipoFilSelec.filtdat = true;
  });
  $('.selfilt-dat').on('select2:unselect',function(e){//si se borran las selecciones
    var selecdat = $('.selfilt-dat').find(':selected');
    if (selecdat.length == 0) {
      tipoFilSelec.filtdat = false;
    }
  });
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
     initSelFiltYac();
  });

  $('#carac-mat').on('shown.bs.tab', function (e) {//el evento shown.bs.tab se dispara después de activar la tab. Si se inicializan los select antes de mostrarlos no cogen bien el tamaño
    var init = $('#seltipomuest').hasClass("select2-hidden-accessible");
    if (!init) {
      initSelFiltMat();
    }
  });
  $('#carac-data').on('shown.bs.tab', function(){
    var init = $('#selmetodo').hasClass("select2-hidden-accessible");
    if (!init) {
      initSelFiltDat();
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
  $('#intro-yaci').on('select2:select',function(e){
    buscaDatYaci(e.params.data.id);
  })
}

function initSelReg(resultado){
  var data = organizaOpciones(resultado);
  $('#selprov').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap",
    templateResult: colPorGrupo
  });
}

function initSelTipYac(resultado){
  var data = organizaOpciones(resultado);
  $('#seltipoyac').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap",
    templateResult: colPorGrupo
  });
}

function initSelCronYac(resultado){
  var data = resultado;
  $('#selcronoyac').select2({
    data:data,
    placeholder: '*',
    theme: "bootstrap",
    allowClear: true
  });
}

function initSelTipMuest(resultado){
  var data = resultado;
  $('#seltipomuest').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelMat(resultado){
  var data = organizaOpciones(resultado);
  $('#seltipomat').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap",
    //maximumSelectionLength:3,
    templateResult: colPorGrupo
  });
}

function initBarras(resultado){
  var initfechmin = Math.floor(resultado.fechamininit/100)*100;
  var initfechmax = Math.ceil(resultado.fechamaxinit/100)*100;
  var initdesvmin = Math.floor(resultado.desvmininit/100)*100;
  var initdesvmax = Math.ceil(resultado.desvmaxinit/100)*100;
	$("#selfecha").ionRangeSlider({
    type: "double",
    grid: true,
    min: initfechmin,
    max: initfechmax,
    //max_interval: 5000,
    //drag_interval:true,
    from: 5000,
    to: 10000,
    step: 100,
    postfix: " BP",
    // prettify: function (n) {
    // 	var lg = Math.log(n);
    //     var rLg = +lg.toFixed(2);
    // 	return rLg;
    // },
    onStart:function(data){
      salvarFecha(data);
    },
    onFinish:function(data){
      tipoFilSelec.filtdat = true;
      salvarFecha(data);
    }
  });
	$("#seldev").ionRangeSlider({
    type: "double",
    grid: true,
    min: initdesvmin,
    max: initdesvmax,
    from: 200,
    to: 4500,
    step: 50,
    postfix: "",
    onStart:function(data){
      salvarDesv(data);
    },
    onFinish:function(data){
      tipoFilSelec.filtdat = true;
      salvarDesv(data);
    }
  });
}

function initSelMetod(resultado){
  var data = resultado;
  $('#selmetodo').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelLab(resultado){
  var data = resultado;
  $('#sellab').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap",
    templateResult:detalles
    //matcher: selecConDetalle
  });
}

function salvarFecha(data){
  fechamin = data.from;
  fechamax = data.to;
}

function salvarDesv(data){
  desvmin = data.from;
  desvmax = data.to;
}

function initTabla(){
    var tabla = $('#tab-data').DataTable({
      dataSrc: 'data',
      order: [[1, 'desc']],
      columns: [
        {
            "className": 'detalles-data',
            "orderable": false,
            "data": null,
            "defaultContent": '<i class="fas fa-plus-circle" aria-hidden="true" style="cursor:pointer;"></i>'
        },
        {data:'nombre_yaci'},
        {data:'ubicacion'},
        {data:'tipo_muestra_c14'},
        {data:'mostrar_tipomat',"render":function(data){
            var tipos = data.split('#');
            var txt = '';
            for (var i = 0; i < tipos.length; i++) {
              txt += tipos[i] +'<br>';
            }
            return txt;
          }
        },
        {data: 'fecha',"render":function(data){return '<strong>'+data+' BP</strong>';}},
        {data:'stdev'},
        {data:'metodos_medida'},
        {data:'sigla'}
      ],
      pageLength: 10,
      dom: "<'row'<'col-md-5'i><'col-md-7 pull-right'f>>" +"<'row'<'col-md-12'tr>>" +"<'row'<'col-md-12 lst-dataciones'p>>",
      renderer: "bootstrap",
      language: {
      "search": "_INPUT_",
      "searchPlaceholder": "Search...",
      "info": "Showing _START_ to _END_ out of _TOTAL_ datings"
    }
    });
    tabla.on('click', 'td.detalles-data', function () {
        var tr = $(this).closest('tr');
        var row = tabla.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(extiendeData( row.data()) ).show();
            tr.addClass('shown');
        }
    } );
}

/*==========================================

        PETICIONES DE DATOS

============================================*/

function buscaDatYaci(idyaci){
  selYaci(idyaci,ponDatosTabla);
}

function recogePeticion(){
  if (!tipoFilSelec.filtyac&&!tipoFilSelec.filtmat&&!tipoFilSelec.filtdat) {
    alert(noSelec);
  }
  else{
    $('#piensa').addClass('fa-spin');
    var inityac = $('#selprov').hasClass("select2-hidden-accessible");
    var initmat = $('#seltipomuest').hasClass("select2-hidden-accessible");
    var initdat = $('#selmetodo').hasClass("select2-hidden-accessible");
    var pidereg = '';
    var pidetipo = '';
    var pidecrono = '';
    var pidemuest = '';
    var pidemat = '';
    var pidemetodo = '';
    var pidelab = '';
    //Recogemos los datos, y si no hay, false
    if (inityac) {
      var datosreg = ($('#selprov').find(':selected').length > 0) ? $('#selprov').select2('data') : false;
      var datostipo = ($('#seltipoyac').find(':selected').length > 0) ? $('#seltipoyac').select2('data') : false;
      var datoscrono = ($('#selcronoyac').find(':selected').length > 0) ? $('#selcronoyac').select2('data') : false;
    }
    else if (!inityac) {
      var datosreg = false;
      var datostipo = false;
      var datoscrono = false;
    }
    if (initmat) {
      var datosmuest = ($('#seltipomuest').find(':selected').length > 0) ? $('#seltipomuest').select2('data') : false;
      var datosmat = ($('#seltipomat').find(':selected').length > 0) ? $('#seltipomat').select2('data') : false;
    }
    else if (!initmat) {
      var datosmuest = false;
      var datosmat = false;
    }
    if (initdat) {
      var datosmetodo = ($('#selmetodo').find(':selected').length > 0) ? $('#selmetodo').select2('data') : false;
      var datoslab = ($('#sellab').find(':selected').length > 0) ? $('#sellab').select2('data') : false;
    }
    else if (!initdat) {
      fechamin = '';
      fechamax = '';
      desvmin = '';
      desvmax = '';
      var datosmetodo = false;
      var datoslab = false;
    }
    //rellenamos las variables para pasar al controlador:
    if (datosreg) {
      for (var i = 0; i < datosreg.length; i++) {
        pidereg += datosreg[i].id+'-';
      }
      pidereg = pidereg.substring('-',pidereg.length - 1);
    }
    if (datostipo) {
      for (var i = 0; i < datostipo.length; i++) {
        pidetipo += datostipo[i].id+'-';
      }
      pidetipo = pidetipo.substring('-',pidetipo.length - 1);
    }
    if (datoscrono) {
      for (var i = 0; i < datoscrono.length; i++) {
        pidecrono += datoscrono[i].id+'-';
      }
      pidecrono = pidecrono.substring('-',pidecrono.length - 1);
    }
    if (datosmuest) {
      for (var i = 0; i < datosmuest.length; i++) {
        pidemuest += datosmuest[i].id+'-';
      }
      pidemuest = pidemuest.substring('-',pidemuest.length - 1);
    }
    if (datosmat) {
      for (var i = 0; i < datosmat.length; i++) {
        pidemat += datosmat[i].id+'-';
      }
      pidemat = pidemat.substring('-',pidemat.length - 1);
    }
    if (datosmetodo) {
      for (var i = 0; i < datosmetodo.length; i++) {
        pidemetodo += datosmetodo[i].id+'-';
      }
      pidemetodo = pidemetodo.substring('-',pidemetodo.length - 1);
    }
    if (datoslab) {
      for (var i = 0; i < datoslab.length; i++) {
        pidelab += datoslab[i].id+'-';
      }
      pidelab = pidelab.substring('-',pidelab.length - 1);
    }
    selecDataciones(pidereg,pidetipo,pidecrono,pidemuest,pidemat,fechamin,fechamax,desvmin,desvmax,pidemetodo,pidelab,ponDatosTabla);
  }
}


/*=========================================

            LLAMADAS A DATOS

===========================================*/


function selecDataciones(prov,tipo,crono,tmuestra,tmat,edadmin,edadmax,stdevmin,stdevmax,metod,lab,callback){
  $.ajax({
    url: "./datos/selecDataciones.php",
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

function selYaci(yaci,callback){
  $.ajax({
    url: "./datos/selecYaci.php",
    data:{
      yaci : yaci
    },
    success: callback
  });
}


/*=========================================

           COLOCACIÓN DE DATOS

===========================================*/


function ponDatosTabla(resultado){
  var tabla = $('#tab-data').DataTable();
  tabla.clear().draw();
  tabla.rows.add(resultado.data ); // Add new data
  tabla.columns.adjust().draw(); // Redraw the DataTable
  $('#piensa').removeClass('fa-spin');
  $('.panel-tabla').removeClass('collapse');
  $('#panel-busca-yaci').hide();
  $('#panel-sel-filt').hide();
  $('#tit-buscayaci').show();
  $('#tit-filtrar').show();
}

function extiendeData(datacion){
  var tr = document.createElement('tr');
   var td0 = tr.insertCell(0);
   var td1 = tr.insertCell(1);
       td1.colSpan = 8;
   var div0 = document.createElement('div');
       $(div0).addClass( 'w-100' );
     var div1 = document.createElement('div');
       $(div1).addClass('col-md-12');
       div1.setAttribute("style","padding:0");
       $(div1).addClass( 'loading' );
       $(div1).text( 'loading' );

     div0.appendChild(div1);
   $(td1).html(div0);
   $.ajax( {
       url: './datos/selecDataExt.php',
       data: {
           datacion: datacion.id_datacion_c14
       },
       dataType: 'json',
       success: function ( json ) {
         if (!json.data) {
           $(div1).text( '' );
           var divext = document.createElement('div');
               $(divext).addClass('col-md-12');
               divext.innerHTML = 'No more data available';
               div1.appendChild(divext);
         }
         else{
           $(div1).text( '' );
           var divmat = document.createElement('div');
             $(divmat).addClass('col-md-12');
           var txtmat = '';
           if (json.data.contexto_estratigrafico) {
             txtmat += 'Contexto estratigráfico: '+json.data.contexto_estratigrafico+' | ';
           }
           if (json.data.evaluacion_asociacion) {
             txtmat += 'Evaluación asociación: '+json.data.evaluacion_asociacion+' | ';
           }
           if (json.data.observaciones) {
             txtmat += 'Observaciones: '+json.data.observaciones+' | ';
           }
           $(divmat).html(txtmat);
           var divdat = document.createElement('div');
             $(divdat).addClass('col-md-12');
           var txtdat = '';
           if (json.data.num_datacion) {
             txtdat += 'Datación número: '+json.data.num_datacion+' | ';
           }
           if (json.data.fecha_analisis) {
             txtdat += 'Fecha análisis: '+json.data.fecha_analisis+' | ';
           }
           if (json.data.d13c) {
             txtdat += 'δ13C: '+json.data.d13c+' | ';
           }
           if (json.data.d15n) {
             txtdat += 'δ15N: '+json.data.d15n+' | ';
           }
           if (json.data.c_n) {
             txtdat += 'C/N: '+json.data.c_n+' | ';
           }
           if (json.data.cor_frac_isotopo) {
             txtdat += 'Corrección por fracción de isótopo: '+json.data.cor_frac_isotopo+' | ';
           }
           $(divdat).html(txtdat);
           div1.appendChild(divmat);
           div1.appendChild(divdat);
           if (json.data.bibliografia) {
             var divbib = document.createElement('div');
               $(divbib).addClass('col-md-12');
             var txtrefs = '';
             var refs = json.data.bibliografia.split('#');
             for (var i = 0; i < refs.length; i++) {
               txtrefs += refs[i]+'<br>'
             }
             $(divbib).html(txtrefs);
             div1.appendChild(divbib);
           }
         }
         $(div1).removeClass( 'loading' );
       }
   } );
   return tr;
}
