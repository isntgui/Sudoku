#include <bits/stdc++.h>

#include "crow.h"
#include "crow/middlewares/cors.h"

using namespace std;

// Função de validação original
bool validate(vector<vector<int>> mat) {
    for (int i = 0; i < 9; i++) {
        set<int> row, col;
        for (int j = 0; j < 9; j++) {
            if (mat[i][j] && !row.insert(mat[i][j]).second)
                return false;
            if (mat[j][i] && !col.insert(mat[j][i]).second)
                return false;
        }
    }
    for (int i = 0; i < 9; i += 3)
        for (int j = 0; j < 9; j += 3) {
            set<int> s;
            for (int x = 0; x < 3; x++)
                for (int y = 0; y < 3; y++) {
                    int v = mat[i + x][j + y];
                    if (v && !s.insert(v).second)
                        return false;
                }
        }
    return true;
}

// Função de resolução original
bool solve(vector<vector<int>>& board) {
    vector<pair<int, int>> empty;
    for (int i = 0; i < 9; i++)
        for (int j = 0; j < 9; j++)
            if (board[i][j] == 0)
                empty.push_back({i, j});

    int k = 0;
    while (k >= 0 && k < (int)empty.size()) {
        auto [i, j] = empty[k];
        bool ok = false;
        for (int val = board[i][j] + 1; val <= 9; val++) {
            board[i][j] = val;
            if (validate(board)) {
                ok = true;
                break;
            }
        }
        if (ok)
            k++;
        else {
            board[i][j] = 0;
            k--;
        }
    }
    return k == (int)empty.size();
}

int main() {
    crow::App<crow::CORSHandler> app;

    auto& cors = app.get_middleware<crow::CORSHandler>();
    cors.global()
        .origin("*")
        .methods("POST"_method, "GET"_method, "OPTIONS"_method)
        .headers("Content-Type");

    CROW_ROUTE(app, "/")([]() {
        return "Sudoku solver online - OK!";
    });

    CROW_ROUTE(app, "/solve").methods("POST"_method)([](const crow::request& req) {
        crow::response res;
        res.add_header("Content-Type", "application/json");

        auto json = crow::json::load(req.body);
        if (!json) {
            res.code = 400;
            res.body = "{\"error\":\"JSON Inválido\"}";
            return res;
        }

        vector<vector<int>> board(9, vector<int>(9));
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                board[i][j] = json[i][j].i();

        if (!solve(board)) {
            res.code = 400;
            res.body = "{\"error\":\"Sem solução\"}";
            return res;
        }

        crow::json::wvalue out;
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                out[i][j] = board[i][j];

        res.code = 200;
        res.body = out.dump();
        return res;
    });

    app.port(18080).multithreaded().run();
}