import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, User, MapPin, Award, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { useAssessments } from "@/hooks/use-assessments"; // Import useAssessments
import { useUserProgress } from "@/hooks/use-user-progress";

const DentalAssessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateProgress, completedAssessmentIds } = useUserProgress();
  const { assessments } = useAssessments(); // Usar o hook useAssessments

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [userData, setUserData] = useState({ nickname: "", city: "" });
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isAssessmentCompleted, setIsAssessmentCompleted] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const dentalAssessmentId = 5;
  const dentalAssessmentData = assessments.find(a => a.id === dentalAssessmentId);

  useEffect(() => {
    setIsAssessmentCompleted(completedAssessmentIds.includes(dentalAssessmentId));
  }, [completedAssessmentIds]);

  const assessmentData = {
    title: "📋 Questionário de Avaliação do Nível Profissional em Odontologia",
    blocks: [
      {
        title: "Bloco 1 – Formação e Conhecimento Técnico",
        questions: [
          "Com que frequência você atualiza seus conhecimentos em odontologia (cursos, congressos, especializações, leituras científicas)?",
          "Você domina protocolos e técnicas atualizadas nas principais áreas de sua atuação?",
          "Consegue realizar diagnósticos precisos e propor planos de tratamento completos para diferentes perfis de pacientes?",
          "Tem segurança na execução de procedimentos clínicos, mesmo em casos complexos?",
          "Usa tecnologias digitais (radiologia digital, CAD/CAM, escaneamento intraoral, etc.) em sua prática?"
        ]
      },
      {
        title: "Bloco 2 – Habilidades Clínicas e Atuação Prática",
        questions: [
          "Você se considera eficiente na gestão de tempo e organização dos atendimentos clínicos?",
          "Consegue lidar com intercorrências e complicações clínicas de forma resolutiva?",
          "Domina o uso de anestesias e técnicas de controle da dor?",
          "Tem boa destreza manual e atenção aos detalhes durante os procedimentos?",
          "Mantém padrões rigorosos de biossegurança e controle de infecção?"
        ]
      },
      {
        title: "Bloco 3 – Gestão de Carreira e Negócios",
        questions: [
          "Você sabe calcular custos, precificar procedimentos e gerir financeiramente sua clínica/consultório?",
          "Utiliza ferramentas de marketing digital ou estratégias de relacionamento para atrair pacientes?",
          "Tem clareza sobre seu posicionamento profissional (ex.: especialista em determinada área, clínico geral diferenciado)?",
          "Faz planejamento estratégico de médio e longo prazo para sua carreira?",
          "Consegue delegar funções e liderar equipe (secretária, auxiliar, outros dentistas)?"
        ]
      },
      {
        title: "Bloco 4 – Relacionamento e Humanização",
        questions: [
          "Você consegue se comunicar de forma clara e empática com os pacientes?",
          "Consegue transmitir confiança e segurança durante a consulta/tratamento?",
          "Dedica tempo para ouvir as queixas e expectativas do paciente antes de iniciar o atendimento?",
          "Está preparado para lidar com pacientes ansiosos ou com medo de tratamento odontológico?",
          "Recebe feedbacks positivos dos pacientes em relação ao atendimento e à experiência no consultório?"
        ]
      },
      {
        title: "Bloco 5 – Inovação e Futuro",
        questions: [
          "Você acompanha tendências de inovação em odontologia (ex.: inteligência artificial, odontologia digital, biomateriais)?",
          "Está aberto a investir em novos equipamentos e tecnologias?",
          "Tem interesse em pesquisa científica ou produção de conteúdo acadêmico/profissional?",
          "Busca diferenciação em nichos específicos de atuação?",
          "Tem clareza sobre onde deseja estar profissionalmente nos próximos 5 anos?"
        ]
      }
    ],
    options: [
      "Nunca / Muito raramente",
      "Às vezes / Parcialmente",
      "Regularmente / Moderadamente",
      "Frequentemente / Bastante",
      "Sempre / Totalmente"
    ]
  };

  const allQuestions = assessmentData.blocks.flatMap(block => block.questions);

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (showResults || !userData.nickname || !userData.city) return;

    const key = event.key;
    const optionIndex = parseInt(key, 10) - 1;

    if (optionIndex >= 0 && optionIndex < assessmentData.options.length) {
      handleAnswerSelect(assessmentData.options[optionIndex]);
    }
  }, [currentQuestion, assessmentData.options, showResults, userData.nickname, userData.city, handleAnswerSelect]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const calculateScore = () => {
    let total = 0;
    Object.values(answers).forEach(answer => {
      const scoreValue = assessmentData.options.indexOf(answer) + 1;
      total += scoreValue;
    });
    const averageScore = total / allQuestions.length;
    setScore(averageScore);
    setTotalScore(total);
    return averageScore;
  };

  const getLevel = (score: number) => {
    if (score <= 2) return { level: "Básico", description: "Necessário investir em formação, técnica e visão de carreira", color: "text-red-600" };
    if (score <= 3) return { level: "Intermediário", description: "Bom domínio, mas ainda precisa desenvolver consistência e visão estratégica", color: "text-yellow-600" };
    return { level: "Avançado", description: "Profissional consolidado tecnicamente e com carreira estruturada", color: "text-green-600" };
  };

  const handleNextQuestion = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const finalScore = calculateScore();
      const level = getLevel(finalScore);
      
      if (!isAssessmentCompleted && dentalAssessmentData) {
        updateProgress(dentalAssessmentData.xpReward, dentalAssessmentId);
        toast({
          title: "Avaliação concluída!",
          description: `Seu nível: ${level.level} - ${Math.round(finalScore * 100)/100}/5. Você ganhou ${dentalAssessmentData.xpReward} XP!`,
        });
      } else {
        toast({
          title: "Avaliação já concluída!",
          description: `Seu nível: ${level.level} - ${Math.round(finalScore * 100)/100}/5.`,
        });
      }
      
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setUserData({ nickname: "", city: "" });
    setScore(0);
    setTotalScore(0);
    setUserEmail("");
  };

  const handleUserDataSubmit = () => {
    if (!userData.nickname || !userData.city) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha seu apelido e cidade",
        variant: "destructive"
      });
      return;
    }
    setCurrentQuestion(0);
  };

  const handleSendEmail = () => {
    if (!userEmail) {
      toast({
        title: "E-mail vazio",
        description: "Por favor, insira seu e-mail para receber os resultados.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "E-mail de resultados",
      description: `Um e-mail com seus resultados foi 'enviado' para ${userEmail}. (Requer backend para envio real)`,
    });
  };

  const currentLevelResult = getLevel(score);
  const dentalAssessmentSuggestions = assessments.find(a => a.type === "dental")?.suggestions; // Usar assessments do hook
  const suggestions = dentalAssessmentSuggestions ? dentalAssessmentSuggestions(score) : [];


  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Início
            </Button>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl text-center">📊 Resultados da Avaliação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <User className="w-5 h-5" />
                    <span className="font-semibold">{userData.nickname}</span>
                    <MapPin className="w-5 h-5 ml-4" />
                    <span>{userData.city}</span>
                  </div>
                  
                  <div className={`text-3xl font-bold mb-2 ${currentLevelResult.color}`}>
                    {Math.round(score * 100)/100}/5
                  </div>
                  <div className={`text-xl font-semibold ${currentLevelResult.color}`}>
                    Nível {currentLevelResult.level}
                  </div>
                  <p className="text-gray-600 mt-2">{currentLevelResult.description}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Pontuação Total</span>
                      <span>{totalScore}/{allQuestions.length * 5}</span>
                    </div>
                    <Progress value={(totalScore / (allQuestions.length * 5)) * 100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{allQuestions.length}</div>
                      <div className="text-sm text-gray-600">Questões respondidas</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{Math.round(score * 20)}%</div>
                      <div className="text-sm text-gray-600">Percentual de acerto</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{dentalAssessmentData?.xpReward || 0}</div>
                      <div className="text-sm text-gray-600">XP Ganho</div>
                    </div>
                  </div>

                  {suggestions.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        Sugestões de Melhoria
                      </h3>
                      <div className="space-y-3">
                        {suggestions.map((sug, idx) => (
                          <div key={idx} className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 className="font-medium text-purple-800">{sug.title}</h4>
                            <p className="text-sm text-purple-700">{sug.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 p-4 border rounded-lg bg-blue-50">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      Receba seus resultados por e-mail
                    </h3>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleSendEmail} className="bg-blue-600 hover:bg-blue-700">
                        Enviar
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      O envio de e-mails requer uma integração de backend.
                      <Button 
                        variant="link" 
                        className="h-auto p-0 ml-1 text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          toast({
                            title: "Integração de Backend Necessária",
                            description: "Para enviar e-mails e gerenciar configurações de forma persistente, você precisa adicionar um backend ao seu aplicativo.",
                            duration: 5000,
                          });
                        }}
                      >
                        Adicionar Backend
                      </Button>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart} variant="outline">
                Refazer Teste
              </Button>
              <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700">
                Voltar para Início
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData.nickname || !userData.city) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Início
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">👤 Identificação</CardTitle>
                <p className="text-center text-gray-600">Antes de começar, precisamos conhecer você melhor</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nickname">Apelido ou Nome Profissional</Label>
                  <Input
                    id="nickname"
                    placeholder="Como gostaria de ser chamado?"
                    value={userData.nickname}
                    onChange={(e) => setUserData({...userData, nickname: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Cidade onde trabalha</Label>
                  <Input
                    id="city"
                    placeholder="Sua cidade de atuação"
                    value={userData.city}
                    onChange={(e) => setUserData({...userData, city: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleUserDataSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
                  Começar Avaliação
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const currentBlock = assessmentData.blocks.find(block => 
    block.questions.includes(allQuestions[currentQuestion])
  );
  const blockIndex = assessmentData.blocks.findIndex(block => 
    block.questions.includes(allQuestions[currentQuestion])
  );
  const questionInBlock = currentBlock?.questions.indexOf(allQuestions[currentQuestion]) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Início
          </Button>

          {/* Progresso */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">
                Bloco {blockIndex + 1} de {assessmentData.blocks.length}
              </span>
              <span className="text-sm text-gray-600">
                Questão {currentQuestion + 1} de {allQuestions.length}
              </span>
            </div>
            <Progress value={(currentQuestion / allQuestions.length) * 100} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-gray-600">
                {currentBlock?.title}
              </CardTitle>
              <CardTitle className="text-xl">
                {allQuestions[currentQuestion]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {assessmentData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                      <span className="font-medium">{index + 1}.</span> {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Anterior
                </Button>
                
                <Button
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestion]}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentQuestion === allQuestions.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Finalizar
                    </>
                  ) : (
                    "Próxima"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DentalAssessment;