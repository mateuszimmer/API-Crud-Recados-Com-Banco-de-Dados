export class Usuario {

    private constructor(
        public email: string, 
        public senha: string
        ) {
            this.email = email,
            this.senha = senha
        }

    public static criate(email: string, senha: string) {
        return new Usuario(email, senha);
    }

    public toJson() {
        return {
            email: this.email,
            senha: this.senha
        }
    }
}
