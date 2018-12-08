



/*=========================================

           CARGA DE LISTADOS

//NOTA: Cacheado HTTP habilitado en el archivo de configuración de PHP (/opt/lampp/etc/php.ini), línea 1641. Poner en nocache para volver a la configuración original
===========================================*/


function cargaYacis(callback){
  $.ajax({
    url: './datos/cargaYacis.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los yacimientos');
  			}
  		}
  });
}

function cargaLstReg(callback){
  $.ajax({
    url: './datos/cargaRegiones.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando las regiones');
  			}
  		}
  });
}

function cargaLstTipYac(callback){
  $.ajax({
    url: './datos/cargaTiposYac.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los tipos de yacimientos');
  			}
  		}
  });
}

function cargaLstSubtipYac(callback){
  $.ajax({
    url: './datos/cargaSubtiposYac.php',
    // data:{
    //   tipos : tipos
    // },
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los tipos de yacimientos');
  			}
  		}
  });
}

function cargaLstCrono(callback){
  $.ajax({
    url: './datos/cargaCronos.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando las cronologías');
  			}
  		}
  });
}

function cargaLstTipMuest(callback){
  $.ajax({
    url: './datos/cargaTiposMuestra.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los tipos de muestras');
  			}
  		}
  });
}

function cargaLstTipMat(callback){
  $.ajax({
    url: './datos/cargaTiposMaterial.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los tipos de material');
  			}
  		}
  });
}

function cargaLstTaxFam(callback){
  $.ajax({
    url: './datos/cargaTaxFamilia.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los tipos de material');
  			}
  		}
  });
}

function cargaLstTaxGen(callback){
  $.ajax({
    url: './datos/cargaTaxGenero.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los tipos de material');
  			}
  		}
  });
}

function cargaLstTaxEsp(callback){
  $.ajax({
    url: './datos/cargaTaxEspecie.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los tipos de material');
  			}
  		}
  });
}

function cargaLstRang(callback){
  $.ajax({
    url: './datos/cargaRangos.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los rangos');
  			}
  		}
  });
}

function cargaLstMetodos(callback){
  $.ajax({
    url: './datos/cargaMetodos.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los métodos');
  			}
  		}
  });
}

function cargaLstLabos(callback){
  $.ajax({
    url: './datos/cargaLabos.php',
    success: function(response){
  			if (response) {
  				callback(response);
  			}
  			else{
  				alert('Error cargando los laboratorios');
  			}
  		}
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
    // for (var j = 0; j < hijos.length; j++) {
    //   delete hijos[j].grupo;
    // }
  }
  return gruposOpciones;
}

function colPorGrupo (data) {
 if (!data.id) {
    return $('<span style="color:#8A0808;font-size:1rem;">'+data.text+'</span>');
  }
  return $(
      '<span>'+data.text+'</span>'//AQUÍ DEBERÍA LANZAR UNA BÚSQUEDA DE HIJOS. SI HAY RESULTADO LOS PONGO, SI NO, LO SELECCIONO
  );
};

function detalles (data) {
  if (data.detalle){
    return $(
      '<span>'+data.text+'</span><br><span class="labo-completo">'+data.detalle+'</span>'
    );
  }
  return $(
      '<span>'+data.text+'</span>'
  );
};

/*==========================================

      INICIALIZACION DE ELEMENTOS

============================================*/

var tipoFilSelec = {"filtyac":false,"filtmat":false,"filtdat":false};

function initSelFiltYac(){
  cargaLstReg(initSelReg);
  cargaLstTipYac(initSelTipYac);
  cargaLstSubtipYac(initSelSubtipYac);
  cargaLstCrono(initSelCronYac);
  $('.selfilt-yac').on('select2:select',function(){//si se selecciona alguna tipo de yacimiento
    tipoFilSelec.filtyac = true;
    habLimpia();
  });
  $('.selfilt-yac').on('select2:unselect',function(e){//si se borran las selecciones
    var selecyac = $('.selfilt-yac').find(':selected');
    if (selecyac.length == 0) {
      tipoFilSelec.filtyac = false;
      deshabLimpia();
    }
  });
}

function initSelFiltMat(){
  cargaLstTipMuest(initSelTipMuest);
  cargaLstTipMat(initSelMat);
  initSelTipTax();
  initSelTax();
  $('.selfilt-mat').on('select2:select',function(){
    tipoFilSelec.filtmat = true;
    habLimpia();
  });
  $('.selfilt-mat').on('select2:unselect',function(e){//si se borran las selecciones
    var selecmat = $('.selfilt-mat').find(':selected');
    if (selecmat.length == 0) {
      tipoFilSelec.filtmat = false;
      deshabLimpia();
    }
  });
}

function initSelFiltDat(){
  //cargaLstRang(initBarras);//Esto es para cargar los máximos y mínimos en función de los datos existentes
  initBarrasPrefijado();
  cargaLstMetodos(initSelMetod);
  cargaLstLabos(initSelLab);
  $('.selfilt-dat').on('select2:select',function(){
    tipoFilSelec.filtdat = true;
    habLimpia();
  });
  $('.selfilt-dat').on('select2:unselect',function(e){//si se borran las selecciones
    var selecdat = $('.selfilt-dat').find(':selected');
    if (selecdat.length == 0) {
      tipoFilSelec.filtdat = false;
      deshabLimpia();
    }
  });
}

function cierraCita(){
  $('#cita').popover('hide');
}

function initPaneles(){
  $('#cita').popover(
     {
       template : '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-header" style="color:#454545;padding-left:10px"></div><div onclick="javascript:cierraCita();" class="cierra-cita">X</div><div class="popover-body"></div></div>'
     }
  );

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
    initBuscaYaci();
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
  $('#fila-mapa').on('shown.bs.collapse',function(e){
    $(this).addClass('d-flex');
    var arrids = $('#map').data('yacids');
    muestraPuntos(arrids);//a ver cómo hago que sólo se ejecute la primera vez después de una búsqueda
    mapa.updateSize();
    $('#tira-mapa').html(ocultarMapa);
  });
  $('#fila-mapa').on('hide.bs.collapse',function(e){
    $(this).removeClass('d-flex');
    $('#tira-mapa').html(verMapa);
  });
}

var mapaMostrado = false;

function initBuscaYaci(){
  var data = [];
  var features = featsArqueo;
  for (var j = 0; j < features.length; j++) {
    var obj = {};
    obj.id = features[j].get('id');
    obj.text = features[j].get('text');
    data.push(obj);
  }
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
    //maximumSelectionLength: 9,
    templateResult: colPorGrupo
  });
}

