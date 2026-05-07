import React, { useState } from 'react';
import { Terminal, Download, Code2, Settings, Copy, Check, Binary, ChevronDown, ChevronUp, FileTerminal } from 'lucide-react';

export default function App() {
  const [cps, setCps] = useState<number>(60);
  const [keys, setKeys] = useState<string>('q, e');
  const [copied, setCopied] = useState(false);
  const [showExeInfo, setShowExeInfo] = useState(false);

  const generateCode = () => {
    const keyArray = keys.split(',').map(k => `"${k.trim()}"`).filter(k => k !== '""');
    return `# -*- coding: utf-8 -*-
# Python Macro Spammer
# Note: Ensure this file is saved with UTF-8 encoding.
# Run with administrator privileges for keyboard hooking to work.
# Requires: pip install keyboard colorama

import keyboard
import time
import os
import sys
import threading
import winsound
from colorama import init, Fore, Style

# Initialize colorama for Windows CMD UI
init(autoreset=True)

# Configuration
CONFIG = {
    "is_running": True, # Started ON by default as requested
    "cps": ${cps},
    "keys": [${keyArray.join(', ')}]
}
app_active = True

def clear_console():
    os.system('cls' if os.name == 'nt' else 'clear')

def draw_menu():
    clear_console()
    print(Fore.CYAN + "=" * 40)
    print(Fore.YELLOW + Style.BRIGHT + "       Python Macro Spammer")
    print(Fore.CYAN + "=" * 40)
    status_color = Fore.GREEN if CONFIG['is_running'] else Fore.RED
    status_text = "ON" if CONFIG['is_running'] else "OFF"
    print(f" {Style.BRIGHT}Status:{Style.RESET_ALL} {status_color}[{status_text}]")
    print(f" {Style.BRIGHT}CPS:{Style.RESET_ALL}    {CONFIG['cps']}")
    print(f" {Style.BRIGHT}Keys:{Style.RESET_ALL}   {', '.join(CONFIG['keys'])}")
    print(Fore.CYAN + "-" * 40)
    print(f" {Fore.MAGENTA}Hotkeys:{Style.RESET_ALL}")
    print(" - [Page Up]  Toggle Spammer ON/OFF")
    print(" - [Ctrl+Esc] Exit Application")
    print(Fore.CYAN + "=" * 40)

def toggle_spammer():
    # Toggle functionality using Page Up
    CONFIG["is_running"] = not CONFIG["is_running"]
    # Provide immediate audio feedback (pro-cheat aesthetic)
    if CONFIG["is_running"]:
        winsound.Beep(800, 200) # Higher pitch for ON
    else:
        winsound.Beep(400, 200) # Lower pitch for OFF
    # Menu will update on next input cycle to avoid blocking issues

def exit_app():
    global app_active
    app_active = False
    print(Fore.RED + "\\nExiting gracefully...")
    winsound.Beep(300, 150)
    winsound.Beep(200, 150)
    os._exit(0) # Force immediate cleanly stop

def spam_loop():
    # Threaded loop to handle the high CPS spam accurately
    while app_active:
        if CONFIG["is_running"]:
            # Precise delay calculation
            start_time = time.perf_counter()
            
            # Non-blocking key interception (like AHK's ~ prefix)
            for key in CONFIG["keys"]:
                if keyboard.is_pressed(key):
                    keyboard.send(key)
            
            delay = 1.0 / CONFIG["cps"]
            elapsed = time.perf_counter() - start_time
            sleep_time = delay - elapsed
            
            if sleep_time > 0:
                time.sleep(sleep_time)
        else:
            time.sleep(0.05)

if __name__ == "__main__":
    os.system("title Python Macro Spammer")

    # Register global hotkeys
    keyboard.add_hotkey('page up', toggle_spammer)
    keyboard.add_hotkey('ctrl+esc', exit_app)

    # Start the background spamming thread
    spam_thread = threading.Thread(target=spam_loop, daemon=True)
    spam_thread.start()

    # Main UI interaction loop
    while app_active:
        draw_menu()
        print(Fore.WHITE + "\\nType new CPS and press Enter to update")
        print(Fore.WHITE + "(Or just press Enter to refresh UI): ", end="")
        try:
            val = input()
            if val.isdigit():
                CONFIG["cps"] = int(val)
        except Exception:
            pass
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([generateCode()], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "macro_spammer.py";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadBat = () => {
    const batContent = `@echo off\ncolor 0A\ntitle Macro Spammer - EXE Builder\necho =========================================\necho   Building Python Macro Spammer (.exe)\necho =========================================\necho.\necho Installing dependencies...\npip install pyinstaller keyboard colorama\necho.\necho Compiling executable...\npyinstaller --onefile --uac-admin macro_spammer.py\necho.\necho =========================================\necho Build complete! Check the "dist" folder for your .exe.\necho =========================================\npause`;
    const element = document.createElement("a");
    const file = new Blob([batContent], { type: 'application/bat' });
    element.href = URL.createObjectURL(file);
    element.download = "build_exe.bat";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#D1D1D1] font-mono flex flex-col selection:bg-[#00FF41]/30 selection:text-[#00FF41]">
      <div className="max-w-7xl mx-auto w-full p-4 lg:p-6 flex-1 flex flex-col pt-8">
        <header className="mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Terminal className="text-[#00FF41] glow-green" size={28} />
              <div className="hidden sm:block w-3 h-3 bg-[#00FF41] rounded-full glow-green ml-2"></div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-widest text-[#00FF41] text-glow-green uppercase items-center flex">
                Python Macro Spammer 
                <span className="text-white/40 text-[10px] sm:text-sm font-normal ml-4 tracking-normal">v2.4.0</span>
              </h1>
            </div>
            <div className="text-right text-xs opacity-60 leading-tight hidden sm:block uppercase">
              SYSTEM: WIN_X64<br/>
              ENCODING: UTF-8 BOM
            </div>
          </div>
          <p className="text-white/40 max-w-2xl text-[11px] sm:text-xs tracking-widest uppercase mt-4">
            Configure and generate a precise Python macro script with threaded execution, AutoHotkey-like key hooks, and instant audio feedback.
          </p>
        </header>

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
          
          <aside className="lg:col-span-3 lg:col-start-1 space-y-6 flex flex-col">
            <div className="bg-white/5 border border-white/10 rounded-lg p-5 border-accent">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                <Settings size={16} className="text-[#00FF41]" />
                <h2 className="text-[10px] uppercase tracking-widest text-white/40">Configuration Parameters</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] text-white/60 mb-2 uppercase tracking-wide">
                    Spammed Keys
                  </label>
                  <input
                    type="text"
                    value={keys}
                    onChange={(e) => setKeys(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF41]/50 focus:ring-1 focus:ring-[#00FF41]/30 transition-all font-mono text-sm shadow-inner placeholder:text-white/20"
                    placeholder="e.g. q, e, space"
                  />
                  <p className="text-[9px] text-white/40 mt-2 uppercase tracking-widest">
                    comma separated
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] text-white/60 mb-2 uppercase tracking-wide">
                    Target CPS <span className="lowercase opacity-50">(clicks/sec)</span>
                  </label>
                  <input
                    type="number"
                    value={cps}
                    onChange={(e) => setCps(Number(e.target.value))}
                    min="1"
                    max="1000"
                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF41]/50 focus:ring-1 focus:ring-[#00FF41]/30 transition-all font-mono text-sm tracking-wider shadow-inner"
                  />
                  <p className="text-[9px] text-white/40 mt-2 uppercase tracking-widest">
                    time.perf_counter() limit
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-5 flex-1 border-accent">
              <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Active Modules</h3>
              <ul className="space-y-3 text-[10px] text-white/60 tracking-wider">
                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white/40">TOGGLE_KEY</span> 
                  <span className="text-[#00FF41] font-bold">PAGE UP</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white/40">EXIT_HOOK</span> 
                  <span className="text-[#00FF41] font-bold">CTRL+ESC</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white/40">UI_REDRAW</span> 
                  <span className="text-white">ASYNC</span>
                </li>
                <li className="flex justify-between items-center pt-1">
                  <span className="text-white/40">AUDIO_FB</span> 
                  <span className="text-[#00FF41] font-bold text-glow-green">800/400Hz</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={downloadFile}
              className="w-full flex items-center justify-center gap-3 bg-[#00FF41]/10 hover:bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/30 font-bold tracking-[0.2em] text-[10px] uppercase py-4 px-4 rounded transition-all glow-green hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]"
            >
              <Download size={16} />
              COMPILE & DL SCRIPT
            </button>

            <div className="pt-2">
              <button
                onClick={() => setShowExeInfo(!showExeInfo)}
                className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white/40 hover:text-white border border-white/10 hover:border-[#00FF41]/30 font-bold tracking-[0.2em] text-[10px] uppercase py-3 px-4 rounded transition-all"
              >
                <Binary size={14} />
                {showExeInfo ? 'HIDE EXE EXPERT MODE' : 'BUILD TO .EXE INSTRUCTIONS'}
                {showExeInfo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              
              {showExeInfo && (
                <div className="mt-3 p-4 bg-black/60 border border-white/10 rounded overflow-hidden">
                  <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-3">
                    <FileTerminal size={14} className="text-[#00FF41]" />
                    <h4 className="text-[10px] uppercase tracking-widest text-[#00FF41] font-bold">Local Compiler Toolkit</h4>
                  </div>
                  
                  <p className="text-[10px] text-white/50 mb-4 leading-relaxed tracking-wide">
                    Browsers cannot directly generate raw Windows executable files natively. Download your configured python script, along with the automated Builder Batch file below.
                  </p>
                  
                  <button
                    onClick={downloadBat}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 border border-white/20 font-bold tracking-widest text-[9px] uppercase py-2.5 px-4 rounded transition-all mb-4"
                  >
                    <Download size={14} />
                    DL AUTO-BUILDER (.BAT)
                  </button>

                  <div className="space-y-3 mt-4 pt-4 border-t border-white/10 text-[9px] text-white/40 tracking-wider">
                    <p className="uppercase font-bold text-white/60 mb-2">Or Compile Manually (Requires Python 3.x):</p>
                    <div>
                      <p className="mb-1">1. Install Dependencies:</p>
                      <div className="bg-black p-2 rounded border border-white/10 text-white font-mono select-all overflow-x-auto whitespace-nowrap">
                        pip install pyinstaller keyboard colorama
                      </div>
                    </div>
                    <div>
                      <p className="mb-1">2. Compile to Administrator Executable:</p>
                      <div className="bg-black p-2 rounded border border-white/10 text-[#00FF41] font-mono select-all overflow-x-auto whitespace-nowrap">
                        pyinstaller --onefile --uac-admin macro_spammer.py
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          <section className="lg:col-span-9 flex flex-col h-full min-h-[500px]">
             <div className="bg-black/80 border border-white/10 rounded-lg overflow-hidden flex-1 flex flex-col relative z-10 border-accent h-full shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#050507] border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-3 text-white/40">
                  <Code2 size={16} className="text-[#00FF41]" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">TERMINAL_FEED</span>
                  <span className="px-2 py-0.5 bg-[#00FF41]/20 text-[#00FF41] rounded text-[8px] tracking-widest font-black uppercase glow-green">LIVE</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-[10px] font-bold hover:text-[#00FF41] uppercase tracking-wider text-white/40 bg-white/5 hover:bg-white/10 border border-transparent hover:border-[#00FF41]/30 px-3 py-1.5 rounded transition-all"
                >
                  {copied ? <Check size={12} className="text-[#00FF41]" /> : <Copy size={12} />}
                  {copied ? 'BUFFER COPIED' : 'COPY BUFFER'}
                </button>
              </div>
              <div className="flex-1 overflow-auto p-0 relative bg-black custom-scrollbar">
                 <div className="absolute inset-0 scanline pointer-events-none opacity-20"></div>
                 <pre className="text-[11px] sm:text-xs font-mono text-white/70 leading-relaxed p-6 h-full relative z-20">
                   <code>{generateCode()}</code>
                 </pre>
              </div>
            </div>
            
            <footer className="mt-6 pt-4 border-t border-white/10 flex justify-between text-[9px] sm:text-[10px] tracking-widest text-white/40 uppercase items-center flex-shrink-0">
              <div className="flex gap-4 sm:gap-6">
                <span className="hidden sm:inline">PID: 14820</span>
                <span className="hidden sm:inline">Thread_ID: 0x7FFA</span>
                <span>Input_Hook: Keyboard.Direct</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[#00FF41] animate-pulse glow-green text-shadow">● ENGINE STABLE</span>
                <span className="text-white/60">Lat: 0.12ms</span>
              </div>
            </footer>
          </section>

        </main>
      </div>
    </div>
  );
}
