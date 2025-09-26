import { ReactNode } from "react";

export interface Question {
  id: number;
  question: string;
  options: string[];
}

export interface AssessmentType {
  id: number;
  title: string;
  description: string;
  difficulty: "Fácil" | "Médio" | "Difícil" | "Avançado";
  xpReward: number;
  completed: boolean;
  type: "general" | "dental";
  questions: Question[];
  suggestions?: (score: number) => { title: string; description: string }[];
}

// Função para gerar sugestões genéricas
const generateGeneralSuggestions = (score: number) => {
  if (score <= 2) {
    return [
      { title: "Desenvolvimento de Habilidades Fundamentais", description: "Foque em cursos e leituras para fortalecer a base de conhecimento." },
      { title: "Prática e Aplicação", description: "Busque oportunidades para aplicar o que aprendeu em cenários práticos." },
    ];
  } else if (score <= 3) {
    return [
      { title: "Aprofundamento em Áreas Específicas", description: "Identifique lacunas e aprofunde-se em tópicos mais complexos." },
      { title: "Feedback e Colaboração", description: "Procure feedback de colegas e líderes para refinar suas abordagens." },
    ];
  } else {
    return [
      { title: "Liderança e Mentoria", description: "Considere compartilhar seu conhecimento e liderar projetos." },
      { title: "Inovação e Estratégia", description: "Explore novas tendências e pense em como inovar em sua área." },
    ];
  }
};

export const allAssessments: AssessmentType[] = [
  {
    id: 1,
    title: "Avaliação de Liderança",
    description: "Teste suas habilidades de gestão de equipe",
    difficulty: "Médio",
    xpReward: 50,
    completed: false, // Changed to false for demonstration
    type: "general",
    questions: [
      { id: 1, question: "Como você motiva sua equipe a alcançar metas?", options: ["Definindo metas claras", "Oferecendo recompensas", "Inspirando pelo exemplo", "Não me preocupo com motivação"] },
      { id: 2, question: "Qual sua abordagem para delegar tarefas?", options: ["Delegar tudo", "Delegar apenas tarefas simples", "Delegar com clareza e suporte", "Fazer tudo sozinho"] },
      { id: 3, question: "Como você lida com feedback negativo?", options: ["Ignoro", "Fico na defensiva", "Analiso e busco melhoria", "Culpo os outros"] },
    ],
    suggestions: generateGeneralSuggestions,
  },
  {
    id: 2,
    title: "Teste de Comunicação",
    description: "Avalie suas habilidades de comunicação",
    difficulty: "Fácil",
    xpReward: 30,
    completed: false, // Changed to false for demonstration
    type: "general",
    questions: [
      { id: 1, question: "Como você garante que sua mensagem é compreendida?", options: ["Repito várias vezes", "Peço confirmação", "Uso linguagem complexa", "Assumo que entenderam"] },
      { id: 2, question: "Em uma discussão, qual sua prioridade?", options: ["Vencer o argumento", "Entender o outro lado", "Evitar o confronto", "Mudar de assunto"] },
      { id: 3, question: "Como você se comunica em situações de estresse?", options: ["Grito", "Me calo", "Mantenho a calma e clareza", "Fico agressivo"] },
    ],
    suggestions: generateGeneralSuggestions,
  },
  {
    id: 3,
    title: "Desafio de Resolução de Problemas",
    description: "Problemas complexos para testar seu raciocínio",
    difficulty: "Difícil",
    xpReward: 80,
    completed: false, // Changed to false for demonstration
    type: "general",
    questions: [
      { id: 1, question: "Qual o primeiro passo ao enfrentar um problema complexo?", options: ["Entrar em pânico", "Ignorar", "Analisar a causa raiz", "Pedir para outra pessoa resolver"] },
      { id: 2, question: "Como você avalia soluções potenciais?", options: ["Escolho a primeira que aparece", "Analiso prós e contras", "Deixo para o destino", "Sigo a opinião da maioria"] },
      { id: 3, question: "O que você faz se uma solução falha?", options: ["Desisto", "Culpo a ferramenta", "Reavalio e tento outra abordagem", "Finjo que funcionou"] },
    ],
    suggestions: generateGeneralSuggestions,
  },
  {
    id: 4,
    title: "Avaliação de Trabalho em Equipe",
    description: "Como você se sai em ambientes colaborativos",
    difficulty: "Médio",
    xpReward: 60,
    completed: false, // Changed to false for demonstration
    type: "general",
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
    ],
    suggestions: generateGeneralSuggestions,
  },
  // A avaliação odontológica é uma página separada, mas a listamos aqui para consistência na Index.
  {
    id: 5,
    title: "📋 Avaliação Odontológica Completa",
    description: "Questionário profissional para dentistas - 25 questões",
    difficulty: "Avançado",
    xpReward: 100,
    completed: false,
    type: "dental",
    questions: [], // As perguntas estão na página DentalAssessment.tsx
    suggestions: (score: number) => {
      if (score <= 2) {
        return [
          { title: "Formação e Conhecimento Técnico", description: "Invista em cursos, congressos e leituras científicas para fortalecer sua base." },
          { title: "Habilidades Clínicas e Atuação Prática", description: "Busque mentoria e prática supervisionada para aprimorar suas técnicas." },
        ];
      } else if (score <= 3) {
        return [
          { title: "Gestão de Carreira e Negócios", description: "Desenvolva habilidades em precificação, marketing e gestão financeira para sua clínica." },
          { title: "Inovação e Futuro", description: "Acompanhe tendências e esteja aberto a novas tecnologias e abordagens na odontologia." },
        ];
      } else {
        return [
          { title: "Liderança e Mentoria", description: "Considere compartilhar seu conhecimento e experiência com colegas mais jovens." },
          { title: "Expansão e Especialização", description: "Explore novas especializações ou nichos de mercado para expandir sua atuação." },
        ];
      }
    },
  }
];