function initSelTipYac(resultado){
  var data = resultado;
  $('#seltipoyac').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap",
    templateResult: colPorGrupo
  })
  .on('select2:unselect',function(e){
    filtraSubtipos(e.params.data);
  })
  .on('select2:select',function(e){
    filtraSubtipos(e.params.data);
  });
  var tipReg = new Option('Tipos regionales', 9999, false, false);
  $('#seltipoyac').append(tipReg).trigger('change');
}

function filtraSubtipos(datEv){
  var tipos = ($('#seltipoyac').find(':selected').length > 0) ? $('#seltipoyac').select2('data') : false;
  if (tipos) {
    ponSubtipYac();
  }
  else {
    $('#selsubtipoyac').empty();
  }
}

function ponSubtipYac(){
  var tipos = [];
  var tiposSelec = ($('#seltipoyac').find(':selected').length > 0) ? $('#seltipoyac').select2('data') : false;
  for (var i = 0; i < tiposSelec.length; i++) {
    tipos.push(tiposSelec[i].id);
  }
  if (tiposSelec) {
    var listaSubtipSelec = $.grep(listaSubtiposYac,function(subtip){return tipos.indexOf(subtip.padre) != -1;})
    $('#selsubtipoyac').empty();
    $('#selsubtipoyac').select2('destroy');//Me parece una chapuza, pero no veo cómo hacerlo bien con el puto select2
    $('#selsubtipoyac').select2({
      data: organizaOpciones(listaSubtipSelec),
      placeholder: '*',
      allowClear: true,
      theme: "bootstrap",
      templateResult: colPorGrupo
    });
  }
  else {
    $('#selsubtipoyac').empty();
  }
}

