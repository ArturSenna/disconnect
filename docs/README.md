# Introdução

Informações básicas do projeto.

- **Projeto:** `<dis>connect`
- **Repositório GitHub:** https://github.com/
- **Membros da equipe:**
  - [Artur Otoni Senna Luz](https://github.com/ArturSenna)
  - [Júlia Batista Moreira](https://github.com/batistemo)

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

# Contexto

Detalhes sobre o espaço de problema, os objetivos do projeto, sua justificativa e público-alvo.

## Problema

Vivemos uma situação contraditória: embora estejamos mais "conectados" online do que nunca, muitas pessoas têm dificuldade para se encontrar pessoalmente e fazer atividades fora do mundo digital. Existe uma diferença grande entre querer interagir com outras pessoas de verdade e conseguir fazer isso na prática.

**O que está acontecendo:**

O uso cada vez maior de celulares e redes sociais criou uma geração que, ao mesmo tempo, se sente sozinha no mundo real. Muitas pessoas gostam de atividades como esportes (corrida, vôlei, futebol, tênis), jogos presenciais (xadrez, RPG, jogos de tabuleiro) e outras experiências sociais, mas enfrentam dificuldades para transformar esses interesses em atividades reais com outras pessoas.

**Principais dificuldades encontradas:**

- **Problema de organização:** É difícil combinar horários e organizar atividades, especialmente quando várias pessoas têm rotinas diferentes

- **Círculo de amigos limitado:** As pessoas dependem muito dos amigos que já têm, mas eles nem sempre compartilham os mesmos interesses ou têm tempo disponível para certas atividades

- **Ferramentas inadequadas:** Usar aplicativos como WhatsApp para organizar eventos causa confusão, perda de informações e dificuldade para gerenciar tudo

- **Falta de segurança:** Existe medo de encontrar pessoas desconhecidas sem ter como verificar quem elas são ou se são confiáveis

- **Distância:** É difícil encontrar pessoas que moram perto e que gostam das mesmas coisas

**Quem é mais afetado:**

Este problema atinge especialmente jovens universitários e profissionais de 18 a 30 anos que:

- Querem fazer mais atividades sociais e físicas
- Gostariam de conhecer pessoas novas além dos amigos atuais
- Enfrentam dificuldades práticas para descobrir, organizar e participar de atividades presenciais
- Têm dificuldade para manter uma rotina ativa e social com hobbies e interesses pessoais

O resultado é um ciclo em que as pessoas têm interesse em atividades presenciais, mas as dificuldades práticas impedem que isso aconteça, aumentando o isolamento social e a dependência de entretenimento digital.

## Objetivos

**Objetivo Geral:**

Desenvolver uma plataforma digital que facilite a conexão entre pessoas com interesses em comum para a realização de atividades não-digitais, promovendo o encontro presencial e a formação de novos vínculos sociais.

**Objetivos Específicos:**

- **Criar um sistema de matching inteligente:** Desenvolver algoritmos que conectem usuários com base em interesses, localização, nível de habilidade e disponibilidade de horário
- **Implementar funcionalidades de segurança:** Estabelecer um sistema de avaliação, verificação de perfis e diretrizes de segurança para garantir encontros confiáveis
- **Facilitar a organização de eventos:** Criar ferramentas para criação, gestão e participação em atividades, incluindo sistemas de publicações e confirmação de presença
- **Promover diversificação de atividades:** Oferecer uma ampla gama de categorias de hobbies e atividades, desde esportes até jogos e atividades culturais
- **Construir uma comunidade ativa:** Desenvolver funcionalidades que incentivem o engajamento contínuo dos usuários e a formação de grupos recorrentes

## Justificativa

O desenvolvimento da plataforma `<dis>connect` se justifica pela crescente necessidade de soluções que promovam conexões humanas genuínas em um mundo cada vez mais digitalizado. Diversos fatores tornam este projeto relevante e necessário:

**Impacto Social:**

- **Combate ao isolamento social:** O projeto atende uma demanda real de pessoas que buscam expandir seu círculo social e se conectar com outros que compartilham interesses similares
- **Promoção de atividades físicas:** Incentiva a prática de esportes e atividades ao ar livre, contribuindo para a saúde física e mental dos usuários
- **Fortalecimento de comunidades locais:** Facilita a formação de grupos de interesse que podem se tornar comunidades ativas e duradouras

**Relevância Tecnológica:**

- **Lacuna no mercado:** Embora existam plataformas de networking social, há uma carência de soluções específicas focadas em atividades presenciais e hobbies
- **Oportunidade de inovação:** O projeto permite explorar tecnologias de matching, geolocalização e sistemas de recomendação aplicadas a um contexto social único

**Validação através de Pesquisa:**

- **Entrevistas qualitativas** realizadas confirmaram a dificuldade das pessoas em encontrar companhia para atividades específicas
- **Matriz CSD** identificou certezas sobre a necessidade de conexão humana e suposições sobre barreiras de segurança que podem ser validadas
- **Mapeamento de stakeholders** demonstrou o potencial de impacto em diferentes grupos, desde usuários individuais até organizadores de eventos

**Ambiente Universitário como Ponto de Partida:**
O contexto acadêmico oferece um ambiente ideal para validação inicial da solução, com um público jovem, diversificado e disposto a experimentar novas formas de conexão social.

## Público-Alvo

O público-alvo da plataforma `<dis>connect` é composto principalmente por jovens adultos de 18 a 30 anos que buscam diversificar suas atividades sociais e encontrar companhia para hobbies e interesses pessoais.

**Perfil Demográfico:**

- **Faixa etária:** 18 a 30 anos
- **Escolaridade:** Estudantes universitários e profissionais com ensino superior
- **Localização:** Áreas urbanas e metropolitanas
- **Relação com tecnologia:** Usuários ativos de dispositivos móveis e plataformas digitais

**Características Comportamentais:**

- Pessoas que praticam ou desejam praticar atividades físicas e hobbies (esportes, jogos, atividades culturais)
- Indivíduos que buscam expandir seu círculo social além dos amigos atuais
- Usuários que valorizam experiências presenciais e conexões autênticas
- Pessoas com agenda flexível ou que desejam otimizar seu tempo livre

**Personas Principais:**

1. **Pedro (23 anos)** - O Extrovertido Social
   - Universitário que pratica futebol e trabalha com atividades esportivas
   - Objetivo: Encontrar grupos para atividades esportivas regulares, expandir círculo social e criar grupos de estudo com pessoas diferentes

2. **Fábio (24 anos)** - O Introvertido Aprendiz
   - Praticante de vôlei que quer expandir suas habilidades
   - Objetivo: Conhecer pessoas com interesses similares de forma segura

3. **Maria (21 anos)** - A Extrovertida Competitiva
   - Estudante universitária que pratica tênis e busca competição
   - Objetivo: Encontrar parceiros para atividades e possíveis viagens

**Necessidades do Público:**

- Facilidade para encontrar pessoas com interesses comuns
- Segurança e confiabilidade nos encontros
- Flexibilidade de horários e localização
- Variedade de atividades disponíveis
- Interface intuitiva e funcionalidades práticas

# Product Discovery

## Etapa de Entendimento

Durante a etapa de entendimento do projeto, foram desenvolvidos diversos artefatos utilizando a metodologia de Design Thinking para compreender com profundidade o problema da conexão entre pessoas para atividades não-digitais:

### Matriz CSD (Certezas, Suposições e Dúvidas)

A **Matriz de Alinhamento CSD** foi utilizada para organizar o conhecimento da equipe e identificar áreas que necessitavam de maior investigação:

**Certezas identificadas:**

- A necessidade de conexão humana é real e fundamental
- As pessoas estão cada vez mais imersas em dispositivos digitais
- O ambiente universitário é ideal para validação inicial da ideia
- Hobbies são populares e já possuem comunidades ativas

**Suposições levantadas:**

- A questão da segurança é a principal barreira para adesão
- O aplicativo conseguirá se popularizar organicamente
- Filtros baseados em interesses serão suficientes para conexões de qualidade

**Dúvidas a serem investigadas:**

- Como as pessoas atualmente buscam grupos para atividades?
- Quais são as atividades não-digitais mais procuradas?
- O que motivaria o uso desta solução versus alternativas existentes?

### Mapa de Stakeholders

Desenvolvido um mapeamento circular dos stakeholders organizados por proximidade ao projeto:

- **Fundamentais:** Usuários finais e grupo de desenvolvimento
- **Importantes:** Organizadores de eventos, universidade, possíveis patrocinadores
- **Influenciadoras:** Órgãos públicos, plataformas concorrentes, mídia e influenciadores

### Entrevistas Qualitativas

Foram realizadas entrevistas estruturadas para validar suposições e explorar as dúvidas identificadas na matriz CSD, focando em:

- Hábitos atuais de busca por atividades e grupos
- Principais dificuldades enfrentadas para organizar encontros
- Aspectos de segurança e confiança em plataformas digitais
- Motivações e barreiras para experimentar novos hobbies

### Highlights de Pesquisa

Os principais insights obtidos através das entrevistas incluíram:

- Confirmação da dificuldade de coordenação usando ferramentas inadequadas como WhatsApp
- Identificação da importância de sistemas de avaliação para segurança
- Validação da demanda por filtros de nível de habilidade
- Descoberta de oportunidades para eventos recorrentes e mini-torneios

## Etapa de Definição

### Personas

![Persona 1: Fábio](images/Persona-Fábio.png)
![Persona 2: Maria](images/Persona-Maria.png)
![Persona 3: Pedro](images/Persona-Pedro.png)

Com base nas pesquisas realizadas, foram identificadas três personas principais que representam diferentes perfis de usuários da plataforma `<dis>connect`:

#### Persona 1: Fábio - O Introvertido Aprendiz

- **Idade:** 24 anos
- **Hobby:** Vôlei
- **Personalidade:** Introvertido, focado em aprendizado
- **Objetivos:** Encontrar pessoas que compartilhem seus interesses e melhorar suas habilidades
- **Dores:** Dificuldade em se conectar socialmente, medo de julgamento
- **Comportamento:** Busca ambientes seguros para conhecer pessoas

#### Persona 2: Maria - A Extrovertida Competitiva

- **Idade:** 21 anos
- **Hobby:** Tênis
- **Personalidade:** Extrovertida, competitiva
- **Objetivos:** Encontrar parceiros para atividades e competições
- **Dores:** Falta de adversários no mesmo nível, agenda limitada
- **Comportamento:** Ativa em buscar novas experiências e desafios

#### Persona 3: Pedro - O Extrovertido Social

- **Idade:** 23 anos
- **Hobby:** Jogar futebol
- **Trabalho:** Atividades esportivas
- **Personalidade:** Extrovertido, sociável, ambicioso
- **Objetivos:** Expandir círculo social, organizar atividades regulares (esportivas e acadêmicas), criar grupos de estudo com pessoas diferentes e melhorar suas habilidades
- **Dores:** Dificuldade de coordenação de grupos, dependência de amigos atuais, falta de adversários no mesmo nível, dificuldade para encontrar pessoas para estudar
- **Sonhos:** Ser rico e ter sucesso
- **Comportamento:** Gosta de organizar eventos (esportivos e educacionais), conhecer pessoas novas, criar grupos de estudo e busca constantemente melhorar suas habilidades acadêmicas e esportivas

Cada persona possui um mapa de empatia detalhado que explora seus objetivos, dores, ganhos esperados e proposta de valor específica oferecida pela plataforma.

# Product Design

Nesse momento, vamos transformar os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que detalham a interface e a experiência do usuário.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO...`PERSONA`            | QUERO/PRECISO ...`FUNCIONALIDADE`                | PARA ...`MOTIVO/VALOR`                                |
| ------------------------------ | ------------------------------------------------ | ----------------------------------------------------- |
| Pedro (Organizador de estudos) | Criar grupos de estudo com pessoas diferentes    | Estudar matérias específicas e conhecer pessoas novas |
| Fábio (Usuário introvertido)   | Visualizar perfis detalhados antes de participar | Me sentir seguro ao conhecer pessoas novas            |
| Maria (Usuária competitiva)    | Filtrar eventos por nível de habilidade          | Encontrar adversários compatíveis para tênis          |
| Usuário geral                  | Me cadastrar com meus interesses e localização   | Receber sugestões personalizadas de atividades        |
| Usuário geral                  | Avaliar outros participantes após eventos        | Contribuir para um ambiente seguro e confiável        |

## Proposta de Valor

A proposta de valor da plataforma `<dis>connect` foi desenvolvida utilizando o Value Proposition Canvas, focando em atender às necessidades específicas de cada persona identificada.

### Mapa de Valor Geral

**Produtos e Serviços:**

- Plataforma digital para criação e busca de eventos para atividades não-digitais
- Sistema de perfis verificados com informações de interesses e nível de habilidade
- Filtros avançados de busca (atividade, localização, data, nível)
- Fórum para comunicação entre participantes
- Sistema de avaliação e feedback pós-eventos
- Funcionalidades para eventos recorrentes

**Analgésicos (Alívio das Dores):**

- **Contra dificuldade de coordenação:** Centralização da organização em uma plataforma dedicada
- **Contra insegurança:** Sistema de avaliações, perfis verificados e diretrizes de segurança
- **Contra círculo social limitado:** Conexão com universo ampliado de pessoas com interesses similares
- **Contra desorganização:** Informações centralizadas (participantes, local, horário) em cada evento
- **Contra incompatibilidade de nível:** Filtros e autoavaliação de habilidades

**Criadores de Ganhos:**

- **Feed personalizado:** Algoritmo que sugere eventos com base em interesses e comportamento
- **Ambiente confiável:** Sistema de avaliação e código de conduta para moderação
- **Variedade contínua:** Qualquer usuário pode criar atividades com sinalização de nível
- **Fortalecimento de vínculos:** Funcionalidades que incentivam formação de grupos regulares
- **Gamificação:** Sistema de incentivos para participação ativa na comunidade

### Propostas Específicas por Persona

**Para Pedro (Extrovertido Social):**

- Ferramentas robustas de organização de eventos esportivos e acadêmicos
- Funcionalidades para criar grupos fixos e atividades recorrentes (futebol e grupos de estudo)
- Sistema de convites para expandir eventos
- Filtros para encontrar pessoas interessadas em estudar matérias específicas

**Para Fábio (Introvertido Aprendiz):**

- Perfis detalhados para aumentar confiança
- Filtros para eventos de nível iniciante
- Ambiente seguro com moderação ativa

**Para Maria (Extrovertida Competitiva):**

- Filtros por nível de habilidade
- Sistema de mini-torneios e competições
- Métricas e rankings para motivação adicional

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                                                                                                                                                                              | Prioridade |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RF-001 | O sistema deve permitir que novos usuários criem uma conta, fornecendo informações básicas como nome, e-mail e senha e façam login e logout de sua conta.                                                           | ALTA       |
| RF-002 | O usuário deve poder visualizar e editar seu próprio perfil, adicionando informações como foto, uma breve biografia e seus interesses/hobbies.                                                                      | ALTA       |
| RF-003 | O usuário deve poder visualizar o perfil de outros usuários, vendo seus interesses e avaliações recebidas.                                                                                                          | ALTA       |
| RF-004 | O usuário deve poder criar uma nova atividade, especificando: nome da atividade, recorrência, esporte/hobby, local, data, horário, número de participantes e nível de habilidade (ex: iniciante, casual, avançado). | ALTA       |
| RF-005 | O sistema deve permitir a busca e filtragem de atividades por tipo de hobby, localização, data e nível de habilidade.                                                                                               | ALTA       |
| RF-006 | O usuário deve poder visualizar os detalhes de uma atividade, incluindo a lista de participantes confirmados.                                                                                                       | MÉDIA      |
| RF-007 | O usuário deve poder solicitar a participação em uma atividade de interesse.                                                                                                                                        | MÉDIA      |
| RF-008 | Um usuário que criou uma atividade deve poder aceitar ou recusar pedidos de participação.                                                                                                                           | BAIXA      |
| RF-009 | O sistema deve permitir que usuários avaliem outros participantes após a conclusão de uma atividade, atribuindo uma nota (1-5 estrelas) e um comentário opcional sobre a experiência.                               | ALTA       |

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                                           | Prioridade |
| ------- | -------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O sistema deve ser responsivo para dispositivos móveis                           | ALTA       |
| RNF-002 | O tempo de resposta deve ser inferior a 3 segundos para buscas                   | ALTA       |
| RNF-003 | O sistema deve suportar até 1000 usuários simultâneos                            | MÉDIA      |
| RNF-004 | O sistema deve ter disponibilidade de 99% do tempo                               | MÉDIA      |
| RNF-005 | A interface deve ser intuitiva para usuários com conhecimento básico tecnológico | ALTA       |

## Projeto de Interface

Artefatos relacionados com a interface e a interacão do usuário na proposta de solução.

### Wireframes

Estes são os protótipos de telas do sistema.

##### Cadastro

![Cadastro](images/wireframes/cadastro.png)

##### Login

![Login](images/wireframes/login.png)

##### Página Inicial

![Exemplo de wireframe](images/wireframes/inicial.png)

##### Criar Evento

![Exemplo de wireframe](images/wireframes/criar_evento.png)

##### Pesquisa de Eventos

![Exemplo de wireframe](images/wireframes/pesquisa.png)

##### Visualizar Evento

![Exemplo de wireframe](images/wireframes/evento.png)

##### Perfil

![Exemplo de wireframe](images/wireframes/perfil.png)

### Protótipo Interativo

✅ [Protótipo Interativo (Figma)](https://www.figma.com/proto/1DAWVPqJcLIoHg6XkdUNLR)

# Metodologia

Detalhes sobre a organização do grupo e o ferramental empregado.

## Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

| Ambiente                    | Plataforma | Link de acesso                                                     |
| --------------------------- | ---------- | ------------------------------------------------------------------ |
| Processo de Design Thinking | Miro       | https://miro.com/app/board/uXjVJIN4f8Y=/                           |
| Repositório de código       | GitHub     | https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti1-g1-conectar-pessoas |
| Projeto de Interfaces       | Figma      | https://www.figma.com/design/1DAWVPqJcLIoHg6XkdUNLR                |
| Protótipo Interativo        | Figma      | https://www.figma.com/proto/1DAWVPqJcLIoHg6XkdUNLR                 |

# Solução Implementada

Esta seção apresenta todos os detalhes da solução criada no projeto.

## Vídeo do Projeto

O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução.

[![Vídeo do projeto](images/video.png)](https://youtu.be/3osn9iNQ3m0)

## Funcionalidades

Esta seção apresenta as funcionalidades da solução implementadas no sistema `<dis>connect`.

### Funcionalidade 1 - Autenticação de Usuários

Sistema completo de cadastro, login e logout de usuários.

- **Estrutura de dados:** [Usuários](#estrutura-de-dados---usuários)
- **Instruções de acesso:**
  - Acesse a [página de login](../codigo/public/modulos/login/login.html)
  - Para novos usuários, clique no botão "Registrar" e preencha o formulário
  - Para usuários existentes, insira login e senha e clique em "Login"
  - O logout pode ser realizado através do header presente em todas as páginas autenticadas
- **Requisitos atendidos:** RF-001
- **Artefatos relacionados:** [login.html](../codigo/public/modulos/login/login.html), [login.js](../codigo/public/assets/js/login.js)

### Funcionalidade 2 - Gerenciamento de Perfil

Permite que usuários criem e editem seus perfis, adicionando informações pessoais, foto, biografia e hobbies de interesse.

- **Estrutura de dados:** [Perfis](#estrutura-de-dados---usuários), [Hobbies](#estrutura-de-dados---eventos)
- **Instruções de acesso:**
  - Faça login no sistema
  - Acesse o ícone de perfil no menu inferior ou clique em "Perfil" no header
  - Para criar um perfil (primeira vez): preencha todos os campos obrigatórios incluindo foto, biografia, data de nascimento e hobbies
  - Para editar: clique no botão "Editar Perfil" e modifique as informações desejadas
- **Requisitos atendidos:** RF-002, RF-003
- **Artefatos relacionados:** [perfil.html](../codigo/public/modulos/perfil/perfil.html), [perfil.js](../codigo/public/modulos/perfil/perfil.js), [perfil.css](../codigo/public/modulos/perfil/perfil.css)

### Funcionalidade 3 - Criar Eventos

Usuários podem criar novos eventos/atividades especificando todos os detalhes necessários para organização.

- **Estrutura de dados:** [Eventos](#estrutura-de-dados---eventos)
- **Instruções de acesso:**
  - Faça login no sistema
  - Acesse "Eventos" no menu inferior
  - Clique no botão "+" (adicionar evento)
  - Preencha o formulário com:
    - Imagem do evento (obrigatória)
    - Nome do evento
    - Descrição detalhada
    - Recorrência (único, semanal ou mensal)
    - Quantidade mínima e máxima de participantes
    - Data e horário
    - Local
    - Modalidade/hobby
    - Nível de habilidade
  - Clique em "Criar Evento" para confirmar
- **Requisitos atendidos:** RF-004
- **Artefatos relacionados:** [criar-evento.html](../codigo/public/modulos/eventos/criar-evento.html), [criar-evento.js](../codigo/public/modulos/eventos/criar-evento.js), [criar-evento.css](../codigo/public/modulos/eventos/criar-evento.css)

### Funcionalidade 4 - Buscar e Filtrar Eventos

Sistema avançado de busca e filtragem que permite usuários encontrarem eventos relevantes baseados em múltiplos critérios.

- **Estrutura de dados:** [Eventos](#estrutura-de-dados---eventos)
- **Instruções de acesso:**
  - Faça login no sistema
  - Acesse o ícone de busca (lupa) no menu inferior
  - Use a barra de pesquisa para buscar por nome, descrição ou local
  - Clique em "Filtros" para acessar filtros avançados:
    - Modalidade do hobby
    - Nível de habilidade
    - Recorrência (único, semanal, mensal)
    - Data do evento
    - Status (ativo, inativo, lotado, cancelado)
  - Os resultados são atualizados em tempo real
  - Clique no botão "Limpar filtros" para resetar
- **Requisitos atendidos:** RF-005
- **Artefatos relacionados:** [pesquisa.html](../codigo/public/modulos/pesquisa/pesquisa.html), [pesquisa.js](../codigo/public/modulos/pesquisa/pesquisa.js), [pesquisa.css](../codigo/public/modulos/pesquisa/pesquisa.css)

### Funcionalidade 5 - Visualizar Detalhes do Evento

Exibição completa de informações de um evento, incluindo organizador, participantes e todas as especificações.

- **Estrutura de dados:** [Eventos](#estrutura-de-dados---eventos), [Participantes](#estrutura-de-dados---eventos)
- **Instruções de acesso:**
  - Navegue até a listagem de eventos (página inicial ou busca)
  - Clique em qualquer card de evento
  - A página de detalhes exibe:
    - Imagem e status do evento
    - Nome do organizador
    - Data, horário e local
    - Modalidade e nível de habilidade
    - Descrição completa
    - Número de participantes confirmados vs. vagas
    - Lista de participantes (se inscrito)
  - Botões de ação: "Inscrever-se", "Sair do Evento", "Editar" (para criadores)
- **Requisitos atendidos:** RF-006
- **Artefatos relacionados:** [detalhe.html](../codigo/public/modulos/detalhes_evento/detalhe.html), [detalhe.js](../codigo/public/modulos/detalhes_evento/detalhe.js), [detalhe.css](../codigo/public/modulos/detalhes_evento/detalhe.css)

### Funcionalidade 6 - Gerenciar Inscrições em Eventos

Usuários podem se inscrever em eventos de interesse e gerenciar suas participações.

- **Estrutura de dados:** [Participantes de Eventos](#estrutura-de-dados---eventos)
- **Instruções de acesso:**
  - Acesse os detalhes de um evento
  - Clique em "Inscrever-se" para participar (se houver vagas)
  - Para visualizar eventos inscritos: acesse "Eventos" no menu e veja a seção "Eventos inscritos"
  - Para sair de um evento: acesse os detalhes e clique em "Sair do Evento"
- **Requisitos atendidos:** RF-007
- **Artefatos relacionados:** [listar-eventos.html](../codigo/public/modulos/eventos/listar-eventos.html), [listar-eventos.js](../codigo/public/modulos/eventos/listar-eventos.js)

### Funcionalidade 7 - Editar e Gerenciar Eventos Criados

Criadores de eventos podem editar informações e gerenciar suas atividades.

- **Estrutura de dados:** [Eventos](#estrutura-de-dados---eventos)
- **Instruções de acesso:**
  - Acesse "Eventos" no menu inferior
  - Visualize seus eventos na seção "Eventos criados"
  - Clique em um evento que você criou
  - Clique no botão "Editar"
  - Modifique as informações necessárias
  - Salve as alterações
- **Requisitos atendidos:** RF-004, RF-008
- **Artefatos relacionados:** [editar-evento.html](../codigo/public/modulos/eventos/editar-evento.html), [editar-evento.js](../codigo/public/modulos/eventos/editar-evento.js)

### Funcionalidade 8 - Página Inicial (Feed de Eventos)

Dashboard principal que exibe eventos disponíveis para o usuário.

- **Estrutura de dados:** [Eventos](#estrutura-de-dados---eventos)
- **Instruções de acesso:**
  - Após login, o usuário é direcionado automaticamente para a página inicial
  - Exibe cards de eventos disponíveis
  - Possibilita navegação rápida para detalhes de cada evento
  - Acesso através do ícone "Home" no menu inferior
- **Requisitos atendidos:** RF-006
- **Artefatos relacionados:** [index.html](../codigo/public/index.html), [home.js](../codigo/public/assets/js/home.js), [styles.css](../codigo/public/assets/css/styles.css)

## Estruturas de Dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON para uso com JSON Server.

##### Estrutura de Dados - Usuários

Registro dos usuários do sistema para autenticação e perfis (RF-001, RF-002, RF-003)

```json
{
  "usuarios": [
    {
      "id": 1,
      "nome": "Maria Santos",
      "email": "maria.santos@email.com",
      "senha": "hash_da_senha",
      "usuario": "_mariasantos",
      "foto": "https://example.com/fotos/maria.jpg",
      "bio": "Estudante de Educação Física apaixonada por tênis e atividades ao ar livre. Sempre em busca de novos desafios!",
      "data_nascimento": "2003-05-15",
      "localizacao": "Belo Horizonte, MG",
      "hobbies": ["Tênis", "Corrida", "Yoga", "Leitura", "Fotografia"],
      "nivel_experiencia": {
        "Tênis": "Avançado",
        "Corrida": "Intermediário",
        "Yoga": "Iniciante"
      },
      "avaliacao_media": 4.8,
      "total_avaliacoes": 15,
      "atividades_criadas": [1, 3],
      "atividades_participadas": [2, 4, 5],
      "data_cadastro": "2025-09-01T10:30:00Z",
      "ultimo_acesso": "2025-10-01T14:22:00Z",
      "status": "ativo"
    }
  ]
}
```

##### Estrutura de Dados - Eventos

Registro das atividades criadas pelos usuários (RF-004, RF-005, RF-006)

"eventos": [
{
"id": 1,
"nome": "Trilha Ecológica no Parque",
"foto": "url_da_foto_1.jpg",
"descricao": "Caminhada guiada por trilhas, ideal para iniciantes.",
"frequencia": "Semanal",
"dias_da_semana": ["Sábado", "Domingo"],
"dias_do_mes": [],
"quant_minima_pessoas": 5,
"quant_maxima_pessoas": 20,
"participantes_inscritos": 0,
"data_inicial": "2025-10-11",
"horario": "09:00",
"local": "Parque Estadual da Serra",
"modalidade_hobby": "Hiking",
"nivel_de_habilidade": "Iniciante",
"status": "Ativo"
},
]

````

##### Estrutura de Dados - Solicitações de Participação

Gerenciamento de pedidos para participar de atividades (RF-007, RF-008)

```json
{
  "solicitacoes": [
    {
      "id": 1,
      "atividade_id": 1,
      "solicitante_id": 3,
      "organizador_id": 1,
      "status": "pendente",
      "mensagem": "Olá! Sou iniciante no tênis e gostaria muito de participar do torneio. Posso levar minha própria raquete.",
      "data_solicitacao": "2025-09-29T15:30:00Z",
      "data_resposta": null,
      "resposta_organizador": null
    },
    {
      "id": 2,
      "atividade_id": 1,
      "solicitante_id": 7,
      "organizador_id": 1,
      "status": "aceita",
      "mensagem": "Oi! Jogo tênis há 6 meses e adoraria participar.",
      "data_solicitacao": "2025-09-28T20:15:00Z",
      "data_resposta": "2025-09-29T08:22:00Z",
      "resposta_organizador": "Bem-vindo ao torneio! Nos vemos lá."
    },
    {
      "id": 3,
      "atividade_id": 2,
      "solicitante_id": 9,
      "organizador_id": 3,
      "status": "recusada",
      "mensagem": "Gostaria de me juntar ao grupo de corrida.",
      "data_solicitacao": "2025-09-25T14:45:00Z",
      "data_resposta": "2025-09-26T09:30:00Z",
      "resposta_organizador": "Desculpe, o grupo está lotado no momento. Te aviso se abrir vaga!"
    }
  ]
}
````

##### Estrutura de Dados - Categorias

Categorias e modalidades de hobbies disponíveis na plataforma

```json
{
  "categorias": [
    {
      "id": 1,
      "nome": "Esportes",
      "descricao": "Atividades físicas e esportivas",
      "icone": "sports_icon.svg",
      "modalidades": [
        {
          "id": 1,
          "nome": "Futebol",
          "niveis": ["Iniciante", "Intermediário", "Avançado"]
        },
        {
          "id": 2,
          "nome": "Tênis",
          "niveis": ["Iniciante", "Intermediário", "Avançado"]
        },
        {
          "id": 3,
          "nome": "Vôlei",
          "niveis": ["Iniciante", "Intermediário", "Avançado"]
        },
        {
          "id": 4,
          "nome": "Corrida",
          "niveis": [
            "Iniciante",
            "Intermediário",
            "Avançado",
            "Todos os níveis"
          ]
        },
        {
          "id": 5,
          "nome": "Ciclismo",
          "niveis": ["Iniciante", "Intermediário", "Avançado"]
        }
      ]
    },
    {
      "id": 2,
      "nome": "Jogos",
      "descricao": "Jogos de tabuleiro, cartas e estratégia",
      "icone": "games_icon.svg",
      "modalidades": [
        {
          "id": 6,
          "nome": "Xadrez",
          "niveis": ["Iniciante", "Intermediário", "Avançado"]
        },
        {
          "id": 7,
          "nome": "RPG",
          "niveis": ["Iniciante", "Experiente"]
        },
        {
          "id": 8,
          "nome": "Jogos de Tabuleiro",
          "niveis": ["Casual", "Estratégico"]
        }
      ]
    },
    {
      "id": 3,
      "nome": "Estudos",
      "descricao": "Grupos de estudo e atividades acadêmicas",
      "icone": "study_icon.svg",
      "modalidades": [
        {
          "id": 9,
          "nome": "Grupo de Estudos",
          "niveis": ["Iniciante", "Intermediário", "Avançado"]
        },
        {
          "id": 10,
          "nome": "Preparação para Concursos",
          "niveis": ["Iniciante", "Intermediário"]
        }
      ]
    }
  ]
}
```

## Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução.

### Backend e Armazenamento de Dados

**JSON Server:**

- Versão: 0.17.4
- Descrição: API REST completa baseada em arquivo JSON para armazenamento de dados
- Uso: Gerenciamento de usuários, perfis, eventos, hobbies e participações
- URL: [https://github.com/typicode/json-server](https://github.com/typicode/json-server)

**Express.js:**

- Versão: 4.17.1
- Descrição: Framework web para Node.js
- Uso: Servidor HTTP e roteamento de requisições
- URL: [https://expressjs.com/](https://expressjs.com/)

**Multer:**

- Versão: 1.4.5-lts.1
- Descrição: Middleware para upload de arquivos
- Uso: Upload de imagens de perfil e fotos de eventos
- URL: [https://github.com/expressjs/multer](https://github.com/expressjs/multer)

**CORS:**

- Versão: 2.8.5
- Descrição: Middleware para habilitar Cross-Origin Resource Sharing
- Uso: Permitir requisições entre diferentes origens

### Frontend - Frameworks e Bibliotecas

**Bootstrap:**

- Versão: 5.3.8
- Descrição: Framework CSS para desenvolvimento responsivo
- Uso: Grid system, componentes UI, responsividade
- URL: [https://getbootstrap.com/](https://getbootstrap.com/)

**Bootstrap Icons:**

- Versão: 1.11.3
- Descrição: Biblioteca de ícones oficial do Bootstrap
- Uso: Ícones de interface em toda a aplicação
- URL: [https://icons.getbootstrap.com/](https://icons.getbootstrap.com/)

**Google Fonts:**

- Font: Inter (pesos 400, 500, 600, 700)
- Descrição: Tipografia moderna e legível
- Uso: Fonte principal da aplicação
- URL: [https://fonts.google.com/specimen/Inter](https://fonts.google.com/specimen/Inter)

**Material Symbols:**

- Descrição: Ícones do Material Design
- Uso: Ícones complementares na interface
- URL: [https://fonts.google.com/icons](https://fonts.google.com/icons)

### JavaScript Vanilla

A aplicação utiliza JavaScript puro (Vanilla JS) sem frameworks adicionais como jQuery, React ou Vue. Isso proporciona:

- Melhor desempenho
- Menor tamanho de carregamento
- Maior controle sobre o código
- Aprendizado dos fundamentos da linguagem

### APIs e Configurações

**API RESTful Personalizada:**

- Endpoint base: Configurado via [config.js](../codigo/public/assets/js/config.js)
- Suporta operações CRUD para todas as entidades
- Métodos HTTP: GET, POST, PUT, PATCH, DELETE

**Local Storage:**

- Uso: Armazenamento de sessão do usuário logado
- Dados armazenados: ID do usuário autenticado
- Gerenciamento: Login/logout automático

### Ferramentas de Desenvolvimento

**Nodemon:**

- Versão: 3.1.11
- Descrição: Utilitário para reinicialização automática do servidor
- Uso: Ambiente de desenvolvimento (devDependency)
- URL: [https://nodemon.io/](https://nodemon.io/)
