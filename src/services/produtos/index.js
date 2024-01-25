import { request } from "@/http";
import React from "react";

export default function ProdutosService() {
  const listarProdutos = async () => {
    try {
      const api = await request.get("/produtos");

      return api.data;
    } catch (err) {
      console.log(err);
    }
  };

  const criarProduto = async (dados) => {
    const api = await request.post("/create/produto", dados);

    return api.data;
  };

  const deletarProduto = async (id) => {
    const api = await request.put(`/delete/produto/${id}`);

    return api.data;
  };

  return { listarProdutos, criarProduto, deletarProduto };
}
