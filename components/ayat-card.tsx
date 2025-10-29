"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Type, RotateCcw, Eye, EyeOff } from "lucide-react";

interface AyatCardProps {
  title: string;
  repeat: number;
  arabicText: string;
  translation: string;
  centered?: boolean;
  isFirstCard?: boolean;
}

// Global state untuk font size
const getDefaultFontSize = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 640 ? 36 : 44;
  }
  return 44;
};

let globalFontSize = getDefaultFontSize();
let globalFontSizeListeners: ((size: number) => void)[] = [];

const setGlobalFontSize = (size: number) => {
  globalFontSize = size;
  globalFontSizeListeners.forEach((listener) => listener(size));
};

const subscribeToFontSize = (listener: (size: number) => void) => {
  globalFontSizeListeners.push(listener);
  return () => {
    globalFontSizeListeners = globalFontSizeListeners.filter((l) => l !== listener);
  };
};

// Global state untuk visibilitas terjemahan
const getDefaultShowTranslation = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("ayat-show-translation");
    if (saved !== null) return saved === "true";
  }
  return true;
};

let globalShowTranslation = getDefaultShowTranslation();
let globalShowTranslationListeners: ((show: boolean) => void)[] = [];

const setGlobalShowTranslation = (show: boolean) => {
  globalShowTranslation = show;
  globalShowTranslationListeners.forEach((listener) => listener(show));
  if (typeof window !== "undefined") {
    localStorage.setItem("ayat-show-translation", show ? "true" : "false");
  }
};

const subscribeToShowTranslation = (listener: (show: boolean) => void) => {
  globalShowTranslationListeners.push(listener);
  return () => {
    globalShowTranslationListeners = globalShowTranslationListeners.filter((l) => l !== listener);
  };
};

export default function AyatCard({ title, repeat, arabicText, translation, centered = false, isFirstCard = false }: AyatCardProps) {
  const isSpecial = title === "Ta'awudz" || title === "Basmalah";

  // State untuk ukuran font

  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ayat-font-size");
      if (saved) return parseInt(saved);
      return window.innerWidth < 640 ? 36 : 44;
    }
    return 44;
  });
  const [showFontControls, setShowFontControls] = useState(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(() => globalShowTranslation);

  // Sync font size dari localStorage dan window size saat mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem("ayat-font-size");
    if (savedFontSize) {
      const size = parseInt(savedFontSize);
      setFontSize(size);
      globalFontSize = size;
    } else {
      const defaultSize = window.innerWidth < 640 ? 36 : 44;
      setFontSize(defaultSize);
      globalFontSize = defaultSize;
    }
    const savedShow = localStorage.getItem("ayat-show-translation");
    if (savedShow !== null) {
      const show = savedShow === "true";
      setShowTranslation(show);
      globalShowTranslation = show;
    }
  }, []);

  // Subscribe to global font size changes
  useEffect(() => {
    const unsubscribeFont = subscribeToFontSize(setFontSize);
    const unsubscribeShow = subscribeToShowTranslation(setShowTranslation);
    return () => {
      unsubscribeFont();
      unsubscribeShow();
    };
  }, []);

  // Save font size ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("ayat-font-size", fontSize.toString());
  }, [fontSize]);

  // Reset font size ke default (mobile/desktop)
  const resetFontSize = () => {
    const defaultSize = window.innerWidth < 640 ? 36 : 44;
    setGlobalFontSize(defaultSize);
  };

  // Handle font size change
  const handleFontSizeChange = (value: number[]) => {
    setGlobalFontSize(value[0]);
  };

  return (
    <div className="border-b dark:border-gray-700 pb-6">
      {/* Font Size Controls - hanya tampil di card pertama */}
      {isFirstCard && (
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto sm:flex-nowrap">
              <Button variant="outline" size="sm" onClick={() => setShowFontControls(!showFontControls)} className="flex items-center gap-2 w-full sm:w-auto justify-center">
                <Type className="h-4 w-4" />
                <span className="sm:hidden">Font</span>
                <span className="hidden sm:inline">Ukuran Font</span>
              </Button>
              {fontSize !== (typeof window !== "undefined" && window.innerWidth < 640 ? 36 : 44) && (
                <Button variant="ghost" size="sm" onClick={resetFontSize} className="flex items-center gap-2 text-muted-foreground hover:text-foreground w-full sm:w-auto justify-center">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setGlobalShowTranslation(!showTranslation)} className="flex items-center gap-2 w-full sm:w-auto justify-center">
                {showTranslation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sm:hidden">Terjemahan</span>
                <span className="hidden sm:inline">{showTranslation ? "Sembunyikan Terjemahan" : "Tampilkan Terjemahan"}</span>
              </Button>
            </div>
            {showFontControls && (
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg w-full sm:w-auto mt-2 sm:mt-0">
                <span className="text-xs text-muted-foreground min-w-[40px] text-center">{fontSize}px</span>
                <Slider value={[fontSize]} onValueChange={handleFontSizeChange} max={84} min={32} step={4} className="w-full sm:w-32" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Judul dan jumlah bacaan */}
      {!isSpecial && (
        <div className="flex items-center justify-end gap-3 text-sm font-medium text-primary mb-5">
          <span className="text-secondary dark:text-secondary-foreground text-base">{title}</span>
          <span className="bg-primary/10 dark:bg-primary/100 rounded-full px-3 py-1 text-primary dark:text-foreground text-xs">{repeat}x</span>
        </div>
      )}

      {/* Teks Arab */}
      <div className={`${isSpecial || centered ? "text-center" : "text-right"} mb-4`}>
        <p className="font-arabic leading-loose" dir="rtl" style={{ fontSize: `${fontSize}px` }}>
          {arabicText}
        </p>
      </div>

      {/* Terjemahan */}
      {showTranslation && <p className={`text-muted-foreground italic mb-2 ${isSpecial || centered ? "text-center" : ""}`}>{translation}</p>}
    </div>
  );
}
