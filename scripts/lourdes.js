$(function(){
	arrayAxuda = new Array();
	todosPuzzles = new Array();
	arrayPezas = new Array();
	arrayPezasTab = new Array();
	arrayXogador = new Array();
	xogador = "Manolo do Bombo";
	vistaAmosar = false;
	axudas = 0;


	$("#reiniciar").html("<img id='reinicia' title='Reiniciar' class='boton' src='./imaxes/botons/reiniciar.png'> ");
	$("#axudar").html("<img id='axuda' title='Axuda' class='boton' src='./imaxes/botons/axuda.png'> ");
	$("#amosar").html("<img id='amosa' title='Amosar' class='boton' src='./imaxes/botons/amosar.png'> ");
	$("#contador").html("<h1 align='center'>TEMPO</h1>");
	$("div#pezas").hide();
	$("div#miniaturas").html("");

	$.getJSON("./servidor/cargarXogador.php", { xogador : xogador})
		.done(function(datos) {

			idXogador = datos.codigo_xogador;
			alcume = datos.alcume;
			nivel = datos.codigo_nivel;
			idPuzzle = datos.codigo_puzzle;
			
			$("#cabeceira").text("Xogador: "+alcume);
			$("#contador").text("Nivel: "+nivel);

			function cargarPezas(){
				$.getJSON("./servidor/cargarPezas.php", {codigo_puzzle :idPuzzle})
				.done(function(datos) {
					$("#pezas").show();
					$.each(datos, function() {
						arrayPezas.push(this.codigo_peza);
						arrayPezasTab.push(this.peza_taboleiro);
					});
					arrayPezas.sort(function(){return Math.random()-0.5});
					$("#pezas").html("<h6>PEZAS<h6>");
					$("#pezas").css({"font-size":"34px"});
					for(var i =0; i< arrayPezas.length;i++) {
						$("#pezas").append("<img class='peza aceptable'  id='"+arrayPezas[i]+"' src='./imaxes/pezas/"+idPuzzle+"/"+arrayPezas[i]+".png' >");
					}
					$(".aceptable").draggable({revert:false});
					nPezas = $(".peza").size();
			
					function cargarTaboleiro(){
						
						var aux = 0;
						taboa = "<table>";
						for(var i = 0; i<(nPezas/2);i++){
							taboa += "<tr>";
							for(var j=0; j<(nPezas/2);j++){
								taboa += "<td class='cachoTaboleiro' id='"+arrayPezasTab[aux]+"'></td>";
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
									$(ui.draggable).css({"left" : "0px", "top" : "0px"});
									$(this).append(ui.draggable);
							    	$("#cabeceira").text("Xogador: "+alcume);
							    	$("#cabeceira").removeClass("parpadear");
							    }
								
							}
						});
					}
					
					cargarTaboleiro();

				//BOTÓNS
					//AMOSAR
					$(document).on("click", "#amosa" ,function(){
						if (vistaAmosar){
							for (var aux = 0; aux<celas; aux++){
								$("td#"+arrayPezasTab[aux]).css({"background-image":"none", "opacity" : 1});
							}
							$("#cabeceira").text("Xogador: "+alcume);
							$("#cabeceira").removeClass("parpadear");
							vistaAmosar = false;
						}else{
							celas = $("td").size();
							for (var aux = 0; aux<celas; aux++){
								$("td#"+arrayPezasTab[aux]).css({"background-image":"url(./imaxes/taboleiros/"+idPuzzle+"/"+arrayPezasTab[aux]+".png)", "opacity" : .3});
							}
							vistaAmosar = true;
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
							}else{
								$("#axudar").hide();
								$("#cabeceira").text("Non podes solicitar máis axuda!");
								$("#cabeceira").addClass("parpadear");
							}
						}
					});

					//REINICIAR
					$(document).on("click", "#reinicia" ,function(){
						console.log("reinicia");
					});

					

				})
				.fail(function() {
					alert("Problemas coa BD: cargarPezas");
				});
			}

			cargarPezas();



		})
		.fail(function() {
			alert("Problemas coa BD: cargarXogador");
		});

	/*$.getJSON("./servidor/cargarPuzzles.php")
		.done(function(datos) {
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
			$("#pezas").droppable({
				accept:".miniatura",
				drop: function( event, ui ) {

					$("#cabeceira").text("Nome do puzzle '"+ui.draggable.attr('title')+"'.");
					idPuzzle = ui.draggable.attr('id');

					function ocultarMiniaturas(){
						$("div#miniaturas>img").hide();
					}

					/*function iniciarTempo() { 

					    function contaAtras() { 
					        tempo = tempo-1; //número da conta
					        temporizador.innerHTML = tempo; //escribir número da conta
					        if (tempo <= 0) { //condición fin da repetición
						        //parar a conta atrás.
						        clearInterval(tempoResposta);
						        //función que chama cando remata o tempo
						        //validarResposta();
					        }
					    } 
					     //chamada á función de conta atrás
					     contaAtras();

					     //repetir a función conta atrás cada segundo
					     tempoResposta = setInterval(contaAtras,1200);
					}

					function pararTempo(){
						clearInterval(tempoResposta);
					}*/

					/*ocultarMiniaturas();
					cargarPezas();
					cargarTaboleiro();
				}
			});
		})
		.fail(function() {
			alert("Problemas coa BD: cargarArmas");
		});

		*/







});