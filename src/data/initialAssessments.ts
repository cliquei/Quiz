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

// Função para gerar sugestões genéricas baseadas na pontuação média (1-5)
const generateGeneralSuggestions = (score: number) => {
  if (score <= 2) { // Pontuação média de 1 a 2
    return [
      { title: "Desenvolvimento de Habilidades Fundamentais", description: "Foque em cursos, leituras e workshops para fortalecer a base de conhecimento na área avaliada." },
      { title: "Prática e Aplicação", description: "Busque oportunidades para aplicar o que aprendeu em cenários práticos e peça feedback constante." },
    ];
  } else if (score <= 3) { // Pontuação média de 2.1 a 3
    return [
      { title: "Aprofundamento em Áreas Específicas", description: "Identifique lacunas e aprofunde-se em tópicos mais complexos, buscando mentoria ou cursos avançados." },
      { title: "Feedback e Colaboração", description: "Procure feedback de colegas e líderes para refinar suas abordagens e colabore em projetos desafiadores." },
    ];
  } else { // Pontuação média de 3.1 a 5
    return [
      { title: "Liderança e Mentoria", description: "Considere compartilhar seu conhecimento e liderar projetos, atuando como mentor para outros." },
      { title: "Inovação e Estratégia", description: "Explore novas tendências, pense em como inovar em sua área e contribua para a estratégia da equipe/organização." },
    ];
  }
};

