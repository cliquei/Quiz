export interface Question {
  id: number;
  question: string;
  options: string[];
}

export interface GeneralAssessmentData {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  xpReward: number;
  questions: Question[];
}

export const generalAssessments: GeneralAssessmentData[] = [
  {
    id: 1,
    title: "Avaliação de Liderança",
    description: "Teste suas habilidades de gestão de equipe",
    difficulty: "Médio",
    xpReward: 50,
    questions: [
      { id: 1, question: "Você inspira confiança em sua equipe?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 2, question: "Como você lida com decisões difíceis?", options: ["Evito tomar decisões", "Delego para outros", "Tomo decisões sozinho", "Busco consenso", "Tomo decisões informadas e comunico"] },
      { id: 3, question: "Você oferece feedback construtivo regularmente?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 4, question: "Como você motiva sua equipe?", options: ["Não me preocupo com isso", "Apenas com recompensas financeiras", "Com metas claras e reconhecimento", "Com desafios e autonomia", "Com visão, apoio e desenvolvimento"] },
      { id: 5, question: "Você promove um ambiente de trabalho colaborativo?", options: ["Não", "Pouco", "Às vezes", "Geralmente", "Sempre"] },
    ]
  },
  {
    id: 2,
    title: "Teste de Comunicação",
    description: "Avalie suas habilidades de comunicação",
    difficulty: "Fácil",
    xpReward: 30,
    questions: [
      { id: 1, question: "Você se expressa de forma clara e concisa?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 2, question: "Você escuta ativamente os outros?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 3, question: "Como você reage a críticas?", options: ["Fico na defensiva", "Ignoro", "Considero e reflito", "Agradeço e busco melhorar", "Vejo como oportunidade de crescimento"] },
      { id: 4, question: "Você adapta sua comunicação a diferentes públicos?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 5, question: "Você se sente confortável em falar em público?", options: ["Não", "Pouco", "Às vezes", "Geralmente", "Sempre"] },
    ]
  },
  {
    id: 3,
    title: "Desafio de Resolução de Problemas",
    description: "Problemas complexos para testar seu raciocínio",
    difficulty: "Difícil",
    xpReward: 80,
    questions: [
      { id: 1, question: "Você identifica a raiz dos problemas rapidamente?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 2, question: "Você busca diferentes soluções para um problema?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 3, question: "Como você lida com a pressão ao resolver problemas?", options: ["Entro em pânico", "Evito a situação", "Mantenho a calma e foco", "Busco ajuda", "Analiso e tomo decisões sob pressão"] },
      { id: 4, question: "Você avalia os riscos e benefícios das soluções propostas?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 5, question: "Você implementa soluções de forma eficaz?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
    ]
  },
  {
    id: 4,
    title: "Avaliação de Trabalho em Equipe",
    description: "Como você se sai em ambientes colaborativos",
    difficulty: "Médio",
    xpReward: 60,
    questions: [
      {
        id: 1,
        question: "Como você reage quando um colega de equipe não está contribuindo adequadamente?",
        options: [
          "Confronto a pessoa diretamente",
          "Falo com o líder da equipe",
          "Tento entender a situação e oferecer ajuda",
          "Ignoro e faço o trabalho sozinho"
        ]
      },
      {
        id: 2,
        question: "Qual é sua abordagem preferida para resolver conflitos na equipe?",
        options: [
          "Evitar o conflito",
          "Mediar a discussão",
          "Tomar uma decisão unilateral",
          "Buscar consenso entre as partes"
        ]
      },
      {
        id: 3,
        question: "Como você contribui para o sucesso da equipe?",
        options: [
          "Focando apenas nas minhas tarefas",
          "Compartilhando conhecimento e ajudando outros",
          "Criticando as ideias dos colegas",
          "Delegando todo o trabalho para outros"
        ]
      }
    ]
  }
];