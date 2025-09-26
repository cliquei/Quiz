// Utilitário para gerenciar armazenamento local
export interface RankingEntry {
  nickname: string;
  city: string;
  xp: number;
  level: string;
  score?: number;
  timestamp: number;
}

export const StorageUtils = {
  // Salvar resultado no ranking
  saveToRanking: (entry: Omit<RankingEntry, 'timestamp'>) => {
    const rankings = StorageUtils.getRankings();
    const newEntry = {
      ...entry,
      timestamp: Date.now()
    };
    
    // Adicionar ou atualizar entrada
    const existingIndex = rankings.findIndex(r => r.nickname === entry.nickname && r.city === entry.city);
    if (existingIndex !== -1) {
      rankings[existingIndex] = newEntry;
    } else {
      rankings.push(newEntry);
    }
    
    // Ordenar por XP (decrescente) e manter apenas top 50
    rankings.sort((a, b) => b.xp - a.xp);
    const topRankings = rankings.slice(0, 50);
    
    localStorage.setItem('gamification_rankings', JSON.stringify(topRankings));
  },
  
  // Obter rankings
  getRankings: (): RankingEntry[] => {
    try {
      const stored = localStorage.getItem('gamification_rankings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
  
  // Limpar rankings (para desenvolvimento)
  clearRankings: () => {
    localStorage.removeItem('gamification_rankings');
  }
};