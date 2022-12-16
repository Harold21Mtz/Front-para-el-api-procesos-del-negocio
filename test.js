
function listarArticulos() {

    validaToken();
    var settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi + "/articulo", settings)
        .then(response => response.json())
        .then(function (data) {
            //console.log("HOLA" + data);
            fetch(urlApi + "/categorias", settings)
                .then(responsee => responsee.json())
                .then(function (dataa) {
                    var Articulos = `
            <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Listado de Articulos</h1>
                </div>
                  
                <a href="#" onclick="registerFormArticulo('true')" class="btn btn-outline-success"><i class="fa-solid fa-user-plus"></i></a>
                
                <table class="table">
                    <thead>
                        <tr class="text-center">
                            <th scope="col">Codigo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Fecha registro</th>
                            <th scope="col">Precio venta</th>
                            <th scope="col">Precio compra</th>
                        </tr>
                    </thead>
                    <tbody id="listar">`;
                    for (const Articulo of data) {
                        console.log("ARTICULO - " + data)
                        for (const categoria of dataa) {
                            console.log("CATEGORIA - " + dataa);
                            Articulos += `

                
                        <tr class="text-center">
                            <th scope="row">${Articulo.codigo}</th>
                            <td>${Articulo.nombre}</td>
                            <td>${Articulo.descripcion}</td>
                            <td>${Articulo.categoria.descripcion}</td>            
                            <td>${Articulo.fecha_registro}</td>
                            <td>${Articulo.precio_venta}</td>
                            <td>${Articulo.precio_compra}</td>
                            <td>
                            <button type="button" class="btn btn-outline-danger" 
                            onclick="eliminarArticulo('${Articulo.codigo}')">
                                <i class="fa-solid fa-user-minus"></i>
                            </button>
                            <a href="#" onclick="verModificarArticulo('${Articulo.codigo}')" class="btn btn-outline-warning">
                                <i class="fa-solid fa-user-pen"></i>
                            </a>
                            <a href="#" onclick="verArticulo('${Articulo.codigo}')" class="btn btn-outline-info">
                                <i class="fa-solid fa-eye"></i>
                            </a>
                            </td>
                        </tr>
                    `;

                            break;
                        }
                    }
                    Articulos += `
            </tbody>
                </table>
            `;
                    document.getElementById("datos-articulo").innerHTML = Articulos;
                })
        })
}

function registerFormArticulo(auth = false) {
    validaToken();
    var settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi + "/categorias", settings)
        .then(response => response.json())
        .then(function (data) {

            cadena = `
        <div class="p-3 mb-2 bg-light text-dark">
        <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Articulo</h1>
        </div>
        
        <form action="" method="post" id="myFormRegArt">

        <div class="row">
            <input type="hidden" name="codigo" id="codigo">
            
            <div class="form-group col-6">
            <label class="form-label">nombre</label>
            <input type="text" class="form-control" name="nombre" id="nombre" required> <br>
        </div>
        
        <div class="form-group col-6">
            <label class="form-label">Descripcion</label>
            <input type="text" class="form-control" name="descripcion" id="descripcion" required> <br>
        </div>
        
        <div class="form-group col-6">
            <label class="form-label">Fecha</label>
            <input type="text" class="form-control" name="fecha_registro" id="fecha_registro" required> <br>
        </div>
        
        <div class="form-group col-6">
            <label class="form-label">Precio venta</label>
            <input type="text" class="form-control" name="precio_venta" id="precio_venta" required> <br>
        </div>
        
        <div class="form-group col-6">
            <label class="form-label">Precio compra</label>
            <input type="text" class="form-control" name="precio_compra" id="precio_compra" required> <br>
        </div>

            <div class="form-group col-md-6">
                <label for="">Categoria:</label>
                <select class="form-select" name="categoria" id="categoria" required>
                    <option value= ""></option>
            `;
            for (const Categoria of data) {
                console.log("Categorias " + Categoria.codigo + "  " + Categoria.descripcion)
                cadena += `
                    <option value="${Categoria.codigo}">${Categoria.descripcion}</option>
                    `;
            }
            cadena += `
                </select>
            </div>
        </div>
            <button type="button" class="btn btn-outline-info" onclick="registrarArticulo('${auth}')">Registrar</button>
        </form > `;

            document.getElementById("contentModal-articulo").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalArticulo'))
            myModal.toggle();
        })
}