function initSelSubtipYac(resultado){
  listaSubtiposYac = resultado;
  $('#selsubtipoyac').select2({
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

function selTaxones(){
  var chk = document.getElementById('chk-tax').checked;
  if (chk) {
    habilitaTax();
  }
  else {
    deshabTax();
  }
}

function habilitaTax(){
  $('#seltipotax').prop("disabled",false);
  $('#seltipomat').prop("disabled",true);
  $('#seltipomat').val(null).trigger('change');
  $('#seltipotax').select2('open');
}

function deshabTax(){
  $('#seltipotax').val(null).trigger('change');
  $('#seltax').val(null).trigger('change');
  $('#seltipomat').prop("disabled",false);
  $('#seltipotax').prop("disabled",true);
  $('#seltax').prop("disabled",true);
}

function initSelMat(resultado){
  var data = resultado;
  $('#seltipomat').select2({
    data:data,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap"
  });
}

function initSelTipTax(){
  var data = [{id:0,text:""},{id:1,text:"Familia"},{id:2,text:"Género"},{id:3,text:"Especie"}];
  $('#seltipotax').select2({
    disabled: true,
    data:data,
    placeholder: '1',
    allowClear: true,
    theme: "bootstrap"
  })
  .on('select2:select',function(e){
    $('#seltax').prop("disabled",false);
    var data = e.params.data;
    if (data.id == 1) {
      cargaLstTaxFam(ponDatosTax);
    }
    else if (data.id == 2) {
      cargaLstTaxGen(ponDatosTax);
    }
    else if (data.id == 3) {
      cargaLstTaxEsp(ponDatosTax);
    }
    else {
        $('#seltax').empty();
    }
  });
}

function ponDatosTax(resultado){
  $('#seltax').empty();
  for (var i = 0; i < resultado.length; i++) {
    var nuevaOpcion = new Option(resultado[i].text, resultado[i].id, false, false);
    $('#seltax').append(nuevaOpcion);
  }
  $('#seltax').trigger('change');
}

function initSelTax(){
  $('#seltax').select2({
    disabled: true,
    placeholder: '*',
    allowClear: true,
    theme: "bootstrap"
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
    from: initfechmin,
    to: initfechmax,
    step: 100,
    postfix: " BP",
    onFinish:function(data){
      tipoFilSelec.filtdat = true;
      salvarFecha(data);
      habLimpia();
    }
  });
	$("#seldev").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: initdesvmax,
    from: 0,
    to: initdesvmax,
    step: 50,
    postfix: "",
    onFinish:function(data){
      tipoFilSelec.filtdat = true;
      salvarDesv(data);
      habLimpia();
    }
  });
}

function initBarrasPrefijado(resultado){
	$("#selfecha").ionRangeSlider({
    type: "double",
    grid: true,
    grid_num: 17,
    min: 1500,
    max: 10000,
    from: 100,
    to: 10000,
    step: 100,
    postfix: " BP",
    onFinish:function(data){
      tipoFilSelec.filtdat = true;
      salvarFecha(data);
      habLimpia();
    }
  });
	$("#seldev").ionRangeSlider({
    type: "double",
    grid: true,
    grid_num: 5,
    min: 0,
    max: 200,
    from: 0,
    to: 200,
    step: 10,
    postfix: "",
    onFinish:function(data){
      tipoFilSelec.filtdat = true;
      salvarDesv(data);
      habLimpia();
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

fechamin = false;
fechamax = false;
desvmin = false;
desvmax = false;

function salvarFecha(data){
  fechamin = data.from;
  fechamax = data.to;
}

function salvarDesv(data){
  desvmin = data.from;
  desvmax = data.to;
}

function fechaHoy(){
  var d = new Date();
  return d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
}

function initTabla(){
    var tabla = $('#tab-data').DataTable({
      buttons: [
            {
                extend: 'copy',
                title:'Dataciones C14 de la Península Ibérica',
                messageTop:function (){fechaHoy();
                  var ficha = $('#ficha-selec').text();
                  return fechaHoy()+'\nCC-BY info copyright\n'+'Citation: IDEArq (n.d.).  IDEArq-C14: Base de Datos de Dataciones Radiocarbónicas de la Península Ibérica (Archivo Antonio Gilman). IDEArq: Infraestructura de Datos Espaciales de Investigación Arqueológica. Madrid: CSIC. Disponible en: http://www.idearqueologia.org/idearq_c14/. ['+fechaHoy()+']\n'+ficha;
                },
                exportOptions: {
                    columns: [1,2,3,4,5,6,7]
                }
            },
           {
               extend: 'pdf',
               title:'Dataciones C14 de la Península Ibérica',
               messageTop:function (){
                 var ficha = $('#ficha-selec').text();
                return fechaHoy()+'\nCC-BY info copyright\n'+'Citation: IDEArq (n.d.).  IDEArq-C14: Base de Datos de Dataciones Radiocarbónicas de la Península Ibérica (Archivo Antonio Gilman). IDEArq: Infraestructura de Datos Espaciales de Investigación Arqueológica. Madrid: CSIC. Disponible en: http://www.idearqueologia.org/idearq_c14/. ['+fechaHoy()+']\n'+ficha;
               },
               exportOptions: {
                   columns: [1,2,3,4,5,6,7]
               }
           },
           {
               extend: 'print',
               title:'Dataciones C14 de la Península Ibérica',
               messageTop:function (){
                 var ficha = $('#ficha-selec').text();
                return fechaHoy()+'\nCC-BY info copyright\n'+'Citation: IDEArq (n.d.).  IDEArq-C14: Base de Datos de Dataciones Radiocarbónicas de la Península Ibérica (Archivo Antonio Gilman). IDEArq: Infraestructura de Datos Espaciales de Investigación Arqueológica. Madrid: CSIC. Disponible en: http://www.idearqueologia.org/idearq_c14/. ['+fechaHoy()+']\n'+ficha;
               },
               exportOptions: {
                   columns: [1,2,3,4,5,6,7]
               }
           }
       ],
      dataSrc: 'data',
      order: [[1, 'desc']],
      columns: [
        {
            "className": 'detalles-data',
            "orderable": false,
            "data": null,
            "defaultContent": '<i class="fas fa-plus-circle icono-tabla" aria-hidden="true"></i>'
        },
        {
          name:'fecha',
          data: 'fecha',"render":function(data,type,row){
            if (type === 'display' || type === 'filter') {
              return '<strong>'+row.fecha+' ± '+ valonull(row.stdev) +' BP</strong>';
            }
            return data;
          }
        },
        {name:'sigla',data:'sigla',"render":function(data,type,row){
          if (type === 'display' || type === 'filter') {
            return row.sigla+'-'+row.num_dat;
          }
          return data;
        }},
        {name:'tipo_muestra_c14',data:'tipo_muestra_c14'},
        {name:'mostrar_tipomat',data:'mostrar_tipomat',"render":function(data){
            var tipos = data.split('#');
            var txt = '';
            for (var i = 0; i < tipos.length; i++) {
              txt += tipos[i] +'<br>';
            }
            return txt;
          }
        },
        {name:'metodos_medida',data:'metodos_medida'},
        {name:'nombre_yaci',data: 'nombre_yaci',"render":function(data,type,row){
              return '<div class="row"><div class="col-md-2"><i class="fas fa-map-marker-alt icono-tabla" onclick="javascript:abrePunto('+row.id_yaci+',irAPunto)" title="'+titIrA+'"></i></div><div class="col-md-10">'+data+'</div></div>';
          }
        },
        {name:'ubicacion',data:'ubicacion'}
      ],
      pageLength: 10,
      dom: "<'row'<'col-md-5'i><'col-md-7 pull-right'f>>" +"<'row'<'col-md-12'tr>>" +"<'row'<'col-md-6'B><'col-md-6 lst-dataciones'p>>",
      renderer: "bootstrap",
      language: {
      "search": "Filtrar resultados por texto ",
      "searchPlaceholder": "Escriba el filtro...",
      "info": "<span class='caption'><strong> _TOTAL_ dataciones</strong> | Mostrando _START_ a _END_</span>"
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

function initMapa(){
  var iconoMapaLlave = document.createElement('i');
    $(iconoMapaLlave).addClass('fas fa-globe');
  var osm = new ol.layer.Tile({
            source: new ol.source.OSM(),
            attributions:'OL contributors'
          });
  var teselas = new ol.layer.Tile({
	      source: new ol.source.XYZ({
	      	attributions: 'Teselas USIG',
	        url: 'http://161.111.72.12:8080/styles/light/{z}/{x}/{y}.png'
	      })
	    });
	teselas.set('name','mapabase');
  mapa = new ol.Map({
      controls: [
        new ol.control.ScaleLine(),
        new ol.control.OverviewMap({
          layers:[teselas],
          className: 'ol-overviewmap ol-custom-overviewmap',
          label: iconoMapaLlave
        })

      ],
	    layers: [teselas],
	    view: new ol.View({
	      projection: 'EPSG:3857',
	      center: [-288976.121475105, 4868797.98060151],
        maxZoom : 12,//revisar a qué escala corresponde
        minZoom: 2,
	      zoom: 5,
        extent: [-3268931,2703396,2888198,7220756]
	    }),
	    target: 'map'
  	});
    $('#fila-mapa').addClass('collapse');
    var popup = new ol.Overlay({
        element: document.getElementById('popup'),
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
    });
    mapa.addOverlay(popup);
    mapa.on('click', function(evt) {
   		var feature = mapa.forEachFeatureAtPixel(evt.pixel,
  	    function(feature, layer) {
  	      if (layer.get('name') == 'yacis') {
    			 	if (feature) {
    			       var coordinate = evt.coordinate;
    			 	     muestraPopup(coordinate,feature);
    				}
    	        	return feature;
  	    	}
  	    });
    	});
      mapa.on('postrender', function(e) {
           let popover = $('#popup').data('bs.popover');
           if(!popover) return;
           let popper = popover._popper;
           if(!popper) return;
         popper.scheduleUpdate();
       });
      document.getElementById('creditos-base').innerHTML = '© <a target=_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.';//osm.getSource().attributions_[0].html_;
}

function limpiaSelec(){
  if (tipoFilSelec.filtyac) {
    $('.selfilt-yac').val(null).trigger('change');
    $('.selfilt-yac').trigger({
        type: 'select2:unselect'
    });
    tipoFilSelec.filtyac = false;
  }
  if (tipoFilSelec.filtmat) {
    $('.selfilt-mat').val(null).trigger('change');
    $('.selfilt-mat').trigger({
        type: 'select2:unselect'
    });
    deshabTax();
    document.getElementById('chk-tax').checked = false;
    tipoFilSelec.filtmat = false;
  }
  if (tipoFilSelec.filtdat) {
    var fechas = $("#selfecha").data("ionRangeSlider");
    fechas.reset();
    var desv = $("#seldev").data("ionRangeSlider");
    desv.reset();
    fechamin = false;
    fechamax = false;
    desvmin = false;
    desvmax = false;
    $('.selfilt-dat').val(null).trigger('change');
    $('.selfilt-dat').trigger({
        type: 'select2:unselect'
    });
    tipoFilSelec.filtdat = false;
  }
}

function deshabLimpia(){
  if (!tipoFilSelec.filtyac&&!tipoFilSelec.filtmat&&!tipoFilSelec.filtdat) {
    $('#limp-filt').prop( "disabled", true );
  }
}

function habLimpia(){
  $('#limp-filt').prop( "disabled", false );
}

/*==========================================

        PETICIONES DE DATOS

============================================*/

function buscaDatYaci(idyaci){
  $('#ficha-selec').empty();
  $('#fila-mapa').collapse('hide');
  selYaci(idyaci,ponDatosTabla);
  ponFlechas();
}

function recogePeticion(){
  var datosreg = ($('#selprov').find(':selected').length > 0) ? $('#selprov').select2('data') : false;
  if (!tipoFilSelec.filtyac&&!tipoFilSelec.filtmat&&!tipoFilSelec.filtdat) {
    alert(noSelec);
    return;
  }
  else{
    $('#piensa').addClass('fa-spin');
    $('#fila-mapa').collapse('hide');
    var inityac = tipoFilSelec.filtyac;
    var initmat = tipoFilSelec.filtmat;
    var initdat = tipoFilSelec.filtdat;
    var pidereg = '';
    var pidetipo = '';
    var pidecrono = '';
    var pidemuest = '';
    var pidemat = '';
    var pidemetodo = '';
    var pidelab = '';
    //Recogemos los datos, y si no hay, false
    if (inityac) {
      var datostipo = ($('#seltipoyac').find(':selected').length > 0) ? $('#seltipoyac').select2('data') : false;
      var datossubtipo = ($('#selsubtipoyac').find(':selected').length > 0) ? $('#selsubtipoyac').select2('data') : false;
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
      var datostax = ($('#seltax').find(':selected').length > 0) ? $('#seltax').select2('data') : false;
    }
    else if (!initmat) {
      var datosmuest = false;
      var datosmat = false;
      var datostax = false;
    }
    if (initdat) {
      var datosmetodo = ($('#selmetodo').find(':selected').length > 0) ? $('#selmetodo').select2('data') : false;
      var datoslab = ($('#sellab').find(':selected').length > 0) ? $('#sellab').select2('data') : false;
    }
    else if (!initdat) {
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
      for (var i = 0; i < datostipo.length; i++) {//buscar si hay seleccionados hijos para ponerlos. Si no, el padre
        if (datossubtipo) {
          var subtipos = $.grep(datossubtipo,function(subtipo){return subtipo.padre == datostipo[i].id;})
          if (subtipos.length > 0) {
            for (var j = 0; j < subtipos.length; j++) {
              pidetipo += subtipos[j].id+'-';
            }
          }
          else {
            pidetipo += datostipo[i].id+'-';
          }
        }
        else {
          pidetipo += datostipo[i].id+'-';
        }
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
    if (datostax) {
      for (var i = 0; i < datostax.length; i++) {
        pidemat += datostax[i].id+'-';
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
    fichaSelec(datosreg, datostipo, datossubtipo, datoscrono, datosmuest, datosmat, datostax, datosmetodo, datoslab);
    selecDataciones(pidereg,pidetipo,pidecrono,pidemuest,pidemat,pidemetodo,pidelab,ponDatosTabla);
  }
}


/*=========================================

        LLAMADAS PARA CONSULTAS

===========================================*/


function selecDataciones(prov,tipo,crono,tmuestra,tmat,metod,lab,callback){
  $.ajax({
    url: "./datos/selecDataciones.php",
    data:{
      prov : prov,
      tipo : tipo,
      crono : crono,
      tmuestra : tmuestra,
      tmat : tmat,
      edadmin : function (){return fechamin ? fechamin : '';},
      edadmax : function (){ return fechamax ? fechamax : '';},
      stdevmin : function (){return desvmin ? desvmin : '';},
      stdevmax : function (){ return desvmax ? desvmax : '';},
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

function fichaSelec(datosreg, datostipo,datossubtipo, datoscrono, datosmuest, datosmat, datostax, datosmetodo, datoslab){
  $('#ficha-selec').empty();
  var divficha = document.createElement('div');
    divficha.setAttribute('class','lst-flt-selec');
  if (datosreg) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datosreg.length; i++) {
      txt += datosreg[i].text+', ';
    }
    p.innerHTML = '<em>'+etiProv+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datostipo) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datostipo.length; i++) {
      if (datossubtipo) {
        var subtipos = $.grep(datossubtipo,function(subtipo){return subtipo.padre == datostipo[i].id;})
        if (subtipos.length > 0) {
          for (var j = 0; j < subtipos.length; j++) {
            txt += subtipos[j].text+', ';
          }
          txt = txt.replace(/,\s*$/, "") + ' ('+datostipo[i].text+') ';
        }
        else {
          txt += datostipo[i].text+', ';
        }
      }
      else {
        txt += datostipo[i].text+', ';
      }
    }
    p.innerHTML = '<em>'+etiTipoYac+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datoscrono) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datoscrono.length; i++) {
      txt += datoscrono[i].text+', ';
    }
    p.innerHTML = '<em>'+etiCronoYac+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datosmuest) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datosmuest.length; i++) {
      txt += datosmuest[i].text+', ';
    }
    p.innerHTML = '<em>'+etiTipoMuest+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datosmat) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datosmat.length; i++) {
      txt += datosmat[i].text+', ';
    }
    p.innerHTML = '<em>'+etiTipoMat+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datostax) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datostax.length; i++) {
      txt += datostax[i].text+', ';
    }
    p.innerHTML = '<em>'+etiTax+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  var pfechas = document.createElement('p');
  //if ((fechamin != '') || (fechamax != '')) {
  if (fechamin|| fechamax){
    pfechas.innerHTML = '<em>'+etiFecha+'</em>:<br>' + fechamin+'-'+fechamax+' BP';
  }
  if (desvmin || desvmax) {
    pfechas.innerHTML += '| σ: '+desvmin+'-'+desvmax;
  }
  divficha.appendChild(pfechas);
  if (datosmetodo) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datosmetodo.length; i++) {
      txt += datosmetodo[i].text+', ';
    }
    p.innerHTML = '<em>'+etiMetodo+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  if (datoslab) {
    var p = document.createElement('p');
    var txt = '';
    for (var i = 0; i < datoslab.length; i++) {
      txt += datoslab[i].text+', ';
    }
    p.innerHTML = '<em>'+etiLab+'</em>:<br>' + txt.replace(/,\s*$/, "");
    divficha.appendChild(p);
  }
  $('#ficha-selec').append(divficha);
  ponFlechas();
}

function ponFlechas(){
  $('#flechas').removeClass('collapse');
}

function resalta(iddiv){
  $(iddiv).addClass('resalta');
  setTimeout(function(){ $(iddiv).removeClass('resalta'); }, 1500);
}

function ponDatosTabla(resultado){
  mapaMostrado = false;
  var arrids = [];
  var datos = [];
  for (var i = 0; i < resultado.data.length; i++) {
    arrids.push(resultado.data[i].id_yaci);
    var obj = {};
    obj.fecha = Number(resultado.data[i].fecha);
    obj.stdev = Number(resultado.data[i].stdev);
    obj.nombre_yaci = resultado.data[i].nombre_yaci;
    datos.push(obj);
  }
  var tabla = $('#tab-data').DataTable();
  tabla.clear().draw();
  tabla.search( '' ).draw();
  tabla.rows.add(resultado.data );
  tabla.columns.adjust().draw();
  $('#piensa').removeClass('fa-spin');
  $('#resultados').removeClass('collapse');
  $('#panel-busca-yaci').hide();
  $('#panel-sel-filt').hide();
  $('#tit-buscayaci').show();
  $('#tit-filtrar').show();
  window.location.href = '#fila-tabla';
  grafico(datos);
  $('#map').data('yacids',arrids);
  if (resultado.data.length == 0){
    tabla.buttons().disable();
  }
  else{
    tabla.buttons().enable();
  }
}

function muestraPuntos(ids){
  if (!mapaMostrado) {
    var overlays = mapa.getOverlays();
    if (overlays) {
      cierraPops();
      if (overlays.item(1)) {
        var over_txtyac = overlays.item(1);
        if (over_txtyac.get('position') != 'undefined') {
          overlays.item(1).unset('position');
        }
      }
    }
    var capas = mapa.getLayers().getArray();
    var capayac;
    var yacisFltSource = new ol.source.Vector({
    });
    for (var i = 0; i < capas.length; i++) {
      var nomcapa = capas[i].get('name');
      if (nomcapa == 'yacis') {capayac = capas[i];}
    }
    var features = yacisSource.getFeatures();
    for (var i = 0; i < features.length; i++) {
      var idfeat = features[i].get('id');
      if (ids.indexOf(idfeat) != -1) {
        yacisFltSource.addFeature(features[i]);
      }
    }
    var agrupaYacis = new ol.source.Cluster({
      distance: 20,
      source: yacisFltSource
    });
    capayac.setSource(agrupaYacis);
    if (ids.length > 0) {
      mapa.getView().fit(yacisFltSource.getExtent());
    }
  }
  mapaMostrado = true;
}

function extiendeData(datacion){
  var tr = document.createElement('tr');
   var td0 = tr.insertCell(0);
   var td1 = tr.insertCell(1);
       td1.colSpan = 7;
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
             $(divmat).addClass('data-ext');
           var txtmat = '';
           if (json.data.contexto_estratigrafico) {
             txtmat += 'Contexto estratigráfico: '+json.data.contexto_estratigrafico+' |';
           }
           if (json.data.evaluacion_asociacion && json.data.evaluacion_asociacion != 'POR ASIGNAR') {
             txtmat += ' Evaluación asociación: '+json.data.evaluacion_asociacion+' |';
           }
           if (json.data.observaciones) {
             txtmat += ' Observaciones: '+json.data.observaciones+' |';
           }
           $(divmat).html('<em>Info material:</em> '+txtmat.substring(0, txtmat.length - 1));
           var divdat = document.createElement('div');
             $(divdat).addClass('col-md-12');
             $(divdat).addClass('data-ext');
           var txtdat = '';
           if (json.data.fecha_analisis) {
             txtdat += ' Fecha análisis: '+json.data.fecha_analisis+' |';
           }
           if (json.data.d13c) {
             txtdat += ' δ13C: '+json.data.d13c+' |';
           }
           if (json.data.d15n) {
             txtdat += ' δ15N: '+json.data.d15n+' |';
           }
           if (json.data.c_n) {
             txtdat += ' C/N: '+json.data.c_n+' |';
           }
           if (json.data.cor_frac_isotopo) {
             txtdat += ' Corrección por fracción de isótopo: '+json.data.cor_frac_isotopo+' |';
           }
           if (json.data.observaciones) {
             txtdat += ' Observaciones: '+json.data.observaciones_dat+' |';
           }
           $(divdat).html('<em>Info datación:</em> '+txtdat.substring(0, txtdat.length - 1));
           div1.appendChild(divmat);
           div1.appendChild(divdat);
           if (json.data.bibliografia) {
             var divbib = document.createElement('div');
               $(divbib).addClass('col-md-12');
               $(divbib).addClass('data-ext');
             var txtrefs = '<ul>';
             var refs = json.data.bibliografia.split('#');
             for (var i = 0; i < refs.length; i++) {
               txtrefs += '<li>'+refs[i]+'</li>'
             }
             txtrefs += '</ul>';
             $(divbib).html('<em>Referencias bibliográficas:</em> '+txtrefs);
             div1.appendChild(divbib);
           }
         }
         $(div1).removeClass( 'loading' );
       }
   } );
   return tr;
}

function cierraPops(){
	var elementos = mapa.getOverlays();
		elementos.forEach(function(element,index,array){
			var elemento = element.getElement();
			$(elemento).popover('dispose');
		})
}

function grafico(data){
  if (data.length > 20) {
    histograma(data);
  }
  else if (data.length > 1 && data.length <=20){
    dispersion(data);
  }
  else{
    var graf = document.getElementById('hst');
    d3.select(graf).selectAll("*").remove();
  }
  resalta('.lst-flt-selec');
}

function dispersion(data){
  var graf = document.getElementById('hst');
  d3.select(graf).selectAll("*").remove();
  var fechas = [];
  var maxs = [];
  var mins = [];
  for (var i = 0; i < data.length; i++) {
    maxs.push(data[i].fecha+data[i].stdev);
    mins.push(data[i].fecha-data[i].stdev);
    fechas.push(data[i].fecha);
  }
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {return d.fecha+' ± '+d.stdev+' BP<br>'+d.nombre_yaci;});

  var svg = d3.select(graf),
    margin = {top: 10, right: 30, bottom: 30, left: 70},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var extent = d3.extent(data);
  var y = d3.scaleLinear()
    .domain([d3.min(mins),d3.max(maxs)]).nice()
    .range([height,0]);

  function make_y_gridlines() {
      return d3.axisLeft(y)
          .ticks()
  }
  svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate("+margin.left+","+margin.top+")")
    .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
    );

  data.sort(ordenaFechas);
  var pasoX = width / data.length;

  var grupo = svg.selectAll("g.dataciones").data(data);
  var puntolinea = grupo.enter().append('g')//puntos y líneas irán en el mismo grupo
    .attr('class','grupo-datacion');
  svg.call(tip);
   puntolinea.append("line")
         .attr('class','linea')
         .attr("x1", function(d,i) {return pasoX*i+margin.left+10; })
         .attr("x2", function(d,i) {return pasoX*i+margin.left+10; })
         .attr("y1", function(d) {return y(d.fecha+d.stdev)+margin.top;})
         .attr("y2", function(d) {return y(d.fecha-d.stdev)+margin.top; });
   puntolinea.append("circle")
         .attr("class", "punto")
         .attr("cy", function(d) {return y(d.fecha)+margin.top;})
         .attr("cx", function(d,i) {return pasoX*i+margin.left+10; })
         .attr("r", 4);
   puntolinea.on('mouseover', tip.show)
     .on('mouseout', tip.hide);

  svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0)
   .attr("x",0 - (height / 2))
   .attr("dy", "1em")
   .style("text-anchor", "middle")
   .text("Before Present");

   g.append("g")
     .attr("class", "axis eje-y-disp")
     .attr("transform", "translate(0,0)")
     .call(d3.axisLeft(y));
}

