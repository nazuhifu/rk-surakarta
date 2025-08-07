interface AyatCardProps {
  title: string;
  repeat: number;
  arabicText: string;
  translation: string;
  centered?: boolean;
}

export default function AyatCard({ title, repeat, arabicText, translation, centered = false }: AyatCardProps) {
  const isSpecial = title === "Ta'awudz" || title === "Basmalah";

  return (
    <div className="border-b dark:border-gray-700 pb-6">
      {/* Judul dan jumlah bacaan */}
      {!isSpecial && (
        <div className="flex items-center justify-end gap-3 text-sm font-medium text-primary mb-5">
          <span className="text-secondary dark:text-secondary-foreground text-base">{title}</span>
          <span className="bg-primary/10 dark:bg-primary/100 rounded-full px-3 py-1 text-primary dark:text-foreground text-xs">{repeat}x</span>
        </div>
      )}

      {/* Teks Arab */}
      <div className={`${isSpecial || centered ? "text-center" : "text-right"} mb-4`}>
        <p className="text-4xl font-arabic leading-loose" dir="rtl">
          {arabicText}
        </p>
      </div>

      {/* Terjemahan */}
      <p className={`text-muted-foreground italic mb-2 ${isSpecial || centered ? "text-center" : ""}`}>{translation}</p>
    </div>
  );
}
