/**
 * Wedding BGM Engine
 * Web Audio API를 활용하여 네트워크 로딩 실패 걱정 없는 서정적인 웨딩 피아노 사운드를 합성 재생합니다.
 */

class WeddingAudioPlayer {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.melodyTimer = null;
    this.step = 0;
    
    // Canon in D 감성 코드 & 멜로디 노트 (Hz 주파수)
    this.notes = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
      'C#5': 554.37, 'D5': 587.33, 'E5': 659.25, 'F#5': 739.99, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'D3': 146.83, 'A2': 110.00, 'B2': 123.47, 'F#2': 92.50, 'G2': 98.00, 'D2': 73.42, 'A3': 220.00
    };

    // 캐논 변주곡 시퀀스
    this.sequence = [
      { chord: ['D3', 'F#4', 'A4', 'D5'], melody: 'F#5', duration: 1.2 },
      { chord: ['A2', 'E4', 'A4', 'C#5'], melody: 'E5', duration: 1.2 },
      { chord: ['B2', 'D4', 'F#4', 'B4'], melody: 'D5', duration: 1.2 },
      { chord: ['F#2', 'C#4', 'F#4', 'A4'], melody: 'C#5', duration: 1.2 },
      { chord: ['G2', 'D4', 'G4', 'B4'], melody: 'B4', duration: 1.2 },
      { chord: ['D2', 'D4', 'F#4', 'A4'], melody: 'A4', duration: 1.2 },
      { chord: ['G2', 'D4', 'G4', 'B4'], melody: 'B4', duration: 1.2 },
      { chord: ['A2', 'E4', 'A4', 'C#5'], melody: 'C#5', duration: 1.2 },

      // 파트 2 (화려한 아르페지오 느낌)
      { chord: ['D3', 'A4', 'D5'], melody: 'D5', duration: 0.6 },
      { chord: ['F#4'], melody: 'F#5', duration: 0.6 },
      { chord: ['A2', 'E4'], melody: 'E5', duration: 0.6 },
      { chord: ['C#5'], melody: 'A5', duration: 0.6 },
      { chord: ['B2', 'D4'], melody: 'F#5', duration: 0.6 },
      { chord: ['F#4'], melody: 'D5', duration: 0.6 },
      { chord: ['F#2', 'C#4'], melody: 'C#5', duration: 0.6 },
      { chord: ['A4'], melody: 'E5', duration: 0.6 },
      { chord: ['G2', 'D4'], melody: 'D5', duration: 0.6 },
      { chord: ['B4'], melody: 'B4', duration: 0.6 },
      { chord: ['D2', 'D4'], melody: 'A4', duration: 0.6 },
      { chord: ['F#4'], melody: 'D5', duration: 0.6 },
      { chord: ['G2', 'D4'], melody: 'B4', duration: 0.6 },
      { chord: ['B4'], melody: 'D5', duration: 0.6 },
      { chord: ['A2', 'E4'], melody: 'C#5', duration: 0.6 },
      { chord: ['C#5'], melody: 'E5', duration: 0.6 }
    ];
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0.12, this.audioCtx.currentTime); // 잔잔한 볼륨
      this.gainNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTone(freq, time, duration, isMelody = false) {
    if (!this.audioCtx) return;
    
    // 오실레이터 (따뜻한 피아노/오르골 톤 합성을 위한 sine + triangle)
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();

    osc1.type = isMelody ? 'triangle' : 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 2.002, time); // 은은한 배음

    const baseVol = isMelody ? 0.35 : 0.15;

    // 피아노 어택 & 서스테인 엔벨로프
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.exponentialRampToValueAtTime(baseVol, time + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(baseVol * 0.4, time + duration * 0.4);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration + 0.3);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.4);
    osc2.stop(time + duration + 0.4);
  }

  playNextStep() {
    if (!this.isPlaying || !this.audioCtx) return;

    const current = this.sequence[this.step % this.sequence.length];
    const now = this.audioCtx.currentTime;

    // 코드 재생
    if (current.chord) {
      current.chord.forEach((noteName, idx) => {
        const freq = this.notes[noteName];
        if (freq) {
          this.playTone(freq, now + idx * 0.03, current.duration * 1.5, false);
        }
      });
    }

    // 메인 멜로디 재생
    if (current.melody && this.notes[current.melody]) {
      this.playTone(this.notes[current.melody], now, current.duration, true);
    }

    this.step++;
    this.melodyTimer = setTimeout(() => {
      this.playNextStep();
    }, current.duration * 1000);
  }

  toggle() {
    this.initAudio();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  play() {
    this.initAudio();
    this.isPlaying = true;
    this.step = 0;
    this.playNextStep();
  }

  stop() {
    this.isPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }
}

window.weddingAudio = new WeddingAudioPlayer();
