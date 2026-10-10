export type EducationalCategory =
  | 'Foundations'
  | 'Risk'
  | 'Costs'
  | 'Mechanics'
  | 'Strategies';

export interface EducationalTopic {
  id: string;
  term: string;
  shortDefinition: string;
  whyItMatters: string;
  example: string;
  limitationOrMisconception: string;
  category: EducationalCategory;
  relatedTopicIds: string[];
  indianContext?: string;
}

export interface WhyAmISeeingThisContext {
  dimensionKey: string;
  dimensionTitle: string;
  categoryAName: string;
  categoryBName: string;
  whyItMattersForComparison: string;
  keyDistinction: string;
  whatToExploreNext: string;
  relatedTopicId?: string;
}
