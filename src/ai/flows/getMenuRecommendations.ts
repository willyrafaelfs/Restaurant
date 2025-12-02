// This is a mock AI flow.
// In a real application, this would use a Genkit flow with an LLM
// to analyze user data and provide personalized recommendations.

import type { MenuItem, Reservation } from '@/lib/types';
import { menuItems } from '@/lib/data';

// A simple mock function to simulate AI recommendations
const getMockRecommendations = (reservations: Reservation[]): MenuItem[] => {
  const recommendations: MenuItem[] = [];
  const recommendedIds = new Set<string>();

  // Rule 1: If special request includes 'Birthday' or 'Anniversary', recommend a cake.
  const hasSpecialOccasion = reservations.some(r => 
    r.specialRequest?.toLowerCase().includes('birthday') || 
    r.specialRequest?.toLowerCase().includes('anniversary')
  );

  if (hasSpecialOccasion) {
    const cake = menuItems.find(item => item.name.toLowerCase().includes('cake'));
    if (cake) {
      recommendations.push(cake);
      recommendedIds.add(cake.id);
    }
  }

  // Rule 2: Recommend a popular item.
  const popularItem = menuItems.find(item => item.name.includes('Filet Mignon'));
  if (popularItem && !recommendedIds.has(popularItem.id)) {
    recommendations.push(popularItem);
    recommendedIds.add(popularItem.id);
  }

  // Rule 3: Add another random item to make it 3
  while (recommendations.length < 3 && recommendations.length < menuItems.length) {
    const randomIndex = Math.floor(Math.random() * menuItems.length);
    const randomItem = menuItems[randomIndex];
    if (randomItem && !recommendedIds.has(randomItem.id)) {
      recommendations.push(randomItem);
      recommendedIds.add(randomItem.id);
    }
  }

  return recommendations;
};

export async function getMenuRecommendations(reservations: Reservation[]): Promise<MenuItem[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, you'd call your Genkit flow here:
  // const result = await yourGenkitFlow.run({ reservations });
  // return result;

  return getMockRecommendations(reservations);
}
