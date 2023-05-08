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

function validarRut(rut) {
	// Verificar el formato del RUT
	if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
	  return false;
	}
	
	// Extraer el dígito verificador y los números del RUT
	var digits = rut.split("-");
	var number = digits[0];
	var verifier = digits[1];
	
	// Calcular el dígito verificador esperado
	var expectedVerifier = calcularDigitoVerificador(number);
	
	// Comparar el dígito verificador esperado con el dígito verificador actual
	return verifier.toLowerCase() === expectedVerifier.toLowerCase();
  }
  
  function calcularDigitoVerificador(rut) {
	var sum = 0;
	var multiplier = 2;
	
	// Sumar los productos de los dígitos por el multiplicador
	for (var i = rut.length - 1; i >= 0; i--) {
	  sum += parseInt(rut.charAt(i)) * multiplier;
	  
	  if (multiplier === 7) {
		multiplier = 2;
	  } else {
		multiplier++;
	  }
	}
	
	// Calcular el dígito verificador a partir de la suma
	var remainder = sum % 11;
	var verifier = 11 - remainder;
	
	if (verifier === 11) {
	  return "0";
	} else if (verifier === 10) {
	  return "k";
	} else {
	  return verifier.toString();
	}
  }
  
  


// Fetch para el api
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    // Recorre la lista de productos y agrega cada uno al div product-list
    const productListDiv = document.getElementById('product-list');
    data.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <div class="card mb-4">
          <div class="text-center"><img src="${product.image}" class="card-img-top" alt="${product.title}"></div>
          <div class="card-body">
            <p class="card-text">$${product.price}<br>${product.title}</p>
            <button type="button" class="btn btn-primary">Comprar</button>
          </div>
        </div>
      `;
      productListDiv.appendChild(productDiv);
    });
  });


