const botaoResolucao = document.getElementById('botaoSolve');
const botaoReiniciar = document.getElementById('botaoReset');
const cells = document.querySelectorAll('.sudoku input');
const answer = document.getElementById('answer');

function animateReset() {
    const cells = document.querySelectorAll('.sudoku input');

    let index = 80;

    return new Promise((resolve) => {
        function clearPrev() {
            if (index < 0) {
                resolve();
                return;
            }

            const cell = cells[index];

            if (cell.value) {
                cell.classList.add("erase");

                setTimeout(() => {
                    cell.value = "";
                    cell.style.color = '';
                    cell.classList.remove("erase");
                }, 150);
            }

            index--;
            setTimeout(clearPrev, 40);
        }

        clearPrev();
    });
}

function animateSolution(solution) {
    const cells = document.querySelectorAll('.sudoku input');

    let index = 0;

    return new Promise((resolve) => {
        function fillNext() {
            if (index >= 81) {
                resolve();
                return;
            }

            const i = Math.floor(index / 9);
            const j = index % 9;

            const cell = cells[index];

            if (!cell.value) {
                cell.value = solution[i][j];

                cell.style.color = "#3b82f6";

                cell.classList.add("fill");
                setTimeout(() => cell.classList.remove("fill"), 200);
            }

            index++;
            setTimeout(fillNext, 100);
        }

        fillNext();
    });
}

function getBoard() {
    const board = [];
    let index = 0;

    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const value = cells[index].value;
            row.push(value === "" ? 0 : Number(value));
            index++;
        }
        board.push(row);
    }
    return board;
}

function stateBoard(type) {
    cells.forEach((element) => {
        element.disabled = type;
    });
}

function VerificarSudoku() {
    const board = getBoard();

    let linhas = 9, colunas = 9;

    // Colunas
    for (let j = 0; j < colunas; j++) {
        const set = new Set();

        for (let i = 0; i < linhas; i++) {
            const value = board[i][j];

            if (value === 0) continue;

            if (set.has(value)) {
                answer.innerHTML = 'Sudoku inválido pois há colunas com repetições!';
                answer.style.color = 'red';
                return;
            }

            set.add(value);
        }
    }

    // Linhas
    for (let i = 0; i < linhas; i++) {
        const set = new Set();

        for (let j = 0; j < colunas; j++) {
            const value = board[i][j];

            if (value === 0) continue;

            if (set.has(value)) {
                answer.innerHTML = 'Sudoku inválido pois há linhas com repetições!';
                answer.style.color = 'red';
                return;
            }

            set.add(value);
        }
    }

    // Submatrizes
    for (let i = 0; i < linhas; i += 3) {
        for (let j = 0; j < colunas; j += 3) {
            const set = new Set();

            for (let gi = 0; gi < 3; gi++) {
                for (let gj = 0; gj < 3; gj++) {
                    const value = board[i + gi][j + gj];

                    if (value === 0) continue;

                    if (set.has(value)) {
                        answer.innerHTML = 'Sudoku inválido pois há submatrizes com elementos repetidos!';
                        answer.style.color = 'red';
                        return;
                    }

                    set.add(value);
                }
            }
        }
    }

    botaoResolucao.style.display = 'none';

    SolveSudoku();
}

async function SolveSudoku() {
    const board = getBoard();

    answer.innerHTML = "Resolvendo, aguarde uns instantes...";
    answer.style.color = '#f9fafb';

    try {
        const response = await fetch('http://localhost:18080/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        });

        if (!response.ok) {
            throw new Error('Erro ao resolver o sudoku');
        }

        const solved = await response.json();

        stateBoard(true);

        await animateSolution(solved);

        answer.innerHTML = 'Sudoku resolvido!';
        answer.style.color = 'green';

        botaoReiniciar.style.display = 'inline';

    } catch (error) {
        answer.innerHTML = 'Erro ao resolver o sudoku';
        answer.style.color = 'red';
        console.log('Erro: ', error);
    }
}

async function handleReset() {
    botaoResolucao.style.display = 'inline';
    botaoReiniciar.style.display = 'none';
    answer.innerHTML = '';
    await animateReset();
    stateBoard(false);
}

function handlePress() {
    answer.innerHTML = '';
    VerificarSudoku();
}