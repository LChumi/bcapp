import { Pregunta } from "./Pregunta";

export interface Usuario {
    username:  string;
    password:  string;
    preguntas: Pregunta[];
    logo:      string;
}


