import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generalAssessments, GeneralAssessmentData } from "@/data/generalAssessments";

const Assessment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [assessmentData, setAssessmentData] = useState<GeneralAssessmentData | null>(null);

  useEffect(() => {
    const foundAssessment = generalAssessments.find(
      (assessment) => assessment.id === parseInt(id || "")
    );
    if (foundAssessment) {
      setAssessmentData(foundAssessment);
    } else {
      toast({
        title: "Erro",
        description: "Avaliação não encontrada.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [id, navigate, toast]);

  if (!assessmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-gray-700">Carregando avaliação...</p>
      </div>
    );
  }

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const calculateScoreAndSuggestions = () => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    assessmentData.questions.forEach((question, index) => {
      const selectedAnswer = answers[index];
      if (selectedAnswer) {
        // Assuming options are ordered from least to most desirable
        const scoreValue = question.options.indexOf(selectedAnswer) + 1;
        totalScore += scoreValue;
      }
      maxPossibleScore += question.options.length; // Max score for this question
    });

    const averageScore = (totalScore / assessmentData.questions.length);
    let suggestion = "";

    if (averageScore < 2) {
      suggestion = "Sua pontuação indica que há bastante espaço para desenvolvimento nesta área. Considere buscar mais recursos e prática.";
    } else if (averageScore < 3) {
      suggestion = "Você tem uma base sólida, mas pode se beneficiar de aprofundar seus conhecimentos e habilidades para se destacar.";
    } else if (averageScore < 4) {
      suggestion = "Sua performance é boa! Para alcançar o próximo nível, foque em refinar suas técnicas e buscar desafios mais complexos.";
    } else {
      suggestion = "Excelente desempenho! Você demonstra grande domínio. Continue aprimorando e compartilhando seu conhecimento.";
    }

    return { averageScore, suggestion };
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessmentData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const { averageScore, suggestion } = calculateScoreAndSuggestions();
      toast({
        title: "Avaliação concluída!",
        description: `Você ganhou ${assessmentData.xpReward} XP! Sua pontuação média foi de ${Math.round(averageScore * 100) / 100}. Sugestão: ${suggestion}`,
        duration: 8000,
      });
      navigate("/");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQuestionData = assessmentData.questions[currentQuestionIndex];

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
            <h1 className="text-3xl font-bold text-gray-800">
              {assessmentData.title}
            </h1>
            <p className="text-gray-600">
              Questão {currentQuestionIndex + 1} de {assessmentData.questions.length}
            </p>
          </div>
          <div className="w-20"></div> {/* Espaçador */}
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
                    {option}
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
                {currentQuestionIndex === assessmentData.questions.length - 1 ? (
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