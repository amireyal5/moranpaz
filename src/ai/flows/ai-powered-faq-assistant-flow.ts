
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
  ## אודות מורן פז (About Moran Paz)
  מורן פז היא פסיכותרפיסטית הוליסטית ומנחת תהליכים רגשיים – חווייתיים. היא מאמינה שלכולנו יש את הזכות להרגיש חופשיים מבפנים ושבחירה קיימת לכל אדם בכל מצב.
  היא בוגרת תואר שני בייעוץ ארגוני מאוניברסיטת חיפה ובוגרת מסלול פסיכותרפיה הוליסטית. היא מאמינה בפוטנציאל הנשמתי של כל אדם לממש את עצמו ולהעניק לעולם את המתנות שלו.
  בעשור האחרון עברה מסע אישי מרפא וכיום היא מלווה אנשים למצוא את הדרך שלהם פנימה – לחיחיבור העמוק והאותנטי עם עצמם – ולחיות את חייהם דרך אותו החיבור.
  התהליך מביא לפחות חרדות וסטרס, שלווה פנימית, חוסן נפשי ומנטלי, קבלת החלטות בהירה ויעילה יותר, ביטוי אותנטי, בריאות נפשית ופיזית גבוהה יותר.
  היא מטפלת רגשית הפועלת בעמק יזרעאל.

  ## התהליך הטיפולי (Therapy Process)
  המסע לריפוי רגשי מתחיל בך. התהליך כולל מספר שלבים:
  01. פגישת הכרות: נפגש לשיחה ראשונית (בקליניקה או בזום), נכיר אותך ואת מה שמעסיק אותך. נתאם ציפיות ונבין האם מתאים לנו לצאת למסע הטיפולי יחד.
  02. יצירת מרחב בטוח ואמון: בפגישות הראשונות נעמיק בחיבור ובבניית אמון. זהו מרחב שבו אפשר להביא את עצמך כפי שאת/ה – בלי מסכות, בלי שיפוטיות – ולדעת שיש אוזן קשבת ותמיכה מלאה.

  הטיפול מתאים לך אם:
  - מרגיש/ה שיש בתוכך חלקים שצמאים לביטוי ולשחרור
  - חווה תקיעות רגשית, דפוסים שחוזרים על עצמם, עומס או חרדה.
  - מבקש/ת להתחבר מחדש לעצמך - לרגש, לנשמה, לגוף ולתחושת משמעות עמוקה.
  - מרגיש/ה שאיבדת שליטה על החיים שלך, שאת/ה לא עצמך.
  - רוצה לקבל כלים פרקטיים לוויסות עצמי, חיזוק חוסן נפשי ובניית מערכות יחסים בריאות יותר.
  - זקוק/ה לתמיכה ועיניים טובות לשתף ולהתמודד עם כאבים פיזיים ורגשיים כאחד.

  ## קורס BeinMe (BeinMe Course)
  BeinMe הוא מרחב קבוצתי – טיפולי לנשים, שנולד מתוך רצון להקשיב לעצמי. לגלות את מה שנמצא בתוכי, להכיר אותו, ולחוות אותו בכנות ואותנטיות.
  האמת שלנו ומפת הדרכים לחיינו נמצאת בתוכנו – לא מחוצה לנו. כאן אפשר לעצור, לנשום להרגיש ולחזור לבית הפנימי שלנו, והכי יפה שאת הולכת לעשות את זה עם נשים אחרות, להיתמך, לחלוק ולהתבונן בעצמך דרך החוויה המשותפת.
  בקורס נעבוד עם הכלים – מיינדפולנס, שיטת פוקוסינג, המערכת ההישרדותית והבוראת, הילדה והאם הפנימית, עבודת צללים ועוד.

  הקורס מתאים לך אם:
  - את מרגישה עומס פנימי ולופים רגשיים שחוזרים על עצמם
  - כל "התקלה" מבחוץ יכולה לערער אותך
  - את מוצאת את עצמך עייפה מלהחזיק - פיזית ורגשית
  - את מריצה דאגות בראש ולא נוכחת בכאן ועכשיו במהלך היום שלך
  - את רוצה לחזור לחיבור אותנטי וכנה עם עצמך ולחוות שקט פנימי
  - את רוצה לסמוך ולהישען יותר, ולשחרר שליטה ואחיזה
  - את רוצה לאפשר לעצמך להרגיש הכל ולהישאר יציבה
  - את מרגישה שאת נעה בין קצוות של נוקשות פנימית לבין מרדנות פנימית
  - את רוצה להכיר לעומק את העולם הפנימי הרגשי שלך ולחיות מתוך הקשבה ולא הדחקה
  - את מרגישה שחיים בך חלקים שאת דוחה מעלייך
  - את מרגישה שיש בתוכך עוצמה פנימית שלא מקבלת ביטוי

  ## צור קשר (Contact Information)
  ניתן לתאם שיחת ייעוץ ראשונית – ללא עלות וללא התחייבות. ניתן ליצור קשר באמצעות וואטסאפ, אימייל או בטלפון. מורן פועלת בעמק יזרעאל.
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
