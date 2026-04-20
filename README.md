# 🧩 Sudoku Solver

Um projeto simples e divertido que resolve Sudoku 9x9 de forma **visual**, usando um backend em C++ com Crow e um frontend em JavaScript.

---

## Features

- Resolução automática de Sudoku 9x9
- Backend rápido em C++
- Comunicação via API REST (JSON)
- Interface simples e intuitiva

---

## Como usar?

1. Preencha o Sudoku inicial na tela  
2. Clique em **"Resolver Sudoku"**  
3. Veja a mágica acontecer

O sistema mostra **cada passo da resolução**, incluindo tentativas, erros e decisões até chegar na solução final.

---

## Como funciona

1. O **frontend (JavaScript)** captura o estado do tabuleiro  
2. Envia via `fetch` para o backend  
3. O **backend (C++ + Crow)** resolve usando backtracking  
4. Retorna um JSON com:
   - solução final
5. O frontend renderiza tudo dinamicamente   

---

## Estrutura do projeto

<pre style="background-color:#0d1117; color:#c9d1d9; padding:16px; border-radius:10px; overflow-x:auto; line-height:1.5;">
SUDOKU
│
├─── .gitignore
├─── LICENSE
├─── README.md
│   
├─── backend
│   │   
│   └─── src
│         └─── main.cpp
│           
└─── frontend
    ├─── css
    │     └─── style.css
    │       
    ├─── js
    │     └─── script.js
    │       
    └─── public
          └─── index.html
</pre>

---

## Algoritmo


O solver utiliza:

- 🔁 **Backtracking iterativo (não recursivo)**
- Validação de linha, coluna e bloco 3x3
- Controle manual do estado da busca
---

## Como o algoritmo para resolver o Sudoku funciona

O algoritmo utiliza **Backtracking iterativo**, ou seja, ele simula o processo de tentativa e erro **sem usar recursão**, controlando manualmente o avanço e retrocesso pelas células.

Em vez de chamadas recursivas, o algoritmo mantém uma lista de posições vazias e um índice que indica em qual célula está trabalhando no momento.


---

## Passo a passo

1. **Identificar células vazias**
   - Todas as posições com valor `0` são armazenadas em uma lista.

2. **Iniciar na primeira célula vazia**
   - Um índice `k` controla a posição atual na lista.

3. **Testar valores de forma incremental**
   - Para a célula atual, o algoritmo tenta valores de `1 a 9`
   - Ele continua a partir do último valor testado (evitando repetir tentativas)

4. **Validação local**
   - Cada valor é verificado apenas na:
     - linha
     - coluna
     - subgrade 3x3

5. **Avançar (forward)**
   - Se encontrar um valor válido:
     - Atualiza a célula
     - Avança para a próxima (`k++`)

6. **Retroceder (backtracking)**
   - Se nenhum valor for válido:
     - Reseta a célula para `0`
     - Volta para a anterior (`k--`)

7. **Condição de parada**
   - Quando `k == número de células vazias`:
     - O Sudoku está resolvido ✅

---

## Diferenças importantes

 Diferença importante

- Não usa recursão  
- Usa um loop (`while`) para controlar o fluxo  
- Simula a pilha de chamadas manualmente  
- Mais controle sobre o estado (útil para visualização)

---

## Complexidade de tempo & espaço

```bash
O(9ⁿ), onde 'n' é referente ao número de elementos (na prática não chegamos a processar todo o algoritmo)
```

```bash
O(n), onde 'n' é refente ao número de celulas vazias
```

## Como executar

### Pré-requisitos

- Compilador C++ (g++)
- Crow

OBS: Para ajudar você, eu utilizei o seguinte tutorial para baixar o crow no meu computador:
```bash
https://dev.to/marcosplusplus/como-instalar-o-crow-c-no-windows-2hno
```

---

## Como executar

### Backend (C++)
Rode na sua máquina o seguinte código para rodar o back end
```bash
cd backend/src/
g++ main.cpp -I"C:/Includes/asio/include" -I"C:/Includes/crow/include" -lws2_32 -lmswsock -o app.exe
cls
.\app.exe
```

Acesse em:

```bash
http://localhost:18080/
```

---

## Frontend

Para esse projeto utilizei o live server (extensão do Visual Studio Code)

---

## API

POST `/resposta`

Request:

```bash
{
    "board": [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        ...
    ]
}
```

Response:

```bash
{
    "solution": [[...]]
}
```

---

##  Melhorias futuras

* Suporte a Sudoku 16x16
* Modo escuro 🌙
* Upload de imagem do Sudoku 📸
* Resolver múltiplos puzzles em batch
* Deploy online (Render / Railway)
* Animações mais suaves

---

## Problemas conhecidos

CORS pode bloquear requisições dependendo do navegador
Backend precisa estar rodando antes do frontend

