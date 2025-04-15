<template>
  <div class="start-screen">
    <h2>{{ t('welcome') }}</h2>
    <p>{{ t('instructions') }}</p>

    <div class="instructions">
      <h3>{{ t('howToPlay') }}</h3>
      <ul>
        <li>{{ t('rule1') }}</li>
        <li>{{ t('rule2') }}</li>
        <li>{{ t('rule3') }}</li>
        <li>{{ t('rule4') }}</li>
      </ul>
    </div>

    <button @click="$emit('start-game')" class="start-button">{{ t('startButton') }}</button>
  </div>
</template>

<script>
export default {
  inject: ['t']
}
</script>

<style scoped>
.start-screen {
  text-align: center;
  padding: 20px;
}

h2 {
  color: #4CAF50;
  margin-bottom: 20px;
}

.instructions {
  background-color: #282828;
  border-radius: 8px;
  padding: 20px;
  margin: 30px 0;
  text-align: left;
}

h3 {
  color: #2196F3; /* Blue accent */
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
}

li {
  margin: 10px 0;
  position: relative;
  padding-left: 20px;
}

li:before {
  content: ">";
  position: absolute;
  left: 0;
  color: #2196F3;
}

:dir(rtl) li {
  padding-right: 20px;
  padding-left: 0;
}

:dir(rtl) li:before {
  right: 0;
  left: auto;
}

.start-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-button:hover {
  background-color: #45a049;
}
</style>
