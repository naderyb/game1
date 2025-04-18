<template>
<nav class="navbar navbar-expand-lg bg-dark navbar-dark px-4">
  <a class="navbar-brand d-flex align-items-center" href="#">
    <img src="/nexus-logo.svg" alt="Nexus Club Logo" width="400" height="100" class="me-2" />
  </a>
</nav>
  <div class="app-container" :class="{ 'rtl': currentLanguage === 'ar' }">
    <header>
      <h1>{{ t('gameTitle') }}</h1>
      <div class="language-selector">
        <label>{{ t('languageSelect') }}</label>
        <select v-model="currentLanguage">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
        </select>
      </div>
    </header>

    <main>
      <StartScreen v-if="gameState === 'start'" @start-game="startGame" />
      <GameScreen
        v-else-if="gameState === 'playing'"
        @game-over="endGame"
      />
      <ResultScreen
        v-else-if="gameState === 'results'"
        :score="finalScore"
        :accuracy="accuracy"
        :timeTaken="timeTaken"
        @play-again="resetGame"
      />
    </main>
  </div>
</template>

<script>
import StartScreen from './components/StartScreen.vue'
import GameScreen from './components/GameScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import { languages } from './data/language.js'

export default {
  components: {
    StartScreen,
    GameScreen,
    ResultScreen
  },
  data() {
    return {
      gameState: 'start',
      finalScore: 0,
      accuracy: 0,
      timeTaken: 0,
      currentLanguage: 'en'
    }
  },
  provide() {
    return {
      language: this.currentLanguage,
      t: this.t
    }
  },
  methods: {
    startGame() {
      this.gameState = 'playing'
    },
    endGame(results) {
      this.finalScore = results.score
      this.accuracy = results.accuracy
      this.timeTaken = results.timeTaken
      this.gameState = 'results'
    },
    resetGame() {
      this.gameState = 'start'
    },
    t(key) {
      return languages[this.currentLanguage][key] || key
    }
  },
  watch: {
    currentLanguage(newLang) {
      document.documentElement.setAttribute('lang', newLang);
      document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    }
  },
  mounted() {
    document.documentElement.setAttribute('lang', this.currentLanguage);
    document.documentElement.setAttribute('dir', this.currentLanguage === 'ar' ? 'rtl' : 'ltr');
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Courier New', monospace;
  background-color: #121212;
  color: #e0e0e0;
}

.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.rtl {
  direction: rtl;
  text-align: right;
}

.me-2 {
  margin: 1.5rem !important;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

h1 {
  font-size: 2rem;
  color: #4CAF50; /* Green accent color */
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.language-selector select {
  padding: 5px 10px;
  background-color: #2a2a2a;
  color: #e0e0e0;
  border: 1px solid #4CAF50;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

main {
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .app-container {
    padding: 10px;
  }

  header {
    margin-bottom: 20px;
    flex-direction: column;
    gap: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }

  main {
    padding: 15px;
  }
}

/* Add this to the App.vue <style> section */
:lang(en), :lang(fr) {
  font-family: 'Roboto Mono', 'Courier New', monospace;
}

:lang(ar) {
  font-family: 'Tajawal', Arial, sans-serif;
}

/* Special RTL/LTR handling */
:lang(ar) .buttons,
:lang(ar) .results,
:lang(ar) .language-selector {
  flex-direction: row-reverse;
}

:lang(ar) .game-header {
  flex-direction: row-reverse;
}
</style>
