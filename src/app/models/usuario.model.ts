export class Usuario {

    private constructor(
        private email: string, 
        private senha: string
        ) {
            this.email = email,
            this.senha = senha
        }

    public static criate(nome: string, email: string) {
        return new Usuario(nome, email);
    }
}
