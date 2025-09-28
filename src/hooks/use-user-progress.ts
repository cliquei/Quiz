import { useState, useEffect } from "react";
import { allAssessments as initialAssessments, AssessmentType } from "@/data/initialAssessments"; // Importar do novo arquivo

interface UserProgress {
  xp: number;
  currentLevel: number;
  completedAssessmentIds: number[];
  achievements: { title: string; description: string; unlocked: boolean }[];
}

const initialAchievements = [
  { title: "Primeiros Passos", description: "Complete sua primeira avaliação", unlocked: false },
  { title: "Mestre das Avaliações", description: "Complete 5 avaliações", unlocked: false },
  { title: "Top 3", description: "Entre no top 3 do ranking (simulado)", unlocked: false }, // Simulado, pois o ranking não é persistente
  { title: "Nível Máximo", description: "Alcance o nível Especialista", unlocked: false },
  { title: "Especialista Odontológico", description: "Complete a avaliação odontológica", unlocked: false }
];

const levels = [
  { xpRequired: 0, title: "Iniciante" },
  { xpRequired: 100, title: "Aprendiz" },
  { xpRequired: 300, title: "Competente" },
  { xpRequired: 600, title: "Proficiente" },
  { xpRequired: 1000, title: "Especialista" }
];

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== "undefined") {
      const savedProgress = localStorage.getItem("userProgress");
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        // Ensure achievements are always up-to-date with initialAchievements structure
        const mergedAchievements = initialAchievements.map(initialAch => {
          const existingAch = parsedProgress.achievements?.find((a: any) => a.title === initialAch.title);
          return { ...initialAch, unlocked: existingAch ? existingAch.unlocked : initialAch.unlocked };
        });
        return { ...parsedProgress, achievements: mergedAchievements };
      }
    }
    return {
      xp: 0,
      currentLevel: 0,
      completedAssessmentIds: [],
      achievements: initialAchievements,
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userProgress", JSON.stringify(progress));
    }
  }, [progress]);

  const updateProgress = (newXp: number, completedId?: number) => {
    setProgress(prev => {
      let updatedXp = prev.xp + newXp;
      let updatedLevel = prev.currentLevel;
      let updatedCompletedIds = completedId
        ? [...new Set([...prev.completedAssessmentIds, completedId])]
        : prev.completedAssessmentIds;
      let updatedAchievements = [...prev.achievements];

      // Update level based on XP
      for (let i = levels.length - 1; i >= 0; i--) {
        if (updatedXp >= levels[i].xpRequired) {
          updatedLevel = i;
          break;
        }
      }

      // Unlock achievements
      if (updatedCompletedIds.length >= 1) {
        const firstStepsAch = updatedAchievements.find(a => a.title === "Primeiros Passos");
        if (firstStepsAch && !firstStepsAch.unlocked) {
          firstStepsAch.unlocked = true;
        }
      }
      if (updatedCompletedIds.length >= 5) {
        const masterAch = updatedAchievements.find(a => a.title === "Mestre das Avaliações");
        if (masterAch && !masterAch.unlocked) {
          masterAch.unlocked = true;
        }
      }
      if (updatedLevel === levels.length - 1) { // Max level
        const maxLevelAch = updatedAchievements.find(a => a.title === "Nível Máximo");
        if (maxLevelAch && !maxLevelAch.unlocked) {
          maxLevelAch.unlocked = true;
        }
      }
      if (completedId === 5) { // Dental Assessment ID
        const dentalAch = updatedAchievements.find(a => a.title === "Especialista Odontológico");
        if (dentalAch && !dentalAch.unlocked) {
          dentalAch.unlocked = true;
        }
      }
      // Note: "Top 3" achievement is simulated and not automatically unlocked here.

      return {
        xp: updatedXp,
        currentLevel: updatedLevel,
        completedAssessmentIds: updatedCompletedIds,
        achievements: updatedAchievements,
      };
    });
  };

  const resetProgress = () => {
    setProgress({
      xp: 0,
      currentLevel: 0,
      completedAssessmentIds: [],
      achievements: initialAchievements,
    });
  };

  return {
    xp: progress.xp,
    currentLevel: progress.currentLevel,
    completedAssessmentIds: progress.completedAssessmentIds,
    achievements: progress.achievements,
    updateProgress,
    resetProgress,
    levels,
  };
}