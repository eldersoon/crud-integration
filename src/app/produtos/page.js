"use client";
import ProdutosService from "@/services/produtos";
import React, { useEffect, useState } from "react";

export default function page() {
  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");

  const buscarProdutos = async () => {
    await ProdutosService()
      .listarProdutos()
      .then((response) => {
        setProdutos(response.produtos);
      });
  };

  const criarProduto = async (produto) => {
    await ProdutosService().criarProduto(produto);

    buscarProdutos();
  };

  const deletarProduto = async (id) => {
    await ProdutosService().deletarProduto(id);

    buscarProdutos();
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="flex flex-col gap-[16px]">
      {produtos.map((produto) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: "16px",
              borderColor: "#cecece",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "16px",
            }}
            key={produto.id}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px",
              }}
            >
              <div>Nome: {produto.nome}</div>
              <div>Categoria: {produto.categoria}</div>
              <div>Preço: R$ {produto.preco}</div>
            </div>

            <div>
              <button
                style={{
                  backgroundColor: "red",
                  padding: "4px",
                  borderRadius: "8px",
                }}
                onClick={() => deletarProduto(produto.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        );
      })}

      <div>
        <form
          className="flex flex-col gap-1"
          onSubmit={(event) => {
            event.preventDefault();

            criarProduto({
              nome: nome,
              categoria: categoria,
              preco: preco,
            });
          }}
        >
          <div>
            nome:{" "}
            <input
              className="text-[#000]"
              onChange={(event) => setNome(event.target.value)}
            />
          </div>
          <div>
            categoria:{" "}
            <input
              className="text-[#000]"
              onChange={(event) => setCategoria(event.target.value)}
            />
          </div>
          <div>
            preco:{" "}
            <input
              className="text-[#000]"
              type="number"
              onChange={(event) => setPreco(event.target.value)}
            />
          </div>
          <button type="submit" className="bg-[blue] p-[16px]">
            Criar Produto
          </button>
        </form>
      </div>
    </div>
  );
}
