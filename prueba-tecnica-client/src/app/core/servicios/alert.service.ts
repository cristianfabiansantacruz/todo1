import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import * as $ from "jquery";

export enum TYPES {
  SUCCES = <any>{ title: "Éxito", icon: "success" },
  INFO = <any>{ title: "Información", icon: "info" },
  ERROR = <any>{ title: "Error", icon: "error" },
  WARNING = <any>{ title: "Advertencia", icon: "warning" },
  QUESTION = <any>{ title: "Pregunta", icon: "question" },
}


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  message(message: string, type: any, allowCloseDialog = false) {
    return swal.fire({
      title: this.getTitle(type.title),
      position: 'center',
      icon: type.icon,
      text: message,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: allowCloseDialog,
      allowEscapeKey: allowCloseDialog,
      allowEnterKey: allowCloseDialog,
    });
  }

  loading() {
    swal.fire({
      footer: `<b><h2>Cargando ...</h2></b>`,
      position: 'center',
      showConfirmButton: false,
      html: `<img width="200" src="./assets/images/loading.gif"></img>`,
      background: "rgba(0, 0, 0, 0)",
      backdrop: "rgba(0, 0, 0, 0.83)",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
  }


  close() {
    swal.close();
  }

  private getTitle(title: string): string {
    switch (title) {
      case (<any>TYPES.SUCCES).title:
        return 'Exito';

      case (<any>TYPES.WARNING).title:
        return 'Alerta';

      case (<any>TYPES.INFO).title:
        return 'Información';

      case (<any>TYPES.ERROR).title:
        return 'Error';

      case (<any>TYPES.QUESTION).title:
        return 'Pregunt';
    }
    return "null";
  }



  showError(msgErrorCt: string = 'Lo sentimos, a ocurrido un error') {
    return this.message(msgErrorCt, TYPES.ERROR);
  }



  /**
   * Obtener el tipo y el titulo del mensaje para sweetalert2
   * @param pTipo tipo del mensaje 
   */
  darTiposMensaje(pTipo) {

    let titulo = 'Error';
    let tipo = 'error';

    if (pTipo != null && pTipo != '') {
      let miTipo = pTipo.toLowerCase();
      if (miTipo == 's' || miTipo == 'success') {
        titulo = 'Éxito';
        tipo = 'success';
      } else if (miTipo == 'w' || miTipo == 'warning') {
        titulo = 'Advertencia';
        tipo = 'warning';
      } else if (miTipo == 'e' || miTipo == 'error') {
        titulo = 'Error';
        tipo = 'error';
      } else if (miTipo == 'i' || miTipo == 'info') {
        titulo = 'Información';
        tipo = 'info';
      } else if (miTipo == 'q' || miTipo == 'question') {
        titulo = 'Pregunta';
        tipo = 'question';
      }
    }

    let mensaje = {
      titulo: titulo,
      tipo: tipo
    }

    return mensaje;
  }

  /**
   * Cierra el swet alert
   */
  cerrarMensaje() {
    swal.close();
  }

}

