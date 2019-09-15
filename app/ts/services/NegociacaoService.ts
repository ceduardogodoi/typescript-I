import { Negociacao, NegociacaoParcial } from "../models/index";

export class NegociacaoService {
  async obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {
    try {
      const response = handler(await fetch("http://localhost:8080/dados"));
      console.log(response);

      const dados = await response.json();

      return dados.map(
        (dado: NegociacaoParcial) =>
          new Negociacao(new Date(), dado.vezes, dado.montante)
      );
    } catch (err) {
      console.error(err);
      throw new Error("Não foi possível importar as negociações");
    }
  }
}

export interface HandlerFunction {
  (res: Response): Response;
}
