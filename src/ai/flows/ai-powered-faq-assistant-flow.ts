
'use server';
/**
 * @fileOverview An AI-powered FAQ assistant flow for Moran Paz's practice.
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
  ## אודות מורן פז (About Moran Paz)
  מורן פז היא פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. היא מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושהבחירה קיימת לכל אדם בכל מצב.
  היא בוגרת תואר שני בייעוץ ארגוני מאוניברסיטת חיפה ובוגרת מסלול פסיכותרפיה הוליסטית.
  היא מלווה אנשים למצוא את הדרך שלהם פנימה – לחיבור העמוק והאותנטי עם עצמם.
  התהליך מביא לפחות חרדות וסטרס, שלווה פנימית, חוסן נפשי ומנטלי, קבלת החלטות בהירה ויעילה יותר, וביטוי אותנטי.

  ## מה מייחד את מורן פז? (Uniqueness)
  - שילוב גוף-נפש: פסיכותרפיה הוליסטית שרואה באדם שלם.
  - כלים חווייתיים: עבודת צללים, ילדה פנימית, פוקוסינג ומיינדפולנס.
  - מרחב בטוח בטבע: קליניקה שלווה בטבעון הטובלת בירוק.
  - ידע וניסיון: שילוב בין ידע אקדמי (MA) מאוניברסיטת חיפה לניסיון טיפולי אישי ועמוק.

  ## עם מי אני עובדת? (Target Audience)
  - מבוגרים: ליווי רגשי בצמתי חיים, התמודדות עם חרדות ומציאת עוגן פנימי.
  - נוער: מרחב בטוח ומכיל לפיתוח חוסן רגשי, ביטוי עצמי ועיבוד חוויות בגובה העיניים.
  - נשים: חיבור עמוק לעולם הפנימי, שחרור עומס רגשי ומציאת הקול האותנטי שלך.

  ## טיפול אונליין (Online Therapy)
  מורן מציעה טיפול רגשי ופסיכותרפיה הוליסטית גם אונליין (דרך זום). הטיפול מתאים למי שגר רחוק, למי שמעדיף את הנוחות של הבית, או לנשים וגברים בחו"ל. הטיפול אונליין שומר על אותה רמת אינטימיות ומקצועיות כמו בקליניקה.

  ## התהליך הטיפולי (Therapy Process)
  המסע לריפוי רגשי מתחיל בך. התהליך כולל 4 שלבים עיקריים:
  01. פגישת הכרות: שיחה ראשונית להכרות ותיאום ציפיות.
  02. יצירת מרחב בטוח ואמון: בניית אמון עמוק ומרחב ללא שיפוטיות.
  03. עבודה רגשית חווייתית: שימוש בכלים כמו מיינדפולנס, עבודת צללים, דמיון מודרך, קלפים טיפוליים וילד/ה פנימית.
  04. הטמעה ושינוי בחיי היום-יום: הקלה במתח וחרדה, הגברת ערך עצמי וביטוי אותנטי כבימאי/ת של חייך.

  ## קורס BeinMe (BeinMe Course)
  מרחב קבוצתי-טיפולי לנשים. לחיות מתוך הקשבה פנימית, הכרות עם חלקי האישיות וצלילה לעומק העולם הפנימי.
  כלים בקורס: מיינדפולנס, פוקוסינג, עבודת צללים, הילדה והאם הפנימית.

  ## צור קשר (Contact Information)
  מורן פועלת בעמק יזרעאל, בטבעון ואונליין. ניתן לתאם שיחת ייעוץ ראשונית ללא עלות.
  טלפון: 050-781-7338
  מייל: moraniva5@gmail.com
  פייסבוק: BeinMe - Moran Paz
`;

const faqPrompt = ai.definePrompt({
  name: 'faqPrompt',
  input: {schema: AIPoweredFaqAssistantInputSchema},
  output: {schema: AIPoweredFaqAssistantOutputSchema},
  prompt: `אתה עוזר וירטואלי למרפאת מורן פז. המטרה שלך היא לענות על שאלות משתמשים בצורה תמציתית ומדויקת, בהתבסס אך ורק על המידע המסופק להלן. אם אינך יכול למצוא תשובה במידע הנתון, אנא ציין זאת בנימוס והצע שהמשתמש ייצור קשר ישירות לקבלת מידע נוסף.

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
