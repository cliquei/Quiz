"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MadeWithDyad } from "@/components/made-with-dyad";

const questions = [
  // Bloco 1 – Formação e Conhecimento Técnico
  "Com que frequência você atualiza seus conhecimentos em odontologia (cursos, congressos, especializações, leituras científicas)?",
  "Você domina protocolos e técnicas atualizadas nas principais áreas de sua atuação?",
  "Consegue realizar diagnósticos precisos e propor planos de tratamento completos para diferentes perfis de pacientes?",
  "Tem segurança na execução de procedimentos clínicos, mesmo em casos complexos?",
  "Usa tecnologias digitais (radiologia digital, CAD/CAM, escaneamento intraoral, etc.) em sua prática?",
  
  // Bloco 2 – Habilidades Clínicas e Atuação Prática
  "Você se considera eficiente na gestão de tempo e organização dos atendimentos clínicos?",
  "Consegue lidar com intercorrências e complicações clínicas de forma resolutiva?",
  "Domina o uso de anestesias e técnicas de controle da dor?",
  "Tem boa destreza manual e atenção aos detalhes durante os procedimentos?",
  "Mantém padrões rigorosos de biossegurança e controle de infecção?",
  
  // Bloco 3 – Gestão de Carreira e Negócios
  "Você sabe calcular custos, precificar procedimentos e gerir financeiramente sua clínica/consultório?",
  "Utiliza ferramentas de marketing digital ou estratégias de relacionamento para atrair pacientes?",
  "Tem clareza sobre seu posicionamento profissional (ex.: especialista em determinada área, clínico geral diferenciado)?",
  "Faz planejamento estratégico de médio e longo prazo para sua carreira?",
  "Consegue delegar funções e liderar equipe (secretária, auxiliar, outros dentistas)?",
  
  // Bloco 4 – Relacionamento e Humanização
  "Você consegue se comunicar de forma clara e empática com os pacientes?",
  "Consegue transmitir confianza e segurança durante a consulta/tratamento?",
  "Dedica tempo para ouvir as queixas e expectativas do paciente antes de iniciar o atendimento?",
  "Está preparado para lidar com pacientes ansiosos ou com medo de tratamento odontológico?",
  "Recebe feedbacks positivos dos pacientes em relação ao atendimento e à experiência no consultório?",
  
  // Bloco 5 – Inovação e Futuro
  "Você acompanha tendências de inovação em odontologia (ex.: inteligência artificial, odontologia digital, biomateriais)?",
  "Está aberto a investir em novos equipamentos e tecnologias?",
  "Tem interesse em pesquisa científica ou produção de conteúdo acadêmico/profissional?",
  "Busca diferenciação em nichos específicos de atuação?",
  "Tem clareza sobre onde deseja estar profissionalmente nos próximos 5 anos?"
];

const blockColors = [
  "bg-blue-900",    // Azul marinho
  "bg-blue-300",    // Azul piscina
  "bg-gray-400",    // Cinza
  "bg-amber-50",    // Creme
  "bg-blue-800"     // Azul marinho escuro
];

const blockTitles = [
  "Formação e Conhecimento Técnico",
  "Habilidades Clínicas e Atuação Prática",
  "Gestão de Carreira e Negócios",
  "Relacionamento e Humanização",
  "Inovação e Futuro"
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{ score: number; level: string; message: string } | null>(null);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
      setShowResult(true);
    }
  };

  const calculateResult = (answersArray: number[]) => {
    const totalScore = answersArray.reduce((sum, answer) => sum + answer, 0);
    const averageScore = totalScore / questions.length;
    
    let level = "";
    let message = "";
    
    if (averageScore <= 2) {
      level = "Nível Básico";
      message = "Necessário investir em formação, técnica e visão de carreira.";
    } else if (averageScore <= 3) {
      level = "Nível Intermediário";
      message = "Bom domínio, mas ainda precisa desenvolver consistência e visão estratégica.";
    } else {
      level = "Nível Avançado";
      message = "Profissional consolidado tecnicamente e com carreira estruturada.";
    }
    
    setResult({
      score: parseFloat(averageScore.toFixed(1)),
      level,
      message
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(0));
    setShowResult(false);
    setResult(null);
  };

  const getCurrentBlock = () => {
    return Math.floor(currentQuestion / 5);
  };

  const getBlockScore = (blockIndex: number) => {
    const start = blockIndex * 5;
    const end = start + 5;
    const blockAnswers = answers.slice(start, end);
    const score = blockAnswers.reduce((sum, answer) => sum + answer, 0) / 5;
    return parseFloat(score.toFixed(1));
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Teste seu Conhecimento
            </h1>
            <p className="text-xl text-gray-700">
              Descubra sua nota em gestão de clínicas
            </p>
          </div>

          <Card className="mb-8 border-2 border-blue-300 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl text-blue-900">
                Seu Resultado
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-900 text-white rounded-full w-40 h-40 flex items-center justify-center">
                  <span className="text-5xl font-bold">{result.score}</span>
                  <span className="text-2xl">/5</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{result.level}</h3>
              <p className="text-lg mb-6">{result.message}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                {blockTitles.map((title, index) => (
                  <div 
                    key={index} 
                    className={`${blockColors[index]} p-4 rounded-lg text-white`}
                  >
                    <h4 className="font-bold text-sm mb-2">{title}</h4>
                    <p className="text-2xl font-bold">{getBlockScore(index)}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={resetQuiz}
                className="bg-blue-900 hover:bg-blue-800 text-white text-lg py-6 px-8"
              >
                Refazer Teste
              </Button>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Com este teste descubra as áreas onde precisa melhorar para alcançar novos patamares</h3>
            <p className="text-gray-700 mb-8">
              Identifique suas áreas de melhoria e desenvolva um plano de ação para avançar na sua carreira odontológica.
            </p>
          </div>
          
          <MadeWithDyad />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Teste seu Conhecimento
          </h1>
          <p className="text-xl text-gray-700">
            Descubra sua nota em gestão de clínicas
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Com este teste descubra as áreas onde precisa melhorar para alcançar novos patamares
          </p>
        </div>

        <Card className={`${blockColors[getCurrentBlock()]} border-2 border-white shadow-lg mb-8`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="text-lg py-2 px-4">
                Pergunta {currentQuestion + 1} de {questions.length}
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                Bloco {getCurrentBlock() + 1}: {blockTitles[getCurrentBlock()]}
              </Badge>
            </div>
            <Progress 
              value={((currentQuestion + 1) / questions.length) * 100} 
              className="mt-4 h-3" 
            />
          </CardHeader>
          <CardContent className="pt-6">
            <CardTitle className="text-xl md:text-2xl mb-8 text-white">
              {questions[currentQuestion]}
            </CardTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className="h-20 text-lg font-bold bg-white text-blue-900 hover:bg-amber-100 hover:text-blue-800 border-2 border-white"
                  variant="outline"
                >
                  {value}
                </Button>
              ))}
            </div>
            
            <div className="flex justify-between mt-4 text-white">
              <span>Mínimo</span>
              <span>Máximo</span>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {blockTitles.map((title, index) => (
            <div 
              key={index} 
              className={`${blockColors[index]} p-4 rounded-lg text-white text-center ${getCurrentBlock() === index ? 'ring-4 ring-white' : ''}`}
            >
              <h4 className="font-bold text-sm mb-2">Bloco {index + 1}</h4>
              <p className="text-xs">{title}</p>
            </div>
          ))}
        </div>
        
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;