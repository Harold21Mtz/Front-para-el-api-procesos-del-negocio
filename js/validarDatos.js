function validar(letras)
{
    const pattern = new RegExp('^[A-Z ]+$', 'i');
    if(letras=="" || !pattern.test(letras))
    {
        alert("INGRSE LETRAS");
        return false;
    }
    return true;
}

function validarNumeros(valor)
{
    if( isNaN(valor) ) {
        alert("INGRSE SOLO NUMEROS");
        return false;
      }
    return true;
}