export const allAssessments: AssessmentType[] = [
  {
    id: 1,
    title: "Avaliação de Liderança",
    description: "Teste suas habilidades de gestão de equipe e influência.",
    difficulty: "Médio",
    xpReward: 50,
    completed: false,
    type: "general",
    questions: [
      { id: 1, question: "Como você define e comunica a visão e os objetivos da equipe?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 2, question: "Com que frequência você delega tarefas importantes, capacitando sua equipe?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 3, question: "Como você lida com conflitos internos na equipe?", options: ["Ignoro", "Evito", "Medio ativamente", "Busco solução rápida", "Promovo o diálogo e consenso"] },
      { id: 4, question: "Você oferece feedback construtivo regularmente aos membros da equipe?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 5, question: "Como você inspira e motiva sua equipe a alcançar resultados desafiadores?", options: ["Não me preocupo", "Com recompensas", "Pelo exemplo", "Com metas claras", "Com visão e reconhecimento"] },
      { id: 6, question: "Você promove um ambiente de trabalho onde a inovação é encorajada?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 7, question: "Como você apoia o desenvolvimento profissional dos seus liderados?", options: ["Não é minha função", "Indico cursos", "Ofereço mentoria", "Crio planos de desenvolvimento", "Incentivo autonomia e aprendizado"] },
      { id: 8, question: "Você toma decisões difíceis de forma justa e transparente?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 9, question: "Como você gerencia o desempenho individual e coletivo da equipe?", options: ["Não gerencio", "Apenas corrijo erros", "Com avaliações anuais", "Com acompanhamento contínuo", "Com metas e feedback constante"] },
      { id: 10, question: "Você é acessível e aberto a ouvir as preocupações da sua equipe?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 11, question: "Como você celebra os sucessos da equipe?", options: ["Não celebro", "Com um 'bom trabalho'", "Com pequenos reconhecimentos", "Com eventos e prêmios", "Com reconhecimento público e recompensas"] },
      { id: 12, question: "Você consegue adaptar seu estilo de liderança a diferentes situações e pessoas?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 13, question: "Como você lida com a pressão e o estresse, mantendo a calma para a equipe?", options: ["Entro em pânico", "Fico irritado", "Mantenho a calma internamente", "Transmito segurança", "Lidero com serenidade e foco"] },
      { id: 14, question: "Você incentiva a colaboração e o trabalho em equipe entre os membros?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 15, question: "Como você garante que a equipe tenha os recursos necessários para o trabalho?", options: ["Não me preocupo", "Espero que peçam", "Solicito quando necessário", "Planejo e garanto recursos", "Proativo na aquisição de recursos"] },
      { id: 16, question: "Você é um modelo de comportamento e ética para sua equipe?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 17, question: "Como você gerencia as expectativas das partes interessadas (stakeholders)?", options: ["Ignoro", "Apenas informo", "Comunicação reativa", "Comunicação proativa", "Alinho expectativas e negoceio"] },
      { id: 18, question: "Você consegue identificar e desenvolver novos líderes dentro da sua equipe?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 19, question: "Como você promove a responsabilidade e a prestação de contas?", options: ["Não promovo", "Apenas cobro", "Com metas individuais", "Com metas e acompanhamento", "Com cultura de responsabilidade"] },
      { id: 20, question: "Você se mantém atualizado sobre as melhores práticas de liderança?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 21, question: "Como você lida com falhas ou erros da equipe?", options: ["Culpo a equipe", "Ignoro", "Analiso e corrijo", "Transformo em aprendizado", "Promovo a cultura de aprendizado com erros"] },
      { id: 22, question: "Você consegue construir confiança e respeito com sua equipe?", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
    ],
    suggestions: generateGeneralSuggestions,
  },
  {
    id: 2,
    title: "Teste de Comunicação",
    description: "Avalie suas habilidades de comunicação interpessoal e profissional.",
    difficulty: "Fácil",
    xpReward: 30,
    completed: false,
    type: "general",
    questions: [
      { id: 1, question: "Você ouve ativamente, permitindo que a outra pessoa termine de falar antes de responder?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 2, question: "Sua comunicação escrita (e-mails, relatórios) é clara, concisa e fácil de entender?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 3, question: "Você adapta sua linguagem e estilo de comunicação ao seu público?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 4, question: "Como você garante que sua mensagem foi compreendida corretamente?", options: ["Assumo que sim", "Pergunto 'entendeu?'", "Peço para resumir", "Verifico a compreensão", "Busco feedback e exemplos"] },
      { id: 5, question: "Você se sente confortável em expressar suas opiniões, mesmo que sejam impopulares?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 6, question: "Como você lida com feedback negativo sobre sua comunicação?", options: ["Ignoro", "Fico na defensiva", "Analiso e considero", "Busco entender e melhorar", "Agradeço e implemento mudanças"] },
      { id: 7, question: "Você utiliza a comunicação não verbal (linguagem corporal, contato visual) de forma eficaz?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 8, question: "Você consegue mediar discussões e resolver conflitos através da comunicação?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 9, question: "Como você se comunica em situações de alta pressão ou estresse?", options: ["Grito/Me calo", "Fico agressivo", "Mantenho a calma", "Com clareza e objetividade", "Lidero a comunicação com serenidade"] },
      { id: 10, question: "Você é capaz de apresentar ideias complexas de forma simples e envolvente?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 11, question: "Você busca clareza ao fazer perguntas e pedir informações?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 12, question: "Você evita jargões técnicos desnecessários ao falar com não-especialistas?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 13, question: "Você é empático, tentando entender a perspectiva do outro ao se comunicar?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 14, question: "Você consegue dar feedback construtivo de forma eficaz?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 15, question: "Você se sente à vontade para falar em público?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 16, question: "Como você lida com interrupções durante uma conversa?", options: ["Ignoro", "Fico irritado", "Interrompo de volta", "Peço para esperar", "Gerencio com educação e foco"] },
      { id: 17, question: "Você utiliza diferentes canais de comunicação (presencial, e-mail, chat) de forma apropriada?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 18, question: "Você consegue resumir pontos chave de uma discussão de forma eficaz?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 19, question: "Você é proativo em compartilhar informações relevantes com sua equipe/colegas?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 20, question: "Você consegue manter a calma e a objetividade em discussões acaloradas?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 21, question: "Você verifica a compreensão do ouvinte após transmitir informações importantes?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
      { id: 22, question: "Você se preocupa em construir um bom relacionamento através da comunicação?", options: ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"] },
    ],
    suggestions: generateGeneralSuggestions,
  },
  {
    id: 3,
    title: "Desafio de Resolução de Problemas",
    description: "Problemas complexos para testar seu raciocínio e capacidade analítica.",
    difficulty: "Difícil",
    xpReward: 80,
    completed: false,
    type: "general",
    questions: [
      { id: 1, question: "Qual o seu primeiro passo ao identificar um problema complexo?", options: ["Entrar em pânico", "Ignorar", "Analisar a causa raiz", "Buscar soluções imediatas", "Definir o problema e coletar dados"] },
      { id: 2, question: "Você consegue analisar a causa raiz de um problema, em vez de apenas tratar os sintomas?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 3, question: "Você gera múltiplas soluções potenciais antes de escolher uma?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 4, question: "Como você avalia os riscos e benefícios de cada solução proposta?", options: ["Não avalio", "Intuitivamente", "De forma básica", "Com análise estruturada", "Com análise detalhada e cenários"] },
      { id: 5, question: "Você se sente confortável em tomar decisões sob incerteza?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 6, question: "Como você implementa uma solução, garantindo que ela seja eficaz?", options: ["Apenas executo", "Com plano básico", "Com acompanhamento", "Com plano detalhado e monitoramento", "Com plano, monitoramento e ajustes contínuos"] },
      { id: 7, question: "Você monitora os resultados da solução implementada e faz ajustes se necessário?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 8, question: "Você busca diferentes perspectivas e opiniões ao resolver um problema?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 9, question: "Como você lida com a frustração quando uma solução inicial falha?", options: ["Desisto", "Culpo outros", "Fico desmotivado", "Reavalio e tento novamente", "Aprendo com a falha e persisto"] },
      { id: 10, question: "Você consegue quebrar problemas grandes em partes menores e mais gerenciáveis?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 11, question: "Você utiliza dados e evidências para embasar suas decisões?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 12, question: "Você é criativo na busca por soluções inovadoras?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 13, question: "Como você prioriza problemas quando há vários para resolver?", options: ["Não priorizo", "Pelo mais fácil", "Pelo mais urgente", "Com base no impacto", "Com análise de impacto e urgência"] },
      { id: 14, question: "Você consegue antecipar problemas potenciais antes que eles ocorram?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 15, question: "Você documenta o processo de resolução de problemas para aprendizado futuro?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 16, question: "Você se sente à vontade em pedir ajuda ou consultar especialistas quando necessário?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 17, question: "Como você lida com a pressão do tempo ao resolver problemas urgentes?", options: ["Entro em pânico", "Tomo decisões precipitadas", "Mantenho a calma e foco", "Priorizo e delego", "Gerencio o tempo e a equipe eficazmente"] },
      { id: 18, question: "Você consegue manter o foco no objetivo final ao enfrentar obstáculos?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 19, question: "Você considera o impacto das suas soluções em outras áreas ou pessoas?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 20, question: "Você aprende com os problemas resolvidos e aplica esse conhecimento em situações futuras?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 21, question: "Você consegue identificar padrões em problemas recorrentes?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
      { id: 22, question: "Você é proativo na busca por melhorias, mesmo quando não há um problema óbvio?", options: ["Muito fraco", "Fraco", "Regular", "Bom", "Excelente"] },
    ],
    suggestions: generateGeneralSuggestions,
  },
  {
    id: 4,
    title: "Avaliação de Trabalho em Equipe",
    description: "Como você se sai em ambientes colaborativos.",
    difficulty: "Médio",
    xpReward: 60,
    completed: false,
    type: "general",
    questions: [
      { id: 1, question: "Eu me comunico de forma clara e eficaz com os membros da minha equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 2, question: "Eu contribuo ativamente para as discussões e decisões da equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 3, question: "Eu ofereço ajuda aos meus colegas quando percebo que precisam.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 4, question: "Eu respeito as diferentes opiniões e estilos de trabalho dos membros da equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 5, question: "Eu sou proativo em compartilhar informações relevantes com a equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 6, question: "Eu lido com conflitos na equipe buscando o consenso e a mediação.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 7, question: "Eu me sinto responsável pelo sucesso coletivo da equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 8, question: "Eu sou flexível e adaptável a mudanças de planos ou prioridades da equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 9, question: "Eu ajudo a construir um ambiente de confiança e respeito na equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 10, question: "Eu celebro os sucessos da equipe e reconheço o esforço dos colegas.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 11, question: "Eu me sinto à vontade em assumir a liderança em um projeto de equipe, se necessário.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 12, question: "Eu busco feedback sobre meu desempenho em equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 13, question: "Eu consigo lidar com a pressão de prazos apertados em equipe, mantendo a calma.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 14, question: "Eu contribuo para a criação de um plano de ação claro para a equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 15, question: "Eu tento entender a situação e oferecer ajuda quando um colega não está contribuindo adequadamente.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 16, question: "Eu valorizo a diversidade de ideias e experiências na equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 17, question: "Eu me preocupo em manter um bom relacionamento com todos os membros da equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 18, question: "Eu sou capaz de delegar tarefas de forma eficaz dentro da equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 19, question: "Eu consigo motivar meus colegas a alcançar metas em conjunto.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 20, question: "Eu promovo um ambiente onde todos se sentem seguros para expressar suas ideias.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 21, question: "Eu ajudo a resolver problemas que surgem no trabalho em equipe.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
      { id: 22, question: "Eu me esforço para garantir que as tarefas da equipe sejam concluídas dentro do prazo.", options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"] },
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