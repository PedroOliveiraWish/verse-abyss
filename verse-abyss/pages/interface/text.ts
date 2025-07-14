export type Text = {
    id: number;
    titulo: string;
    conteudo: string;
    criadoEm: string;
    quantFavoritos: number;
    isFavorited: boolean;
    userId: number;
    tagId: number;
    tag: {
        id: number;
        nome: string
    },
    user: {
        id: number;
        nome: string;
        email: string;
    }
}
