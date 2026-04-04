'use server';
/**
 * @fileOverview An AI-powered FAQ assistant flow for Moran Paz's BeinMe practice.
 * This flow now dynamically fetches content from Firestore to ensure responses are always up-to-date.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {initializeFirebase} from '@/firebase';
import {collection, getDocs} from 'firebase/firestore';

const AIPoweredFaqAssistantInputSchema = z.object({
  question: z.string().describe('The user\'s question about Moran Paz\'s practice.'),
});
export type AIPoweredFaqAssistantInput = z.infer<typeof AIPoweredFaqAssistantInputSchema>;

const AIPoweredFaqAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the user\'s question, based on the dynamic site context.'),
});
export type AIPoweredFaqAssistantOutput = z.infer<typeof AIPoweredFaqAssistantOutputSchema>;

const faqPrompt = ai.definePrompt({
  name: 'faqPrompt',
  input: {
    schema: AIPoweredFaqAssistantInputSchema.extend({
      dynamicContext: z.string().describe('Latest content from the website database.')
    })
  },
  output: {schema: AIPoweredFaqAssistantOutputSchema},
  prompt: `אתה עוזר וירטואלי למרחב הטיפול "BeinMe — להיות אני בתוכי" של מורן פז. המטרה שלך היא לענות על שאלות משתמשים בצורה תמציתית, חמה ומדויקת.

  המידע הבא נשלף כרגע ממסד הנתונים המעודכן של האתר:
  {{{dynamicContext}}}

  הנחיות לתשובה:
  - ענה אך ורק על סמך המידע שסופק לעיל.
  - אם המידע לא קיים, הפנה את המשתמש ליצירת קשר עם מורן בטלפון 050-781-7338.
  - שמור על טון אמפתי ומקצועי.

  שאלת המשתמש: {{{question}}}

  תשובה:`,
});

const aiPoweredFaqAssistantFlow = ai.defineFlow(
  {
    name: 'aiPoweredFaqAssistantFlow',
    inputSchema: AIPoweredFaqAssistantInputSchema,
    outputSchema: AIPoweredFaqAssistantOutputSchema,
  },
  async input => {
    // 1. Initialize Firebase on the server
    const { firestore } = initializeFirebase();

    // 2. Fetch all site content and blog post summaries to build dynamic context
    let dynamicContext = "";
    try {
      const siteContentSnap = await getDocs(collection(firestore, 'siteContent'));
      const blogPostsSnap = await getDocs(collection(firestore, 'blogPosts'));

      const pagesInfo = siteContentSnap.docs.map(doc => {
        const data = doc.data();
        return `עמוד: ${data.heroTitle || doc.id}\nתוכן: ${data.introContent || ''}\nשירותים: ${JSON.stringify(data.features || [])}`;
      }).join('\n\n');

      const blogInfo = blogPostsSnap.docs.map(doc => {
        const data = doc.data();
        return `מאמר בבלוג: ${data.title}\nתקציר: ${data.summary || ''}`;
      }).join('\n');

      dynamicContext = `--- מידע מהעמודים ---\n${pagesInfo}\n\n--- מידע מהבלוג ---\n${blogInfo}`;
    } catch (e) {
      console.error("Error fetching dynamic context for AI:", e);
      dynamicContext = "מידע כללי: מורן פז היא פסיכותרפיסטית הוליסטית המנהלת את מרחב BeinMe בטבעון ובאונליין.";
    }

    // 3. Run the prompt with the dynamic context
    const {output} = await faqPrompt({
      ...input,
      dynamicContext
    });
    
    return output!;
  }
);

export async function aiPoweredFaqAssistant(
  input: AIPoweredFaqAssistantInput
): Promise<AIPoweredFaqAssistantOutput> {
  return aiPoweredFaqAssistantFlow(input);
}
