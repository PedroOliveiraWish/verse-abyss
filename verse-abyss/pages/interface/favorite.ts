export type Favorite = {
    id: number;
    userId: number;
    textId: number;
    text: {
        tag: {
            id: number;
            nome: string
        },
        user: {
            id: number;
            nome: string;
            email: string;
        },
        id: number;
        conteudo: string;
        titulo: string;
        criadoEm: Date;
    }
}