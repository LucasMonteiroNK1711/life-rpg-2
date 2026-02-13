# 🎮 Life‑RPG (nome provisório) — Gamificando sua Rotina

Um aplicativo web que transforma sua rotina diária em um jogo.

A ideia é simples: hábitos viram missões, tarefas viram quests, consistência gera streaks e você ganha XP conforme evolui. Em vez de apenas "cumprir tarefas", você sobe de nível na vida real.

---

## ✨ Objetivo

Ajudar o usuário a:

* Criar hábitos saudáveis
* Manter consistência diária
* Visualizar progresso
* Sentir recompensa imediata
* Transformar disciplina em algo divertido

Tudo isso com uma experiência parecida com jogos de RPG.

---

## 🧠 Conceito do sistema

O app funciona como um "RPG de produtividade":

* ✅ Hábitos = Missões diárias
* ⭐ XP = Pontos por completar tarefas
* 🔥 Streak = dias consecutivos sem falhar
* 🆙 Level = progresso geral do usuário
* 🏆 Conquistas = metas especiais
* 📅 Reset diário automático = novo ciclo todo dia

Cada ação gera feedback visual e sensação de progresso.

---

## 🚀 Funcionalidades principais (MVP)

### 1. Autenticação

* Login
* Cadastro
* Sessão do usuário

### 2. Hábitos

* Criar hábito
* Editar hábito
* Excluir hábito
* Definir frequência (diário, semanal, personalizado)
* Marcar como concluído

### 3. Sistema de jogo

* XP por tarefa concluída
* Level automático
* Barra de progresso
* Streak por hábito
* Reset diário automático

### 4. Dashboard

* Lista de hábitos do dia
* XP ganho hoje
* Streak atual
* Level do usuário
* Progresso semanal

### 5. Histórico

* Calendário de conclusão
* Estatísticas
* % de consistência

---

## 🛠️ Stack tecnológica

### Frontend

* React
* Vite
* CSS moderno / Tailwind (UI bonita e leve)
* Local Storage ou IndexedDB

### Backend

* Node.js
* Express
* API REST

### Banco de dados

* SQLite (desenvolvimento)
* MySQL ou PostgreSQL (produção)

---

## 📁 Estrutura do projeto

```
habitquest/
  frontend/
    src/
      components/
      pages/
      hooks/
      services/
      styles/

  backend/
    src/
      routes/
      controllers/
      services/
      models/
      database/
```

---

## ⚙️ Regras de negócio

### XP

* Tarefa simples: +10 XP
* Tarefa média: +20 XP
* Tarefa difícil: +40 XP

### Level

* Fórmula: level * 100 XP

Exemplo:

* Level 1 → 100 XP
* Level 2 → 200 XP

### Streak

* Aumenta quando completa o hábito no dia
* Zera quando falha

### Reset diário

* À meia-noite:

  * tarefas voltam para "pendente"
  * streak é mantido apenas se o dia anterior foi completo
  * contadores diários são zerados

---

## 🎨 Ideias de UI/UX

* Barra de XP estilo RPG
* Animação ao ganhar pontos
* Confetes ao completar tudo do dia
* Cores vivas e motivadoras
* Feedback sonoro opcional

---

## 🔮 Funcionalidades futuras (Roadmap)

* Sistema de conquistas (badges)
* Avatar customizável
* Modo competitivo com amigos
* Ranking semanal
* Notificações push
* Modo offline
* Gamificação avançada (missões semanais, chefes, desafios)
* Exportação de dados
* PWA / app mobile

---

## 🧪 Como rodar o projeto

### Frontend

```
cd frontend
npm install
npm run dev
```

### Backend

```
cd backend
npm install
npm run dev
```

---

## 📌 Filosofia do projeto

Disciplina não precisa ser chata.

Se jogos conseguem nos fazer repetir ações por horas, podemos usar o mesmo princípio para melhorar nossa vida.

Life‑RPG é sobre transformar progresso pessoal em uma jornada divertida.

---

## 👤 Autor

Projeto pessoal para aprendizado de:

* React
* Node.js
* Fullstack
* UX focado em gamificação
* Produtividade pessoal

---

## 📄 Licença

MIT