async function registrarArticulo(auth = false) {
    validaToken();
    var myForm = document.getElementById("myFormRegArt");
    var formData = new FormData(myForm);
    var jsonData = {};
    for (var [k, v] of formData) {//convertimos los datos a json
        jsonData[k] = v;
    }
    console.log("data Articulo", jsonData);
    alert(urlApi);
    const request = await fetch(urlApi + "/articulo", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(function (respuesta) {
            console.log("respuesta peticion", respuesta)
        });
    if (auth) {
        listarArticulos();
    }
    alertas("Se ha registrado el Articulo exitosamente!", 1)
    document.getElementById("contentModal-articulo").innerHTML = '';
    var myModalEl = document.getElementById('modalArticulo')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

// YA FUNCIONA
function eliminarArticulo(codigo) {
    validaToken();
    var settings = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi + "/articulo/" + codigo, settings)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            listarUsuarios();
            alertas("Se ha eliminado la Articulo exitosamente!", 2)
        })
}


function verModificarArticulo(codigo) {
    validaToken();
    var settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi + "/articulo/" + codigo, settings)
        .then(response => response.json())
        .then(function (Articulo) {
            var cadena = '';
            if (Articulo) {
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Articulo</h1>
                </div>
                
                <form action="" method="post" id="myFormRegArt">
        
                <div class="row">
                    <input type="hidden" name="codigo" id="codigo" value="${Articulo.codigo}">
                    
                    <div class="form-group col-6">
                    <label class="form-label">nombre</label>
                    <input type="text" class="form-control" name="nombre" id="nombre" required value="${Articulo.nombre}" > <br>
                </div>
                
                <div class="form-group col-6">
                    <label class="form-label">Descripcion</label>
                    <input type="text" class="form-control" name="descripcion" id="descripcion" required value="${Articulo.descripcion}"> <br>
                </div>
                
                <div class="form-group col-6">
                    <label class="form-label">Fecha</label>
                    <input type="text" class="form-control" name="fecha_registro" id="fecha_registro" required value="${Articulo.fecha_registro}"> <br>
                </div>
                
                <div class="form-group col-6">
                    <label class="form-label">Precio venta</label>
                    <input type="text" class="form-control" name="precio_venta" id="precio_venta" required value="${Articulo.precio_venta}"> <br>
                </div>
                
                <div class="form-group col-6">
                    <label class="form-label">Precio compra</label>
                    <input type="text" class="form-control" name="precio_compra" id="precio_compra" required value="${Articulo.precio_compra}"> <br>
                </div>
        
                <div class="col-md-12 text-center">
                <button type="button" class="btn btn-warning float-right"  onclick="modificarArticulo('${Articulo.codigo}')">
                    <i class="bi bi-cloud-upload">Modificar</i>
                </button>
            </div>
                    </form > `;
            }
            document.getElementById("contentModal-articulo").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalArticulo'))
            myModal.toggle();
        })
}

async function modificarArticulo(codigo) {
    validaToken();
    var myForm = document.getElementById("myFormRegArt");
    var formData = new FormData(myForm);
    var jsonData = {};
    for (var [k, v] of formData) {//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApi + "/articulo/" + codigo, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    listarUsuarios();
    alertas("Se ha modificado la Articulo exitosamente!", 1)
    document.getElementById("contentModal-Articulo").innerHTML = '';
    var myModalEl = document.getElementById('modalArticulo')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}





// MAS FUNCIONES
function alertas(mensaje, tipo) {
    var color = "warning";
    if (tipo == 1) {//success verde
        color = "success"
    }
    else {//danger rojo
        color = "danger"
    }
    var alerta = `< div class="alert alert-${color} alert-dismissible fade show" role = "alert" >
        <strong><i class="fa-solid fa-triangle-exclamation"></i></strong>
                        ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div > `;
    document.getElementById("alerta").innerHTML = alerta;
}




function salir() {
    localStorage.clear();
    location.href = "index.html";
}

function validaToken() {
    if (localStorage.token == undefined) {
        salir();
    }
}

function modalConfirmacion(texto, funcion) {
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}


function sololetras(e) {

    key = e.keyCode || e.which;

    teclado = String.fromCharCode(key).toLowerCase();

    letras = " abcdefghijklmnñopqrstuvwxyz";

    especiales = " 8-37-38-46-164";

    teclado_especial = false;

    for (var i in especiales) {
        if (key == especiales[i]) {
            teclado_especial = true; break;
        }
    }
    if (letras.indexOf(teclado) == -1 && !teclado_especial) {
        return false;
    }
}

function solonumeros(evt) {
    var code = (evt.which) ? evt.which : evt.keyCode;
    if (code == 8) {
        return true;
    } else if (code >= 48 && code <= 57) {
        return true;
    } else {
        return false;
    }
}