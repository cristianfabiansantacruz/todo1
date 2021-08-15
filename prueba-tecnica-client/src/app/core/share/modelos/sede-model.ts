import { BaseModel } from "./base-model";

export interface SedeModel extends BaseModel {
    departamento: string;
    integrante: string;
    sede: string;
    codigoAlterno: string;
}