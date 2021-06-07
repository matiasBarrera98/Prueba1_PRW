

$("#error").hide();

$("#formulario").submit(function(e){
    var mensaje = "";
    var opcion = $("select option").filter(":selected").val();
    var rut = $("#rut").val().trim();
    

    if (opcion === "Tipo de Identificación"){
        mensaje ="No se seleccionó el tipo de identificación";
    }
    else if (rut.length === 0){
        mensaje = "Debes ingresar la identificación";
    }
    else if (opcion === "1" && !checkRut(rut)){
        mensaje = "Rut Inválido";
    }
    else if($("#nombre").val().trim().length === 0){
        mensaje = "Debes ingresar el nombre";
    }
    else if($("#apellido").val().trim().length === 0){
        mensaje = "Debes ingresar el apellido";
    }
    else if($("#mail").val().trim().length === 0){
        mensaje = "Debes ingresar un correo electrónico";
    }
    else if($("#ciudad").val().trim().length === 0){
        mensaje = "Debes ingresar tu ciudad de residencia";
    }
    else if($("#comentarios").val().trim().length > 50){
        mensaje = "El comentario no puede tener mas de 50 caracteres";
    }
    
    
    if (mensaje != ""){
        e.preventDefault();
        $("#error").html(mensaje);
        $("#error").show();
    }
    
    
})

function checkRut(rut) {
    // Despejar Puntos
    var valor = rut.replace('.', '');
    
    // Despejar Guión
    valor = valor.replace('-', '');
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) {
        return false;
    }

    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;

    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) {
            multiplo = multiplo + 1;
        } else {
            multiplo = 2;
        }

    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) {
        return false;
    }

    // Si todo sale bien, eliminar errores (decretar que es válido)
    return true;
}