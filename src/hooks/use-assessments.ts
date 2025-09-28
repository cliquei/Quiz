import { useState, useEffect, useCallback } from 'react';
import { AssessmentType, Question } from '@/data/initialAssessments'; // Importar do novo arquivo
import { allAssessments as initialAssessments } from '@/data/initialAssessments'; // Importar os dados iniciais

const LOCAL_STORAGE_KEY = 'assessmentsData';

export function useAssessments() {
  const [assessments, setAssessments] = useState<AssessmentType[]>(() => {
    if (typeof window !== 'undefined') {
      const savedAssessments = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedAssessments) {
        return JSON.parse(savedAssessments);
      }
    }
    return initialAssessments;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(assessments));
    }
  }, [assessments]);

  const addAssessment = useCallback((newAssessment: Omit<AssessmentType, 'id' | 'completed'>) => {
    setAssessments(prev => {
      const newId = Math.max(0, ...prev.map(a => a.id)) + 1;
      return [...prev, { ...newAssessment, id: newId, completed: false }];
    });
  }, []);

  const updateAssessment = useCallback((updatedAssessment: AssessmentType) => {
    setAssessments(prev =>
      prev.map(a => (a.id === updatedAssessment.id ? updatedAssessment : a))
    );
  }, []);

  const deleteAssessment = useCallback((id: number) => {
    setAssessments(prev => prev.filter(a => a.id !== id));
  }, []);

  const addQuestionToAssessment = useCallback((assessmentId: number, newQuestion: Omit<Question, 'id'>) => {
    setAssessments(prev =>
      prev.map(assessment => {
        if (assessment.id === assessmentId) {
          const newQuestionId = Math.max(0, ...assessment.questions.map(q => q.id)) + 1;
          return {
            ...assessment,
            questions: [...assessment.questions, { ...newQuestion, id: newQuestionId }],
          };
        }
        return assessment;
      })
    );
  }, []);

  const updateQuestionInAssessment = useCallback((assessmentId: number, updatedQuestion: Question) => {
    setAssessments(prev =>
      prev.map(assessment => {
        if (assessment.id === assessmentId) {
          return {
            ...assessment,
            questions: assessment.questions.map(q =>
              q.id === updatedQuestion.id ? updatedQuestion : q
            ),
          };
        }
        return assessment;
      })
    );
  }, []);

  const deleteQuestionFromAssessment = useCallback((assessmentId: number, questionId: number) => {
    setAssessments(prev =>
      prev.map(assessment => {
        if (assessment.id === assessmentId) {
          return {
            ...assessment,
            questions: assessment.questions.filter(q => q.id !== questionId),
          };
        }
        return assessment;
      })
    );
  }, []);

  return {
    assessments,
    addAssessment,
    updateAssessment,
    deleteAssessment,
    addQuestionToAssessment,
    updateQuestionInAssessment,
    deleteQuestionFromAssessment,
  };
}