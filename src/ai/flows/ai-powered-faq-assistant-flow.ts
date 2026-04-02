'use server';
/**
 * @fileOverview An AI-powered FAQ assistant flow for Moran Paz's practice.
 *
 * - aiPoweredFaqAssistant - A function that handles user questions about the practice.
 * - AIPoweredFaqAssistantInput - The input type for the aiPoweredFaqAssistant function.
 * - AIPoweredFaqAssistantOutput - The return type for the aiPoweredFaqAssistant function.
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
  ## About Moran Paz
  מורן פז היא פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. היא מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושבחירה קיימת לכל אדם בכל מצב.
  היא בוגרת תואר שני בייעוץ ארגוני מאוניברסיטת חיפה ובוגרת מסלול פסיכותרפיה הוליסטית. היא מאמינה בפוטנציאל הנשמתי של כל אדם לממש את עצמו ולהעניק לעולם את המתנות שלו.
  בעשור האחרון עברה מסע אישי מרפא וכיום היא מלווה אנשים למצוא את הדרך שלהם פנימה – לחיבור העמוק והאותנטי עם עצמם – ולחיות את חייהם דרך אותו החיבור.
  התהליך מביא לפחות חרדות וסטרס, שלווה פנימית, חוסן נפשי ומנטלי, קבלת החלטות בהירה ויעילה יותר, ביטוי אותנטי, בריאות נפשית ופיזית גבוהה יותר.

  ## התהליך הטיפולי (Therapy Process)
  המסע לריפוי רגשי מתחיל בך. התהליך כולל מספר שלבים:
  01. פגישת הכרות: נפגש לשיחה ראשונית (בקליניקה או בזום), נכיר אותך ואת מה שמעסיק אותך. נתאם ציפיות ונבין האם מתאים לנו לצאת למסע הטיפולי יחד.
  02. יצירת מרחב בטוח ואמון: בפגישות הראשונות נעמיק בחיבור ובבניית אמון. זהו מרחב שבו אפשר להביא את עצמך כפי שאת/ה – בלי מסכות, בלי שיפוטיות – ולדעת שיש אוזן קשבת ותמיכה מלאה.
  03. עבודה רגשית חווייתית: נשתמש בכלים מגוונים כמו מיינדפולנס, עבודת צללים, דמיון מודרך, קלפים טיפוליים וילד/ה פנימית. המטרה היא לשחרר חסמים, לעבד דפוסים חוזרים ולהתחבר מחדש לגוף ולרגש.
  04. הטמעה ושינוי: בסיום התהליך תוכל/י לחוות הקלה בתחושות מתח, חרדה, תלות וחוסר משמעות. להגביר את הוויסות העצמי והערך העצמי, ולהיות בימאי/ת של חייך.

  הטיפול מתאים לך אם:
  - מרגיש/ה שיש בתוכך חלקים שצמאים לביטוי
  - חווה תקיעות רגשית או דפוסים חוזרים
  - מבקש/ת להתחבר מחדש לעצמך ולנשמה
  - מרגיש/ה שאיבדת שליטה על החיים
  - רוצה כלים פרקטיים לוויסות עצמי
  - זקוק/ה לתמיכה ועיניים טובות

  ## סדנת BeinMe (BeinMe Workshop)
  BeinMe הוא מרחב קבוצתי – טיפולי לנשים, שנולד מתוך רצון להקשיב לעצמי. לגלות את מה שנמצא בתוכי, להכיר אותו, ולחוות אותו בכנות ואותנטיות.
  האמת שלנו ומפת הדרכים לחיינו נמצאת בתוכנו – לא מחוצה לנו. כאן אפשר לעצור, לנשום ולהרגיש ולחזור לבית הפנימי שלנו. הכי יפה שאת הולכת לעשות את זה עם נשים אחרות, להיתמך ולחלוק.

  הקורס מתאים לך אם:
  - את מרגישה עומס פנימי ולופים רגשיים
  - כל 'התקלה' מבחוץ יכולה לערער אותך
  - את עייפה מלהחזיק - פיזית ורגשית
  - את מריצה דאגות ולא נוכחת בכאן ועכשיו
  - את רוצה לסמוך ולהישען יותר, ולשחרר שליטה
  - את רוצה להכיר לעומק את העולם הרגשי שלך
  - את מרגישה שיש בתוכך עוצמה פנימית שלא מקבלת ביטוי

  ## טיפול בטבעון (Tivon Clinic)
  הקליניקה בטבעון טובלת בירוק ומציעה מרחב שקט ומכיל. השילוב בין פסיכותרפיה הוליסטית לאנרגיה המרגיעה של הסביבה יוצר קרקע פורייה לצמיחה אישית.
  השירותים כוללים פגישות אישיות פנים-אל-פנים וליווי רגשי ממוקד צמיחה.

  ## Contact Information
  ניתן לתאם שיחת ייעוץ ראשונית – ללא עלות וללא התחייבות. ניתן ליצור קשר באמצעות וואטסאפ, אימייל או בטלפון.
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
