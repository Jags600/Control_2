// menu
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
	document.getElementById('menu-container').innerHTML = xhr.responseText;
  }
};
xhr.open('GET', 'menu.html', true);
xhr.send();

// footer
function cargarFooter() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'footer.html', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			document.getElementById('footer').innerHTML = xhr.responseText;
		}
	};
	xhr.send();
}

//para cargar footer
window.onload = function() {
	cargarFooter();
};

  //validar rut
  function validarRut(rut) {
	if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut))
	  return false;
  
	var tmp = rut.split('-');
	var digv = tmp[1];
	var rut = tmp[0];
	if (digv == 'K') digv = 'k';
  
	return (dv(rut) == digv);
  }
  //validar digito verificador
  function dv(T) {
	var M = 0, S = 1;
	for (; T; T = Math.floor(T / 10))
	  S = (S + T % 10 * (9 - M++ % 6)) % 11;
	return S ? S - 1 : 'k';
  }
  //ultimo validar rut
  var rut = "12345678-9";
if (validarRut(rut)) {
  console.log("El RUT es válido");
} else {
  console.log("El RUT es inválido");
}


fetch('https://fakestoreapi.com/products/category/ropa')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });



