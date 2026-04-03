'use server';
/**
 * @fileOverview An AI-powered FAQ assistant flow for Moran Paz's BeinMe practice.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredFaqAssistantInputSchema = z.object({
  question: z.string().describe('The user\'s question about Moran Paz\'s practice.'),
});
export type AIPoweredFaqAssistantInput = z.infer<typeof AIPoweredFaqAssistantInputSchema>;

const AIPoweredFaqAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the user\'s question, based on the provided context.'),
});
export type AIPoweredFaqAssistantOutput = z.infer<typeof AIPoweredFaqAssistantOutputSchema>;

const siteContent = `
  ## אודות מורן פז וגישת BeinMe (About Moran Paz & BeinMe)
  מורן פז היא פסיכותרפיסטית הוליסטית המפעילה את מרחב הטיפול "BeinMe — להיות אני בתוכי".
  היא מאמינה ששינוי מתחיל מפגישה וקבלה של חלקים שבנו. בכל טיפת חושך אפשר לשפוך את אור המודעות ולהאיר את עצמנו.
  היא בוגרת M.A בייעוץ ארגוני מאוניברסיטת חיפה ובעלת הכשרה מעמיקה בפסיכותרפיה הוליסטית.
  
  ## האג'נדה הטיפולית
  הרגשות הם המצפן שלנו ולכל אחד מאיתנו יש את מפת הדרכים הפנימית שלו לחייו. המטרה של מורן היא לעזור למטופלים לגלות את עצמם, את הסיפור שהם מספרים לעצמם, לפתח מודעות לדפוסים ולבחירות, ומשם להתחבר לסמכות הפנימית שלהם.

  ## מה מייחד את מורן פז?
  - שילוב גוף-נפש-רוח: פסיכותרפיה הוליסטית שרואה באדם שלם.
  - כלים חווייתיים: עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס.
  - מרחב בטוח בטבע: קליניקה שלווה בטבעון הטובלת בירוק.

  ## עם מי מורן עובדת?
  - נשים: חיבור עמוק לעולם הפנימי, שחרור עומס רגשי ומציאת הקול האותנטי.
  - נוער: פיתוח חוסן רגשי, חיזוק תחושת הבחירה והביטוי עצמי במרחב בטוח.

  ## טיפול אונליין ומשך המפגש
  מורן מציעה טיפול רגשי אונליין (זום) לישראלים בארץ ובחו"ל. 
  כל מפגש אורך 60 דקות (שעה שלמה) של נוכחות וליווי רגשי.

  ## צור קשר
  מורן פועלת בטבעון ואונליין. ניתן לתאם שיחת ייעוץ ראשונית ללא עלות.
  טלפון: 050-781-7338
  מייל: moraniva5@gmail.com
`;

const faqPrompt = ai.definePrompt({
  name: 'faqPrompt',
  input: {schema: AIPoweredFaqAssistantInputSchema},
  output: {schema: AIPoweredFaqAssistantOutputSchema},
  prompt: `אתה עוזר וירטואלי למרפאת BeinMe של מורן פז. המטרה שלך היא לענות על שאלות משתמשים בצורה תמציתית ומדויקת, בהתבסס אך ורק על המידע המסופק להלן. 

  דגשים חשובים:
  - השם של המרפאה הוא BeinMe — להיות אני בתוכי.
  - מורן מטפלת בנשים ונוער.
  - המפגשים אורכים 60 דקות.
  - השילוב הטיפולי הוא גוף, נפש ורוח.

  המידע על מורן פז והשירותים שלה:
  ${siteContent}

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
    const {output} = await faqPrompt(input);
    return output!;
  }
);

export async function aiPoweredFaqAssistant(
  input: AIPoweredFaqAssistantInput
): Promise<AIPoweredFaqAssistantOutput> {
  return aiPoweredFaqAssistantFlow(input);
}
