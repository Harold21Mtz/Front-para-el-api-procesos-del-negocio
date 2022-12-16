
function listarCategorias() {

    validaToken();
    var settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi + "/categories", settings)
        .then(response => response.json())
        .then(function (data) {

            var categorias = `
            <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Listado de Categorias</h1>
                </div>
                  
                <a href="#" onclick="registerFormCategoria('true')" class="btn btn-outline-success"><i class="fa-solid fa-user-plus"></i></a>
                
                <table class="table">
                    <thead>
                        <tr class="text-center">
                            <th scope="col">Consecutivo</th>
                            <th scope="col">Codigo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listar">`;
                    var cont=0;
            for (const categoria of data) {
                cont++;
                console.log(categoria.name)
                categorias += `
                
                        <tr class="text-center">
                            <th scope="row">${cont}</th> 
                            <td>${categoria.codCat}</td>
                            <td>${categoria.name}</td>
                            <td>${categoria.description}</td>
                            <td>
                            <button type="button" class="btn btn-outline-danger" 
                            onclick="eliminarCategoria('${categoria.id}')">
                                <i class="fa-solid fa-user-minus"></i>
                            </button>
                            <a href="#" onclick="verModificarCategoria('${categoria.id}')" class="btn btn-outline-warning">
                                <i class="fa-solid fa-user-pen"></i>
                            </a>
                            <a href="#" onclick="verCategoria('${categoria.id}')" class="btn btn-outline-info">
                                <i class="fa-solid fa-eye"></i>
                            </a>
                            </td>
                        </tr>
                    `;

            }
            categorias += `
            </tbody>
                </table>
            `;
            document.getElementById("datos").innerHTML = categorias;
        })
}

function registerFormCategoria(auth = false) {
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Categoria</h1>
            </div>
              
            <form action="" method="post" id="myFormRegCat">
            
            <label for="codcat"  class="form-label">Codigo</label>
            <input type="text" class="form-control" name="codcat" id="codcat" required> <br>

                <label for="name"  class="form-label">Nombre</label>
                <input type="text" class="form-control" name="name" id="name"  required> <br>

                <label for="description"  class="form-label">Descripcion</label>
                <input type="text" class="form-control" name="description" id="description" onkeypress="return sololetras(event);" required> <br>

                <button type="button" class="btn btn-outline-info" onclick="registrarCategoria('${auth}')">Registrar</button>
            </form>`;
    document.getElementById("contentModal-categoria").innerHTML = cadena;
    var myModal = new bootstrap.Modal(document.getElementById('modalCategoria'))
    myModal.toggle();
}


async function registrarCategoria(auth = false) {
    validaToken();
    var myForm = document.getElementById("myFormRegCat");
    var formData = new FormData(myForm);
    var jsonData = {};
    for (var [k, v] of formData) {//convertimos los datos a json
        jsonData[k] = v;
    }
    console.log("data categoria ", jsonData);
    const request = await fetch(urlApi + "/category", {
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
        listarCategorias();
    }
    alertas("Se ha registrado la categoria exitosamente!", 1)
    document.getElementById("contentModal-categoria").innerHTML = '';
    var myModalEl = document.getElementById('modalCategoria')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function eliminarCategoria(id) {
    validaToken();
    var settings = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi + "/deleteCategory/" + id, settings)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            listarCategorias();
            alertas("Se ha eliminado la categoria exitosamente!", 2)
        })
}

function verModificarCategoria(id) {
    validaToken();
    var settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi + "/category/" + id, settings)
        .then(response => response.json())
        .then(function (categoria) {
            var cadena = '';
            if (categoria) {
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Categoria</h1>
                </div>
              
                <form action="" method="post" id="myFormCategoria">

                    <div class ="row">
                        <div class="form-group col-6">
                            <label for="name" class="form-label">Nombre categoria</label>
                            <input type="text" class="form-control" name="name" id="name" required value="${categoria.name}">
                        </div>
                        <div class="form-group col-6">
                            <label for="description"  class="form-label">Descripcion</label>
                            <input type="text" class="form-control" name="description" id="description" required value="${categoria.description}" onkeypress="return sololetras(event);"> <br>
                        </div>
                    </div>


                    <div class="row">
                    <div class="col-md-12 text-center">
                        <button type="button" class="btn btn-warning float-right"  onclick="modificarCategoria('${categoria.id}')">
                            <i class="bi bi-cloud-upload">Modificar</i>
                        </button>
                    </div>
                </div>


                </form>`;
            }
            document.getElementById("contentModal-categoria").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalCategoria'))
            myModal.toggle();
        })
}



async function modificarCategoria(id) {
    validaToken();
    var myForm = document.getElementById("myFormCategoria");
    var formData = new FormData(myForm);
    var jsonData = {};
    
    for (var [k, v] of formData) {//convertimos los datos a json

        jsonData[k] = v;
    }
    console.log(jsonData);
    const request = await fetch(urlApi + "/updateCategory/" + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    listarCategorias()
    alertas("Se ha modificado la categoria exitosamente!", 1)
    document.getElementById("contentModal-categoria").innerHTML = '';
    var myModalEl = document.getElementById('modalCategoria')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verCategoria(id) {
    validaToken();
    var settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi + "/category/" +id, settings)
        .then(response => response.json())
        .then(function (categoria) {
            var cadena = '';
            if (categoria) {
                cadena = `
            <div class="row">
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Categoria</h1>
                </div>
            </div>

            <div class ="row">
                <div class="form-group col-6">
                    <label for="codcat"  class="form-label">Codigo</label>
                    <input type="text" class="form-control" name="codcat" id="codcat" required value="${categoria.codCat}" readonly> <br>
                </div>
                <div class="form-group col-6">
                    <label for="name"  class="form-label">Nombre</label>
                    <input type="text" class="form-control" name="name" id="name" required value="${categoria.name}" readonly> <br>
                </div>
                <div class="form-group col-6">
                    <label for="description"  class="form-label">Descripcion</label>
                    <input type="text" class="form-control" name="description" id="description" required value="${categoria.description}" readonly> <br>
                </div>
            </div>
            
                `;

            }
            document.getElementById("contentModal-categoria").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalCategoria'))
            myModal.toggle();
        })
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
    var alerta = `<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                    <strong><i class="fa-solid fa-triangle-exclamation"></i></strong>
                        ${mensaje}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
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
        }else
        {
            
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
