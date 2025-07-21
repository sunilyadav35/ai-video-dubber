"use client";
import React, { useState, useRef } from "react";
import {
  Upload,
  Play,
  Download,
  Github,
  Globe,
  ChevronDown,
  CheckCircle,
  Circle,
  Loader2,
  FileVideo,
  Languages,
  Volume2,
  Smile,
  Heart,
  Frown,
  Zap,
} from "lucide-react";
import Header from "./components/Headers/Header";
import Footers from "./components/Footers/Footers";
import Main from "./components/Main/Main";

interface DubbingStep {
  id: string;
  label: string;
  status: "pending" | "processing" | "completed";
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <Main />
      {/* Footer */}
      <Footers />
    </div>
  );
}

export default App;
