import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, Send, Bot, RefreshCw, Compass, ArrowRight } from 'lucide-react';

export default function VoiceAIConciergeModal({ isOpen, onClose, onOpenPlanner, onNavigateFleet }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');

  const [conversation, setConversation] = useState([
    {
      id: 'c-1',
      sender: 'bot',
      text: "👋 Namaste! I am your **India Voice AI Travel Concierge**. You can speak or type your travel queries such as *'Plan Char Dham Yatra in May'*, *'5-day trip to Kashmir under ₹30,000'*, or *'Best resorts in Mahabaleshwar'*. How can I help you explore India today?",
      audioText: "Namaste! I am your India Voice AI Travel Concierge. Speak or type your Indian travel query!"
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [selectedVoiceLang, setSelectedVoiceLang] = useState('hi-IN'); // 'hi-IN' | 'en-IN' | 'gu-IN' | 'mr-IN'
  const [interimTranscript, setInterimTranscript] = useState('');
  
  const conversationEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation, isOpen]);

  if (!isOpen) return null;

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    const plainText = text.replace(/[*_#`~]/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleStartListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser window. Please type your query in the text input below!');
      return;
    }

    try {
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
        setInterimTranscript('');
        return;
      }

      setIsListening(true);
      setInterimTranscript('');
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = selectedVoiceLang;
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let currentInterim = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        if (currentInterim) {
          setInterimTranscript(currentInterim);
        }

        if (finalTranscript) {
          setSpokenText(finalTranscript);
          setInterimTranscript('');
          setIsListening(false);
          handleProcessUserMessage(finalTranscript);
        }
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
        setInterimTranscript('');
        if (err.error === 'not-allowed') {
          alert('Microphone access blocked. Please enable microphone permissions in your browser address bar.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition', err);
      setIsListening(false);
    }
  };

  const handleProcessUserMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim()
    };

    setConversation(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const aiReply = generateConciergeAnswer(text);
      setConversation(prev => [...prev, aiReply]);
      speakText(aiReply.text);
    }, 800);
  };

  const generateConciergeAnswer = (query) => {
    const q = query.toLowerCase().trim();

    // 1. Specific Vehicle Queries
    if (q.includes('thar') || q.includes('off road') || q.includes('4x4')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🚘 **Mahindra Thar 4x4 Hard Top (Automatic / Diesel)**\n\n• **Daily Base Rate:** ₹3,499 / day\n• **Capacity:** 4 Seater with 226mm Ground Clearance\n• **Best For:** Mountain passes, Leh-Ladakh, Goa beach drives & off-road trips.\n• **Deposit:** ₹0 Security Deposit option available!`,
        action: { label: 'Explore Mahindra Thar 4x4 Fleet', onClick: onNavigateFleet }
      };
    }

    if (q.includes('fortuner') || q.includes('legender')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `👑 **Toyota Fortuner Legender 4x4 (2.8L Diesel AT)**\n\n• **Daily Base Rate:** ₹8,999 / day\n• **Capacity:** 7 Seater VIP Luxury SUV\n• **Features:** Dual-zone AC, Power Captain Seats, 360 Camera.\n• **Ideal For:** VIP Delegations, Weddings & Executive Outstation Trips.`,
        action: { label: 'View Fortuner Legender', onClick: onNavigateFleet }
      };
    }

    if (q.includes('ertiga') || q.includes('7 seater') || q.includes('cng')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `👨‍👩‍👧‍👦 **Maruti Suzuki Ertiga Hybrid (7-Seater Family MUV)**\n\n• **Daily Base Rate:** ₹2,399 / day\n• **Fuel:** CNG / Smart Hybrid Petrol (Highly Economical)\n• **Capacity:** 7 Comfort Seats with Dual Air Conditioners.\n• **Best For:** Budget family road trips & outstation temple yatras.`,
        action: { label: 'Book Ertiga Hybrid Now', onClick: onNavigateFleet }
      };
    }

    if (q.includes('creta') || q.includes('suv') || q.includes('hyundai')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🚘 **Hyundai Creta SX (O) Turbo Automatic**\n\n• **Daily Base Rate:** ₹3,299 / day\n• **Features:** Panoramic Sunroof, Bose Sound, ADAS Safety.\n• **Capacity:** 5 Seater Luxury Compact SUV.`,
        action: { label: 'View Creta & Compact SUVs', onClick: onNavigateFleet }
      };
    }

    // 2. City & Route Queries
    if (q.includes('surat') || q.includes('mumbai') || q.includes('pune') || q.includes('ahmedabad')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🚗 **Western India Interstate Mobility (Surat / Mumbai / Pune / Ahmedabad):**\n\n• **One-Way Cab & Self-Drive:** Seamless doorstep delivery across Gujarat & Maharashtra.\n• **Surat ⇄ Mumbai Express:** 4-hour travel time via NH-48.\n• **Surat ⇄ Ahmedabad Expressway:** 3.5-hour travel time.\n• **Available Fleet:** Hatchbacks, Sedans, SUVs, 7-Seater MUVs & Luxury Vans.`,
        action: { label: 'Book Inter-City Trip', onClick: onOpenPlanner }
      };
    }

    if (q.includes('chardham') || q.includes('char dham') || q.includes('kedarnath') || q.includes('badrinath') || q.includes('yatra')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🛕 **Char Dham Sacred Yatra Plan (Uttarakhand):**\n\n• **Circuit:** Haridwar → Yamunotri → Gangotri → Kedarnath → Badrinath → Rishikesh.\n• **Vehicle:** Outstation Innova Crysta ZX / Tempo Traveller with expert hill driver.\n• **Meals:** 100% Pure Sattvik Vegetarian meals.\n• **Helicopter Option:** Available for Kedarnath Darshan!`,
        action: { label: 'Launch Pilgrimage Yatra Planner', onClick: onOpenPlanner }
      };
    }

    if (q.includes('somnath') || q.includes('dwarka') || q.includes('statue of unity') || q.includes('gujarat')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🛕 **Gujarat Sacred Darshan & Statue of Unity Circuit:**\n\n• **Route:** Surat → Kevadia (Statue of Unity) → Somnath Jyotirlinga → Dwarkadhish Temple → Nageshwar.\n• **Package:** 5 Days / 4 Nights all-inclusive cab & hotel package starting at ₹14,999/person.`,
        action: { label: 'Book Gujarat Pilgrimage', onClick: onOpenPlanner }
      };
    }

    if (q.includes('goa') || q.includes('beach')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🏖️ **Goa Beach & Coastal Drive Concierge Plan:**\n\n• **Stay:** Taj Fort Aguada or 4-Star Beachfront Resort.\n• **Transport:** Self-Drive Mahindra Thar 4x4 (₹3,499/day) or Swift AT (₹1,899/day).\n• **Recommended Hub:** Mopa Airport / Dabolim Airport doorstep drop!`,
        action: { label: 'Explore Fleet for Goa Trip', onClick: onNavigateFleet }
      };
    }

    if (q.includes('kashmir') || q.includes('5-day') || q.includes('30,000') || q.includes('30000')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🏔️ **Custom 5-Day Kashmir Itinerary (Under ₹30,000):**\n\n• **Day 1:** Srinagar arrival, Shikara ride on Dal Lake & stay in traditional Houseboat.\n• **Day 2:** Day trip to Gulmarg (Gondola cable car ride).\n• **Day 3:** Scenic drive to Pahalgam (Betaab Valley & Aru Valley).\n• **Day 4:** Sonmarg Glacier tour.\n• **Day 5:** Departure from Srinagar.\n\nEstimated Cost: ₹24,500 per person (Includes luxury cab, stays & breakfasts)!`,
        action: { label: 'Open Smart AI Planner', onClick: onOpenPlanner }
      };
    }

    if (q.includes('rate') || q.includes('price') || q.includes('deposit') || q.includes('cost') || q.includes('budget')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `💰 **Siddhivinayak Transparent Pricing Guarantee:**\n\n• **Hatchbacks (Swift / WagonR):** From ₹1,699 / day\n• **Sedans (Dzire / Ciaz):** From ₹2,199 / day\n• **7-Seater Family MUVs (Ertiga / Triber):** From ₹2,399 / day\n• **SUVs (Thar / Creta / Scorpio-N):** From ₹3,299 / day\n• **Luxury SUVs (Fortuner Legender / XUV700):** From ₹6,499 / day\n\n🔒 Zero Hidden Taxes • 24x7 Roadside Support • Free Cancellation!`,
        action: { label: 'Check All Fleet Rates', onClick: onNavigateFleet }
      };
    }

    // 3. Friendly Default Answer
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `✨ I have processed your request for **"${query}"**.\n\nI can help you with:\n1. 🚘 **Self-Drive & Chauffeur Car Rentals** (Thar, Fortuner, Ertiga, Creta)\n2. 🛕 **Pilgrimage Circuits** (Char Dham, Somnath, Dwarka, Kedarnath)\n3. 🏖️ **Custom Tour Packages** (Goa, Kashmir, Rajasthan, Kerala)\n4. 🚕 **Intercity Cab Rates** (Surat, Mumbai, Pune, Ahmedabad)\n\nWhich of these would you like to explore?`,
      action: { label: 'Launch Unified Booking Platform', onClick: onOpenPlanner }
    };
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col h-[85vh] max-h-[620px]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  India Voice AI Travel Concierge
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                    Voice Active
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Domestic India travel, pilgrimages, festivals & road trips</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isSpeaking ? (
                <button onClick={stopSpeaking} className="p-2 bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold flex items-center gap-1 border border-rose-500/30 animate-pulse">
                  <VolumeX className="w-4 h-4" /> Stop Audio
                </button>
              ) : (
                <button onClick={() => speakText(conversation[conversation.length - 1]?.text || '')} className="p-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1">
                  <Volume2 className="w-4 h-4 text-amber-400" /> Listen
                </button>
              )}
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors ml-1">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Language Bar & Interim Preview */}
          <div className="bg-slate-950 px-5 py-2.5 border-b border-slate-800 flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 shrink-0">
              🎙️ Speech Language:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { code: 'hi-IN', label: '🇮🇳 Hindi (हिंदी)' },
                { code: 'en-IN', label: '🇬🇧 English / Hinglish' },
                { code: 'gu-IN', label: '🇮🇳 Gujarati (ગુજરાતી)' },
                { code: 'mr-IN', label: '🇮🇳 Marathi (मराठी)' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedVoiceLang(lang.code)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap border ${
                    selectedVoiceLang === lang.code
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-slate-950/60">
            {conversation.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-br-none shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                  }`}
                >
                  <div className="whitespace-pre-line font-sans">{msg.text}</div>
                  {msg.action && (
                    <button
                      onClick={() => { msg.action.onClick(); onClose(); }}
                      className="mt-3 w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1 border border-amber-500/40"
                    >
                      {msg.action.label} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {/* Live Interim Speech Preview Badge */}
            {interimTranscript && (
              <div className="flex flex-col items-end">
                <div className="bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-2xl p-3 text-xs italic animate-pulse">
                  🎙️ Hearing: "{interimTranscript}..."
                </div>
              </div>
            )}
            
            <div ref={conversationEndRef} />
          </div>

          {/* Voice Microphone Controls */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleStartListening}
              className={`p-4 rounded-full shadow-2xl flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-rose-600 text-white ring-8 ring-rose-500/30 animate-pulse'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/20'
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </motion.button>
            <p className="text-[11px] text-slate-400 font-semibold text-center">
              {isListening 
                ? `🎙️ Listening in ${selectedVoiceLang.startsWith('hi') ? 'Hindi' : selectedVoiceLang.startsWith('gu') ? 'Gujarati' : selectedVoiceLang.startsWith('mr') ? 'Marathi' : 'English'}... Speak clearly!` 
                : 'Click Mic to Speak OR select your native language above'}
            </p>

            {/* Text Input */}
            <div className="w-full flex items-center gap-2">
              <input
                type="text"
                placeholder="Or type e.g., 'Char Dham Yatra in May' or 'Kashmir trip under ₹30,000'..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleProcessUserMessage(inputText)}
                className="flex-1 bg-slate-950 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleProcessUserMessage(inputText)}
                disabled={!inputText.trim()}
                className="p-3 bg-amber-500 text-slate-950 font-bold rounded-xl disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
