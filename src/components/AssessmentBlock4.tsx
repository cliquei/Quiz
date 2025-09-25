"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: 1,
    text: "Como você lida com situações de crise?",
    options: [
      "Evito ao máximo",
      "Enfrento diretamente",
      "Procuro ajuda de outros",
      "Analiso cuidadosamente antes de agir"
    ]
  },
  {
    id: 2,
    text: "Qual é a sua abordagem para resolver conflitos?",
    options: [
      "Busco o consenso",
      "Imponho minha solução",
      "Evito o confronto",
      "Negocio para obter vantagens"
    ]
  },
  {
    id: 3,
    text: "Como você se sente em ambientes competitivos?",
    options: [
      "Fico motivado",
      "Fico ansioso",
      "Fico indiferente",
      "Busco destacar-me"
    ]
  }
];

const AssessmentBlock4 = ({ onComplete }: { onComplete: (answers: number[]) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(0));
    setSelectedAnswer(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Avaliação de Comportamento</CardTitle>
          <p className="text-gray-300">Questão {currentQuestion + 1} de {questions.length}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              {questions[currentQuestion].text}
            </h3>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? "border-blue-500 bg-blue-900/30 text-white"
                        : "border-gray-700 bg-gray-800 hover:bg-gray-700/50 text-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedAnswer === index 
                          ? "border-blue-500 bg-blue-500" 
                          : "border-gray-500"
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentQuestion
                      ? "bg-blue-500"
                      : index < currentQuestion
                      ? "bg-green-500"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {currentQuestion === questions.length - 1 ? "Finalizar" : "Próximo"}
                {currentQuestion < questions.length - 1 && (
                  <ChevronRight className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentBlock4;