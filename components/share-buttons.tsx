'use client';

import React, { useState } from 'react';
import {
    WhatsappShareButton,
    TelegramShareButton,
    WhatsappIcon,
    TelegramIcon,
} from "react-share";
import { Copy } from 'lucide-react';

interface ShareButtonsProps {
    title: string;
    url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="mt-10">
            <h4 className="text-lg font-semibold mb-2">Bagikan berita ini:</h4>
            <div className="flex flex-wrap items-center gap-3">

                <WhatsappShareButton url={url} title={`📰 ${title} \nBaca selengkapnya di:\n`}>
                    <WhatsappIcon size={40} round />
                    <span className="sr-only">Bagikan ke WhatsApp</span>
                </WhatsappShareButton>

                <TelegramShareButton url={url} title={`📰 ${title}`}>
                    <TelegramIcon size={40} round />
                    <span className="sr-only">Bagikan ke Telegram</span>
                </TelegramShareButton>

                <button
                    onClick={handleCopyClick}
                    className="flex items-center px-3 py-2 border rounded-lg text-sm text-gray-600 hover:text-gray-800 hover:border-gray-400 transition"
                    aria-label="Salin tautan"
                >
                    <Copy className="w-4 h-4 mr-2" />
                    <span>{isCopied ? 'Tautan disalin!' : 'Salin Tautan'}</span>
                </button>
            </div>
        </div>
    );
};

export default ShareButtons;