function histograma(data){
  var graf = document.getElementById('hst');
  var fechas = [];
  for (var i = 0; i < data.length; i++) {
    fechas.push(data[i].fecha);
  }
  d3.select(graf).selectAll("*").remove();

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        if (d.length == 1){
          return d.length+' datación<br>'+d[0]+' BP';
        }
        else {
          return d.length+' dataciones<br>'+d3.min(d)+' - '+d3.max(d)+' BP';
        }
      });

    var svg = d3.select(graf),
      margin = {top: 10, right: 30, bottom: 30, left: 70},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var extent = d3.extent(fechas);
    var y = d3.scaleLinear()
      .domain([d3.min(fechas),d3.max(fechas)])
      .range([height,0]);
      y.clamp(true);//¿por qué no funciona?
      y.nice();
    //var intervalos = d3.thresholdScott(fechas, d3.min(fechas), d3.max(fechas));
    var bins = d3.histogram()
      .domain(y.domain())
      .thresholds(y.ticks())
      (fechas);
    var ancho_intervalo = bins[1].x1 - bins[1].x0;
    y.domain([Math.max(d3.min(fechas)-ancho_intervalo,0),d3.max(fechas)+ancho_intervalo]);
    bins[0].x0 = bins[0].x1 - ancho_intervalo; //Ajusto el límite inferior al ancho de los intervalos
    var x = d3.scaleLinear()
      .domain([0, d3.max(bins, function(d) { return d.length; })])
      .range([0, width]);

    svg.call(tip);

    var bar = g.selectAll(".bar")
      .data(bins)
      .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) {return "translate(" + 0 + "," + y(d.x0+ancho_intervalo) + ")"; });//coloco las barras de arriba abajo
    bar.append("rect")
      .attr("x", 3)//un poquito separadas del eje
      .attr("height", function(d) {return y(bins[1].x0) - y(bins[1].x1) -1 ; })
      .attr("width", function(d) { return x(d.length); });

    bar.append("text")
      .attr("dx", ".75em")
      .attr("x", (function(d) {return x(d.length)-20; }))
      .attr("y", ((y(bins[1].x0) - y(bins[1].x1))/2)+3)
      .attr("text-anchor", "middle")
      .text(function(d) {
        if (x(d.length) > 20) {
          return d.length;
        }
      });

    bar.on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Before Present");

    g.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0,0)")
      .call(d3.axisLeft(y));
}

