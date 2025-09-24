import { ref, onMounted, onUnmounted } from "vue";

export function useResponsive() {
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);
  const screenWidth = ref(0);

  const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
    isMobile.value = screenWidth.value < 768;
    isTablet.value = screenWidth.value >= 768 && screenWidth.value < 1024;
    isDesktop.value = screenWidth.value >= 1024;
  };

  onMounted(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateScreenSize);
  });

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
  };
}
