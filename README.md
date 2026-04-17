# 🧩 Sudoku Solver

Um projeto simples e divertido que resolve Sudoku 9x9 de forma **visual e passo a passo**, usando um backend em C++ com Crow e um frontend em JavaScript.

---

## Como usar?

1. Preencha o Sudoku inicial na tela  
2. Clique em **"Resolver Sudoku"**  
3. Veja a mágica acontecer ✨  

O sistema mostra **cada passo da resolução**, incluindo tentativas, erros e decisões até chegar na solução final.

---

## Como funciona

- O **JavaScript** captura os dados do Sudoku  
- Envia para o **backend em C++ (Crow)**  
- O backend resolve o Sudoku  
- E retorna o resultado em **JSON**  
- O frontend exibe tudo de forma visual  

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
          └─── idnex.html
</pre>

---

## Como executar

### Backend (C++)

```bash
cd backend
g++ main.cpp -I"C:/Includes/asio/include" -I"C:/Includes/crow/include" -lws2_32 -lmswsock -o app.exe
cls
.\app.exe
```