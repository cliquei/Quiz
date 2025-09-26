import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, BarChart3, Users, Award } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AnimatedCard from "@/components/AnimatedCard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [xp, setXp] = useState(250);
  const [completedAssessments, setCompletedAssessments] = useState(3);
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: "Avaliação de Liderança",
      description: "Teste suas habilidades de gestão de equipe",
      difficulty: "Médio",
      xpReward: 50,
      completed: true,
      type: "general"
    },
    {
      id: 2,
      title: "Teste de Comunicação",
      description: "Avalie suas habilidades de comunicação",
      difficulty: "Fácil",
      xpReward: 30,
      completed: true,
      type: "general"
    },
    {
      id: 3,
      title: "Desafio de Resolução de Problemas",
      description: "Problemas complexos para testar seu raciocínio",
      difficulty: "Difícil",
      xpReward: 80,
      completed: true,
      type: "general"
    },
    {
      id: 4,
      title: "Avaliação de Trabalho em Equipe",
      description: "Como você se sai em ambientes colaborativos",
      difficulty: "Médio",
      xpReward: 60,
      completed: false,
      type: "general"
    },
    {
      id: 5,
      title: "📋 Avaliação Odontológica Completa",
      description: "Questionário profissional para dentistas - 25 questões",
      difficulty: "Avançado",
      xpReward: 100,
      completed: false,
      type: "dental"
    }
  ]);

  const levels = [
    { xpRequired: 0, title: "Iniciante" },
    { xpRequired: 100, title: "Aprendiz" },
    { xpRequired: 300, title: "Competente" },
    { xpRequired: 600, title: "Proficiente" },
    { xpRequired: 1000, title: "Especialista" }
  ];

  const currentLevelData = levels[currentLevel];
  const nextLevelData = levels[currentLevel + 1];
  const progress = ((xp - currentLevelData.xpRequired) / (nextLevelData.xpRequired - currentLevelData.xpRequired)) * 100;

  const leaderboard = [
    { position: 1, name: "Dr. João Silva", xp: 1200, level: "Especialista" },
    { position: 2, name: "Dra. Maria Santos", xp: 980, level: "Proficiente" },
    { position: 3, name: "Dr. Pedro Costa", xp: 850, level: "Proficiente" },
    { position: 4, name: "Dra. Ana Oliveira", xp: 720, level: "Competente" },
    { position: 5, name: "Dr. Carlos Lima", xp: 650, level: "Competente" }
  ];

  const achievements = [
    { title: "Primeiros Passos", description: "Complete sua primeira avaliação", unlocked: true },
    { title: "Mestre das Avaliações", description: "Complete 5 avaliações", unlocked: false },
    { title: "Top 3", description: "Entre no top 3 do ranking", unlocked: false },
    { title: "Nível Máximo", description: "Alcance o nível Especialista", unlocked: false },
    { title: "Especialista Odontológico", description: "Complete a avaliação odontológica", unlocked: false }
  ];

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

  const handleCompleteAssessment = (id: number) => {
    setAssessments(prev => 
      prev.map(assessment => 
        assessment.id === id 
          ? { ...assessment, completed: true } 
          : assessment
      )
    );
    
    const assessment = assessments.find(a => a.id === id);
    if (assessment) {
      setXp(prev => prev + assessment.xpReward);
      setCompletedAssessments(prev => prev + 1);
      
      toast({
        title: "Avaliação concluída!",
        description: `Você ganhou ${assessment.xpReward} XP!`,
      });

      // Desbloquear conquista se for a avaliação odontológica
      if (id === 5) {
        const updatedAchievements = achievements.map(ach => 
          ach.title === "Especialista Odontológico" ? { ...ach, unlocked: true } : ach
        );
        // Atualizar estado de conquistas se necessário
      }
    }
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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
                    Próximo nível: {nextLevelData.xpRequired} XP
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Target className="w-4 h-4 mr-1" />
                    {completedAssessments} avaliações concluídas
                  </Badge>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          {/* Bloco 2: Ranking */}
          <AnimatedCard className="p-6" delay={0.2}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-500" />
                Ranking Geral
              </CardTitle>
              <CardDescription>
                Top 5 profissionais da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div key={player.position} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-400' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-amber-600' : 'bg-blue-400'
                      }`}>
                        {player.position}
                      </div>
                      <div>
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm text-gray-500">{player.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{player.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>

          {/* Bloco 3: Conquistas */}
          <AnimatedCard className="p-6" delay={0.3}>
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
        <AnimatedCard className="p-6 bg-gray-950 text-white" delay={0.4}>
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
              {assessments.map((assessment, index) => (
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
                      onClick={() => 
                        assessment.completed 
                          ? handleCompleteAssessment(assessment.id) 
                          : handleStartAssessment(assessment)
                      }
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