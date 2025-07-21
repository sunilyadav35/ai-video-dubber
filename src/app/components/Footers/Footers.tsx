import { Github } from "lucide-react";
import React from "react";

const Footers = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-md border-t border-gray-200/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">View on GitHub</span>
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 mb-1">Powered by SKY Tech</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1 text-xs text-gray-500">
              <span>Whisper</span>
              <span>•</span>
              <span>LibreTranslate</span>
              <span>•</span>
              <span>Coqui TTS</span>
              <span>•</span>
              <span>FFmpeg</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
