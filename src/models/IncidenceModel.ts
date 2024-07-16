
export interface IncidenceForm {
    title: string | null | undefined;
    description: string | null | undefined;
    photo: string | undefined;
    audio: string | undefined;
  }

  export interface Incidence {
    title: string | null | undefined;
    date: string | null | undefined;
    description: string | null | undefined;
    photo: string | undefined;
    audio: string | undefined;
    id: string;
}
  