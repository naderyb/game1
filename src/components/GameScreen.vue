<template>
  <div class="game-screen">
    <div class="game-header">
      <div class="timer">
        <div class="timer-bar" :style="{ width: `${timePercentage}%` }"></div>
      </div>
      <div class="score">{{ t('score') }}: {{ score }}</div>
    </div>

    <div class="statement-container">
      <h2>{{ t('statement') }} {{ currentIndex + 1 }}/{{ totalStatements }}</h2>
      <div class="statement">{{ currentStatement }}</div>
    </div>

    <div class="buttons">
      <button @click="checkAnswer(true)" class="true-button">{{ t('trueButton') }}</button>
      <button @click="checkAnswer(false)" class="false-button">{{ t('falseButton') }}</button>
    </div>

    <!-- Feedback animation -->
    <transition name="feedback-animation">
      <div v-if="showFeedback" class="answer-feedback" :class="feedbackClass">
        {{ feedbackMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import { statements } from '../data/statements.js'

export default {
  inject: ['t', 'language'],
  data() {
    return {
      gameStatements: [],
      gameAnswers: [],
      currentIndex: 0,
      score: 0,
      totalStatements: 10,
      timeLeft: 60,
      maxTime: 60,
      startTime: 0,
      timer: null,
      correctAnswers: 0,
      showFeedback: false,
      feedbackMessage: '',
      feedbackClass: '',
      isComponentMounted: false, // Changed from _mounted to isComponentMounted
    }
  },
  
  computed: {
    currentStatement() {
      return this.gameStatements[this.currentIndex]?.text || ''
    },
    timePercentage() {
      return (this.timeLeft / this.maxTime) * 100
    },
    currentLanguageCode() {
      return this.language
    },
  },
  methods: {
    generateGame() {
      // Log the current language for debugging
      console.log('Generating game with language:', this.currentLanguageCode)
      console.log('Available statements:', statements)

      // Make sure we access the correct language statements
      const langStatements = statements[this.currentLanguageCode]

      if (!langStatements || !langStatements.true || !langStatements.false) {
        console.error('Language statements not found:', this.currentLanguageCode)
        console.error('Available languages:', Object.keys(statements))
        return
      }

      const selectedTrue = this.shuffle([...langStatements.true]).slice(
        0,
        Math.floor(this.totalStatements / 2),
      )
      const selectedFalse = this.shuffle([...langStatements.false]).slice(
        0,
        Math.ceil(this.totalStatements / 2),
      )

      // Combine and shuffle
      this.gameStatements = this.shuffle([
        ...selectedTrue.map((text) => ({ text, isTrue: true })),
        ...selectedFalse.map((text) => ({ text, isTrue: false })),
      ])

      console.log('Game statements generated:', this.gameStatements.length)
      this.startTime = Date.now()
    },
    startTimer() {
      // Clear any existing timer first
      clearInterval(this.timer)

      this.timeLeft = this.maxTime // Reset time when starting/restarting timer
      this.timer = setInterval(() => {
        this.timeLeft -= 0.1
        if (this.timeLeft <= 0) {
          this.endGame()
        }
      }, 100)
    },

    shuffle(array) {
      // Fisher-Yates shuffle algorithm
      const result = [...array] // Create a copy to avoid mutating the original
      let currentIndex = result.length
      let randomIndex

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]]
      }

      return result
    },
    checkAnswer(userAnswer) {
      if (this.currentIndex >= this.gameStatements.length) {
        console.error('Invalid statement index:', this.currentIndex)
        return
      }

      const correct = userAnswer === this.gameStatements[this.currentIndex].isTrue

      // Calculate points (more points for faster answers)
      let points = 0
      if (correct) {
        const basePoints = 100
        const timeBonus = Math.max(0, 50 * (this.timeLeft / this.maxTime))
        points = Math.round(basePoints + timeBonus)
        this.correctAnswers++
      }

      // Show feedback
      this.feedbackMessage = correct ? this.t('correct') : this.t('wrong')
      this.feedbackClass = correct ? 'correct' : 'incorrect'
      this.showFeedback = true

      setTimeout(() => {
        this.showFeedback = false
      }, 800)

      // Track answer
      this.gameAnswers.push({
        statement: this.currentStatement,
        userAnswer,
        correct,
        points,
      })

      // Add points
      this.score += points

      // Move to next statement or end game
      if (this.currentIndex < this.totalStatements - 1) {
        this.currentIndex++
      } else {
        this.endGame()
      }
    },
    endGame() {
      clearInterval(this.timer)

      const timeTaken = (Date.now() - this.startTime) / 1000
      const accuracy = (this.correctAnswers / this.totalStatements) * 100

      this.$emit('game-over', {
        score: this.score,
        accuracy: Math.round(accuracy),
        timeTaken: Math.round(timeTaken),
      })
    },
    resetAndGenerateGame() {
      // Reset game state
      this.currentIndex = 0
      this.score = 0
      this.timeLeft = this.maxTime
      this.correctAnswers = 0
      this.gameAnswers = []
      this.showFeedback = false

      // Stop any existing timer
      clearInterval(this.timer)

      // Generate new game statements in current language
      this.generateGame()

      // Start the timer
      this.startTimer()
    },
  },
  created() {
    this.isComponentMounted = false // Changed from _mounted to isComponentMounted
  },
  mounted() {
    this.isComponentMounted = true // Changed from _mounted to isComponentMounted
    this.resetAndGenerateGame()
    this.generateGame()
    this.startTimer()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
}
</script>

<style scoped>
.game-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.timer {
  height: 10px;
  background-color: #333;
  border-radius: 5px;
  width: 70%;
  overflow: hidden;
}

.timer-bar {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.1s linear;
}

.score {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2196f3;
}

.statement-container {
  background-color: #282828;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  flex-grow: 1;
}

h2 {
  color: #2196f3;
  margin-bottom: 15px;
}

.statement {
  font-size: 1.5rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

button {
  padding: 15px 40px;
  font-size: 1.2rem;
  font-family: 'Courier New', monospace;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    transform 0.3s,
    background-color 0.3s;
}

button:hover {
  transform: translateY(-2px);
}

.true-button {
  background-color: #4caf50;
  color: white;
}

.true-button:hover {
  background-color: #45a049;
}

.false-button {
  background-color: #f44336;
  color: white;
}

.false-button:hover {
  background-color: #d32f2f;
}

.answer-feedback {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 40px;
  border-radius: 8px;
  font-size: 2rem;
  font-weight: bold;
  z-index: 1000;
}

.correct {
  background-color: rgba(76, 175, 80, 0.9);
  color: white;
}

.incorrect {
  background-color: rgba(244, 67, 54, 0.9);
  color: white;
}

.feedback-animation-enter-active,
.feedback-animation-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.feedback-animation-enter-from,
.feedback-animation-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}

.feedback-animation-enter-to,
.feedback-animation-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

@media (max-width: 768px) {
  button {
    padding: 10px 20px;
    font-size: 1rem;
  }

  .statement {
    font-size: 1.2rem;
  }
}
</style>
