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

interface DubbingStep {
  id: string;
  label: string;
  status: "pending" | "processing" | "completed";
}

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [voiceGender, setVoiceGender] = useState("female");
  const [emotionTone, setEmotionTone] = useState("neutral");
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputVideo, setOutputVideo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dubbingSteps: DubbingStep[] = [
    { id: "transcribe", label: "Transcribe", status: "pending" },
    { id: "translate", label: "Translate", status: "pending" },
    { id: "tts", label: "Generate Speech", status: "pending" },
    { id: "merge", label: "Merge Audio", status: "pending" },
    { id: "download", label: "Ready to Download", status: "pending" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
  ];

  const emotions = [
    { value: "neutral", label: "Neutral", icon: Circle },
    { value: "happy", label: "Happy", icon: Smile },
    { value: "sad", label: "Sad", icon: Frown },
    { value: "excited", label: "Excited", icon: Zap },
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("video/")) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const startDubbing = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setCurrentStep(0);

    // Simulate processing steps
    for (let i = 0; i < dubbingSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setOutputVideo(URL.createObjectURL(selectedFile)); // Placeholder
    setIsProcessing(false);
  };

  const getStepStatus = (
    index: number,
  ): "pending" | "processing" | "completed" => {
    if (index < currentStep) return "completed";
    if (index === currentStep && isProcessing) return "processing";
    return "pending";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <Header />

      {/* Footer */}
      <Footers />
    </div>
  );
}

export default App;
