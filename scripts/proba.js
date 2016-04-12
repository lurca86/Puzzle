$(function(){
	arrayAxuda = new Array();
	todosPuzzles = new Array();
	arrayPezasTab = new Array()
	vistaAmosar = false;
	vistaMiniaturas = true;
	axudas = 0;
	victorias =0;
	$("#cabeceira").html("<label>Introduce o teu alcume <input type='text' id='xogador'> </label>");
	$("#xogador").on("change", function(){
		alcume=this.value;	
		
		$("#reiniciar").html("<img id='reinicia' title='Reiniciar' class='boton' src='./imaxes/botons/reiniciar.png'> ");
		$("#axudar").html("<img id='axuda' title='Axuda' class='boton' src='./imaxes/botons/axuda.png'> ");
		$("#amosar").html("<img id='amosa' title='Amosar' class='boton' src='./imaxes/botons/amosar.png'> ");
		$("#contador").html("<h1 align='center'>TEMPO</h1>");
		$("div#pezas").text("Arrastra aquí a miniatura do crebacabezas que queres facer!");
		$("div#miniaturas").html("");	
		$("#cabeceira").text("Xogador: "+alcume);
		function cargarPezas(){
			$.getJSON("./servidor/cargarPezas.php", {codigo_puzzle :idPuzzle})
			.done(function(datos) {
				$("#pezas").show();
				var arrayPezas = new Array();
				$.each(datos, function() {
					arrayPezas.push(this.codigo_peza);
					arrayPezasTab.push(this.peza_taboleiro);
				});
				arrayPezas.sort(function(){return Math.random()-0.5});
				$("#pezas").html("<h6>Arrastra aquí as pezas que tes colocadas antes de cambialas se non tés sitio!<h6>");
				$("#pezas").css({"font-size":"34px"});
				for(var i =0; i< arrayPezas.length;i++) {
					$("#pezas").append("<img class='peza aceptable'  id='"+arrayPezas[i]+"' src='./imaxes/pezas/"+idPuzzle+"/"+arrayPezas[i]+".png' >");
				}
				$(".aceptable").draggable({revert:false});
			})
			.fail(function() {
				alert("Problemas coa BD: cargarPezas");
			});
		}

		function cargarTaboleiro(){
			var aux = 0;
			taboa = "<table>";

			for(var i = 0; i<2;i++){
				taboa += "<tr>";
				for(var j=0; j<2;j++){
					taboa += "<td class='cachoTaboleiro' id='td-"+(aux+1)+"'></td>";
					aux++;
				}
				taboa += "</tr>";
			}
			taboa += "</table>";
			$("div#taboleiro").append(taboa);
			$(".cachoTaboleiro").droppable({
				accept: ".peza, .pezAxuda, .aceptable"  , 
				drop: function(event, ui){								
					td = $(this).attr("id");
					if ($("#"+td).html() != ""){
				        $("#cabeceira").text("Non podes colocar aí, move a outra peza primeiro!");
						$("#cabeceira").addClass("parpadear");
						voltar = $(ui.draggable).attr("id");
						$("#"+voltar).draggable({revert:true});
				    }else{
						$("#"+td).addClass("cachoTaboleiro");
						$(ui.draggable).removeClass("peza");
						$(ui.draggable).css({"left" : "0px", "top" : "0px", "width": "250px"});
						$(this).append(ui.draggable);
				    	$("#cabeceira").text("Xogador: "+alcume);
				    	$("#cabeceira").removeClass("parpadear");
				    	comprobar();
				    }
				}
			});
		}

		function comprobar(){
			var nColocadas = $("td").find("img").length;
			var nTds = $("td").length;
			var comprobacion = new Array();
			var correcto = new Array();
			var ben = 0;
			for(var i =1; i<=nTds;i++){
				correcto[i-1]= i;
			}
			if(nColocadas == nTds){
				for(var i = 0; i < nTds; i++){
					var idColocada = $("td:eq("+i+")>img").attr("id");
					comprobacion.push(idColocada);

				}
				for(var x =0; x < nTds; x++ ){
					if(comprobacion[x] == correcto[x]){
						ben++;
					}
				}
				if(ben == nTds){
					victorias++;
					$("#cabeceira").text("NORABOA "+alcume+" GAÑACHES! Levas unha racha de "+victorias+" partidas gañadas!");
					$("#cabeceira").addClass("parpadear");
					$("#amosar").hide();
					$("#axudar").hide();
					clearInterval(tempo);

				}else{
					$("#cabeceira").text("SENTÍMOLO "+alcume+", NON É CORRECTO, SEGUE INTENTÁNDOO!");
					$("#cabeceira").addClass("parpadear");
				}
			}				
		}

		function amosar(){
			celas = $("td").size();
				for (var aux = 0; aux<celas; aux++){
					$("#td-"+(aux+1)+">img").hide();
					$("td#td-"+(aux+1)).css({"background-color":"none"});
					$("td#td-"+(aux+1)).css({"background-image":"url(./imaxes/taboleiros/"+idPuzzle+"/"+arrayPezasTab[aux]+".png)", "opacity" : 1});
					$("td#td-"+(aux+1)).css({"z-index": 10});
				}
				vistaAmosar = true;
		}

		//BOTONS
			//AMOSAR
			$(document).on("click", "#amosa" ,function(){
				if (vistaAmosar){
					for (var aux = 0; aux<celas; aux++){
						$("td#td-"+(aux+1)).css({"background-image":"none", "opacity" : 1});
						$("#td-"+(aux+1)+">img").show();
					}
					$("#cabeceira").text("Xogador: "+alcume);
					$("#cabeceira").removeClass("parpadear");
					vistaAmosar = false;
				}else{
					amosar();
				}

			});

			//AXUDAR
			$(document).on("click", "#axuda" ,function(){
				if(vistaAmosar){
					$("#cabeceira").text("Non podes solicitar axuda mentres estea premido o botón de amosar!");
					$("#cabeceira").addClass("parpadear");
				}
				else{
					$("#cabeceira").text("Xogador: "+alcume);
					$("#cabeceira").removeClass("parpadear");
					axudas++;
					if(axudas<=3){
						do{
						var aleatorio = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
						}
						while($.inArray(aleatorio, arrayAxuda) != (-1) || ($("td:eq("+(aleatorio-1)+")").html() != "") );
						$("td:eq("+(aleatorio-1)+")").addClass("ocupado");
						arrayAxuda.push(aleatorio);
						$("#"+aleatorio).remove();
						$("td:eq("+ (aleatorio-1)+")").append("<img class='pezAxuda ' id='"+aleatorio+"' src='./imaxes/pezas/"+idPuzzle+"/"+aleatorio+".png' >");
						$(".pezAxuda").draggable();
						comprobar();
					}else{
						$("#axudar").hide();
						$("#cabeceira").text("Non podes solicitar máis axuda!");
						$("#cabeceira").addClass("parpadear");
					}
				}
			});
					
			//REINICIAR
			$(document).on("click", "#reinicia" ,function(){
				if(vistaAmosar){
					$("#cabeceira").text("Non podes reiniciar mentres estea premido o botón de amosar!");
					$("#cabeceira").addClass("parpadear");
				}else{
					$("#cabeceira").text("Xogador "+alcume);
					$("#cabeceira").removeClass("parpadear");
					$("#contador").text("TEMPO");
					clearInterval(tempo);
					iniciado();
				}
			});
			
			function iniciado(){
				$("#axudar").hide();
				$("#amosar").hide();
				$("#reiniciar").hide();
				$("#pezas").html("<h6>Arrastra aquí o crebacabezas que queres facer!</h6>");
				$("td").html("");
				axudas = 0;
				cargaMiniaturas();

			}
			
			function cargaMiniaturas(){
				$("#pezas").html("<h6>Arrastra aquí a miniatura do crebacabezas que queres facer!</h6>");
				$.getJSON("./servidor/cargarPuzzles.php")
				.done(function(datos) {
					if(vistaMiniaturas){
						$("img#reinicia").css({"opacity" : .3});
						vistaMiniaturas= true;
					
						$.each(datos, function() {
							var arrayPuzzle = new Array();
							arrayPuzzle[0]=this.codigo_puzzle;
							arrayPuzzle[1]=this.taboleiro;
							arrayPuzzle[2]=this.miniatura;
							arrayPuzzle[3]=this.nome;
							todosPuzzles.push(arrayPuzzle);
							$("#miniaturas").append("<img id='"+arrayPuzzle[2]+"' title='"+arrayPuzzle[3]+"' class='miniatura' src='./imaxes/miniaturas/"+arrayPuzzle[2]+".png'>");
							
						});

						function dragarMiniaturas(){
				
							$("div#miniaturas>img").draggable({revert : true, revertDuration : 1000});
						}
						dragarMiniaturas();
					}
					else{
						$("img#reinicia").css({"opacity" : 1});
						vistaMiniaturas=true;
					}

				})
				.fail(function() {
					alert("Problemas coa BD: cargarPuzzles");
				});
			}
		cargarTaboleiro();
		iniciado();

		function contador(){
			var horas = '00';
			var minutos = '00';
			var segundos = '00';
			tempo = setInterval(function(){
		        segundos++;
		        if(segundos==60){
		        	segundos = 0;
		        	minutos ++;
		        }
		        if (minutos == 60){
		        	horas ++;
		        	minutos = 0;
		        }
		        $("#contador").html("<h6>"+horas + ' : ' + minutos + ' : ' + segundos+"</h6>");
		     }, 1000);
		}

		$("#pezas").droppable({
			accept: ".pezAxuda, .aceptable, .miniatura", 
			drop: function(event, ui){
				$("#axudar").show();
				$("#amosar").show();
				$("#reiniciar").show();
				$(".aceptable").draggable({revert:false});
				$(".pezAxuda").draggable({revert:false});
				$(".peza").draggable({revert:false});
				movida = ui.draggable;
				if($(movida).hasClass("miniatura") ){
					$("img#reinicia").css({"opacity" : 1});
					idPuzzle = ui.draggable.attr("id");
					$("#miniaturas").html("");
					cargarPezas();
					contador();
				}
				else{
					$("#pezas").append(movida);
					$(movida).addClass("peza");
					$(movida).css({"position" : "inherit", "width":"150px"});

				}
			}
		});
	});
	
});