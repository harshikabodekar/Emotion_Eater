# Emotion_Eater

#  Emotion Eater — Emotional Blob Generator

##  Project Description  
**Emotion Eater** is an experimental emotional interface toy.  
You type how you’re feeling →  
A colorful, animated **blob creature** appears and “eats” your emotion.

Each emotion creates a unique blob:
- Sad → droopy blue blob  
- Angry → spiky red blob  
- Happy → bouncy yellow blob  
- Confused → wiggly glitch blob  
- Scared → trembling purple blob
- and many more!

---

##  Features  
-  Emotion-based blob generator  
-  Mood → Color → Shape mapping  
-  Blob animation (wiggle, bounce, tremble, stretch)  
-  Optional lightweight fluid shader background  
-  Blob reacts to new emotions  
-  Fully client-side  

---

##  Tech Stack  
- Next.js  
- Tailwind CSS  
- Framer Motion  
- Lightweight WebGL (Low-cost shader)  
- Simple emotion rules (no AI)

---

## Code  Structure  
```
/pages/index.tsx
/components/EmotionBlob.tsx
/utils/emotionToBlob.ts
/tailwind.config.js
```

---

##  How It Works  
1. User types an emotion  
2. Simple logic maps emotion → blob traits  
3. Blob morphs shape, color, and animation  
4. New emotion replaces old blob (“eats” your feeling)

---

##  Run Locally  
```
npm install
npm run dev
```
