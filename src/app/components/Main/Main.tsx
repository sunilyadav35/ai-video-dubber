import {
  CheckCircle,
  Circle,
  Download,
  FileVideo,
  Frown,
  Languages,
  Loader2,
  Play,
  Smile,
  Upload,
  Zap,
} from "lucide-react";
import React, { useRef, useState } from "react";

interface DubbingStep {
  id: string;
  label: string;
  status: "pending" | "processing" | "completed";
}

const Main = () => {
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          AI-Powered Video Dubbing
        </h2>
        <p className="text-xl text-gray-600 mb-2">Fast, Free, Open Source</p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Transform your videos with AI-powered dubbing using cutting-edge
          speech recognition, translation, and synthesis technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload and Controls Section */}
        <div className="space-y-6">
          {/* Upload Section */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-600" />
              Upload Video
            </h3>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragging
                  ? "border-blue-400 bg-blue-50/50"
                  : selectedFile
                    ? "border-green-400 bg-green-50/50"
                    : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {selectedFile ? (
                <div className="space-y-2">
                  <FileVideo className="w-12 h-12 text-green-600 mx-auto" />
                  <p className="text-green-700 font-medium">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      Drop your video here or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Supports MP4, MOV, AVI up to 500MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Language and Voice Settings */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Languages className="w-5 h-5 mr-2 text-purple-600" />
              Language & Voice Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Language
                </label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Language
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice Gender
                </label>
                <select
                  value={voiceGender}
                  onChange={(e) => setVoiceGender(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emotion Tone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {emotions.map((emotion) => {
                    const IconComponent = emotion.icon;
                    return (
                      <button
                        key={emotion.value}
                        onClick={() => setEmotionTone(emotion.value)}
                        className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                          emotionTone === emotion.value
                            ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                            : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <IconComponent className="w-3 h-3" />
                        <span>{emotion.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={startDubbing}
            disabled={!selectedFile || isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              "Start Dubbing"
            )}
          </button>
        </div>

        {/* Progress and Preview Section */}
        <div className="space-y-6">
          {/* Progress Tracker */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Progress
            </h3>

            <div className="space-y-4">
              {dubbingSteps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={step.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {status === "completed" ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : status === "processing" ? (
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          status === "completed"
                            ? "text-green-700"
                            : status === "processing"
                              ? "text-blue-700"
                              : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                    {index < dubbingSteps.length - 1 && (
                      <div
                        className={`w-12 h-0.5 ${
                          status === "completed"
                            ? "bg-green-200"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Output Preview */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Play className="w-5 h-5 mr-2 text-green-600" />
              Preview
            </h3>

            {outputVideo ? (
              <div className="space-y-4">
                <div className="aspect-video bg-black rounded-xl overflow-hidden">
                  <video
                    src={outputVideo}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>

                <button className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg">
                  <Download className="w-5 h-5" />
                  <span>Download Dubbed Video</span>
                </button>
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <FileVideo className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Your dubbed video will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
