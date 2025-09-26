import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Assessment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Dados simulados da avaliação
  const assessmentData = {
    id: 4,
    title: "Avaliação de Trabalho em Equipe",
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
    xpReward: 60
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < assessmentData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Todas as questões respondidas
      toast({
        title: "Avaliação concluída!",
        description: `Você ganhou ${assessmentData.xpReward} XP!`,
      });
      navigate("/");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQuestionData = assessmentData.questions[currentQuestion];

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
            <h1 className="text-3xl font-bold text-gray-800">{assessmentData.title}</h1>
            <p className="text-gray-600">Questão {currentQuestion + 1} de {assessmentData.questions.length}</p>
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
              value={answers[currentQuestion] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {currentQuestionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
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
                disabled={currentQuestion === 0}
              >
                Anterior
              </Button>
              
              <Button
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestion]}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === assessmentData.questions.length - 1 ? (
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