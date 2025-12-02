'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized menu recommendations based on user booking history and preferences.
 *
 * @exports {
 *   getMenuRecommendation - Function to trigger the menu recommendation flow.
 *   MenuRecommendationInput - Input type for the getMenuRecommendation function.
 *   MenuRecommendationOutput - Output type for the getMenuRecommendation function.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MenuRecommendationInputSchema = z.object({
  bookingHistory: z.string().describe('The user booking history including past special requests, dates, and party sizes.'),
  menuItems: z.string().describe('The available menu items with descriptions and prices.'),
});
export type MenuRecommendationInput = z.infer<typeof MenuRecommendationInputSchema>;

const MenuRecommendationOutputSchema = z.object({
  recommendations: z.string().describe('Personalized menu recommendations based on the user booking history and available menu items.'),
});
export type MenuRecommendationOutput = z.infer<typeof MenuRecommendationOutputSchema>;

export async function getMenuRecommendation(input: MenuRecommendationInput): Promise<MenuRecommendationOutput> {
  return menuRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'menuRecommendationPrompt',
  input: {schema: MenuRecommendationInputSchema},
  output: {schema: MenuRecommendationOutputSchema},
  prompt: `You are a restaurant expert. Analyze the user's booking history and preferences and recommend menu items.\n\nBooking History: {{{bookingHistory}}}\n\nMenu Items: {{{menuItems}}}\n\nBased on this information, what menu items would you suggest? Please provide the answer in markdown format.`,
});

const menuRecommendationFlow = ai.defineFlow(
  {
    name: 'menuRecommendationFlow',
    inputSchema: MenuRecommendationInputSchema,
    outputSchema: MenuRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
