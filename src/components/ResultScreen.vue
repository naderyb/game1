<template>
  <div class="result-screen">
    <h2>{{ t('gameOver') }}</h2>

    <div class="results">
      <div class="result-item">
        <h3>{{ t('finalScore') }}</h3>
        <div class="result-value">{{ score }}</div>
      </div>

      <div class="result-item">
        <h3>{{ t('accuracy') }}</h3>
        <div class="result-value">{{ accuracy }}%</div>
      </div>

      <div class="result-item">
        <h3>{{ t('timeTaken') }}</h3>
        <div class="result-value">{{ timeTaken }} {{ t('seconds') }}</div>
      </div>
    </div>

    <div class="feedback">
      <p v-if="accuracy >= 90">{{ t('feedbackGreat') }}</p>
      <p v-else-if="accuracy >= 70">{{ t('feedbackGood') }}</p>
      <p v-else>{{ t('feedbackImprove') }}</p>
    </div>

    <div class="promo">
      <p>{{ t('joinPromo1') }}</p>
      <p>{{ t('joinPromo2') }}</p>
    </div>

    <button @click="$emit('play-again')" class="play-again-button">{{ t('playAgain') }}</button>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number,
      required: true
    },
    timeTaken: {
      type: Number,
      required: true
    }
  },
  inject: ['t']
}
</script>

<style scoped>
.result-screen {
  text-align: center;
  padding: 20px;
}

h2 {
  color: #2196F3;
  font-size: 2rem;
  margin-bottom: 30px;
}

.results {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 30px;
}

.result-item {
  background-color: #282828;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  min-width: 200px;
}

h3 {
  color: #4CAF50;
  margin-bottom: 10px;
}

.result-value {
  font-size: 2rem;
  font-weight: bold;
}

.feedback {
  margin: 30px 0;
  font-size: 1.2rem;
  color: #e0e0e0;
}

.promo {
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  margin: 30px 0;
}

.play-again-button {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.play-again-button:hover {
  background-color: #1976D2;
}

@media (max-width: 768px) {
  .results {
    flex-direction: column;
  }

  .result-item {
    min-width: unset;
    width: 100%;
    margin: 10px 0;
  }
}
</style>