/*==========================================

        FUNCIONALIDAD MAPA

============================================*/

function isCluster(feature) {
  if (!feature || !feature.get('features')) {
        return false;
  }
  return feature.get('features').length > 1;
}

function ponEstiloYacis(feature) {
  if (isCluster(feature)) {
    var radio = Math.min(feature.get('features').length, 6) + 5;
  }
  else{
    var radio = 5;
  }
  var circulo = new ol.style.Circle({
    radius: radio,
    stroke: new ol.style.Stroke({
      width: 2,
      color: '#454545'
    }),
    fill: new ol.style.Fill({
      color: '#FF7542',
    }),
    rotateWithView: true
  });
  var estilo_yacis = new ol.style.Style({
    image: circulo
  });
  return [estilo_yacis];
}

function ponCapa(resultado){
  var geojsonArq = resultado;
	featsArqueo = (new ol.format.GeoJSON()).readFeatures(geojsonArq);
  var capayac = new ol.layer.Vector({
    style: ponEstiloYacis
  });
  capayac.set('name', 'yacis');
	if (featsArqueo.length > 0) {
		yacisSource = new ol.source.Vector({
	        features: featsArqueo
	      });
		var agrupaYacis = new ol.source.Cluster({
	        distance: 20,
	        source: yacisSource
	      });
		capayac.setSource(agrupaYacis);
    mapa.addLayer(capayac);//al añadir cuando el mapa aún está oculto hay veces que da problemas
	}
  else{
    alert('Error loading archaeological sites. Map functionality not available.');
  }
}

