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
// objeto.metodo(json)

$(document).ready(function() {

  // Agregar método de validación para RUT chileno
  $.validator.addMethod("rutChileno", function(value, element) {
    // Eliminar puntos y guión del RUT
    value = value.replace(/[.-]/g, "");

    // Validar que el RUT tenga 8 o 9 dígitos
    if (value.length < 8 || value.length > 9) {
      return false;
    }

    // Validar que el último dígito sea un número o una 'K'
    var validChars = "0123456789K";
    var lastChar = value.charAt(value.length - 1).toUpperCase();
    if (validChars.indexOf(lastChar) == -1) {
      return false;
    }

    // Calcular el dígito verificador
    var rut = parseInt(value.slice(0, -1), 10);
    var factor = 2;
    var sum = 0;
    var digit;
    while (rut > 0) {
      digit = rut % 10;
      sum += digit * factor;
      rut = Math.floor(rut / 10);
      factor = factor === 7 ? 2 : factor + 1;
    }
    var dv = 11 - (sum % 11);
    dv = dv === 11 ? "0" : dv === 10 ? "K" : dv.toString();

    // Validar que el dígito verificador sea correcto
    return dv === lastChar;
  }, "Por favor ingrese un RUT válido."); 

$("#formulario1").validate({
  rules: {
    rut: {
      required: true,
      rutChileno: true
    },
    apellidos: {
      required: true      
    },
    email: {
      required: true,
      email: true,
      customEmail: /@gmail\.com$/
    },
    Direccion: {
      required: true
    },
    password: {
      required: true,
      minlength: 5,
    },
    password2: {
      required: true,
      equalTo: "#password",
    },
  }, // --> Fin de reglas
  messages: {
    rut: {
      required: "El rut es un campo obligatorio",
      rutChileno: "El formato del rut no es válido"
    },
    apellidos: {
      required: "Los apellidos es una campo obligatorio"
    },
    email: {
      required: "Por favor ingrese su correo electrónico",
      email: "Por favor ingrese un correo electrónico válido"
    },
    Direccion: {
      required: "La direccion es una campo obligatorio"
    },
    password: {
      required: "La contraseña es una campo obligatorio",
      minlength: "Mínimo 5 caracteres",
    },
    password2: {
      required: "Repita la contraseña anterior",
      equalTo: "Debe ser igual al campo contraseña",
    },
  },
});
});
	

// Fetch para el api
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
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


  $(document).ready(function() {
    $("#inicio-sesion").validate({
      rules: {
        correo: {
          required: true,
          email: true,
          customEmail: /@gmail\.com$/
        },
        contraseña: {
          required: true,
          minlength: 6
        }
      },
      messages: {
        correo: {
          required: "Por favor ingrese su correo electrónico",
          email: "Por favor ingrese un correo electrónico válido"
        },
        contraseña: {
          required: "Por favor ingrese su contraseña",
          minlength: "Su contraseña debe tener al menos 6 caracteres"
        }
      }
    });
  });