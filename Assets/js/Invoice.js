class InvoiceJs {

    consultClientInvoice() {
        var cl_nombre = document.querySelector('#cliente_nombre');
        var cl_documento = document.querySelector('#cliente_documento');
        var cl_nit_negocio = document.querySelector('#cliente_nit_negocio');
        var cl_nombre_negocio = document.querySelector('#cliente_nombre_negocio');
        var documento = document.getElementById("consult_client_invoice").value;
        var object = new FormData();
        object.append("documento", documento);
        fetch("InvoiceController/consultClientInvoice", {
            method: "POST",
            body: object,
        })
            .then((respuesta) => respuesta.text())
            .then(function (response) {
                try {
                    object = JSON.parse(response);
                    var cliente_nombre = "";
                    var cliente_documento = "";
                    var cliente_nit_negocio = "";
                    var cliente_nombre_negocio = "";
                    object.forEach(cliente => {
                        cliente_nombre = '<input type="text" class="form-control" value= "' + cliente.cliente_nombre + '" required readOnly>'
                        cliente_documento = '<input type="text" class="form-control" value= "' + cliente.cliente_documento + '" required readOnly>'
                        cliente_nit_negocio = '<input type="text" class="form-control" value= "' + cliente.cliente_nit_negocio + '" required readOnly>'
                        cliente_nombre_negocio = '<input type="text" class="form-control" value= "' + cliente.cliente_nombre_negocio + '" required readOnly>'


                    });
                    cl_nombre.innerHTML = cliente_nombre;
                    cl_documento.innerHTML = cliente_documento;
                    cl_nit_negocio.innerHTML = cliente_nit_negocio;
                    cl_nombre_negocio.innerHTML = cliente_nombre_negocio;
                    console.log(cliente_nombre + " |-|-|-| " + cliente_documento + " |-|-|-| " + cliente_nit_negocio + " |-|-|-| " + cliente_nombre_negocio);
                } catch (error) {
                    document.querySelector("#content").innerHTML = response;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    aggProduct() {

        var pr_reference = document.querySelector('#prod_reference');
        var pr_code_plu = document.querySelector('#prod_code_plu');
        var pr_descripcion = document.querySelector('#prod_descripcion');
        var pr_iva = document.querySelector('#prod_iva');
        var pr_arrival_price = document.querySelector('#prod_arrival_price');

        var producto = document.getElementById('agg_product').value;
        var contenido = document.querySelector('#contenido_fac');

        var object = new FormData();
        object.append("product", producto);
        fetch("InvoiceController/aggProduct", {
            method: "POST",
            body: object,
        })
            .then((respuesta) => respuesta.text())
            .then(function (response) {
                try {
                    object = JSON.parse(response);
                    if (object.message == "NO SE ENCUENTRA REGISTRADO O ESTAN MAL LOS VALORES") {
                        Swal.fire({
                            icon: "error",
                            title: "ERROR",
                            text: object.message,
                        });
                    }

                    if ("NO SE ENCUENTRA REGISTRADO O ESTAN MAL LOS VALORES" != object.message) {

                        var prod_reference = "";
                        var prod_code_plu = "";
                        var prod_descripcion = "";
                        var prod_iva = "";
                        var prod_arrival_price = "";
                        object.forEach(product => {
                            cont_factura += `<div class="form-group col-md-1">
                        <label for="">COD</label>
                        <div class="form-group md-11" id="prod_reference">
                        <input type="text" class="form-control" value = " ${product.prod_reference} " required readOnly>
                        </div>
                    </div>
    
                    <div class="form-group col-md-1">
                        <label for="">PLU</label>
                        <div class="form-group md-11" id="prod_code_plu">
                        <input type="text" class="form-control" value = "${product.prod_code_plu}" required readOnly>
                        </div>
                    </div>
    
                    <div class="form-group col-md-4">
                        <label for="">DESCRIPCION</label>
                        <div class="form-group md-11" id="prod_descripcion">
                        <input type="text" class="form-control" value = "${product.prod_description}" required readOnly>
                        </div>
                    </div>
    
                    <div class="form-group col-md-1">
                        <label for="">CANT</label>
                        <input type="number" class="form-control" name="" id="prod_available_quantity" onchange="Invoice.productQuantity()" required>
                    </div>
    
                    <div class="form-group col-md-1">
                        <label for="">IVA</label>
                        <div class="form-group md-11" id="prod_iva">
                        <input type="text" class="form-control" value = "${product.prod_iva}" required readOnly>
                        </div>
                    </div>
    
                    <div class="form-group col-md-2">
                        <label for="">V.UNI</label>
                        <div class="form-group md-11" id="prod_arrival_price">
                        <input type="text" class="form-control" id="pq_price_v" value = "${product.prod_selling_price}" required readOnly>
                        </div>
                    </div>
    
                    <div class="form-group col-md-2">
                        <label for="">V.TOTAL</label>
                        <div class="form-group md-11" id="prod_selling_price">
                        
                        </div>
                    </div>`;
                        });
                        contenido.innerHTML = cont_factura;
                        pr_reference.innerHTML = prod_reference;
                        pr_code_plu.innerHTML = prod_code_plu;
                        pr_descripcion.innerHTML = prod_descripcion;
                        pr_iva.innerHTML = prod_iva;
                        pr_arrival_price.innerHTML = prod_arrival_price;
                        console.log(prod_reference + " |-|-|-|-| " + prod_code_plu + " |-|-|-|-| " + prod_descripcion + " |-|-|-|-| " + prod_iva + " |-|-|-|-| " + prod_arrival_price);

                    }

                } catch (error) {
                    //document.querySelector("#content").innerHTML = response;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    productQuantity() {
        var pq_cantidad = document.getElementById('prod_available_quantity').value;
        var pq_price = document.getElementById('pq_price_v').value;
        var pq_selling_price = (pq_price * pq_cantidad);
        var pq_price_v = document.querySelector('#prod_selling_price');
        var precio = '';
        precio = '<input type="text" class="form-control" id="pq_price_v" value = " ' + pq_selling_price + '" required readOnly>';
        //alert("hola");
        pq_price_v.innerHTML = precio;

    }





}
var Invoice = new InvoiceJs();

var cont_factura = "";


https://fb.watch/hnCf35G5UY/