function muestraPopup(coord,feature){
	var element = document.getElementById('popup');
	var popup = mapa.getOverlays().item(0);//esto sólo funciona porque no tengo más overlays en el mapa. HACER BIEN
	var plantilla = '<div class="popover" role="tooltip"><div class="popover-header popover-title" title="Yacimientos"></div><div class="arrow"></div><div class="popover-body"></div></div>';
		var titulo;
		var contenido_popup = document.createElement('DIV');
		var feats = feature.getProperties().features;
		if (feats.length == 1) {
			titulo = feats[0].get('text');
			var txt_yaci = feats[0].get('cronotipo');;
			contenido_popup.innerHTML = txt_yaci;
		}
		else{
			titulo = feats.length + ' '+popYac;
			for (var i = 0; i < feats.length; i++) {
				var txt_yaci = feats[i].get('cronotipo');
				var panel_yaci = document.createElement('div');
					panel_yaci.setAttribute('id','tit_'+feats[i].get('id'));
					panel_yaci.setAttribute('onclick','javascript:muestra_data_ext("tit_'+feats[i].get('id')+'")');
				var tit_yaci = document.createElement('a');
					tit_yaci.setAttribute('class','enlace_yaci');
					tit_yaci.innerHTML = feats[i].get('text');
				var prf_yaci = document.createElement('div');
					prf_yaci.setAttribute('id','inf_'+feats[i].get('id'));
					prf_yaci.setAttribute('class','yaci-ext');
					prf_yaci.style.display ='none';
					prf_yaci.innerHTML = txt_yaci;
				panel_yaci.appendChild(tit_yaci);
				panel_yaci.appendChild(prf_yaci);
				contenido_popup.appendChild(panel_yaci);
			}
		}
  $(element).popover('dispose');
	    popup.setPosition(coord);
	$(element).popover({
	  'placement': 'top',
	  'animation': false,
	  'html': true,
	  'content': contenido_popup,
	  'title':'<img src="./img/paletin.svg" class="icono-pop" title="Yacimiento"></img>'+titulo+'<a href="javascript:cierraPops();" class="cierra-pop"><i class="fa fa-times fa-2x"></i></a>',
	  'template':plantilla
	});
	$(element).popover('show');
}

