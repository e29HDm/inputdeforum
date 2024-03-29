<script setup lang="ts">
import { onBeforeMount, onMounted, ref, Ref } from "vue";
import FramesConfigComponent from "./components/FramesConfigComponent.vue";
import GlobalConfigComponent from "./components/GlobalConfigComponent.vue";
import JsonConfigGenerator from "./components/JsonConfigGenerator.vue";
import LoadOrSave from "./components/LoadOrSave.vue";
import { LocalStorage } from "./services/LocalStorage";
import Config from "./types/Config";
import Frame from "./types/Frame";
import UserConfig from "./types/UserConfig";
import SaveNotification from "./components/SaveNotification.vue";
import MusicPlayer from "./components/MusicPlayer.vue";

const config: Ref<Config> = ref(new Config());
const userConfig: Ref<UserConfig> = ref(new UserConfig());
const configNames: Ref<string[]> = ref(LocalStorage.getConfigNames());
const selectedConfigName: Ref<string> = ref("");
const isSaveNotificationVisible: Ref<boolean> = ref(false);
const saveNotificationTimeout: Ref<ReturnType<typeof setTimeout> | null> =
  ref(null);

const onConfigChange = () => {
  if (selectedConfigName.value !== "") {
    handleConfigSave(selectedConfigName.value);
    showSaveNotification();
  }
};

const showSaveNotification = () => {
  isSaveNotificationVisible.value = true;
  clearSaveNotificationTimeout();
  saveNotificationTimeout.value = setTimeout(() => {
    isSaveNotificationVisible.value = false;
  }, 3000);
};

const closeSaveNotification = () => {
  isSaveNotificationVisible.value = false;
  clearSaveNotificationTimeout();
};

const clearSaveNotificationTimeout = () => {
  if (saveNotificationTimeout.value) {
    clearTimeout(saveNotificationTimeout.value);
  }
};

const handleConfigChange = (newConfig: Config) => {
  config.value = newConfig;
  onConfigChange();
};

const handleConfigLoad = (newSelectedConfigName: string) => {
  config.value = LocalStorage.getConfig(newSelectedConfigName) ?? new Config();
  selectedConfigName.value = newSelectedConfigName;
};

const handleConfigSave = (newConfigName: string) => {
  LocalStorage.saveConfig(newConfigName, config.value);
  configNames.value = LocalStorage.getConfigNames();
};

const handleFrameListChange = (newFrameList: Frame[]) => {
  config.value.frames = newFrameList;
  onConfigChange();
};

const handleAddFrameBetween = (index: number) => {
  const frameId = config.value.frames[index].id;
  config.value.frames.splice(
    index + 1,
    0,
    new Frame(frameId + userConfig.value.stepIncrement)
  );
  onConfigChange();
};

const handleUserConfigSave = () => {
  LocalStorage.saveUserConfig(userConfig.value);
  showSaveNotification();
};

const handleConfigDelete = () => {
  LocalStorage.deleteConfig(selectedConfigName.value);
  configNames.value = LocalStorage.getConfigNames();
  if (selectedConfigName.value) {
    config.value = new Config();
    selectedConfigName.value = "";
  }
};

const handleConfigNameChange = (newConfigName: string) => {
  selectedConfigName.value = newConfigName;
};

const handleStepIncrementChange = (newIncrement: number) => {
  userConfig.value.stepIncrement = newIncrement;
  handleUserConfigSave();
  showSaveNotification();
};

const handleExpressionModeChange = (newIsExpressionModeEnabled: boolean) => {
  userConfig.value.isExpressionModeEnabled = newIsExpressionModeEnabled;
  handleUserConfigSave();
  showSaveNotification();
};

const handleAddFrameAt = (index: number) => {
  config.value.frames.push(new Frame(index));
  config.value.frames.sort((a, b) => a.id - b.id);
  onConfigChange();
};

const handlePromptStyleChange = (newPromptStyle: string) => {
  config.value.promptStyle = newPromptStyle;
  onConfigChange();
};

const handleSubstractXFramesChange = (newSubstractXFrames: number) => {
  config.value.substractXFrames = newSubstractXFrames;
  onConfigChange();
};

onMounted(() => {
  userConfig.value = LocalStorage.getUserConfig() ?? new UserConfig();
});
</script>

<template>
  <div class="flex flex-col space-y-8 mx-4 my-4">
    <div class="flex flex-col space-y-2">
      <h1 class="text-4xl font-serif mb-4 flex items-center space-x-2">
        <img class="h-20 w-20" src="/icon-128px.png" alt="Logo" />
        <span class="underline">Deforum config generator</span>
      </h1>
      <p class="text-gray-600 text-sm">
        This tool will help you generate a config file for the
        <a
          class="text-blue-500 hover:text-blue-700"
          target="_blank"
          href="https://colab.research.google.com/github/deforum-art/deforum-stable-diffusion/blob/main/Deforum_Stable_Diffusion.ipynb"
        >
          Deforum diffusion</a
        >
        notebook.
      </p>
      <p class="text-gray-600 text-sm">
        The official documentation for the Deforum project can be found
        <a
          class="text-blue-500 hover:text-blue-700"
          target="_blank"
          href="https://docs.google.com/document/d/1RrQv7FntzOuLg4ohjRZPVL7iptIyBhwwbcEYEW2OfcI/edit#"
        >
          here</a
        >.
      </p>
    </div>
    <LoadOrSave
      :configNames="configNames"
      :selectedConfigName="selectedConfigName"
      @config:load="handleConfigLoad"
      @config:delete="handleConfigDelete"
      @config:name-changed="handleConfigNameChange"
    />
    <GlobalConfigComponent
      :config="config"
      @update:configValue="handleConfigChange"
    />
    <MusicPlayer :config="config" @update:addFrameAt="handleAddFrameAt" />
    <FramesConfigComponent
      :frameList="config.frames"
      :stepIncrement="userConfig.stepIncrement ?? 1"
      :isExpressionModeEnabled="userConfig.isExpressionModeEnabled ?? false"
      :promptStyle="config.promptStyle ?? ''"
      :substractXFrames="config.substractXFrames ?? 0"
      @user-config:step-increment-change="handleStepIncrementChange"
      @user-config:expression-mode-change="handleExpressionModeChange"
      @update:frameList="handleFrameListChange"
      @update:addFrameBetween="handleAddFrameBetween"
      @update:prompt-style="handlePromptStyleChange"
      @update:substract-x-frames="handleSubstractXFramesChange"
    />
    <JsonConfigGenerator :config="config" />
    <footer class="flex justify-center items-center space-x-8">
      <p class="text-gray-600 text-sm">
        Made with 👁👄👁 by
        <a
          class="text-blue-500 hover:text-blue-700"
          target="_blank"
          href="https://twitter.com/e29HDm"
        >
          @e29HDm</a
        >
      </p>
      <p class="text-gray-600 text-sm">
        code on
        <a
          class="text-blue-500 hover:text-blue-700"
          target="_blank"
          href="https://github.com/e29HDm/inputdeforum"
        >
          Github</a
        >
      </p>
    </footer>
  </div>
  <SaveNotification
    :isSaveNotificationVisible="isSaveNotificationVisible"
    @save-notification:close="closeSaveNotification"
  />
</template>
