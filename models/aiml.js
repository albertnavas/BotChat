// functions.js
var exports = module.exports = {};

exports.getRandomAnswer = function() {
	var frases = ['Arbil Arbil arbil arbil perro, y por pan, si se lo dan.'
	,'Una vez al año no hace daño.'
	,'A palabras necias, oídos sordos.'
	,'Cuando las barbas de tu vecino veas pelar, pon las tuyas a remojar.'
	,'De desagradecidos está el infierno lleno.'
	,'No sólo de pan vive el hombre.'
	,'No hay peor sordo que el que no quiere oír.'
	,'La dicha de la fea, la hermosa la desea.'
	,'Del dicho al hecho hay mucho trecho.'
	,'De noche todos los gatos son pardos.'
	,'Genio y figura hasta la sepultura.'
	,'El que no llora, no mama ababol.'
	,'Quien a hierro mata, a hierro muere.'
	,'A río revuelto, ganancia de pescadores.'
	,'Mal de muchos, consuelo de tontos.'
	,'Más sabe el diablo por viejo que por diablo.'
	,'Al que al cielo escupe, en la cara le cae.'
	,'El que la sigue la consigue.'
	,'El infierno está lleno de buenas intenciones y el cielo de buenas obras.'
	,'Quien no oye consejo, no llega a viejo.'
	,'La amistad es un alma que habita en dos cuerpos; un corazón que habita en dos almas.'
	,'El ignorante afirma, el sabio duda y reflexiona.'
	,'Algunos creen que para ser amigos basta con querer, como si para estar sano bastara con desear la salud.'
	,'La inteligencia consiste no sólo en el conocimiento, sino también en la destreza de aplicar los conocimientos en la práctica.'
	,'No basta decir solamente la verdad, mas conviene mostrar la causa de la falsedad.'
	,'La esperanza es el sueño del hombre despierto.'
	,'Sólo hay felicidad donde hay virtud y esfuerzo serio, pues la vida no es un juego.'
	,'El sabio no dice todo lo que piensa, pero siempre piensa todo lo que dice.'
	,'Considero más valiente al que conquista sus deseos que al que conquista a sus enemigos, ya que la victoria más dura es la ,victoria sobre uno mismo.'
	,'La ciencia es respecto del alma lo que es la luz respecto de los ojos, y si las raíces son amargas, los frutos son muy dulces.'
	,'Si comienza uno con certezas, terminará con dudas; mas si se acepta empezar con dudas, llegará a terminar con certezas.'
	,'El dinero es como el estiércol: no es bueno a no ser que se esparza.'
	,'La amistad duplica las alegrías y divide las angustias por la mitad.'
	,'Vengándose, uno se iguala a su enemigo; perdonándolo, se muestra superior a él.'
	,'Vieja madera para arder, viejo vino para beber, viejos amigos en quien confiar, y viejos autores para leer.'
	,'Algunos libros son probados, otros devorados, poquísimos masticados y digeridos.'
	,'La ocasión hay que crearla, no esperar a que llegue.'
	,'Quien no quiere pensar es un fanático; quien no puede pensar, es un idiota; quien no osa pensar es un cobarde.'];
	
	return frases[Math.floor(Math.random()*frases.length)];
};

exports.getAimlFiles = function() {
	return [
		'./aiml/sara.aiml',
		'./aiml/default.aiml',
		'./aiml/nombres.aiml',
		'./aiml/numeros.aiml',
		'./aiml/sexo.aiml',
		'./aiml/sara_srai_1.aiml',
		//'./aiml/sara_srai_2.aiml',
	];
}

exports.getAimlVars = function() {
	return {
		botmaster:'Albert Navas',
		nombre_bot:'Nacloud',
		ciudad:'Barcelona',
		edad:'25',
		ciudadania:'Tokyo',
		anyo_nacimiento:'1990',
	};
}