function muestra_data_ext(id_div){
	var padre = document.getElementById(id_div);
	var hijo = padre.lastChild;
	if(hijo.style.display == 'none'){
		$(hijo).show();
    $(padre).attr("style","font-weight:bold;");
	}
	else {
		$(hijo).hide();
    $(padre).attr("style","font-weight:normal;");
	}
}

function abrePunto(idpunto,callback){
  $('#fila-mapa').collapse('show');
  callback(idpunto);
}

function irAPunto(idpunto){
  var elemento = document.getElementById('txt_yaci');
  var pos;
  for (var i = 0; i < featsArqueo.length; i++) {
    if (featsArqueo[i].get('id') == idpunto) {
      window.location.href = '#fila-mapa';
      mapa.getView().fit(featsArqueo[i].getGeometry());
      pos = featsArqueo[i].getGeometry().getCoordinates();
      elemento.innerHTML = featsArqueo[i].get('text');
      break;
    }
  }
  var marca = new ol.Overlay({
    positioning: 'top-center',
    offset: [0,-40],
    position: pos,
    element: elemento
  });
  mapa.addOverlay(marca);
}

/*==========================================

                GENÉRICAS

============================================*/

function valonull(valor){
  var resultado = valor ? valor : '';
  return resultado;
}

function ordenaFechas(a,b) {
  if (a.fecha < b.fecha)
    return 1;
  if (a.fecha > b.fecha)
    return -1;
  return 0;
}

function compareArrays(arr1, arr2) {
    return $(arr1).not(arr2).length == 0 && $(arr2).not(arr1).length == 0
}

function nuevaBsq(){
  window.location.href = '#';
  limpiaSelec();
  $('#tit-filtrar').hide();
  $('#panel-sel-filt').show();
}

function modifBsq(){
  window.location.href = '#';
  $('#tit-filtrar').hide();
  $('#panel-sel-filt').show();
}
