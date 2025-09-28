import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, Users, Award, Settings } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AnimatedCard from "@/components/AnimatedCard";
import { useToast } from "@/hooks/use-toast";
import { useAssessments } from "@/hooks/use-assessments"; // Import useAssessments
import { useUserProgress } from "@/hooks/use-user-progress";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { xp, currentLevel, completedAssessmentIds, achievements, levels, resetProgress } = useUserProgress();
  const { assessments } = useAssessments(); // Usar o hook useAssessments

  // Use assessments do hook, mas marque como concluídas com base no estado persistente
  const assessmentsWithCompletion = assessments.map(assessment => ({
    ...assessment,
    completed: completedAssessmentIds.includes(assessment.id)
  }));

  const currentLevelData = levels[currentLevel];
  const nextLevelData = levels[currentLevel + 1] || { xpRequired: xp + 1, title: "Mestre Supremo" }; // Fallback for max level
  const progress = nextLevelData ? ((xp - currentLevelData.xpRequired) / (nextLevelData.xpRequired - currentLevelData.xpRequired)) * 100 : 100;

  const handleStartAssessment = (assessment: any) => {
    if (assessment.type === "dental") {
      navigate("/dental-assessment");
    } else {
      navigate(`/assessment/${assessment.id}`);
    }
    
    toast({
      title: "Avaliação iniciada!",
      description: `Você começou a avaliação: ${assessment.title}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Sistema de Avaliação Gamificado
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforme suas avaliações em uma experiência divertida e motivadora com nosso sistema gamificado
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Button onClick={resetProgress} variant="destructive">
              Resetar Progresso
            </Button>
            <Button onClick={() => navigate("/admin")} variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Área Admin
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"> {/* Ajustado para 2 colunas */}
          {/* Bloco 1: Progresso do Usuário */}
          <AnimatedCard className="p-6" delay={0.1}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Seu Progresso
              </CardTitle>
              <CardDescription>
                Nível {currentLevel + 1}: {currentLevelData.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">XP: {xp}</span>
                  <span className="text-sm text-gray-500">
                    {nextLevelData.title === "Mestre Supremo" ? "Nível Máximo Atingido!" : `Próximo nível (${nextLevelData.title}): ${nextLevelData.xpRequired} XP`}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Target className="w-4 h-4 mr-1" />
                    {completedAssessmentIds.length} avaliações concluídas
                  </Badge>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          {/* Bloco 3: Conquistas */}
          <AnimatedCard className="p-6" delay={0.2}> {/* Ajustado delay */}
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-500" />
                Conquistas
              </CardTitle>
              <CardDescription>
                Desbloqueie recompensas ao progredir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                    achievement.unlocked 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.unlocked 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Star className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${
                        achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {achievement.description}
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Conquistado
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Bloco 4: Avaliações Disponíveis */}
        <AnimatedCard className="p-6 bg-gray-950 text-white" delay={0.3}> {/* Ajustado delay */}
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="w-6 h-6 text-blue-400" />
              Avaliações Disponíveis
            </CardTitle>
            <CardDescription className="text-gray-300">
              Escolha sua próxima avaliação e ganhe XP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessmentsWithCompletion.map((assessment, index) => (
                <div key={assessment.id} className={`p-4 rounded-lg border ${
                  assessment.completed 
                    ? 'bg-green-950/40 border-green-500/50' 
                    : 'bg-gray-800/80 border-gray-500/50'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white">{assessment.title}</h3>
                    <Badge variant={assessment.completed ? "outline" : "secondary"} className={
                      assessment.completed 
                        ? 'bg-green-500/20 text-green-200 border-green-400/50' 
                        : assessment.type === 'dental'
                        ? 'bg-purple-500/20 text-purple-200 border-purple-400/50'
                        : 'bg-blue-500/20 text-blue-200 border-blue-400/50'
                    }>
                      {assessment.difficulty}
                      {assessment.type === 'dental' && ' 🦷'}
                    </Badge>
                  </div>
                  <p className="text-gray-200 text-sm mb-3">{assessment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-300" />
                      <span className="text-yellow-200 text-sm font-medium">
                        +{assessment.xpReward} XP
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant={assessment.completed ? "outline" : "default"}
                      onClick={() => handleStartAssessment(assessment)}
                      disabled={assessment.completed} // Desabilita o botão se a avaliação já foi concluída
                      className={
                        assessment.completed 
                          ? 'bg-transparent text-green-200 border-green-300 hover:bg-green-900/40' 
                          : assessment.type === 'dental'
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }
                    >
                      {assessment.completed ? 'Concluído' : 'Iniciar'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </AnimatedCard>

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;