import swal from "sweetalert2";

var toast = {
    toast(posicao, tipo, titulo, texto){
        const toast = swal.mixin({
            toast: true,
            position: posicao,
            showConfirmButton: false,
            timer: 10000
          });
        
          toast({
            type: tipo,
            title: titulo,
            text:
             texto
          });
    }
}
export default  toast;

