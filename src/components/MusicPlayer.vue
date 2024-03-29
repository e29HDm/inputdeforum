<script setup lang="ts">
import { computed, ref, watch } from "vue";
import XButton from "./inputs/XButton.vue";

const emit = defineEmits(["update:addFrameAt"]);

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
});

const file = ref<File | null>(null);
const audioPlayer = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const time = ref(0);
type SpeedValues = 0.25 | 0.5 | 1 | 2 | 4;
const speed = ref<SpeedValues>(1);
const speeds: readonly SpeedValues[] = [0.25, 0.5, 1, 2, 4] as const;

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files) {
    file.value = files[0];
    time.value = (audioPlayer.value as HTMLMediaElement).currentTime;
  }
  isPlaying.value = false;
};

const audioSource = computed(() => {
  if (file.value) {
    return URL.createObjectURL(file.value);
  }
  return "";
});

const handlePlayPause = () => {
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.pause();
    } else {
      audioPlayer.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

const playPauseLabel = computed(() => {
  return isPlaying.value ? "Pause" : "Play";
});

const currentFrame = computed(() => {
  if (audioPlayer.value) {
    return Math.floor(time.value * props.config.fps);
  }
  return 0;
});

const handleTimeUpdate = () => {
  if (audioPlayer.value) {
    time.value = audioPlayer.value.currentTime;
  }
};

const handleAddFrameBetween = () => {
  if (audioPlayer.value) {
    emit("update:addFrameAt", currentFrame.value);
  }
};

const getButtonColors = (speedValue: SpeedValues) => {
  return speed.value === speedValue
    ? undefined
    : "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-200";
};

watch(
  () => speed.value,
  (newSpeed) => {
    if (audioPlayer.value) {
      audioPlayer.value.playbackRate = newSpeed;
    }
  }
);
</script>

<template>
  <div>
    <div class="flex flex-col space-y-2 mb-5">
      <h2 class="text-2xl font-bold mb-2">Music player</h2>
      <p class="text-gray-600 text-sm">
        Download a music file and play it to add new frames to your config.
      </p>
    </div>
    <div class="flex flex-col space-y-4 bg-gray-50 rounded-md shadow p-2">
      <div class="flex space-x-4 items-center">
        <label class="text-gray-600 text-sm w-1/5 text-right" for="music-upload"
          >Music file</label
        >
        <input
          class="border border-gray-300 rounded px-2 py-1 flex-grow focus:ring-2 focus:ring-offset-0 focus:outline-none font-mono"
          id="music-upload"
          type="file"
          accept="audio/*"
          @change="handleFileChange"
        />
      </div>

      <div v-show="file" class="flex flex-col space-y-4">
        <audio
          ref="audioPlayer"
          class="w-full shadow rounded-md"
          controls
          @timeupdate="handleTimeUpdate"
          :src="audioSource"
        ></audio>
        <div class="flex justify-end space-x-4 items-center">
          <div class="text-gray-600 flex space-x-2 items-center">
            <span class="text-xs">Current frame:</span>
            <span class="font-mono font-bold">
              {{ currentFrame }}
            </span>
          </div>
          <XButton
            v-for="speedValue in speeds"
            :key="speedValue"
            @click="speed = speedValue"
            :title="
              speed === speedValue
                ? 'Current speed'
                : 'Play at ' + speedValue + 'x speed'
            "
            :colors="getButtonColors(speedValue)"
          >
            <span></span>
            {{ speedValue }}x
          </XButton>

          <XButton @click="handlePlayPause" :title="playPauseLabel">{{
            playPauseLabel
          }}</XButton>
          <XButton
            @click="handleAddFrameBetween"
            title="Add a frame where the music is at the current time"
          >
            Add frame
          </XButton>
        </div>
      </div>
    </div>
  </div>
</template>
