<template>
  <div class="content">
    <h1 class="title">{{ t('home.title') }} <span class="appName">appList</span></h1>

    <div class="button-container">
      <button>{{ t('home.buttons.create_user') }}</button>
      <button>{{ t('home.buttons.login') }}</button>
      <button>{{ t('home.buttons.create_task') }}</button>
      <button>{{ t('home.buttons.search_list') }}</button>
      <button>{{ t('home.buttons.edit_list') }}</button>
      <button>{{ t('home.buttons.delete_list') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
</script>

<style scoped lang="css">
.content {
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: 20px;
  gap: 20px;
}

.title {
  font-size: 2rem;
  text-align: center;
}

.appName {
  color: #28a745; 
}

.button-container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: center;
  gap: 15px; 
  width: 100%;
  max-width: 600px; 
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #007bff; 
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #0056b3; 
}

@media (max-width: 500px) {
  .button-container {
    flex-direction: column; 
    align-items: center;
  }

  button {
    width: 100%; 
    max-width: 300px;
  }
}
</style>
