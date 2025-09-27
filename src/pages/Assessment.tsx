import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Importar Input
import { ArrowLeft, CheckCircle, Award, Mail } from "lucide-react"; // Importar Mail icon
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { allAssessments, AssessmentType } from "@/data/assessments";
import { useUserProgress } from "@/hooks/use-user-progress";

const Assessment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateProgress, completedAssessmentIds } = useUserProgress();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isAssessmentCompleted, setIsAssessmentCompleted] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // Estado para o e-mail do usuário

  const assessment: AssessmentType | undefined = allAssessments.find(
    (a) => a.id === Number(id) && a.type === "general"
  );

  useEffect(() => {
    if (assessment) {
      setIsAssessmentCompleted(completedAssessmentIds.includes(assessment.id));
    }
  }, [assessment, completedAssessmentIds]);

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  // Função para lidar com a seleção de respostas via teclado
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (showResults || !assessment) return;

    const key = event.key;
    const optionIndex = parseInt(key, 10) - 1; // '1' -> index 0, '2' -> index 1, etc.

    if (optionIndex >= 0 && optionIndex < assessment.questions[currentQuestionIndex].options.length) {
      handleAnswerSelect(assessment.questions[currentQuestionIndex].options[optionIndex]);
    }
  }, [currentQuestionIndex, assessment, showResults, handleAnswerSelect]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);


  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Avaliação Não Encontrada</h1>
          <p className="text-xl text-gray-600 mb-4">
            A avaliação que você procura não existe ou não é do tipo geral.
          </p>
          <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700">
            Voltar para Início
          </Button>
        </div>
      </div>
    );
  }

  const calculateScore = () => {
    let total = 0;
    Object.values(answers).forEach((answer, index) => {
      const questionOptions = assessment.questions[index].options;
      const scoreValue = questionOptions.indexOf(answer) + 1; // Assuming 1-based scoring
      total += scoreValue;
    });
    const averageScore = total / assessment.questions.length;
    setScore(averageScore);
    setTotalScore(total);
    return averageScore;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateScore();
      setShowResults(true);
      if (!isAssessmentCompleted) {
        updateProgress(assessment.xpReward, assessment.id);
        toast({
          title: "Avaliação concluída!",
          description: `Você ganhou ${assessment.xpReward} XP!`,
        });
      } else {
        toast({
          title: "Avaliação já concluída!",
          description: "Você já completou esta avaliação anteriormente.",
        });
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
    setTotalScore(0);
    setUserEmail("");
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
    // Aqui você integraria com um serviço de backend para enviar o e-mail.
    // Por exemplo, usando uma API do Supabase Functions ou outro serviço de e-mail.
    toast({
      title: "E-mail de resultados",
      description: `Um e-mail com seus resultados foi 'enviado' para ${userEmail}. (Requer backend para envio real)`,
    });
  };

  const currentQuestionData = assessment.questions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;
  const suggestions = assessment.suggestions ? assessment.suggestions(score) : [];

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
                  <div className="text-3xl font-bold mb-2 text-blue-600">
                    {Math.round(score * 100) / 100} / {assessment.questions[0].options.length}
                  </div>
                  <p className="text-gray-600 mt-2">
                    {isAssessmentCompleted ? "Você já havia completado esta avaliação." : `Você ganhou ${assessment.xpReward} XP!`}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Pontuação Total</span>
                      <span>{totalScore} / {assessment.questions.length * assessment.questions[0].options.length}</span>
                    </div>
                    <Progress value={(totalScore / (assessment.questions.length * assessment.questions[0].options.length)) * 100} className="h-2" />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">{assessment.title}</h1>
            <p className="text-gray-600">
              Questão {currentQuestionIndex + 1} de {assessment.questions.length}
            </p>
          </div>
          <div className="w-20"></div> {/* Espaçador */}
        </div>

        {/* Progresso */}
        <div className="mb-6">
          <Progress value={progressValue} className="h-2" />
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestionData.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestionIndex] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {currentQuestionData.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
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
                disabled={currentQuestionIndex === 0}
              >
                Anterior
              </Button>

              <Button
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestionIndex]}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestionIndex === assessment.questions.length - 1 ? (
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
  );
};

export default Assessment;