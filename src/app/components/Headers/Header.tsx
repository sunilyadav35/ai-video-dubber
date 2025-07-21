import React from "react";
import { ChevronDown, Globe, Volume2 } from "lucide-react";

const Header = () => (
  <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DubAI
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select className="appearance-none bg-white/80 backdrop-blur-md border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <Globe className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
